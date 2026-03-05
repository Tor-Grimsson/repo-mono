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
// Sample data — replace with live API in Phase 2
// =============================================================================

const dailyVisits = [
  { win: 320, draw: 180, loss: 95, total: 595 },
  { win: 410, draw: 210, loss: 88, total: 708 },
  { win: 380, draw: 195, loss: 102, total: 677 },
  { win: 445, draw: 230, loss: 78, total: 753 },
  { win: 390, draw: 205, loss: 91, total: 686 },
  { win: 520, draw: 280, loss: 65, total: 865 },
  { win: 480, draw: 260, loss: 72, total: 812 },
  { win: 355, draw: 190, loss: 110, total: 655 },
  { win: 430, draw: 220, loss: 85, total: 735 },
  { win: 470, draw: 245, loss: 70, total: 785 },
  { win: 510, draw: 270, loss: 68, total: 848 },
  { win: 490, draw: 255, loss: 75, total: 820 },
  { win: 540, draw: 290, loss: 60, total: 890 },
  { win: 460, draw: 240, loss: 82, total: 782 },
  { win: 500, draw: 265, loss: 71, total: 836 },
  { win: 380, draw: 200, loss: 98, total: 678 },
  { win: 420, draw: 215, loss: 90, total: 725 },
  { win: 550, draw: 295, loss: 58, total: 903 },
  { win: 530, draw: 285, loss: 62, total: 877 },
  { win: 475, draw: 250, loss: 76, total: 801 },
  { win: 440, draw: 225, loss: 84, total: 749 },
  { win: 510, draw: 270, loss: 67, total: 847 },
  { win: 490, draw: 260, loss: 73, total: 823 },
  { win: 560, draw: 300, loss: 55, total: 915 },
  { win: 525, draw: 280, loss: 64, total: 869 },
  { win: 480, draw: 255, loss: 77, total: 812 },
  { win: 450, draw: 235, loss: 86, total: 771 },
  { win: 500, draw: 268, loss: 69, total: 837 },
  { win: 535, draw: 288, loss: 61, total: 884 },
  { win: 570, draw: 305, loss: 52, total: 927 },
]

const durationBuckets = [
  { range: '0-10s', count: 890, percentage: 18 },
  { range: '10-30s', count: 1420, percentage: 29 },
  { range: '30-60s', count: 2150, percentage: 44 },
  { range: '1-2m', count: 3800, percentage: 78 },
  { range: '2-5m', count: 4850, percentage: 99 },
  { range: '5-10m', count: 2900, percentage: 59 },
  { range: '10-30m', count: 1200, percentage: 24 },
  { range: '30m+', count: 340, percentage: 7 },
]

const topPages = [
  { label: '/', value: '4,210 views', percent: 100, color: 'var(--kol-palette-blue)' },
  { label: '/work', value: '2,890 views', percent: 69, color: 'var(--kol-palette-green)' },
  { label: '/studio', value: '1,740 views', percent: 41, color: 'var(--kol-palette-orange)' },
  { label: '/stack', value: '1,520 views', percent: 36, color: 'var(--kol-palette-purple)' },
  { label: '/workshop', value: '980 views', percent: 23, color: 'var(--kol-palette-red)' },
]

const topCountries = [
  { label: 'United States', value: '12,450', detail: '42%', color: 'var(--kol-palette-blue)' },
  { label: 'United Kingdom', value: '3,890', detail: '13%', color: 'var(--kol-palette-green)' },
  { label: 'Germany', value: '2,670', detail: '9%', color: 'var(--kol-palette-orange)' },
  { label: 'Canada', value: '2,180', detail: '7%', color: 'var(--kol-palette-purple)' },
  { label: 'Netherlands', value: '1,540', detail: '5%', color: 'var(--kol-palette-red)' },
]

