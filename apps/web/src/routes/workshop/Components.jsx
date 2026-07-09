import { OverviewCard } from '@kol/ui'
import { PageSection } from '@kolkrabbi/kol-framework'

const COMPONENT_CARDS = [
  { id: 'atoms', label: 'Atoms', subtitle: 'Buttons, inputs, badges', icon: 'atomic-atom', href: '/workshop/components/atoms' },
  { id: 'molecules', label: 'Molecules', subtitle: 'Card + form combinations', icon: 'atomic-molecule', href: '/workshop/components/molecules' },
  { id: 'organisms', label: 'Organisms', subtitle: 'Full-page assemblies', icon: 'atomic-organism', href: '/workshop/components/organisms' }
]

const Components = () => {
  return (
    <div>
      <PageSection
        id="components-overview"
        label="Scope: Components — Overview"
        title="Components Overview"
        body="Explore the atomic ladder—start with atoms, then molecules, and finally organisms to compose entire pages."
      />

      <PageSection id="sections" label="Sections" title="Explore">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_CARDS.map((card) => (
            <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
          ))}
        </div>
      </PageSection>
    </div>
  )
}

export default Components
