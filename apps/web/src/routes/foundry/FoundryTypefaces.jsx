import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pill, FoundryCTA, ViewToggle } from '@kol/ui'

const FoundryTypefaces = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [viewMode, setViewMode] = useState('list') // 'card' or 'list'

  const typefaces = [
    {
      name: 'TG Málrómur',
      subtitle: 'Variable Italic Serif',
      description: 'A contemporary italic variable font for editorial design',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, slnt)',
      link: '/foundry/malromur',
      specimens: [
        { name: 'Variable Axis', link: '/specimen/two' },
        { name: 'Prose Styles', link: '/specimen/prose' }
      ]
    },
    {
      name: 'TG Root',
      subtitle: '3-Axis Variable Sans',
      description: 'Precise geometric sans serif with variable weight and width axes',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, wdth)',
      link: '/foundry/root',
      specimens: []
    },
    {
      name: 'TG Tröllatunga',
      subtitle: 'Troll Tongue',
      description: 'Display typeface with expressive character',
      classification: 'Display',
      status: 'Available',
      year: '2025',
      styles: 'Regular',
      link: '/foundry/trollatunga',
      specimens: []
    },
    {
      name: 'TG Dylgjur',
      subtitle: 'Falsehood',
      description: 'Sharp angles and pointed character for critical discourse',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Regular',
      link: '/foundry/dylgjur',
      specimens: []
    },
    {
      name: 'TG Gullhamrar',
      subtitle: 'Compliment',
      description: 'Variable weight typeface with warm, graceful forms',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/gullhamrar',
      specimens: []
    },
  ]

  const upcomingTypefaces = [
    {
      name: 'TG Silfurbarki',
      subtitle: 'Silver Bark',
      description: 'Display typeface for those with a voice like silver',
      classification: 'Display',
      status: 'In Development',
      year: '2026',
      styles: 'Regular'
    },
    {
      name: 'TG Orðspor',
      subtitle: 'Reputation',
      description: 'Variable weight typeface for impactful statements',
      classification: 'Sans Serif',
      status: 'In Development',
      year: '2026',
      styles: 'Variable (wght)'
    },
    {
      name: 'TG Einbreið',
      subtitle: 'Single Width',
      description: 'Monospaced for technical applications and code',
      classification: 'Monospace',
      status: 'In Development',
      year: '2026',
      styles: 'Variable (wght)'
    }
  ]

  const featuredFont = typefaces[0] // Málrómur

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Featured Hero */}
      <section className="w-full px-8 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <h1 className="kol-display-section text-auto mb-4">All fonts</h1>
            <p className="kol-mono-sm text-fg-64 max-w-[800px]">
              Browse our full lineup of fonts—versatile workhorses, iconic showstoppers, and everything in between.
              Each typeface is crafted to perform, obsessively detailed, and free to try.
            </p>
          </div>

          {/* Featured Font Card */}
          <Link to={featuredFont.link}>
            <div className="relative w-full h-[600px] bg-container-primary rounded overflow-hidden group">
              {/* Badge */}
              <div className="absolute top-6 right-6 z-10">
                <Pill variant="inverse" size="md">New</Pill>
              </div>

              {/* Large Type Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2
                  className="text-[144px] text-auto leading-none"
                  style={{
                    fontFamily: 'TGMalromur',
                    fontStyle: 'italic',
                    fontWeight: 400
                  }}
                >
                  Málrómur
                </h2>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-surface-primary to-transparent">
                <p className="kol-mono-sm text-auto mb-2">{featuredFont.subtitle}</p>
                <p className="kol-mono-xs text-fg-64">{featuredFont.styles}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Typefaces Grid */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <div className="flex justify-between items-end">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="kol-heading-lg text-auto">All Typefaces</h2>
                  <Pill variant="subtle" size="sm">{typefaces.length} Available</Pill>
                </div>
                <p className="kol-mono-sm text-fg-64">Browse our complete library</p>
              </div>

              {/* View Toggle */}
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            </div>
          </div>

          {/* Card View */}
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {typefaces.map((typeface, index) => (
                <Link key={typeface.link} to={typeface.link}>
                  <div className="group group-hover:bg-surface-inverse rounded hover:shadow-lg transition-all duration-300 h-[500px] relative border border-fg-64">
                    {/* Details at Top */}
                    <div className="p-6 space-y-2 group-hover:opacity-0 transition-opacity duration-300 relative z-10">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="kol-helper-lg text-auto group-hover:text-auto-inverse transition-colors">
                          {typeface.name}
                        </h3>
                      </div>
                      <p className="kol-helper-s text-fg-64 group-hover:text-fg-inverse-64 transition-colors">
                        {typeface.styles}
                      </p>
                    </div>

                    {/* Preview Area */}
                    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end justify-start p-8">
                      {/* Default: Ðð */}
                      <div
                        className="text-auto group-hover:text-auto-inverse text-[140px] lg:text-[160px] leading-none transition-all duration-300 group-hover:opacity-0 relative z-10"
                        style={{
                          fontFamily:
                            typeface.name === 'TG Root' ? 'TGRoot' :
                            typeface.name === 'TG Tröllatunga' ? 'TGTrollatunga' :
                            typeface.name === 'TG Dylgjur' ? 'TGDylgjur' :
                            typeface.name === 'TG Gullhamrar' ? 'TGGullhamrar' :
                            'TGMalromur',
                          fontStyle: typeface.name === 'TG Málrómur' ? 'italic' : 'normal',
                          fontWeight: 400
                        }}
                      >
                        Ðð
                      </div>
                    </div>

                    {/* Hover: Sentence - Covers entire card */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p
                        className="text-auto-inverse text-4xl lg:text-5xl leading-tight text-center"
                        style={{
                          fontFamily:
                            typeface.name === 'TG Root' ? 'TGRoot' :
                            typeface.name === 'TG Tröllatunga' ? 'TGTrollatunga' :
                            typeface.name === 'TG Dylgjur' ? 'TGDylgjur' :
                            typeface.name === 'TG Gullhamrar' ? 'TGGullhamrar' :
                            'TGMalromur',
                          fontStyle: typeface.name === 'TG Málrómur' ? 'italic' : 'normal',
                          fontWeight: 400
                        }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {typefaces.map((typeface, index) => (
                <Link key={typeface.link} to={typeface.link}>
                  <div className="group group-hover:bg-surface-inverse rounded hover:shadow-lg transition-all duration-300 h-[180px] relative my-4 border border-fg-64">
                    <div className="flex items-center justify-between p-8 h-full">
                      {/* Left: Info */}
                      <div className="flex-shrink-0 w-[280px] group-hover:opacity-0 transition-opacity duration-300 relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="kol-helper-lg text-auto group-hover:text-auto-inverse transition-colors">
                            {typeface.name}
                          </h3>
                        </div>
                        <p className="kol-helper-s text-fg-64 group-hover:text-fg-inverse-64 transition-colors">{typeface.styles}</p>
                      </div>

                      {/* Right: Alphabet Preview */}
                      <div className="flex-1 overflow-hidden group-hover:opacity-0 transition-opacity duration-300 relative z-10">
                        <p
                          className="text-auto group-hover:text-auto-inverse text-4xl lg:text-5xl whitespace-nowrap transition-colors"
                          style={{
                            fontFamily:
                              typeface.name === 'TG Root' ? 'TGRoot' :
                              typeface.name === 'TG Tröllatunga' ? 'TGTrollatunga' :
                              typeface.name === 'TG Dylgjur' ? 'TGDylgjur' :
                              typeface.name === 'TG Gullhamrar' ? 'TGGullhamrar' :
                              typeface.name === 'TG Silfurbarki' ? 'TGSilfurbarki' :
                              typeface.name === 'TG Orðspor' ? 'TGOrdspor' :
                              'TGMalromur',
                            fontStyle: typeface.name === 'TG Málrómur' ? 'italic' : 'normal',
                            fontWeight: 400
                          }}
                        >
                          AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
                        </p>
                      </div>
                    </div>

                    {/* Hover: Sentence - Covers entire row */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p
                        className="text-auto-inverse text-4xl lg:text-5xl leading-tight text-center"
                        style={{
                          fontFamily:
                            typeface.name === 'TG Root' ? 'TGRoot' :
                            typeface.name === 'TG Tröllatunga' ? 'TGTrollatunga' :
                            typeface.name === 'TG Dylgjur' ? 'TGDylgjur' :
                            typeface.name === 'TG Gullhamrar' ? 'TGGullhamrar' :
                            'TGMalromur',
                          fontStyle: typeface.name === 'TG Málrómur' ? 'italic' : 'normal',
                          fontWeight: 400
                        }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detailed View (Optional - can remove if you prefer pure grid) */}
      <section className="w-full px-8 py-16 hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-8">
            {typefaces.map((typeface, index) => (
              <div
                key={typeface.name}
                className="group bg-container-primary p-8 lg:p-12 rounded-sm hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Preview */}
                  <div className="lg:col-span-2 aspect-[16/9] bg-surface-secondary rounded-sm flex items-center justify-center p-8">
                    <div className="text-center">
                      <div
                        className="text-auto text-8xl mb-4"
                        style={{
                          fontFamily: typeface.name === 'TG Root' ? 'TGRoot' : 'TGMalromur',
                          fontStyle: typeface.name === 'TG Root' ? 'normal' : 'italic',
                          fontWeight: 400
                        }}
                      >
                        {typeface.name === 'TG Root' ? 'Root' : 'Málrómur'}
                      </div>
                      <div
                        className="text-auto text-2xl opacity-60"
                        style={{
                          fontFamily: typeface.name === 'TG Root' ? 'TGRoot' : 'TGMalromur',
                          fontStyle: typeface.name === 'TG Root' ? 'normal' : 'italic'
                        }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-auto text-4xl font-normal font-['TGMalromur'] leading-tight mb-2">
                        {typeface.name}
                      </h3>
                      <p className="kol-text-md text-fg-64 italic mb-4">
                        {typeface.subtitle}
                      </p>
                      <p className="kol-text-sm text-fg-64">
                        {typeface.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="kol-label-mono-xs text-fg-64">Classification</span>
                        <span className="kol-mono-xs text-auto">{typeface.classification}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="kol-label-mono-xs text-fg-64">Styles</span>
                        <span className="kol-mono-xs text-auto">{typeface.styles}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="kol-label-mono-xs text-fg-64">Release</span>
                        <span className="kol-mono-xs text-auto">{typeface.year}</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Link
                        to={typeface.link}
                        className="block w-full px-6 py-3 bg-surface-inverse text-center kol-helper-uc-s hover:bg-fg-88 transition-colors"
                      >
                        View Overview
                      </Link>

                      {typeface.specimens && typeface.specimens.length > 0 && (
                        <div className="pt-2">
                          <div className="kol-label-mono-xs text-fg-64 mb-2">Specimens</div>
                          <div className="flex flex-col gap-2">
                            {typeface.specimens.map((specimen) => (
                              <Link
                                key={specimen.link}
                                to={specimen.link}
                                className="kol-mono-xs text-auto hover:text-fg-64 transition-colors flex items-center gap-2"
                              >
                                <span>→</span>
                                {specimen.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="kol-heading-lg text-auto">In Development</h2>
              <Pill variant="subtle" size="sm">Coming Soon</Pill>
            </div>
            <p className="kol-mono-sm text-fg-64">Typefaces currently in progress</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTypefaces.map((typeface) => (
              <div
                key={typeface.name}
                className="bg-container-primary p-8 rounded-sm opacity-60"
              >
                <div className="space-y-4">
                  <div>
                    <Pill variant="subtle" size="sm" className="mb-3">{typeface.status}</Pill>
                    <h3 className="text-auto text-3xl font-normal font-['TGMalromur'] leading-tight mb-2">
                      {typeface.name}
                    </h3>
                    <p className="kol-text-sm text-fg-64 italic mb-3">
                      {typeface.subtitle}
                    </p>
                    <p className="kol-text-sm text-fg-64">
                      {typeface.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-start">
                      <span className="kol-label-mono-xs text-fg-64">Classification</span>
                      <span className="kol-mono-xs text-auto">{typeface.classification}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="kol-label-mono-xs text-fg-64">Expected</span>
                      <span className="kol-mono-xs text-auto">{typeface.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Explore Specimens"
        description="See our typefaces in action across different contexts and applications. Each specimen demonstrates real-world usage patterns."
        action={{
          to: "/foundry/specimens",
          label: "View All Specimens"
        }}
      />
    </main>
  )
}

export default FoundryTypefaces
