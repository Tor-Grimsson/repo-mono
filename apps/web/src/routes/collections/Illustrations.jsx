import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { CollectionGrid, CollectionFilters, Logomark, Illustration as IllustrationAtom, Grid, OverviewHero, FoundryCTA } from '@kol/ui'
import { illustrations, filterData, illustrationCollections } from '../../data/illustrations'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

export default function Illustrations() {
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
          <Grid name="grid-01" size={360} />
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
                src="/img/carousel/illustration/collection-illustration.png"
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
