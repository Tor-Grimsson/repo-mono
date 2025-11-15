import React, { useState, useMemo } from 'react'
import { Checkbox, Icon } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import ChessBoard from '../../components/workshop/chess/apparatus/ChessBoard'
import ChessBoardWithSidebar from '../../components/workshop/chess/apparatus/ChessBoardWithSidebar'
import ChessSidebar from '../../components/workshop/chess/apparatus/ChessSidebar'
import AlternativeControlsMock from '../../components/workshop/chess/apparatus/AlternativeControlsMock'
import ChessAnalysisLayout from '../../components/workshop/chess/apparatus/ChessAnalysisLayout'
import GameArchiveTable from '../../components/workshop/chess/apparatus/GameArchiveTable'
import {
  ChessControlsProvider,
  useChessControls
} from '../../components/workshop/chess/context/ChessControlsContext'
import '@kol/ui/css/analytics.css'

// Chess data imports
import { getManifest, getMonthlySummary, getGameMeta, getSampleGames } from '@kol/chess-data'
import {
  parseEcoUrl,
  parseTimeControl,
  formatTermination,
  formatMonthLabel,
  formatTimeClass,
  formatCompactNumber,
  formatPercent
} from '../../utils/chessHelpers'

// Load chess data
const manifest = getManifest()
const monthlySummary = getMonthlySummary()
const gameMeta = getGameMeta()

// Data loaded for verification (development only)
// totalGames: manifest.totalGames, months: monthlySummary.length, gamesArray: gameMeta.length

const donutSeriesData = manifest.timeClassDistribution.map(tc => ({
  label: formatTimeClass(tc.key),
  count: tc.count,
  colorClass: `donut-color-${tc.key}`
}))

// Featured chart shows last 12 months
const FEATURED_AXIS_LABELS = (() => {
  const last12Months = monthlySummary.slice(-12)
  return last12Months.map(m => {
    const [year, month] = m.month.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return monthNames[parseInt(month) - 1]
  })
})()
const FEATURED_CHART_POINTS = FEATURED_AXIS_LABELS.length

const donutSeriesTotal = donutSeriesData.reduce((sum, item) => sum + item.count, 0)
const DONUT_CHART_VIEWBOX = 320
const DONUT_CHART_CENTER = DONUT_CHART_VIEWBOX / 2
const DONUT_CHART_RADIUS = 120
const DONUT_CHART_STROKE = 32
const DONUT_CHART_CIRCUMFERENCE = 2 * Math.PI * DONUT_CHART_RADIUS
const FEATURED_CHART_HEIGHT = 50
const FEATURED_CHART_STROKE = 4
const LINE_CHART_HEIGHT = 40
// Rating progression: last 12 months average player rating
const lineChartSeries = (() => {
  const last12Months = monthlySummary.slice(-12)
  const ratings = last12Months.map(month => month.averagePlayerRating || 1500)
  const minRating = Math.min(...ratings)
  const maxRating = Math.max(...ratings)
  const range = maxRating - minRating || 100
  // Normalize to LINE_CHART_HEIGHT scale (0-40)
  return ratings.map(rating => ((rating - minRating) / range) * 30 + 5)
})()

// Rating range by month (candlestick data)
// Computed inline to avoid expensive module-level calculation
const candlestickSeries = (() => {
  const last12Months = monthlySummary.slice(-12)

  return last12Months.map(month => {
    // Filter games for this month
    const monthGames = gameMeta.filter(g => g.month === month.month)
    const ratings = monthGames
      .map(g => g.player.rating)
      .filter(r => r && r > 0)

    if (ratings.length === 0) {
      return { high: 1500, low: 1500, open: 1500, close: 1500, variant: 'neutral' }
    }

    return {
      high: Math.max(...ratings),
      low: Math.min(...ratings),
      open: monthGames[0]?.player.rating || ratings[0],
      close: monthGames[monthGames.length - 1]?.player.rating || ratings[ratings.length - 1],
      variant: month.results.win > month.results.loss ? 'accent' : 'neutral'
    }
  })
})()

// Opponent strength vs time control (scatter plot data)
const scatterPoints = (() => {
  return gameMeta
    .filter(game => game.opponent?.rating && game.timeControl)
    .slice(0, 500) // Limit to 500 points for performance
    .map((game, idx) => {
      const timeInSeconds = parseTimeControl(game.timeControl)
      return {
        x: timeInSeconds,
        y: game.opponent.rating,
        id: idx,
        result: game.player.result // For potential color coding
      }
    })
})()

// Phase 6 Visualizations Data

// 1. Result Pie Chart - Lifetime win/loss/draw distribution
const lifetimeResults = (() => {
  const totals = monthlySummary.reduce((acc, month) => ({
    win: acc.win + month.results.win,
    draw: acc.draw + month.results.draw,
    loss: acc.loss + month.results.loss
  }), { win: 0, draw: 0, loss: 0 })

  const total = totals.win + totals.draw + totals.loss

  return [
    { label: 'Wins', count: totals.win, percent: (totals.win / total) * 100, color: '#10B981' },
    { label: 'Losses', count: totals.loss, percent: (totals.loss / total) * 100, color: '#DC2626' },
    { label: 'Draws', count: totals.draw, percent: (totals.draw / total) * 100, color: '#6B7280' }
  ]
})()

// 2. Rating Histogram - Rating distribution in 100-point buckets
const ratingHistogram = (() => {
  const ratings = gameMeta
    .map(g => g.player.rating)
    .filter(r => r && r > 0)

  // Find min/max for buckets
  const minRating = Math.min(...ratings)
  const maxRating = Math.max(...ratings)
  const bucketSize = 100
  const startBucket = Math.floor(minRating / bucketSize) * bucketSize
  const endBucket = Math.ceil(maxRating / bucketSize) * bucketSize

  // Create buckets
  const buckets = []
  for (let i = startBucket; i < endBucket; i += bucketSize) {
    buckets.push({
      range: `${i}-${i + bucketSize}`,
      min: i,
      max: i + bucketSize,
      count: 0
    })
  }

  // Fill buckets
  ratings.forEach(rating => {
    const bucketIndex = Math.floor((rating - startBucket) / bucketSize)
    if (buckets[bucketIndex]) {
      buckets[bucketIndex].count++
    }
  })

  return buckets
})()

// 3. Hourly Heatmap - 7×24 grid of game activity
const heatmapData = (() => {
  const grid = Array(7).fill(null).map(() => Array(24).fill(0))
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  gameMeta.forEach(game => {
    if (game.endTime) {
      const date = new Date(game.endTime * 1000)
      const day = date.getDay() // 0 (Sunday) to 6 (Saturday)
      const hour = date.getHours() // 0 to 23
      grid[day][hour]++
    }
  })

  // Find max for color scaling
  const maxGames = Math.max(...grid.flat())

  return {
    grid,
    dayNames,
    maxGames
  }
})()

// 4. Top 5 Best Wins - Highest rated opponents defeated
const top5BestWins = (() => {
  const wins = gameMeta
    .filter(game => game.playerResult === 'win' && game.player.rating && game.opponent?.rating)
    .map(game => {
      let opponentName = game.opponent.username
      // Add FM title for MRBigtimer
      if (opponentName === 'MRBigtimer') {
        opponentName = 'MRBigtimer FM'
      }

      return {
        opponent: opponentName,
        opponentRating: game.opponent.rating,
        playerRating: game.player.rating,
        ratingDiff: game.opponent.rating - game.player.rating,
        url: game.url,
        endTime: game.endTime
      }
    })
    .sort((a, b) => b.opponentRating - a.opponentRating) // Highest rated opponent first
    .slice(0, 5)

  return wins
})()

// Helper function to get time range label and months
const getTimeRangeInfo = (timeRange) => {
  switch(timeRange) {
    case '1year':
      return {
        label: 'Last year',
        months: 12,
        subtitle: 'Results for the last 12 months'
      }
    case '3years':
      return {
        label: 'Last 3 years',
        months: 36,
        subtitle: 'Results for the last 36 months'
      }
    case 'all':
    default:
      return {
        label: 'All time',
        months: 108,
        subtitle: 'Results for all 108 months (2016-2024)'
      }
  }
}

const LegacySidebarPreview = () => {
  const games = useMemo(() => getSampleGames(), [])
  const defaultGameId = games[0]?.id ?? null
  const [selectedGameId, setSelectedGameId] = useState(() => defaultGameId)
  const [moveIndex, setMoveIndex] = useState(0)
  const [, setIsPlaying] = useState(false)
  const maxMoveIndex = Math.max(games.length - 1, 0)

  const handleSelectGame = (event) => {
    setSelectedGameId(event.target.value || null)
    setMoveIndex(0)
    setIsPlaying(false)
  }

  const selectedGame = games.find((game) => game.id === selectedGameId) ?? games[0] ?? null
  const goToStart = () => setMoveIndex(0)
  const stepBackward = () => setMoveIndex((index) => Math.max(index - 1, 0))
  const stepForward = () => setMoveIndex((index) => Math.min(index + 1, maxMoveIndex))
  const goToEnd = () => setMoveIndex(maxMoveIndex)
  const togglePlayback = () => {
    setIsPlaying((value) => !value)
  }

  return (
    <ChessSidebar
      selectedGame={selectedGame}
      selectedGameId={selectedGameId}
      sampleGames={games}
      moveIndex={moveIndex}
      onSelectGame={handleSelectGame}
      onGoToStart={goToStart}
      onStepBackward={stepBackward}
      onStepForward={stepForward}
      onGoToEnd={goToEnd}
      onTogglePlayback={togglePlayback}
      size="md"
      onToggleFullscreen={null}
      isFullscreen={false}
    />
  )
}

const LegacyMockPreview = () => {
  return (
    <ChessControlsProvider>
      <div className="h-full flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] bg-opacity-hex-01 rounded border border-opacity-hex-08 p-4">
          <AlternativeControlsMock />
        </div>
      </div>
    </ChessControlsProvider>
  )
}

