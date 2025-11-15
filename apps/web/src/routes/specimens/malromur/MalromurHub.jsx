import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard, SpecimenHero } from '@kol/ui'

const SpecimenMalromurHub = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const collections = [
    {
      name: 'Prose Styles',
      typeface: 'TG Málrómur',
      subtitle: '11 Patterns',
      description: 'Eleven distinct typographic patterns for real-world contexts: editorial, scientific, legal, display, and reference applications',
      link: '/specimen/malromur/prose',
      category: 'Editorial'
    },
    {
      name: 'Complete Selection',
      typeface: 'TG Málrómur',
      subtitle: 'All Patterns',
      description: 'All eleven prose style patterns in a single continuous specimen showcasing the full range of editorial, scientific, and formal applications',
      link: '/specimen/malromur/selection',
      category: 'Specimen'
    },
    {
      name: 'Style Specifications',
      typeface: 'TG Málrómur',
      subtitle: 'Technical Reference',
      description: 'Detailed typographic specifications, measurements, and style parameters for all eleven prose patterns',
      link: '/specimen/malromur/specs',
      category: 'Reference'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Málrómur Specimens"
        subtitle="Variable serif for editorial and scholarly applications"
        description="TG Málrómur is a versatile variable serif typeface designed for long-form reading and scholarly typography. This specimen library showcases its capabilities across diverse typographic contexts."
        fontFamily="TGMalromur"
        fontStyle="italic"
      />

      {/* Collections Grid */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="text-auto text-xs font-semibold font-['TGMalromur'] uppercase tracking-widest opacity-60">
              Specimen Collections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <Link key={collection.link} to={collection.link}>
                <TypefaceCard
                  name={collection.name}
                  subtitle={`${collection.subtitle} · ${collection.typeface}`}
                  description={collection.description}
                  fontFamily="TGMalromur"
                  fontStyle="italic"
                  isActive={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Variable Font Features */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-auto text-4xl font-normal font-['TGMalromur'] leading-tight mb-4 italic">
              Variable Font Axis
            </h2>
            <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
              Single axis of continuous weight variation for precise typographic control
            </p>
          </div>

          <div className="max-w-[600px] mx-auto">
            <div className="bg-surface-primary p-12 rounded-sm">
              <div className="mb-6">
                <div className="kol-mono-xs text-fg-48 mb-2">Weight Axis</div>
                <div className="text-auto text-2xl font-normal font-['TGMalromur'] italic" style={{ fontWeight: 400 }}>
                  200–800
                </div>
              </div>
              <p className="kol-text-md text-fg-64">
                From delicate Light to commanding ExtraBold, providing complete flexibility
                for editorial hierarchies and long-form reading contexts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Typeface */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="text-auto text-4xl font-normal font-['TGMalromur'] leading-tight italic">
            About TG Málrómur
          </h2>

          <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
            A variable serif typeface designed for scholarly and editorial typography.
            With refined italics and a complete weight range, Málrómur excels in long-form
            reading contexts where clarity and character must work in harmony.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/malromur"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto text-base font-semibold font-['TGMalromur'] uppercase tracking-wider hover:bg-fg-88 transition-colors"
            >
              View Typeface Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SpecimenMalromurHub
