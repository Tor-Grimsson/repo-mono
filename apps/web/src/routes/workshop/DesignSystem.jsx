import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const DESIGN_SYSTEM_CARDS = [
  { id: 'logo', label: 'Logo', subtitle: 'Primary + secondary marks', icon: 'pen', href: '/workshop/design-system/logo' },
  { id: 'colors', label: 'Colors', subtitle: 'Tokenized palette + context', icon: 'color', href: '/workshop/design-system/colors' },
  { id: 'typography', label: 'Typography', subtitle: 'Scales, weights, pairing', icon: 'type', href: '/workshop/design-system/typography' },
  { id: 'icons', label: 'Icons', subtitle: 'Glyph system + usage rules', icon: 'circle', href: '/workshop/design-system/icons' },
  { id: 'animations', label: 'Animations', subtitle: 'Motion, interaction + animation patterns', icon: 'row', href: '/workshop/design-system/animations' },
  { id: 'spacing', label: 'Spacing', subtitle: 'Rhythm, grids, and gaps', icon: 'grid', href: '/workshop/design-system/spacing' }
]

const DesignSystem = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Design System"
        subtitle="Every primitive in the system—logo, color, typography, and interaction—starts here. Choose a chapter to dive deep."
        meta="Scope: Design System — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DESIGN_SYSTEM_CARDS.map((card) => (
          <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default DesignSystem
