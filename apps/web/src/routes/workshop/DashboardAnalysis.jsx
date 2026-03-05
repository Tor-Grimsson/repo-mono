import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import DesPage from '../../components/workshop/molecules/DesPage'
import WorkshopDocLinks from '../../components/workshop/molecules/WorkshopDocLinks'
import {
  DashboardGrid,
  GridCard,
  DashMetricCard,
  DashStackedBarCard,
  DashFeaturedCard,
  DashListCard,
  DashSlotCard,
  DashChartCard,
  Histogram
} from '@kol/ui/dashboards'

import analyticsSnapshot from '../../data/chessAnalyticsSnapshot.json'
import { formatCompactNumber } from '../../utils/chessHelpers'

import '@kol/ui/css/chess.css'

const timeClassLegendClass = {
  blitz: 'chart-color-blitz',
  bullet: 'chart-color-bullet',
  rapid: 'chart-color-rapid',
  daily: 'chart-color-daily',
  classical: 'chart-color-other'
}

const timeClassColor = {
  blitz: 'var(--kol-palette-blue)',
  bullet: 'var(--kol-palette-yellow)',
  daily: 'var(--kol-palette-green)',
  rapid: 'var(--kol-palette-orange)',
  classical: 'var(--kol-palette-purple)'
}

const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

const DashboardAnalysis = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopDocLinks links={DASHBOARD_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  const {
    manifest,
    metrics,
    stackedBarData,
    terminationItems,
    timeControlShare,
    resultsLedger,
    openingListItems,
    rivals,
    ratingHistogramData,
    peakRatings,
    topTimeClass,
    featuredLegends,
    uniqueOpponents,
    compactStackedData
  } = analyticsSnapshot

  const terminationColors = [
    'var(--kol-palette-red)',
    'var(--kol-palette-orange)',
    'var(--kol-palette-green)',
    'var(--kol-palette-blue)'
  ]
  const formattedTermination = terminationItems.map((item, idx) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent,
    color: terminationColors[idx % terminationColors.length]
  }))

  const shareWithDisplay = timeControlShare.map((item) => ({
    ...item,
    valueText: `${item.value.toLocaleString()} games`,
    className: timeClassLegendClass[item.key] || 'chart-color-other'
  }))

  const legends = featuredLegends.map((item) => ({
    label: item.label,
    detail: `${item.value.toLocaleString()} games`,
    className: timeClassLegendClass[item.key] || 'chart-color-other'
  }))

  const openings = openingListItems.map((item) => ({
    label: item.label,
    value: `${item.games.toLocaleString()} games • ${item.winRate}% wins`
  }))

  const rivalsDisplay = rivals.map((item) => ({
    label: item.name,
    value: `${item.games.toLocaleString()} games • ${item.winRate}% wins`
  }))

  const ratingBuckets = ratingHistogramData
  const peakRatingItems = peakRatings.map((item) => ({
    label: item.name,
    value: item.rating,
    detail: `${item.games} games`,
    color: timeClassColor[item.key] || 'var(--kol-palette-purple)'
  }))

  const resultColors = [
    'var(--kol-palette-green)',
    'var(--kol-palette-blue)',
    'var(--kol-palette-red)'
  ]
  const results = resultsLedger.map((item, idx) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent,
    color: resultColors[idx % resultColors.length]
  }))

  const topMode = shareWithDisplay[0]
  const featuredModes = legends

  return (
    <>
      <DesPage
        title="Chess Analysis Dashboard"
        subtitle="Production dashboards composed entirely from chess components."
        meta="Dashboard • Components • Grid layouts"
      />

      <div className="space-y-6">


        <DashboardGrid layout="4-col">
          <GridCard span="3x2">
            <DashFeaturedCard
              className="h-full"
              badge="Lifetime dataset"
              title={topMode?.label || 'Chess Insights'}
              icon="dashboard-book-open"
              description={`Covering ${metrics.totalGames.toLocaleString()} games with live apparatus and dashboards.`}
              metricLabel="Rated games"
              metricValue={metrics.ratedGames.toLocaleString()}
              chart={<Histogram data={ratingBuckets} />}
              legends={featuredModes}
            />
          </GridCard>
          <GridCard span="1x2">
            <DashStackedBarCard
              className="h-full"
              title="Last 12 months"
              value={`${metrics.winRate.toFixed(1)}% win rate`}
              data={stackedBarData}
            />
          </GridCard>

          <GridCard span="2x1">
            <div className="grid grid-cols-2 gap-4 h-full">
              <DashMetricCard
                className="h-full"
                label="Win rate"
                value={`${metrics.winRate.toFixed(1)}%`}
                delta={`${metrics.wins.toLocaleString()} wins`}
                borderColor="var(--kol-palette-green)"
              />
              <DashMetricCard
                className="h-full"
                label="Draw rate"
                value={`${metrics.drawRate.toFixed(1)}%`}
                delta={`${metrics.draws.toLocaleString()} draws`}
                borderColor="var(--kol-palette-blue)"
              />
            </div>
          </GridCard>
          <GridCard span="2x1">
            <div className="grid grid-cols-2 gap-4 h-full">
              <DashMetricCard
                className="h-full"
                label="Avg rating"
                value={metrics.avgRating.toLocaleString()}
                delta={`Peak ${metrics.peakRating.toLocaleString()}`}
                borderColor="var(--kol-palette-purple)"
              />
              <DashMetricCard
                className="h-full"
                label="Total games"
                value={formatCompactNumber(metrics.totalGames)}
                delta={`${formatCompactNumber(metrics.ratedGames)} rated`}
                borderColor="var(--kol-palette-orange)"
              />
            </div>
          </GridCard>

          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="meter"
              title="Results ledger"
              subtitle="Lifetime outcome mix"
              icon="stat-winner"
              items={results}
              barColor="var(--kol-palette-green)"
              footer="Win/draw/loss percentages across all games"
            />
          </GridCard>
          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="meter"
              title="Termination mix"
              subtitle="Most common endings"
              icon="dashboard-roadmap"
              items={formattedTermination}
              barColor="var(--kol-palette-orange)"
              footer="Rated + unrated matches combined"
            />
          </GridCard>

          <GridCard span="2x2">
            <DashSlotCard
              className="h-full"
              title="Top openings"
              subtitle="Ranked by usage"
              icon="dashboard-bookmark"
              chart={<Histogram data={ratingBuckets.slice(0, 5)} barColor="var(--kol-palette-blue)" />}
              items={openings}
              footer={{ label: 'Catalogued openings', value: formatCompactNumber(openings.length) }}
            />
          </GridCard>
          <GridCard span="1x2">
            <DashListCard
              className="h-full"
              variant="meter"
              title="Time control share"
              subtitle="Distribution by mode"
              icon="stopwatch"
              items={shareWithDisplay.map((item) => ({
                label: item.label,
                value: item.valueText,
                percent: item.percent,
                color: timeClassColor[item.key]
              }))}
              footer="Percentages calculated from total recorded games"
            />
          </GridCard>
          <GridCard span="1x2">
            <DashChartCard
              className="h-full"
              title="Rating distribution"
              subtitle="100-point buckets"
            >
              <Histogram data={ratingBuckets} barColor="var(--kol-palette-warm)" />
            </DashChartCard>
          </GridCard>

          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="text"
              title="Rivals list"
              subtitle="Most frequent opponents"
              icon="dashboard-dual-opponent"
              badge={rivalsDisplay[0]?.label ? `vs ${rivalsDisplay[0].label}` : null}
              items={rivalsDisplay}
            />
          </GridCard>
          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="ratings"
              title="Peak rating by mode"
              icon="stat-crown"
              items={peakRatingItems}
            />
          </GridCard>

          <GridCard span="2x1">
            <div className="grid grid-cols-2 gap-4 h-full">
              <DashMetricCard
                className="h-full"
                label="Months tracked"
                value={manifest.monthsTracked?.toLocaleString() ?? '0'}
                delta="Continuous record"
              />
              <DashMetricCard
                className="h-full"
                label="Unique opponents"
                value={uniqueOpponents.toLocaleString()}
                delta="Across all time"
              />
            </div>
          </GridCard>
          <GridCard span="2x1">
            <DashStackedBarCard
              className="h-full"
              title="Mode focus"
              icon="chess-rook"
              value={`${shareWithDisplay[0]?.percent ?? 0}%`}
              label={shareWithDisplay[0]?.label ?? 'Mode'}
              trend="up"
              data={compactStackedData}
              footerLeft={`${analyticsSnapshot.monthlySummary.length} months`}
              footerRight="Game history"
            />
          </GridCard>
        </DashboardGrid>
      </div>
    </>
  )
}

export default DashboardAnalysis
