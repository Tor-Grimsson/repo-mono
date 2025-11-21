import { Icon } from '@kol/ui'
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

export default Components