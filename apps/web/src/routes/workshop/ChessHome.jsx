import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const CHESS_CARDS = [
  { id: 'analysis', label: 'Analysis', subtitle: 'Board + notation playback', icon: 'chess-rook', href: '/workshop/chess/analysis' },
  { id: 'components', label: 'Components', subtitle: 'Boards, controls, tables', icon: 'component', href: '/workshop/chess/components' }
]

const ChessHome = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Chess Overview"
        subtitle="Game analyzer, component library, and control experiments for the chess program."
        meta="Scope: Chess — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CHESS_CARDS.map((card) => (
          <OverviewCard key={card.id} {...card} description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default ChessHome
