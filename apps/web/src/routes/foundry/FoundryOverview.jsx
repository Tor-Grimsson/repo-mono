import { Link } from 'react-router-dom'
import { Pill } from '@kol/ui'
import { glyphSets } from '@kol/ui/data'
import MetricsViewerCard from '../../components/fontviewer/MetricsViewerCard'
import malromurFont from '@kol/fontviewer/src/assets/variFont/TGMalromurItalicVF.ttf?url'

const FoundryOverview = () => {
  const typefaces = [
    {
      name: 'TG Málrómur',
      subtitle: 'Variable Italic Serif',
      description: 'An elegant italic typeface with flowing curves and refined character. Perfect for editorial design.',
      status: 'Available',
      route: '/foundry/malromur',
      featured: true
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <Pill variant="subtle">Type Foundry</Pill>

            <h1 className="kol-display-lg text-auto">
              Kolkrabbi Foundry
            </h1>

            <div className="w-32 h-[1px] bg-fg-24" />

            <p className="kol-text-lg text-auto max-w-[700px]">
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
              <Link key={typeface.route} to={typeface.route}>
                <div className="group bg-container-primary p-12 lg:p-16 rounded-sm hover:shadow-2xl transition-shadow duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div>
                        <Pill variant="subtle" size="sm" className="mb-4">{typeface.status}</Pill>
                        <h2 className="text-auto text-6xl font-normal font-['TG_Malromur'] italic leading-tight mb-3 group-hover:opacity-70 transition-opacity">
                          {typeface.name}
                        </h2>
                        <p className="text-auto text-2xl font-normal font-['TG_Malromur'] italic opacity-60 mb-4">
                          {typeface.subtitle}
                        </p>
                        <p className="kol-text-md text-fg-64">
                          {typeface.description}
                        </p>
                      </div>

                      <div className="w-16 h-[1px] bg-fg-24" />

                      <div className="inline-flex items-center gap-2 kol-helper-uc-s text-auto group-hover:gap-4 transition-all">
                        Explore Typeface
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>

                    <div className="aspect-[4/3] bg-surface-secondary rounded-sm flex items-center justify-center p-12">
                      <div className="text-center">
                        <div className="text-auto text-8xl font-normal font-['TG_Malromur'] italic">
                          Aa
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/foundry/typefaces" className="group bg-container-primary p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">All Typefaces</h3>
                <p className="kol-text-sm text-fg-64">
                  Browse the complete typeface library with detailed specifications and previews.
                </p>
                <div className="inline-flex items-center gap-2 kol-mono-xs text-auto group-hover:gap-4 transition-all">
                  View Library <span>→</span>
                </div>
              </div>
            </Link>

            <Link to="/foundry/specimens" className="group bg-container-primary p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">Specimens</h3>
                <p className="kol-text-sm text-fg-64">
                  Explore type specimens showing real-world applications and prose styles.
                </p>
                <div className="inline-flex items-center gap-2 kol-mono-xs text-auto group-hover:gap-4 transition-all">
                  View Specimens <span>→</span>
                </div>
              </div>
            </Link>

            <Link to="/foundry/licensing" className="group bg-container-primary p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">Licensing</h3>
                <p className="kol-text-sm text-fg-64">
                  Free for personal and commercial use under SIL Open Font License.
                </p>
                <div className="inline-flex items-center gap-2 kol-mono-xs text-auto group-hover:gap-4 transition-all">
                  Learn More <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Viewer */}
      <section className="w-full px-8 py-16">
        <MetricsViewerCard
          fontUrl={malromurFont}
          fontFamily="TGMalromur"
          fontStyle="italic"
          glyphs={glyphSets.lowercase}
          initialGlyph="f"
          title="View Metrics Live"
          description="Interactive font metrics inspector. Click any character to view detailed measurements including baselines, ascenders, descenders, and bearings."
        />
      </section>

      {/* Bottom CTA */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="kol-heading-lg text-auto">
            Start Using Our Fonts
          </h2>

          <p className="kol-text-lg text-auto max-w-[600px] mx-auto">
            All fonts are free to download and use in your projects. No registration required.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/typefaces"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto kol-helper-uc-md hover:bg-fg-88 transition-colors"
            >
              Download Fonts
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FoundryOverview
