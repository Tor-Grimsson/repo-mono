import { Icon } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const MIRROR_CARDS = [
  { id: 'displacement', label: 'Hall of Displacement', subtitle: 'SVG filters + turbulence waves', icon: 'hall-of-displacement', href: '/workshop/mirrors/displacement' },
  { id: 'movement', label: 'Hall of Movement', subtitle: 'GSAP-driven bending + motion', icon: 'hall-of-movement', href: '/workshop/mirrors/movement' },
  { id: 'copies', label: 'Hall of Copies', subtitle: 'PixiJS tiling + replication', icon: 'row', href: '/workshop/mirrors/copies' },
  { id: 'symphony', label: 'Hall of Symphony', subtitle: 'Live mixer combining all halls', icon: 'hall-of-symphony', href: '/workshop/mirrors/symphony' },
  { id: 'archive', label: 'Hall of Archive', subtitle: 'Saved experiments library', icon: 'dashboard-roadmap', href: '/workshop/mirrors/archive' }
]

const HallOfMirrors = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Hall of Mirrors Overview"
        subtitle="Research playground for displacement, movement, and replication experiments."
        meta="Scope: Mirrors — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MIRROR_CARDS.map((card) => (
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

export default HallOfMirrors
