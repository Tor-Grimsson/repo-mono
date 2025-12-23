import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { CollectionGrid, CollectionFilters, Logomark, Illustration as IllustrationAtom, Grid as GridAtom, OverviewHero, FoundryCTA } from '@kol/ui'
import { grids, gridCollections } from '../../data/grids'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

export default function Grids() {
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

  const filteredGrids = useMemo(() => {
    if (filters.size === 0) return grids

    return grids.filter((grid) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return grid[filterType] === filterValue
      })
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <>
      <SEO
        title="Grids — Kolkrabbi Collections"
        description="Browse modular grid explorations, editorial layouts, and responsive systems used across Kolkrabbi experiments."
        ogTitle="Grid Systems Portfolio"
        ogDescription="Layout grids, editorial arrangements, and responsive explorations"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/collections/grids"
        canonical="https://kolkrabbi.io/collections/grids"
      />
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary mb-16">
        <OverviewHero
          badge="Grids"
          title="Grid Systems Collection"
          description="A curated collection of grid explorations, editorial templates, and responsive layout studies."
          variant="left"
        />

        {/* Featured Image */}
        <section className="w-full">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary">
              <img
                src="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-featured/grids-featured-1200.jpg"
                srcSet="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-featured/grids-featured-400.jpg 400w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-featured/grids-featured-800.jpg 800w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-featured/grids-featured-1200.jpg 1200w, https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-featured/grids-featured-1600.jpg 1600w"
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt="Grid systems collection"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        <div className="py-6 md:py-8 flex flex-col gap-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="py-16">
              <div className="mb-8">
                <CollectionFilters
                  logomarks={grids}
                  onFilterChange={handleFilterChange}
                  collections={gridCollections}
                  totalCount={grids.length}
                  showCollectionCategories={false}
                  collectionTitle="Grid Systems Collection"
                />
              </div>

              <div>
                {filteredGrids.length > 0 ? (
                <CollectionGrid grids={filteredGrids} />
                ) : (
                  <div className="kol-mono-sm-fine py-16">
                    <p className="kol-mono-sm-fine mb-4">No grids match your current filters</p>
                    <button
                      onClick={() => setFilters(new Set())}
                      className="kol-mono-sm-fine underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auto"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

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
