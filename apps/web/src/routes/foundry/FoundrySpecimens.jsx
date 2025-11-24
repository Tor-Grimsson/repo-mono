import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { TypefaceCard, FoundryCTA, OverviewHero } from '@kol/ui'
import FeaturedCarousel from '../../components/sections/shared/FeaturedCarousel'

// Import specimen cards for previews
import MalromurEditorial from '../specimens/malromur/cards/MalromurEditorial'
import PoetryCard from '../specimens/gullhamrar/cards/PoetryCard'
import PoemPage1Card from '../specimens/dylgjur/cards/PoemPage1Card'
import TitlePageCard from '../specimens/silfurbarki/cards/TitlePageCard'
import GridSystemIntroCard from '../specimens/ordspor/layout/l1-cards/GridSystemIntroCard'

// Import specimen data and filters
import { specimenHubs, allSpecimens, allSpecimenData } from '../../data/foundry/specimens'
import { SpecimenFilters } from '@kol/ui'

const FoundrySpecimens = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeFilters, setActiveFilters] = useState(new Set())
  const [viewMode, setViewMode] = useState('hubs') // 'hubs' | 'all' | 'by-typeface'
  const [currentTypeface, setCurrentTypeface] = useState({ name: 'Málrómur', slug: 'malromur' })

  // Featured specific specimen patterns for carousel
  const featuredSpecimens = [
    {
      displayText: 'Málrómur',
      subtitle: 'Complete Selection',
      subtitleSecondary: 'All Prose Patterns',
      description: 'All eleven prose style patterns in a single continuous specimen showcasing editorial versatility',
      href: '/specimen/malromur',
      image: '/img/typefaces/malromur/set-a-04.png',
      fontFamily: 'TGMalromur',
      fontStyle: 'italic'
    },
    {
      displayText: 'Gullhamrar',
      subtitle: 'Icelandic Poetry',
      subtitleSecondary: 'Poetry Specimen',
      description: 'Icelandic poetry demonstrating the expressive qualities and rhythm of the typeface',
      href: '/specimen/gullhamrar',
      image: '/img/typefaces/gullhamrar/set-f-05.png',
      fontFamily: 'TGGullhamrar',
      fontStyle: 'normal'
    },
    {
      displayText: 'Dylgjur',
      subtitle: 'Complete Selection',
      subtitleSecondary: 'Full Character Set',
      description: 'Complete typeface specimen showcasing character set and editorial applications',
      href: '/specimen/dylgjur',
      image: '/img/typefaces/dylgjur/set-b-02.png',
      fontFamily: 'TGDylgjur',
      fontStyle: 'normal'
    },
    {
      displayText: 'Silfurbarki',
      subtitle: 'Complete Selection',
      subtitleSecondary: 'Preview Specimen',
      description: 'Early preview of an elegant serif typeface currently in development',
      href: '/specimen/silfurbarki',
      image: '/img/typefaces/silfurbarki/set-d-02.png',
      fontFamily: 'TGSilfurbarki',
      fontStyle: 'normal'
    },
    {
      displayText: 'Orðspor',
      subtitle: 'Layout Grid Systems',
      subtitleSecondary: 'Layout Specimen',
      description: 'Exploring grid systems and layout patterns for editorial design',
      href: '/specimen/ordspor',
      image: '/img/typefaces/rot/set-g-03.png',
      fontFamily: 'TGOrdspor',
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
        ogUrl="https://kolkrabbi.io/foundry/specimens"
        canonical="https://kolkrabbi.io/foundry/specimens"
      />
      <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <OverviewHero
        badge="Specimens"
        title="Type Specimen Library"
        description="Each specimen demonstrates different applications and contexts for our typefaces. From poetry to scientific papers, from variable axis exploration to legislative documents."
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
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <SpecimenFilters
            specimens={filteredSpecimens}
            onFilterChange={handleFilterChange}
            totalCount={allSpecimenData.length}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredSpecimens.map((specimen, index) => (
              <Link key={specimen.id || specimen.link} to={specimen.link}>
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
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Typeface Specimen Hub */}
      <FoundryCTA
        heading={`Explore ${currentTypeface.name} Specimens`}
        description={`View the complete specimen collection for ${currentTypeface.name}, featuring typographic patterns and real-world applications.`}
        action={{
          to: `/specimen/${currentTypeface.slug}`,
          label: `View ${currentTypeface.name} Hub`
        }}
      />
    </main>
    </>
  )
}

export default FoundrySpecimens
