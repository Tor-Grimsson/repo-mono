import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { QuickLinksGrid, CollectionGrid, CollectionFilters } from '@kol/ui'
import { grids, gridCollections } from '../../data/grids'
import CollectionHero from '../../components/sections/collections/CollectionHero'
import CtaGlobal from '../../components/sections/cta/CtaGlobal'

export default function Grids() {
  const [filters, setFilters] = useState(new Set())

  const quickLinks = [
    {
      title: 'Grids',
      description: 'Explore modular grid explorations, editorial arrangements, and responsive layout experiments.',
      to: '/collections/grids',
      linkLabel: 'View Grids'
    },
    {
      title: 'Illustrations',
      description: 'Browse the complete illustration portfolio featuring visual explorations and conceptual work.',
      to: '/collections/illustrations',
      linkLabel: 'View Gallery'
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
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary">
        <CollectionHero
          label="Grids"
          title="Grid Systems Collection"
          description="A curated collection of grid explorations, editorial templates, and responsive layout studies."
        />

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
