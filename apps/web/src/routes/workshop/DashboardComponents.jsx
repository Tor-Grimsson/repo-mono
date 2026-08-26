import { ExhibitCard, useExhibitToc } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'


const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

import {
  DashMetricCard,
  DashStackedBarCard,
  DashChartCard,
  DashListCard,
  DashFeaturedCard,
  DashAlertCard,
  DashSlotCard,
  DashTableCard,
  Histogram,
  Candlestick,
  ScatterPlot,
  LineChart,
  DonutChart,
  Sparkline,
  Heatmap,
  DashboardGrid,
  GridCard
} from '@kolkrabbi/kol-dashboards'

// ============================================================================
// Sample Data
// ============================================================================

const sampleStackedBarData = [
  { win: 12, draw: 3, loss: 8, total: 23 },
  { win: 15, draw: 2, loss: 6, total: 23 },
  { win: 10, draw: 4, loss: 9, total: 23 },
  { win: 18, draw: 1, loss: 4, total: 23 },
  { win: 14, draw: 5, loss: 4, total: 23 },
  { win: 11, draw: 3, loss: 9, total: 23 },
  { win: 16, draw: 2, loss: 5, total: 23 },
  { win: 13, draw: 4, loss: 6, total: 23 },
]

const sampleHistogramData = [
  { range: '1000', count: 45, percentage: 15 },
  { range: '1100', count: 82, percentage: 27 },
  { range: '1200', count: 156, percentage: 52 },
  { range: '1300', count: 234, percentage: 78 },
  { range: '1400', count: 298, percentage: 99 },
  { range: '1500', count: 187, percentage: 62 },
  { range: '1600', count: 89, percentage: 30 },
  { range: '1700', count: 34, percentage: 11 },
]

const sampleCandlestickData = [
  { high: 1480, low: 1380, open: 1400, close: 1450, variant: 'accent' },
  { high: 1520, low: 1420, open: 1450, close: 1480, variant: 'accent' },
  { high: 1550, low: 1460, open: 1480, close: 1440, variant: 'neutral' },
  { high: 1580, low: 1420, open: 1450, close: 1520, variant: 'accent' },
  { high: 1550, low: 1480, open: 1520, close: 1490, variant: 'neutral' },
  { high: 1600, low: 1470, open: 1490, close: 1580, variant: 'accent' },
  { high: 1620, low: 1510, open: 1580, close: 1530, variant: 'neutral' },
  { high: 1590, low: 1490, open: 1530, close: 1570, variant: 'accent' },
  { high: 1640, low: 1520, open: 1570, close: 1610, variant: 'accent' },
  { high: 1680, low: 1580, open: 1610, close: 1650, variant: 'accent' },
  { high: 1700, low: 1620, open: 1650, close: 1680, variant: 'accent' },
  { high: 1720, low: 1650, open: 1680, close: 1700, variant: 'accent' },
]

const sampleScatterData = [
  { x: 20, y: 800, id: 1 }, { x: 40, y: 1100, id: 2 }, { x: 55, y: 1250, id: 3 },
  { x: 35, y: 950, id: 4 }, { x: 70, y: 1400, id: 5 }, { x: 50, y: 1150, id: 6 },
  { x: 45, y: 1050, id: 7 }, { x: 85, y: 1550, id: 8 }, { x: 30, y: 900, id: 9 },
  { x: 60, y: 1300, id: 10 }, { x: 95, y: 1650, id: 11 }, { x: 75, y: 1450, id: 12 },
  { x: 25, y: 850, id: 13 }, { x: 80, y: 1500, id: 14 }, { x: 65, y: 1350, id: 15 },
  { x: 90, y: 1600, id: 16 }, { x: 100, y: 1750, id: 17 }, { x: 15, y: 700, id: 18 },
]

