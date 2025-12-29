import SEO from '../components/layout/SEO'
import { OverviewHero } from '@kol/ui'
import FeaturedCarousel from '../components/sections/shared/FeaturedCarousel'
import StudioAboutCard from '../components/sections/studio/StudioAboutCard'
import StudioProcessCard from '../components/sections/studio/StudioProcessCard'
import FeaturesCardSection from '../components/sections/shared/FeaturesCardSection'
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
    descriptionClassName: 'kol-mono-sm'
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
      <main>
        {/* Hero */}
        <OverviewHero
          badge="Studio"
          badgeClassName="kol-helper-uc-xl text-[14px] tracking-[0.5px]"
          title="Modular Design Frameworks"
          description="Building visual systems for brands through typography, identity design, and component-driven methodologies."
        />

        {/* Featured Carousel */}
        <FeaturedCarousel
          items={featuredItems}
          sectionLabel="Featured"
        />

        {/* Card: Image Left, Text Right */}
        <StudioAboutCard />

        {/* Card: Text Left, Image Right */}
        <StudioProcessCard />

        {/* Quicklinks */}
        <FeaturesCardSection
          headerLabel="Services"
          headerDescription="Type design, visual identity, and design systems for brands."
          actions={[
            {
              label: 'View Work',
              variant: 'primary',
              href: '/work'
            }
          ]}
          headerClassName="w-full pt-16"
          headerTextWidthClass="w-full md:w-[40%]"
          buttonGroupClassName="pt-10 pb-16"
          showActions={false}
          sectionClassName="pb-16"
        />

        {/* CTA */}
        <CtaGlobal />
      </main>
    </>
  )
}
