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
import Graph10StackedArea from '../../components/workshop/chess/charts/Graph10StackedArea'
import Graph11ColumnChart from '../../components/workshop/chess/charts/Graph11ColumnChart'

import analyticsSnapshot from '../../data/chessAnalyticsSnapshot.json'
import { formatCompactNumber } from '../../utils/chessHelpers'

import '@kol/ui/css/analytics.css'
import '@kol/ui/css/chess.css'

const timeClassLegendClass = {
  blitz: 'donut-color-blitz',
  bullet: 'donut-color-bullet',
  rapid: 'donut-color-rapid',
  daily: 'donut-color-daily',
  classical: 'donut-color-other'
}

const AnalyticsDashboardAnalysis = () => {
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

  const formattedTermination = terminationItems.map((item) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent
  }))

  const shareWithDisplay = timeControlShare.map((item) => ({
    ...item,
    valueText: `${item.value.toLocaleString()} games`,
    className: timeClassLegendClass[item.key] || 'donut-color-other'
  }))

  const legends = featuredLegends.map((item) => ({
    label: item.label,
    detail: `${item.value.toLocaleString()} games`,
    className: timeClassLegendClass[item.key] || 'donut-color-other'
  }))

  const openings = openingListItems.map((item) => ({
    label: item.label,
    value: `${item.games.toLocaleString()} games • ${item.winRate}% wins`
  }))

  const rivalsDisplay = rivals.map((item) => ({
    name: item.name,
    count: `${item.games.toLocaleString()} games • ${item.winRate}% wins`
  }))

  const ratingBuckets = ratingHistogramData
  const peakRatingItems = peakRatings.map((item) => ({
    name: item.name,
    rating: item.rating,
    games: item.games,
    color: timeClassLegendClass[item.key] || 'donut-color-other'
  }))

  const results = resultsLedger.map((item) => ({
    label: item.label,
    value: `${item.value.toLocaleString()} games`,
    percent: item.percent
  }))

  const topMode = shareWithDisplay[0]
  const featuredModes = legends

  return (
    <>
      <DesPage
        title="Chess Analysis Dashboard"
        subtitle="Production dashboards composed entirely from chess components."
        meta="Analytics • Components • Grid layouts"
      />

      <div className="space-y-6">
        

        <DashboardGrid layout="4-col">
          <GridCard span="3x2">
            <DashFeaturedAnalysisCard
              className="h-full"
              badge="Lifetime dataset"
              title={topMode?.label || 'Chess Insights'}
              icon="dashboard-book-open"
              description={`Covering ${metrics.totalGames.toLocaleString()} games with live apparatus and analytics.`}
              metricLabel="Rated games"
              metricValue={metrics.ratedGames.toLocaleString()}
              chart={<Graph10StackedArea minHeight={340} className="h-full" />}
              legends={featuredModes}
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
                value={`${metrics.winRate.toFixed(1)}%`
                }
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
              items={results}
              footer="Win/draw/loss percentages across all games"
            />
          </GridCard>
          <GridCard span="2x2">
            <DashProgressMeterCard
              className="h-full"
              title="Termination mix"
              subtitle="Most common endings"
              icon="dashboard-roadmap"
              items={formattedTermination}
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
              items={openings}
              footer={{ label: 'Catalogued openings', value: formatCompactNumber(openings.length) }}
            />
          </GridCard>
          <GridCard span="1x2">
            <DashProgressMeterCard
              className="h-full"
              title="Time control share"
              subtitle="Distribution by mode"
              icon="stopwatch"
              items={shareWithDisplay.map((item) => ({
                label: item.label,
                value: item.valueText,
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
              data={ratingBuckets}
            />
          </GridCard>

          <GridCard span="2x2">
            <DashRivalsCard
              className="h-full"
              title="Rivals list"
              subtitle="Most frequent opponents"
              icon="dashboard-dual-opponent"
              badge={rivalsDisplay[0]?.name ? `vs ${rivalsDisplay[0].name}` : null}
              items={rivalsDisplay}
            />
          </GridCard>
          <GridCard span="2x2">
            <DashPeakRatingsCard
              className="h-full"
              title="Peak rating by mode"
              icon="stat-crown"
              items={peakRatingItems}
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

export default AnalyticsDashboardAnalysis
