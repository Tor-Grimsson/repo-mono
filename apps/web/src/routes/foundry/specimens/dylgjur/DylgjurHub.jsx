import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard, SpecimenHero } from '@kol/ui'

const SpecimenDylgjurHub = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const patterns = [
    {
      name: 'Curated Selection',
      typeface: 'TG Dylgjur',
      subtitle: 'Pattern 01',
      description: 'Curated specimen selection showcasing character set, ligatures, and typographic applications',
      link: '/foundry/specimen/dylgjur/selection',
      category: 'Specimen'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Dylgjur Specimens"
        subtitle="Contemporary serif for editorial and display"
        description="TG Dylgjur is a distinctive serif typeface with character and warmth. This specimen collection demonstrates its versatility across editorial layouts and display applications."
        fontFamily="TGDylgjur"
      />

      {/* Patterns Grid */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="text-auto text-xs font-semibold font-['TGMalromur'] uppercase tracking-widest opacity-60">
              Available Patterns
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

          <h2 className="text-auto text-4xl font-normal font-['TGDylgjur'] leading-tight">
            About TG Dylgjur
          </h2>

          <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
            A contemporary serif typeface with warmth and character, designed for editorial work
            where personality and readability must coexist. Perfect for magazines, books, and
            branding where a distinctive voice is needed.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/dylgjur"
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

export default SpecimenDylgjurHub
