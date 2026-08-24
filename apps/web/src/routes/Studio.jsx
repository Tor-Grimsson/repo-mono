import SEO from '../components/layout/SEO'
import StudioAboutCard from '../components/sections/studio/StudioAboutCard'
import StudioProcessCard from '../components/sections/studio/StudioProcessCard'
import { FeaturedCarousel, FeaturesCardSection } from '@kolkrabbi/kol-component'
import { useFeatureCards } from '../hooks/useFeatureCards'
import ConnectCta from '../components/sections/shared/ConnectCta'

const cdnBase = 'https://b2.kolkrabbi.io/website'

// Featured items for carousel
const featuredItems = [
  {
    title: 'Kolkrabbi Vinnustofa',
    description: 'A glimpse into our design process and studio work.',
    media: {
      kind: 'video',
      src: `${cdnBase}/hls-library/video-library/studio/hls/master.m3u8`,
      poster: `${cdnBase}/asset-library/studio/studio-video-still/video-still-1200.jpg`
    },
    href: '/work',
    ctaLabel: 'View Work',
    showTitle: false,
    showDescription: false,
    showCta: false,
    titleClassName: 'kol-display-lg tracking-[4px] text-[120px] text-fg-96',
    descriptionClassName: 'kol-mono-12'
  },
  {
    title: 'Motion Graphics',
    description: 'Type and graphic motion studies.',
    media: {
      kind: 'video',
      src: `${cdnBase}/hls-library/video-library/motion-graphics/08_mg-type-gr/hls/master.m3u8`,
      poster: `${cdnBase}/asset-library/collections/collection-motion-graphics/08-mg-type-gr/08-mg-type-gr-1200.jpg`
    },
    href: '/work',
    ctaLabel: 'View Work',
    showTitle: false,
    showDescription: false,
    showCta: false
  }
]

export default function Studio() {
  const featureCards = useFeatureCards()

  return (
    <>
      <SEO
        title="Studio — Kolkrabbi"
        description="About Kolkrabbi studio"
        ogTitle="Kolkrabbi Studio"
        ogDescription="Kolkrabbi's design and collaborative services"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/studio"
        canonical="https://kolkrabbi.io/studio"
      />
      <main id="main">
        {/* Featured Carousel — full height, full bleed */}
        <div className="pt-14 md:pt-16">
          <FeaturedCarousel
            items={featuredItems}
            sectionLabel="Featured"
            showHeader={false}
            navPosition="header"
            fullWidth
            rounded={false}
            autoPlay
            autoPlayInterval={10000}
            height="h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)]"
          >
            {/* Overlay offset is app layout — the package pins children at the
              * stage top; this wrapper restores the 280px drop and re-narrows
              * pointer capture to the card itself. */}
            <div className="pointer-events-none flex items-start justify-center pt-[280px]">
              <div className="pointer-events-auto">
                <StudioAboutCard />
              </div>
            </div>
          </FeaturedCarousel>
        </div>

        {/* Below-fold content */}
        <div className="breakpoint-padding">
          <StudioProcessCard />
          {/* DS organism — no CTA row (the retired fork got showActions={false},
            * so its actions prop was dead); the four cards are the same set the
            * home band shows, passed explicitly now the defaults live app-side. */}
          <FeaturesCardSection
            features={featureCards}
            headerLabel="Services"
            headerDescription="Type design, visual identity, and design systems for brands."
            headerClassName="w-full pt-16"
            headerTextWidthClass="w-full md:w-[40%]"
            sectionClassName="pb-16"
          />
          <ConnectCta />
        </div>
      </main>
    </>
  )
}
