import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const FOUNDATION_CARDS = [
  { id: 'logo', label: 'Logo', subtitle: 'Primary + secondary marks', icon: 'pen', href: '/workshop/foundations/logo' },
  { id: 'colors', label: 'Colors', subtitle: 'Tokenized palette + context', icon: 'color', href: '/workshop/foundations/colors' },
  { id: 'typography', label: 'Typography', subtitle: 'Scales, weights, pairing', icon: 'type', href: '/workshop/foundations/typography' },
  { id: 'icons', label: 'Icons', subtitle: 'Glyph system + usage rules', icon: 'circle', href: '/workshop/foundations/icons' },
  { id: 'animations', label: 'Animations', subtitle: 'Motion, interaction + animation patterns', icon: 'row', href: '/workshop/foundations/animations' },
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FOUNDATION_CARDS.map((card) => (
          <OverviewCard key={card.id} {...card} description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default Foundations
