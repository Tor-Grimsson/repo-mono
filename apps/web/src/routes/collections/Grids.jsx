import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { CollectionGrid, CollectionFilters, Logomark, Illustration as IllustrationAtom, Grid as GridAtom, OverviewHero, FoundryCTA } from '@kol/ui'
import { grids, gridCollections } from '../../data/grids'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

export default function Grids() {
  const [filters, setFilters] = useState(new Set())

  const quickLinkFeatures = [
    {
      title: 'Illustrations',
      description: 'Illustration portfolio.',
      href: '/collections/illustrations',
      visual: <IllustrationAtom name="illustration-01" size={360} />
    },
    {
      title: 'Grids',
      description: 'Modular grid systems.',
      href: '/collections/grids',
      visual: (
        <div className="w-full h-full flex items-center justify-center">
          <GridAtom name="grid-01" size={360} />
        </div>
      )
    },
    {
      title: 'Logomarks',
      description: 'Logomark design gallery.',
      href: '/collections/logomarks',
      visual: <Logomark name="canalix" size={160} />
    },
    {
      title: 'Motion Graphics',
      description: 'Motion graphics lab.',
      href: '/collections/motion-graphics',
      visual: (
        <video
          src="/videos/motion-graphics/motion-graphic-4.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-[4px]"
        />
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
                src="/img/carousel/grid/collection-grid-00.png"
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
                  headerLabel="Explore Each Collection"
                  headerDescription="Jump into each collection."
                  cardsWrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
