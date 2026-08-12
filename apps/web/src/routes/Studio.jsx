import SEO from '../components/layout/SEO'
import FeaturedCarousel from '../components/sections/shared/FeaturedCarousel'
import StudioAboutCard from '../components/sections/studio/StudioAboutCard'
import StudioProcessCard from '../components/sections/studio/StudioProcessCard'
import { FeaturesCardSection } from '@kolkrabbi/kol-component'
import { useFeatureCards } from '../data/featureCards'
import CtaGlobal from '../components/sections/cta/CtaGlobal'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website'

// Featured items for carousel
const featuredItems = [
  {
    title: 'Kolkrabbi Vinnustofa',
    description: 'A glimpse into our design process and studio work.',
    video: `${cdnBase}/hls-library/video-library/studio/hls/master.m3u8`,
    image: `${cdnBase}/asset-library/studio/studio-video-still/video-still-1200.jpg`,
    href: '/work',
    buttonLabel: 'View Work',
    showTitle: false,
    showDescription: false,
    showButton: false,
    titleClassName: 'kol-display-lg tracking-[4px] text-[120px] text-fg-96',
    descriptionClassName: 'kol-mono-12'
  },
  {
    title: 'Motion Graphics',
    description: 'Type and graphic motion studies.',
    video: `${cdnBase}/hls-library/video-library/motion-graphics/08_mg-type-gr/hls/master.m3u8`,
    image: `${cdnBase}/asset-library/collections/collection-motion-graphics/08-mg-type-gr/08-mg-type-gr-1200.jpg`,
    href: '/work',
    buttonLabel: 'View Work',
    showTitle: false,
    showDescription: false,
    showButton: false
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
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
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
            fullWidth
            rounded={false}
            autoPlay
            autoPlayInterval={10000}
            height="h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)]"
          >
            <StudioAboutCard />
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
          <CtaGlobal />
        </div>
      </main>
    </>
  )
}
