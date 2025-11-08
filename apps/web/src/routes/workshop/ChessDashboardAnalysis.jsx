import React, { useMemo } from 'react'
import DesPage from '../../components/workshop/molecules/DesPage'
import DashboardGrid from '../../components/workshop/chess/dashboards/DashboardGrid'
import GridCard from '../../components/workshop/chess/dashboards/GridCard'
import DashKpiCard from '../../components/workshop/chess/cards/DashKpiCard'
import DashStackedBarMiniCard from '../../components/workshop/chess/cards/DashStackedBarMiniCard'
import DashSimpleMetricCard from '../../components/workshop/chess/cards/DashSimpleMetricCard'
import DashFeaturedAnalysisCard from '../../components/workshop/chess/cards/DashFeaturedAnalysisCard'
import DashProgressMeterCard from '../../components/workshop/chess/cards/DashProgressMeterCard'
import DashLineChartListCard from '../../components/workshop/chess/cards/DashLineChartListCard'
import DashRivalsCard from '../../components/workshop/chess/cards/DashRivalsCard'
import DashHistogramCard from '../../components/workshop/chess/cards/DashHistogramCard'
import DashPeakRatingsCard from '../../components/workshop/chess/cards/DashPeakRatingsCard'
import DashCompactStackedBarCard from '../../components/workshop/chess/cards/DashCompactStackedBarCard'
import ChessHero from '../../components/workshop/chess/dashboards/ChessHero'
import ChessBoardWithSidebar from '../../components/workshop/chess/apparatus/ChessBoardWithSidebar'
import { ChessControlsProvider } from '../../components/workshop/chess/context/ChessControlsContext'
import Graph10StackedArea from '../../components/workshop/chess/charts/Graph10StackedArea'
import Graph11ColumnChart from '../../components/workshop/chess/charts/Graph11ColumnChart'

import { getManifest, getMonthlySummary, getGameMeta } from '@kol/chess-data'
import {
  formatCompactNumber,
  formatTimeClass
} from '../../utils/chessHelpers'

import '../../components/workshop/chess/chess.css'

const timeClassLegendClass = {
  blitz: 'donut-color-blitz',
  bullet: 'donut-color-bullet',
  rapid: 'donut-color-rapid',
  daily: 'donut-color-daily',
  classical: 'donut-color-other'
}

