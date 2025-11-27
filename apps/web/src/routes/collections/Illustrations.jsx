import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { QuickLinksGrid, CollectionGrid, CollectionFilters } from '@kol/ui'
import { illustrations, filterData, illustrationCollections } from '../../data/illustrations'
import CollectionHero from '../../components/sections/collections/CollectionHero'
import CtaGlobal from '../../components/sections/cta/CtaGlobal'

export default function Illustrations() {
  const [filters, setFilters] = useState(new Set())

  // Quick links data
  const quickLinks = [
    {
      title: 'Illustrations',
      description: 'Browse the complete illustration portfolio featuring visual explorations and conceptual work.',
      to: '/collections/illustrations',
      linkLabel: 'View Gallery'
    },
    {
      title: 'Grids',
      description: 'Explore modular grid explorations, editorial arrangements, and responsive layout experiments.',
      to: '/collections/grids',
      linkLabel: 'View Grids'
    },
    {
      title: 'Logomarks',
      description: 'Explore a curated selection of logomark designs and brand identity experiments.',
      to: '/collections/logomarks',
      linkLabel: 'View Marks'
    },
    {
      title: 'Motion Graphics',
      description: 'Discover animated design work and motion graphics showcasing dynamic visual storytelling.',
      to: '/collections/motion-graphics',
      linkLabel: 'View Motion'
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
        description="Browse our complete illustration portfolio featuring visual explorations, conceptual work, and creative design experiments."
        ogTitle="Illustration Portfolio"
        ogDescription="Visual explorations and conceptual illustration work"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/collections/illustrations"
        canonical="https://kolkrabbi.io/collections/illustrations"
      />
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary">
      <CollectionHero
        label="Illustrations"
        title="Illustration Collection"
        description="A curated collection of illustrated works and conceptual explorations showcasing visual storytelling."
      />

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
                <p className="kol-mono-sm-fine mb-4">No illustrations match your current filters</p>
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
            <div className="pt-12">
              <QuickLinksGrid cards={quickLinks} />
            </div>



          </div>
        </div>
      </div>

      <CtaGlobal />
    </main>
    </>
  )
}
