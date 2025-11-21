import SEO from '../../components/layout/SEO'
import { FoundryCTA, Logomark, Illustration, Grid, FeaturedItemsCarousel, QuickLinksGrid, OverviewHero } from '@kol/ui'
import { illustrations } from '../../data/illustrations'
import { grids } from '../../data/grids'
import { logomarks } from '../../data/logomarks'

const CollectionsOverview = () => {
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


  // Motion graphics data (inline since it's in the component)
  const motionGraphics = [
    {
      id: 2,
      name: 'Fluid Dynamics',
      subtitle: 'Real-time fluid simulation',
      description: 'Real-time fluid dynamics simulation with particle systems.',
      videoUrl: '/videos/motion-graphics/motion-graphic-2.mov',
      type: 'Motion Graphics',
      route: '/collections/motion-graphics'
    },
    {
      id: 4,
      name: 'Shader Experiments',
      subtitle: 'GLSL studies',
      description: 'Collection of custom GLSL shader experiments.',
      videoUrl: '/videos/motion-graphics/motion-graphic-4.mov',
      type: 'Motion Graphics',
      route: '/collections/motion-graphics'
    },
    {
      id: 5,
      name: 'Particle Systems',
      subtitle: 'Dynamic particles',
      description: 'Complex particle system with multiple attractors.',
      videoUrl: '/videos/motion-graphics/motion-graphic-5.mov',
      type: 'Motion Graphics',
      route: '/collections/motion-graphics'
    }
  ]

  // Get featured items from all collections
  const featuredIllustrations = illustrations
    .filter(item => item.featured)
    .map(item => ({
      name: item.name,
      subtitle: item.type,
      description: item.description,
      type: 'Illustration',
      itemType: 'illustration',
      illustrationName: item.illustrationName,
      route: '/collections/illustrations'
    }))

  const featuredGrids = grids
    .filter(item => item.featured)
    .map(item => ({
      name: item.name,
      subtitle: item.type,
      description: item.description,
      type: 'Grid',
      itemType: 'grid',
      gridName: item.gridName || item.illustrationName,
      route: '/collections/grids'
    }))

  const featuredLogomarks = logomarks
    .filter(item => item.featured)
    .map(item => ({
      name: item.name,
      subtitle: item.type,
      description: item.description,
      type: 'Logomark',
      itemType: 'logomark',
      logoName: item.logoName,
      route: '/collections/logomarks'
    }))

  // Combine all featured items
  const featuredItems = [
    ...featuredLogomarks,
    ...featuredIllustrations,
    ...featuredGrids,
    ...motionGraphics.map(item => ({ ...item, itemType: 'motion' }))
  ]

  // Render carousel content based on item type
  const renderCarouselContent = (item) => {
    if (item.itemType === 'logomark' && item.logoName) {
      return (
        <Logomark
          name={item.logoName}
          size={item.subtitle === 'Wordmark' ? 200 : 160}
        />
      )
    }
    if (item.itemType === 'illustration' && item.illustrationName) {
      return (
        <Illustration
          name={item.illustrationName}
          size={400}
        />
      )
    }
    if (item.itemType === 'grid' && (item.gridName || item.illustrationName)) {
      return (
        <Grid name={item.gridName || item.illustrationName} size={400} />
      )
    }
    if (item.itemType === 'motion' && item.videoUrl) {
      return (
        <video
          src={item.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-[4px]"
        />
      )
    }
    return null
  }

  return (
    <>
      <SEO
        title="Collections — Kolkrabbi"
        description="Explore our curated collections of illustrations, logomarks, and motion graphics showcasing visual design explorations."
        ogTitle="Design Collections"
        ogDescription="Discover our visual design collections: illustrations, logomarks, and motion graphics"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/collections"
        canonical="https://kolkrabbi.io/collections"
      />
      <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <OverviewHero
        badge="Collections"
        title="Kolkrabbi Collections"
        description="A curated showcase of visual explorations including illustrations, logomarks, and experimental design work."
        categories={['Illustrations', 'Logo Marks', 'Visual Experiments']}
      />

      {/* Featured Items Carousel */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <FeaturedItemsCarousel
            items={featuredItems}
            renderContent={renderCarouselContent}
            autoRotate={true}
            interval={5000}
            counterLabel="Featured Work"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <QuickLinksGrid cards={quickLinks} />
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Explore More Work"
        description="View our full portfolio of design work, including client projects and experimental explorations."
        action={{
          to: "/work",
          label: "View Portfolio"
        }}
      />
    </main>
    </>
  )
}

export default CollectionsOverview
