import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { CollectionGrid, CollectionFilters, Logomark, Illustration as IllustrationAtom, Grid, OverviewHero, FoundryCTA } from '@kol/ui'
import { illustrations, filterData, illustrationCollections } from '../../data/illustrations'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

export default function Illustrations() {
  const [filters, setFilters] = useState(new Set())

  // Quick links data (excludes current collection)
  const quickLinkFeatures = [
    {
      title: 'Grids',
      description: 'Modular grid systems.',
      href: '/collections/grids',
      visual: (
        <div className="w-full aspect-[4/2] flex items-center justify-center">
          <Grid name="grid-01" svgUrl="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-svg/grid-01.svg" size={140} />
        </div>
      )
    },
    {
      title: 'Logomarks',
      description: 'Logomark design gallery.',
      href: '/collections/logomarks',
      visual: (
        <div className="w-full aspect-[4/2] flex items-center justify-center">
          <Logomark name="logo-canalix" svgUrl="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-svg/logo-canalix.svg" size={120} />
        </div>
      )
    },
    {
      title: 'Motion Graphics',
      description: 'Motion graphics lab.',
      href: '/collections/motion-graphics',
      visual: (
        <div className="w-full aspect-[4/2] overflow-hidden">
          <img src="https://f005.backblazeb2.com/file/kolkrabbi/website/hls-library/video-library/motion-graphics/04_mg-sanid/sanid-still.png" alt="Motion Graphics" className="w-full h-full object-cover" />
        </div>
      )
    }
  ]

  const filteredIllustrations = useMemo(() => {
    if (filters.size === 0) return illustrations

    return illustrations.filter((illustration) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return illustration[filterType] === filterValue
      })
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <>
      <SEO
        title="Illustrations — Kolkrabbi Collections"
        description="Browse the illustration portfolio featuring visual explorations, conceptual work, and creative experiments."
        ogTitle="Illustration Portfolio"
        ogDescription="Illustration work, conceptual experiments, and visual explorations"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/collections/illustrations"
        canonical="https://kolkrabbi.io/collections/illustrations"
      />
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary mb-16">
        <OverviewHero
          badge="Illustrations"
          title="Illustration Collection"
          description="Collection of illustrated works, conceptual compositions, and visual storytelling."
          variant="left"
        />

        {/* Featured Image */}
        <section className="w-full">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary">
              <img
                src="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-featured/illustrations-featured-1200.jpg"
                srcSet="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-featured/illustrations-featured-400.jpg 400w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-featured/illustrations-featured-800.jpg 800w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-featured/illustrations-featured-1200.jpg 1200w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-featured/illustrations-featured-1600.jpg 1600w"
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt="Illustration collection"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Illustration Grid Section */}
        <div className="py-6 md:py-8 flex flex-col gap-8">

        <div className="max-w-[1400px] mx-auto">
          <div className="py-16">

            {/* Filters */}
            <div className="mb-8">
              <CollectionFilters
                logomarks={illustrations}
                onFilterChange={handleFilterChange}
                collections={illustrationCollections}
                totalCount={illustrations.length}
                showCollectionCategories={false}
                collectionTitle="Illustration Collection"
              />
            </div>

            {/* Grid */}
            <div>
            {filteredIllustrations.length > 0 ? (
              <CollectionGrid illustrations={filteredIllustrations} />
            ) : (
              <div className="kol-mono-sm-fine py-16">
                <p className="kol-mono-sm-fine mb-4">No illustrations match the current filters</p>
                <button
                  onClick={() => setFilters(new Set())}
                  className="kol-mono-sm-fine underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auto"
                >
                  Clear all filters
                </button>
              </div>
            )}
            </div>

            {/* Explore Collections */}
            <div className="pt-24">
              <FeaturesCardSection
                showHeader={true}
                headerClassName="w-full"
                headerTextWidthClass="w-full md:w-[50%]"
                headerLabel="Explore Collections"
                headerDescription="Jump into each collection."
                cardsWrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                features={quickLinkFeatures}
                showActions={false}
                sectionClassName="w-full"
                wrapperClassName="w-full flex flex-col gap-8"
              />
            </div>



          </div>
        </div>
      </div>

      <FoundryCTA
        heading="Explore More Work"
        description="Portfolio of design work, including client projects and experimental explorations."
        action={{
          to: '/work',
          label: 'View Portfolio'
        }}
      />
    </main>
    </>
  )
}
