import { useState, useEffect, useCallback } from 'react'
import {
  DashboardGrid,
  GridCard,
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
  components: '—',
  routes: '—',
  linesOfCode: '—',
  commits: '—',
  packages: '—',
  cssFiles: '—',
  atoms: '—',
  molecules: '—',
  sessionLogs: '—',
  docsFiles: '—',
  icons: '—',
  fonts: '—',
}

// Placeholder data
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

// =============================================================================
// Expandable card wrapper
// =============================================================================

const ExpandCard = ({ expanded, onToggle, span, children }) => {
  const expandedClass = expanded ? 'col-span-full row-span-2' : ''
  return (
    <GridCard span={expanded ? undefined : span} className={expandedClass}>
      <div className="relative h-full group/expand">
        <button
          onClick={onToggle}
          className="absolute top-2 right-2 z-10 opacity-0 group-hover/expand:opacity-100 transition-opacity bg-surface-secondary text-fg-64 hover:text-fg-88 rounded px-1.5 py-0.5 text-xs"
        >
          {expanded ? '↙' : '↗'}
        </button>
        {children}
      </div>
    </GridCard>
  )
}

// =============================================================================
// Site tab
// =============================================================================

const SiteTab = ({ data, expandedCard, toggleExpand }) => {
  const { visitors, pageviews, session, bounce, dailyVisits, totalVisitsMonth, topPages, topCountries, blogPosts, referrers, weeklyTraffic, devices, totalSessions } = data
  const maxDaily = dailyVisits.length > 0 ? Math.max(...dailyVisits.map(d => d.total)) : 1

  return (
    <DashboardGrid layout="4-col">
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Visitors today" value={visitors.today} delta={visitors.delta} borderColor="var(--kol-palette-blue)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Pageviews" value={pageviews.today} delta={pageviews.delta} borderColor="var(--kol-palette-green)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Avg session" value={session.avg} delta={session.delta} borderColor="var(--kol-palette-purple)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Bounce rate" value={bounce.rate} delta={bounce.delta} borderColor="var(--kol-palette-orange)" />
      </GridCard>

      <ExpandCard span="3x2" expanded={expandedCard === 'traffic'} onToggle={() => toggleExpand('traffic')}>
        <DashFeaturedCard
          className="h-full"
          badge="Last 30 days"
          title="Site Traffic"
          icon="trending"
          description="New visitors, returning visitors, and bounces across kolkrabbi.io."
          metricLabel="Total visits"
          metricValue={totalVisitsMonth}
          chart={
            <div className="flex items-end gap-1 h-full min-h-[120px]">
              {dailyVisits.map((d, i) => {
                const newPct = d.total > 0 ? (d.win / d.total) * 100 : 0
                const retPct = d.total > 0 ? (d.draw / d.total) * 100 : 0
                const bncPct = d.total > 0 ? (d.loss / d.total) * 100 : 0
                return (
                  <div key={i} className="flex-1 flex flex-col gap-0.5" style={{ height: `${(d.total / maxDaily) * 100}%`, minHeight: 4 }}>
                    <div className="rounded-sm flex-1" style={{ flex: `${newPct} 0 0`, background: 'var(--kol-palette-green)' }} />
                    <div className="rounded-sm" style={{ flex: `${retPct} 0 0`, background: 'var(--kol-palette-blue)' }} />
                    <div className="rounded-sm" style={{ flex: `${bncPct} 0 0`, background: 'var(--kol-palette-red)' }} />
                  </div>
                )
              })}
            </div>
          }
          legends={[
            { label: 'New visitors', detail: dailyVisits.reduce((s, d) => s + d.win, 0).toLocaleString(), className: 'chart-color-green' },
            { label: 'Returning', detail: dailyVisits.reduce((s, d) => s + d.draw, 0).toLocaleString(), className: 'chart-color-blue' },
            { label: 'Bounced', detail: dailyVisits.reduce((s, d) => s + d.loss, 0).toLocaleString(), className: 'chart-color-red' },
          ]}
        />
      </ExpandCard>
      <GridCard span="1x2">
        <DashChartCard className="h-full" title="Visit duration" subtitle="Distribution by length">
          <Histogram data={durationBuckets} barColor="var(--kol-palette-teal)" />
        </DashChartCard>
      </GridCard>

      <ExpandCard span="2x2" expanded={expandedCard === 'pages'} onToggle={() => toggleExpand('pages')}>
        <DashListCard className="h-full" variant="meter" title="Top pages" subtitle="By pageviews" icon="dashboard-bookmark" items={topPages.length > 0 ? topPages : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]} footer="Last 30 days" />
      </ExpandCard>
      <ExpandCard span="2x2" expanded={expandedCard === 'countries'} onToggle={() => toggleExpand('countries')}>
        <DashListCard className="h-full" variant="ratings" title="Top countries" subtitle="By unique visitors" icon="dashboard-roadmap" items={topCountries.length > 0 ? topCountries : [{ label: 'No data yet', value: '—', detail: '', color: 'var(--kol-palette-blue)' }]} footer="Geo from request headers" />
      </ExpandCard>

      <ExpandCard span="2x2" expanded={expandedCard === 'blog'} onToggle={() => toggleExpand('blog')}>
        <DashListCard className="h-full" variant="text" title="Blog posts" subtitle="Most read articles" icon="dashboard-book-open" items={blogPosts.length > 0 ? blogPosts : [{ label: 'No data yet', value: '—' }]} footer="Filtered to /blog/* paths" />
      </ExpandCard>
      <ExpandCard span="2x2" expanded={expandedCard === 'referrers'} onToggle={() => toggleExpand('referrers')}>
        <DashListCard className="h-full" variant="meter" title="Referrers" subtitle="Traffic sources" icon="stat-chart-a" items={referrers.length > 0 ? referrers : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]} footer="Excludes direct / unknown" />
      </ExpandCard>

      <GridCard span="2x2">
        <DashAlertCard className="h-full" label="Weekly traffic" value={weeklyTraffic.delta} trend={weeklyTraffic.delta.startsWith('-') ? 'down' : 'up'} trendValue={weeklyTraffic.diff} alerts={[]} footer="Comparing this week vs previous" />
      </GridCard>
      <GridCard span="2x2">
        <DashSlotCard className="h-full" title="Devices" subtitle="Visitor breakdown" icon="stopwatch" chart={<Histogram data={devices.length > 0 ? devices : [{ range: '—', count: 0, percentage: 0 }]} barColor="var(--kol-palette-purple)" />} items={devices.map(d => ({ label: d.range, value: `${d.percentage}%` }))} footer={{ label: 'Total sessions', value: totalSessions }} />
      </GridCard>
    </DashboardGrid>
  )
}

