import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { TypefaceCard, FoundryCTA, OverviewHero } from '@kol/ui'
import FeaturedCarousel from '../../components/sections/shared/FeaturedCarousel'

// Import specimen cards for previews
import MalromurEditorial from './specimens/malromur/cards/MalromurEditorial'
import PoetryCard from './specimens/gullhamrar/cards/PoetryCard'

// Import specimen data and filters
import { specimenHubs, allSpecimens, allSpecimenData } from '../../data/foundry/specimens'
import { SpecimenFilters } from '@kol/ui'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry'

const FoundrySpecimens = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeFilters, setActiveFilters] = useState(new Set())
  const [viewMode, setViewMode] = useState('hubs') // 'hubs' | 'all' | 'by-typeface'
  const [currentTypeface, setCurrentTypeface] = useState({ name: 'Málrómur', slug: 'malromur' })

  // CDN carousel base path
  const carouselBase = `${cdnBase}/foundry-global/01-carousel`

  // Featured specific specimen patterns for carousel
  const featuredSpecimens = [
    {
      displayText: 'Málrómur',
      subtitle: 'Complete Selection',
      subtitleSecondary: 'All Prose Patterns',
      description: 'All eleven prose style patterns in a single continuous specimen showcasing editorial versatility',
      href: '/foundry/specimen/malromur',
      image: `${carouselBase}/carousel-malromur/carousel-malromur-1200.jpg`,
      fontFamily: 'TGMalromur',
      fontStyle: 'italic'
    },
    {
      displayText: 'Gullhamrar',
      subtitle: 'Icelandic Poetry',
      subtitleSecondary: 'Poetry Specimen',
      description: 'Icelandic poetry demonstrating the expressive qualities and rhythm of the typeface',
      href: '/foundry/specimen/gullhamrar',
      image: `${carouselBase}/carousel-gullhamrar/carousel-gullhamrar-1200.jpg`,
      fontFamily: 'TGGullhamrar',
      fontStyle: 'normal'
    },
    {
      displayText: 'Dylgjur',
      subtitle: 'Complete Selection',
      subtitleSecondary: 'Full Character Set',
      description: 'Complete typeface specimen showcasing character set and editorial applications',
      href: '/foundry/specimen/dylgjur',
      image: `${carouselBase}/carousel-dylgjur/carousel-dylgjur-1200.jpg`,
      fontFamily: 'TGDylgjur',
      fontStyle: 'normal'
    }
  ]

  // Carousel slide change handler
  const handleCarouselChange = (index, item) => {
    const slug = item.displayText.toLowerCase()
    setCurrentTypeface({ name: item.displayText, slug })
  }

  // Filter logic
  const handleFilterChange = (filters, mode) => {
    setActiveFilters(filters)
    setViewMode(mode)
  }

  // Get specimens based on view mode and filters
  const filteredSpecimens = useMemo(() => {
    let dataSource = viewMode === 'hubs' ? specimenHubs : allSpecimens

    // Apply filters
    if (activeFilters.size === 0) {
      return dataSource
    }

    return dataSource.filter((specimen) => {
      let matches = true

      activeFilters.forEach((filter) => {
        const [filterType, value] = filter.split(':')

        if (filterType === 'typeface' && specimen.typeface !== value) {
          matches = false
        }
        if (filterType === 'category' && specimen.category !== value) {
          matches = false
        }
      })

      return matches
    })
  }, [viewMode, activeFilters])

  return (
    <>
      <SEO
        title="Type Specimens — Kolkrabbi Foundry"
        description="Explore detailed type specimens showcasing our typefaces in real-world applications and contexts."
        ogTitle="Type Specimens Collection"
        ogDescription="View type specimens for all Kolkrabbi typefaces"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/specimen"
        canonical="https://kolkrabbi.io/foundry/specimen"
      />
      <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <OverviewHero
        badge="Specimens"
        title="Type Specimen Library"
        description="Explore type specimens showing real-world applications and prose styles."
        categories={['Editorial', 'Display', 'Systems']}
      />

      {/* Featured Specimens Carousel */}
      <FeaturedCarousel
        items={featuredSpecimens}
        sectionLabel="Featured Specimens"
        buttonLabel="View Specimen"
        onSlideChange={handleCarouselChange}
      />

      {/* All Specimens Grid with Filters */}
      <section className="w-full py-16">
        <div className="max-w-[1400px] mx-auto">
          <SpecimenFilters
            specimens={filteredSpecimens}
            onFilterChange={handleFilterChange}
            totalCount={allSpecimenData.length}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredSpecimens.map((specimen, index) => (
              <div
                key={specimen.id || specimen.link}
                className="reveal"
                style={{ '--reveal-delay': `${Math.min(index * 0.08, 0.5)}s` }}
              >
                <Link to={specimen.link}>
                  <TypefaceCard
                    name={specimen.name}
                    subtitle={specimen.subtitle ? `${specimen.subtitle} · ${specimen.typeface}` : specimen.typeface}
                    description={specimen.description}
                    fontFamily={specimen.fontFamily}
                    fontStyle={specimen.fontStyle}
                    isActive={activeIndex === index}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Typeface Specimen Hub */}
      <FoundryCTA
        heading={`Explore ${currentTypeface.name} Specimens`}
        description={`View the complete specimen collection for ${currentTypeface.name}, featuring typographic patterns and real-world applications.`}
        action={{
          to: `/foundry/specimen/${currentTypeface.slug}`,
          label: `View ${currentTypeface.name} Hub`
        }}
      />
    </main>
    </>
  )
}

export default FoundrySpecimens
