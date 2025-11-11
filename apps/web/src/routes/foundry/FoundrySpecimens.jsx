import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard, FoundryCTA, Pill, LinkWithIcon } from '@kol/ui'

const FoundrySpecimens = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const specimens = [
    {
      name: 'Gullhamrar Specimens',
      typeface: 'TG Gullhamrar',
      fontFamily: 'TGGullhamrar',
      subtitle: '1 Pattern',
      description: 'Icelandic poetry demonstrating the expressive qualities of the typeface',
      link: '/specimen/gullhamrar',
      category: 'Poetry'
    },
    {
      name: 'Málrómur Specimens',
      typeface: 'TG Málrómur',
      fontFamily: 'TGMalromur',
      fontStyle: 'italic',
      subtitle: '11 Patterns',
      description: 'Eleven typographic patterns: editorial, scientific, legal, display, and reference contexts',
      link: '/specimen/malromur',
      category: 'Editorial',
      featured: true
    },
    {
      name: 'Rót Specimens',
      typeface: 'TG Rót',
      fontFamily: 'TGRoot',
      subtitle: '1 Pattern',
      description: 'Design system typography demonstrating variable font capabilities',
      link: '/specimen/rot',
      category: 'Systems'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 py-24 lg:py-32 mt-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-[900px] mx-auto space-y-8">
          <h1 className="text-auto text-7xl font-normal font-['TGMalromur'] leading-tight">
            Specimen Library
          </h1>

          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <p className="text-auto text-2xl font-normal font-['TGMalromur'] leading-8 italic opacity-70">
            A comprehensive collection of type specimens
          </p>

          <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[700px] mx-auto pt-4">
            Each specimen demonstrates different applications and contexts for our typefaces.
            From poetry to scientific papers, from variable axis exploration to legislative documents.
          </p>
        </div>
      </section>

      {/* Featured Specimen */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="kol-label-mono-xs text-auto">Featured</span>
          </div>

          {specimens
            .filter(s => s.featured)
            .map((specimen) => (
              <div key={specimen.link} className="bg-container-primary p-12 lg:p-16 rounded">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <Pill variant="subtle" size="sm">{specimen.subtitle}</Pill>

                    <h2 className="text-auto text-6xl font-normal font-['TGMalromur'] italic leading-tight">
                      {specimen.name}
                    </h2>

                    <p className="text-auto text-2xl font-normal font-['TGMalromur'] italic opacity-60">
                      {specimen.typeface}
                    </p>

                    <p className="kol-mono-text-lg text-fg-64">
                      {specimen.description}
                    </p>

                    <div className="w-16 h-[1px] bg-fg-24" />

                    <LinkWithIcon to={specimen.link}>
                      Explore Specimen
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

      {/* All Specimens Grid */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="kol-label-mono-xs text-auto">All Specimens</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specimens.map((specimen, index) => (
              <Link key={specimen.link} to={specimen.link}>
                <TypefaceCard
                  name={specimen.name}
                  subtitle={`${specimen.subtitle} · ${specimen.typeface}`}
                  description={specimen.description}
                  fontFamily={specimen.fontFamily}
                  fontStyle={specimen.fontStyle}
                  isActive={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Prose Styles */}
      <FoundryCTA
        heading="Explore Prose Styles"
        description="Dive deeper into our comprehensive prose styles specimen, featuring 11 distinct typographic patterns for real-world applications."
        action={{
          to: "/specimen/malromur",
          label: "View Málrómur Specimens"
        }}
      />
    </main>
  )
}

export default FoundrySpecimens