const ChessDashboardAnalysis = () => {
  const manifest = useMemo(() => getManifest(), [])
  const monthlySummary = useMemo(() => getMonthlySummary(), [])
  const gameMeta = useMemo(() => getGameMeta(), [])

  const metrics = useMemo(() => {
    const totals = monthlySummary.reduce(
      (acc, month) => {
        acc.win += month.results?.win ?? 0
        acc.draw += month.results?.draw ?? 0
        acc.loss += month.results?.loss ?? 0
        return acc
      },
      { win: 0, draw: 0, loss: 0 }
    )

    const totalGames = manifest?.totalGames ?? 0
    const winRate = totalGames ? (totals.win / totalGames) * 100 : 0
    const drawRate = totalGames ? (totals.draw / totalGames) * 100 : 0

    const ratings = gameMeta
      .map((game) => game.player?.rating)
      .filter((rating) => rating && rating > 0)

    const avgRating = ratings.length
      ? Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length)
      : 0
    const peakRating = ratings.length ? Math.max(...ratings) : 0

    return {
      totalGames,
      winRate,
      drawRate,
      ratedGames: manifest?.ratedGames ?? 0,
      wins: totals.win,
      draws: totals.draw,
      losses: totals.loss,
      avgRating,
      peakRating
    }
  }, [manifest, monthlySummary, gameMeta])

  const last12Months = useMemo(
    () => monthlySummary.slice(-12),
    [monthlySummary]
  )

  const stackedBarData = useMemo(
    () =>
      last12Months.map((month) => ({
        win: month.results?.win ?? 0,
        draw: month.results?.draw ?? 0,
        loss: month.results?.loss ?? 0,
        total: month.total ?? 0
      })),
    [last12Months]
  )

  const terminationItems = useMemo(() => {
    const distribution = manifest?.terminationDistribution ?? []
    const total = distribution.reduce((sum, item) => sum + item.count, 0) || 1

    return [...distribution]
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map((item) => ({
        label: item.key.replace('-', ' • '),
        value: item.count.toLocaleString(),
        percent: Number(((item.count / total) * 100).toFixed(1))
      }))
  }, [manifest])

  const timeControlShare = useMemo(() => {
    const distribution = manifest?.timeClassDistribution ?? []
    const total = distribution.reduce((sum, item) => sum + item.count, 0) || 1

    return distribution.map((item) => ({
      key: item.key,
      label: formatTimeClass(item.key),
      value: `${item.count.toLocaleString()} games`,
      percent: Number(((item.count / total) * 100).toFixed(1))
    }))
  }, [manifest])

  const resultsLedger = useMemo(() => {
    const total = metrics.wins + metrics.draws + metrics.losses || 1
    return [
      {
        label: 'Wins',
        value: `${metrics.wins.toLocaleString()} games`,
        percent: Number(((metrics.wins / total) * 100).toFixed(1))
      },
      {
        label: 'Draws',
        value: `${metrics.draws.toLocaleString()} games`,
        percent: Number(((metrics.draws / total) * 100).toFixed(1))
      },
      {
        label: 'Losses',
        value: `${metrics.losses.toLocaleString()} games`,
        percent: Number(((metrics.losses / total) * 100).toFixed(1))
      }
    ]
  }, [metrics])

  const openingListItems = useMemo(() => {
    const openings = new Map()

    gameMeta.forEach((game) => {
      const name = game.opening?.name || 'Unknown opening'
      const entry = openings.get(name) ?? { games: 0, wins: 0 }
      entry.games += 1
      if (game.playerResult === 'win' || game.result === 'win') entry.wins += 1
      openings.set(name, entry)
    })

    return Array.from(openings.entries())
      .sort((a, b) => b[1].games - a[1].games)
      .slice(0, 6)
      .map(([name, stats], index) => ({
        label: `${index + 1}. ${name}`,
        value: `${stats.games.toLocaleString()} games • ${
          stats.games ? ((stats.wins / stats.games) * 100).toFixed(1) : '0.0'
        }% wins`
      }))
  }, [gameMeta])

  const rivals = useMemo(() => {
    const opponents = new Map()

    gameMeta.forEach((game) => {
      const name = game.opponent?.username || 'Unknown opponent'
      const entry = opponents.get(name) ?? { games: 0, wins: 0 }
      entry.games += 1
      if (game.playerResult === 'win' || game.result === 'win') entry.wins += 1
      opponents.set(name, entry)
    })

    return Array.from(opponents.entries())
      .sort((a, b) => b[1].games - a[1].games)
      .slice(0, 6)
      .map(([name, stats]) => ({
        name,
        count: `${stats.games.toLocaleString()} games • ${
          stats.games ? Math.round((stats.wins / stats.games) * 100) : 0
        }% wins`
      }))
  }, [gameMeta])

  const ratingHistogramData = useMemo(() => {
    const ratings = gameMeta
      .map((game) => game.player?.rating)
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

  const peakRatings = useMemo(() => {
    const peakByTimeClass = new Map()

    gameMeta.forEach((game) => {
      const key = game.timeClass || 'blitz'
      const rating = game.player?.rating
      if (!rating) return

      const entry = peakByTimeClass.get(key) ?? { rating, games: 0 }
      entry.rating = Math.max(entry.rating, rating)
      entry.games += 1
      peakByTimeClass.set(key, entry)
    })

    return Array.from(peakByTimeClass.entries())
      .sort((a, b) => b[1].rating - a[1].rating)
      .slice(0, 4)
      .map(([key, stats]) => ({
        name: formatTimeClass(key),
        rating: stats.rating,
        games: stats.games,
        color: timeClassLegendClass[key] || 'donut-color-other'
      }))
  }, [gameMeta])

  const topTimeClass = timeControlShare[0]
  const featuredLegends = timeControlShare.slice(0, 3).map((item) => ({
    label: item.label,
    detail: item.value,
    className: timeClassLegendClass[item.key] || 'donut-color-other'
  }))

  const uniqueOpponents = useMemo(() => {
    const unique = new Set(
      gameMeta.map((game) => game.opponent?.username).filter(Boolean)
    )
    return unique.size
  }, [gameMeta])

  const compactStackedData = useMemo(() => {
    const months = monthlySummary.slice(-12)
    return months.map((month) => ({
      win: month.results?.win ?? 0,
      draw: month.results?.draw ?? 0,
      loss: month.results?.loss ?? 0,
      total: month.total ?? 0
    }))
  }, [monthlySummary])

  return (
    <>
      <DesPage
        title="Chess Analysis Dashboard"
        subtitle="Production dashboards composed entirely from chess components."
        meta="Analytics • Components • Grid layouts"
      />

      <div className="space-y-6">
        <ChessHero />

        <DashboardGrid layout="4-col">
          <GridCard span="3x2">
            <DashFeaturedAnalysisCard
              className="h-full"
              badge="Lifetime dataset"
              title={topTimeClass?.label || 'Chess Insights'}
              icon="dashboard-book-open"
              description={`Covering ${metrics.totalGames.toLocaleString()} games with live apparatus and analytics.`}
              metricLabel="Rated games"
              metricValue={metrics.ratedGames.toLocaleString()}
              chart={<Graph10StackedArea minHeight={340} className="h-full" />}
              legends={featuredLegends}
            />
          </GridCard>
          <GridCard span="1x2">
            <DashStackedBarMiniCard
              className="h-full"
              title="Last 12 months"
              value={`${metrics.winRate.toFixed(1)}% win rate`}
              data={stackedBarData}
            />
          </GridCard>

          <GridCard span="2x1">
            <div className="grid grid-cols-2 gap-4 h-full">
              <DashKpiCard
                className="h-full"
                label="Win rate"
                value={`${metrics.winRate.toFixed(1)}%`}
                delta={`${metrics.wins.toLocaleString()} wins`}
                borderColor="var(--kol-accent-primary)"
              />
              <DashKpiCard
                className="h-full"
                label="Draw rate"
                value={`${metrics.drawRate.toFixed(1)}%`}
                delta={`${metrics.draws.toLocaleString()} draws`}
                borderColor="var(--kol-status-danger-muted)"
              />
            </div>
          </GridCard>
          <GridCard span="2x1">
            <div className="grid grid-cols-2 gap-4 h-full">
              <DashKpiCard
                className="h-full"
                label="Avg rating"
                value={metrics.avgRating.toLocaleString()}
                delta={`Peak ${metrics.peakRating.toLocaleString()}`}
                borderColor="var(--kol-accent-primary-strong)"
              />
              <DashKpiCard
                className="h-full"
                label="Total games"
                value={formatCompactNumber(metrics.totalGames)}
                delta={`${formatCompactNumber(metrics.ratedGames)} rated`}
                borderColor="var(--kol-status-danger)"
              />
            </div>
          </GridCard>

          <GridCard span="2x2">
            <DashProgressMeterCard
              className="h-full"
              title="Results ledger"
              subtitle="Lifetime outcome mix"
              icon="stat-winner"
              items={resultsLedger}
              footer="Win/draw/loss percentages across all games"
            />
          </GridCard>
          <GridCard span="2x2">
            <DashProgressMeterCard
              className="h-full"
              title="Termination mix"
              subtitle="Most common endings"
              icon="dashboard-roadmap"
              items={terminationItems}
              footer="Rated + unrated matches combined"
            />
          </GridCard>

          <GridCard span="2x2">
            <DashLineChartListCard
              className="h-full"
              title="Top openings"
              subtitle="Ranked by usage"
              icon="dashboard-bookmark"
              chart={<Graph11ColumnChart minHeight={140} />}
              items={openingListItems}
              footer={{
                label: 'Catalogued openings',
                value: formatCompactNumber(openingListItems.length)
              }}
            />
          </GridCard>
          <GridCard span="1x2">
            <DashProgressMeterCard
              className="h-full"
              title="Time control share"
              subtitle="Distribution by mode"
              icon="stopwatch"
              items={timeControlShare.map((item) => ({
                label: item.label,
                value: item.value,
                percent: item.percent
              }))}
              footer="Percentages calculated from total recorded games"
            />
          </GridCard>
          <GridCard span="1x2">
            <DashHistogramCard
              className="h-full"
              title="Rating distribution"
              subtitle="100-point buckets"
              data={ratingHistogramData}
            />
          </GridCard>

          <GridCard span="2x2">
            <DashRivalsCard
              className="h-full"
              title="Rivals list"
              subtitle="Most frequent opponents"
              icon="dashboard-dual-opponent"
              badge={rivals[0]?.name ? `vs ${rivals[0].name}` : null}
              items={rivals}
            />
          </GridCard>
          <GridCard span="2x2">
            <DashPeakRatingsCard
              className="h-full"
              title="Peak rating by mode"
              icon="stat-crown"
              items={peakRatings}
            />
          </GridCard>

          <GridCard span="2x1">
            <div className="grid grid-cols-2 gap-4 h-full">
              <DashSimpleMetricCard
                className="h-full"
                label="Months tracked"
                value={manifest.monthsTracked?.toLocaleString() ?? '0'}
                delta="Continuous record"
              />
              <DashSimpleMetricCard
                className="h-full"
                label="Unique opponents"
                value={uniqueOpponents.toLocaleString()}
                delta="Across all time"
              />
            </div>
          </GridCard>
          <GridCard span="2x1">
            <DashCompactStackedBarCard
              className="h-full"
              title="Mode focus"
              icon="chess-rook"
              value={`${timeControlShare[0]?.percent ?? 0}%`}
              label={timeControlShare[0]?.label ?? 'Mode'}
              trend="up"
              data={compactStackedData}
              footerLeft={`${monthlySummary.length} months`}
              footerRight="Game history"
            />
          </GridCard>

          <GridCard span="4x3">
            <ChessControlsProvider>
              <ChessBoardWithSidebar className="h-full" />
            </ChessControlsProvider>
          </GridCard>
        </DashboardGrid>
      </div>
    </>
  )
}

export default ChessDashboardAnalysis
