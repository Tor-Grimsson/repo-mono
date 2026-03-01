import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/workshop/workshop-overview'

const IMAGE_MAP = {
  'design-system': `${cdnBase}/design-system.png`,
  components: `${cdnBase}/components.png`,
  apparat: `${cdnBase}/apparat.png`,
  'hall-of-mirrors': `${cdnBase}/hall-of-mirrors.png`,
  chess: `${cdnBase}/chess.png`,
  analytics: `${cdnBase}/analytics.png`
}

const ICON_MAP = {
  home: 'styleguide',
  styleguide: 'styleguide',
  'design-system': 'foundation',
  components: 'component',
  apparat: 'interactive',
  'hall-of-mirrors': 'chess-rook',
  chess: 'chess-pawn',
  analytics: 'stat-stat'
}

const WorkshopIntroduction = () => {
  const overviewCards = WORKSHOP_ROUTES.map((route) => ({
    id: route.id,
    label: route.label.toUpperCase(),
    subtitle: `${route.children?.length || 0} Patterns • Workshop`,
    description: route.children?.map((child) => child.label).join(', ') || 'Workshop section',
    icon: route.icon || ICON_MAP[route.id] || 'arrow-downright',
    image: IMAGE_MAP[route.id] || null,
    href: route.children?.length ? `/workshop/${route.children[0].path}` : '/workshop'
  }))

  return (
    <div className="space-y-10">
      <DesPage
        title="Workshop Overview"
        subtitle="Entry point for every workshop chapter. Start here before diving into typography foundations, apparatus experiments, or analytics dashboards."
        meta="Scope: Workshop — Introduction"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {overviewCards.map((card) => (
          <OverviewCard key={card.id} {...card} className="h-64" />
        ))}
      </div>
    </div>
  )
}

export default WorkshopIntroduction
