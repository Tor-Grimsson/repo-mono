import SEO from '../../components/layout/SEO'
import { Pill, LinkWithIcon, FoundryCTA, QuickLinksGrid } from '@kol/ui'
import MetricsWithControls from '../../components/fontviewer/MetricsWithControls'
import TextPressureHero from '../../components/react-bits/TextPressureHero'
import malromurItalicFont from '/fonts/TGMalromurItalicVF.ttf?url'
import malromurRomanFont from '/fonts/TGMalromurRomanVF.ttf?url'

const FoundryOverview = () => {
  // Quick links data
  const quickLinks = [
    {
      title: 'All Typefaces',
      description: 'Browse the complete typeface library with detailed specifications and previews.',
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
    }
  ]

  const typefaces = [
    {
      name: 'Málrómur',
      subtitle: 'Variable Serif Typeface',
      description: 'An elegant italic typeface with flowing curves and refined character. Perfect for editorial design.',
      status: 'Available',
      route: '/foundry/malromur',
      featured: true
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
              Each font is built as a complete design system with specimens, documentation, and free licensing.
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
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="kol-label-mono-xs text-auto">Featured Typeface</span>
          </div>

          {typefaces
            .filter(t => t.featured)
            .map((typeface) => (
              <div key={typeface.route} className="bg-container-primary p-12 lg:p-16 rounded">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <Pill variant="subtle" size="sm">{typeface.status}</Pill>

                    <h2 className="text-auto text-6xl font-normal font-['TGMalromur'] italic leading-tight">
                      {typeface.name}
                    </h2>

                    <p className="text-auto text-2xl font-normal font-['TGMalromur'] italic opacity-60">
                      {typeface.subtitle}
                    </p>

                    <p className="kol-mono-text-lg text-fg-64">
                      {typeface.description}
                    </p>

                    <div className="w-16 h-[1px] bg-fg-24" />

                    <LinkWithIcon to={typeface.route}>
                      Explore Typeface
                    </LinkWithIcon>
                  </div>

                  <div className="bg-surface-secondary rounded-sm flex items-center justify-center h-full">
                    <div className="text-auto text-[192px] font-normal font-['TGMalromur'] italic leading-none">
                      Aa
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <QuickLinksGrid cards={quickLinks} />
        </div>
      </section>

      {/* Interactive Metrics Inspector */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-container-primary p-8 lg:p-12 rounded-sm">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <h3 className="kol-heading-sm text-auto">Interactive Metrics Inspector</h3>
                <p className="kol-mono-sm text-fg-64 max-w-[600px]">
                  Explore glyph metrics with variable font controls. Adjust weight, italic, and select different characters to see how metrics change.
                </p>
              </div>

              {/* Metrics Display with Controls */}
              <MetricsWithControls
                italicFontUrl={malromurItalicFont}
                romanFontUrl={malromurRomanFont}
                title="TG Málrómur"
                subtitle="Variable serif"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Variable Font Pressure Demo */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-container-primary p-8 lg:p-12 rounded-sm">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <h3 className="kol-heading-sm text-auto">Variable Font Interactive Demo</h3>
                <p className="kol-mono-sm text-fg-64 max-w-[600px]">
                  Move your cursor over the text to see dynamic variable font axis transformations. Width and weight respond to cursor proximity.
                </p>
              </div>

              {/* TextPressure Demo */}
              <div className="w-full flex justify-center py-8">
                <div
                  className="bg-surface-primary"
                  style={{
                    width: '1300px',
                    height: '600px',
                    maxWidth: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TextPressureHero
                    text="FOUNDRY"
                    showDebugBorder={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Start Using Our Fonts"
        description="All fonts are free to download and use in your projects. No registration required."
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
