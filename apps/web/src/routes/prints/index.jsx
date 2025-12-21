import { useState, useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { OverviewHero, FoundryCTA, PrintGridCard } from '@kol/ui'
import { prints, filterData } from '../../data/prints'

export default function Prints({ onCardClick }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPrints = useMemo(() => {
    if (selectedCategory === 'all') return prints
    return prints.filter(print => print.category === selectedCategory)
  }, [selectedCategory])

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
        {/* <OverviewHero
          badge="Print Shop"
          title="Art Prints"
          description="Original artwork available as high-quality prints. Each piece is printed on archival paper with museum-grade inks."
          variant="left"
        /> */}

        {/* Grid Section */}
        <section aria-label="Print catalog" className="max-w-[1400px] mx-auto px-6 md:px-8 pt-24">
          {/* Filter Bar */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-fg-08">
            <p className="kol-mono-sm text-fg-64">
              {filteredPrints.length} {filteredPrints.length === 1 ? 'print' : 'prints'} available
            </p>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="kol-mono-sm bg-surface-secondary text-fg-primary px-4 py-2 rounded border border-fg-08 focus:outline-none focus:border-fg-24"
            >
              <option value="all">All Categories</option>
              {filterData.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrints.map((print, index) => (
              <div
                key={print.id}
                className="reveal"
                style={{ '--reveal-delay': `${Math.min(index * 0.08, 0.5)}s` }}
              >
                <PrintGridCard print={print} onCardClick={onCardClick} />
              </div>
            ))}
          </div>
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
