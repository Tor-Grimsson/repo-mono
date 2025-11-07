import DesPage from '../../components/styleguide/molecules/DesPage'
import DashboardCard from '../../components/styleguide/chess/dashboards/DashboardCard'
import Graph12AreaChart from '../../components/styleguide/chess/charts/Graph12AreaChart'
import Graph11ColumnChart from '../../components/styleguide/chess/charts/Graph11ColumnChart'
import Graph10StackedArea from '../../components/styleguide/chess/charts/Graph10StackedArea'
import DonutChart from '../../components/styleguide/chess/charts/DonutChart'
import StackedBarChart from '../../components/styleguide/chess/charts/StackedBarChart'
import MetricCard from '../../components/styleguide/chess/cards/MetricCard'
import HorizontalMeterCard from '../../components/styleguide/chess/cards/HorizontalMeterCard'
import {
  getManifest,
  getMonthlySummary
} from '@kol/chess-data'
import '../../components/styleguide/chess/chess.css'

const ChessDocumentation = () => {
  const manifest = getManifest()
  const monthlySummary = getMonthlySummary()

  const areaChartImages = [
    { label: 'Hero overview', file: 'Standard.png' },
    { label: 'Variation 01', file: 'Standard-1.png' },
    { label: 'Variation 02', file: 'Standard-2.png' },
    { label: 'Variation 03', file: 'Standard-3.png' },
    { label: 'Variation 04', file: 'Standard-4.png' },
    { label: 'Variation 05', file: 'Standard-5.png' },
    { label: 'Variation 06', file: 'Standard-6.png' },
    { label: 'Variation 07', file: 'Standard-7.png' },
    { label: 'Variation 08', file: 'Standard-8.png' },
    { label: 'Variation 09', file: 'Standard-9.png' },
    { label: 'Variation 10', file: 'Standard-10.png' },
    { label: 'Grid detail', file: '10.png' }
  ].map((entry) => ({
    ...entry,
    src: new URL(
      `../../../../../packages/ui/assets/chess/raw/Area Chart - Desktop - Dark/${entry.file}`,
      import.meta.url
    ).href
  }))

  return (
    <div className="space-y-12">
      <DesPage
        title="Chess Documentation"
        subtitle="Living handbook for the chess analytics program."
        meta="Chapter One drafted at build kickoff."
      />

      <section className="space-y-6">
        <h3 className="kol-heading-subsection">Dashboard System</h3>
        <p className="kol-body-text text-auto/80 leading-relaxed">
          Dashboards use the <code>.chess-dashboards</code> grid and `DashboardCard`
          wrapper to keep all visuals consistent. Each card respects a 4px radius,
          typographic hierarchy, and monochrome+accent palette.
        </p>
      </section>

      <section className="chess-dashboards">
        <DashboardCard
          title="Overall Ledger"
          subtitle="Template anatomy"
          footer="Use for win/draw/loss breakdowns"
        >
          <p className="kol-body-text text-auto/70 leading-relaxed">
            Primary stats live in a 2×2 grid. Use heading numerals for bold values,
            mono uppercase labels for context. Reserve the footer for corpus-wide
            qualifiers (sample size, time span).
          </p>
        </DashboardCard>

        <DashboardCard
          title="Time Control Blend"
          subtitle="Meter pattern"
          footer="Stacked meters for share of volume"
        >
          <p className="kol-body-text text-auto/70 leading-relaxed">
            <code>.dashboard-meter</code> couples a label, bar, and value column.
            Bars use `var(--kol-accent-primary)` fill over a translucent track.
          </p>
        </DashboardCard>

        <DashboardCard
          title="Opening Index"
          subtitle="Hero chart blueprint"
          footer="Set container to 1000×800px when featured"
          className="dashboard-card--wide"
        >
          <p className="kol-body-text text-auto/70 leading-relaxed">
            Wide hero cards use the gradient chart scaffold. Combine line+area paths
            for win margin, dashed overlays for volume, and a badge to spotlight the
            current highlight.
          </p>
        </DashboardCard>

        <DashboardCard
          title="Rivals"
          subtitle="List pattern"
          footer="Pairs label + count with generous spacing"
        >
          <p className="kol-body-text text-auto/70 leading-relaxed">
            <code>.dashboard-list</code> keeps entries tight while leaving room for
            long opponent handles. Use bolded counts for scanability.
          </p>
        </DashboardCard>

        <DashboardCard
          title="Momentum Sparkline"
          subtitle="Sparkline anatomy"
          footer="SVG path with even spacing across months"
        >
          <p className="kol-body-text text-auto/70 leading-relaxed">
            Sparklines live in a fixed-height SVG. Plot points evenly from 0 → 100 on
            X, map Y to 90→20 to leave vertical breathing room. Pair with a legend of
            monthly deltas below.
          </p>
        </DashboardCard>
      </section>

      <section className="space-y-4">
        <h3 className="kol-heading-subsection">Data Snapshot</h3>
        <p className="kol-body-text text-auto/80 leading-relaxed">
          Current archive totals: <strong>{manifest.totalGames}</strong> games across{' '}
          <strong>{manifest.monthsTracked}</strong> months. Latest entry:{' '}
          <strong>
            {monthlySummary.length
              ? monthlySummary[monthlySummary.length - 1].month
              : '—'}
          </strong>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="kol-heading-subsection">Reference Gallery</h3>
        <p className="kol-body-text text-auto/80 leading-relaxed">
          High-fidelity exports provided in <code>packages/ui/assets/chess/raw/Area Chart - Desktop - Dark</code>.
          Use these as visual benchmarks when iterating on interactive dashboards.
        </p>
        <div className="dashboard-image-grid">
          {areaChartImages.map((image) => (
            <figure key={image.file}>
              <img src={image.src} alt={image.label} loading="lazy" />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Interactive Chart Components */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h3 className="kol-heading-subsection">Interactive Chart Library</h3>
          <p className="kol-body-text text-auto/80 leading-relaxed">
            SVG-based chart components built from Figma designs. Each chart is self-contained
            and can be customized with data props. All charts respect the dark theme palette
            and maintain consistent spacing/typography.
          </p>
        </div>

        <div className="space-y-12">
          {/* Graph 12 - Area Chart */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-auto">Graph 12: Area Chart</h4>
              <p className="kol-body-text text-auto/70 text-sm mt-1">
                Multi-line area chart with gradient fills. Perfect for comparing multiple
                datasets over time with overlapping trends.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 bg-black/20 rounded-lg">
              <Graph12AreaChart />
            </div>
          </div>

          {/* Graph 11 - 3D Column Chart */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-auto">Graph 11: 3D Column Chart</h4>
              <p className="kol-body-text text-auto/70 text-sm mt-1">
                Isometric column chart with depth perception. Labels show percentage values
                above each column with month labels below.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 bg-black/20 rounded-lg">
              <Graph11ColumnChart />
            </div>
          </div>

          {/* Graph 10 - Stacked Area */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-auto">Graph 10: Stacked Area Chart</h4>
              <p className="kol-body-text text-auto/70 text-sm mt-1">
                Seven-layer stacked area visualization. Shows cumulative values with distinct
                color bands for each data series.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 bg-black/20 rounded-lg">
              <Graph10StackedArea />
            </div>
          </div>
        </div>
      </section>

      {/* New Components Section */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h3 className="kol-heading-subsection">New Dashboard Components</h3>
          <p className="kol-body-text text-auto/80 leading-relaxed">
            Extended component library including metric cards, donut charts, stacked bars, and
            horizontal meter cards. All components match the reference design style.
          </p>
        </div>

        <div className="space-y-12">
          {/* Donut Chart */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-auto">Donut Chart</h4>
              <p className="kol-body-text text-auto/70 text-sm mt-1">
                Ring chart with segments and dashed leader lines. Perfect for showing distribution
                percentages with clear labeling.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 bg-black/20 rounded-lg">
              <DonutChart
                title="Time control distribution"
                data={[
                  { label: 'Blitz', value: 35, color: '#5eb3d6' },
                  { label: 'Rapid', value: 25, color: '#9C64FD' },
                  { label: 'Bullet', value: 20, color: '#E16F2F' },
                  { label: 'Daily', value: 15, color: '#0a682a' },
                  { label: 'Other', value: 5, color: '#F5D245' }
                ]}
              />
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-auto">Stacked Bar Chart</h4>
              <p className="kol-body-text text-auto/70 text-sm mt-1">
                Compact vertical bars showing distribution over time. Includes header with icons
                and menu for consistency.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <StackedBarChart title="blits" subtitle="106 months" />
              <StackedBarChart title="rapid" subtitle="106 months" />
            </div>
          </div>

          {/* Metric Cards */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-auto">Metric Cards</h4>
              <p className="kol-body-text text-auto/70 text-sm mt-1">
                Versatile KPI cards with optional borders, icons, deltas, and menus. Available in
                default, bordered, and compact variants.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <MetricCard
                label="GAMES PLAYED"
                value="1,234"
                delta="+69"
                deltaDirection="up"
                borderColor="#F5D245"
                variant="bordered"
              />
              <MetricCard
                icon="⋮⋮"
                label="Total games"
                value="27,200"
                footer="106 months"
                showMenu
              />
              <MetricCard
                label="Win Rate"
                value="47.4%"
                delta="-2.3%"
                deltaDirection="down"
              />
              <MetricCard
                label="Avg Rating"
                value="1,432"
                variant="compact"
              />
            </div>
          </div>

          {/* Horizontal Meter Card */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-auto">Horizontal Meter Card</h4>
              <p className="kol-body-text text-auto/70 text-sm mt-1">
                Progress bar cards ideal for showing distribution or completion metrics. Used in
                "OVERALL LEDGER" style displays.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <HorizontalMeterCard
                title="TIME CONTROLS"
                subtitle="Game distribution"
                items={[
                  { label: 'blitz', value: 15420, max: 25324, color: '#F5D245' },
                  { label: 'rapid', value: 8234, max: 25324, color: '#5eb3d6' },
                  { label: 'bullet', value: 6890, max: 25324, color: '#9C64FD' },
                  { label: 'daily', value: 4120, max: 25324, color: '#E16F2F' }
                ]}
                footer="All time statistics"
              />
              <HorizontalMeterCard
                title="OPENING FREQUENCY"
                subtitle="Top 4 openings"
                items={[
                  { label: 'e4', value: 12000, max: 15000, color: '#0a682a' },
                  { label: 'd4', value: 10500, max: 15000, color: '#F5D245' },
                  { label: 'Nf3', value: 8200, max: 15000, color: '#5eb3d6' },
                  { label: 'c4', value: 5800, max: 15000, color: '#9C64FD' }
                ]}
                footer="Based on opening moves"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChessDocumentation
