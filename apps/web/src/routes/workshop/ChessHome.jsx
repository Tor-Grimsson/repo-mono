import { Icon } from '@kol/ui'
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

export default ChessHome
