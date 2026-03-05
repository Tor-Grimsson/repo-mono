import { useState, useEffect, useCallback } from 'react'
import {
  DashMetricCard,
  DashStackedBarCard,
  DashChartCard,
  DashListCard,
  DashFeaturedCard,
  DashAlertCard,
  DashSlotCard,
  Histogram
} from '@kol/ui/dashboards'

// =============================================================================
// Tabs
// =============================================================================

const TABS = [
  { id: 'site', label: 'Site' },
  { id: 'project', label: 'Project' },
  { id: 'infra', label: 'Infrastructure' },
  { id: 'sessions', label: 'Sessions' },
]

// =============================================================================
// Fallback data
// =============================================================================

const SITE_FALLBACK = {
  visitors: { today: '—', delta: 'loading...' },
  pageviews: { today: '—', delta: '' },
  session: { avg: '—', delta: '' },
  bounce: { rate: '—', delta: '' },
  dailyVisits: [],
  totalVisitsMonth: '—',
  topPages: [],
  topCountries: [],
  blogPosts: [],
  referrers: [],
  b2: null,
  weeklyTraffic: { delta: '—', diff: '' },
  devices: [],
  totalSessions: '0',
}

const PROJECT_FALLBACK = {
  components: '—', routes: '—', linesOfCode: '—', commits: '—',
  packages: '—', cssFiles: '—', atoms: '—', molecules: '—',
  sessionLogs: '—', docsFiles: '—', icons: '—', fonts: '—',
}

const durationBuckets = [
  { range: '0-10s', count: 0, percentage: 0 },
  { range: '10-30s', count: 0, percentage: 0 },
  { range: '30-60s', count: 0, percentage: 0 },
  { range: '1-2m', count: 0, percentage: 0 },
  { range: '2-5m', count: 0, percentage: 0 },
  { range: '5m+', count: 0, percentage: 0 },
]

const b2DailyBandwidth = [
  { win: 120, draw: 45, loss: 10, total: 175 },
  { win: 135, draw: 50, loss: 12, total: 197 },
  { win: 110, draw: 40, loss: 8, total: 158 },
  { win: 145, draw: 55, loss: 15, total: 215 },
  { win: 130, draw: 48, loss: 11, total: 189 },
  { win: 155, draw: 60, loss: 9, total: 224 },
  { win: 140, draw: 52, loss: 13, total: 205 },
  { win: 125, draw: 46, loss: 10, total: 181 },
  { win: 150, draw: 58, loss: 14, total: 222 },
  { win: 160, draw: 62, loss: 8, total: 230 },
  { win: 145, draw: 54, loss: 11, total: 210 },
  { win: 170, draw: 65, loss: 7, total: 242 },
]

// Header + tabs height (approx 72px)
const GRID_HEIGHT = 'calc(100vh - 72px)'

// =============================================================================
// Site tab — 5 rows, 4 cols, fits viewport
// =============================================================================

