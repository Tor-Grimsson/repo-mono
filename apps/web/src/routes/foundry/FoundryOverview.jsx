import { useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { FoundryCTA, OverviewHero, useTheme } from '@kol/ui'
import FoundryFeatureSection from './components/FoundryFeatureSection'
import TextPressureHero from '../../components/react-bits/TextPressureHero'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'
import FeaturedCarousel from '../../components/sections/shared/FeaturedCarousel'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry'

const FoundryOverview = () => {
  const { theme } = useTheme()

  // Quick links data
  const quickLinks = [
    {
      title: 'All Typefaces',
      description: 'Typeface library with specifications and previews.',
      to: '/foundry/typefaces',
      linkLabel: 'View Library'
    },
    {
      title: 'Specimens',
      description: 'Explore type specimens showing real-world applications and prose styles.',
      to: '/foundry/specimen',
      linkLabel: 'View Specimens'
    },
    {
      title: 'Licensing',
      description: 'Free for personal and commercial use under SIL Open Font License.',
      to: '/foundry/licensing',
      linkLabel: 'Learn More'
    },
    {
      title: 'Prose Styles',
      description: 'Prose style patterns for editorial design and typography.',
      to: '/foundry/prose-styles',
      linkLabel: 'View Prose Styles'
    }
  ]

  // Theme-aware CDN paths for QL navigation cards
  const qlPath = `${cdnBase}/foundry-global/02-ql-navigation`
  const qlVariant = theme === 'dark' ? 'ql-dark' : 'ql-light'

  const quickLinkVisuals = useMemo(() => [
    `${qlPath}/${qlVariant}/ql-card-01/ql-card-01.svg`,
    `${qlPath}/${qlVariant}/ql-card-02/ql-card-02.svg`,
    `${qlPath}/${qlVariant}/ql-card-03/ql-card-03.svg`,
    `${qlPath}/${qlVariant}/ql-card-04/ql-card-04.svg`
  ], [qlPath, qlVariant])

  const quickLinkIcons = ['type', 'foundation', 'dashboard-book-open', 'diamond']

  const quickLinkFeatures = quickLinks.map((link, index) => ({
    title: link.title,
    description: link.description,
    href: link.to,
    icon: quickLinkIcons[index % quickLinkIcons.length],
    visual: quickLinkVisuals[index % quickLinkVisuals.length],
    backgroundColor: 'bg-surface-on-inverse'
  }))

  // CDN carousel base path
  const carouselBase = `${cdnBase}/foundry-global/01-carousel`

  const featuredCarousel = [
    {
      title: 'Málrómur',
      subtitle: 'TG Málrómur',
      subtitleSecondary: 'Variable Serif Typeface',
      description: 'Italic typeface for editorial systems.',
      href: '/foundry/typefaces/malromur',
      image: `${carouselBase}/carousel-malromur/carousel-malromur-1200.jpg`,
      fontFamily: 'TGMalromur',
      fontStyle: 'italic',
      displayText: 'Málrómur'
    },
    {
      title: 'Gullhamrar',
      subtitle: 'TG Gullhamrar',
      subtitleSecondary: 'Variable Display Serif',
      description: 'High-contrast display serif typeface.',
      href: '/foundry/typefaces/gullhamrar',
      image: `${carouselBase}/carousel-gullhamrar/carousel-gullhamrar-1200.jpg`,
      fontFamily: 'TGGullhamrar',
      fontStyle: 'normal',
      displayText: 'Gullhamrar'
    },
    {
      title: 'Rót',
      subtitle: 'TG Rót',
      subtitleSecondary: '3-Axis Variable Sans',
      description: '3-axis variable sans with weight and width control.',
      href: '/foundry/typefaces/root',
      image: `${carouselBase}/carousel-raetur/carousel-raetur-1200.jpg`,
      fontFamily: 'TGRoot',
      fontStyle: 'normal',
      displayText: 'Rót'
    },
    {
      title: 'Dylgjur',
      subtitle: 'TG Dylgjur',
      subtitleSecondary: 'Editorial Sans Serif',
      description: 'Sharp, condensed forms designed for critical prose and essays.',
      href: '/foundry/typefaces/dylgjur',
      image: `${carouselBase}/carousel-dylgjur/carousel-dylgjur-1200.jpg`,
      fontFamily: 'TGDylgjur',
      fontStyle: 'normal',
      displayText: 'Dylgjur'
    },
    {
      title: 'Tröllatunga',
      subtitle: 'TG Tröllatunga',
      subtitleSecondary: 'Display Typeface',
      description: 'Bold expressive display font for impactful messaging.',
      href: '/foundry/typefaces/trollatunga',
      image: `${carouselBase}/carousel-trollatunga/carousel-trollatunga-1200.jpg`,
      fontFamily: 'TGTrollatunga',
      fontStyle: 'normal',
      displayText: 'Tröllatunga'
    }
  ]

  return (
    <>
      <SEO
        title="Type Foundry — Kolkrabbi"
        description="Free, open-source typefaces designed for real-world applications. Download custom fonts under SIL OFL license."
        ogTitle="Kolkrabbi Type Foundry"
        ogDescription="Discover free, open-source typefaces for design projects"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry"
        canonical="https://kolkrabbi.io/foundry"
      />
      <main className="min-h-screen w-full bg-surface-primary mb-16">
      {/* Hero Section */}
      <OverviewHero
        badge="Type Foundry"
        title="Kolkrabbi Foundry"
        description="A growing collection of custom typefaces designed for real-world applications. Each font is built with specimens, documentation, and free licensing."
        categories={['Free & Open Source', 'Variable Fonts', 'SIL OFL 1.1']}
      />

      {/* Featured Typeface */}
      <FeaturedCarousel
        items={featuredCarousel}
        sectionLabel="Featured Typeface"
        buttonLabel="Explore Typeface"
      />

      {/* Quick Links */}
      <FeaturesCardSection
        sectionClassName="w-full py-16"
        wrapperClassName="max-w-[1400px] mx-auto flex flex-col gap-6"
        headerClassName="w-full"
        headerTextWidthClass="w-full md:w-[40%]"
        headerLabel="Navigation"
        headerDescription="Jump into core sections of the foundry"
        cardsWrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        features={quickLinkFeatures}
        showHeader={true}
        showActions={true}
        buttonGroupClassName="pt-6"
        buttonAlign="center"
        actions={[
          {
            label: 'Browse Typefaces',
            variant: 'primary',
            href: '/foundry/typefaces'
          },
          {
            label: 'Contact Foundry',
            variant: 'secondary',
            href: 'mailto:hello@kolkrabbi.io'
          }
        ]}
      />

      {/* Interactive Metrics Inspector */}
      <section className="w-full flex items-center h-[720px]">
        <div className="max-w-[1400px] mx-auto">
          <FoundryFeatureSection
            label="Interactive Tool"
            title="Interactive Metrics Inspector"
            description="Explore glyph metrics with variable font controls. Adjust weight, italic, and select different characters to see how metrics change."
            descriptionClassName="kol-mono-sm text-fg-64 mb-6"
            graphicWrapperClassName="w-full lg:flex-1"
            cta={{
              to: '/foundry/typefaces/malromur',
              label: 'Launch Inspector',
              className: 'mt-8'
            }}
            graphic={
              <div className="bg-container-primary rounded-[4px] w-full aspect-[10/6] overflow-hidden border border-fg-08">
                <img
                  src={`${cdnBase}/foundry-global/03-overview-card/card-${theme === 'dark' ? 'dark' : 'light'}/foundry-card-1200.jpg`}
                  srcSet={`
                    ${cdnBase}/foundry-global/03-overview-card/card-${theme === 'dark' ? 'dark' : 'light'}/foundry-card-400.jpg 400w,
                    ${cdnBase}/foundry-global/03-overview-card/card-${theme === 'dark' ? 'dark' : 'light'}/foundry-card-800.jpg 800w,
                    ${cdnBase}/foundry-global/03-overview-card/card-${theme === 'dark' ? 'dark' : 'light'}/foundry-card-1200.jpg 1200w,
                    ${cdnBase}/foundry-global/03-overview-card/card-${theme === 'dark' ? 'dark' : 'light'}/foundry-card-1600.jpg 1600w
                  `}
                  sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 700px"
                  alt="Interactive Metrics Inspector preview showing glyph metrics and variable font controls"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            }
          />
        </div>
      </section>

      {/* Variable Font Pressure Demo */}
      <section className="w-full flex items-center h-[720px]">
        <div className="max-w-[1400px] mx-auto">
          <FoundryFeatureSection
            label="Variable Demo"
            title="Variable Font Interactive Demo"
            description="Move your cursor over the text to see dynamic variable font axis transformations. Width and weight respond to cursor proximity."
            descriptionClassName="kol-mono-sm text-fg-64 mb-6"
            imagePosition="right"
            graphicWrapperClassName="w-full lg:flex-1"
            cta={{
              to: '/foundry/typefaces',
              label: 'Explore Variable Fonts',
              className: 'mt-8'
            }}
            graphic={
              <div className="bg-surface-inverse rounded-[4px] w-full aspect-[10/6] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <TextPressureHero
                    text="FOUNDRY"
                    showDebugBorder={false}
                    containerWidth="100%"
                    containerHeight="100%"
                  />
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Start Using These Fonts"
        description="All fonts are free to download and use. No registration required."
        action={{
          to: "/foundry/typefaces",
          label: "Download Fonts"
        }}
      />
    </main>
    </>
  )
}

export default FoundryOverview
