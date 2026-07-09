import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import { OverviewCard } from '@kol/ui'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'

const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

const DASHBOARD_CARDS = [
  { id: 'components', label: 'Components', subtitle: 'Chart + KPI library', icon: 'stat-chart-c', href: '/workshop/dashboard/components' },
  { id: 'metrics', label: 'Metrics', subtitle: 'Live data dashboard', icon: 'stat-chart-a', href: '/workshop/dashboard/metrics' }
]

const DashboardOverview = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={DASHBOARD_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="dashboard-overview"
        label="Scope: Dashboard — Overview"
        title="Dashboard"
        body="Modular dashboards, charts, and KPI components used across the dashboard program."
      />

      <PageSection
        id="sections"
        label="Sections"
        title="Explore"
        body="The component library and the live metrics dashboard built from it."
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DASHBOARD_CARDS.map((card) => (
            <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
          ))}
        </div>
      </PageSection>

      <PageSection
        id="in-production"
        label="Use case"
        title="In production"
        body="The dashboard components running live — kolkrabbi.io/metrics renders site analytics, project stats, infrastructure, and CMS data from five API endpoints."
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <OverviewCard
            label="/metrics"
            subtitle="kolkrabbi.io/metrics"
            description="Dashboard components in production"
            icon="stat-stat"
            href="https://kolkrabbi.io/metrics"
            target="_blank"
            rel="noreferrer"
            className="h-64"
          />
        </div>
      </PageSection>
    </div>
  )
}

export default DashboardOverview