const sampleProgressItems = [
  { label: 'Checkmate', value: '456', percent: 85, color: 'var(--kol-palette-green)' },
  { label: 'Resignation', value: '312', percent: 58, color: 'var(--kol-palette-orange)' },
  { label: 'Timeout', value: '189', percent: 35, color: 'var(--kol-palette-purple)' },
  { label: 'Draw', value: '98', percent: 18, color: 'var(--kol-palette-blue)' },
]

const sampleRivals = [
  { label: 'ChessMaster2000', value: '47 games' },
  { label: 'KnightRider99', value: '34 games' },
  { label: 'QueenGambit', value: '28 games' },
  { label: 'BishopBoss', value: '21 games' },
]

const samplePeakRatings = [
  { label: 'Blitz', value: 1523, detail: '1.2k games', color: 'var(--kol-palette-yellow)' },
  { label: 'Bullet', value: 1489, detail: '890 games', color: 'var(--kol-palette-purple)' },
  { label: 'Rapid', value: 1612, detail: '456 games', color: 'var(--kol-palette-blue)' },
  { label: 'Daily', value: 1701, detail: '234 games', color: 'var(--kol-palette-green)' },
]

const sampleAlerts = [
  { title: 'Winning streak', description: '5 consecutive wins in blitz' },
  { title: 'Rating milestone', description: 'Reached 1500+ in rapid' },
]

const sampleLineChartListItems = [
  { label: 'Sicilian Defense', value: '234 games • 58% wins' },
  { label: "King's Gambit", value: '189 games • 52% wins' },
  { label: 'French Defense', value: '156 games • 47% wins' },
  { label: 'Caro-Kann', value: '98 games • 61% wins' },
]

const sampleLineData = [
  { x: 'Jan', y: 1420 }, { x: 'Feb', y: 1445 }, { x: 'Mar', y: 1430 },
  { x: 'Apr', y: 1460 }, { x: 'May', y: 1485 }, { x: 'Jun', y: 1470 },
  { x: 'Jul', y: 1510 }, { x: 'Aug', y: 1525 }, { x: 'Sep', y: 1500 },
  { x: 'Oct', y: 1540 }, { x: 'Nov', y: 1555 }, { x: 'Dec', y: 1570 },
]

const sampleMultiLineData = [
  { data: [{ x: 'Jan', y: 12 }, { x: 'Feb', y: 15 }, { x: 'Mar', y: 10 }, { x: 'Apr', y: 18 }, { x: 'May', y: 14 }, { x: 'Jun', y: 16 }, { x: 'Jul', y: 20 }, { x: 'Aug', y: 17 }, { x: 'Sep', y: 22 }, { x: 'Oct', y: 19 }, { x: 'Nov', y: 24 }, { x: 'Dec', y: 21 }], color: 'var(--kol-palette-green)', fill: true },
  { data: [{ x: 'Jan', y: 8 }, { x: 'Feb', y: 6 }, { x: 'Mar', y: 9 }, { x: 'Apr', y: 4 }, { x: 'May', y: 7 }, { x: 'Jun', y: 5 }, { x: 'Jul', y: 3 }, { x: 'Aug', y: 6 }, { x: 'Sep', y: 4 }, { x: 'Oct', y: 5 }, { x: 'Nov', y: 3 }, { x: 'Dec', y: 4 }], color: 'var(--kol-palette-red)' },
]

const sampleDonutData = [
  { value: 456, color: 'var(--kol-palette-green)', label: 'Wins' },
  { value: 98, color: 'var(--kol-palette-yellow)', label: 'Draws' },
  { value: 312, color: 'var(--kol-palette-red)', label: 'Losses' },
  { value: 45, color: 'var(--kol-palette-purple)', label: 'Abandoned' },
]

const sampleSparklineData = [12, 15, 10, 18, 14, 16, 20, 17, 22, 19, 24, 21]

const sampleHeatmapData = [
  [2, 5, 8, 3, 6, 1],
  [4, 9, 3, 7, 2, 5],
  [1, 6, 10, 4, 8, 3],
  [7, 3, 5, 9, 1, 6],
  [3, 8, 2, 6, 10, 4],
  [6, 1, 7, 2, 5, 9],
  [5, 4, 6, 8, 3, 7],
]

