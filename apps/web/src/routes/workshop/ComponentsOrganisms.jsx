import DesPage from '../../components/workshop/molecules/DesPage'
import FoundryOrganismsPreview from '../../components/workshop/foundry/FoundryOrganismsPreview'
import FeaturedItemsCarouselPreview from '../../components/workshop/organisms/FeaturedItemsCarouselPreview'
import QuickLinksGridPreview from '../../components/workshop/organisms/QuickLinksGridPreview'
import CollectionFiltersPreview from '../../components/workshop/organisms/CollectionFiltersPreview'
import CollectionGridPreview from '../../components/workshop/organisms/CollectionGridPreview'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
  {
    id: 'collection-grid',
    label: 'Collection Grid',
    organismIds: [],
    customPreview: true
  },
  {
    id: 'collection-filters',
    label: 'Collection Filters',
    organismIds: [],
    customPreview: true
  },
  {
    id: 'featured-items-carousel',
    label: 'Featured Items Carousel',
    organismIds: [],
    customPreview: true
  },
  {
    id: 'quick-links-grid',
    label: 'Quick Links Grid',
    organismIds: [],
    customPreview: true
  },
  {
    id: 'foundry',
    label: 'Foundry',
    organismIds: [],
    customPreview: true
  }
]

const ORGANISM_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

export default function ComponentsOrganisms() {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('components-organisms', ORGANISM_SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Components: Organisms"
        subtitle="Complex standalone sections combining multiple molecules and atoms. Hero sections, control panels, and navigation components."
      />

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <SectionToggle
              label={section.label}
              isExpanded={expandedSections[section.id]}
              onToggle={() => toggleSection(section.id)}
            />

            {expandedSections[section.id] && (
              <div className="space-y-4 pt-2">
                {section.id === 'collection-grid' && (
                  <CollectionGridPreview />
                )}
                {section.id === 'collection-filters' && (
                  <CollectionFiltersPreview />
                )}
                {section.id === 'featured-items-carousel' && (
                  <FeaturedItemsCarouselPreview />
                )}
                {section.id === 'quick-links-grid' && (
                  <QuickLinksGridPreview />
                )}
                {section.customPreview && section.id === 'foundry' && (
                  <FoundryOrganismsPreview />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
