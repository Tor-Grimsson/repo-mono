import { Icon } from '@kol/ui'
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ANALYTICS_CARDS.map((card) => (
          <a key={card.id} href={card.href} className="group flex h-60 flex-col gap-3 rounded bg-surface-inverse p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="kol-helper-uc-s">{card.label}</h3>
                <p className="kol-helper-fine-xxs italic text-fg-64 mt-1">{card.subtitle}</p>
              </div>
              <Icon name={card.icon} size={16} />
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden rounded border border-fg-08">
              <Icon name={card.icon} size={64} className="text-auto transition-transform duration-300 group-hover:scale-105" />
            </div>
            <p className="kol-helper-xxs text-fg-48">Explore {card.label}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsHome
