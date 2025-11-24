import SEO from '../../components/layout/SEO'
import { Pill, FoundryCTA } from '@kol/ui'
import FoundryFeatureSection from '../../components/sections/foundry/FoundryFeatureSection'
import MetricsWithControls from '../../components/fontviewer/MetricsWithControls'
import TextPressureHero from '../../components/react-bits/TextPressureHero'
import malromurItalicFont from '/fonts/TGMalromurItalicVF.ttf?url'
import malromurRomanFont from '/fonts/TGMalromurRomanVF.ttf?url'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'
import FeaturedCarousel from '../../components/sections/shared/FeaturedCarousel'

const FoundryOverview = () => {
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
      to: '/foundry/specimens',
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
      to: '/specimen/malromur',
      linkLabel: 'View Prose Styles'
    }
  ]

  const quickLinkVisuals = [
    '/img/home/feat-1.png',
    '/img/home/feat-3.png',
    '/img/home/feat-2.png',
    '/img/home/feat-4.png'
  ]

  const quickLinkIcons = ['type', 'dashboard-book-open', 'shield', 'text']

  const quickLinkFeatures = quickLinks.map((link, index) => ({
    title: link.title,
    description: link.description,
    href: link.to,
    icon: quickLinkIcons[index % quickLinkIcons.length],
    visual: quickLinkVisuals[index % quickLinkVisuals.length],
    backgroundColor: 'bg-surface-on-inverse'
  }))

  const featuredCarousel = [
    {
      title: 'Málrómur',
      subtitle: 'TG Málrómur',
      subtitleSecondary: 'Variable Serif Typeface',
      description: 'Italic typeface for editorial systems.',
      href: '/foundry/malromur',
      image: '/img/highlights/highlight-1-malromur.png',
      fontFamily: 'TGMalromur',
      fontStyle: 'italic',
      displayText: 'Málrómur'
    },
    {
      title: 'Gullhamrar',
      subtitle: 'TG Gullhamrar',
      subtitleSecondary: 'Variable Display Serif',
      description: 'High-contrast display serif typeface.',
      href: '/foundry/gullhamrar',
      image: '/img/typefaces/gullhamrar/set-f-01.png',
      fontFamily: 'TGGullhamrar',
      fontStyle: 'normal',
      displayText: 'Gullhamrar'
    },
    {
      title: 'Rót',
      subtitle: 'TG Rót',
      subtitleSecondary: '3-Axis Variable Sans',
      description: '3-axis variable sans with weight and width control.',
      href: '/foundry/root',
      image: '/img/typefaces/rot/set-g-01.png',
      fontFamily: 'TGRoot',
      fontStyle: 'normal',
      displayText: 'Rót'
    },
    {
      title: 'Dylgjur',
      subtitle: 'TG Dylgjur',
      subtitleSecondary: 'Editorial Sans Serif',
      description: 'Sharp, condensed forms designed for critical prose and essays.',
      href: '/foundry/dylgjur',
      image: '/img/typefaces/dylgjur/set-b-01.png',
      fontFamily: 'TGDylgjur',
      fontStyle: 'normal',
      displayText: 'Dylgjur'
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
      <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 pt-24 pb-24 lg:pt-36 lg:pb-36 mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <Pill variant="inverse">Type Foundry</Pill>

            <h1 className="kol-display-lg text-auto">
              Kolkrabbi Foundry
            </h1>

            <div className="w-32 h-[1px] bg-fg-24" />

            <p className="kol-mono-text text-fg-64 max-w-[700px]">
              A growing collection of custom typefaces designed for real-world applications.
              Each font is built with specimens, documentation, and free licensing.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Pill variant="subtle">Free & Open Source</Pill>
              <Pill variant="subtle">Variable Fonts</Pill>
              <Pill variant="subtle">SIL OFL 1.1</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Typeface */}
      <FeaturedCarousel
        items={featuredCarousel}
        sectionLabel="Featured Typeface"
        buttonLabel="Explore Typeface"
      />

      {/* Quick Links */}
      <FeaturesCardSection
        sectionClassName="w-full px-8 py-16"
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
      <section className="w-full flex items-center h-[720px] px-8">
        <div className="max-w-[1400px] mx-auto">
          <FoundryFeatureSection
            label="Interactive Tool"
            title="Interactive Metrics Inspector"
            description="Explore glyph metrics with variable font controls. Adjust weight, italic, and select different characters to see how metrics change."
            descriptionClassName="kol-mono-sm text-fg-64 mb-6"
            graphicWrapperClassName="w-full lg:flex-1"
            cta={{
              to: '/foundry/malromur',
              label: 'Launch Inspector',
              className: 'mt-8'
            }}
            graphic={
              <div className="bg-container-primary rounded-[4px] h-full min-h-[400px] flex items-center justify-center">
                <MetricsWithControls
                  italicFontUrl={malromurItalicFont}
                  romanFontUrl={malromurRomanFont}
                  title="TG Málrómur"
                  subtitle="Variable serif"
                  showControls={false}
                  className="w-full h-full"
                  condensed
                  extractionProps={{ stretchGlyph: true, aspectRatio: '4 / 3', height: 400 }}
                />
              </div>
            }
          />
        </div>
      </section>

      {/* Variable Font Pressure Demo */}
      <section className="w-full flex items-center h-[720px] px-8">
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
              <div className="bg-surface-inverse rounded-[4px] h-full min-h-[400px] flex items-center justify-center">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ aspectRatio: '4 / 3', height: '400px', maxWidth: '100%' }}
                >
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