const blogPosts = [
  { label: 'Building a Design System', value: '1,240 reads' },
  { label: 'Typography at Scale', value: '890 reads' },
  { label: 'CSS Container Queries', value: '760 reads' },
  { label: 'Monorepo Architecture', value: '620 reads' },
  { label: 'Component Patterns', value: '510 reads' },
]

const referrers = [
  { label: 'Google', value: '8,920 visits', percent: 100, color: 'var(--kol-palette-blue)' },
  { label: 'Twitter / X', value: '3,450 visits', percent: 39, color: 'var(--kol-palette-purple)' },
  { label: 'GitHub', value: '2,180 visits', percent: 24, color: 'var(--kol-palette-green)' },
  { label: 'Direct', value: '1,890 visits', percent: 21, color: 'var(--kol-palette-orange)' },
  { label: 'LinkedIn', value: '740 visits', percent: 8, color: 'var(--kol-palette-red)' },
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

const devices = [
  { range: 'Desktop', count: 15800, percentage: 100 },
  { range: 'Mobile', count: 9200, percentage: 58 },
  { range: 'Tablet', count: 2400, percentage: 15 },
]

// =============================================================================
// Component
// =============================================================================

const Metrics = () => {
  return (
    <div className="min-h-screen bg-surface-primary text-fg-88 p-6 lg:p-10">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="space-y-1 mb-8">
          <h1 className="dash-title">kolkrabbi.io / metrics</h1>
          <p className="dash-detail text-fg-64">Site analytics, infrastructure, and usage data. Updated every 5 minutes.</p>
        </div>

        <DashboardGrid layout="4-col">
          {/* Row 1 — Key metrics */}
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Visitors today"
              value="1,247"
              delta="+12% vs yesterday"
              borderColor="var(--kol-palette-blue)"
            />
          </GridCard>
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Pageviews"
              value="3,891"
              delta="2.4 pages / visit"
              borderColor="var(--kol-palette-green)"
            />
          </GridCard>
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Avg session"
              value="2m 34s"
              delta="+18s vs last week"
              borderColor="var(--kol-palette-purple)"
            />
          </GridCard>
          <GridCard span="1x1">
            <DashMetricCard
              className="h-full"
              label="Bounce rate"
              value="38.2%"
              delta="-4.1% vs last month"
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
              metricValue="23,847"
              chart={
                <div className="flex items-end gap-1 h-full min-h-[120px]">
                  {dailyVisits.map((d, i) => {
                    const newPct = d.total > 0 ? (d.win / d.total) * 100 : 0
                    const retPct = d.total > 0 ? (d.draw / d.total) * 100 : 0
                    const bncPct = d.total > 0 ? (d.loss / d.total) * 100 : 0
                    return (
                      <div key={i} className="flex-1 flex flex-col gap-0.5" style={{ height: `${(d.total / 927) * 100}%`, minHeight: 4 }}>
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
              items={topPages}
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
              items={topCountries}
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
              items={blogPosts}
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
              items={referrers}
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
              value="+18.4%"
              trend="up"
              trendValue="+1,240 visits"
              alerts={[
                { title: 'Traffic spike detected', description: 'Tuesday saw 2.3x normal traffic from a Hacker News referral.' },
                { title: 'New milestone', description: 'Crossed 20,000 monthly unique visitors for the first time.' },
              ]}
              footer="Comparing this week vs previous"
            />
          </GridCard>
          <GridCard span="2x2">
            <DashSlotCard
              className="h-full"
              title="Devices"
              subtitle="Visitor breakdown"
              icon="stopwatch"
              chart={<Histogram data={devices} barColor="var(--kol-palette-purple)" />}
              items={[
                { label: 'Desktop', value: '57.6%' },
                { label: 'Mobile', value: '33.6%' },
                { label: 'Tablet', value: '8.8%' },
              ]}
              footer={{ label: 'Total sessions', value: '27,400' }}
            />
          </GridCard>
        </DashboardGrid>
      </div>
    </div>
  )
}

export default Metrics