const SiteTab = ({ data }) => {
  const { visitors, pageviews, session, bounce, dailyVisits, totalVisitsMonth, topPages, topCountries, blogPosts, referrers, weeklyTraffic, devices, totalSessions } = data
  const maxDaily = dailyVisits.length > 0 ? Math.max(...dailyVisits.map(d => d.total)) : 1

  return (
    <div
      className="grid gap-3 w-full"
      style={{
        height: GRID_HEIGHT,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto 1fr 1fr 1fr 1fr',
      }}
    >
      {/* Row 1 — 4 metric cards */}
      <DashMetricCard label="Visitors today" value={visitors.today} delta={visitors.delta} borderColor="var(--kol-palette-blue)" />
      <DashMetricCard label="Pageviews" value={pageviews.today} delta={pageviews.delta} borderColor="var(--kol-palette-green)" />
      <DashMetricCard label="Avg session" value={session.avg} delta={session.delta} borderColor="var(--kol-palette-purple)" />
      <DashMetricCard label="Bounce rate" value={bounce.rate} delta={bounce.delta} borderColor="var(--kol-palette-orange)" />

      {/* Row 2 — Traffic (3 cols) + Duration (1 col) */}
      <div className="col-span-3 min-h-0">
        <DashFeaturedCard
          className="h-full"
          badge="Last 30 days"
          title="Site Traffic"
          icon="trending"
          description="New visitors, returning visitors, and bounces."
          metricLabel="Total visits"
          metricValue={totalVisitsMonth}
          chart={
            <div className="flex items-end gap-0.5 h-full min-h-0">
              {dailyVisits.map((d, i) => {
                const newPct = d.total > 0 ? (d.win / d.total) * 100 : 0
                const retPct = d.total > 0 ? (d.draw / d.total) * 100 : 0
                const bncPct = d.total > 0 ? (d.loss / d.total) * 100 : 0
                return (
                  <div key={i} className="flex-1 flex flex-col gap-0.5" style={{ height: `${(d.total / maxDaily) * 100}%`, minHeight: 2 }}>
                    <div className="rounded-sm flex-1" style={{ flex: `${newPct} 0 0`, background: 'var(--kol-palette-green)' }} />
                    <div className="rounded-sm" style={{ flex: `${retPct} 0 0`, background: 'var(--kol-palette-blue)' }} />
                    <div className="rounded-sm" style={{ flex: `${bncPct} 0 0`, background: 'var(--kol-palette-red)' }} />
                  </div>
                )
              })}
            </div>
          }
          legends={[
            { label: 'New', detail: dailyVisits.reduce((s, d) => s + d.win, 0).toLocaleString(), className: 'chart-color-green' },
            { label: 'Returning', detail: dailyVisits.reduce((s, d) => s + d.draw, 0).toLocaleString(), className: 'chart-color-blue' },
            { label: 'Bounced', detail: dailyVisits.reduce((s, d) => s + d.loss, 0).toLocaleString(), className: 'chart-color-red' },
          ]}
        />
      </div>
      <div className="min-h-0">
        <DashChartCard className="h-full" title="Visit duration" subtitle="By length">
          <Histogram data={durationBuckets} barColor="var(--kol-palette-teal)" />
        </DashChartCard>
      </div>

      {/* Row 3 — Pages + Countries */}
      <div className="col-span-2 min-h-0">
        <DashListCard className="h-full" variant="meter" title="Top pages" subtitle="By pageviews" icon="dashboard-bookmark" items={topPages.length > 0 ? topPages : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]} footer="Last 30 days" />
      </div>
      <div className="col-span-2 min-h-0">
        <DashListCard className="h-full" variant="ratings" title="Top countries" subtitle="By visitors" icon="dashboard-roadmap" items={topCountries.length > 0 ? topCountries : [{ label: 'No data yet', value: '—', detail: '', color: 'var(--kol-palette-blue)' }]} footer="Geo from headers" />
      </div>

      {/* Row 4 — Blog + Referrers */}
      <div className="col-span-2 min-h-0">
        <DashListCard className="h-full" variant="text" title="Blog posts" subtitle="Most read" icon="dashboard-book-open" items={blogPosts.length > 0 ? blogPosts : [{ label: 'No data yet', value: '—' }]} footer="/blog/* paths" />
      </div>
      <div className="col-span-2 min-h-0">
        <DashListCard className="h-full" variant="meter" title="Referrers" subtitle="Traffic sources" icon="stat-chart-a" items={referrers.length > 0 ? referrers : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]} footer="Excl. direct" />
      </div>

      {/* Row 5 — Weekly + Devices */}
      <div className="col-span-2 min-h-0">
        <DashAlertCard className="h-full" label="Weekly traffic" value={weeklyTraffic.delta} trend={weeklyTraffic.delta.startsWith('-') ? 'down' : 'up'} trendValue={weeklyTraffic.diff} alerts={[]} footer="This week vs previous" />
      </div>
      <div className="col-span-2 min-h-0">
        <DashSlotCard className="h-full" title="Devices" subtitle="Breakdown" icon="stopwatch" chart={<Histogram data={devices.length > 0 ? devices : [{ range: '—', count: 0, percentage: 0 }]} barColor="var(--kol-palette-purple)" />} items={devices.map(d => ({ label: d.range, value: `${d.percentage}%` }))} footer={{ label: 'Sessions', value: totalSessions }} />
      </div>
    </div>
  )
}

// =============================================================================
// Project tab — 3 rows of 4, fits viewport
// =============================================================================

