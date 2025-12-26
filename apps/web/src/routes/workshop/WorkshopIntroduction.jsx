import { Icon } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/workshop/workshop-images/ws-img-01'
const IMAGE_PLACEHOLDER = `${cdnBase}/workshop-image-1200.jpg`

const ICON_MAP = {
  home: 'styleguide',
  styleguide: 'styleguide',
  foundations: 'foundation',
  components: 'component',
  apparat: 'interactive',
  'hall-of-mirrors': 'chess-rook',
  chess: 'chess-pawn',
  analytics: 'stat-stat'
}

const WorkshopIntroduction = () => {
  const overviewCards = WORKSHOP_ROUTES.map((route) => ({
    id: route.id,
    name: route.label.toUpperCase(),
    subtitle: `${route.children?.length || 0} Patterns • Workshop`,
    description: route.children?.map((child) => child.label).join(', ') || 'Workshop section',
    icon: route.icon || ICON_MAP[route.id] || 'arrow-downright',
    image: IMAGE_PLACEHOLDER,
    href: route.children?.length ? `/workshop/${route.children[0].path}` : '/workshop'
  }))

  return (
    <div className="space-y-10">
      <DesPage
        title="Workshop Overview"
        subtitle="Entry point for every workshop chapter. Start here before diving into typography foundations, apparatus experiments, or analytics dashboards."
        meta="Scope: Workshop — Introduction"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <a
            key={card.id}
            className="group flex h-64 flex-col gap-2 rounded bg-surface-inverse p-4"
            href={card.href}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="kol-helper-uc-s">{card.name}</h3>
                <p className="kol-helper-fine-xxs italic text-fg-64 mt-1">{card.subtitle}</p>
              </div>
              <Icon name={card.icon} size={16} />
            </div>

            <div className="flex flex-1 items-center justify-center overflow-hidden rounded border border-fg-08">
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full scale-100 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <Icon name={card.icon} size={64} className="text-auto transition-transform duration-300 group-hover:scale-105" />
              )}
            </div>

            <p className="kol-helper-xxs text-fg-48 line-clamp-1">{card.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default WorkshopIntroduction
