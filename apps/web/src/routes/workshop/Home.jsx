import { Icon } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const CARD_DATA = [
  { id: 'docs', label: 'Documentation', subtitle: 'Design System • Full Reference', icon: 'styleguide', href: '/workshop/docs' },
  { id: 'design-system-colors', label: 'Colors', subtitle: 'Design System • Color Tokens', icon: 'color', href: '/workshop/design-system/colors' },
  { id: 'design-system-typography', label: 'Typography', subtitle: 'Design System • Type System', icon: 'type', href: '/workshop/design-system/typography' },
  { id: 'design-system-icons', label: 'Icons', subtitle: 'Design System • Symbol System', icon: 'circle', href: '/workshop/design-system/icons' },
  { id: 'components-atoms', label: 'Atoms', subtitle: 'Components • Atomic Layer', icon: 'atomic-atom', href: '/workshop/components/atoms' },
  { id: 'components-molecules', label: 'Molecules', subtitle: 'Components • Combined Units', icon: 'atomic-molecule', href: '/workshop/components/molecules' },
  { id: 'components-organisms', label: 'Organisms', subtitle: 'Components • Full Assemblies', icon: 'atomic-organism', href: '/workshop/components/organisms' }
]

const Home = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Design System Overview"
        subtitle="Deep dive into foundations and components—start with color + type, then graduate to atoms, molecules, and organisms."
        meta="Scope: Design System — Introduction"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARD_DATA.map((card) => (
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

export default Home
