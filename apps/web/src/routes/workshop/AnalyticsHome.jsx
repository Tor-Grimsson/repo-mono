import { Link } from 'react-router-dom'
import DesPage from '../../components/workshop/molecules/DesPage'
import { Icon } from '@kol/ui'

const AnalyticsHome = () => {
  return (
    <div className="flex flex-col gap-12">
      <DesPage
        title="Analytics"
        subtitle="Domain-agnostic data visualization and dashboard components"
        meta="Design system • Analytics • Dashboards • Charts"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/workshop/analytics/overview"
            className="group flex flex-col gap-4 p-8 bg-fg-02 border border-fg-08 rounded hover:border-fg-16 transition-all"
          >
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: '#F5D24520' }}
              >
                <Icon name="dashboard-book-open" size={24} color="#F5D245" />
              </div>
              <span className="kol-mono-xxs text-fg-64 uppercase tracking-wider px-2 py-1 bg-fg-08 rounded">
                View →
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="kol-heading-sm group-hover:text-accent-primary transition-colors">
                Overview
              </h4>
              <p className="kol-mono-xs text-fg-64 leading-relaxed">
                Dashboard selector and layout patterns. Shows various grid combinations, KPI cards, and component arrangements.
              </p>
            </div>
          </Link>

          <Link
            to="/workshop/analytics/components"
            className="group flex flex-col gap-4 p-8 bg-fg-02 border border-fg-08 rounded hover:border-fg-16 transition-all"
          >
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: '#9C64FD20' }}
              >
                <Icon name="atomic-atom" size={24} color="#9C64FD" />
              </div>
              <span className="kol-mono-xxs text-fg-64 uppercase tracking-wider px-2 py-1 bg-fg-08 rounded">
                View →
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="kol-heading-sm group-hover:text-accent-primary transition-colors">
                Components
              </h4>
              <p className="kol-mono-xs text-fg-64 leading-relaxed">
                Complete chart library with 19+ visualization types. Includes pie charts, line graphs, heatmaps, histograms, and KPI cards.
              </p>
            </div>
          </Link>

          <Link
            to="/workshop/analytics/dashboards"
            className="group flex flex-col gap-4 p-8 bg-fg-02 border border-fg-08 rounded hover:border-fg-16 transition-all"
          >
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: '#5eb3d620' }}
              >
                <Icon name="stat-chart-a" size={24} color="#5eb3d6" />
              </div>
              <span className="kol-mono-xxs text-fg-64 uppercase tracking-wider px-2 py-1 bg-fg-08 rounded">
                View →
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="kol-heading-sm group-hover:text-accent-primary transition-colors">
                Dashboards
              </h4>
              <p className="kol-mono-xs text-fg-64 leading-relaxed">
                Production-ready dashboard implementations. Analysis and Performance dashboards with real data integration.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AnalyticsHome
