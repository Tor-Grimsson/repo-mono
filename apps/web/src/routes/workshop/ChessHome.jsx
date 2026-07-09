import { OverviewCard } from '@kol/ui'
import { PageSection } from '@kolkrabbi/kol-framework'

const CHESS_CARDS = [
  { id: 'analysis', label: 'Analysis', subtitle: 'Board + notation playback', icon: 'chess-rook', href: '/workshop/chess/analysis' },
  { id: 'components', label: 'Components', subtitle: 'Boards, controls, tables', icon: 'component', href: '/workshop/chess/components' },
  { id: 'metrics', label: 'Metrics', subtitle: 'Stats, charts, and trends', icon: 'stat-stat', href: '/workshop/chess/metrics' }
]

const ChessHome = () => {
  return (
    <div>
      <PageSection
        id="chess-overview"
        label="Scope: Chess — Overview"
        title="Chess Overview"
        body="Game analyzer, component library, and control experiments for the chess program."
      />

      <PageSection id="sections" label="Sections" title="Explore">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CHESS_CARDS.map((card) => (
            <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
          ))}
        </div>
      </PageSection>
    </div>
  )
}

export default ChessHome