const sampleTableColumns = [
  { header: 'Opening', accessor: 'opening' },
  { header: 'Games', accessor: 'games' },
  { header: 'Win %', accessor: 'winRate' },
  { header: 'Avg Rating', accessor: 'avgRating' },
]

const sampleTableRows = [
  { opening: 'Sicilian Defense', games: 234, winRate: '58%', avgRating: 1420 },
  { opening: "King's Gambit", games: 189, winRate: '52%', avgRating: 1380 },
  { opening: 'French Defense', games: 156, winRate: '47%', avgRating: 1450 },
  { opening: 'Caro-Kann', games: 98, winRate: '61%', avgRating: 1510 },
  { opening: 'Italian Game', games: 87, winRate: '55%', avgRating: 1390 },
]

// ============================================================================
// Component
// ============================================================================

const DashboardComponents = () => {
  useExhibitToc({ links: DASHBOARD_DOC_LINKS })

  return (
    <div>
      <PageSection
        id="dashboard-components"
        label="Dashboard"
        title="Dashboard Components"
        body="Dashboard card components for displaying metrics, charts, and data visualizations."
      />

      <PageSection
        id="metric-cards"
        label="Metric Cards"
        title="DashMetricCard"
        body="Key metric display with label, value, and delta. Optional borderColor activates KPI accent variant."
      >
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <ExhibitCard
                name="KPI variant"
                description="Left border accent highlights key performance indicators."
                details="Variant: borderColor present • Classes: kol-heading-lg, kol-mono-12, kol-mono-14"
                code="label value delta borderColor className?"
              />
              <DashMetricCard label="GAMES PLAYED" value="2,847" delta="+156 this month" borderColor="var(--kol-palette-yellow)" />
            </div>
            <div className="flex-1 space-y-4">
              <ExhibitCard
                name="Default variant"
                description="Plain metric card without accent border."
                details="Variant: no borderColor • Classes: kol-heading-lg, kol-mono-12, kol-mono-14"
                code="label value delta className?"
              />
              <DashMetricCard label="MONTHS TRACKED" value="106" delta="Complete game history" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <DashMetricCard label="WIN RATE" value="47.8%" delta="+2.3% vs last month" borderColor="var(--kol-palette-purple)" />
            </div>
            <div className="flex-1">
              <DashMetricCard label="PEAK RATING" value="1,523" delta="Blitz • Dec 2024" borderColor="var(--kol-palette-blue)" />
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="stacked-bar"
        label="Stacked Bar Cards"
        title="DashStackedBarCard"
        body="Win/draw/loss stacked bar visualization. Mini mode (no icon) or compact mode (with icon, trend, footer)."
      >
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <ExhibitCard
                name="Mini variant"
                description="Title, value, and stacked bars."
                details="Variant: no icon • Classes: kol-sans-heading-05 uppercase, kol-heading-lg, bg-fg-32/24/16"
                code="title value data[] className?"
              />
              <DashStackedBarCard
                title="WIN RATE"
                value="47.1%"
                data={sampleStackedBarData}
              />
            </div>
            <div className="flex-1 space-y-4">
              <ExhibitCard
                name="Compact variant"
                description="Icon header, metric with trend indicator, bars, and footer."
                details="Variant: icon present • Classes: kol-heading-md, kol-heading-lg, kol-mono-12"
                code="title value data[] icon label? trend? footerLeft? footerRight? className?"
              />
              <DashStackedBarCard
                title="Blitz"
                icon="chess-rook"
                value="52.3%"
                label="win rate"
                trend="up"
                data={sampleStackedBarData}
                footerLeft="8 months"
                footerRight="184 games"
              />
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="chart-cards"
        label="Chart Cards"
        title="DashChartCard"
        body="Universal chart shell with title, subtitle, optional badge/metric header, legends, and footer. Pass any chart visualization as children."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="Histogram"
            description="Bar distribution chart showing frequency across buckets."
            details="Chart: Histogram • Classes: kol-sans-heading-05 uppercase, kol-mono-12, kol-mono-10"
            code="<DashChartCard title subtitle?><Histogram data[] height? barColor? /></DashChartCard>"
          />
          <DashChartCard
            title="Rating Distribution"
            subtitle="Opponent ratings faced across all games"
          >
            <Histogram data={sampleHistogramData} />
          </DashChartCard>

          <ExhibitCard
            name="Candlestick"
            description="OHLC chart showing high, low, open, and close values over time."
            details="Chart: Candlestick • Classes: kol-sans-heading-05 uppercase, kol-mono-12, kol-mono-14"
            code="<DashChartCard title subtitle? badge? metricLabel? legends?><Candlestick data[] height? /></DashChartCard>"
          />
          <DashChartCard
            title="RATING RANGE BY MONTH"
            subtitle="Last 12 months high/low/open/close"
            metricLabel="Player Rating"
            badge="↗ +45"
            currentValue="Current: 1,523"
            legends={[
              { label: 'Rating gain', color: 'var(--kol-palette-yellow)' },
              { label: 'Rating loss', color: 'var(--kol-palette-purple)' },
            ]}
            footer="Monthly rating fluctuations"
          >
            <Candlestick data={sampleCandlestickData} />
          </DashChartCard>

          <ExhibitCard
            name="Scatter Plot"
            description="XY scatter plot showing relationship between two variables."
            details="Chart: ScatterPlot • Classes: kol-sans-heading-05 uppercase, kol-mono-12, bg-fg-04"
            code="<DashChartCard title subtitle? icon?><ScatterPlot data[] maxX maxY xLabels[] yLabels[] pointColor? /></DashChartCard>"
          />
          <DashChartCard
            title="GAME LENGTH vs RATING"
            subtitle="Correlation between time control and opponent rating"
            icon="stopwatch"
          >
            <ScatterPlot
              data={sampleScatterData}
              maxX={120}
              maxY={2000}
              xLabels={[20, 40, 60, 80, 100]}
              yLabels={[500, 1000, 1500, 2000]}
              pointColor="var(--kol-palette-blue)"
            />
          </DashChartCard>

          <ExhibitCard
            name="Line Chart"
            description="SVG line/area chart with optional multi-series support."
            details="Chart: LineChart • Props: data[], series[], showArea?, showDots?"
            code="<DashChartCard title><LineChart data[] showArea /></DashChartCard>"
          />
          <DashChartCard
            title="RATING TREND"
            subtitle="12-month blitz rating"
            legends={[{ label: 'Rating', color: 'var(--kol-palette-yellow)' }]}
          >
            <LineChart
              data={sampleLineData}
              showArea
              height={200}
              xLabels={['Jan', 'Apr', 'Jul', 'Oct', 'Dec']}
              yLabels={[1400, 1500, 1600]}
            />
          </DashChartCard>

          <ExhibitCard
            name="Donut Chart"
            description="Ring chart with proportional segments."
            details="Chart: DonutChart • Props: segments[], size?, thickness?, centerLabel?"
            code="<DashChartCard title><DonutChart segments[] centerLabel? /></DashChartCard>"
          />
          <DashChartCard
            title="GAME OUTCOMES"
            subtitle="Win/draw/loss distribution"
          >
            <div className="flex justify-center py-4">
              <DonutChart segments={sampleDonutData} size={140} thickness={22} centerLabel="911" showLegend />
            </div>
          </DashChartCard>
        </div>
      </PageSection>

      <PageSection
        id="list-cards"
        label="List Cards"
        title="DashListCard"
        body="Ranked list card with three variants: meter (progress bars), text (simple rows), ratings (color dot + value/detail)."
      >
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <ExhibitCard
                name="Meter variant"
                description="Horizontal progress bars showing ranked items with percentages."
                details="Variant: meter • Classes: kol-sans-heading-05 uppercase, kol-mono-14, kol-mono-12"
                code="title subtitle? icon? items[{label,value,percent}] variant='meter' barColor? footer? className?"
              />
              <DashListCard
                variant="meter"
                title="GAME OUTCOMES"
                subtitle="Top termination types"
                icon="trophy"
                items={sampleProgressItems}
                barColor="var(--kol-palette-orange)"
                footer="Based on 1,055 games"
              />
            </div>
            <div className="flex-1 space-y-4">
              <ExhibitCard
                name="Text variant"
                description="Simple ranked list with label and value text."
                details="Variant: text • Classes: kol-sans-heading-05 uppercase, kol-mono-14, kol-mono-12"
                code="title subtitle? icon? badge? items[{label,value}] variant='text' footer? className?"
              />
              <DashListCard
                variant="text"
                title="RIVALS"
                subtitle="Most played opponents"
                icon="users"
                badge="#1"
                items={sampleRivals}
                footer="Head-to-head game counts"
              />
            </div>
          </div>

          <ExhibitCard
            name="Ratings variant"
            description="Color-coded items with prominent value and detail text. Ideal for leaderboards."
            details="Variant: ratings • Classes: kol-sans-heading-05 uppercase, kol-heading-md, kol-mono-14, kol-mono-12"
            code="title subtitle? icon? items[{label,value,detail,color}] variant='ratings' footer? className?"
          />
          <DashListCard
            variant="ratings"
            title="Peak Ratings"
            icon="crown"
            items={samplePeakRatings}
          />
        </div>
      </PageSection>

      <PageSection
        id="featured-card"
        label="Featured Card"
        title="DashFeaturedCard"
        body="Large spotlight card with badge, title, description, chart slot, metric display, and legend row."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="DashFeaturedCard"
            description="Hero-style card for featured content with rich metadata."
            details="Classes: kol-sans-heading-05 uppercase, kol-heading-md, kol-mono-12, kol-mono-10"
            code="badge? title icon? description? metricLabel? metricValue? chart? legends[]? className?"
          />
          <DashFeaturedCard
            badge="TOP OPENING"
            title="King's Gambit"
            icon="book-open"
            description="Your most successful opening with 58% win rate across 234 games."
            metricLabel="Games tracked"
            metricValue="234"
            legends={[
              { label: 'Win rate', color: 'var(--kol-palette-green)' },
              { label: 'Usage volume', color: 'var(--kol-palette-orange)' },
            ]}
          />
        </div>
      </PageSection>

      <PageSection
        id="alert-card"
        label="Alert Card"
        title="DashAlertCard"
        body="Status card with metric, trend badge, alert notifications, and footer."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="DashAlertCard"
            description="Trend-aware status card with alert items."
            details="Classes: kol-heading-lg, kol-heading-xs, kol-mono-14, kol-mono-12"
            code="label value trend trendValue alerts[{title,description}] footer? className?"
          />
          <DashAlertCard
            label="Win Rate"
            value="52.1%"
            trend="up"
            trendValue="+4.3%"
            alerts={sampleAlerts}
            footer="Month-over-month comparison"
          />
        </div>
      </PageSection>

      <PageSection
        id="slot-card"
        label="Slot Card"
        title="DashSlotCard"
        body="Card with a chart visualization slot, item grid, and footer summary. Pass any chart component via the chart prop."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="DashSlotCard"
            description="Flexible card with chart slot + item list + footer."
            details="Classes: kol-sans-heading-05 uppercase, kol-mono-12, kol-mono-10"
            code="title subtitle? icon? chart? items[{label,value}] footer?{label,value} className?"
          />
          <DashSlotCard
            title="TOP OPENINGS"
            subtitle="Ranked by usage"
            icon="bookmark"
            chart={<Histogram data={sampleHistogramData.slice(0, 5)} />}
            items={sampleLineChartListItems}
            footer={{ label: 'Catalogued openings', value: '4' }}
          />
        </div>
      </PageSection>

      <PageSection
        id="line-chart"
        label="Line Chart"
        title="LineChart"
        body="SVG line chart with optional area fill, dots, and multi-series support. Normalizes data to viewBox coordinates."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="Single series"
            description="Basic line chart with area fill."
            details="Chart: LineChart • Props: data, showArea, showDots, xLabels, yLabels"
            code="<DashChartCard title><LineChart data[] showArea height? /></DashChartCard>"
          />
          <DashChartCard
            title="RATING PROGRESSION"
            subtitle="Monthly blitz rating over 12 months"
            legends={[{ label: 'Blitz rating', color: 'var(--kol-palette-yellow)' }]}
          >
            <LineChart
              data={sampleLineData}
              showArea
              showDots
              height={200}
              xLabels={['Jan', 'Apr', 'Jul', 'Oct', 'Dec']}
              yLabels={[1400, 1450, 1500, 1550]}
            />
          </DashChartCard>

          <ExhibitCard
            name="Multi-series"
            description="Two series with independent colors and optional per-series area fill."
            details="Chart: LineChart • Props: series[{data, color, fill?}]"
            code="<DashChartCard title><LineChart series[] /></DashChartCard>"
          />
          <DashChartCard
            title="WINS vs LOSSES"
            subtitle="Monthly game outcomes"
            legends={[
              { label: 'Wins', color: 'var(--kol-palette-green)' },
              { label: 'Losses', color: 'var(--kol-palette-red)' },
            ]}
          >
            <LineChart
              series={sampleMultiLineData}
              height={200}
              xLabels={['Jan', 'Apr', 'Jul', 'Oct', 'Dec']}
              yLabels={[0, 10, 20]}
            />
          </DashChartCard>
        </div>
      </PageSection>

      <PageSection
        id="donut-chart"
        label="Donut Chart"
        title="DonutChart"
        body="Ring chart built with SVG stroke-dasharray. Supports center label and hover tooltips."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="DonutChart"
            description="Proportional ring segments with optional center content."
            details="Chart: DonutChart • Props: segments[{value, color, label?}], size?, thickness?, centerLabel?"
            code="<DonutChart segments[] size? thickness? centerLabel? />"
          />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 dash-card flex items-center justify-center py-8">
              <DonutChart segments={sampleDonutData} size={160} thickness={24} centerLabel="911" showLegend />
            </div>
            <div className="flex-1 dash-card flex items-center justify-center py-8">
              <DonutChart segments={sampleDonutData} size={120} thickness={16} showLegend />
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="sparkline"
        label="Sparkline"
        title="Sparkline"
        body="Tiny inline SVG chart for embedding in metric cards. No axes, no labels, no tooltip."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="Sparkline"
            description="Minimal line visualization for inline use."
            details="Chart: Sparkline • Props: data[], color?, height?, fill?"
            code="<Sparkline data[] color? height? fill? />"
          />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 dash-card">
              <span className="dash-detail text-fg-64">Default (24px)</span>
              <Sparkline data={sampleSparklineData} />
            </div>
            <div className="flex-1 dash-card">
              <span className="dash-detail text-fg-64">With fill (32px)</span>
              <Sparkline data={sampleSparklineData} height={32} fill color="var(--kol-palette-green)" />
            </div>
            <div className="flex-1 dash-card">
              <span className="dash-detail text-fg-64">Accent color (40px)</span>
              <Sparkline data={sampleSparklineData} height={40} color="var(--kol-palette-yellow)" />
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="heatmap"
        label="Heatmap"
        title="Heatmap"
        body="CSS Grid heatmap with color-mix interpolation. Accepts 2D arrays or flat {row, col, value} objects."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="Heatmap"
            description="Grid of cells colored by intensity using color-mix()."
            details="Chart: Heatmap • Props: data, rows[], cols[], colorScale?"
            code="<DashChartCard title><Heatmap data rows[] cols[] colorScale? /></DashChartCard>"
          />
          <DashChartCard
            title="ACTIVITY HEATMAP"
            subtitle="Games played by day and time block"
          >
            <Heatmap
              data={sampleHeatmapData}
              rows={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
              cols={['Morning', 'Midday', 'Afternoon', 'Evening', 'Night', 'Late']}
            />
          </DashChartCard>
        </div>
      </PageSection>

      <PageSection
        id="table-card"
        label="Table Card"
        title="DashTableCard"
        body="Wraps the Table molecule in a dash-card shell with CardHeader and optional footer."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="DashTableCard"
            description="Table wrapped in card styling."
            details="Card: DashTableCard • Props: title, subtitle?, icon?, columns[], rows[], footer?"
            code="<DashTableCard title columns[] rows[] footer? />"
          />
          <DashTableCard
            title="OPENING STATISTICS"
            subtitle="Performance by opening"
            columns={sampleTableColumns}
            rows={sampleTableRows}
            footer="Showing top 5 openings by game count"
          />
        </div>
      </PageSection>

      <PageSection
        id="layout"
        label="Layout"
        title="DashboardGrid + GridCard"
        body="Grid layout system. DashboardGrid provides the container grid; GridCard controls column/row spanning."
      >
        <div className="mt-8 space-y-6">
          <ExhibitCard
            name="Grid spans"
            description="GridCard span configurations: 1x1, 2x1, 2x2, etc."
            details="Layout: DashboardGrid layout='4-col' • GridCard span='NxM' asCard?"
            code="<DashboardGrid layout='4-col'><GridCard span='2x1' asCard>...</GridCard></DashboardGrid>"
          />
          <DashboardGrid layout="4-col">
            <GridCard span="2x1" asCard>
              <span className="dash-detail text-fg-64">2x1 span</span>
              <Sparkline data={sampleSparklineData} fill color="var(--kol-palette-yellow)" />
            </GridCard>
            <GridCard span="1x1" asCard>
              <span className="dash-detail text-fg-64">1x1</span>
            </GridCard>
            <GridCard span="1x1" asCard>
              <span className="dash-detail text-fg-64">1x1</span>
            </GridCard>
            <GridCard span="1x1" asCard>
              <span className="dash-detail text-fg-64">1x1</span>
            </GridCard>
            <GridCard span="1x1" asCard>
              <span className="dash-detail text-fg-64">1x1</span>
            </GridCard>
            <GridCard span="1x1" asCard>
              <span className="dash-detail text-fg-64">1x1</span>
            </GridCard>
            <GridCard span="1x1" asCard>
              <span className="dash-detail text-fg-64">1x1</span>
            </GridCard>
            <GridCard span="4x1" asCard>
              <span className="dash-detail text-fg-64">4x1 full-width span</span>
              <Sparkline data={sampleSparklineData} fill color="var(--kol-palette-green)" />
            </GridCard>
          </DashboardGrid>
        </div>
      </PageSection>

      <PageSection
        id="usage"
        label="Usage"
        title="Usage Guidelines"
        body="Design tokens and patterns used across dashboard components."
      >
        <div className="mt-8 space-y-6">
          <div className="p-6 bg-fg-02 border border-fg-08 rounded">
            <div className="kol-mono-12 text-fg-64 space-y-2">
              <p><strong className="text-fg-88">Colors:</strong> bg-fg-02, border-fg-08, text-fg-60/64/80/88</p>
              <p><strong className="text-fg-88">Typography:</strong> kol-sans-heading-05 uppercase/md/lg, kol-mono-10/xs/sm</p>
              <p><strong className="text-fg-88">Spacing:</strong> p-6 (24px), gap-4 (16px), rounded (4px)</p>
              <p><strong className="text-fg-88">Accents:</strong> var(--kol-palette-*) — yellow, purple, blue, green, orange, red, warm</p>
              <p><strong className="text-fg-88">Shell:</strong> flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded</p>
              <p><strong className="text-fg-88">Footer:</strong> mt-auto pt-4 border-t border-fg-08</p>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  )
}

export default DashboardComponents
