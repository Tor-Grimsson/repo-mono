import SEO from '../../components/layout/SEO'
import { FoundryCTA, Logomark, Illustration, Grid, FeaturedItemsCarousel, OverviewHero } from '@kol/ui'
import { illustrations } from '../../data/illustrations'
import { grids } from '../../data/grids'
import { logomarks } from '../../data/logomarks'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

const CollectionsOverview = () => {
  // Quick links data
  const quickLinkFeatures = [
    {
      title: 'Illustrations',
      description: 'Illustration portfolio.',
      href: '/collections/illustrations',
      visual: <Illustration name="illustration-01" size={360} />
    },
    {
      title: 'Grids',
      description: 'Modular grid systems.',
      href: '/collections/grids',
      visual: (
        <div className="w-full h-full flex items-center justify-center">
          <Grid name="grid-01" size={360} />
        </div>
      )
    },
    {
      title: 'Logomarks',
      description: 'Logomark design gallery.',
      href: '/collections/logomarks',
      visual: <Logomark name="canalix" size={160} />
    },
    {
      title: 'Motion Graphics',
      description: 'Motion graphics lab.',
      href: '/collections/motion-graphics',
      visual: (
        <video
          src="/videos/motion-graphics/motion-graphic-4.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-[4px]"
        />
      )
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
        <div className="w-full h-full flex items-center justify-center">
          <Logomark
            name={item.logoName}
            size={item.subtitle === 'Wordmark' ? 200 : 160}
          />
        </div>
      )
    }
    if (item.itemType === 'illustration' && item.illustrationName) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Illustration
            name={item.illustrationName}
            size={400}
          />
        </div>
      )
    }
    if (item.itemType === 'grid' && (item.gridName || item.illustrationName)) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Grid
            name={item.gridName || item.illustrationName}
            size={400}
          />
        </div>
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
        description="Collections of illustrations, logomarks, and motion graphics showcasing visual design explorations."
        ogTitle="Design Collections"
        ogDescription="Visual design collections: illustrations, logomarks, and motion graphics"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/collections"
        canonical="https://kolkrabbi.io/collections"
      />
      <main className="min-h-screen w-full bg-surface-primary mb-16">
      {/* Hero Section */}
      <OverviewHero
        badge="Collections"
        title="Kolkrabbi Collections"
        description="Visual explorations including illustrations, logomarks, and experimental design work."
        categories={['Illustrations', 'Logo Marks', 'Visual Experiments']}
      />

      {/* Featured Items Carousel */}
      <section className="w-full py-16">
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
      <FeaturesCardSection
        sectionClassName="w-full py-16"
        wrapperClassName="max-w-[1400px] mx-auto flex flex-col gap-8"
        headerClassName="w-full"
        headerTextWidthClass="w-full md:w-[50%]"
        headerLabel="Explore Each Collection"
        headerDescription="Jump into each collection."
        cardsWrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        features={quickLinkFeatures}
        showActions={false}
      />

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Explore More Work"
        description="Portfolio of design work, including client projects and experimental explorations."
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
