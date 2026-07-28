import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import { Button } from '@kolkrabbi/kol-component'
import OverviewCard from '../../components/ui/OverviewCard'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'

const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

const DASHBOARD_CARDS = [
  { id: 'setup', label: 'Setup', subtitle: 'The pipeline — tracking, endpoints, cards', icon: 'book-open', href: '/workshop/dashboard/setup' },
  { id: 'site', label: 'Site', subtitle: 'Site analytics, embedded live', icon: 'stat-chart-a', href: '/workshop/dashboard/site' },
  { id: 'projects', label: 'Projects', subtitle: 'Project stats, embedded live', icon: 'stat-chart-a', href: '/workshop/dashboard/projects' },
  { id: 'infrastructure', label: 'Infrastructure', subtitle: 'Deploys, CDN, CMS — embedded live', icon: 'stat-chart-a', href: '/workshop/dashboard/infrastructure' },
  { id: 'sessions', label: 'Sessions', subtitle: 'Session analytics, embedded live', icon: 'stat-chart-a', href: '/workshop/dashboard/sessions' },
  { id: 'components', label: 'Components', subtitle: 'Chart + KPI library', icon: 'component-01', href: '/workshop/dashboard/components' }
]

// Overview = the about page (overview contract): concept + single-site external
// opt-in in the intro, every child page as a card below.
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
        body="Modular dashboards, charts, and KPI components used across the dashboard program. The production instance — kolkrabbi.io/metrics — renders site analytics, project stats, infrastructure, and CMS data from five API endpoints; the tab pages below embed it live, one frame per tab."
      >
        <div className="mt-6">
          <Button variant="primary" href="https://kolkrabbi.io/metrics" target="_blank" rel="noreferrer" iconLeft="desktop" iconRight="external-link">
            Open kolkrabbi.io/metrics
          </Button>
        </div>
      </PageSection>

      <PageSection
        id="sections"
        label="Pages"
        title="Explore"
        body="The pipeline notes, the four live tabs, and the component library they are built from."
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DASHBOARD_CARDS.map((card) => (
            <OverviewCard key={card.id} {...card} className="h-64" description={`Open ${card.label} in the workshop`} />
          ))}
        </div>
      </PageSection>
    </div>
  )
}

export default DashboardOverview
