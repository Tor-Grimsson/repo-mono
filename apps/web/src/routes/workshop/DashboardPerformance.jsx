import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '../../components/shell'
import DesPage from '../../components/workshop/molecules/DesPage'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import {
  DashboardGrid,
  GridCard,
  DashMetricCard,
  DashListCard,
  DashSlotCard,
  DashChartCard,
  DashAlertCard,
  Candlestick,
  ScatterPlot,
  Histogram,
  DonutChart,
  LineChart
} from '@kol/ui/dashboards'

import analyticsSnapshot from '../../data/chessAnalyticsSnapshot.json'
import { formatCompactNumber } from '../../utils/chessHelpers'

import '@kol/ui/css/chess.css'

const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

const DashboardPerformance = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={DASHBOARD_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

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

  const resultMixColors = [
    'var(--kol-palette-green)',
    'var(--kol-palette-blue)',
    'var(--kol-palette-red)'
  ]
  const resultMix = resultMeters.map((item, idx) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent,
    color: resultMixColors[idx % resultMixColors.length]
  }))

  const leaderboard = timeControlLeaderboard.map((item) => ({
    label: item.label,
    value: `${item.winRate}% • ${item.games.toLocaleString()} games`
  }))

  const alertTrend = recentPerformance.currentWinRate >= recentPerformance.previousWinRate ? 'up' : 'down'
  const winRateDeltaRaw = recentPerformance.currentWinRate - recentPerformance.previousWinRate
  const winRateDeltaLabel = `${winRateDeltaRaw >= 0 ? '+' : ''}${winRateDeltaRaw.toFixed(1)} pts`

  const toughOppList = toughOpponents.map((item) => ({
    label: `${item.name} (${item.avgRating})`,
    value: `${item.games} games • ${item.winRate.toFixed(0)}% wins`
  }))

  return (
    <>
      <DesPage
        title="Performance Dashboard"
        subtitle="Momentum, trends, and opponent difficulty at a glance."
        meta="Performance • Dashboard • Trend tracking"
      />

      <DashboardGrid layout="4-col" className="mt-6">
        <GridCard span="2x1">
          <div className="grid grid-cols-2 gap-4 h-full">
            <DashMetricCard
              className="h-full"
              label="Current rating"
              value={ratingStats.current.toLocaleString()}
              delta={`${ratingStats.change >= 0 ? '+' : ''}${ratingStats.change} vs last 10`}
              borderColor="var(--kol-palette-blue)"
            />
            <DashMetricCard
              className="h-full"
              label="Peak rating"
              value={ratingStats.peak.toLocaleString()}
              delta={`${(ratingStats.peak - ratingStats.current).toLocaleString()} above now`}
              borderColor="var(--kol-palette-red)"
            />
          </div>
        </GridCard>
        <GridCard span="2x1">
          <div className="grid grid-cols-2 gap-4 h-full">
            <DashMetricCard
              className="h-full"
              label="Win rate (90d)"
              value={`${recentPerformance.currentWinRate.toFixed(1)}%`}
              delta={`${recentPerformance.current.win.toLocaleString()}/${recentPerformance.current.total.toLocaleString()} games`}
              borderColor="var(--kol-palette-green)"
            />
            <DashMetricCard
              className="h-full"
              label="Games (90d)"
              value={formatCompactNumber(gamesLast90Days)}
              delta={`${formatCompactNumber(manifest.totalGames)} lifetime`}
              borderColor="var(--kol-palette-orange)"
            />
          </div>
        </GridCard>

        <GridCard span="4x2">
          <DashSlotCard
            className="h-full"
            title="Monthly momentum"
            subtitle="Latest 12 months"
            icon="trending"
            chart={<LineChart
              data={monthListItems.map(m => ({ y: parseFloat(m.winRate) || 0 }))}
              height={100} showArea
            />}
            items={monthItems}
            footer={{ label: 'Average rating', value: ratingStats.average.toLocaleString() }}
          />
        </GridCard>

        <GridCard span="3x2">
          <DashChartCard
            className="h-full"
            title="Rating range per month"
            subtitle="High/low/open/close comparison"
            metricLabel="Player rating"
            badge={`±${ratingStats.volatility}`}
            currentValue={`Current ${ratingStats.current.toLocaleString()}`}
            legends={[
              { label: 'Positive month', color: 'var(--kol-palette-yellow)' },
              { label: 'Neutral month', color: 'var(--kol-palette-purple)' }
            ]}
            footer="Derived from frozen PGN archive"
          >
            <Candlestick data={candlestickData} />
          </DashChartCard>
        </GridCard>
        <GridCard span="1x2">
          <div className="flex flex-col gap-4 h-full">
            <DashMetricCard
              className="h-full"
              label="Longest win streak"
              value={`${streakStats.longestWinStreak} games`}
              delta="All-time best run"
            />
            <DashMetricCard
              className="h-full"
              label="Games this year"
              value={gamesThisYear.toLocaleString()}
              delta="Calendar year volume"
            />
          </div>
        </GridCard>

        <GridCard span="2x2">
          {(() => {
            const segments = resultMeters.map((item, idx) => ({
              value: item.value, label: item.label,
              color: resultMixColors[idx % resultMixColors.length]
            }))
            return (
              <div className="dash-card h-full flex flex-col">
                <div className="dash-body text-fg-88">Result mix</div>
                <div className="dash-detail text-fg-64">Last 120 games</div>
                <div className="flex-1 flex items-center justify-center min-h-0">
                  <DonutChart segments={segments} size={200} thickness={28}
                    centerLabel={`${recentPerformance.currentWinRate.toFixed(1)}%`} />
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-center">
                  {segments.map((seg, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                      <span className="dash-caption text-fg-64">{seg.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </GridCard>
        <GridCard span="2x2">
          <DashListCard
            className="h-full"
            variant="text"
            title="Time control leaderboard"
            subtitle="Win rate by mode"
            icon="dashboard-roadmap"
            items={leaderboard}
            footer={`${timeControlPerformance.length} modes tracked`}
          />
        </GridCard>

        <GridCard span="3x2">
          <DashChartCard
            className="h-full"
            title="Opponent strength vs time control"
            subtitle="Avg opponent rating per time control"
            icon="stopwatch"
          >
            <ScatterPlot
              data={scatterPoints.filter(p => p.x <= 720)}
              maxX={720}
              maxY={scatterScale.maxY}
              xLabels={[60, 180, 300, 600]}
              yLabels={[1000, 1500, 2000, 2500]}
            />
          </DashChartCard>
        </GridCard>
        <GridCard span="1x2">
          <DashChartCard
            className="h-full"
            title="Opponent rating spread"
            subtitle="Binned by 100 points"
          >
            <Histogram data={opponentHistogram} barColor="var(--kol-palette-teal)" />
          </DashChartCard>
        </GridCard>

        <GridCard span="2x2">
          <DashAlertCard
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
          <DashListCard
            className="h-full"
            variant="text"
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

export default DashboardPerformance
