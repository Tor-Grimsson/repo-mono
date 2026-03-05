import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import WorkshopDocLinks from '../../components/workshop/molecules/WorkshopDocLinks'

const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

const DASHBOARD_CARDS = [
  { id: 'components', label: 'Components', subtitle: 'Chart + KPI library', icon: 'stat-chart-c', href: '/workshop/dashboard/components' },
  { id: 'analysis', label: 'Analysis Dashboard', subtitle: 'Interactive dashboard experience', icon: 'stat-chart-a', href: '/workshop/dashboard/analysis' },
  { id: 'performance', label: 'Performance Dashboard', subtitle: 'Benchmark + KPI tracking', icon: 'trending', href: '/workshop/dashboard/performance' }
]

const DashboardOverview = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopDocLinks links={DASHBOARD_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div className="space-y-10">
      <DesPage
        title="Dashboard"
        subtitle="Modular dashboards, charts, and KPI components used across the dashboard program."
        meta="Scope: Dashboard — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_CARDS.map((card) => (
          <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default DashboardOverview
