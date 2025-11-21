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

import analyticsSnapshot from '../../data/chessAnalyticsSnapshot.json'
import { formatCompactNumber } from '../../utils/chessHelpers'

import '@kol/ui/css/analytics.css'
import '@kol/ui/css/chess.css'

const AnalyticsDashboardPerformance = () => {
  const {
    manifest,
    ratingStats,
    recentPerformance,
    monthListItems,
    candlestickData,
    resultMeters,
    timeControlLeaderboard,
    timeControlPerformance,
    bestTimeClass,
    weakestTimeClass,
    streakStats,
    gamesThisYear,
    gamesLast90Days,
    opponentHistogram,
    scatterPoints,
    scatterScale,
    toughOpponents
  } = analyticsSnapshot

  const monthItems = monthListItems.map((item) => ({
    label: item.label,
    value: `${item.winRate}% • ${item.total.toLocaleString()} games`
  }))

  const resultMix = resultMeters.map((item) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent
  }))

  const leaderboard = timeControlLeaderboard.map((item) => ({
    label: item.label,
    value: `${item.winRate}% • ${item.games.toLocaleString()} games`
  }))

  const alertTrend = recentPerformance.currentWinRate >= recentPerformance.previousWinRate ? 'up' : 'down'
  const winRateDeltaRaw = recentPerformance.currentWinRate - recentPerformance.previousWinRate
  const winRateDeltaLabel = `${winRateDeltaRaw >= 0 ? '+' : ''}${winRateDeltaRaw.toFixed(1)} pts`

  const toughOppList = toughOpponents.map((item) => ({
    name: `${item.name} (${item.avgRating})`,
    count: `${item.games} games • ${item.winRate.toFixed(0)}% wins`
  }))

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
              delta={`${recentPerformance.current.win.toLocaleString()}/${recentPerformance.current.total.toLocaleString()} games`}
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
            items={monthItems}
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
            footer="Derived from frozen PGN archive"
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
            items={resultMix}
            footer="Wins, draws, and losses with frozen percentages"
          />
        </GridCard>
        <GridCard span="2x2">
          <DashLineChartListCard
            className="h-full"
            title="Time control leaderboard"
            subtitle="Win rate by mode"
            icon="dashboard-roadmap"
            items={leaderboard}
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
            trend={alertTrend}
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
            items={toughOppList}
            footer="Sorted by opponent average rating (last 200 games)"
          />
        </GridCard>
      </DashboardGrid>
    </>
  )
}

export default AnalyticsDashboardPerformance
