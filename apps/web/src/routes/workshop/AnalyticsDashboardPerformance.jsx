import React, { useMemo } from 'react'
import DesPage from '../../components/workshop/molecules/DesPage'
import DashboardGrid from '../../components/workshop/chess/dashboards/DashboardGrid'
import GridCard from '../../components/workshop/chess/dashboards/GridCard'
import DashKpiCard from '../../components/workshop/chess/cards/DashKpiCard'
import DashSimpleMetricCard from '../../components/workshop/chess/cards/DashSimpleMetricCard'
import DashLineChartListCard from '../../components/workshop/chess/cards/DashLineChartListCard'
import DashCandlestickCard from '../../components/workshop/chess/cards/DashCandlestickCard'
import DashProgressMeterCard from '../../components/workshop/chess/cards/DashProgressMeterCard'
import DashAlertStatusCard from '../../components/workshop/chess/cards/DashAlertStatusCard'
import DashHistogramCard from '../../components/workshop/chess/cards/DashHistogramCard'
import DashScatterPlotCard from '../../components/workshop/chess/cards/DashScatterPlotCard'
import DashRivalsCard from '../../components/workshop/chess/cards/DashRivalsCard'
import Graph12AreaChart from '../../components/workshop/chess/charts/Graph12AreaChart'

import { getManifest, getMonthlySummary, getGameMeta } from '@kol/chess-data'
import {
  formatMonthLabel,
  formatTimeClass,
  formatCompactNumber,
  parseTimeControl
} from '../../utils/chessHelpers'

import '@kol/ui/css/analytics.css'
import '@kol/ui/css/chess.css'

const buildCandlesticks = (months, games) => {
  return months.map((month) => {
    const monthGames = games
      .filter((game) => game.month === month.month)
      .sort((a, b) => {
        const aTime = a.endTime ?? a.startTime ?? 0
        const bTime = b.endTime ?? b.startTime ?? 0
        return aTime - bTime
      })

    const ratings = monthGames
      .map((game) => game.player?.rating)
      .filter((rating) => rating && rating > 0)

    if (!ratings.length) {
      return {
        high: 0,
        low: 0,
        open: 0,
        close: 0,
        variant: 'neutral'
      }
    }

    const wins = month.results?.win ?? 0
    const losses = month.results?.loss ?? 0

    return {
      high: Math.max(...ratings),
      low: Math.min(...ratings),
      open: ratings[0],
      close: ratings[ratings.length - 1],
      variant: wins >= losses ? 'accent' : 'neutral'
    }
  })
}

