import { useState, useMemo } from 'react'
import SEO from '../components/layout/SEO'
import { OverviewHero, FoundryCTA, PrintCard } from '@kol/ui'
import { prints, filterData } from '../data/prints'

export default function Prints() {
  const [filters, setFilters] = useState(new Set())

  const filteredPrints = useMemo(() => {
    if (filters.size === 0) return prints

    return prints.filter((print) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return print[filterType] === filterValue
      })
    })
  }, [filters])

  const handleFilterChange = (filterKey) => {
    setFilters((prev) => {
      const next = new Set(prev)
      if (next.has(filterKey)) {
        next.delete(filterKey)
      } else {
        next.add(filterKey)
      }
      return next
    })
  }

  const clearFilters = () => {
    setFilters(new Set())
  }

  return (
    <>
      <SEO
        title="Prints — Art Print Store"
        description="Original art prints available for purchase. Limited editions and open editions in various sizes."
        ogTitle="Art Prints — Kolkrabbi"
        ogDescription="Browse and purchase original art prints, limited editions, and open editions."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/prints"
        canonical="https://kolkrabbi.io/prints"
      />
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary mb-16">
        <OverviewHero
          badge="Print Shop"
          title="Art Prints"
          description="Original artwork available as high-quality prints. Each piece is printed on archival paper with museum-grade inks."
          variant="left"
        />

        {/* Filters and Grid Section */}
        <div className="py-6 md:py-8 flex flex-col gap-8">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-8">
            <div className="py-16">

              {/* Simple Filter Pills */}
              <div className="mb-8 flex flex-wrap gap-3">
                <span className="kol-mono-sm text-fg-48 mr-2 self-center">Filter:</span>
                {filterData.categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange(`category:${category}`)}
                    className={`px-3 py-1.5 rounded border transition-colors kol-mono-xs ${
                      filters.has(`category:${category}`)
                        ? 'bg-fg-primary text-bg-primary border-fg-primary'
                        : 'bg-transparent text-fg-64 border-auto hover:border-hover'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {filterData.editions.filter(e => e !== 'open').map((edition) => (
                  <button
                    key={edition}
                    onClick={() => handleFilterChange(`edition:${edition}`)}
                    className={`px-3 py-1.5 rounded border transition-colors kol-mono-xs ${
                      filters.has(`edition:${edition}`)
                        ? 'bg-fg-primary text-bg-primary border-fg-primary'
                        : 'bg-transparent text-fg-64 border-auto hover:border-hover'
                    }`}
                  >
                    Limited Edition
                  </button>
                ))}
                {filters.size > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 rounded border border-auto text-fg-48 hover:text-fg-primary transition-colors kol-mono-xs underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Results count */}
              <div className="mb-6">
                <p className="kol-mono-sm text-fg-48">
                  {filteredPrints.length} {filteredPrints.length === 1 ? 'print' : 'prints'} available
                </p>
              </div>

              {/* Grid */}
              <div>
                {filteredPrints.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrints.map((print) => (
                      <PrintCard key={print.id} print={print} />
                    ))}
                  </div>
                ) : (
                  <div className="kol-mono-sm-fine py-16">
                    <p className="kol-mono-sm-fine mb-4">No prints match the current filters</p>
                    <button
                      onClick={clearFilters}
                      className="kol-mono-sm-fine underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auto"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        <FoundryCTA
          heading="Custom Commissions"
          description="Interested in a custom piece or collaboration? Get in touch to discuss your project."
          action={{
            to: 'mailto:hello@kolkrabbi.io',
            label: 'Get in Touch'
          }}
        />
      </main>
    </>
  )
}