const ControlsPanelSidebarPreview = () => {
  const {
    filteredGames,
    selectedGame,
    selectedGameId,
    setSelectedGameId,
    moveIndex,
    goToStart,
    stepBackward,
    stepForward,
    goToEnd,
    togglePlayback
  } = useChessControls()

  const handleSelectGame = (event) => {
    setSelectedGameId(event.target.value || null)
  }

  return (
    <div className="min-h-[900px] p-2 flex items-center justify-center">
      <div className="w-[400px] h-[720px]">
        <ChessSidebar
          selectedGame={selectedGame}
          selectedGameId={selectedGameId}
          sampleGames={filteredGames}
          moveIndex={moveIndex}
          onSelectGame={handleSelectGame}
          onGoToStart={goToStart}
          onStepBackward={stepBackward}
          onStepForward={stepForward}
          onGoToEnd={goToEnd}
          onTogglePlayback={togglePlayback}
          size="md"
          onToggleFullscreen={null}
          isFullscreen={false}
        />
      </div>
    </div>
  )
}


const AnalyticsComponents = () => {
  const [hoverData, setHoverData] = useState(null)
  const [stackedHoverData, setStackedHoverData] = useState(null)
  const [checkedItems, setCheckedItems] = useState(() => donutSeriesData.map(() => true))
  const [timeRange, setTimeRange] = useState('all') // 'all', '3years', '1year'

  // Memoized chart data - recalculates when timeRange changes
  // Card 3: Time Series Chart - Win/Loss Trend
  const chartData = useMemo(() => {
    // Calculate months to show based on timeRange
    let monthsToShow
    switch(timeRange) {
      case '1year':
        monthsToShow = 12
        break
      case '3years':
        monthsToShow = 36
        break
      case 'all':
      default:
        monthsToShow = monthlySummary.length // 108 months
        break
    }

    const selectedMonths = monthlySummary.slice(-monthsToShow)

    // Calculate cumulative wins and losses per day (approximated from monthly data)
    const daysPerMonth = 30
    const points = monthsToShow * daysPerMonth
    const wins = []
    const losses = []

    selectedMonths.forEach((month) => {
      const monthWins = month.results.win
      const monthLosses = month.results.loss
      const monthTotal = month.total

      // Distribute wins/losses across days with some variance
      for (let day = 0; day < daysPerMonth; day++) {
        const dayProgress = day / daysPerMonth
        // Cumulative up to this point in the month
        const cumulativeWins = monthWins * dayProgress
        const cumulativeLosses = monthLosses * dayProgress

        // Add small noise for visual interest
        const noise = Math.sin(day * 0.5) * (monthTotal * 0.02)

        wins.push(cumulativeWins + noise)
        losses.push(cumulativeLosses + noise * 0.8)
      }
    })

    // Normalize to fit in 5-45 range (with padding in 0-50 viewBox)
    const allValues = [...wins, ...losses]
    const min = Math.min(...allValues)
    const max = Math.max(...allValues)
    const range = max - min || 1

    const normalizedWins = wins.map(v => 5 + ((v - min) / range) * 40)
    const normalizedLosses = losses.map(v => 5 + ((v - min) / range) * 40)

    return {
      mobile: normalizedWins,  // Repurpose "mobile" for wins
      desktop: normalizedLosses, // Repurpose "desktop" for losses
      points,
      monthlyData: selectedMonths
    }
  }, [timeRange]) // Recalculate when timeRange changes

  // Memoized stacked area chart data - Chess Time Class Distribution
  const stackedChartData = useMemo(() => {
    const points = 90
    const blitz = []
    const bullet = []
    const rapid = []
    const daily = []

    // Get time class data
    const timeClasses = manifest.timeClassDistribution
    const blitzData = timeClasses.find(tc => tc.key === 'blitz') || { count: 0 }
    const bulletData = timeClasses.find(tc => tc.key === 'bullet') || { count: 0 }
    const rapidData = timeClasses.find(tc => tc.key === 'rapid') || { count: 0 }
    const dailyData = timeClasses.find(tc => tc.key === 'daily') || { count: 0 }

    // Calculate base values from actual data
    const total = blitzData.count + bulletData.count + rapidData.count + dailyData.count || 1
    const blitzBase = (blitzData.count / total) * 40
    const bulletBase = (bulletData.count / total) * 35
    const rapidBase = (rapidData.count / total) * 30
    const dailyBase = (dailyData.count / total) * 25

    // Generate trend data for each time class
    for (let i = 0; i < points; i++) {
      const x = i / points
      const noise1 = Math.sin(x * Math.PI * 6) * 3
      const noise2 = Math.sin(x * Math.PI * 15) * 2
      const random = Math.sin(i * 7.531) * 1

      blitz.push(blitzBase + noise1 + noise2 + random)
      bullet.push(bulletBase + noise1 * 0.8 + noise2 * 0.7 + random * 0.9)
      rapid.push(rapidBase + noise1 * 0.6 + noise2 * 0.5 + random * 0.8)
      daily.push(dailyBase + noise1 * 0.4 + noise2 * 0.3 + random * 0.7)
    }

    // Calculate stacked values (each layer starts where previous ends)
    const stackedBlitz = blitz.map((v, i) => v)
    const stackedBullet = bullet.map((v, i) => v + stackedBlitz[i])
    const stackedRapid = rapid.map((v, i) => v + stackedBullet[i])
    const stackedDaily = daily.map((v, i) => v + stackedRapid[i])

    // Normalize all to fit in viewBox
    const allValues = [...stackedDaily]
    const max = Math.max(...allValues)

    const normalizedBlitz = stackedBlitz.map(v => (v / max) * 45)
    const normalizedBullet = stackedBullet.map(v => (v / max) * 45)
    const normalizedRapid = stackedRapid.map(v => (v / max) * 45)
    const normalizedDaily = stackedDaily.map(v => (v / max) * 45)

    return {
      blitz: normalizedBlitz,
      bullet: normalizedBullet,
      rapid: normalizedRapid,
      daily: normalizedDaily,
      rawBlitz: blitz,
      rawBullet: bullet,
      rawRapid: rapid,
      rawDaily: daily,
      points
    }
  }, [])

  const featuredChartData = useMemo(() => {
    // Use top opening ECO for featured analysis
    const topOpening = manifest.topEcos[0]
    const last12Months = monthlySummary.slice(-12)

    // Calculate win rate and usage volume per month for this opening
    const winMarginRaw = last12Months.map(month => {
      // Filter games by this ECO and month
      const monthGames = gameMeta.filter(g =>
        g.eco?.url === topOpening.key &&
        g.month === month.month
      )
      if (monthGames.length === 0) return 25

      const wins = monthGames.filter(g => g.player.result === 'win').length
      return (wins / monthGames.length) * 100
    })

    const usageVolumeRaw = last12Months.map(month => {
      // Count games with this opening in this month
      const monthGames = gameMeta.filter(g =>
        g.eco?.url === topOpening.key &&
        g.month === month.month
      )
      return monthGames.length
    })

    const allValues = [...winMarginRaw, ...usageVolumeRaw]
    const min = Math.min(...allValues)
    const max = Math.max(...allValues)
    const range = max - min || 1

    const normalize = (series) => series.map(value => {
      const scaled = (value - min) / range
      return 8 + scaled * 32
    })

    return {
      winMargin: normalize(winMarginRaw),
      usageVolume: normalize(usageVolumeRaw),
      openingName: parseEcoUrl(topOpening.key),
      totalGames: topOpening.count,
      avgWinRate: winMarginRaw.reduce((sum, v) => sum + v, 0) / winMarginRaw.length
    }
  }, [])

  // Generate smooth Bézier curve path
  const generateSmoothPath = (values, height = FEATURED_CHART_HEIGHT) => {
    if (values.length < 2) return ''

    const points = values.map((val, i) => ({
      x: (i / (values.length - 1)) * 100,
      y: height - val
    }))

    // Create smooth curve using simplified cubic Bézier
    let path = `M ${points[0].x},${points[0].y}`

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      const controlPointDistance = (next.x - current.x) * 0.5

      const cp1x = current.x + controlPointDistance
      const cp1y = current.y
      const cp2x = next.x - controlPointDistance
      const cp2y = next.y

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`
    }

    return path
  }

  const mobileLinePath = generateSmoothPath(chartData.mobile)
  const desktopLinePath = generateSmoothPath(chartData.desktop)
  const mobileAreaPath = mobileLinePath + ' L 100,50 L 0,50 Z'
  const desktopAreaPath = desktopLinePath + ' L 100,50 L 0,50 Z'

  // Generate stacked area paths - properly closed areas
  const generateStackedAreaPath = (topValues, bottomValues = null) => {
    const topPath = generateSmoothPath(topValues)

    if (!bottomValues) {
      // Base layer - close to bottom
      return topPath + ' L 100,50 L 0,50 Z'
    }

    // Upper layers - close by following bottom curve backwards
    const bottomPoints = bottomValues.map((val, i) => ({
      x: (i / (bottomValues.length - 1)) * 100,
      y: 50 - val
    })).reverse()

    let reversePath = ''
    for (let i = 0; i < bottomPoints.length - 1; i++) {
      const current = bottomPoints[i]
      const next = bottomPoints[i + 1]
      const controlPointDistance = (current.x - next.x) * 0.5

      const cp1x = current.x - controlPointDistance
      const cp1y = current.y
      const cp2x = next.x + controlPointDistance
      const cp2y = next.y

      if (i === 0) {
        reversePath += ` L ${current.x},${current.y}`
      }
      reversePath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`
    }

    return topPath + reversePath + ' Z'
  }

  const blitzLinePath = generateSmoothPath(stackedChartData.blitz)
  const bulletLinePath = generateSmoothPath(stackedChartData.bullet)
  const rapidLinePath = generateSmoothPath(stackedChartData.rapid)
  const dailyLinePath = generateSmoothPath(stackedChartData.daily)

  const blitzAreaPath = generateStackedAreaPath(stackedChartData.blitz)
  const bulletAreaPath = generateStackedAreaPath(stackedChartData.bullet, stackedChartData.blitz)
  const rapidAreaPath = generateStackedAreaPath(stackedChartData.rapid, stackedChartData.bullet)
  const dailyAreaPath = generateStackedAreaPath(stackedChartData.daily, stackedChartData.rapid)

  const featuredWinPath = generateSmoothPath(featuredChartData.winMargin)
  const featuredUsagePath = generateSmoothPath(featuredChartData.usageVolume)
  const featuredWinAreaPath = `${featuredWinPath} L 100,${FEATURED_CHART_HEIGHT} L 0,${FEATURED_CHART_HEIGHT} Z`
  const featuredUsageAreaPath = `${featuredUsagePath} L 100,${FEATURED_CHART_HEIGHT} L 0,${FEATURED_CHART_HEIGHT} Z`

  const donutActiveCount = donutSeriesData.reduce((sum, item, idx) => sum + (checkedItems[idx] ? item.count : 0), 0)
  const hasActiveSegments = donutActiveCount > 0
  const donutArcTotal = hasActiveSegments ? donutActiveCount : 1
  let accumulatedCount = 0
  const donutSegments = donutSeriesData.map((item, idx) => {
    const isActive = Boolean(checkedItems[idx])
    const arcValue = isActive && hasActiveSegments ? item.count : 0
    const offsetRatio = arcValue > 0 ? accumulatedCount / donutArcTotal : 0
    if (arcValue > 0) {
      accumulatedCount += arcValue
    }
    const percentOfAll = Number(((item.count / donutSeriesTotal) * 100).toFixed(1))
    return {
      ...item,
      isActive,
      percentOfAll,
      arcRatio: arcValue > 0 ? arcValue / donutArcTotal : 0,
      offsetRatio
    }
  })
  const donutActiveShare = hasActiveSegments ? (donutActiveCount / donutSeriesTotal) * 100 : 0
  const lineChartPath = lineChartSeries.reduce((acc, value, index) => {
    const x = (index / (lineChartSeries.length - 1)) * 100
    const y = LINE_CHART_HEIGHT - value
    const command = index === 0 ? 'M' : 'L'
    return `${acc} ${command} ${x},${y}`
  }, '').trim()
  const candlestickMin = Math.min(...candlestickSeries.map(item => item.low))
  const candlestickMax = Math.max(...candlestickSeries.map(item => item.high))
  const candlestickRange = candlestickMax - candlestickMin || 1
  const scaleCandlestick = (value) => ((value - candlestickMin) / candlestickRange) * 100
  const candlestickColors = {
    accent: {
      body: 'var(--kol-accent-primary)',
      wick: 'var(--kol-accent-primary)'
    },
    neutral: {
      body: 'var(--kol-surface-on-primary)',
      wick: 'var(--kol-surface-on-primary)'
    }
  }
  // Scatter plot axes based on actual data ranges
  const scatterMaxX = Math.max(...scatterPoints.map(p => p.x), 600) // Max time control (default 600s = 10min)
  const scatterMaxY = Math.max(...scatterPoints.map(p => p.y), 2400) // Max opponent rating (default 2400)

  return (
    <div className="flex flex-col gap-12">
      <DesPage
        title="Chess Components"
        subtitle="Individual dashboard elements with descriptions and usage patterns"
        meta="Component library • Cards • Charts • Patterns"
      />

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: KPI + Stacked Bar Mini */}
        <div className="flex flex-col gap-6">
          {/* KPI Card with Border Accent */}
          <div className="flex flex-col gap-6">
            <DesCard
              name="1. KPI Card with Border Accent"
              description="Metric card with left border accent (3px yellow), displays key performance indicator with label, value, and delta. Component: DashKpiCard"
            />
            <div
              className="flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px]"
              style={{ borderLeftWidth: '3px', borderLeftColor: '#F5D245' }}
            >
              <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">GAMES PLAYED</span>
              <span className="kol-heading-lg">{formatCompactNumber(manifest.totalGames)}</span>
              <span className="kol-mono-sm text-fg-80">
                {monthlySummary.length >= 2 ? (
                  `+${monthlySummary[monthlySummary.length - 1].total - monthlySummary[monthlySummary.length - 2].total}`
                ) : '+0'}
              </span>
            </div>
          </div>

          {/* Stacked Bar Mini Card */}
          <div className="flex flex-col gap-6">
            <DesCard
              name="2. Stacked Bar Mini Card"
              description="Compact card with heading, large value display, and multi-layer stacked bar chart. Each bar shows 3 opacity levels. Component: DashStackedBarMiniCard"
            />
            <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px]">
              {(() => {
                const last12Months = monthlySummary.slice(-12)
                const totalWins = last12Months.reduce((sum, m) => sum + m.results.win, 0)
                const totalGames = last12Months.reduce((sum, m) => sum + m.total, 0)
                const winRate = totalGames > 0 ? (totalWins / totalGames) * 100 : 0

                return (
                  <>
                    <span className="kol-heading-sm">WIN RATE</span>
                    <span className="kol-heading-lg">{winRate.toFixed(1)}%</span>

                    <div className="flex-1 flex items-end gap-1">
                      {last12Months.map((month, i) => {
                        const monthWinRate = month.total > 0 ? (month.results.win / month.total) * 100 : 0
                        const monthDrawRate = month.total > 0 ? (month.results.draw / month.total) * 100 : 0
                        const monthLossRate = month.total > 0 ? (month.results.loss / month.total) * 100 : 0

                        return (
                          <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                            <div className="bg-fg-32 rounded-sm" style={{ height: `${monthWinRate}%` }} />
                            <div className="bg-fg-24 rounded-sm" style={{ height: `${monthDrawRate}%` }} />
                            <div className="bg-fg-16 rounded-sm" style={{ height: `${monthLossRate}%` }} />
                          </div>
                        )
                      })}
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>

        {/* Right Column: Time Series Chart */}
        <div className="flex flex-col gap-6">
          <DesCard
            name="3. Time Series Chart Card"
            description="Large chart with title, subtitle, time period selector buttons, multi-line graph with grid, and x-axis date labels. Component: Built-in (no standalone component)"
          />
          <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[600px]">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5">
                <span className="kol-heading-md">Win/Loss Trend</span>
                <span className="kol-mono-xs text-fg-64">{getTimeRangeInfo(timeRange).subtitle}</span>
              </div>

              {/* Time Selector */}
              <div className="flex">
                <button
                  onClick={() => setTimeRange('all')}
                  className={`px-4 h-9 rounded-l kol-mono-xs transition-colors ${
                    timeRange === 'all'
                      ? 'bg-fg-08 border border-fg-12 text-fg-88'
                      : 'border-t border-r border-b border-fg-08 text-fg-64 hover:text-fg-80'
                  }`}
                >
                  All time
                </button>
                <button
                  onClick={() => setTimeRange('3years')}
                  className={`px-4 h-9 border-t border-r border-b kol-mono-xs transition-colors ${
                    timeRange === '3years'
                      ? 'bg-fg-08 border border-fg-12 text-fg-88'
                      : 'border-fg-08 text-fg-64 hover:text-fg-80'
                  }`}
                >
                  Last 3 years
                </button>
                <button
                  onClick={() => setTimeRange('1year')}
                  className={`px-4 h-9 border-t border-r border-b rounded-r kol-mono-xs transition-colors ${
                    timeRange === '1year'
                      ? 'bg-fg-08 border border-fg-12 text-fg-88'
                      : 'border-fg-08 text-fg-64 hover:text-fg-80'
                  }`}
                >
                  Last year
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 flex flex-col gap-2">
              <div
                className="flex-1 relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width)
                  const index = Math.round(x * (chartData.points - 1))

                  // Generate date labels from actual month data
                  const last3Months = chartData.monthlyData || monthlySummary.slice(-3)
                  const monthLabels = last3Months.map(m => formatMonthLabel(m.month))

                  // Determine which month this index falls into
                  const monthIndex = Math.floor(index / 30)
                  const dayInMonth = (index % 30) + 1

                  const xPos = (index / (chartData.points - 1)) * 100
                  const yWins = 50 - chartData.mobile[index]  // mobile = wins
                  const yLosses = 50 - chartData.desktop[index] // desktop = losses

                  // Calculate actual raw values for display
                  const monthData = last3Months[monthIndex]
                  const dayRatio = dayInMonth / 30
                  const winsAtDay = Math.round(monthData.results.win * dayRatio)
                  const lossesAtDay = Math.round(monthData.results.loss * dayRatio)

                  setHoverData({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    date: `${monthLabels[monthIndex]} ${dayInMonth}`,
                    mobile: winsAtDay,     // Display actual win count
                    desktop: lossesAtDay,  // Display actual loss count
                    index,
                    xPos,
                    yMobile: yWins,
                    yDesktop: yLosses
                  })
                }}
                onMouseLeave={() => setHoverData(null)}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-px bg-fg-08" />
                  ))}
                </div>

                {/* Area chart with gradient */}
                <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    {/* Gradient for Wins (green/yellow) */}
                    <linearGradient id="winsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34D399" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
                    </linearGradient>
                    {/* Gradient for Losses (red) */}
                    <linearGradient id="lossesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Losses area (back layer) */}
                  <path
                    d={desktopAreaPath}
                    fill="url(#lossesGradient)"
                  />
                  {/* Losses line */}
                  <path
                    d={desktopLinePath}
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="0.4"
                  />

                  {/* Wins area (front layer) */}
                  <path
                    d={mobileAreaPath}
                    fill="url(#winsGradient)"
                  />
                  {/* Wins line */}
                  <path
                    d={mobileLinePath}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="0.4"
                  />

                  {/* Hover dots */}
                  {hoverData && (
                    <>
                      {/* Wins dot */}
                      <circle
                        cx={hoverData.xPos}
                        cy={hoverData.yMobile}
                        r="1.2"
                        fill="#10B981"
                        stroke="#1E293B"
                        strokeWidth="0.5"
                        className="pointer-events-none"
                      />
                      {/* Losses dot */}
                      <circle
                        cx={hoverData.xPos}
                        cy={hoverData.yDesktop}
                        r="1.2"
                        fill="#DC2626"
                        stroke="#1E293B"
                        strokeWidth="0.5"
                        className="pointer-events-none"
                      />
                    </>
                  )}
                </svg>

                {/* Tooltip */}
                {hoverData && (
                  <div
                    className="absolute bg-[#0a0a0a] border border-fg-16 rounded p-3 pointer-events-none z-10"
                    style={{
                      left: `${hoverData.x}px`,
                      top: `${Math.max(80, hoverData.y - 80)}px`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <span className="kol-mono-xs text-fg-88">{hoverData.date}</span>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="kol-mono-xs text-fg-64">Wins</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{hoverData.mobile}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                          <span className="kol-mono-xs text-fg-64">Losses</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{hoverData.desktop}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between">
                {(() => {
                  const last3Months = monthlySummary.slice(-3)
                  // Generate evenly spaced date labels (14 labels across 90 days)
                  const labelCount = 14
                  const labels = []

                  for (let i = 0; i < labelCount; i++) {
                    const dayIndex = Math.floor((i / (labelCount - 1)) * 89) // 0-89 days
                    const monthIdx = Math.floor(dayIndex / 30)
                    const dayInMonth = (dayIndex % 30) + 1

                    const monthLabel = formatMonthLabel(last3Months[monthIdx]?.month || last3Months[0].month)
                    const shortMonth = monthLabel.split(' ')[0] // "Jan 2025" -> "Jan"

                    labels.push(`${shortMonth} ${dayInMonth}`)
                  }

                  return labels.map((date, idx) => (
                    <span key={idx} className="kol-mono-xxs text-fg-64">{date}</span>
                  ))
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Large Chart Card */}
        <div className="flex flex-col gap-6">
          <DesCard
            name="Large Chart Card"
            description="Primary visualization card with header metrics, chart area placeholder, and legend. Uses flexible layout with min-height."
          />
          <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[480px]">
            <div className="flex items-center justify-between">
              {(() => {
                const totalWins = monthlySummary.reduce((sum, m) => sum + m.results.win, 0)
                const totalGames = monthlySummary.reduce((sum, m) => sum + m.total, 0)
                const winRate = totalGames > 0 ? (totalWins / totalGames) * 100 : 0

                return (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">WIN RATE</span>
                      <span className="kol-heading-xl">{winRate.toFixed(1)}%</span>
                    </div>
                    <span className="kol-mono-sm text-fg-64">{manifest.monthsTracked} months</span>
                  </>
                )
              })()}
            </div>

            {/* Stacked Area Chart */}
            <div className="flex-1 flex flex-col gap-2 overflow-hidden">
              <div
                className="flex-1 relative min-h-0"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width)
                  const index = Math.round(x * (stackedChartData.points - 1))

                  const dates = ['Apr 2', 'Apr 8', 'Apr 14', 'Apr 21', 'Apr 28', 'May 5', 'May 12', 'May 19', 'May 25', 'Jun 2', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 30']
                  const dateIndex = Math.floor(x * (dates.length - 1))

                  const xPos = (index / (stackedChartData.points - 1)) * 100
                  const yBlitz = 50 - stackedChartData.blitz[index]
                  const yBullet = 50 - stackedChartData.bullet[index]
                  const yRapid = 50 - stackedChartData.rapid[index]
                  const yDaily = 50 - stackedChartData.daily[index]

                  setStackedHoverData({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    date: dates[dateIndex],
                    blitz: Math.round(stackedChartData.rawBlitz[index] * 10),
                    bullet: Math.round(stackedChartData.rawBullet[index] * 10),
                    rapid: Math.round(stackedChartData.rawRapid[index] * 10),
                    daily: Math.round(stackedChartData.rawDaily[index] * 10),
                    index,
                    xPos,
                    yBlitz,
                    yBullet,
                    yRapid,
                    yDaily
                  })
                }}
                onMouseLeave={() => setStackedHoverData(null)}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-px bg-fg-08" />
                  ))}
                </div>

                {/* Stacked Area Chart */}
                <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="blitzGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="bulletGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34D399" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="rapidGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Blitz (bottom layer) */}
                  <path d={blitzAreaPath} fill="url(#blitzGradient)" />
                  <path d={blitzLinePath} fill="none" stroke="#60A5FA" strokeWidth="0.4" />

                  {/* Bullet (2nd layer) */}
                  <path d={bulletAreaPath} fill="url(#bulletGradient)" />
                  <path d={bulletLinePath} fill="none" stroke="#34D399" strokeWidth="0.4" />

                  {/* Rapid (3rd layer) */}
                  <path d={rapidAreaPath} fill="url(#rapidGradient)" />
                  <path d={rapidLinePath} fill="none" stroke="#F59E0B" strokeWidth="0.4" />

                  {/* Daily (top layer) */}
                  <path d={dailyAreaPath} fill="url(#dailyGradient)" />
                  <path d={dailyLinePath} fill="none" stroke="#A78BFA" strokeWidth="0.4" />

                  {/* Hover dots */}
                  {stackedHoverData && (
                    <>
                      <circle cx={stackedHoverData.xPos} cy={stackedHoverData.yBlitz} r="1.2" fill="#60A5FA" stroke="#1E293B" strokeWidth="0.5" />
                      <circle cx={stackedHoverData.xPos} cy={stackedHoverData.yBullet} r="1.2" fill="#34D399" stroke="#1E293B" strokeWidth="0.5" />
                      <circle cx={stackedHoverData.xPos} cy={stackedHoverData.yRapid} r="1.2" fill="#F59E0B" stroke="#1E293B" strokeWidth="0.5" />
                      <circle cx={stackedHoverData.xPos} cy={stackedHoverData.yDaily} r="1.2" fill="#A78BFA" stroke="#1E293B" strokeWidth="0.5" />
                    </>
                  )}
                </svg>

                {/* Tooltip */}
                {stackedHoverData && (
                  <div
                    className="absolute bg-[#0a0a0a] border border-fg-16 rounded p-3 pointer-events-none z-10"
                    style={{
                      left: `${stackedHoverData.x}px`,
                      top: `${Math.max(100, stackedHoverData.y - 100)}px`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <span className="kol-mono-xs text-fg-88">{stackedHoverData.date}</span>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                          <span className="kol-mono-xs text-fg-64">Blitz</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{stackedHoverData.blitz}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                          <span className="kol-mono-xs text-fg-64">Bullet</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{stackedHoverData.bullet}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                          <span className="kol-mono-xs text-fg-64">Rapid</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{stackedHoverData.rapid}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
                          <span className="kol-mono-xs text-fg-64">Daily</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{stackedHoverData.daily}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                <span className="kol-mono-xs text-fg-64">Blitz</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#34D399]" />
                <span className="kol-mono-xs text-fg-64">Bullet</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="kol-mono-xs text-fg-64">Rapid</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#A78BFA]" />
                <span className="kol-mono-xs text-fg-64">Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Stacked Bar Card */}
        <div className="flex flex-col gap-6 row-span-1">
          <DesCard
            name="5. Compact Stacked Bar Card"
            description="Small card with icon menu, title, subtitle, and mini stacked bar visualization. Good for sidebar displays. Component: DashCompactStackedBarCard"
          />
          <div className="flex flex-col p-6 bg-fg-02 border border-fg-08 rounded h-full">
            {/* Header with title and icon */}
            <div className="flex justify-between items-center mb-6">
              <span className="kol-heading-md">blitz</span>
              <div className="h-6 flex justify-center items-center overflow-visible">
                <Icon name="chess-rook" size={24} className="text-fg-88" />
              </div>
            </div>

            {/* Win rate metric */}
            {(() => {
              const last16Months = monthlySummary.slice(-16)
              const totalGames = last16Months.reduce((sum, month) => sum + (month.timeClass.blitz || 0), 0)
              const totalWins = last16Months.reduce((sum, month) => sum + month.results.win, 0)
              const winRate = totalGames > 0 ? (totalWins / totalGames) * 100 : 0
              const isPositive = winRate >= 47.1

              return (
                <div className="flex items-end gap-3 mb-4">
                  <span className="kol-heading-lg">{winRate.toFixed(1)}%</span>
                  <span className="kol-mono-xs text-fg-64 mb-1 uppercase tracking-widest">win rate</span>
                  <Icon
                    name={isPositive ? 'trending-up' : 'trending-down'}
                    size={16}
                    className="text-fg-64 mb-1"
                  />
                </div>
              )
            })()}

            {/* Stacked bar chart with last 16 months - fills available height */}
            <div className="flex-1 flex items-stretch gap-1 min-h-0">
              {monthlySummary.slice(-16).map((month, i) => {
                const total = month.timeClass.blitz || 0
                const winHeight = total > 0 ? (month.results.win / total) * 100 : 0
                const drawHeight = total > 0 ? (month.results.draw / total) * 100 : 0
                const lossHeight = total > 0 ? (month.results.loss / total) * 100 : 0
                const totalHeight = Math.max(winHeight + drawHeight + lossHeight, 10) // Min 10% for visibility

                return (
                  <div key={i} className="flex-1 flex flex-col justify-end items-start gap-1" style={{ height: '100%' }}>
                    <div className="w-full flex flex-col justify-start gap-1" style={{ height: `${totalHeight}%` }}>
                      <div className="w-full flex-1 bg-white" style={{ height: `${winHeight}%` }} />
                      <div className="w-full h-2.5 bg-[#6366F1]" style={{ height: `${drawHeight}%` }} />
                      <div className="w-full flex-1 bg-[#475569]" style={{ height: `${lossHeight}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer with labels */}
            <div className="flex justify-between items-start mt-6">
              <span className="kol-mono-xs text-fg-64">{manifest.monthsTracked} months</span>
              <span className="kol-mono-xs text-fg-64">Total games</span>
            </div>
          </div>
        </div>

        {/* Highest ELO by Time Control Card */}
        <div className="flex flex-col gap-6 row-span-1">
          <DesCard
            name="6. Highest ELO by Time Control Card"
            description="Shows peak ELO rating achieved in each time control: Blitz, Bullet, Rapid, and Daily. Component: DashPeakRatingsCard"
          />
          <div className="flex flex-col p-6 bg-fg-02 border border-fg-08 rounded h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="kol-heading-md">Peak Ratings</span>
              <Icon name="stat-crown" size={24} className="text-fg-88" />
            </div>

            {/* Time controls with highest ELO */}
            <div className="space-y-4">
              {(() => {
                const timeControls = ['blitz', 'bullet', 'rapid', 'daily']
                const timeControlData = timeControls.map(tc => {
                  const games = gameMeta.filter(g => g.timeClass === tc && g.player?.rating)
                  const highestElo = games.length > 0 ? Math.max(...games.map(g => g.player.rating)) : 0
                  const gameCount = games.length

                  return {
                    name: tc.charAt(0).toUpperCase() + tc.slice(1),
                    rating: highestElo,
                    games: gameCount,
                    color: tc === 'blitz' ? 'bg-blue-500' : tc === 'bullet' ? 'bg-green-500' : tc === 'rapid' ? 'bg-orange-500' : 'bg-purple-500'
                  }
                }).filter(tc => tc.rating > 0)

                return timeControlData.map((tc) => (
                  <div key={tc.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${tc.color}`} />
                      <span className="kol-mono-sm text-fg-80">{tc.name}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="kol-heading-md">{tc.rating}</span>
                      <span className="kol-mono-xs text-fg-64">{tc.games} games</span>
                    </div>
                  </div>
                ))
              })()}
            </div>
          </div>
        </div>

      {/* Donut Chart Card 1 */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="7. Donut Chart Card"
          description="Distribution visualization with interactive donut chart, live legend, and checkbox list that toggles individual segments. Component: DonutChart"
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[400px]">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="kol-mono-sm text-fg-80 uppercase tracking-wider">Time Class Breakdown</span>
              <span className="kol-mono-xs text-fg-64">Distribution across game types</span>
            </div>
            <div className="flex flex-wrap gap-4 kol-mono-xs text-fg-64">
              {donutSegments.map((segment) => (
                <div key={segment.label} className="flex items-center gap-2">
                  <span
                    className={`donut-chart__dot ${segment.colorClass} ${segment.isActive ? '' : 'is-muted'}`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-1">
                    <span className={segment.isActive ? '' : 'text-fg-48'}>{segment.label}</span>
                    <span className="kol-mono-xxs text-fg-48">
                      ({formatPercent(segment.percentOfAll)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg
                viewBox={`0 0 ${DONUT_CHART_VIEWBOX} ${DONUT_CHART_VIEWBOX}`}
                className="w-full h-full"
                role="img"
                aria-label="Operating system distribution donut chart"
              >
                <circle
                  cx={DONUT_CHART_CENTER}
                  cy={DONUT_CHART_CENTER}
                  r={DONUT_CHART_RADIUS}
                  stroke="var(--kol-border-subtle)"
                  strokeWidth={DONUT_CHART_STROKE}
                  fill="none"
                />
                {donutSegments.map((segment) => (
                  segment.arcRatio > 0 ? (
                    <circle
                      key={segment.label}
                      cx={DONUT_CHART_CENTER}
                      cy={DONUT_CHART_CENTER}
                      r={DONUT_CHART_RADIUS}
                      strokeWidth={DONUT_CHART_STROKE}
                      className={`donut-chart__segment ${segment.colorClass}`}
                      strokeDasharray={`${segment.arcRatio * DONUT_CHART_CIRCUMFERENCE} ${DONUT_CHART_CIRCUMFERENCE}`}
                      strokeDashoffset={-segment.offsetRatio * DONUT_CHART_CIRCUMFERENCE}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${DONUT_CHART_CENTER} ${DONUT_CHART_CENTER})`}
                    />
                  ) : null
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-6 pointer-events-none">
                <span className="kol-mono-xxs text-fg-64 uppercase tracking-widest">Total games</span>
                <span className="kol-heading-lg">
                  {hasActiveSegments ? formatCompactNumber(donutActiveCount) : '0'}
                </span>
                <span className="kol-mono-xs text-fg-64">
                  {hasActiveSegments ? `${formatPercent(donutActiveShare)}% of total` : 'Enable a class'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {donutSegments.map((segment, idx) => (
              <div key={segment.label} className="flex items-center justify-between gap-4 py-2 border-b border-fg-04">
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={segment.isActive}
                    onChange={(checked) => {
                      setCheckedItems((prev) => {
                        const next = [...prev]
                        next[idx] = checked
                        return next
                      })
                    }}
                    aria-label={`Toggle ${segment.label}`}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`donut-chart__dot ${segment.colorClass} ${segment.isActive ? '' : 'is-muted'}`}
                        aria-hidden="true"
                      />
                      <span className={`kol-mono-xs ${segment.isActive ? 'text-fg-80' : 'text-fg-48'}`}>
                        {segment.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 rounded-full bg-fg-04 overflow-hidden">
                        <div
                          className={`donut-chart__bar-fill ${segment.colorClass} ${segment.isActive ? '' : 'is-muted'}`}
                          style={{ width: `${segment.percentOfAll}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="kol-mono-xxs text-fg-60">
                        {formatPercent(segment.percentOfAll)}%
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`kol-mono-xs ${segment.isActive ? 'text-fg-88' : 'text-fg-48'}`}>
                  {formatCompactNumber(segment.count)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result Pie Chart - NEW PHASE 6 */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Result Pie Chart"
          description="Lifetime win/loss/draw distribution shown as a traditional pie chart with three segments."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded h-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="kol-heading-sm">Career Results</h3>
              <p className="kol-text-sm text-fg-64">
                Lifetime win/loss/draw breakdown across {formatCompactNumber(manifest.totalGames)} games
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Pie Chart SVG */}
            <div className="relative" style={{ width: '200px', height: '200px' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                {(() => {
                  let cumulativePercent = 0
                  return lifetimeResults.map((result, idx) => {
                    const startAngle = (cumulativePercent / 100) * 360
                    const endAngle = ((cumulativePercent + result.percent) / 100) * 360
                    cumulativePercent += result.percent

                    // Convert to path coordinates (SVG circle path)
                    const start = {
                      x: 50 + 50 * Math.cos((Math.PI * startAngle) / 180),
                      y: 50 + 50 * Math.sin((Math.PI * startAngle) / 180)
                    }
                    const end = {
                      x: 50 + 50 * Math.cos((Math.PI * endAngle) / 180),
                      y: 50 + 50 * Math.sin((Math.PI * endAngle) / 180)
                    }
                    const largeArcFlag = result.percent > 50 ? 1 : 0

                    return (
                      <path
                        key={result.label}
                        d={`M 50 50 L ${start.x} ${start.y} A 50 50 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`}
                        fill={result.color}
                        opacity="0.9"
                      />
                    )
                  })
                })()}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 flex-1">
              {lifetimeResults.map((result) => (
                <div key={result.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: result.color }}
                    />
                    <span className="kol-text-sm text-fg-88">{result.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="kol-mono-sm text-fg-64">
                      {formatCompactNumber(result.count)}
                    </span>
                    <span className="kol-mono-sm text-fg-88 font-semibold min-w-[48px] text-right">
                      {formatPercent(result.percent)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Best Wins Scoreboard - NEW */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Top 5 Best Wins Scoreboard"
          description="Greatest victories - wins against the highest rated opponents by ELO rating."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded h-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="kol-heading-sm">Greatest Victories</h3>
              <p className="kol-text-sm text-fg-64">
                Top 5 wins by opponent ELO rating
              </p>
            </div>
          </div>

          {/* Scoreboard */}
          <div className="flex flex-col gap-3">
            {top5BestWins.length > 0 ? (
              top5BestWins.map((win, idx) => (
                <a
                  key={idx}
                  href={win.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-fg-01 hover:bg-fg-04 border border-fg-08 rounded transition-colors group"
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-16 text-accent-88 font-semibold">
                    <span className="kol-mono-sm">{idx + 1}</span>
                  </div>

                  {/* Opponent Info */}
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="kol-text-sm text-fg-88 font-semibold group-hover:text-accent-88 transition-colors">
                      {win.opponent.includes(' FM') ? (
                        <>
                          {win.opponent.replace(' FM', '')} <span className="text-yellow-400">FM</span>
                        </>
                      ) : (
                        win.opponent
                      )}
                    </span>
                    <span className="kol-mono-xs text-fg-64">
                      Opponent Rating: {win.opponentRating}
                    </span>
                  </div>

                  {/* Rating Difference Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-fg-16 bg-fg-04">
                      <span className="kol-mono-sm font-medium">
                        +{win.ratingDiff}
                      </span>
                    </div>
                    <span className="kol-mono-xxs text-fg-48">
                      Your rating: {win.playerRating}
                    </span>
                  </div>
                </a>
              ))
            ) : (
              <div className="p-8 text-center">
                <span className="kol-text-sm text-fg-48">No victories found</span>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          {top5BestWins.length > 0 && (
            <div className="pt-4 border-t border-fg-08 flex items-center justify-between">
              <span className="kol-mono-xs text-fg-64">
                Highest rated: {top5BestWins[0]?.opponent.includes(' FM') ? (
                  <>
                    {top5BestWins[0]?.opponent.replace(' FM', '')} <span className="text-yellow-400">FM</span>
                  </>
                ) : (
                  top5BestWins[0]?.opponent
                )} ({top5BestWins[0]?.opponentRating})
              </span>
              <span className="kol-mono-xs text-fg-64">
                Your rating: {top5BestWins[0]?.playerRating}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Circular Gradient Chart Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Circular Gradient Chart Card"
          description="Multi-ring circular chart with conic gradients. Each ring uses gradient colors and white opacity masks to create donut effect."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded h-full">
          <div className="flex items-center gap-2">
            <Icon name="dashboard-book-open" size={24} className="text-fg-88" />
            <span className="kol-heading-sm">TOP OPENINGS</span>
          </div>
          {(() => {
            const top4Openings = manifest.topEcos.slice(0, 4)
            const totalGames = manifest.totalGames

            // Calculate percentages for each opening
            const ringData = top4Openings.map((eco, idx) => {
              const openingName = parseEcoUrl(eco.key)
              const percentage = (eco.count / totalGames) * 100
              return {
                name: openingName,
                count: eco.count,
                percentage: percentage
              }
            })

            // Calculate strokeDasharray for each ring based on real percentages
            // Formula: circumference = 2πr, then split by percentage
            const rings = [
              { r: 151, viewBox: 320, size: 80, left: 0, top: 0, maskSize: 284, maskLeft: 18, maskTop: 18 },
              { r: 121, viewBox: 260, size: 65, left: 30, top: 30, maskSize: 224, maskLeft: 48, maskTop: 48 },
              { r: 91, viewBox: 200, size: 50, left: 60, top: 60, maskSize: 164, maskLeft: 78, maskTop: 78 },
              { r: 61, viewBox: 140, size: 35, left: 90, top: 90, maskSize: 104, maskLeft: 108, maskTop: 108 }
            ]

            return (
              <>
                <div className="flex flex-col gap-2">
                  <span className="kol-heading-sm">TOP OPENINGS</span>
                  <span className="kol-mono-xs text-fg-60">Most played openings by games</span>
                </div>

                <div className="flex-1 flex items-center justify-center min-h-0">
                  <div className="w-80 h-80 relative">
                    {rings.map((ring, idx) => {
                      const data = ringData[idx]
                      const circumference = 2 * Math.PI * ring.r
                      const arcLength = (circumference * data.percentage) / 100
                      const gapLength = circumference - arcLength

                      const gradients = [
                        [{ offset: "0%", color: "#F5D245" }, { offset: "33%", color: "#E8A87C" }, { offset: "66%", color: "#D891BC" }, { offset: "100%", color: "#B57FE8" }],
                        [{ offset: "0%", color: "#B57FE8" }, { offset: "50%", color: "#A070D8" }, { offset: "100%", color: "#8B7FD8" }],
                        [{ offset: "0%", color: "#8B7FD8" }, { offset: "50%", color: "#6BA5C8" }, { offset: "100%", color: "#6BB88C" }],
                        [{ offset: "0%", color: "#BFDC5A" }, { offset: "33%", color: "#F5E84A" }, { offset: "66%", color: "#E8C87C" }, { offset: "100%", color: "#C8A87C" }]
                      ]

                      return (
                        <React.Fragment key={idx}>
                          {/* Background layer */}
                          <div className={`w-${ring.size} h-${ring.size} absolute rounded-full border-[18px] border-fg-02`} style={{ left: ring.left, top: ring.top, width: `${ring.size * 4}px`, height: `${ring.size * 4}px`, borderRadius: '50%' }} />

                          {/* Ring */}
                          <svg viewBox={`0 0 ${ring.viewBox} ${ring.viewBox}`} className={`absolute`} style={{ width: `${ring.size * 4}px`, height: `${ring.size * 4}px`, left: ring.left, top: ring.top }}>
                            <circle
                              cx={ring.viewBox / 2}
                              cy={ring.viewBox / 2}
                              r={ring.r}
                              fill="none"
                              stroke={`url(#grad${idx})`}
                              strokeWidth="18"
                              strokeLinecap="round"
                              strokeDasharray={`${arcLength} ${gapLength}`}
                              transform={`rotate(-90 ${ring.viewBox / 2} ${ring.viewBox / 2})`}
                            />
                            <defs>
                              <linearGradient id={`grad${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                {gradients[idx].map((stop, i) => (
                                  <stop key={i} offset={stop.offset} stopColor={stop.color} />
                                ))}
                              </linearGradient>
                            </defs>
                          </svg>

                          {/* Mask */}
                          <div className={`absolute bg-[#1a1a1a] rounded-full`} style={{ width: `${ring.maskSize}px`, height: `${ring.maskSize}px`, left: ring.maskLeft, top: ring.maskTop }} />
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2">
                  {ringData.map((data, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="kol-mono-sm text-fg-80 capitalize">{data.name}</span>
                      <span className="kol-mono-sm text-fg-88">{data.count} ({data.percentage.toFixed(1)}%)</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-fg-08">
                  <span className="kol-mono-xs text-fg-60">Visualization shows relative popularity of top 4 openings</span>
                </div>
              </>
            )
          })()}
        </div>
      </div>

      {/* RIVALS List Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="9. RIVALS List Card"
          description="Ranked list card with header section showing title and rank badge, list of 5 items with names and counts, footer with description text. Component: DashRivalsCard"
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="dashboard-dual-opponent" size={24} className="text-fg-88" />
                <span className="kol-heading-sm">RIVALS</span>
              </div>
              <span className="kol-mono-xs text-fg-60">Most played opponents</span>
            </div>
            <span className="kol-mono-sm text-fg-80">#1</span>
          </div>

          <div className="flex flex-col gap-3">
            {manifest.topOpponents.slice(0, 5).map((opp, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="kol-mono-sm text-fg-80">{opp.key}</span>
                <span className="kol-mono-sm text-fg-88">{opp.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Horizontal Meter Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="10. OVERALL LEDGER Meter Card"
          description="Progress meter card with header, 4 horizontal bars showing label, filled progress bar (yellow #F5D245), and value. Footer with description. Component: DashProgressMeterCard or HorizontalMeterCard"
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px]">
          {(() => {
            const top4Terminations = manifest.terminationDistribution.slice(0, 4)
            const maxCount = Math.max(...top4Terminations.map(t => t.count))

            return (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Icon name="stat-winner" size={24} className="text-fg-88" />
                    <span className="kol-heading-sm">GAME OUTCOMES</span>
                  </div>
                  <span className="kol-mono-xs text-fg-60">Top termination types</span>
                </div>

                <div className="flex flex-col gap-3">
                  {top4Terminations.map((term, idx) => {
                    const percentage = (term.count / manifest.totalGames) * 100
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="kol-mono-sm text-fg-80 min-w-[120px]">{formatTermination(term.key)}</span>
                        <div className="flex-1 h-3 bg-fg-08 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(term.count / maxCount) * 100}%`, background: '#F5D245' }}
                          />
                        </div>
                        <span className="kol-mono-sm text-fg-88 min-w-[60px] text-right">{term.count}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-auto pt-4 border-t border-fg-08">
                  <span className="kol-mono-xs text-fg-60">Counts represent game terminations</span>
                </div>
              </>
            )
          })()}
        </div>
      </div>

      {/* Badge Card with Status */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="11. Featured Analysis Card with Badge"
          description="Large highlighted analysis card with badge label, narrative text, and dual-layer area chart comparing win margin vs usage volume. Component: DashFeaturedAnalysisCard"
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[480px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-fg-16 rounded-full kol-mono-xxs text-fg-88 uppercase tracking-wider">
                HOT STREAK
              </span>
              <div className="flex items-center gap-2">
                <Icon name="dashboard-book-open" size={24} className="text-fg-88" />
                <span className="kol-heading-sm capitalize">{featuredChartData.openingName}</span>
              </div>
              <p className="kol-mono-xs text-fg-64">
                {featuredChartData.avgWinRate.toFixed(1)}% average win rate over last 12 months • most frequently played opening.
              </p>
            </div>
            <div className="text-right">
              <span className="kol-mono-xs text-fg-60 uppercase tracking-widest">Games tracked</span>
              <p className="kol-heading-md">{formatCompactNumber(featuredChartData.totalGames)}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <div className="relative w-full h-64 bg-fg-02 border border-fg-04 rounded overflow-hidden">
              <svg
                viewBox={`0 0 100 ${FEATURED_CHART_HEIGHT}`}
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                role="img"
                aria-label="Kings Gambit win margin versus usage volume"
              >
                <rect width="100" height={FEATURED_CHART_HEIGHT} fill="var(--kol-surface-secondary)" />
                <defs>
                  <linearGradient id="featuredWinFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--kol-accent-primary)" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="var(--kol-accent-primary)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="featuredUsageFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--kol-status-danger)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--kol-status-danger)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[10, 20, 30, 40].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="100"
                    y1={FEATURED_CHART_HEIGHT - y}
                    y2={FEATURED_CHART_HEIGHT - y}
                    stroke="var(--kol-border-subtle)"
                    strokeDasharray="1 2"
                    strokeWidth="0.3"
                  />
                ))}

                <path d={featuredUsageAreaPath} fill="url(#featuredUsageFill)" />
                <path d={featuredWinAreaPath} fill="url(#featuredWinFill)" />

                <path
                  d={featuredUsagePath}
                  stroke="var(--kol-status-danger)"
                  strokeWidth={FEATURED_CHART_STROKE}
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={featuredWinPath}
                  stroke="var(--kol-accent-primary)"
                  strokeWidth={FEATURED_CHART_STROKE}
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="flex justify-between items-start pt-2">
              {FEATURED_AXIS_LABELS.map(label => (
                <div key={label} className="flex flex-col items-center gap-2 min-w-[32px]">
                  <span className="w-px h-3 bg-fg-16" />
                  <span className="kol-mono-xxs text-fg-64">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-6">
              {[{ label: 'Win margin', className: 'donut-color-windows' }, { label: 'Usage volume', className: 'donut-color-macos' }].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`donut-chart__dot ${item.className}`} aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="kol-mono-xxs text-fg-88 uppercase tracking-widest">{item.label}</span>
                    <span className="kol-mono-xs text-fg-60">
                      {item.label === 'Win margin' ? '+12.6% avg' : '↑ 18% MoM'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simple Metric Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="12. Simple Metric Card"
          description="Minimal card showing single metric with label, large value, and delta. No border accent. Component: DashSimpleMetricCard"
        />
        <div className="flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded">
          <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">MONTHS TRACKED</span>
          <span className="kol-heading-lg">{manifest.monthsTracked}</span>
          <span className="kol-mono-sm text-fg-80">{((manifest.monthsTracked / 106) * 100).toFixed(0)}% coverage</span>
        </div>
      </div>

      {/* Alert/Status Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="13. Alert Status Card"
          description="Information card with warning messages, arrows, and horizontal divider. Shows trend indicators and action-needed alerts. Component: DashAlertStatusCard"
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[420px]">
            {(() => {
              const currentMonth = monthlySummary[monthlySummary.length - 1]
              const previousMonth = monthlySummary[monthlySummary.length - 2]
              const currentWinRate = (currentMonth.results.win / currentMonth.total) * 100
              const previousWinRate = (previousMonth.results.win / previousMonth.total) * 100
              const delta = currentWinRate - previousWinRate
              const isPositive = delta >= 0

              return (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="kol-mono-xs text-fg-60">Win Rate</span>
                      <span className="kol-heading-lg">{currentWinRate.toFixed(1)}%</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-fg-16 bg-fg-04">
                      <Icon
                        name={isPositive ? 'trending-up' : 'trending-down'}
                        size={20}
                        className="text-fg-64"
                      />
                      <span className="kol-mono-sm font-medium">{isPositive ? '+' : ''}{delta.toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 flex-1">
                    <div className="flex flex-col gap-1">
                      <span className="kol-heading-xs">{isPositive ? 'Up' : 'Down'} {Math.abs(delta).toFixed(1)}% this period {isPositive ? '↗' : '↘'}</span>
                      <span className="kol-mono-sm text-fg-64">Win rate {isPositive ? 'improving' : 'needs attention'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="kol-heading-xs">{formatMonthLabel(currentMonth.month)} Performance</span>
                      <span className="kol-mono-sm text-fg-64">{currentMonth.results.win}W {currentMonth.results.draw}D {currentMonth.results.loss}L</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-fg-08">
                    <span className="kol-mono-xs text-fg-60">Month-over-month win rate comparison</span>
                  </div>
                </>
              )
            })()}
        </div>
      </div>

      {/* Line Chart Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="14. Line Chart Card with List"
          description="Card with heading, SVG line chart (yellow stroke), numbered list of items with values, and footer summary row. Component: DashLineChartListCard"
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
          {(() => {
            const recentMonths = monthlySummary.slice(-5)
            const topTimeClass = manifest.timeClassDistribution[0] // Highest count time class

            return (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Icon name="trending" size={24} className="text-fg-88" />
                    <span className="kol-heading-sm">RATING PROGRESSION</span>
                  </div>
                  <span className="kol-mono-xs text-fg-60">Average rating over last 12 months</span>
                </div>

                <div className="relative w-full h-32 bg-fg-02 border border-fg-04 rounded overflow-hidden">
                  <svg
                    viewBox={`0 0 100 ${LINE_CHART_HEIGHT}`}
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                    role="img"
                    aria-label="Rating progression line chart"
                  >
                    {[10, 20, 30].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2="100"
                        y1={LINE_CHART_HEIGHT - y}
                        y2={LINE_CHART_HEIGHT - y}
                        stroke="var(--kol-border-subtle)"
                        strokeWidth="0.4"
                        strokeDasharray="2 2"
                      />
                    ))}

                    <path
                      d={lineChartPath}
                      fill="none"
                      stroke="var(--kol-accent-primary)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                <div className="flex flex-col gap-2">
                  {recentMonths.map((month, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="kol-mono-xs text-fg-80">{idx + 1}. {formatMonthLabel(month.month)}</span>
                      <span className="kol-mono-xs text-fg-88">{month.total} games</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 pt-4 border-t border-fg-08">
                  <div className="flex justify-between items-center">
                    <span className="kol-mono-xs text-fg-80">{formatTimeClass(topTimeClass.key)}</span>
                    <span className="kol-mono-xs text-fg-88">{topTimeClass.count}</span>
                  </div>
                </div>
              </>
            )
          })()}
      </div>
    </div>

      {/* Candlestick Ledger Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="15. Candlestick Ledger Card"
          description="Ledger view with badge, center label, and candlestick visualization comparing win margin ranges. Component: DashCandlestickCard"
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded">
          {(() => {
            const last12Months = monthlySummary.slice(-12)
            const firstMonthRating = candlestickSeries[0]?.close || 1500
            const lastMonthRating = candlestickSeries[candlestickSeries.length - 1]?.close || 1500
            const ratingChange = lastMonthRating - firstMonthRating
            const ratingChangePct = ((ratingChange / firstMonthRating) * 100).toFixed(1)
            const isPositive = ratingChange >= 0

            return (
              <>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="kol-heading-sm">RATING RANGE BY MONTH</span>
                    <span className="kol-mono-xs text-fg-60">Last 12 months high/low/open/close</span>
                  </div>
                  <span className="kol-mono-xs text-fg-64">Player Rating</span>
                  <div className="inline-flex items-center gap-1 px-2 py-[2px] rounded border border-fg-08 text-fg-80 bg-fg-04">
                    <span className="inline-flex items-center justify-center w-6 h-6">
                      <Icon
                        name={isPositive ? 'trending-up' : 'trending-down'}
                        size={16}
                        className="text-fg-80"
                      />
                    </span>
                    <span className="kol-mono-xs">{isPositive ? '+' : ''}{ratingChangePct}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">{isPositive ? '↗' : '↘'} {isPositive ? '+' : ''}{ratingChange} pts</span>
                  <span className="kol-mono-xs text-fg-64">Current: {lastMonthRating}</span>
                </div>
              </>
            )
          })()}

          <div className="relative w-full h-72 bg-fg-02 border border-fg-04 rounded overflow-hidden p-4">
            {[20, 40, 60, 80].map((y) => (
              <div
                key={y}
                className="absolute left-4 right-4"
                style={{
                  borderTop: '1px dashed var(--kol-border-subtle)',
                  top: `${(100 - y)}%`,
                  opacity: 0.4
                }}
              />
            ))}
            <div className="absolute left-4 right-4 top-4 bottom-4 flex items-end gap-3">
              {candlestickSeries.map((item, idx) => {
                const colors = candlestickColors[item.variant] || candlestickColors.accent
                const scaledHigh = scaleCandlestick(item.high)
                const scaledLow = scaleCandlestick(item.low)
                const scaledOpen = scaleCandlestick(item.open)
                const scaledClose = scaleCandlestick(item.close)
                const wickHeight = Math.max(scaledHigh - scaledLow, 1)
                const bodyHeight = Math.max(Math.abs(scaledClose - scaledOpen), 3)
                const bodyBottom = Math.min(scaledOpen, scaledClose)

                return (
                  <div key={idx} className="relative flex-1 h-full">
                    <span
                      className="absolute left-1/2 -translate-x-1/2 w-[1.5px]"
                      style={{
                        height: `${wickHeight}%`,
                        bottom: `${scaledLow}%`,
                        background: colors.wick
                      }}
                    />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 w-2 rounded-sm"
                      style={{
                        height: `${bodyHeight}%`,
                        bottom: `${bodyBottom}%`,
                        background: colors.body
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            {[
              { label: 'win margin', className: 'donut-color-windows' },
              { label: 'win margin', className: 'donut-color-macos' }
            ].map((legend, idx) => (
              <div key={`${legend.label}-${idx}`} className="flex items-center gap-2">
                <span className={`donut-chart__dot ${legend.className}`} aria-hidden="true" />
                <span className="kol-mono-xs text-fg-64">{legend.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="kol-mono-xs text-fg-80">{i}. All recorded games</span>
                <span className="kol-mono-xs text-fg-88">675</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Rating Histogram - NEW PHASE 6 */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="16. Rating Histogram"
          description="Distribution of player ratings across 100-point buckets showing rating frequency over career. Component: DashHistogramCard"
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded h-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="kol-heading-sm">Rating Distribution</h3>
              <p className="kol-text-sm text-fg-64">
                Frequency of ratings in {ratingHistogram.length} buckets (100-point intervals)
              </p>
            </div>
          </div>

          {/* Histogram */}
          <div className="relative h-48 flex items-end gap-1">
            {(() => {
              const maxCount = Math.max(...ratingHistogram.map(b => b.count))
              return ratingHistogram.map((bucket, idx) => {
                const heightPercent = Math.max((bucket.count / maxCount) * 100, bucket.count > 0 ? 2 : 0)
                return (
                  <div
                    key={bucket.range}
                    className="flex-1 bg-fg-64 hover:bg-fg-88 transition-colors rounded-t cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                    title={`${bucket.range}: ${bucket.count} games`}
                  />
                )
              })
            })()}
          </div>

          {/* X-Axis Labels */}
          <div className="flex items-center justify-between px-1">
            {ratingHistogram.filter((_, idx) => idx % 2 === 0).map((bucket) => (
              <span key={bucket.range} className="kol-mono-xxs text-fg-64">
                {bucket.min}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-fg-08">
            {(() => {
              const allRatings = gameMeta.map(g => g.player.rating).filter(r => r && r > 0)
              const minRating = Math.min(...allRatings)
              const maxRating = Math.max(...allRatings)
              const avgRating = Math.round(allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length)
              return [
                { label: 'Min Rating', value: minRating },
                { label: 'Avg Rating', value: avgRating },
                { label: 'Max Rating', value: maxRating }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="kol-mono-xxs text-fg-64 uppercase tracking-widest">{stat.label}</span>
                  <span className="kol-heading-sm">{stat.value}</span>
                </div>
              ))
            })()}
          </div>
        </div>
      </div>

      {/* Scatter Plot Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="17. Scatter Plot Ledger Card"
          description="Scatter plot comparing win margin vs time, with full XY grid, axes, and captions. Component: DashScatterPlotCard"
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded h-full min-h-[520px]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Icon name="stopwatch" size={24} className="text-fg-88" />
              <span className="kol-heading-sm">OPPONENT STRENGTH vs TIME CONTROL</span>
            </div>
            <span className="kol-mono-xs text-fg-60">Rating distribution across time controls ({scatterPoints.length} games)</span>
          </div>

          <div className="relative flex-1 bg-fg-02 border border-fg-04 rounded overflow-hidden px-4 pt-4 pb-10">
            <div className="absolute left-4 right-4 top-4 bottom-16">
              {[0, 1000, 2000].map((yValue) => (
                <div key={yValue} className="absolute left-0 right-0" style={{ bottom: `${(yValue / scatterMaxY) * 100}%` }}>
                  <div className="flex items-center gap-2">
                    <span className="kol-mono-xs text-fg-64 w-10 text-right">{yValue === 0 ? '0' : `${Math.round(yValue / 1000)}K`}</span>
                    <div className="flex-1 border-t border-fg-16 opacity-60" />
                  </div>
                </div>
              ))}

              {[40, 80, 120, 160].map((xValue) => (
                <div key={xValue} className="absolute top-0 bottom-0" style={{ left: `${(xValue / scatterMaxX) * 100}%` }}>
                  <div className="relative h-full">
                    <div className="absolute inset-y-0 left-0 border-l border-fg-12 opacity-40" />
                    <span className="absolute -bottom-8 -translate-x-1/2 kol-mono-xs text-fg-64">{xValue}</span>
                  </div>
                </div>
              ))}

              {scatterPoints.map(point => (
                <span
                  key={point.id}
                  className="absolute block w-2 h-2 rounded-full"
                  style={{
                    background: '#4cd8e8',
                    left: `${(point.x / scatterMaxX) * 100}%`,
                    bottom: `${(point.y / scatterMaxY) * 100}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { label: 'win margin', className: 'donut-color-windows' },
              { label: 'win margin', className: 'donut-color-macos' }
            ].map((legend, idx) => (
              <div key={`${legend.label}-${idx}`} className="flex items-center gap-2">
                <span className={`donut-chart__dot ${legend.className}`} aria-hidden="true" />
                <span className="kol-mono-xs text-fg-64">{legend.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Design System Reference */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Design System Tokens Used"
          description="All components use consistent design tokens from the Kolkrabbi system."
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
          <div className="flex flex-col gap-3">
            <div>
              <span className="kol-mono-sm text-fg-88">Colors:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• bg-fg-02 (2% foreground background)</li>
                <li>• border-fg-08 (8% foreground border)</li>
                <li>• border-fg-04 (4% subtle border)</li>
                <li>• text-fg-60, text-fg-64, text-fg-80, text-fg-88</li>
              </ul>
            </div>

            <div className="h-px bg-fg-08" />

            <div>
              <span className="kol-mono-sm text-fg-88">Typography:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• kol-heading-sm, kol-heading-md, kol-heading-lg, kol-heading-xl</li>
                <li>• kol-mono-xxs, kol-mono-xs, kol-mono-sm</li>
              </ul>
            </div>

            <div className="h-px bg-fg-08" />

            <div>
              <span className="kol-mono-sm text-fg-88">Spacing:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• p-6 (24px padding always)</li>
                <li>• gap-2, gap-3, gap-4, gap-6 for vertical rhythm</li>
                <li>• rounded (4px border-radius always)</li>
              </ul>
            </div>

            <div className="h-px bg-fg-08" />

            <div>
              <span className="kol-mono-sm text-fg-88">Accent Colors:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• Yellow: #F5D245 (primary accent, meters, borders)</li>
                <li>• Purple: #9C64FD (secondary data)</li>
                <li>• Blue: #5eb3d6 (tertiary data)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Hourly Heatmap - NEW PHASE 6 */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Hourly Heatmap"
          description="Game activity heatmap showing play frequency by day of week and hour of day (7×24 grid)."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded h-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="kol-heading-sm">Activity Patterns</h3>
              <p className="kol-text-sm text-fg-64">
                When do you play most? Darker cells = more games played
              </p>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="flex flex-col gap-1">
            {/* Hour labels (top) */}
            <div className="flex gap-1 pl-12">
              {[0, 6, 12, 18].map((hour) => (
                <div key={hour} className="flex-1 text-center">
                  <span className="kol-mono-xxs text-fg-64">{hour}:00</span>
                </div>
              ))}
            </div>

            {/* Grid rows (days) */}
            {heatmapData.dayNames.map((day, dayIdx) => (
              <div key={day} className="flex gap-1 items-center">
                {/* Day label */}
                <span className="kol-mono-xs text-fg-64 w-10 text-right">{day}</span>

                {/* Hour cells */}
                <div className="flex gap-1 flex-1">
                  {heatmapData.grid[dayIdx].map((count, hourIdx) => {
                    // Calculate color intensity from 0 (empty) to 255 (max)
                    const intensity = count === 0 ? 240 : Math.round(255 - (count / heatmapData.maxGames) * 200)
                    const bgColor = `rgb(${intensity}, ${Math.round(intensity * 0.9)}, ${Math.round(intensity * 0.7)})`
                    return (
                      <div
                        key={hourIdx}
                        className="flex-1 aspect-square rounded-sm hover:ring-2 hover:ring-accent transition-all cursor-pointer"
                        style={{ backgroundColor: bgColor }}
                        title={`${day} ${hourIdx}:00 - ${count} games`}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-64">Less active</span>
            <div className="flex items-center gap-2">
              {[0, 0.25, 0.5, 0.75, 1.0].map((ratio) => {
                const intensity = Math.round(255 - ratio * 200)
                const bgColor = `rgb(${intensity}, ${Math.round(intensity * 0.9)}, ${Math.round(intensity * 0.7)})`
                return (
                  <div
                    key={ratio}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: bgColor }}
                  />
                )
              })}
            </div>
            <span className="kol-mono-xs text-fg-64">More active</span>
          </div>

          {/* Peak activity stats */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {(() => {
              // Find peak day
              const dayTotals = heatmapData.grid.map((hours, idx) => ({
                day: heatmapData.dayNames[idx],
                total: hours.reduce((sum, count) => sum + count, 0)
              }))
              const peakDay = dayTotals.reduce((max, day) => day.total > max.total ? day : max, dayTotals[0])

              // Find peak hour
              const hourTotals = Array(24).fill(0)
              heatmapData.grid.forEach(day => {
                day.forEach((count, hourIdx) => {
                  hourTotals[hourIdx] += count
                })
              })
              const peakHourIdx = hourTotals.indexOf(Math.max(...hourTotals))

              return [
                { label: 'Most Active Day', value: peakDay.day },
                { label: 'Most Active Hour', value: `${peakHourIdx}:00` }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="kol-mono-xxs text-fg-64 uppercase tracking-widest">{stat.label}</span>
                  <span className="kol-heading-sm">{stat.value}</span>
                </div>
              ))
            })()}
          </div>
        </div>
      </div>

      {/* Full Analysis Layout - Table + Board */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Full Analysis Layout"
          description="Full chess analysis workflow: Browse games in the table, click 'Load here' to load into the board below. Combines GameArchiveTable + ChessBoardWithControls with shared state. This is the ChessAnalysisLayout component."
        />
        <div className="bg-fg-02 border border-fg-08 rounded">
          <ChessAnalysisLayout />
        </div>
      </div>

      {/* Chessboard + Controls */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Chessboard + Controls"
          description="Chess board with control sidebar side-by-side. Board on left, controls on right. Desktop layout only."
        />
        <div className="bg-fg-02 border border-fg-08 rounded p-6">
          <ChessControlsProvider>
            <div className="flex flex-row gap-8">
              <ChessBoard size="desktop" />
              <div className="w-[440px]">
                <AlternativeControlsMock />
              </div>
            </div>
          </ChessControlsProvider>
        </div>
      </div>

      {/* Controls Sidebar Solo */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Controls Sidebar"
          description="Standalone control sidebar with game info, piece palette, playback controls, notation, and settings."
        />
        <div className="bg-fg-02 border border-fg-08 rounded p-6">
          <div className="max-w-[440px]">
            <ChessControlsProvider>
              <AlternativeControlsMock />
            </ChessControlsProvider>
          </div>
        </div>
      </div>

      {/* Game Archive Table Solo */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Game Archive Table"
          description="Searchable table of all chess games with filters for month, time class, and result. Click 'Load here' to load a game."
        />
        <div className="bg-fg-02 border border-fg-08 rounded p-6">
          <ChessControlsProvider>
            <GameArchiveTable onGameLoad={(game) => console.log('Game loaded:', game)} />
          </ChessControlsProvider>
        </div>
      </div>

      {/* ChessBoard at bottom */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Baseline Board"
          description="Core renderer showing starting position with all pieces. Displays standard chess setup with white pieces on ranks 1-2, black pieces on ranks 7-8. No coordinate labels shown when pieces are present. Three sizes available: mobile (384px), tablet (520px), and desktop (760px)."
        />
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="kol-helper-sm text-foreground-muted mb-3">Mobile (384px)</h3>
            <ChessBoard size="mobile" />
          </div>
          <div>
            <h3 className="kol-helper-sm text-foreground-muted mb-3">Tablet (520px)</h3>
            <ChessBoard size="tablet" />
          </div>
          <div>
            <h3 className="kol-helper-sm text-foreground-muted mb-3">Desktop (760px)</h3>
            <ChessBoard size="desktop" />
          </div>
        </div>
      </div>

      {/* Board Template - No Pieces */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Empty Board Template"
          description="Board template showing 8x8 grid with coordinates and surface styling. No pieces rendered. Useful for game setup, puzzle templates, or custom positions."
        />
        <ChessBoard showPieces={false} />
      </div>
    </div>
  )
}

export default AnalyticsComponents
