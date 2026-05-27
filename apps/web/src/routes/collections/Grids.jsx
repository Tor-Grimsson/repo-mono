import { useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { ContentFilters, CollectionCard, OverviewHero, FoundryCTA, useTheme } from '@kol/ui'
import { grids } from '../../data/grids'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-overview/ql-card'

export default function Grids() {
  const { theme } = useTheme()
  const variant = theme === 'dark' ? 'dark' : 'light'

  const quickLinkFeatures = [
    {
      title: 'Illustrations',
      description: 'Illustration portfolio',
      href: '/collections/illustrations',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-illustration/ql-${variant}/ql-${variant}.svg`} alt="Illustrations" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      title: 'Grids',
      description: 'Modular grid systems',
      href: '/collections/grids',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-grid/ql-${variant}/ql-${variant}.svg`} alt="Grids" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      title: 'Motion Graphics',
      description: 'Motion graphics lab',
      href: '/collections/motion-graphics',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-motion-graphics/ql-${variant}/ql-${variant}.svg`} alt="Motion Graphics" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      title: 'Logomarks',
      description: 'Logomark design gallery',
      href: '/collections/logomarks',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-logomark/ql-${variant}/ql-${variant}.svg`} alt="Logomarks" className="w-full h-full object-contain" />
        </div>
      )
    }
  ]

  const filterGroups = useMemo(() => [
    { label: 'Category', key: 'category', values: [...new Set(grids.map(i => i.category))] },
    { label: 'Type', key: 'type', values: [...new Set(grids.map(i => i.type))] },
    { label: 'Year', key: 'year', values: [...new Set(grids.map(i => i.year))].sort() }
  ], [])

  const renderItems = (filteredItems) => {
    if (filteredItems.length === 0) {
      return <p className="kol-mono-sm-regular py-16">No grids match the current filters</p>
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div key={item.gridName} className="reveal"
            style={{ '--reveal-delay': `${Math.min(index * 0.08, 0.6)}s` }}>
            <CollectionCard item={item} type="grid" />
          </div>
        ))}
      </div>
    )
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
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary mb-16 breakpoint-padding">
        <OverviewHero
          badge="Grids"
          title="Grid Systems Collection"
          description="A curated collection of grid explorations, editorial templates, and responsive layout studies."
          variant="left"
        />

        {/* Featured Image */}
        <section className="w-full">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-surface-secondary">
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
              <ContentFilters
                items={grids}
                title="Grid Systems Collection"
                totalCount={grids.length}
                filterGroups={filterGroups}
                renderItem={renderItems}
              />

              <div className="pt-24">
                <FeaturesCardSection
                  showHeader={true}
                  headerClassName="w-full"
                  headerTextWidthClass="w-full md:w-[50%]"
                  headerLabel="Explore Collections"
                  headerDescription="Jump into each collection"
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
