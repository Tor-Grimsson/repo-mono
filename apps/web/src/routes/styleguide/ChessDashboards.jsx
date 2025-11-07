import { Link } from 'react-router-dom'
import DesPage from '../../components/styleguide/molecules/DesPage'
import { Icon } from '@kol/ui'
import '../../components/styleguide/chess/chess.css'

const ChessDashboards = () => {
  const dashboards = [
    {
      title: 'Analysis Dashboard',
      path: '/styleguide/chess/dashboards/analysis',
      description: 'Comprehensive performance analysis with game statistics, opening trends, and interactive board replay',
      icon: 'stat-chart-a',
      color: '#F5D245'
    },
    {
      title: 'Performance Dashboard',
      path: '/styleguide/chess/dashboards/performance',
      description: 'Track rating progression, win rates, and performance metrics across time controls and openings',
      icon: 'trending',
      color: '#5eb3d6'
    }
  ]

  return (
    <div className="flex flex-col gap-12">
      <DesPage
        title="Chess Dashboards"
        subtitle="Production-ready dashboard layouts with real data integration"
        meta="Design system • Analytics • Grid layouts"
      />

      {/* Dashboard Selection */}
      <section className="flex flex-col gap-6">
        <h3 className="kol-heading-sm">Available Dashboards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboards.map((dashboard) => (
            <Link
              key={dashboard.path}
              to={dashboard.path}
              className="group flex flex-col gap-4 p-8 bg-fg-02 border border-fg-08 rounded hover:border-fg-16 transition-all"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-lg"
                  style={{ backgroundColor: `${dashboard.color}20` }}
                >
                  <Icon name={dashboard.icon} size={24} color={dashboard.color} />
                </div>
                <span className="kol-mono-xxs text-fg-64 uppercase tracking-wider px-2 py-1 bg-fg-08 rounded">
                  View →
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="kol-heading-sm group-hover:text-accent-primary transition-colors">
                  {dashboard.title}
                </h4>
                <p className="kol-mono-xs text-fg-64 leading-relaxed">
                  {dashboard.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="flex flex-col gap-6">
        <h3 className="kol-heading-sm">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'GAMES PLAYED', value: '1,234', delta: '+69' },
            { label: 'WIN RATE', value: '47.4%', delta: '+2.3%' },
            { label: 'AVG RATING', value: '1,432', delta: '-12' },
            { label: 'ACTIVE OPPONENTS', value: '68', delta: '+5' }
          ].map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px]"
              style={{ borderLeftWidth: '3px', borderLeftColor: '#F5D245' }}
            >
              <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">{card.label}</span>
              <span className="kol-heading-lg">{card.value}</span>
              <span className="kol-mono-sm text-fg-80">{card.delta}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <section className="flex flex-col gap-6">
        <h3 className="kol-heading-sm">Dashboard Layout</h3>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Large Chart */}
          <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[480px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">WIN RATE</span>
                <span className="kol-heading-xl">47.4%</span>
              </div>
              <span className="kol-mono-sm text-fg-64">106 months</span>
            </div>

            {/* Chart Placeholder */}
            <div className="flex-1 flex items-center justify-center border border-fg-04 rounded">
              <span className="kol-mono-sm text-fg-64">Stacked Area Chart</span>
            </div>

            <div className="flex gap-6">
              {['Windows', 'macOS', 'Linux'].map((label, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-fg-32" />
                  <span className="kol-mono-xs text-fg-64">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Stack */}
          <div className="flex flex-col gap-6">
            {[1, 2].map((idx) => (
              <div key={idx} className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[220px]">
                <div className="flex justify-between items-start">
                  <span className="kol-mono-xxs text-fg-64">⋮⋮</span>
                  <button className="kol-mono-sm text-fg-64">⋯</button>
                </div>
                <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">TOTAL GAMES</span>
                <span className="kol-heading-md">blits</span>
                <span className="kol-mono-xs text-fg-64">106 months</span>

                {/* Mini Bar Chart */}
                <div className="flex-1 flex items-end gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-fg-16 rounded-sm"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donut Chart + Bars */}
      <section className="flex flex-col gap-6">
        <h3 className="kol-heading-sm">Distribution Visualization</h3>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Donut Chart */}
          <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[400px]">
            <div className="flex justify-between items-center">
              <span className="kol-mono-sm text-fg-80 uppercase tracking-wider">Operating System</span>
              <div className="flex gap-4 kol-mono-xs text-fg-64">
                {['Windows', 'macOS', 'Other'].map((label, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-fg-32" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Donut Placeholder */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-[32px] border-fg-16 flex items-center justify-center">
                <span className="kol-mono-sm text-fg-64">Donut Chart</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              {['Label', 'Label', 'Label', 'Label', 'Label'].map((label, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-fg-04">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5" />
                    <span className="kol-mono-xs text-fg-80">{label}</span>
                  </div>
                  <span className="kol-mono-xs text-fg-88">35.5K</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Bars */}
          <div className="flex flex-col gap-6">
            {[1, 2].map((idx) => (
              <div key={idx} className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px]">
                <span className="kol-heading-sm">WIN RATE</span>
                <span className="kol-heading-lg">47.4%</span>

                {/* Stacked Bars */}
                <div className="flex-1 flex items-end gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                      <div className="bg-fg-32 rounded-sm" style={{ height: `${Math.random() * 60}%` }} />
                      <div className="bg-fg-24 rounded-sm" style={{ height: `${Math.random() * 40}%` }} />
                      <div className="bg-fg-16 rounded-sm" style={{ height: `${Math.random() * 30}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Grid - RIVALS + Meters */}
      <section className="flex flex-col gap-6">
        <h3 className="kol-heading-sm">Data Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* RIVALS Card */}
          <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px]">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className="kol-heading-sm">RIVALS</span>
                <span className="kol-mono-xs text-fg-60">Section: What is Foundry?</span>
              </div>
              <span className="kol-mono-sm text-fg-80">#1</span>
            </div>

            <div className="flex flex-col gap-3">
              {['cizn', 'grim', 'dock', 'tabla', 'sank'].map((name, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="kol-mono-sm text-fg-80">{name}</span>
                  <span className="kol-mono-sm text-fg-88">38</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-fg-08">
              <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
            </div>
          </div>

          {/* OVERALL LEDGER - Meters */}
          {[1, 2].map((cardIdx) => (
            <div key={cardIdx} className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px]">
              <div className="flex flex-col gap-2">
                <span className="kol-heading-sm">OVERALL LEDGER</span>
                <span className="kol-mono-xs text-fg-60">All recorded games</span>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { label: 'blitz', value: 25324, pct: 100 },
                  { label: 'blitz', value: 25324, pct: 100 },
                  { label: 'blitz', value: 25324, pct: cardIdx === 1 ? 80 : 100 },
                  { label: 'blitz', value: 25324, pct: cardIdx === 1 ? 70 : 100 }
                ].map((meter, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="kol-mono-sm text-fg-80 min-w-[60px]">{meter.label}</span>
                    <div className="flex-1 h-3 bg-fg-08 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${meter.pct}%`, background: '#F5D245' }}
                      />
                    </div>
                    <span className="kol-mono-sm text-fg-88 min-w-[60px] text-right">{meter.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-fg-08">
                <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Large Area Chart with Badge */}
      <section className="flex flex-col gap-6">
        <h3 className="kol-heading-sm">Featured Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Main Chart */}
          <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[480px]">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center px-3 py-1 bg-fg-16 rounded-full kol-mono-xxs text-fg-88 uppercase tracking-wider">
                  HOT STREAK
                </span>
                <span className="kol-mono-sm text-fg-80 mt-2">Kings Gambit +12.6%</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center border border-fg-04 rounded">
              <span className="kol-mono-sm text-fg-64">Large Area Chart</span>
            </div>

            <div className="flex gap-6">
              {[
                { label: 'win margin', color: '#F5D245' },
                { label: 'usage volume', color: '#9C64FD' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="kol-mono-xs text-fg-60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded">
              <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">TOTAL GAMES</span>
              <span className="kol-heading-lg">1,234</span>
              <span className="kol-mono-sm text-fg-80">-20%</span>
            </div>

            <div className="flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded flex-1">
              <div className="flex flex-col gap-2">
                <span className="kol-mono-xs text-fg-80">Down 20% this period ↘</span>
                <span className="kol-mono-xs text-fg-60">Acquisition needs attention</span>
              </div>
              <div className="h-px bg-fg-08 my-2" />
              <div className="flex flex-col gap-2">
                <span className="kol-mono-xs text-fg-80">Down 20% this period ↘</span>
                <span className="kol-mono-xs text-fg-60">Acquisition needs attention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Row - Line Chart + RIVALS + Meters */}
      <section className="flex flex-col gap-6">
        <h3 className="kol-heading-sm">Summary Row</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
            <div className="flex flex-col gap-2">
              <span className="kol-heading-sm">OVERALL LEDGER</span>
              <span className="kol-mono-xs text-fg-60">All recorded games</span>
            </div>

            {/* SVG Line Chart */}
            <svg viewBox="0 0 100 40" className="w-full h-32">
              <path
                d="M 0,35 L 15,28 L 25,22 L 35,25 L 45,18 L 55,20 L 65,15 L 75,12 L 85,10 L 100,8"
                fill="none"
                stroke="#F5D245"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="kol-mono-xs text-fg-80">{i}. All recorded games</span>
                  <span className="kol-mono-xs text-fg-88">675</span>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-4 border-t border-fg-08">
              <div className="flex justify-between items-center">
                <span className="kol-mono-xs text-fg-80">blitz</span>
                <span className="kol-mono-xs text-fg-88">25324</span>
              </div>
            </div>
          </div>

          {/* RIVALS */}
          <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className="kol-heading-sm">RIVALS</span>
                <span className="kol-mono-xs text-fg-60">Section: What is Foundry?</span>
              </div>
              <span className="kol-mono-sm text-fg-80">#1</span>
            </div>

            <div className="flex flex-col gap-3">
              {['cizn', 'grim', 'dock', 'tabla', 'sank'].map((name, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="kol-mono-sm text-fg-80">{name}</span>
                  <span className="kol-mono-sm text-fg-88">38</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-fg-08">
              <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
            </div>
          </div>

          {/* Meters */}
          <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
            <div className="flex flex-col gap-2">
              <span className="kol-heading-sm">OVERALL LEDGER</span>
              <span className="kol-mono-xs text-fg-60">All recorded games</span>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: 'blitz', value: 25324, pct: 100 },
                { label: 'blitz', value: 23000, pct: 90 },
                { label: 'blitz', value: 20000, pct: 80 }
              ].map((meter, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="kol-mono-sm text-fg-80 min-w-[60px]">{meter.label}</span>
                  <div className="flex-1 h-3 bg-fg-08 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${meter.pct}%`, background: '#F5D245' }}
                    />
                  </div>
                  <span className="kol-mono-sm text-fg-88 min-w-[60px] text-right">{meter.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-fg-08">
              <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChessDashboards
