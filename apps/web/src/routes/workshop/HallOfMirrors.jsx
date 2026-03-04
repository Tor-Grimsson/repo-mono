import { OverviewCard } from '@kol/ui'
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
          <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default HallOfMirrors