const AnalyticsDashboardPerformance = () => {
  const manifest = useMemo(() => getManifest(), [])
  const monthlySummary = useMemo(() => getMonthlySummary(), [])
  const gameMeta = useMemo(() => getGameMeta(), [])

  const last12Months = useMemo(
    () => monthlySummary.slice(-12),
    [monthlySummary]
  )

  const ratingStats = useMemo(() => {
    const ratings = gameMeta
      .map((game) => game.player?.rating)
      .filter((rating) => rating && rating > 0)

    if (!ratings.length) {
      return {
        current: 0,
        peak: 0,
        average: 0,
        lowest: 0,
        change: 0,
        volatility: 0
      }
    }

    const current = ratings[ratings.length - 1]
    const peak = Math.max(...ratings)
    const lowest = Math.min(...ratings)
    const average = Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length)

    const recent10 = ratings.slice(-10)
    const previous10 = ratings.slice(-20, -10)
    const recentAvg = recent10.reduce((sum, rating) => sum + rating, 0) / (recent10.length || 1)
    const previousAvg = previous10.length
      ? previous10.reduce((sum, rating) => sum + rating, 0) / previous10.length
      : recentAvg
    const change = Math.round(recentAvg - previousAvg)

    const mean = average
    const squareDiffs = ratings.map((rating) => (rating - mean) ** 2)
    const volatility = Math.round(
      Math.sqrt(squareDiffs.reduce((sum, diff) => sum + diff, 0) / ratings.length)
    )

    return { current, peak, average, lowest, change, volatility }
  }, [gameMeta])

  const recentPerformance = useMemo(() => {
    if (monthlySummary.length < 6) {
      return {
        current: { win: 0, draw: 0, loss: 0, total: 0 },
        previous: { win: 0, draw: 0, loss: 0, total: 0 },
        trend: 'neutral',
        currentWinRate: 0,
        previousWinRate: 0
      }
    }

    const last3 = monthlySummary.slice(-3)
    const prev3 = monthlySummary.slice(-6, -3)

    const aggregate = (collection) =>
      collection.reduce(
        (acc, month) => ({
          win: acc.win + (month.results?.win ?? 0),
          draw: acc.draw + (month.results?.draw ?? 0),
          loss: acc.loss + (month.results?.loss ?? 0),
          total: acc.total + (month.total ?? 0)
        }),
        { win: 0, draw: 0, loss: 0, total: 0 }
      )

    const current = aggregate(last3)
    const previous = aggregate(prev3)
    const currentWinRate = current.total ? (current.win / current.total) * 100 : 0
    const previousWinRate = previous.total ? (previous.win / previous.total) * 100 : 0
    const trend =
      currentWinRate > previousWinRate ? 'up' : currentWinRate < previousWinRate ? 'down' : 'neutral'

    return { current, previous, trend, currentWinRate, previousWinRate }
  }, [monthlySummary])

  const monthListItems = useMemo(
    () =>
      last12Months.slice(-4).map((month) => {
        const total = month.total ?? 0
        const wins = month.results?.win ?? 0
        const winRate = total ? ((wins / total) * 100).toFixed(1) : '0.0'
        return {
          label: formatMonthLabel(month.month),
          value: `${winRate}% • ${total.toLocaleString()} games`
        }
      }),
    [last12Months]
  )

  const candlestickData = useMemo(
    () => buildCandlesticks(last12Months, gameMeta),
    [last12Months, gameMeta]
  )

  const resultMeters = useMemo(() => {
    const sample = gameMeta.slice(-120)
    const totals = sample.reduce(
      (acc, game) => {
        acc.total += 1
        if (game.playerResult === 'win' || game.result === 'win') acc.win += 1
        else if (game.playerResult === 'draw' || game.result === 'draw') acc.draw += 1
        else if (game.playerResult === 'loss' || game.result === 'loss') acc.loss += 1
        return acc
      },
      { win: 0, draw: 0, loss: 0, total: 0 }
    )

    const percent = (value) =>
      totals.total ? Number(((value / totals.total) * 100).toFixed(1)) : 0

    return [
      { label: 'Wins', value: `${totals.win.toLocaleString()} games`, percent: percent(totals.win) },
      { label: 'Draws', value: `${totals.draw.toLocaleString()} games`, percent: percent(totals.draw) },
      { label: 'Losses', value: `${totals.loss.toLocaleString()} games`, percent: percent(totals.loss) }
    ]
  }, [gameMeta])

  const timeControlPerformance = useMemo(() => {
    const byTimeClass = new Map()

    gameMeta.forEach((game) => {
      const key = game.timeClass || 'unknown'
      const entry = byTimeClass.get(key) ?? { games: 0, wins: 0, draws: 0, losses: 0 }
      entry.games += 1
      if (game.playerResult === 'win' || game.result === 'win') entry.wins += 1
      else if (game.playerResult === 'draw' || game.result === 'draw') entry.draws += 1
      else if (game.playerResult === 'loss' || game.result === 'loss') entry.losses += 1
      byTimeClass.set(key, entry)
    })

    return Array.from(byTimeClass.entries())
      .map(([key, stats]) => ({
        key,
        label: formatTimeClass(key),
        games: stats.games,
        winRate: stats.games ? ((stats.wins / stats.games) * 100).toFixed(1) : '0.0'
      }))
      .sort((a, b) => b.games - a.games)
  }, [gameMeta])

  const bestTimeClass = timeControlPerformance[0] ?? { label: 'N/A', winRate: '0.0', games: 0 }
  const weakestTimeClass = timeControlPerformance[timeControlPerformance.length - 1] ?? bestTimeClass

  const timeControlLeaderboard = useMemo(
    () =>
      timeControlPerformance.map((tc, index) => ({
        label: `${index + 1}. ${tc.label}`,
        value: `${tc.winRate}% • ${tc.games.toLocaleString()} games`
      })),
    [timeControlPerformance]
  )

  const orderedGames = useMemo(
    () =>
      [...gameMeta].sort(
        (a, b) => (a.endTime ?? a.startTime ?? 0) - (b.endTime ?? b.startTime ?? 0)
      ),
    [gameMeta]
  )

  const streakStats = useMemo(() => {
    let longestWin = 0
    let longestLoss = 0
    let currentWin = 0
    let currentLoss = 0

    orderedGames.forEach((game) => {
      const result = game.playerResult || game.result
      if (result === 'win') {
        currentWin += 1
        currentLoss = 0
        longestWin = Math.max(longestWin, currentWin)
      } else if (result === 'loss') {
        currentLoss += 1
        currentWin = 0
        longestLoss = Math.max(longestLoss, currentLoss)
      } else {
        currentWin = 0
        currentLoss = 0
      }
    })

    return { longestWinStreak: longestWin, longestLossStreak: longestLoss }
  }, [orderedGames])

  const gamesThisYear = useMemo(() => {
    const year = new Date().getUTCFullYear()
    return orderedGames.filter((game) => {
      const timestamp = (game.endTime ?? game.startTime ?? 0) * 1000
      if (!timestamp) return false
      return new Date(timestamp).getUTCFullYear() === year
    }).length
  }, [orderedGames])

  const averageOpponentRating = useMemo(() => {
    const ratings = []
    for (let i = gameMeta.length - 1; i >= 0 && ratings.length < 50; i -= 1) {
      const rating = gameMeta[i]?.opponent?.rating
      if (rating) ratings.push(rating)
    }
    if (!ratings.length) return 0
    return Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length)
  }, [gameMeta])

  const opponentHistogram = useMemo(() => {
    const ratings = gameMeta
      .map((game) => game.opponent?.rating)
      .filter((rating) => rating && rating > 0)

    if (!ratings.length) return []

    const bucketSize = 100
    const min = Math.floor(Math.min(...ratings) / bucketSize) * bucketSize
    const max = Math.ceil(Math.max(...ratings) / bucketSize) * bucketSize

    const buckets = []
    for (let value = min; value < max; value += bucketSize) {
      buckets.push({ range: `${value}-${value + bucketSize}`, count: 0 })
    }

    ratings.forEach((rating) => {
      const index = Math.min(
        buckets.length - 1,
        Math.floor((rating - min) / bucketSize)
      )
      buckets[index].count += 1
    })

    return buckets
  }, [gameMeta])

  const scatterPoints = useMemo(() => {
    const points = []
    for (let i = gameMeta.length - 1; i >= 0 && points.length < 400; i -= 1) {
      const game = gameMeta[i]
      if (!game.opponent?.rating || !game.timeControl) continue
      const seconds = parseTimeControl(game.timeControl) || 0
      points.push({
        id: game.id,
        x: seconds,
        y: game.opponent.rating,
        result: game.playerResult
      })
    }
    return points
  }, [gameMeta])

  const scatterScale = useMemo(() => {
    if (!scatterPoints.length) return { maxX: 600, maxY: 2400 }
    return {
      maxX: Math.max(...scatterPoints.map((point) => point.x), 600),
      maxY: Math.max(...scatterPoints.map((point) => point.y), 2400)
    }
  }, [scatterPoints])

  const gamesLast90Days = useMemo(() => {
    const cutoff = (Date.now() / 1000) - 90 * 24 * 60 * 60
    return gameMeta.filter((game) => {
      const endTime = game.endTime ?? game.startTime ?? 0
      return endTime >= cutoff
    }).length
  }, [gameMeta])

  const toughOpponents = useMemo(() => {
    const recent = gameMeta.slice(-200)
    const opponents = new Map()

    recent.forEach((game) => {
      const name = game.opponent?.username
      const rating = game.opponent?.rating
      if (!name || !rating) return

      const entry = opponents.get(name) ?? { games: 0, wins: 0, totalRating: 0 }
      entry.games += 1
      entry.totalRating += rating
      if (game.playerResult === 'win' || game.result === 'win') entry.wins += 1
      opponents.set(name, entry)
    })

    return Array.from(opponents.entries())
      .map(([name, stats]) => ({
        name,
        avgRating: Math.round(stats.totalRating / stats.games),
        games: stats.games,
        winRate: stats.games ? (stats.wins / stats.games) * 100 : 0
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 5)
      .map((item) => ({
        name: `${item.name} (${item.avgRating})`,
        count: `${item.games} games • ${item.winRate.toFixed(0)}% wins`
      }))
  }, [gameMeta])

  const winRateDeltaRaw = recentPerformance.currentWinRate - recentPerformance.previousWinRate
  const winRateDelta = winRateDeltaRaw.toFixed(1)
  const trendDirection = winRateDeltaRaw < 0 ? 'down' : 'up'

  const winRateDeltaLabel = `${winRateDeltaRaw >= 0 ? '+' : ''}${winRateDelta} pts`

  return (
    <>
      <DesPage
        title="Performance Dashboard"
        subtitle="Momentum, trends, and opponent difficulty at a glance."
        meta="Performance • Analytics • Trend tracking"
      />

      <DashboardGrid layout="4-col" className="mt-6">
        <GridCard span="2x1">
          <div className="grid grid-cols-2 gap-4 h-full">
            <DashKpiCard
              className="h-full"
              label="Current rating"
              value={ratingStats.current.toLocaleString()}
              delta={`${ratingStats.change >= 0 ? '+' : ''}${ratingStats.change} vs last 10`}
              borderColor="var(--kol-accent-primary)"
            />
            <DashKpiCard
              className="h-full"
              label="Peak rating"
              value={ratingStats.peak.toLocaleString()}
              delta={`${(ratingStats.peak - ratingStats.current).toLocaleString()} above now`}
              borderColor="var(--kol-status-danger)"
            />
          </div>
        </GridCard>
        <GridCard span="2x1">
          <div className="grid grid-cols-2 gap-4 h-full">
            <DashKpiCard
              className="h-full"
              label="Win rate (90d)"
              value={`${recentPerformance.currentWinRate.toFixed(1)}%`}
              delta={`${recentPerformance.current.wins}/${recentPerformance.current.total} games`}
              borderColor="var(--kol-accent-primary-strong)"
            />
            <DashKpiCard
              className="h-full"
              label="Games (90d)"
              value={formatCompactNumber(gamesLast90Days)}
              delta={`${formatCompactNumber(manifest.totalGames)} lifetime`}
              borderColor="var(--kol-status-danger-muted)"
            />
          </div>
        </GridCard>

        <GridCard span="4x2">
          <DashLineChartListCard
            className="h-full"
            title="Monthly momentum"
            subtitle="Latest 12 months"
            icon="trending"
            chart={<Graph12AreaChart minHeight={220} />}
            items={monthListItems}
            footer={{ label: 'Average rating', value: ratingStats.average.toLocaleString() }}
          />
        </GridCard>

        <GridCard span="3x2">
          <DashCandlestickCard
            className="h-full"
            title="Rating range per month"
            subtitle="High/low/open/close comparison"
            metricLabel="Player rating"
            badge={`±${ratingStats.volatility}`}
            currentValue={`Current ${ratingStats.current.toLocaleString()}`}
            data={candlestickData}
            legends={[
              { label: 'Positive month', className: 'donut-color-blitz' },
              { label: 'Neutral month', className: 'donut-color-bullet' }
            ]}
            footer="Derived from full PGN archive"
          />
        </GridCard>
        <GridCard span="1x2">
          <div className="flex flex-col gap-4 h-full">
            <DashSimpleMetricCard
              className="h-full"
              label="Longest win streak"
              value={`${streakStats.longestWinStreak} games`}
              delta="All-time best run"
            />
            <DashSimpleMetricCard
              className="h-full"
              label="Games this year"
              value={gamesThisYear.toLocaleString()}
              delta="Calendar year volume"
            />
          </div>
        </GridCard>

        <GridCard span="2x2">
          <DashProgressMeterCard
            className="h-full"
            title="Result mix"
            subtitle="Last 120 games"
            icon="stat-winner"
            items={resultMeters}
            footer="Wins, draws, and losses with live percentages"
          />
        </GridCard>
        <GridCard span="2x2">
          <DashLineChartListCard
            className="h-full"
            title="Time control leaderboard"
            subtitle="Win rate by mode"
            icon="dashboard-roadmap"
            items={timeControlLeaderboard}
            footer={{ label: 'Modes tracked', value: timeControlPerformance.length.toString() }}
          />
        </GridCard>

        <GridCard span="3x2">
          <DashScatterPlotCard
            className="h-full"
            title="Opponent strength vs time control"
            subtitle="Recent 400 games"
            icon="stopwatch"
            data={scatterPoints}
            maxX={scatterScale.maxX}
            maxY={scatterScale.maxY}
            xLabels={[60, 180, 300, 600]}
            yLabels={[1000, 1500, 2000, 2500]}
            pointColor="var(--kol-accent-primary)"
          />
        </GridCard>
        <GridCard span="1x2">
          <DashHistogramCard
            className="h-full"
            title="Opponent rating spread"
            subtitle="Binned by 100 points"
            data={opponentHistogram}
          />
        </GridCard>

        <GridCard span="2x2">
          <DashAlertStatusCard
            className="h-full"
            label="Recent win rate"
            value={`${recentPerformance.currentWinRate.toFixed(1)}%`}
            trend={trendDirection}
            trendValue={winRateDeltaLabel}
            alerts={[
              {
                title: `Strongest: ${bestTimeClass.label}`,
                description: `${bestTimeClass.winRate}% wins across ${bestTimeClass.games.toLocaleString()} games`
              },
              {
                title: `Needs work: ${weakestTimeClass.label}`,
                description: `${weakestTimeClass.winRate}% wins • ${weakestTimeClass.games.toLocaleString()} games`
              }
            ]}
            footer="Comparing last three months vs prior quarter"
          />
        </GridCard>
        <GridCard span="2x2">
          <DashRivalsCard
            className="h-full"
            title="Tough opponents"
            subtitle="Recent high-rated rivals"
            icon="dashboard-dual-opponent"
            items={toughOpponents}
            footer="Sorted by opponent average rating (last 200 games)"
          />
        </GridCard>
      </DashboardGrid>
    </>
  )
}

export default AnalyticsDashboardPerformance
