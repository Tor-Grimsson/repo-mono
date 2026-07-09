import { useContext, useLayoutEffect, useState } from 'react'
import { ShellTocContext } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import useMetricsData from '../../hooks/useMetricsData'
import { TABS, TimelineBar, DeployBar, SiteTab, ProjectTab, InfraTab, SessionsTab } from '../Metrics'

const DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' },
]

// The real /metrics dashboard embedded in the workshop shell — same tab components,
// same live data, one source of truth (routes/Metrics.jsx).
const DashboardMetrics = () => {
  const setTocContent = useContext(ShellTocContext)
  const [tab, setTab] = useState('site')
  const {
    siteData,
    allHosts,
    host,
    setHost,
    projectData,
    sanityData,
    deploys,
    b2Data,
    error,
    range,
    setRange,
  } = useMetricsData()

  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="site-metrics"
        label="Dashboard • Live data • 5 API endpoints"
        title="Site Metrics Dashboard"
        body="Live analytics, project stats, infrastructure, and CMS data — fetched from API endpoints."
      />

      <PageSection id="live-dashboard">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex items-baseline gap-3">
            <h2 className="dash-label text-fg-88">kolkrabbi.io / metrics</h2>
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

        <TimelineBar range={range} onRangeChange={setRange} />
        <DeployBar deploys={deploys} />

        <div className="pt-3" style={{ containerType: 'inline-size' }}>
          {tab === 'site' && <SiteTab data={siteData} range={range} host={host} setHost={setHost} allHosts={allHosts} />}
          {tab === 'project' && <ProjectTab data={projectData} sanity={sanityData} />}
          {tab === 'infra' && <InfraTab deploys={deploys} b2={b2Data} />}
          {tab === 'sessions' && <SessionsTab data={projectData} />}
        </div>
      </PageSection>
    </div>
  )
}

export default DashboardMetrics