// =============================================================================
// Project tab
// =============================================================================

const ProjectTab = ({ data }) => {
  return (
    <DashboardGrid layout="4-col">
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Components" value={data.components} delta="atoms + molecules" borderColor="var(--kol-palette-blue)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Routes" value={data.routes} delta="app pages" borderColor="var(--kol-palette-green)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Lines of code" value={data.linesOfCode} delta="across monorepo" borderColor="var(--kol-palette-purple)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Commits" value={data.commits} delta="git history" borderColor="var(--kol-palette-orange)" />
      </GridCard>

      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Packages" value={data.packages} delta="workspace packages" borderColor="var(--kol-palette-teal)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="CSS files" value={data.cssFiles} delta="stylesheets" borderColor="var(--kol-palette-red)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Atoms" value={data.atoms} delta="@kol/ui atoms" borderColor="var(--kol-palette-blue)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Molecules" value={data.molecules} delta="@kol/ui molecules" borderColor="var(--kol-palette-green)" />
      </GridCard>

      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Session logs" value={data.sessionLogs} delta="LLM sessions" borderColor="var(--kol-palette-purple)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Docs files" value={data.docsFiles} delta="documentation" borderColor="var(--kol-palette-orange)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Icons" value={data.icons} delta="SVG icon set" borderColor="var(--kol-palette-teal)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Fonts" value={data.fonts} delta="typeface files" borderColor="var(--kol-palette-red)" />
      </GridCard>
    </DashboardGrid>
  )
}

