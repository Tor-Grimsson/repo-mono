import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '../../components/shell'
import DesPage from '../../components/workshop/molecules/DesPage'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import {
  DashboardGrid,
  GridCard,
  DashMetricCard,
  DashChartCard,
  DashListCard,
  DashFeaturedCard,
  DashAlertCard,
  DashSlotCard,
  DashTableCard,
  Histogram,
  LineChart,
  DonutChart,
} from '@kol/ui/dashboards'
import useMetricsData, {
  DEPLOY_STATE_COLORS,
  DEPLOY_STATE_LABELS,
  TYPE_COLORS,
  durationBuckets,
  formatB2Size,
  timeAgo,
} from '../../hooks/useMetricsData'

// =============================================================================
// Sidebar
// =============================================================================

const DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' },
]

// =============================================================================
// Palette cycle for donut/list items
// =============================================================================

const PALETTE = [
  'var(--kol-palette-blue)',
  'var(--kol-palette-green)',
  'var(--kol-palette-orange)',
  'var(--kol-palette-purple)',
  'var(--kol-palette-red)',
  'var(--kol-palette-teal)',
  'var(--kol-palette-yellow)',
]

// =============================================================================
// Data transformers
// =============================================================================

const dailyToSeries = (visits) => [
  { data: visits.map(d => ({ y: d.win })), color: 'var(--kol-palette-green)', fill: true },
  { data: visits.map(d => ({ y: d.draw })), color: 'var(--kol-palette-blue)', fill: true },
  { data: visits.map(d => ({ y: d.loss })), color: 'var(--kol-palette-red)', fill: true },
]

const devicesToSegments = (devices) =>
  devices.map((d, i) => ({ value: d.count, label: d.range, color: PALETTE[i % PALETTE.length] }))

const sanityTypesToSegments = (types) =>
  Object.entries(types).map(([key, count]) => ({
    value: count,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    color: TYPE_COLORS[key] || 'var(--kol-palette-blue)',
  }))

const deploysToRows = (deploys) =>
  deploys.slice(0, 12).map(d => ({
    state: d.state,
    time: timeAgo(d.created),
    duration: d.duration ? `${d.duration}s` : '—',
    source: d.source,
    branch: d.branch,
  }))

const editsToRows = (edits) =>
  edits.map(d => ({
    type: d.type,
    title: d.title,
    updated: new Date(d.updated).toLocaleDateString(),
  }))

const bucketsToItems = (buckets, totalBytes) =>
  buckets.map((bkt, i) => ({
    label: bkt.name,
    value: bkt.bytesFormatted,
    percent: totalBytes > 0 ? Math.round((bkt.bytes / totalBytes) * 100) : 0,
    color: PALETTE[i % PALETTE.length],
  }))

const recentUploadsToRows = (buckets) =>
  buckets
    .flatMap(bkt => (bkt.recentFiles || []).map(f => ({ ...f, bucket: bkt.name })))
    .sort((a, b) => b.uploaded - a.uploaded)
    .slice(0, 12)
    .map(f => ({
      file: f.name.split('/').pop(),
      size: formatB2Size(f.size),
      date: new Date(f.uploaded).toLocaleDateString(),
    }))

// =============================================================================
// Table columns
// =============================================================================

const DEPLOY_COLUMNS = [
  { header: 'Status', accessor: 'state' },
  { header: 'Time', accessor: 'time' },
  { header: 'Duration', accessor: 'duration' },
  { header: 'Source', accessor: 'source' },
  { header: 'Branch', accessor: 'branch' },
]

const EDIT_COLUMNS = [
  { header: 'Type', accessor: 'type' },
  { header: 'Title', accessor: 'title' },
  { header: 'Updated', accessor: 'updated' },
]

const UPLOAD_COLUMNS = [
  { header: 'File', accessor: 'file' },
  { header: 'Size', accessor: 'size' },
  { header: 'Date', accessor: 'date' },
]

// =============================================================================
// Component
// =============================================================================

