import { useState, useEffect, useCallback } from 'react'
import {
  DashMetricCard,

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

const B2_FALLBACK = {
  totalBytes: 0,
  totalFiles: 0,
  totalFormatted: '—',
  bucketCount: 0,
  buckets: [], // each: { name, id, type, bytes, files, bytesFormatted, tree: [], recentFiles: [] }
}

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

const SANITY_FALLBACK = {
  totalDocuments: 0,
  types: { blog: 0, project: 0, page: 0, category: 0, author: 0, tag: 0 },
  recentEdits: [],
}

const durationBuckets = [
  { range: '0-10s', count: 0, percentage: 0 },
  { range: '10-30s', count: 0, percentage: 0 },
  { range: '30-60s', count: 0, percentage: 0 },
  { range: '1-2m', count: 0, percentage: 0 },
  { range: '2-5m', count: 0, percentage: 0 },
  { range: '5m+', count: 0, percentage: 0 },
]

function formatB2Size(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

const TYPE_COLORS = {
  blog: 'var(--kol-palette-green)',
  project: 'var(--kol-palette-blue)',
  page: 'var(--kol-palette-purple)',
  category: 'var(--kol-palette-orange)',
  author: 'var(--kol-palette-teal)',
  tag: 'var(--kol-palette-red)',
}

// Header + tabs + timeline + deploy bar height
const GRID_HEIGHT = 'calc(100vh - 128px)'

// =============================================================================
// Deploy status bar
// =============================================================================

const DEPLOY_STATE_COLORS = {
  READY: 'var(--kol-palette-green)',
  ERROR: 'var(--kol-palette-red)',
  BUILDING: 'var(--kol-palette-orange)',
  QUEUED: 'var(--kol-palette-purple)',
  CANCELED: 'var(--kol-palette-red)',
}

const DEPLOY_STATE_LABELS = {
  READY: 'Live',
  ERROR: 'Failed',
  BUILDING: 'Building...',
  QUEUED: 'Queued',
  CANCELED: 'Canceled',
}

function timeAgo(ts) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

const DeployBar = ({ deploys }) => {
  if (!deploys || deploys.length === 0) return null

  const latest = deploys[0]
  const color = DEPLOY_STATE_COLORS[latest.state] || 'var(--kol-palette-blue)'
  const label = DEPLOY_STATE_LABELS[latest.state] || latest.state

  return (
    <div className="flex items-center gap-3 py-1 border-b border-fg-08 text-xs">
      {/* Latest deploy */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
        <span className="font-medium" style={{ color }}>{label}</span>
        <span className="text-fg-48">{timeAgo(latest.created)}</span>
        {latest.duration && <span className="text-fg-32">{latest.duration}s build</span>}
      </div>

      <span className="text-fg-24">|</span>

      {/* Commit message */}
      <span className="text-fg-48 truncate">{latest.source}</span>

      <span className="text-fg-24">|</span>

      {/* Recent deploy states */}
      <div className="flex items-center gap-1 shrink-0">
        {deploys.slice(0, 8).map((d, i) => (
          <span
            key={d.id || i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: DEPLOY_STATE_COLORS[d.state] || 'var(--kol-palette-blue)' }}
            title={`${d.source} — ${d.state} ${timeAgo(d.created)}`}
          />
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// Time ranges
// =============================================================================

const RANGES = [
  { id: 'today', label: 'Today', ms: 86400000 },
  { id: '7d', label: '7d', ms: 7 * 86400000 },
  { id: '30d', label: '30d', ms: 30 * 86400000 },
  { id: '90d', label: '90d', ms: 90 * 86400000 },
  { id: 'year', label: '1y', ms: 365 * 86400000 },
]

// =============================================================================
// Project milestones (static — could come from API later)
// =============================================================================

const MILESTONES = [
  { date: '2026-03-05', type: 'ship', text: 'Metrics dashboard live with Umami' },
  { date: '2026-03-05', type: 'ship', text: 'GSAP prints hero + workshop expand-all' },
  { date: '2026-03-04', type: 'ship', text: 'CodeBlock consolidation to @kol/ui' },
  { date: '2026-03-03', type: 'ship', text: 'GLIF image gen + screen recording skills' },
  { date: '2026-03-01', type: 'ship', text: 'Table consolidation + @apply removal' },
  { date: '2026-02-28', type: 'ship', text: 'ShellLayout extracted to @kol/ui' },
  { date: '2026-02-18', type: 'ship', text: '24-print CDN migration' },
  { date: '2025-11-15', type: 'launch', text: 'kolkrabbi.io launched on Vercel' },
  { date: '2025-11-07', type: 'ship', text: 'Chess analytics — 19 cards, 27k games' },
  { date: '2025-10-16', type: 'ship', text: 'Color system refactor — 69 tokens' },
]

const MILESTONE_COLORS = {
  ship: 'var(--kol-palette-green)',
  launch: 'var(--kol-palette-blue)',
  warn: 'var(--kol-palette-orange)',
  fail: 'var(--kol-palette-red)',
}

// =============================================================================
// Timeline bar
// =============================================================================

const TimelineBar = ({ range, onRangeChange }) => {
  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-fg-08">
      {/* Range selector */}
      <div className="flex gap-0.5 shrink-0">
        {RANGES.map(r => (
          <button
            key={r.id}
            onClick={() => onRangeChange(r.id)}
            className={`px-2 py-0.5 text-xs rounded transition-colors ${
              range === r.id
                ? 'bg-accent-primary text-surface-primary font-medium'
                : 'text-fg-48 hover:text-fg-64'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Milestone ticker */}
      <div className="flex-1 overflow-hidden">
        <div className="flex gap-4 text-xs text-fg-48 overflow-x-auto scrollbar-none">
          {MILESTONES.slice(0, 6).map((m, i) => (
            <span key={i} className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: MILESTONE_COLORS[m.type] }} />
              <span className="text-fg-32">{m.date.slice(5)}</span>
              <span>{m.text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

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

const ProjectTab = ({ data, sanity }) => {
  const t = sanity.types

  return (
    <div
      className="grid gap-3 w-full"
      style={{
        height: GRID_HEIGHT,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
      }}
    >
      {/* Row 1 — Repo stats */}
      <DashMetricCard label="Components" value={data.components} delta="packages/ui" borderColor="var(--kol-palette-blue)" />
      <DashMetricCard label="Routes" value={data.routes} delta="app pages" borderColor="var(--kol-palette-green)" />
      <DashMetricCard label="Lines of code" value={data.linesOfCode} delta="jsx + js + css" borderColor="var(--kol-palette-purple)" />
      <DashMetricCard label="Commits" value={data.commits} delta="git history" borderColor="var(--kol-palette-orange)" />

      {/* Row 2 — More repo stats */}
      <DashMetricCard label="Atoms" value={data.atoms} delta="@kol/ui" borderColor="var(--kol-palette-blue)" />
      <DashMetricCard label="Molecules" value={data.molecules} delta="@kol/ui" borderColor="var(--kol-palette-green)" />
      <DashMetricCard label="Session logs" value={data.sessionLogs} delta="LLM sessions" borderColor="var(--kol-palette-purple)" />
      <DashMetricCard label="Docs files" value={data.docsFiles} delta="documentation" borderColor="var(--kol-palette-orange)" />

      {/* Row 3 — Sanity CMS stats */}
      <DashMetricCard label="CMS documents" value={String(sanity.totalDocuments)} delta="Sanity dataset" borderColor="var(--kol-palette-teal)" />
      <DashMetricCard label="Blog posts" value={String(t.blog)} delta="published" borderColor="var(--kol-palette-blue)" />
      <DashMetricCard label="Projects" value={String(t.project)} delta="portfolio" borderColor="var(--kol-palette-green)" />
      <DashMetricCard label="Categories + Tags" value={String(t.category + t.tag)} delta="taxonomy" borderColor="var(--kol-palette-orange)" />

      {/* Row 4 — Recent CMS edits + extra stats */}
      <div className="col-span-2 min-h-0 overflow-hidden">
        <div className="dash-card h-full p-3 overflow-hidden">
          <div className="dash-detail text-fg-48 mb-1">Recent CMS edits</div>
          <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: 'calc(100% - 20px)' }}>
            {sanity.recentEdits.length > 0 ? sanity.recentEdits.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs min-w-0 overflow-hidden">
                <span
                  className="shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: TYPE_COLORS[d.type] || 'var(--kol-palette-blue)' }}
                  title={d.type}
                />
                <span className="text-fg-32 shrink-0 w-14">{d.type}</span>
                <span className="text-fg-64 truncate min-w-0 flex-1">{d.title}</span>
                <span className="text-fg-24 shrink-0 text-[10px]">{new Date(d.updated).toLocaleDateString()}</span>
              </div>
            )) : (
              <span className="text-xs text-fg-32">No recent edits</span>
            )}
          </div>
        </div>
      </div>
      <DashMetricCard label="Packages" value={data.packages} delta="workspaces" borderColor="var(--kol-palette-teal)" />
      <DashMetricCard label="Fonts" value={data.fonts} delta="typeface files" borderColor="var(--kol-palette-red)" />
    </div>
  )
}

// =============================================================================
// Infrastructure tab — deploys + services, fits viewport
// =============================================================================

const InfraTab = ({ deploys, b2 }) => {
  const totalDeploys = deploys.length
  const failedDeploys = deploys.filter(d => d.state === 'ERROR').length
  const avgBuild = totalDeploys > 0
    ? Math.round(deploys.filter(d => d.duration).reduce((s, d) => s + d.duration, 0) / deploys.filter(d => d.duration).length)
    : 0
  const latest = deploys[0]
  const latestState = latest ? (DEPLOY_STATE_LABELS[latest.state] || latest.state) : '—'
  const latestColor = latest ? (DEPLOY_STATE_COLORS[latest.state] || 'var(--kol-palette-blue)') : 'var(--kol-palette-blue)'

  return (
    <div
      className="grid gap-3 w-full"
      style={{
        height: GRID_HEIGHT,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto auto 1fr 1fr',
      }}
    >
      {/* Row 1 — Deploy metrics */}
      <DashMetricCard className="h-full" label="Latest deploy" value={latestState} delta={latest ? timeAgo(latest.created) : '—'} borderColor={latestColor} />
      <DashMetricCard className="h-full" label="Avg build time" value={`${avgBuild}s`} delta={`last ${totalDeploys} deploys`} borderColor="var(--kol-palette-purple)" />
      <DashMetricCard className="h-full" label="Failed deploys" value={String(failedDeploys)} delta={`of ${totalDeploys} total`} borderColor={failedDeploys > 0 ? 'var(--kol-palette-red)' : 'var(--kol-palette-green)'} />
      <DashMetricCard className="h-full" label="Success rate" value={totalDeploys > 0 ? `${Math.round(((totalDeploys - failedDeploys) / totalDeploys) * 100)}%` : '—'} delta="all deploys" borderColor="var(--kol-palette-green)" />

      {/* Row 2 — Deploy history */}
      <div className="col-span-4 min-h-0">
        <div className="dash-card h-full p-3 overflow-hidden">
          <div className="dash-detail text-fg-48 mb-2">Recent deploys</div>
          <div className="flex flex-col gap-1.5 overflow-y-auto" style={{ maxHeight: 'calc(100% - 24px)' }}>
            {deploys.map((d, i) => (
              <div key={d.id || i} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: DEPLOY_STATE_COLORS[d.state] || 'var(--kol-palette-blue)' }} />
                <span className="text-fg-64 w-16 shrink-0">{timeAgo(d.created)}</span>
                <span className="text-fg-32 w-10 shrink-0">{d.duration ? `${d.duration}s` : '—'}</span>
                <span className="text-fg-48 truncate">{d.source}</span>
                <span className="text-fg-24 ml-auto shrink-0">{d.branch}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 — B2 summary */}
      <DashMetricCard className="h-full" label="B2 storage" value={b2.totalFormatted} delta={`${b2.totalFiles.toLocaleString()} objects`} borderColor="var(--kol-palette-blue)" />
      <DashMetricCard className="h-full" label="B2 buckets" value={String(b2.bucketCount)} delta="total buckets" borderColor="var(--kol-palette-orange)" />
      <DashMetricCard className="h-full" label="Vercel" value="Active" delta="hosting" borderColor="var(--kol-palette-green)" />
      <DashMetricCard className="h-full" label="Neon" value="Active" delta="PostgreSQL" borderColor="var(--kol-palette-teal)" />

      {/* Row 4 — Bucket file tree + recent uploads */}
      <div className="col-span-2 min-h-0 overflow-hidden">
        <div className="dash-card h-full p-3 overflow-hidden">
          <div className="dash-detail text-fg-48 mb-1">Bucket tree</div>
          <div className="flex flex-col gap-0.5 overflow-y-auto text-xs" style={{ maxHeight: 'calc(100% - 20px)' }}>
            {b2.buckets.length > 0 ? b2.buckets.map((bkt) => (
              <div key={bkt.id}>
                {/* Bucket name */}
                <div className="flex items-center gap-1.5 py-0.5 text-fg-64 font-medium">
                  <span className="w-2 h-2 rounded shrink-0" style={{ background: 'var(--kol-palette-blue)' }} />
                  <span className="truncate">{bkt.name}</span>
                  <span className="text-fg-24 ml-auto shrink-0">{bkt.bytesFormatted}</span>
                </div>
                {/* Folders */}
                {(bkt.tree || []).map((folder) => (
                  <div key={folder.name} className="ml-4">
                    <div className="flex items-center gap-1.5 py-0.5">
                      <span className="text-fg-24">&#x25B8;</span>
                      <span className="text-fg-48">{folder.name}/</span>
                      <span className="text-fg-24 ml-auto shrink-0">{folder.files} files &middot; {folder.bytesFormatted}</span>
                    </div>
                    {/* Subfolders (top 5) */}
                    {folder.subfolders.slice(0, 5).map((sub) => (
                      <div key={sub.name} className="flex items-center gap-1.5 py-0.5 ml-4">
                        <span className="text-fg-16">&#x25B8;</span>
                        <span className="text-fg-32">{sub.name}/</span>
                        <span className="text-fg-16 ml-auto shrink-0">{sub.files} &middot; {sub.bytesFormatted}</span>
                      </div>
                    ))}
                    {folder.subfolders.length > 5 && (
                      <div className="text-fg-16 ml-4 py-0.5">+{folder.subfolders.length - 5} more</div>
                    )}
                  </div>
                ))}
              </div>
            )) : (
              <span className="text-fg-32">No bucket data</span>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 min-h-0 overflow-hidden">
        <div className="dash-card h-full p-3 overflow-hidden">
          <div className="dash-detail text-fg-48 mb-1">Recent uploads</div>
          <div className="flex flex-col gap-1 overflow-y-auto text-xs" style={{ maxHeight: 'calc(100% - 20px)' }}>
            {b2.buckets.flatMap(bkt => (bkt.recentFiles || []).map(f => ({ ...f, bucket: bkt.name })))
              .sort((a, b) => b.uploaded - a.uploaded)
              .slice(0, 12)
              .map((f, i) => (
                <div key={i} className="flex items-center gap-2 min-w-0 overflow-hidden">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--kol-palette-blue)' }} />
                  <span className="text-fg-48 truncate min-w-0 flex-1">{f.name.split('/').pop()}</span>
                  <span className="text-fg-24 shrink-0">{formatB2Size(f.size)}</span>
                  <span className="text-fg-16 shrink-0 text-[10px]">{new Date(f.uploaded).toLocaleDateString()}</span>
                </div>
              ))}
            {b2.buckets.every(bkt => !(bkt.recentFiles || []).length) && (
              <span className="text-fg-32">No recent uploads</span>
            )}
          </div>
        </div>
      </div>
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
  const [range, setRange] = useState('30d')
  const [siteData, setSiteData] = useState(SITE_FALLBACK)
  const [projectData, setProjectData] = useState(PROJECT_FALLBACK)
  const [sanityData, setSanityData] = useState(SANITY_FALLBACK)
  const [deploys, setDeploys] = useState([])
  const [b2Data, setB2Data] = useState(B2_FALLBACK)
  const [error, setError] = useState(null)

  useEffect(() => {
    const r = RANGES.find(r => r.id === range)
    const rangeParam = r ? `?range=${r.ms}` : ''
    setSiteData(prev => ({ ...prev, visitors: { today: '...', delta: 'loading' } }))
    fetch(`/api/metrics${rangeParam}`)
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(setSiteData)
      .catch(e => setError(e.message))
  }, [range])

  useEffect(() => {
    fetch('/api/metrics-repo')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(setProjectData)
      .catch(() => {})

    fetch('/api/metrics-sanity')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(setSanityData)
      .catch(() => {})

    fetch('/api/metrics-deploys')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(d => setDeploys(d.deploys || []))
      .catch(() => {})

    fetch('/api/metrics-b2')
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then(d => !d.error && setB2Data(d))
      .catch(() => {})

    // Poll deploys every 30s
    const interval = setInterval(() => {
      fetch('/api/metrics-deploys')
        .then(r => r.ok ? r.json() : null)
        .then(d => d && setDeploys(d.deploys || []))
        .catch(() => {})
    }, 5000)
    return () => clearInterval(interval)
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

      {/* Timeline bar */}
      <TimelineBar range={range} onRangeChange={setRange} />

      {/* Deploy status */}
      <DeployBar deploys={deploys} />

      {/* Tab content — fills remaining space */}
      <div className="flex-1 min-h-0">
        {tab === 'site' && <SiteTab data={siteData} />}
        {tab === 'project' && <ProjectTab data={projectData} sanity={sanityData} />}
        {tab === 'infra' && <InfraTab deploys={deploys} b2={b2Data} />}
        {tab === 'sessions' && <SessionsTab data={projectData} />}
      </div>
    </div>
  )
}

export default Metrics
