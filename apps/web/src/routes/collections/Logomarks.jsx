import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { QuickLinksGrid, CollectionGrid } from '@kol/ui'
import { logomarks, filterData, logomarkCollections } from '../../data/logomarks'
import { CollectionFilters } from "@kol/ui"
import CollectionHero from '../../components/sections/collections/CollectionHero'
import CtaGlobal from '../../components/sections/cta/CtaGlobal'

export default function Logomarks() {
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
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary">
      <CollectionHero
        label="Logomarks"
        title="Logomark Collection"
        description="A curated selection of logomark designs and brand identity experiments exploring form and symbolism."
      />

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
