import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const ANALYTICS_CARDS = [
  { id: 'components', label: 'Components', subtitle: 'Chart + KPI library', icon: 'stat-chart-c', href: '/workshop/analytics/components' },
  { id: 'dashboard', label: 'Dashboard', subtitle: 'Production layout patterns', icon: 'dashboard-roadmap', href: '/workshop/analytics/dashboard' },
  { id: 'analysis', label: 'Analysis Dashboard', subtitle: 'Interactive analytics experience', icon: 'stat-chart-a', href: '/workshop/analytics/analysis' },
  { id: 'performance', label: 'Performance Dashboard', subtitle: 'Benchmark + KPI tracking', icon: 'trending', href: '/workshop/analytics/performance' }
]

const AnalyticsHome = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Analytics Overview"
        subtitle="Modular dashboards, charts, and KPI components used across the analytics program."
        meta="Scope: Analytics — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ANALYTICS_CARDS.map((card) => (
          <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default AnalyticsHome
