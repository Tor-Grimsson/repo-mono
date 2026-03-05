import { useState, useEffect } from 'react'
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
// Fallback data (shown while API loads or on error)
// =============================================================================

const FALLBACK = {
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

// Duration buckets — Umami doesn't provide this breakdown, placeholder for now
const durationBuckets = [
  { range: '0-10s', count: 0, percentage: 0 },
  { range: '10-30s', count: 0, percentage: 0 },
  { range: '30-60s', count: 0, percentage: 0 },
  { range: '1-2m', count: 0, percentage: 0 },
  { range: '2-5m', count: 0, percentage: 0 },
  { range: '5m+', count: 0, percentage: 0 },
]

// B2 placeholder (Phase 3)
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
// Component
// =============================================================================

const Metrics = () => {
  const [data, setData] = useState(FALLBACK)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/metrics')
      .then(r => {
        if (!r.ok) throw new Error(`${r.status}`)
        return r.json()
      })
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  const { visitors, pageviews, session, bounce, dailyVisits, totalVisitsMonth, topPages, topCountries, blogPosts, referrers, weeklyTraffic, devices, totalSessions } = data
  const maxDaily = dailyVisits.length > 0 ? Math.max(...dailyVisits.map(d => d.total)) : 1

  return (
    <div className="min-h-screen bg-surface-primary text-fg-88 p-6 lg:p-10">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="space-y-1 mb-8">
          <h1 className="dash-title">kolkrabbi.io / metrics</h1>
          <p className="dash-detail text-fg-64">
            {error ? `API error: ${error} — showing fallback` : 'Site analytics, infrastructure, and usage data. Updated every 5 minutes.'}
          </p>
        </div>

        <DashboardGrid layout="4-col">
          {/* Row 1 — Key metrics */}
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Visitors today"
              value={visitors.today}
              delta={visitors.delta}
              borderColor="var(--kol-palette-blue)"
            />
          </GridCard>
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Pageviews"
              value={pageviews.today}
              delta={pageviews.delta}
              borderColor="var(--kol-palette-green)"
            />
          </GridCard>
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Avg session"
              value={session.avg}
              delta={session.delta}
              borderColor="var(--kol-palette-purple)"
            />
          </GridCard>
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Bounce rate"
              value={bounce.rate}
              delta={bounce.delta}
              borderColor="var(--kol-palette-orange)"
            />
          </GridCard>

          {/* Row 2 — Traffic + duration */}
          <GridCard span="3x2">
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
                { label: 'New visitors', detail: '14,210', className: 'chart-color-green' },
                { label: 'Returning', detail: '7,480', className: 'chart-color-blue' },
                { label: 'Bounced', detail: '2,157', className: 'chart-color-red' },
              ]}
            />
          </GridCard>
          <GridCard span="1x2">
            <DashChartCard
              className="h-full"
              title="Visit duration"
              subtitle="Distribution by length"
            >
              <Histogram data={durationBuckets} barColor="var(--kol-palette-teal)" />
            </DashChartCard>
          </GridCard>

          {/* Row 3 — Pages + geo */}
          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="meter"
              title="Top pages"
              subtitle="By pageviews"
              icon="dashboard-bookmark"
              items={topPages.length > 0 ? topPages : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]}
              footer="Last 30 days"
            />
          </GridCard>
          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="ratings"
              title="Top countries"
              subtitle="By unique visitors"
              icon="dashboard-roadmap"
              items={topCountries.length > 0 ? topCountries : [{ label: 'No data yet', value: '—', detail: '', color: 'var(--kol-palette-blue)' }]}
              footer="Geo from request headers"
            />
          </GridCard>

          {/* Row 4 — Blog + referrers */}
          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="text"
              title="Blog posts"
              subtitle="Most read articles"
              icon="dashboard-book-open"
              items={blogPosts.length > 0 ? blogPosts : [{ label: 'No data yet', value: '—' }]}
              footer="Filtered to /blog/* paths"
            />
          </GridCard>
          <GridCard span="2x2">
            <DashListCard
              className="h-full"
              variant="meter"
              title="Referrers"
              subtitle="Traffic sources"
              icon="stat-chart-a"
              items={referrers.length > 0 ? referrers : [{ label: 'No data yet', value: '—', percent: 0, color: 'var(--kol-palette-blue)' }]}
              footer="Excludes direct / unknown"
            />
          </GridCard>

          {/* Row 5 — Infrastructure */}
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="B2 storage"
              value="4.2 GB"
              delta="1,847 objects"
              borderColor="var(--kol-palette-blue)"
            />
          </GridCard>
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="B2 bandwidth"
              value="12.8 GB"
              delta="Last 30 days"
              borderColor="var(--kol-palette-orange)"
            />
          </GridCard>
          <GridCard span="2x1">
            <DashStackedBarCard
              className="h-full"
              title="CDN bandwidth"
              icon="stat-chart-c"
              value="242 MB"
              label="peak day"
              trend="up"
              data={b2DailyBandwidth}
              footerLeft="12 days"
              footerRight="Backblaze B2"
            />
          </GridCard>

          {/* Row 6 — Alerts + devices */}
          <GridCard span="2x2">
            <DashAlertCard
              className="h-full"
              label="Weekly traffic"
              value={weeklyTraffic.delta}
              trend={weeklyTraffic.delta.startsWith('-') ? 'down' : 'up'}
              trendValue={weeklyTraffic.diff}
              alerts={[]}
              footer="Comparing this week vs previous"
            />
          </GridCard>
          <GridCard span="2x2">
            <DashSlotCard
              className="h-full"
              title="Devices"
              subtitle="Visitor breakdown"
              icon="stopwatch"
              chart={<Histogram data={devices.length > 0 ? devices : [{ range: '—', count: 0, percentage: 0 }]} barColor="var(--kol-palette-purple)" />}
              items={devices.map(d => ({ label: d.range, value: `${d.percentage}%` }))}
              footer={{ label: 'Total sessions', value: totalSessions }}
            />
          </GridCard>
        </DashboardGrid>
      </div>
    </div>
  )
}

export default Metrics
