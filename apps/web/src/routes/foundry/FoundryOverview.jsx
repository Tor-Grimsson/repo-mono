import { Pill, LinkWithIcon, FoundryCTA } from '@kol/ui'
import Extraction from '../../components/fontviewer/Extraction'
import malromurFont from '@kol/fontviewer/src/assets/variFont/TGMalromurItalicVF.ttf?url'

const FoundryOverview = () => {
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

            <p className="kol-text-md-rg text-auto text-[22px] max-w-[700px]">
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

                    <h2 className="text-auto text-6xl font-normal font-['TG_Malromur'] italic leading-tight">
                      {typeface.name}
                    </h2>

                    <p className="text-auto text-2xl font-normal font-['TG_Malromur'] italic opacity-60">
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
                    <div className="text-auto text-[192px] font-normal font-['TG_Malromur'] italic leading-none">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-container-primary p-8 rounded-sm">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">All Typefaces</h3>
                <p className="kol-mono-sm text-fg-64">
                  Browse the complete typeface library with detailed specifications and previews.
                </p>
                <LinkWithIcon to="/foundry/typefaces">
                  View Library
                </LinkWithIcon>
              </div>
            </div>

            <div className="bg-container-primary p-8 rounded-sm">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">Specimens</h3>
                <p className="kol-mono-sm text-fg-64">
                  Explore type specimens showing real-world applications and prose styles.
                </p>
                <LinkWithIcon to="/foundry/specimens">
                  View Specimens
                </LinkWithIcon>
              </div>
            </div>

            <div className="bg-container-primary p-8 rounded-sm">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">Licensing</h3>
                <p className="kol-mono-sm text-fg-64">
                  Free for personal and commercial use under SIL Open Font License.
                </p>
                <LinkWithIcon to="/foundry/licensing">
                  Learn More
                </LinkWithIcon>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Viewer */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-container-primary p-8 lg:p-12 rounded-sm">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <h3 className="kol-heading-sm text-auto">View Metrics Live</h3>
                <p className="kol-mono-sm text-fg-64 max-w-[600px]">
                  Interactive font metrics inspector. Click any character to view detailed measurements including baselines, ascenders, descenders, and bearings.
                </p>
              </div>

              {/* Glyph with Metrics */}
              <Extraction
                fontUrl={malromurFont}
                glyph="f"
                height={600}
                className="bg-surface-secondary rounded-sm border border-fg-08"
              />
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
  )
}

export default FoundryOverview
