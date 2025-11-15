import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { TypefaceCard, FoundryCTA, OverviewHero, FeaturedItemsCarousel } from '@kol/ui'

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

  // Featured specific specimen patterns for carousel
  const featuredSpecimens = [
    {
      name: 'Complete Selection',
      type: 'TG Málrómur',
      typeface: 'TG Málrómur',
      fontFamily: 'TGMalromur',
      fontStyle: 'italic',
      subtitle: 'All Prose Patterns',
      description: 'All eleven prose style patterns in a single continuous specimen showcasing editorial versatility',
      route: '/specimen/malromur/selection',
      category: 'Editorial',
      itemType: 'specimen',
      previewCard: MalromurEditorial
    },
    {
      name: 'Icelandic Poetry',
      type: 'TG Gullhamrar',
      typeface: 'TG Gullhamrar',
      fontFamily: 'TGGullhamrar',
      subtitle: 'Poetry Specimen',
      description: 'Icelandic poetry demonstrating the expressive qualities and rhythm of the typeface',
      route: '/specimen/gullhamrar/poetry',
      category: 'Poetry',
      itemType: 'specimen',
      previewCard: PoetryCard
    },
    {
      name: 'Complete Selection',
      type: 'TG Dylgjur',
      typeface: 'TG Dylgjur',
      fontFamily: 'TGDylgjur',
      subtitle: 'Full Character Set',
      description: 'Complete typeface specimen showcasing character set and editorial applications',
      route: '/specimen/dylgjur/selection',
      category: 'Editorial',
      itemType: 'specimen',
      previewCard: PoemPage1Card
    },
    {
      name: 'Complete Selection',
      type: 'TG Silfurbarki',
      typeface: 'TG Silfurbarki',
      fontFamily: 'TGSilfurbarki',
      subtitle: 'Preview Specimen',
      description: 'Early preview of an elegant serif typeface currently in development',
      route: '/specimen/silfurbarki/selection',
      category: 'Preview',
      itemType: 'specimen',
      previewCard: TitlePageCard
    },
    {
      name: 'Layout Grid Systems',
      type: 'TG Orðspor',
      typeface: 'TG Orðspor',
      fontFamily: 'TGOrdspor',
      subtitle: 'Layout Specimen',
      description: 'Exploring grid systems and layout patterns for editorial design',
      route: '/specimen/ordspor/layout/l-1',
      category: 'Layout',
      itemType: 'specimen',
      previewCard: GridSystemIntroCard
    }
  ]

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

  // Render carousel content for specimens
  const renderCarouselContent = (item) => {
    if (item.itemType === 'specimen' && item.previewCard) {
      const PreviewCard = item.previewCard
      return (
        <div className="w-full h-full relative overflow-hidden rounded-sm p-4 bg-surface-inverse">
          <div style={{
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            width: '200%',
            height: '200%'
          }}>
            <PreviewCard />
          </div>
        </div>
      )
    }
    return null
  }

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
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <FeaturedItemsCarousel
            items={featuredSpecimens}
            renderContent={renderCarouselContent}
            autoRotate={true}
            interval={5000}
            counterLabel="Featured Specimens"
          />
        </div>
      </section>

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

      {/* Quick Links to Prose Styles */}
      <FoundryCTA
        heading="Explore Prose Styles"
        description="Dive deeper into our comprehensive prose styles specimen, featuring 11 distinct typographic patterns for real-world applications."
        action={{
          to: "/specimen/malromur",
          label: "View Málrómur Specimens"
        }}
      />
    </main>
    </>
  )
}

export default FoundrySpecimens
