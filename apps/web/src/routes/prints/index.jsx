import { useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { FoundryCTA, PrintGridCard, ContentFilters } from '@kol/ui'
import { prints, filterData } from '../../data/prints'

export default function Prints({ onCardClick, activeSlug }) {
  // Build filter groups from print data
  const filterGroups = useMemo(() => [
    {
      label: 'Category',
      key: 'category',
      values: filterData.categories
    },
    {
      label: 'Year',
      key: 'year',
      values: filterData.years
    }
  ], [])

  // Render the grid of prints
  const renderPrints = (filteredItems) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredItems.map((print, index) => (
        <div
          key={print.id}
          className="reveal"
          style={{ '--reveal-delay': `${Math.min(index * 0.08, 0.5)}s` }}
        >
          <PrintGridCard print={print} onCardClick={onCardClick} isFlipped={print.slug === activeSlug} />
        </div>
      ))}
    </div>
  )

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
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary pb-24">
        {/* Grid Section */}
        <section aria-label="Print catalog" className="max-w-[1400px] mx-auto px-6 md:px-8 pt-24">
          <ContentFilters
            items={prints}
            title="All Prints"
            totalCount={prints.length}
            filterGroups={filterGroups}
            renderItem={renderPrints}
          />
        </section>

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
