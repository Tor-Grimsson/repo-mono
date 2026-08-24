import { Button } from '@kolkrabbi/kol-component'
import { ExhibitOverview } from '@kolkrabbi/kol-workshop'

/* Dashboard exhibit landing — content-only on the package ExhibitOverview
 * (kol-workshop 0.22.0, the WorkshopExhibitSystem round-trip). The scaffold,
 * cards grid, and rail block all live in the package now. */

const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

const DASHBOARD_CARDS = [
  { id: 'setup', label: 'Setup', subtitle: 'The pipeline — tracking, endpoints, cards', icon: 'book-open', href: '/workshop/dashboard/setup' },
  { id: 'site', label: 'Site', subtitle: 'Site analytics, embedded live', icon: 'stat-chart-a', href: '/workshop/dashboard/site' },
  { id: 'projects', label: 'Projects', subtitle: 'Project stats, embedded live', icon: 'folder', href: '/workshop/dashboard/projects' },
  { id: 'infrastructure', label: 'Infrastructure', subtitle: 'Deploys, CDN, CMS — embedded live', icon: 'cloud', href: '/workshop/dashboard/infrastructure' },
  { id: 'sessions', label: 'Sessions', subtitle: 'Session analytics, embedded live', icon: 'eye-on', href: '/workshop/dashboard/sessions' },
  { id: 'components', label: 'Components', subtitle: 'Chart + KPI library', icon: 'component-01', href: '/workshop/dashboard/components' }
]

const DashboardOverview = () => (
  <ExhibitOverview
    id="dashboard-overview"
    label="Scope: Dashboard — Overview"
    title="Dashboard"
    body="Modular dashboards, charts, and KPI components used across the dashboard program. The production instance — kolkrabbi.io/metrics — renders site analytics, project stats, infrastructure, and CMS data from five API endpoints; the tab pages below embed it live, one frame per tab."
    action={
      <Button variant="primary" href="https://kolkrabbi.io/metrics" target="_blank" rel="noreferrer" iconLeft="desktop" iconRight="external-link">
        Open kolkrabbi.io/metrics
      </Button>
    }
    cards={DASHBOARD_CARDS.map((c) => ({ ...c, description: `Open ${c.label} in the workshop` }))}
    cardsBody="The pipeline notes, the four live tabs, and the component library they are built from."
    toc={{ links: DASHBOARD_DOC_LINKS }}
  />
)

export default DashboardOverview