const ProjectTab = ({ data }) => {
  const cards = [
    { label: 'Components', value: data.components, delta: 'packages/ui', color: 'var(--kol-palette-blue)' },
    { label: 'Routes', value: data.routes, delta: 'app pages', color: 'var(--kol-palette-green)' },
    { label: 'Lines of code', value: data.linesOfCode, delta: 'jsx + js + css', color: 'var(--kol-palette-purple)' },
    { label: 'Commits', value: data.commits, delta: 'git history', color: 'var(--kol-palette-orange)' },
    { label: 'Packages', value: data.packages, delta: 'workspaces', color: 'var(--kol-palette-teal)' },
    { label: 'CSS files', value: data.cssFiles, delta: 'stylesheets', color: 'var(--kol-palette-red)' },
    { label: 'Atoms', value: data.atoms, delta: '@kol/ui', color: 'var(--kol-palette-blue)' },
    { label: 'Molecules', value: data.molecules, delta: '@kol/ui', color: 'var(--kol-palette-green)' },
    { label: 'Session logs', value: data.sessionLogs, delta: 'LLM sessions', color: 'var(--kol-palette-purple)' },
    { label: 'Docs files', value: data.docsFiles, delta: 'documentation', color: 'var(--kol-palette-orange)' },
    { label: 'Icons', value: data.icons, delta: 'SVG assets', color: 'var(--kol-palette-teal)' },
    { label: 'Fonts', value: data.fonts, delta: 'typeface files', color: 'var(--kol-palette-red)' },
  ]

  return (
    <div
      className="grid gap-3 w-full"
      style={{
        height: GRID_HEIGHT,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
      }}
    >
      {cards.map(c => (
        <DashMetricCard key={c.label} className="h-full" label={c.label} value={c.value} delta={c.delta} borderColor={c.color} />
      ))}
    </div>
  )
}

// =============================================================================
// Infrastructure tab — 2 rows, fits viewport
// =============================================================================

const InfraTab = () => {
  return (
    <div
      className="grid gap-3 w-full"
      style={{
        height: GRID_HEIGHT,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '1fr 1fr',
      }}
    >
      <DashMetricCard className="h-full" label="B2 storage" value="4.2 GB" delta="1,847 objects" borderColor="var(--kol-palette-blue)" />
      <DashMetricCard className="h-full" label="B2 bandwidth" value="12.8 GB" delta="Last 30 days" borderColor="var(--kol-palette-orange)" />
      <div className="col-span-2 min-h-0">
        <DashStackedBarCard className="h-full" title="CDN bandwidth" icon="stat-chart-c" value="242 MB" label="peak day" trend="up" data={b2DailyBandwidth} footerLeft="12 days" footerRight="Backblaze B2" />
      </div>
      <DashMetricCard className="h-full" label="Vercel" value="Active" delta="hosting" borderColor="var(--kol-palette-green)" />
      <DashMetricCard className="h-full" label="Cloudflare" value="Active" delta="DNS" borderColor="var(--kol-palette-purple)" />
      <DashMetricCard className="h-full" label="Umami" value="Active" delta="analytics" borderColor="var(--kol-palette-teal)" />
      <DashMetricCard className="h-full" label="Neon" value="Active" delta="PostgreSQL" borderColor="var(--kol-palette-red)" />
    </div>
  )
}

// =============================================================================
// Sessions tab — 1 row, fits viewport
// =============================================================================

const SessionsTab = ({ data }) => {
  return (
    <div
      className="grid gap-3 w-full"
      style={{
        height: GRID_HEIGHT,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '1fr',
      }}
    >
      <DashMetricCard className="h-full" label="Session logs" value={data.sessionLogs} delta="total logged" borderColor="var(--kol-palette-blue)" />
      <DashMetricCard className="h-full" label="Docs files" value={data.docsFiles} delta="documentation" borderColor="var(--kol-palette-green)" />
      <DashMetricCard className="h-full" label="Commits" value={data.commits} delta="git history" borderColor="var(--kol-palette-purple)" />
      <DashMetricCard className="h-full" label="Components" value={data.components} delta="total built" borderColor="var(--kol-palette-orange)" />
    </div>
  )
}

// =============================================================================
// Main
// =============================================================================

const Metrics = () => {
  const [tab, setTab] = useState('site')
  const [siteData, setSiteData] = useState(SITE_FALLBACK)
  const [projectData, setProjectData] = useState(PROJECT_FALLBACK)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/metrics')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(setSiteData)
      .catch(e => setError(e.message))

    fetch('/api/metrics-repo')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(setProjectData)
      .catch(() => {})
  }, [])

  return (
    <div className="h-screen bg-surface-primary text-fg-88 p-3 flex flex-col overflow-hidden">
      {/* Header + tabs */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <div className="flex items-baseline gap-3">
          <h1 className="dash-label text-fg-88">kolkrabbi.io / metrics</h1>
          <span className="dash-detail text-fg-48">
            {error ? `error: ${error}` : 'live'}
          </span>
        </div>
        <div className="flex gap-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                tab === t.id
                  ? 'bg-surface-secondary text-fg-88'
                  : 'text-fg-48 hover:text-fg-64'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content — fills remaining space */}
      <div className="flex-1 min-h-0">
        {tab === 'site' && <SiteTab data={siteData} />}
        {tab === 'project' && <ProjectTab data={projectData} />}
        {tab === 'infra' && <InfraTab />}
        {tab === 'sessions' && <SessionsTab data={projectData} />}
      </div>
    </div>
  )
}

export default Metrics
