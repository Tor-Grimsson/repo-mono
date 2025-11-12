import { Icon } from '@kol/ui'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'

const ICON_MAP = {
  'workshop': 'styleguide',
  'styleguide': 'styleguide',
  'home': 'styleguide',
  foundations: 'foundation',
  components: 'component',
  apparatus: 'interactive',
  'hall-of-mirrors': 'chess-rook',
  chess: 'chess-pawn',
  analytics: 'stat-stat'
}

const IMAGE_MAP = {
  'home': '/img/workshop/workshop-1.png',
  'styleguide': '/img/workshop/styleguide.png',
  'foundations': '/img/workshop/foundations.png',
  'components': '/img/workshop/components.png',
  'apparatus': '/img/workshop/apparatus.png',
  'hall-of-mirrors': '/img/workshop/mirrors.png',
  'chess': '/img/workshop/chess.png',
  'analytics': '/img/workshop/analytics.png'
}

const resolveIconName = (route) => {
  if (route.icon) return route.icon
  return ICON_MAP[route.id] ?? 'arrow-downright'
}

const resolveImagePath = (route) => {
  return IMAGE_MAP[route.id] || null
}

const WorkshopHome = () => {
  const sidebarItems = WORKSHOP_ROUTES.map((route) => ({
    id: route.id,
    name: route.label.toUpperCase(),
    subtitle: `${route.children?.length || 0} Patterns • Workshop`,
    description: route.children?.map(c => c.label).join(', ') || 'Workshop section',
    icon: resolveIconName(route),
    image: resolveImagePath(route)
  }))

  return (
    <div className="flex flex-col gap-8 p-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-[48px] kol-display-lg uppercase" style={{ fontFamily: 'var(--kol-font-family-rgrot-tight)' }}>
          WORKSHOP
        </h1>
        <p className="kol-mono-text text-[14px] text-fg-48">
          Performance • Analytics • Trend tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {sidebarItems.map((card) => (
          <div
            key={card.id}
            className="flex flex-col gap-4 p-4 bg-surface-inverse rounded h-64"
          >
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="kol-helper-uc-s">{card.name}</h3>
                <p className="kol-helper-fine-xxs italic text-fg-64">{card.subtitle}</p>
              </div>
              <Icon name="foundation" size={16} />
            </div>

            <div className="flex-1 flex items-center justify-center py-0 overflow-hidden border border-fg-08 rounded">
              {card.image ? (
                <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
              ) : (
                <Icon name={card.icon} size={64} className="text-auto" />
              )}
            </div>

            <p className="kol-helper-xxs text-fg-48 line-clamp-1">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkshopHome
