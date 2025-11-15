import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard, SpecimenHero, Pill } from '@kol/ui'

const SpecimenSilfurbarkiHub = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const patterns = [
    {
      name: 'Curated Selection',
      typeface: 'TG Silfurbarki',
      subtitle: 'Pattern 01',
      description: 'Curated specimen selection with 12-column grid overlay for design reference',
      link: '/specimen/silfurbarki/selection',
      category: 'Specimen'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Silfurbarki Specimens"
        subtitle="Elegant serif in development"
        description="TG Silfurbarki is an elegant serif typeface currently in development. This early specimen showcases the direction and character of the typeface design."
        fontFamily="TGSilfurbarki"
      >
        <div className="pt-6 flex justify-center">
          <Pill variant="subtle" size="md">In Development</Pill>
        </div>
      </SpecimenHero>

      {/* Patterns Grid */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="text-auto text-xs font-semibold font-['TGMalromur'] uppercase tracking-widest opacity-60">
              Early Preview
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patterns.map((pattern, index) => (
              <Link key={pattern.link} to={pattern.link}>
                <TypefaceCard
                  name={pattern.name}
                  subtitle={`${pattern.subtitle} · ${pattern.typeface}`}
                  description={pattern.description}
                  isActive={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About the Typeface */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="text-auto text-4xl font-normal font-['TGSilfurbarki'] leading-tight">
            About TG Silfurbarki
          </h2>

          <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
            An elegant serif typeface with refined proportions and delicate details,
            currently under development at Type Guild. Stay tuned for updates as the
            design evolves toward completion.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/silfurbarki"
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

export default SpecimenSilfurbarkiHub
