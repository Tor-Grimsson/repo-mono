import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { CollectionGrid, Logomark, Illustration as IllustrationAtom, Grid, CollectionFilters, OverviewHero, FoundryCTA } from '@kol/ui'
import { logomarks, filterData, logomarkCollections } from '../../data/logomarks'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

export default function Logomarks() {
  const [filters, setFilters] = useState(new Set())

  // Quick links data (excludes current collection)
  const quickLinkFeatures = [
    {
      title: 'Illustrations',
      description: 'Illustration portfolio.',
      href: '/collections/illustrations',
      visual: (
        <div className="w-full aspect-[4/2] flex items-center justify-center">
          <IllustrationAtom name="illustration-01" svgUrl="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-svg/illustration-01.svg" size={140} />
        </div>
      )
    },
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

  const filteredLogomarks = useMemo(() => {
    if (filters.size === 0) return logomarks

    return logomarks.filter((logomark) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return logomark[filterType] === filterValue
      })
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <>
      <SEO
        title="Logomarks — Kolkrabbi Collections"
        description="Explore a curated selection of logomark designs, brand identity experiments, and mark-making explorations."
        ogTitle="Logomark Collection"
        ogDescription="Logomark designs and brand identity experiments"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/collections/logomarks"
        canonical="https://kolkrabbi.io/collections/logomarks"
      />
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary mb-16">
        <OverviewHero
          badge="Logomarks"
          title="Logomark Collection"
          description="A curated selection of logomark designs and brand identity experiments exploring form and symbolism."
          variant="left"
        />

        {/* Featured Image */}
        <section className="w-full">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary">
              <img
                src="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-featured/logomarks-featured-1200.jpg"
                srcSet="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-featured/logomarks-featured-400.jpg 400w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-featured/logomarks-featured-800.jpg 800w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-featured/logomarks-featured-1200.jpg 1200w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-featured/logomarks-featured-1600.jpg 1600w"
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt="Logomark collection"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Logo Grid Section */}
        <div className="py-6 md:py-8 flex flex-col gap-8">

        <div className="max-w-[1400px] mx-auto">
          <div className="py-16">

            {/* Filters */}
            <div className="mb-8">
              <CollectionFilters
                logomarks={logomarks}
                onFilterChange={handleFilterChange}
                collections={logomarkCollections}
                totalCount={logomarks.length}
                showCollectionCategories={false}
                collectionTitle="Logomark Collection"
              />
            </div>

            {/* Grid */}
            <div>
            {filteredLogomarks.length > 0 ? (
              <CollectionGrid logomarks={filteredLogomarks} />
            ) : (
              <div className="kol-mono-sm-fine py-16">
                <p className="kol-mono-sm-fine mb-4">No logomarks match your current filters</p>
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