const DashboardMetrics = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  const { siteData, projectData, sanityData, deploys, b2Data } = useMetricsData()
  const { visitors, pageviews, session, bounce, dailyVisits, totalVisitsMonth, topPages, topCountries, blogPosts, referrers, weeklyTraffic, devices, totalSessions } = siteData
  const t = sanityData.types

  // Infra computed
  const totalDeploys = deploys.length
  const failedDeploys = deploys.filter(d => d.state === 'ERROR').length
  const avgBuild = totalDeploys > 0
    ? Math.round(deploys.filter(d => d.duration).reduce((s, d) => s + d.duration, 0) / deploys.filter(d => d.duration).length)
    : 0
  const latest = deploys[0]
  const latestState = latest ? (DEPLOY_STATE_LABELS[latest.state] || latest.state) : '—'
  const latestColor = latest ? (DEPLOY_STATE_COLORS[latest.state] || 'var(--kol-palette-blue)') : 'var(--kol-palette-blue)'

  return (
    <>
      <DesPage
        title="Site Metrics Dashboard"
        subtitle="Live analytics, project stats, infrastructure, and CMS data — fetched from API endpoints."
        meta="Dashboard • Live data • 5 API endpoints"
      />

      <div className="space-y-8">

        {/* ================================================================= */}
        {/* Site Traffic */}
        {/* ================================================================= */}

        <div>
          <h2 className="dash-label text-fg-64 mb-4">Site Traffic</h2>
          <DashboardGrid layout="4-col">
            <GridCard span="1x1"><DashMetricCard label="Visitors today" value={visitors.today} delta={visitors.delta} borderColor="var(--kol-palette-blue)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Pageviews" value={pageviews.today} delta={pageviews.delta} borderColor="var(--kol-palette-green)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Avg session" value={session.avg} delta={session.delta} borderColor="var(--kol-palette-purple)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Bounce rate" value={bounce.rate} delta={bounce.delta} borderColor="var(--kol-palette-orange)" /></GridCard>

            <GridCard span="3x2">
              <DashFeaturedCard
                className="h-full"
                badge="Last 30 days"
                title="Daily Traffic"
                icon="trending"
                description="New visitors, returning visitors, and bounces."
                metricLabel="Total visits"
                metricValue={totalVisitsMonth}
                chart={dailyVisits.length > 0
                  ? <LineChart series={dailyToSeries(dailyVisits)} height={200} showArea />
                  : null
                }
                legends={[
                  { label: 'New', detail: dailyVisits.reduce((s, d) => s + d.win, 0).toLocaleString(), className: 'chart-color-green' },
                  { label: 'Returning', detail: dailyVisits.reduce((s, d) => s + d.draw, 0).toLocaleString(), className: 'chart-color-blue' },
                  { label: 'Bounced', detail: dailyVisits.reduce((s, d) => s + d.loss, 0).toLocaleString(), className: 'chart-color-red' },
                ]}
              />
            </GridCard>
            <GridCard span="1x2">
              <DashChartCard className="h-full" title="Visit duration" subtitle="By length">
                <Histogram data={durationBuckets} barColor="var(--kol-palette-teal)" />
              </DashChartCard>
            </GridCard>

            <GridCard span="2x2">
              <DashListCard className="h-full" variant="meter" title="Top pages" subtitle="By pageviews" icon="dashboard-bookmark" items={topPages.length > 0 ? topPages : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]} footer="Last 30 days" />
            </GridCard>
            <GridCard span="2x2">
              <DashListCard className="h-full" variant="ratings" title="Top countries" subtitle="By visitors" icon="dashboard-roadmap" items={topCountries.length > 0 ? topCountries : [{ label: 'No data yet', value: '—', detail: '', color: 'var(--kol-palette-blue)' }]} footer="Geo from headers" />
            </GridCard>

            <GridCard span="2x1">
              <DashListCard className="h-full" variant="text" title="Blog posts" subtitle="Most read" icon="dashboard-book-open" items={blogPosts.length > 0 ? blogPosts : [{ label: 'No data yet', value: '—' }]} footer="/blog/* paths" />
            </GridCard>
            <GridCard span="2x1">
              <DashListCard className="h-full" variant="meter" title="Referrers" subtitle="Traffic sources" icon="stat-chart-a" items={referrers.length > 0 ? referrers : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]} footer="Excl. direct" />
            </GridCard>

            <GridCard span="2x1">
              <DashAlertCard className="h-full" label="Weekly traffic" value={weeklyTraffic.delta} trend={weeklyTraffic.delta.startsWith?.('-') ? 'down' : 'up'} trendValue={weeklyTraffic.diff} alerts={[]} footer="This week vs previous" />
            </GridCard>
            <GridCard span="2x1">
              <DashChartCard className="h-full" title="Devices" subtitle="Breakdown">
                <div className="flex justify-center py-2">
                  <DonutChart
                    segments={devices.length > 0 ? devicesToSegments(devices) : [{ value: 1, label: 'No data', color: 'var(--kol-palette-blue)' }]}
                    size={140}
                    thickness={24}
                    centerLabel={totalSessions}
                    showLegend
                  />
                </div>
              </DashChartCard>
            </GridCard>
          </DashboardGrid>
        </div>

        {/* ================================================================= */}
        {/* Project */}
        {/* ================================================================= */}

        <div>
          <h2 className="dash-label text-fg-64 mb-4">Project</h2>
          <DashboardGrid layout="4-col">
            <GridCard span="1x1"><DashMetricCard label="Components" value={projectData.components} delta="packages/ui" borderColor="var(--kol-palette-blue)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Routes" value={projectData.routes} delta="app pages" borderColor="var(--kol-palette-green)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Lines of code" value={projectData.linesOfCode} delta="jsx + js + css" borderColor="var(--kol-palette-purple)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Commits" value={projectData.commits} delta="git history" borderColor="var(--kol-palette-orange)" /></GridCard>

            <GridCard span="1x1"><DashMetricCard label="Atoms" value={projectData.atoms} delta="@kol/ui" borderColor="var(--kol-palette-blue)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Molecules" value={projectData.molecules} delta="@kol/ui" borderColor="var(--kol-palette-green)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Session logs" value={projectData.sessionLogs} delta="LLM sessions" borderColor="var(--kol-palette-purple)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Docs files" value={projectData.docsFiles} delta="documentation" borderColor="var(--kol-palette-orange)" /></GridCard>

            <GridCard span="1x1"><DashMetricCard label="CMS documents" value={String(sanityData.totalDocuments)} delta="Sanity dataset" borderColor="var(--kol-palette-teal)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Blog posts" value={String(t.blog)} delta="published" borderColor="var(--kol-palette-blue)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Packages" value={projectData.packages} delta="workspaces" borderColor="var(--kol-palette-green)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Fonts" value={projectData.fonts} delta="typeface files" borderColor="var(--kol-palette-red)" /></GridCard>

            <GridCard span="2x2">
              <DashTableCard
                className="h-full"
                title="Recent CMS edits"
                subtitle="Sanity dataset"
                icon="dashboard-book-open"
                columns={EDIT_COLUMNS}
                rows={editsToRows(sanityData.recentEdits)}
                footer="Live from Sanity API"
              />
            </GridCard>
            <GridCard span="2x2">
              <DashChartCard className="h-full" title="CMS document types" subtitle="Distribution">
                <div className="flex justify-center py-2">
                  <DonutChart
                    segments={sanityTypesToSegments(t)}
                    size={140}
                    thickness={24}
                    centerLabel={String(sanityData.totalDocuments)}
                    showLegend
                  />
                </div>
              </DashChartCard>
            </GridCard>
          </DashboardGrid>
        </div>

        {/* ================================================================= */}
        {/* Infrastructure */}
        {/* ================================================================= */}

        <div>
          <h2 className="dash-label text-fg-64 mb-4">Infrastructure</h2>
          <DashboardGrid layout="4-col">
            <GridCard span="1x1"><DashMetricCard label="Latest deploy" value={latestState} delta={latest ? timeAgo(latest.created) : '—'} borderColor={latestColor} /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Avg build time" value={`${avgBuild}s`} delta={`last ${totalDeploys} deploys`} borderColor="var(--kol-palette-purple)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Failed deploys" value={String(failedDeploys)} delta={`of ${totalDeploys} total`} borderColor={failedDeploys > 0 ? 'var(--kol-palette-red)' : 'var(--kol-palette-green)'} /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Success rate" value={totalDeploys > 0 ? `${Math.round(((totalDeploys - failedDeploys) / totalDeploys) * 100)}%` : '—'} delta="all deploys" borderColor="var(--kol-palette-green)" /></GridCard>

            <GridCard span="4x2">
              <DashTableCard
                className="h-full"
                title="Recent deploys"
                subtitle="Vercel deployment history"
                icon="trending"
                columns={DEPLOY_COLUMNS}
                rows={deploysToRows(deploys)}
                footer={`${totalDeploys} total deploys`}
              />
            </GridCard>

            <GridCard span="1x1"><DashMetricCard label="B2 storage" value={b2Data.totalFormatted} delta={`${b2Data.totalFiles.toLocaleString()} objects`} borderColor="var(--kol-palette-blue)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="B2 buckets" value={String(b2Data.bucketCount)} delta="total buckets" borderColor="var(--kol-palette-orange)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Vercel" value="Active" delta="hosting" borderColor="var(--kol-palette-green)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Neon" value="Active" delta="PostgreSQL" borderColor="var(--kol-palette-teal)" /></GridCard>

            <GridCard span="2x2">
              <DashListCard
                className="h-full"
                variant="meter"
                title="Bucket breakdown"
                subtitle="Storage per bucket"
                icon="stat-chart-c"
                items={bucketsToItems(b2Data.buckets, b2Data.totalBytes)}
                footer={`${b2Data.totalFormatted} total`}
              />
            </GridCard>
            <GridCard span="2x2">
              <DashTableCard
                className="h-full"
                title="Recent uploads"
                subtitle="Across all buckets"
                icon="dashboard-bookmark"
                columns={UPLOAD_COLUMNS}
                rows={recentUploadsToRows(b2Data.buckets)}
                footer="Sorted by upload date"
              />
            </GridCard>
          </DashboardGrid>
        </div>

        {/* ================================================================= */}
        {/* Sessions */}
        {/* ================================================================= */}

        <div>
          <h2 className="dash-label text-fg-64 mb-4">Sessions</h2>
          <DashboardGrid layout="4-col">
            <GridCard span="1x1"><DashMetricCard label="Session logs" value={projectData.sessionLogs} delta="total logged" borderColor="var(--kol-palette-blue)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Docs files" value={projectData.docsFiles} delta="documentation" borderColor="var(--kol-palette-green)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Commits" value={projectData.commits} delta="git history" borderColor="var(--kol-palette-purple)" /></GridCard>
            <GridCard span="1x1"><DashMetricCard label="Components" value={projectData.components} delta="total built" borderColor="var(--kol-palette-orange)" /></GridCard>
          </DashboardGrid>
        </div>

      </div>
    </>
  )
}

export default DashboardMetrics
