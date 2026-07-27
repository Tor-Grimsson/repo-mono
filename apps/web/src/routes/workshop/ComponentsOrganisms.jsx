import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import FoundryOrganismsPreview from '../../components/workshop/foundry/FoundryOrganismsPreview'
import FeaturedItemsCarouselPreview from '../../components/workshop/organisms/FeaturedItemsCarouselPreview'
import CollectionFiltersPreview from '../../components/workshop/organisms/CollectionFiltersPreview'

const sections = [
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
    id: 'typeface-library-card',
    label: 'Typeface Library Card',
    organismIds: [],
    customPreview: true
  }
]

const ORGANISMS_DOC_LINKS = [
  { id: '3.0.0-components-index', label: 'Components Overview' },
  { id: '3.1.0-components-list', label: 'Components List' }
]

export default function ComponentsOrganisms() {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent sections={sections} links={ORGANISMS_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="components-organisms"
        label="Components"
        title="Components: Organisms"
        body="Complex standalone sections combining multiple molecules and atoms. Hero sections, control panels, and navigation components."
      />

      {sections.map((section) => (
        <PageSection key={section.id} id={section.id} label="Organisms" title={section.label}>
          <div className="mt-8 space-y-6">
            {section.id === 'collection-filters' && (
              <CollectionFiltersPreview />
            )}
            {section.id === 'featured-items-carousel' && (
              <FeaturedItemsCarouselPreview />
            )}
            {section.id === 'typeface-library-card' && (
              <FoundryOrganismsPreview />
            )}
          </div>
        </PageSection>
      ))}
    </div>
  )
}
