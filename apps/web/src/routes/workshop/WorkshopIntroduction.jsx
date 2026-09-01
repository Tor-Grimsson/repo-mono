import { ExhibitLinkCard } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'

const cdnBase = 'https://b2.kolkrabbi.io/website/asset-library/workshop/workshop-overview'

const IMAGE_MAP = {
  'design-system': `${cdnBase}/design-system.png`,
  components: `${cdnBase}/components.png`,
  apparat: `${cdnBase}/apparat.png`,
  chess: `${cdnBase}/chess.png`,
  dashboard: `${cdnBase}/analytics.png`
}

const ICON_MAP = {
  home: 'styleguide',
  styleguide: 'styleguide',
  'design-system': 'foundation',
  components: 'component',
  apparat: 'interactive',
  chess: 'chess-pawn',
  dashboard: 'stat-stat'
}

const WorkshopIntroduction = () => {
  const overviewCards = WORKSHOP_ROUTES.filter(r => r.id !== 'docs').map((route) => ({
    id: route.id,
    label: route.label.toUpperCase(),
    subtitle: `${route.children?.length || 0} Patterns • Workshop`,
    description: route.children?.map((child) => child.label).join(', ') || 'Workshop section',
    icon: route.icon || ICON_MAP[route.id] || 'arrow-downright',
    image: IMAGE_MAP[route.id] || null,
    href: route.children?.length ? `/workshop/${route.children[0].path}` : '/workshop'
  }))

  return (
    <div>
      <PageSection
        id="workshop-overview"
        label="Scope: Workshop — Introduction"
        title="Workshop Overview"
        body="Entry point for every workshop chapter. Start here before diving into typography foundations, apparatus experiments, or analytics dashboards."
      />

      <PageSection id="sections" label="Sections" title="Explore">
        <div className="mt-8 grid gap-6 grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))]">
          {overviewCards.map((card) => (
            <ExhibitLinkCard key={card.id} {...card} />
          ))}
        </div>
      </PageSection>
    </div>
  )
}

export default WorkshopIntroduction
