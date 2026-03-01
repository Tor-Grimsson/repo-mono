import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const COMPONENT_CARDS = [
  { id: 'atoms', label: 'Atoms', subtitle: 'Buttons, inputs, badges', icon: 'atomic-atom', href: '/workshop/components/atoms' },
  { id: 'molecules', label: 'Molecules', subtitle: 'Card + form combinations', icon: 'atomic-molecule', href: '/workshop/components/molecules' },
  { id: 'organisms', label: 'Organisms', subtitle: 'Full-page assemblies', icon: 'atomic-organism', href: '/workshop/components/organisms' }
]

const Components = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Components Overview"
        subtitle="Explore the atomic ladder—start with atoms, then molecules, and finally organisms to compose entire pages."
        meta="Scope: Components — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COMPONENT_CARDS.map((card) => (
          <OverviewCard key={card.id} {...card} description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default Components
