import { Link } from 'react-router-dom'
import DesPage from '../../components/workshop/molecules/DesPage'
import { Icon } from '@kol/ui'

const ChessHome = () => {
  return (
    <div className="flex flex-col gap-12">
      <DesPage
        title="Chess"
        subtitle="Chess game apparatus, board controls, and game analysis tools"
        meta="Design system • Chess • Game viewer"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/workshop/chess/analysis"
            className="group flex flex-col gap-4 p-8 bg-fg-02 border border-fg-08 rounded hover:border-fg-16 transition-all"
          >
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: '#0A682A20' }}
              >
                <Icon name="chess-rook" size={24} color="#0A682A" />
              </div>
              <span className="kol-mono-xxs text-fg-64 uppercase tracking-wider px-2 py-1 bg-fg-08 rounded">
                View →
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="kol-heading-sm group-hover:text-accent-primary transition-colors">
                Analysis
              </h4>
              <p className="kol-mono-xs text-fg-64 leading-relaxed">
                Game viewer with interactive board, playback controls, notation panel, and game archive table. Load and analyze any game from the archive.
              </p>
            </div>
          </Link>

          <Link
            to="/workshop/chess/components"
            className="group flex flex-col gap-4 p-8 bg-fg-02 border border-fg-08 rounded hover:border-fg-16 transition-all"
          >
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: '#5eb3d620' }}
              >
                <Icon name="atomic-molecule" size={24} color="#5eb3d6" />
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
                Chess-specific component library including boards (mobile/tablet/desktop), controls, notation panels, piece palettes, and game tables.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ChessHome
