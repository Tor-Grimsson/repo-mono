import { parseEcoUrl, formatTermination, formatTimeClass, formatCompactNumber, formatMonthLabel } from './chessHelpers'

/**
 * Compute dashboard metrics from monthlySummary (lightweight, no CDN fetch needed).
 * Aggregates across selected months or all months if none selected.
 */
export const computeLightweightMetrics = (monthlySummary, selectedMonths = []) => {
  const entries = selectedMonths.length > 0
    ? monthlySummary.filter((e) => selectedMonths.includes(e.month))
    : monthlySummary

  if (!entries.length) return null

  const totalGames = entries.reduce((s, e) => s + e.total, 0)
  const wins = entries.reduce((s, e) => s + (e.results?.win || 0), 0)
  const draws = entries.reduce((s, e) => s + (e.results?.draw || 0), 0)
  const losses = entries.reduce((s, e) => s + (e.results?.loss || 0), 0)
  const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0
  const drawRate = totalGames > 0 ? (draws / totalGames) * 100 : 0

  // Weighted average ratings
  const ratingSum = entries.reduce((s, e) => s + (e.averagePlayerRating || 0) * e.total, 0)
  const avgRating = totalGames > 0 ? Math.round(ratingSum / totalGames) : 0
  const oppRatingSum = entries.reduce((s, e) => s + (e.averageOpponentRating || 0) * e.total, 0)
  const avgOpponentRating = totalGames > 0 ? Math.round(oppRatingSum / totalGames) : 0

  // Time class distribution
  const timeClassMap = {}
  for (const entry of entries) {
    if (!entry.timeClass) continue
    for (const [key, count] of Object.entries(entry.timeClass)) {
      timeClassMap[key] = (timeClassMap[key] || 0) + count
    }
  }
  const timeClassItems = Object.entries(timeClassMap)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({
      key,
      label: formatTimeClass(key),
      value: `${count.toLocaleString()} games`,
      percent: totalGames > 0 ? Math.round((count / totalGames) * 100) : 0,
      count
    }))

  // Stacked bar data per month (for DashStackedBarCard)
  const stackedBarData = entries.map((e) => ({
    win: e.results?.win || 0,
    draw: e.results?.draw || 0,
    loss: e.results?.loss || 0,
    total: e.total
  }))

  // Rating trend histogram (avg player rating per month)
  const ratingTrend = entries.map((e) => ({
    range: e.month,
    count: e.averagePlayerRating || 0
  }))

  // Unique opponents
  const uniqueOpponents = entries.reduce((s, e) => s + (e.uniqueOpponents || 0), 0)

  // Results ledger (W/D/L with percentages)
  const resultColors = [
    'var(--kol-palette-green)',
    'var(--kol-palette-blue)',
    'var(--kol-palette-red)'
  ]
  const resultsLedger = [
    { label: 'Wins', value: wins, percent: totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0 },
    { label: 'Draws', value: draws, percent: totalGames > 0 ? Math.round((draws / totalGames) * 100) : 0 },
    { label: 'Losses', value: losses, percent: totalGames > 0 ? Math.round((losses / totalGames) * 100) : 0 }
  ].map((item, idx) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent,
    color: resultColors[idx]
  }))

  // Compact stacked data (same as stacked bar but for mode focus card)
  const compactStackedData = stackedBarData

  // Months tracked
  const monthsTracked = entries.length

  return {
    totalGames,
    wins,
    draws,
    losses,
    winRate,
    drawRate,
    avgRating,
    avgOpponentRating,
    uniqueOpponents,
    timeClassItems,
    stackedBarData,
    ratingTrend,
    resultsLedger,
    compactStackedData,
    monthsTracked
  }
}

const TIME_CLASS_COLORS = {
  blitz: 'var(--kol-palette-blue)',
  bullet: 'var(--kol-palette-yellow)',
  daily: 'var(--kol-palette-green)',
  rapid: 'var(--kol-palette-orange)',
  classical: 'var(--kol-palette-purple)'
}

/**
 * Compute detailed metrics from the full gameMeta array (after CDN fetch).
 * Accepts pre-filtered games (by month, time class, result).
 */
export const computeFullMetrics = (games) => {
  if (!games || !games.length) return null

  // --- Opening breakdown ---
  const openingMap = {}
  for (const game of games) {
    const name = parseEcoUrl(game.eco)
    if (!openingMap[name]) openingMap[name] = { games: 0, wins: 0 }
    openingMap[name].games++
    if (game.playerResult === 'win') openingMap[name].wins++
  }
  const openingItems = Object.entries(openingMap)
    .sort((a, b) => b[1].games - a[1].games)
    .slice(0, 10)
    .map(([label, data]) => ({
      label,
      value: `${data.games} games • ${data.games > 0 ? Math.round((data.wins / data.games) * 100) : 0}% wins`
    }))

  // --- Termination breakdown ---
  const termMap = {}
  for (const game of games) {
    const key = game.terminationCategory || 'unknown'
    termMap[key] = (termMap[key] || 0) + 1
  }
  const termColors = [
    'var(--kol-palette-red)',
    'var(--kol-palette-orange)',
    'var(--kol-palette-green)',
    'var(--kol-palette-blue)'
  ]
  const terminationItems = Object.entries(termMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([key, count], idx) => ({
      label: formatTermination(key),
      value: `${count.toLocaleString()} games`,
      percent: Math.round((count / games.length) * 100),
      color: termColors[idx % termColors.length]
    }))

  // --- Rival / opponent breakdown ---
  const oppMap = {}
  for (const game of games) {
    const name = game.opponent?.username
    if (!name) continue
    if (!oppMap[name]) oppMap[name] = { games: 0, wins: 0 }
    oppMap[name].games++
    if (game.playerResult === 'win') oppMap[name].wins++
  }
  const rivalItems = Object.entries(oppMap)
    .sort((a, b) => b[1].games - a[1].games)
    .slice(0, 10)
    .map(([name, data]) => ({
      label: name,
      value: `${data.games} games • ${data.games > 0 ? Math.round((data.wins / data.games) * 100) : 0}% wins`
    }))

  // --- Rating histogram (player rating buckets) ---
  const buckets = {}
  for (const game of games) {
    const rating = game.player?.rating
    if (!rating) continue
    const bucket = Math.floor(rating / 100) * 100
    const key = `${bucket}-${bucket + 100}`
    buckets[key] = (buckets[key] || 0) + 1
  }
  const ratingHistogram = Object.entries(buckets)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([range, count]) => ({ range, count }))

  // --- Peak ratings by time class ---
  const peakByClass = {}
  const gamesByClass = {}
  for (const game of games) {
    const tc = game.timeClass
    const rating = game.player?.rating
    if (!tc || !rating) continue
    if (!peakByClass[tc] || rating > peakByClass[tc]) {
      peakByClass[tc] = rating
    }
    gamesByClass[tc] = (gamesByClass[tc] || 0) + 1
  }
  const peakRatingItems = Object.entries(peakByClass)
    .sort((a, b) => b[1] - a[1])
    .map(([key, rating]) => ({
      label: formatTimeClass(key),
      value: rating,
      detail: `${formatCompactNumber(gamesByClass[key] || 0)} games`,
      color: TIME_CLASS_COLORS[key] || 'var(--kol-palette-purple)'
    }))

  // --- Rating stats (current, peak, average, lowest, change, volatility) ---
  const sortedByTime = [...games].sort((a, b) => (a.endTime || 0) - (b.endTime || 0))
  const ratings = sortedByTime.map((g) => g.player?.rating).filter(Boolean)
  const current = ratings.length > 0 ? ratings[ratings.length - 1] : 0
  const peak = ratings.length > 0 ? Math.max(...ratings) : 0
  const lowest = ratings.length > 0 ? Math.min(...ratings) : 0
  const average = ratings.length > 0 ? Math.round(ratings.reduce((s, r) => s + r, 0) / ratings.length) : 0
  const last10 = ratings.slice(-10)
  const prev10 = ratings.slice(-20, -10)
  const change = last10.length > 0 && prev10.length > 0
    ? Math.round(last10.reduce((s, r) => s + r, 0) / last10.length - prev10.reduce((s, r) => s + r, 0) / prev10.length)
    : 0
  // Volatility: std dev of last 30 rating changes
  const recentRatings = ratings.slice(-31)
  let volatility = 0
  if (recentRatings.length > 1) {
    const changes = []
    for (let i = 1; i < recentRatings.length; i++) {
      changes.push(Math.abs(recentRatings[i] - recentRatings[i - 1]))
    }
    volatility = Math.round(changes.reduce((s, c) => s + c, 0) / changes.length)
  }
  const ratingStats = { current, peak, average, lowest, change, volatility }

  // --- Recent performance (last 90 days vs previous 90 days) ---
  const now = Math.max(...sortedByTime.map((g) => g.endTime || 0))
  const day90 = 90 * 24 * 60 * 60
  const recentGames = sortedByTime.filter((g) => g.endTime && g.endTime >= now - day90)
  const previousGames = sortedByTime.filter((g) => g.endTime && g.endTime >= now - day90 * 2 && g.endTime < now - day90)
  const countResults = (arr) => {
    const win = arr.filter((g) => g.playerResult === 'win').length
    const draw = arr.filter((g) => g.playerResult === 'draw').length
    const loss = arr.filter((g) => g.playerResult === 'loss').length
    return { win, draw, loss, total: arr.length }
  }
  const currentPerf = countResults(recentGames)
  const previousPerf = countResults(previousGames)
  const currentWinRate = currentPerf.total > 0 ? (currentPerf.win / currentPerf.total) * 100 : 0
  const previousWinRate = previousPerf.total > 0 ? (previousPerf.win / previousPerf.total) * 100 : 0
  const recentPerformance = {
    current: currentPerf,
    previous: previousPerf,
    trend: currentWinRate >= previousWinRate ? 'up' : 'down',
    currentWinRate,
    previousWinRate
  }

  // --- Month list items (per-month win rate and totals) ---
  const monthMap = {}
  for (const game of sortedByTime) {
    if (!game.month) continue
    if (!monthMap[game.month]) monthMap[game.month] = { win: 0, total: 0 }
    monthMap[game.month].total++
    if (game.playerResult === 'win') monthMap[game.month].win++
  }
  const monthListItems = Object.entries(monthMap)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 12)
    .map(([month, data]) => ({
      label: formatMonthLabel(month),
      value: `${data.total > 0 ? Math.round((data.win / data.total) * 100) : 0}% • ${data.total.toLocaleString()} games`
    }))

  // --- Candlestick data (monthly open/high/low/close ratings) ---
  const monthRatings = {}
  for (const game of sortedByTime) {
    if (!game.month || !game.player?.rating) continue
    if (!monthRatings[game.month]) monthRatings[game.month] = []
    monthRatings[game.month].push(game.player.rating)
  }
  const candlestickData = Object.entries(monthRatings)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12)
    .map(([, ratings]) => {
      const open = ratings[0]
      const close = ratings[ratings.length - 1]
      return {
        high: Math.max(...ratings),
        low: Math.min(...ratings),
        open,
        close,
        variant: close >= open ? 'accent' : 'neutral'
      }
    })

  // --- Result meters (recent W/D/L with percentages) ---
  const recentForMix = sortedByTime.slice(-120)
  const mixTotal = recentForMix.length
  const mixWin = recentForMix.filter((g) => g.playerResult === 'win').length
  const mixDraw = recentForMix.filter((g) => g.playerResult === 'draw').length
  const mixLoss = recentForMix.filter((g) => g.playerResult === 'loss').length
  const resultMixColors = [
    'var(--kol-palette-green)',
    'var(--kol-palette-blue)',
    'var(--kol-palette-red)'
  ]
  const resultMeters = [
    { label: 'Wins', value: mixWin, percent: mixTotal > 0 ? Math.round((mixWin / mixTotal) * 100) : 0 },
    { label: 'Draws', value: mixDraw, percent: mixTotal > 0 ? Math.round((mixDraw / mixTotal) * 100) : 0 },
    { label: 'Losses', value: mixLoss, percent: mixTotal > 0 ? Math.round((mixLoss / mixTotal) * 100) : 0 }
  ].map((item, idx) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent,
    color: resultMixColors[idx]
  }))

  // --- Time control leaderboard (win rate by time class) ---
  const tcStats = {}
  for (const game of games) {
    const tc = game.timeClass
    if (!tc) continue
    if (!tcStats[tc]) tcStats[tc] = { games: 0, wins: 0 }
    tcStats[tc].games++
    if (game.playerResult === 'win') tcStats[tc].wins++
  }
  const timeControlLeaderboard = Object.entries(tcStats)
    .sort((a, b) => {
      const aRate = a[1].games > 0 ? a[1].wins / a[1].games : 0
      const bRate = b[1].games > 0 ? b[1].wins / b[1].games : 0
      return bRate - aRate
    })
    .map(([key, data]) => ({
      label: formatTimeClass(key),
      value: `${data.games > 0 ? Math.round((data.wins / data.games) * 100) : 0}% • ${data.games.toLocaleString()} games`
    }))

  // Best / weakest time class (for alert card)
  const tcEntries = Object.entries(tcStats).filter(([, d]) => d.games >= 5)
  const bestTimeClass = tcEntries.length > 0
    ? tcEntries.reduce((best, [key, d]) => {
        const rate = d.games > 0 ? (d.wins / d.games) * 100 : 0
        return rate > best.winRate ? { key, label: formatTimeClass(key), games: d.games, winRate: Math.round(rate) } : best
      }, { key: '', label: '', games: 0, winRate: 0 })
    : { key: '', label: 'N/A', games: 0, winRate: 0 }
  const weakestTimeClass = tcEntries.length > 0
    ? tcEntries.reduce((worst, [key, d]) => {
        const rate = d.games > 0 ? (d.wins / d.games) * 100 : 0
        return rate < worst.winRate ? { key, label: formatTimeClass(key), games: d.games, winRate: Math.round(rate) } : worst
      }, { key: '', label: '', games: 0, winRate: 100 })
    : { key: '', label: 'N/A', games: 0, winRate: 0 }

  // --- Streak stats ---
  let longestWinStreak = 0
  let longestLossStreak = 0
  let currentWinStreak = 0
  let currentLossStreak = 0
  for (const game of sortedByTime) {
    if (game.playerResult === 'win') {
      currentWinStreak++
      currentLossStreak = 0
      if (currentWinStreak > longestWinStreak) longestWinStreak = currentWinStreak
    } else if (game.playerResult === 'loss') {
      currentLossStreak++
      currentWinStreak = 0
      if (currentLossStreak > longestLossStreak) longestLossStreak = currentLossStreak
    } else {
      currentWinStreak = 0
      currentLossStreak = 0
    }
  }
  const streakStats = { longestWinStreak, longestLossStreak }

  // --- Games this year / last 90 days ---
  const currentYear = new Date().getFullYear().toString()
  const gamesThisYear = games.filter((g) => g.month?.startsWith(currentYear)).length
  const gamesLast90Days = recentGames.length

  // --- Opponent histogram (opponent rating buckets) ---
  const oppBuckets = {}
  for (const game of games) {
    const rating = game.opponent?.rating
    if (!rating) continue
    const bucket = Math.floor(rating / 100) * 100
    const key = `${bucket}-${bucket + 100}`
    oppBuckets[key] = (oppBuckets[key] || 0) + 1
  }
  const opponentHistogram = Object.entries(oppBuckets)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([range, count]) => ({ range, count }))

  // --- Scatter points (opponent rating vs time control seconds) ---
  const recent400 = sortedByTime.slice(-400)
  const scatterPoints = recent400
    .filter((g) => g.opponent?.rating && g.timeControl)
    .map((g) => {
      const tc = g.timeControl
      let seconds = 0
      if (tc.includes('+')) {
        const [base, inc] = tc.split('+').map(Number)
        seconds = base + inc
      } else if (tc.includes('/')) {
        const [, s] = tc.split('/').map(Number)
        seconds = s || 0
      } else {
        seconds = Number(tc) || 0
      }
      return { id: g.id, x: seconds, y: g.opponent.rating, result: g.playerResult }
    })
  const maxY = scatterPoints.length > 0 ? Math.max(...scatterPoints.map((p) => p.y)) : 3000
  const scatterScale = { maxX: 720, maxY: Math.ceil(maxY / 500) * 500 }

  // --- Tough opponents (highest-rated frequent opponents from recent games) ---
  const recentOppMap = {}
  for (const game of sortedByTime.slice(-200)) {
    const name = game.opponent?.username
    const rating = game.opponent?.rating
    if (!name || !rating) continue
    if (!recentOppMap[name]) recentOppMap[name] = { totalRating: 0, games: 0, wins: 0 }
    recentOppMap[name].totalRating += rating
    recentOppMap[name].games++
    if (game.playerResult === 'win') recentOppMap[name].wins++
  }
  const toughOpponents = Object.entries(recentOppMap)
    .filter(([, d]) => d.games >= 2)
    .map(([name, d]) => ({
      name,
      avgRating: Math.round(d.totalRating / d.games),
      games: d.games,
      winRate: d.games > 0 ? (d.wins / d.games) * 100 : 0
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 10)
    .map((item) => ({
      label: `${item.name} (${item.avgRating})`,
      value: `${item.games} games • ${item.winRate.toFixed(0)}% wins`
    }))

  // --- Best win by time class (highest-rated opponent beaten) ---
  const bestWinByClass = {}
  for (const game of games) {
    if (game.playerResult !== 'win') continue
    const tc = game.timeClass
    const oppRating = game.opponent?.rating
    if (!tc || !oppRating) continue
    if (!bestWinByClass[tc] || oppRating > bestWinByClass[tc].rating) {
      bestWinByClass[tc] = { rating: oppRating, opponent: game.opponent?.username || 'Unknown' }
    }
  }
  const bestWinByTimeClass = Object.entries(bestWinByClass)
    .sort((a, b) => b[1].rating - a[1].rating)
    .map(([key, data]) => ({
      label: `${formatTimeClass(key)} — ${data.opponent}`,
      value: data.rating,
      color: TIME_CLASS_COLORS[key] || 'var(--kol-palette-purple)'
    }))

  // --- Featured overview data ---
  const featuredLegends = Object.entries(gamesByClass || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, count]) => ({
      label: formatTimeClass(key),
      detail: `${count.toLocaleString()} games`,
      className: {
        blitz: 'chart-color-blitz',
        bullet: 'chart-color-bullet',
        rapid: 'chart-color-rapid',
        daily: 'chart-color-daily'
      }[key] || 'chart-color-other'
    }))

  const topMode = Object.entries(gamesByClass || {})
    .sort((a, b) => b[1] - a[1])[0]

  const featuredOverview = {
    topModeLabel: topMode ? formatTimeClass(topMode[0]) : 'Chess Insights',
    totalGames: games.length,
    ratedGames: games.filter((g) => g.rated).length,
    legends: featuredLegends
  }

  return {
    openingItems,
    terminationItems,
    rivalItems,
    ratingHistogram,
    peakRatingItems,
    ratingStats,
    recentPerformance,
    monthListItems,
    candlestickData,
    resultMeters,
    timeControlLeaderboard,
    bestTimeClass,
    weakestTimeClass,
    streakStats,
    gamesThisYear,
    gamesLast90Days,
    opponentHistogram,
    scatterPoints,
    scatterScale,
    toughOpponents,
    bestWinByTimeClass,
    featuredOverview
  }
}

/**
 * Filter games by criteria
 */
export const filterGames = (games, { months = [], timeClass = 'all', result = 'all' } = {}) => {
  let filtered = games
  if (months.length > 0) {
    filtered = filtered.filter((g) => months.includes(g.month))
  }
  if (timeClass !== 'all') {
    filtered = filtered.filter((g) => g.timeClass === timeClass)
  }
  if (result !== 'all') {
    filtered = filtered.filter((g) => g.playerResult === result)
  }
  return filtered
}
