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
      videoUrl: '/videos/motion-graphics/motion-graphic-2.mov',
      route: '/collections/motion-graphics',
      itemType: 'motion',
      layout: { videoFill: true }
    },
    {
      id: 4,
      name: 'Shader Experiments',
      subtitle: 'GLSL studies',
      videoUrl: '/videos/motion-graphics/motion-graphic-4.mov',
      route: '/collections/motion-graphics',
      itemType: 'motion',
      layout: { videoFill: true }
    },
    {
      id: 5,
      name: 'Aftra',
      subtitle: 'Particle Animation',
      videoUrl: '/videos/motion-graphics/aftra-cms.mov',
      route: '/collections/motion-graphics',
      itemType: 'motion',
      layout: { videoFill: true }
    }
  ]

  // Get featured items from all collections
  const featuredIllustrations = illustrations
    .filter((item) => item.featured)
    .map((item, index) => ({
      name: item.name,
      subtitle: item.type,
      description: item.description,
      type: 'Illustration',
      itemType: 'illustration',
      illustrationName: item.illustrationName,
      route: '/collections/illustrations',
      layout: item.illustrationName === 'illustration-01'
        ? {
            backgroundImage: '/img/carousel/logos/collection-illustration-1.png',
            geoCard: true
          }
        : item.illustrationName === 'illustration-02'
        ? {
            backgroundImage: '/img/carousel/geo/collection-geo-09.png',
            geoCard: true
          }
        : item.illustrationName === 'illustration-03'
        ? {
            backgroundImage: '/img/carousel/illustration/collection-illustration.png',
            geoCard: true
          }
        : { reverse: index % 2 === 0 }
    }))

  const featuredGrids = grids
    .filter((item) => item.featured)
    .map((item, index) => ({
      name: item.name,
      subtitle: item.type,
      description: item.description,
      type: 'Grid',
      itemType: 'grid',
      gridName: item.gridName || item.illustrationName,
      route: '/collections/grids',
      layout: item.gridName === 'grid-01'
        ? {
            backgroundImage: '/img/carousel/geo/collection-geo-04.png',
            geoCard: true
          }
        : item.gridName === 'grid-03'
        ? {
            backgroundImage: '/img/carousel/grid/collection-grid-00.png',
            geoCard: true
          }
        : item.gridName === 'grid-04'
        ? {
            backgroundImage: '/img/carousel/geo/collection-geo-01.png',
            geoCard: true
          }
        : { reverse: index % 2 === 1 }
    }))

  const featuredLogomarks = logomarks
    .filter((item) => item.featured)
    .map((item) => ({
      name: item.name,
      subtitle: item.type,
      description: item.description,
      type: 'Logomark',
      itemType: 'logomark',
      logoName: item.logoName,
      route: '/collections/logomarks',
      layout: item.logoName === 'flik'
        ? {
            backgroundImage: '/img/carousel/logos/collection-logo-flik.png',
            simple: true
          }
        : item.logoName === 'kaffistofan'
        ? {
            backgroundImage: '/img/carousel/logos/collection-kaffistofan.png',
            simple: true,
            darkCard: true
          }
        : item.logoName === 'exmon'
        ? {
            backgroundImage: '/img/carousel/logos/collection-icon-exmon.png',
            simple: true,
            darkCard: true
          }
        : item.logoName === 'canalix'
        ? {
            backgroundImage: '/img/carousel/logos/collection-icon-canalix.png',
            simple: true
          }
        : { reverse: false }
    }))

  // Combine all featured items
  const featuredItems = [
    ...featuredLogomarks,
    ...featuredIllustrations,
    ...featuredGrids,
    ...motionGraphics
  ]

  // Render carousel content based on item type
  const renderCarouselContent = (item) => {
    if (item.itemType === 'logomark' && item.logoName) {
      if (item.layout?.simple) {
        return (
          <div className="scale-[0.6] md:scale-100">
            <Logomark
              name={item.logoName}
              size={180}
            />
          </div>
        )
      }

      const wrapperClasses = item.logoName === 'flik'
        ? 'flex h-[360px] w-[360px] items-center justify-center rounded-full bg-surface-primary p-24 shadow-xl shadow-fg-04/30'
        : 'flex h-[360px] w-[360px] items-center justify-center rounded-full bg-surface-secondary/50 p-24'

      return (
        <div className="flex w-full items-center justify-center">
          <div className={wrapperClasses}>
            <Logomark
              name={item.logoName}
              size={item.subtitle === 'Wordmark' ? 220 : 180}
            />
          </div>
        </div>
      )
    }
    if (item.itemType === 'illustration' && item.illustrationName) {
      if (item.layout?.simpleReverse || item.layout?.geoCard) {
        return (
          <div className="scale-[0.5] md:scale-100">
            <Illustration
              name={item.illustrationName}
              size={360}
            />
          </div>
        )
      }
      return (
        <div className="flex w-full max-w-[520px] items-center justify-center">
          <Illustration name={item.illustrationName} size={460} />
        </div>
      )
    }
    if (item.itemType === 'grid' && (item.gridName || item.illustrationName)) {
      if (item.layout?.simpleReverse || item.layout?.geoCard) {
        return (
          <div className="scale-[0.5] md:scale-100">
            <Grid
              name={item.gridName || item.illustrationName}
              size={360}
            />
          </div>
        )
      }
      return (
        <div className="flex w-full max-w-[520px] items-center justify-center">
          <Grid name={item.gridName || item.illustrationName} size={520} />
        </div>
      )
    }
    if (item.itemType === 'motion' && item.videoUrl) {
      return (
        <div className="relative h-full w-full overflow-hidden rounded-[24px]">
          <video
            src={item.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-surface-primary/70 via-surface-primary/30 to-transparent text-center">
            <span className="kol-helper-uc-md tracking-[0.4em] text-light-fixed">
              Motion Graphics
            </span>
            <p className="kol-text-md text-light-fixed">{item.name}</p>
          </div>
        </div>
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
            autoRotate={false}
            interval={5000}
            counterLabel="Featured Work"
            layout={{ variant: 'hero', contentHeight: '640px' }}
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
