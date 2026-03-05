import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import { SectionToggle } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesSection from '../../components/workshop/molecules/DesSection'
import DesCard from '../../components/workshop/molecules/DesCard'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import useSectionExpansion from '../../components/workshop/useSectionExpansion'


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
  Histogram,
  Candlestick,
  ScatterPlot
} from '@kol/ui/dashboards'

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
  { label: 'Blitz', value: 1523, detail: '1.2k games', color: 'bg-[var(--kol-palette-yellow)]' },
  { label: 'Bullet', value: 1489, detail: '890 games', color: 'bg-[var(--kol-palette-purple)]' },
  { label: 'Rapid', value: 1612, detail: '456 games', color: 'bg-[var(--kol-palette-blue)]' },
  { label: 'Daily', value: 1701, detail: '234 games', color: 'bg-[var(--kol-palette-green)]' },
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

// ============================================================================
// Component
// ============================================================================

const DashboardComponents = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={DASHBOARD_DOC_LINKS} allExpanded={allExpanded} onToggleAll={toggleAll} />)
    return () => setTocContent(null)
  }, [setTocContent, allExpanded, toggleAll])

  const { sections: expandedSections, toggleSection, allExpanded, toggleAll } = useSectionExpansion('dashboard-components', {
    'metric-cards': false,
    'stacked-bar': false,
    'chart-cards': false,
    'list-cards': false,
    'featured-card': false,
    'alert-card': false,
    'slot-card': false,
    'usage': false,
  })

  return (
    <div className="space-y-10">
      <DesPage
        title="Dashboard Components"
        subtitle="Dashboard card components for displaying metrics, charts, and data visualizations."
      />

      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="space-y-4">
          <SectionToggle
            label="Metric Cards"
            isExpanded={expandedSections['metric-cards']}
            onToggle={() => toggleSection('metric-cards')}
          />
          {expandedSections['metric-cards'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="DashMetricCard"
                description="Key metric display with label, value, and delta. Optional borderColor activates KPI accent variant."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="KPI variant"
                    description="Left border accent highlights key performance indicators."
                    details="Variant: borderColor present • Classes: kol-heading-lg, kol-mono-xs, kol-mono-sm"
                    code="label value delta borderColor className?"
                  />
                  <DashMetricCard label="GAMES PLAYED" value="2,847" delta="+156 this month" borderColor="var(--kol-palette-yellow)" />
                </div>
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Default variant"
                    description="Plain metric card without accent border."
                    details="Variant: no borderColor • Classes: kol-heading-lg, kol-mono-xs, kol-mono-sm"
                    code="label value delta className?"
                  />
                  <DashMetricCard label="MONTHS TRACKED" value="106" delta="Complete game history" />
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1">
                  <DashMetricCard label="WIN RATE" value="47.8%" delta="+2.3% vs last month" borderColor="var(--kol-palette-purple)" />
                </div>
                <div className="flex-1">
                  <DashMetricCard label="PEAK RATING" value="1,523" delta="Blitz • Dec 2024" borderColor="var(--kol-palette-blue)" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stacked Bar Cards */}
        <div className="space-y-4">
          <SectionToggle
            label="Stacked Bar Cards"
            isExpanded={expandedSections['stacked-bar']}
            onToggle={() => toggleSection('stacked-bar')}
          />
          {expandedSections['stacked-bar'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="DashStackedBarCard"
                description="Win/draw/loss stacked bar visualization. Mini mode (no icon) or compact mode (with icon, trend, footer)."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Mini variant"
                    description="Title, value, and stacked bars."
                    details="Variant: no icon • Classes: kol-heading-sm, kol-heading-lg, bg-fg-32/24/16"
                    code="title value data[] className?"
                  />
                  <DashStackedBarCard
                    title="WIN RATE"
                    value="47.1%"
                    data={sampleStackedBarData}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Compact variant"
                    description="Icon header, metric with trend indicator, bars, and footer."
                    details="Variant: icon present • Classes: kol-heading-md, kol-heading-lg, kol-mono-xs"
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
          )}
        </div>

        {/* Chart Cards */}
        <div className="space-y-4">
          <SectionToggle
            label="Chart Cards"
            isExpanded={expandedSections['chart-cards']}
            onToggle={() => toggleSection('chart-cards')}
          />
          {expandedSections['chart-cards'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="DashChartCard"
                description="Universal chart shell with title, subtitle, optional badge/metric header, legends, and footer. Pass any chart visualization as children."
              />
              <DesCard
                name="Histogram"
                description="Bar distribution chart showing frequency across buckets."
                details="Chart: Histogram • Classes: kol-heading-sm, kol-mono-xs, kol-mono-xxs"
                code="<DashChartCard title subtitle?><Histogram data[] height? barColor? /></DashChartCard>"
              />
              <DashChartCard
                title="Rating Distribution"
                subtitle="Opponent ratings faced across all games"
              >
                <Histogram data={sampleHistogramData} />
              </DashChartCard>

              <DesCard
                name="Candlestick"
                description="OHLC chart showing high, low, open, and close values over time."
                details="Chart: Candlestick • Classes: kol-heading-sm, kol-mono-xs, kol-mono-sm"
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

              <DesCard
                name="Scatter Plot"
                description="XY scatter plot showing relationship between two variables."
                details="Chart: ScatterPlot • Classes: kol-heading-sm, kol-mono-xs, bg-fg-04"
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
            </div>
          )}
        </div>

        {/* List Cards */}
        <div className="space-y-4">
          <SectionToggle
            label="List Cards"
            isExpanded={expandedSections['list-cards']}
            onToggle={() => toggleSection('list-cards')}
          />
          {expandedSections['list-cards'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="DashListCard"
                description="Ranked list card with three variants: meter (progress bars), text (simple rows), ratings (color dot + value/detail)."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Meter variant"
                    description="Horizontal progress bars showing ranked items with percentages."
                    details="Variant: meter • Classes: kol-heading-sm, kol-mono-sm, kol-mono-xs"
                    code="title subtitle? icon? items[{label,value,percent}] variant='meter' barColor? footer? className?"
                  />
                  <DashListCard
                    variant="meter"
                    title="GAME OUTCOMES"
                    subtitle="Top termination types"
                    icon="stat-winner"
                    items={sampleProgressItems}
                    barColor="var(--kol-palette-orange)"
                    footer="Based on 1,055 games"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Text variant"
                    description="Simple ranked list with label and value text."
                    details="Variant: text • Classes: kol-heading-sm, kol-mono-sm, kol-mono-xs"
                    code="title subtitle? icon? badge? items[{label,value}] variant='text' footer? className?"
                  />
                  <DashListCard
                    variant="text"
                    title="RIVALS"
                    subtitle="Most played opponents"
                    icon="dashboard-dual-opponent"
                    badge="#1"
                    items={sampleRivals}
                    footer="Head-to-head game counts"
                  />
                </div>
              </div>

              <DesCard
                name="Ratings variant"
                description="Color-coded items with prominent value and detail text. Ideal for leaderboards."
                details="Variant: ratings • Classes: kol-heading-sm, kol-heading-md, kol-mono-sm, kol-mono-xs"
                code="title subtitle? icon? items[{label,value,detail,color}] variant='ratings' footer? className?"
              />
              <DashListCard
                variant="ratings"
                title="Peak Ratings"
                icon="stat-crown"
                items={samplePeakRatings}
              />
            </div>
          )}
        </div>

        {/* Featured Card */}
        <div className="space-y-4">
          <SectionToggle
            label="Featured Card"
            isExpanded={expandedSections['featured-card']}
            onToggle={() => toggleSection('featured-card')}
          />
          {expandedSections['featured-card'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="DashFeaturedCard"
                description="Large spotlight card with badge, title, description, chart slot, metric display, and legend row."
              />
              <DesCard
                name="DashFeaturedCard"
                description="Hero-style card for featured content with rich metadata."
                details="Classes: kol-heading-sm, kol-heading-md, kol-mono-xs, kol-mono-xxs"
                code="badge? title icon? description? metricLabel? metricValue? chart? legends[]? className?"
              />
              <DashFeaturedCard
                badge="TOP OPENING"
                title="King's Gambit"
                icon="dashboard-book-open"
                description="Your most successful opening with 58% win rate across 234 games."
                metricLabel="Games tracked"
                metricValue="234"
                legends={[
                  { label: 'Win rate', color: 'var(--kol-palette-green)' },
                  { label: 'Usage volume', color: 'var(--kol-palette-orange)' },
                ]}
              />
            </div>
          )}
        </div>

        {/* Alert Card */}
        <div className="space-y-4">
          <SectionToggle
            label="Alert Card"
            isExpanded={expandedSections['alert-card']}
            onToggle={() => toggleSection('alert-card')}
          />
          {expandedSections['alert-card'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="DashAlertCard"
                description="Status card with metric, trend badge, alert notifications, and footer."
              />
              <DesCard
                name="DashAlertCard"
                description="Trend-aware status card with alert items."
                details="Classes: kol-heading-lg, kol-heading-xs, kol-mono-sm, kol-mono-xs"
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
          )}
        </div>

        {/* Slot Card */}
        <div className="space-y-4">
          <SectionToggle
            label="Slot Card"
            isExpanded={expandedSections['slot-card']}
            onToggle={() => toggleSection('slot-card')}
          />
          {expandedSections['slot-card'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="DashSlotCard"
                description="Card with a chart visualization slot, item grid, and footer summary. Pass any chart component via the chart prop."
              />
              <DesCard
                name="DashSlotCard"
                description="Flexible card with chart slot + item list + footer."
                details="Classes: kol-heading-sm, kol-mono-xs, kol-mono-xxs"
                code="title subtitle? icon? chart? items[{label,value}] footer?{label,value} className?"
              />
              <DashSlotCard
                title="TOP OPENINGS"
                subtitle="Ranked by usage"
                icon="dashboard-bookmark"
                chart={<Histogram data={sampleHistogramData.slice(0, 5)} />}
                items={sampleLineChartListItems}
                footer={{ label: 'Catalogued openings', value: '4' }}
              />
            </div>
          )}
        </div>

        {/* Usage */}
        <div className="space-y-4">
          <SectionToggle
            label="Usage"
            isExpanded={expandedSections['usage']}
            onToggle={() => toggleSection('usage')}
          />
          {expandedSections['usage'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="Usage Guidelines"
                description="Design tokens and patterns used across dashboard components."
              />
              <div className="p-6 bg-fg-02 border border-fg-08 rounded">
                <div className="kol-mono-xs text-fg-64 space-y-2">
                  <p><strong className="text-fg-88">Colors:</strong> bg-fg-02, border-fg-08, text-fg-60/64/80/88</p>
                  <p><strong className="text-fg-88">Typography:</strong> kol-heading-sm/md/lg, kol-mono-xxs/xs/sm</p>
                  <p><strong className="text-fg-88">Spacing:</strong> p-6 (24px), gap-4 (16px), rounded (4px)</p>
                  <p><strong className="text-fg-88">Accents:</strong> var(--kol-palette-*) — yellow, purple, blue, green, orange, red, warm</p>
                  <p><strong className="text-fg-88">Shell:</strong> flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded</p>
                  <p><strong className="text-fg-88">Footer:</strong> mt-auto pt-4 border-t border-fg-08</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardComponents
