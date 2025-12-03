import { SectionToggle } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesSection from '../../components/workshop/molecules/DesSection'
import DesCard from '../../components/workshop/molecules/DesCard'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

// Dash* Components
import DashKpiCard from '../../components/workshop/chess/cards/DashKpiCard'
import DashStackedBarMiniCard from '../../components/workshop/chess/cards/DashStackedBarMiniCard'
import DashCompactStackedBarCard from '../../components/workshop/chess/cards/DashCompactStackedBarCard'
import DashSimpleMetricCard from '../../components/workshop/chess/cards/DashSimpleMetricCard'
import DashPeakRatingsCard from '../../components/workshop/chess/cards/DashPeakRatingsCard'
import DashFeaturedAnalysisCard from '../../components/workshop/chess/cards/DashFeaturedAnalysisCard'
import DashAlertStatusCard from '../../components/workshop/chess/cards/DashAlertStatusCard'
import DashHistogramCard from '../../components/workshop/chess/cards/DashHistogramCard'
import DashCandlestickCard from '../../components/workshop/chess/cards/DashCandlestickCard'
import DashScatterPlotCard from '../../components/workshop/chess/cards/DashScatterPlotCard'
import DashProgressMeterCard from '../../components/workshop/chess/cards/DashProgressMeterCard'
import DashRivalsCard from '../../components/workshop/chess/cards/DashRivalsCard'

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

const samplePeakRatings = [
  { name: 'Blitz', rating: 1523, games: '1.2k', color: 'bg-[#F5D245]' },
  { name: 'Bullet', rating: 1489, games: '890', color: 'bg-[#9C64FD]' },
  { name: 'Rapid', rating: 1612, games: '456', color: 'bg-[#5eb3d6]' },
  { name: 'Daily', rating: 1701, games: '234', color: 'bg-[#34D399]' },
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
  { label: 'Checkmate', value: '456', percent: 85 },
  { label: 'Resignation', value: '312', percent: 58 },
  { label: 'Timeout', value: '189', percent: 35 },
  { label: 'Draw', value: '98', percent: 18 },
]

const sampleRivals = [
  { name: 'ChessMaster2000', count: '47 games' },
  { name: 'KnightRider99', count: '34 games' },
  { name: 'QueenGambit', count: '28 games' },
  { name: 'BishopBoss', count: '21 games' },
]

const sampleAlerts = [
  { title: 'Winning streak', description: '5 consecutive wins in blitz' },
  { title: 'Rating milestone', description: 'Reached 1500+ in rapid' },
]

// ============================================================================
// Component
// ============================================================================

const AnalyticsComponents = () => {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('analytics-components', {
    'kpi-cards': false,
    'stacked-bar': false,
    'peak-ratings': false,
    'histogram': false,
    'candlestick': false,
    'scatter-plot': false,
    'list-cards': false,
    'status-cards': false,
    'usage': false,
  })

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Analytics Components"
        subtitle="Dashboard card components for displaying metrics, charts, and data visualizations."
      />

      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="space-y-4">
          <SectionToggle
            label="KPI Cards"
            isExpanded={expandedSections['kpi-cards']}
            onToggle={() => toggleSection('kpi-cards')}
          />
          {expandedSections['kpi-cards'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="KPI Cards"
                description="Key performance indicator cards with accent border, label, value, and delta change indicator."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1">
                  <DashKpiCard label="GAMES PLAYED" value="2,847" delta="+156 this month" borderColor="#F5D245" />
                </div>
                <div className="flex-1">
                  <DashKpiCard label="WIN RATE" value="47.8%" delta="+2.3% vs last month" borderColor="#9C64FD" />
                </div>
                <div className="flex-1">
                  <DashKpiCard label="PEAK RATING" value="1,523" delta="Blitz • Dec 2024" borderColor="#5eb3d6" />
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
                name="Stacked Bar Cards"
                description="Cards with stacked bar visualizations showing win/draw/loss distribution over time."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Stacked Bar Mini Card"
                    description="Compact card with title, value, and stacked bar chart."
                  />
                  <DashStackedBarMiniCard
                    title="WIN RATE"
                    value="47.1%"
                    data={sampleStackedBarData}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Simple Metric Card"
                    description="Minimal metric card without border accent."
                  />
                  <DashSimpleMetricCard
                    label="MONTHS TRACKED"
                    value="106"
                    delta="Complete game history"
                  />
                </div>
              </div>

              <DesCard
                name="Compact Stacked Bar Card"
                description="Larger card with icon, metric display, trend indicator, and stacked bar visualization."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1">
                  <DashCompactStackedBarCard
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
                <div className="flex-1">
                  <DashCompactStackedBarCard
                    title="Rapid"
                    icon="chess-knight"
                    value="48.7%"
                    label="win rate"
                    trend="down"
                    data={sampleStackedBarData.slice(0, 6)}
                    footerLeft="6 months"
                    footerRight="98 games"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Peak Ratings */}
        <div className="space-y-4">
          <SectionToggle
            label="Peak Ratings"
            isExpanded={expandedSections['peak-ratings']}
            onToggle={() => toggleSection('peak-ratings')}
          />
          {expandedSections['peak-ratings'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="Peak Ratings Card"
                description="Displays peak ratings achieved across different time controls with game counts."
              />
              <DashPeakRatingsCard
                title="Peak Ratings"
                icon="stat-crown"
                items={samplePeakRatings}
              />
            </div>
          )}
        </div>

        {/* Histogram */}
        <div className="space-y-4">
          <SectionToggle
            label="Histogram"
            isExpanded={expandedSections['histogram']}
            onToggle={() => toggleSection('histogram')}
          />
          {expandedSections['histogram'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="Histogram Card"
                description="Bar chart showing distribution of values across buckets. Useful for rating distributions."
              />
              <DashHistogramCard
                title="Rating Distribution"
                subtitle="Opponent ratings faced across all games"
                data={sampleHistogramData}
              />
            </div>
          )}
        </div>

        {/* Candlestick */}
        <div className="space-y-4">
          <SectionToggle
            label="Candlestick"
            isExpanded={expandedSections['candlestick']}
            onToggle={() => toggleSection('candlestick')}
          />
          {expandedSections['candlestick'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="Candlestick Card"
                description="Financial-style chart showing high, low, open, and close values over time periods."
              />
              <DashCandlestickCard
                title="RATING RANGE BY MONTH"
                subtitle="Last 12 months high/low/open/close"
                metricLabel="Player Rating"
                badge="↗ +45"
                currentValue="Current: 1,523"
                data={sampleCandlestickData}
                legends={[
                  { label: 'Rating gain', color: '#F5D245' },
                  { label: 'Rating loss', color: '#9C64FD' },
                ]}
                footer="Monthly rating fluctuations"
              />
            </div>
          )}
        </div>

        {/* Scatter Plot */}
        <div className="space-y-4">
          <SectionToggle
            label="Scatter Plot"
            isExpanded={expandedSections['scatter-plot']}
            onToggle={() => toggleSection('scatter-plot')}
          />
          {expandedSections['scatter-plot'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="Scatter Plot Card"
                description="XY scatter plot showing relationship between two variables with labeled axes."
              />
              <DashScatterPlotCard
                title="GAME LENGTH vs RATING"
                subtitle="Correlation between time control and opponent rating"
                icon="stopwatch"
                data={sampleScatterData}
                maxX={120}
                maxY={2000}
                xLabels={[20, 40, 60, 80, 100]}
                yLabels={[500, 1000, 1500, 2000]}
                pointColor="#4cd8e8"
              />
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
                name="List Cards"
                description="Cards displaying ranked lists with progress indicators or simple counts."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Progress Meter Card"
                    description="Horizontal progress bars showing ranked items with percentages."
                  />
                  <DashProgressMeterCard
                    title="GAME OUTCOMES"
                    subtitle="Top termination types"
                    icon="stat-winner"
                    items={sampleProgressItems}
                    barColor="#F5D245"
                    footer="Based on 1,055 games"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Rivals Card"
                    description="Simple ranked list showing opponents or items with counts."
                  />
                  <DashRivalsCard
                    title="RIVALS"
                    subtitle="Most played opponents"
                    icon="dashboard-dual-opponent"
                    badge="#1"
                    items={sampleRivals}
                    footer="Head-to-head game counts"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Cards */}
        <div className="space-y-4">
          <SectionToggle
            label="Status Cards"
            isExpanded={expandedSections['status-cards']}
            onToggle={() => toggleSection('status-cards')}
          />
          {expandedSections['status-cards'] && (
            <div className="space-y-6 pt-2">
              <DesSection
                name="Status Cards"
                description="Cards displaying status information, alerts, and featured analysis content."
              />
              <div className="flex flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Featured Analysis Card"
                    description="Large card with badge, title, description, and chart slot."
                  />
                  <DashFeaturedAnalysisCard
                    badge="TOP OPENING"
                    title="King's Gambit"
                    icon="dashboard-book-open"
                    description="Your most successful opening with 58% win rate across 234 games."
                    metricLabel="Games tracked"
                    metricValue="234"
                    legends={[
                      { label: 'Win rate', color: '#F5D245' },
                      { label: 'Usage volume', color: '#9C64FD' },
                    ]}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <DesCard
                    name="Alert Status Card"
                    description="Status card with trend badge and alert notifications."
                  />
                  <DashAlertStatusCard
                    label="Win Rate"
                    value="52.1%"
                    trend="up"
                    trendValue="+4.3%"
                    alerts={sampleAlerts}
                    footer="Month-over-month comparison"
                  />
                </div>
              </div>
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
                description="Design tokens and patterns used across analytics components."
              />
              <div className="p-6 bg-fg-02 border border-fg-08 rounded">
                <div className="kol-mono-xs text-fg-64 space-y-2">
                  <p><strong className="text-fg-88">Colors:</strong> bg-fg-02, border-fg-08, text-fg-60/64/80/88</p>
                  <p><strong className="text-fg-88">Typography:</strong> kol-heading-sm/md/lg, kol-mono-xxs/xs/sm</p>
                  <p><strong className="text-fg-88">Spacing:</strong> p-6 (24px), gap-2/3/4/6, rounded (4px)</p>
                  <p><strong className="text-fg-88">Accents:</strong> Yellow #F5D245, Purple #9C64FD, Blue #5eb3d6</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsComponents
