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
      visual: <Illustration name="illustration-01" svgUrl="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-svg/illustration-01.svg" size={140} />
    },
    {
      title: 'Grids',
      description: 'Modular grid systems.',
      href: '/collections/grids',
      visual: <Grid name="grid-01" svgUrl="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-svg/grid-01.svg" size={140} />
    },
    {
      title: 'Logomarks',
      description: 'Logomark design gallery.',
      href: '/collections/logomarks',
      visual: <Logomark name="logo-canalix" svgUrl="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-svg/logo-canalix.svg" size={120} />
    },
    {
      title: 'Motion Graphics',
      description: 'Motion graphics lab.',
      href: '/collections/motion-graphics',
      visual: 'https://f005.backblazeb2.com/file/kolkrabbi/website/hls-library/video-library/motion-graphics/04_mg-sanid/sanid-still.png'
    }
  ]


  // Motion graphics data (inline since it's in the component)
  const mgCdn = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-motion-graphics'
  const motionGraphics = [
    {
      id: 2,
      name: 'Fluid Dynamics',
      subtitle: 'Real-time fluid simulation',
      imageUrl: {
        src: `${mgCdn}/02-mg-type-trolla/02-mg-type-trolla-1200.jpg`,
        srcset: `${mgCdn}/02-mg-type-trolla/02-mg-type-trolla-400.jpg 400w, ${mgCdn}/02-mg-type-trolla/02-mg-type-trolla-800.jpg 800w, ${mgCdn}/02-mg-type-trolla/02-mg-type-trolla-1200.jpg 1200w, ${mgCdn}/02-mg-type-trolla/02-mg-type-trolla-1600.jpg 1600w`,
        sizes: '(max-width: 768px) 100vw, 50vw'
      },
      route: '/collections/motion-graphics',
      itemType: 'motion',
      layout: { videoFill: true }
    },
    {
      id: 4,
      name: 'Shader Experiments',
      subtitle: 'GLSL studies',
      imageUrl: {
        src: `${mgCdn}/04-mg-sanid/04-mg-sanid-1200.jpg`,
        srcset: `${mgCdn}/04-mg-sanid/04-mg-sanid-400.jpg 400w, ${mgCdn}/04-mg-sanid/04-mg-sanid-800.jpg 800w, ${mgCdn}/04-mg-sanid/04-mg-sanid-1200.jpg 1200w, ${mgCdn}/04-mg-sanid/04-mg-sanid-1600.jpg 1600w`,
        sizes: '(max-width: 768px) 100vw, 50vw'
      },
      route: '/collections/motion-graphics',
      itemType: 'motion',
      layout: { videoFill: true }
    },
    {
      id: 5,
      name: 'Aftra',
      subtitle: 'Particle Animation',
      imageUrl: {
        src: `${mgCdn}/05-mg-aftra/05-mg-aftra-1200.jpg`,
        srcset: `${mgCdn}/05-mg-aftra/05-mg-aftra-400.jpg 400w, ${mgCdn}/05-mg-aftra/05-mg-aftra-800.jpg 800w, ${mgCdn}/05-mg-aftra/05-mg-aftra-1200.jpg 1200w, ${mgCdn}/05-mg-aftra/05-mg-aftra-1600.jpg 1600w`,
        sizes: '(max-width: 768px) 100vw, 50vw'
      },
      route: '/collections/motion-graphics',
      itemType: 'motion',
      layout: { videoFill: true }
    }
  ]

  // Get featured items from all collections
  const carouselCdn = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-overview'
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
            backgroundImage: {
              src: `${carouselCdn}/carousel-illustration/01-carousel-illustration/01-carousel-illustration-1200.jpg`,
              srcset: `${carouselCdn}/carousel-illustration/01-carousel-illustration/01-carousel-illustration-400.jpg 400w, ${carouselCdn}/carousel-illustration/01-carousel-illustration/01-carousel-illustration-800.jpg 800w, ${carouselCdn}/carousel-illustration/01-carousel-illustration/01-carousel-illustration-1200.jpg 1200w, ${carouselCdn}/carousel-illustration/01-carousel-illustration/01-carousel-illustration-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
          }
        : item.illustrationName === 'illustration-02'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-illustration/02-carousel-illustration/02-carousel-illustration-1200.jpg`,
              srcset: `${carouselCdn}/carousel-illustration/02-carousel-illustration/02-carousel-illustration-400.jpg 400w, ${carouselCdn}/carousel-illustration/02-carousel-illustration/02-carousel-illustration-800.jpg 800w, ${carouselCdn}/carousel-illustration/02-carousel-illustration/02-carousel-illustration-1200.jpg 1200w, ${carouselCdn}/carousel-illustration/02-carousel-illustration/02-carousel-illustration-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
            
          }
        : item.illustrationName === 'illustration-03'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-illustration/03-carousel-illustration/03-carousel-illustration-1200.jpg`,
              srcset: `${carouselCdn}/carousel-illustration/03-carousel-illustration/03-carousel-illustration-400.jpg 400w, ${carouselCdn}/carousel-illustration/03-carousel-illustration/03-carousel-illustration-800.jpg 800w, ${carouselCdn}/carousel-illustration/03-carousel-illustration/03-carousel-illustration-1200.jpg 1200w, ${carouselCdn}/carousel-illustration/03-carousel-illustration/03-carousel-illustration-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
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
            backgroundImage: {
              src: `${carouselCdn}/carousel-grid/01-carousel-grid/01-carousel-grid-1200.jpg`,
              srcset: `${carouselCdn}/carousel-grid/01-carousel-grid/01-carousel-grid-400.jpg 400w, ${carouselCdn}/carousel-grid/01-carousel-grid/01-carousel-grid-800.jpg 800w, ${carouselCdn}/carousel-grid/01-carousel-grid/01-carousel-grid-1200.jpg 1200w, ${carouselCdn}/carousel-grid/01-carousel-grid/01-carousel-grid-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
          }
        : item.gridName === 'grid-03'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-grid/02-carousel-grid/02-carousel-grid-1200.jpg`,
              srcset: `${carouselCdn}/carousel-grid/02-carousel-grid/02-carousel-grid-400.jpg 400w, ${carouselCdn}/carousel-grid/02-carousel-grid/02-carousel-grid-800.jpg 800w, ${carouselCdn}/carousel-grid/02-carousel-grid/02-carousel-grid-1200.jpg 1200w, ${carouselCdn}/carousel-grid/02-carousel-grid/02-carousel-grid-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
          }
        : item.gridName === 'grid-04'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-grid/03-carousel-grid/03-carousel-grid-1200.jpg`,
              srcset: `${carouselCdn}/carousel-grid/03-carousel-grid/03-carousel-grid-400.jpg 400w, ${carouselCdn}/carousel-grid/03-carousel-grid/03-carousel-grid-800.jpg 800w, ${carouselCdn}/carousel-grid/03-carousel-grid/03-carousel-grid-1200.jpg 1200w, ${carouselCdn}/carousel-grid/03-carousel-grid/03-carousel-grid-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
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
      layout: item.logoName === 'logo-flik'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-logomark/carousel-flik/carousel-flik-1200.jpg`,
              srcset: `${carouselCdn}/carousel-logomark/carousel-flik/carousel-flik-400.jpg 400w, ${carouselCdn}/carousel-logomark/carousel-flik/carousel-flik-800.jpg 800w, ${carouselCdn}/carousel-logomark/carousel-flik/carousel-flik-1200.jpg 1200w, ${carouselCdn}/carousel-logomark/carousel-flik/carousel-flik-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true
          }
        : item.logoName === 'logo-kaffistofan'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-logomark/carousel-kaffistofan/carousel-kaffistofan-1200.jpg`,
              srcset: `${carouselCdn}/carousel-logomark/carousel-kaffistofan/carousel-kaffistofan-400.jpg 400w, ${carouselCdn}/carousel-logomark/carousel-kaffistofan/carousel-kaffistofan-800.jpg 800w, ${carouselCdn}/carousel-logomark/carousel-kaffistofan/carousel-kaffistofan-1200.jpg 1200w, ${carouselCdn}/carousel-logomark/carousel-kaffistofan/carousel-kaffistofan-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
          }
        : item.logoName === 'logo-exmon'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-logomark/carousel-exmon/carousel-exmon-1200.jpg`,
              srcset: `${carouselCdn}/carousel-logomark/carousel-exmon/carousel-exmon-400.jpg 400w, ${carouselCdn}/carousel-logomark/carousel-exmon/carousel-exmon-800.jpg 800w, ${carouselCdn}/carousel-logomark/carousel-exmon/carousel-exmon-1200.jpg 1200w, ${carouselCdn}/carousel-logomark/carousel-exmon/carousel-exmon-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
            simple: true,
            darkCard: true
          }
        : item.logoName === 'logo-canalix'
        ? {
            backgroundImage: {
              src: `${carouselCdn}/carousel-logomark/carousel-canalix/carousel-canalix-1200.jpg`,
              srcset: `${carouselCdn}/carousel-logomark/carousel-canalix/carousel-canalix-400.jpg 400w, ${carouselCdn}/carousel-logomark/carousel-canalix/carousel-canalix-800.jpg 800w, ${carouselCdn}/carousel-logomark/carousel-canalix/carousel-canalix-1200.jpg 1200w, ${carouselCdn}/carousel-logomark/carousel-canalix/carousel-canalix-1600.jpg 1600w`,
              sizes: '(max-width: 768px) 100vw, 50vw'
            },
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

  // CDN base URLs
  const logomarksCdn = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-svg'
  const illustrationsCdn = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-svg'
  const gridsCdn = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-grids/grids-svg'

  // Render carousel content based on item type
  const renderCarouselContent = (item) => {
    if (item.itemType === 'logomark' && item.logoName) {
      const svgUrl = `${logomarksCdn}/${item.logoName}.svg`
      if (item.layout?.simple) {
        // Logo is baked into the background image
        return null
      }

      return (
        <div className="flex w-full items-center justify-center">
          <div className="flex h-[320px] w-[320px] items-center justify-center rounded-full bg-dark-fixed">
            <Logomark
              name={item.logoName}
              svgUrl={svgUrl}
              size={item.subtitle === 'Wordmark' ? 200 : 160}
              className="text-light-fixed"
            />
          </div>
        </div>
      )
    }
    if (item.itemType === 'illustration' && item.illustrationName) {
      if (item.layout?.simple) {
        return null
      }
      const svgUrl = `${illustrationsCdn}/${item.illustrationName}.svg`
      if (item.layout?.simpleReverse || item.layout?.geoCard) {
        return (
          <div className="scale-[0.5] md:scale-100">
            <Illustration
              name={item.illustrationName}
              svgUrl={svgUrl}
              size={360}
            />
          </div>
        )
      }
      return (
        <div className="flex w-full max-w-[520px] items-center justify-center">
          <Illustration name={item.illustrationName} svgUrl={svgUrl} size={460} />
        </div>
      )
    }
    if (item.itemType === 'grid' && (item.gridName || item.illustrationName)) {
      if (item.layout?.simple) {
        return null
      }
      const gridName = item.gridName || item.illustrationName
      const svgUrl = `${gridsCdn}/${gridName}.svg`
      if (item.layout?.simpleReverse || item.layout?.geoCard) {
        return (
          <div className="scale-[0.5] md:scale-100">
            <Grid
              name={gridName}
              svgUrl={svgUrl}
              size={360}
            />
          </div>
        )
      }
      return (
        <div className="flex w-full max-w-[520px] items-center justify-center">
          <Grid name={gridName} svgUrl={svgUrl} size={520} />
        </div>
      )
    }
    if (item.itemType === 'motion' && item.imageUrl) {
      return (
        <div className="relative h-full w-full overflow-hidden rounded-[24px]">
          <img
            src={item.imageUrl}
            alt={item.name}
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