// =============================================================================
// Infrastructure tab
// =============================================================================

const InfraTab = () => {
  return (
    <DashboardGrid layout="4-col">
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="B2 storage" value="4.2 GB" delta="1,847 objects" borderColor="var(--kol-palette-blue)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="B2 bandwidth" value="12.8 GB" delta="Last 30 days" borderColor="var(--kol-palette-orange)" />
      </GridCard>
      <GridCard span="2x1">
        <DashStackedBarCard className="h-full" title="CDN bandwidth" icon="stat-chart-c" value="242 MB" label="peak day" trend="up" data={b2DailyBandwidth} footerLeft="12 days" footerRight="Backblaze B2" />
      </GridCard>

      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Vercel" value="Active" delta="hosting" borderColor="var(--kol-palette-green)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Cloudflare" value="Active" delta="DNS" borderColor="var(--kol-palette-purple)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Umami" value="Active" delta="analytics" borderColor="var(--kol-palette-teal)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Neon" value="Active" delta="PostgreSQL" borderColor="var(--kol-palette-red)" />
      </GridCard>
    </DashboardGrid>
  )
}

// =============================================================================
// Sessions tab
// =============================================================================

const SessionsTab = ({ data }) => {
  return (
    <DashboardGrid layout="4-col">
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Session logs" value={data.sessionLogs} delta="total logged" borderColor="var(--kol-palette-blue)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Docs files" value={data.docsFiles} delta="documentation" borderColor="var(--kol-palette-green)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Commits" value={data.commits} delta="git history" borderColor="var(--kol-palette-purple)" />
      </GridCard>
      <GridCard span="1x1">
        <DashMetricCard className="h-full" label="Components" value={data.components} delta="total built" borderColor="var(--kol-palette-orange)" />
      </GridCard>
    </DashboardGrid>
  )
}

// =============================================================================
// Main component
// =============================================================================

const Metrics = () => {
  const [tab, setTab] = useState('site')
  const [siteData, setSiteData] = useState(SITE_FALLBACK)
  const [projectData, setProjectData] = useState(PROJECT_FALLBACK)
  const [error, setError] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleExpand = useCallback((id) => {
    setExpandedCard(prev => prev === id ? null : id)
  }, [])

  useEffect(() => {
    fetch('/api/metrics')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(setSiteData)
      .catch(e => setError(e.message))

    fetch('/api/metrics-repo')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(setProjectData)
      .catch(() => {}) // repo endpoint may not exist yet
  }, [])

  return (
    <div className="min-h-screen bg-surface-primary text-fg-88 p-4 lg:p-6 xl:p-8">
      <div className="w-full space-y-4">
        {/* Header */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <div className="space-y-1">
            <h1 className="dash-title">kolkrabbi.io / metrics</h1>
            <p className="dash-detail text-fg-64">
              {error ? `API error: ${error}` : 'Live data. Updated every 5 minutes.'}
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-fg-08 pb-px">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setExpandedCard(null) }}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-t ${
                tab === t.id
                  ? 'bg-surface-secondary text-fg-88 border-b-2 border-accent-primary'
                  : 'text-fg-48 hover:text-fg-64 hover:bg-surface-secondary/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'site' && <SiteTab data={siteData} expandedCard={expandedCard} toggleExpand={toggleExpand} />}
        {tab === 'project' && <ProjectTab data={projectData} />}
        {tab === 'infra' && <InfraTab />}
        {tab === 'sessions' && <SessionsTab data={projectData} />}
      </div>
    </div>
  )
}

export default Metrics
