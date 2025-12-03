import { Icon } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const FOUNDATION_CARDS = [
  { id: 'logo', label: 'Logo', subtitle: 'Primary + secondary marks', icon: 'pen', href: '/workshop/foundations/logo' },
  { id: 'colors', label: 'Colors', subtitle: 'Tokenized palette + context', icon: 'color', href: '/workshop/foundations/colors' },
  { id: 'typography', label: 'Typography', subtitle: 'Scales, weights, pairing', icon: 'type', href: '/workshop/foundations/typography' },
  { id: 'icons', label: 'Icons', subtitle: 'Glyph system + usage rules', icon: 'circle', href: '/workshop/foundations/icons' },
  { id: 'interactive', label: 'Interactive', subtitle: 'Motion + interaction primitives', icon: 'interactive', href: '/workshop/foundations/interactive' },
  { id: 'animations', label: 'Animations', subtitle: 'Micro + macro motion patterns', icon: 'row', href: '/workshop/foundations/animations' },
  { id: 'spacing', label: 'Spacing', subtitle: 'Rhythm, grids, and gaps', icon: 'grid', href: '/workshop/foundations/spacing' }
]

const Foundations = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Foundations Overview"
        subtitle="Every primitive in the system—logo, color, typography, and interaction—starts here. Choose a chapter to dive deep."
        meta="Scope: Foundations — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FOUNDATION_CARDS.map((card) => (
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

export default Foundations