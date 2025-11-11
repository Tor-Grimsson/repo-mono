import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard, SpecimenHero } from '@kol/ui'

const SpecimenGullhamrarHub = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const patterns = [
    {
      name: 'Icelandic Poetry',
      typeface: 'TG Gullhamrar',
      subtitle: 'Pattern 01',
      description: 'Contemporary Icelandic poetry demonstrating the expressive qualities and dramatic character of the typeface',
      link: '/specimen/gullhamrar/poetry',
      category: 'Editorial'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Gullhamrar Specimens"
        subtitle="Expressive typography for poetry and editorial contexts"
        description="TG Gullhamrar is a display typeface designed for dramatic and expressive applications. This specimen collection showcases its use in Icelandic poetry and literary contexts."
        fontFamily="TGGullhamrar"
      />

      {/* Patterns Grid */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="text-auto text-xs font-semibold font-['TG_Malromur'] uppercase tracking-widest opacity-60">
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

          <h2 className="text-auto text-4xl font-normal font-['TG_Gullhamrar'] leading-tight">
            About TG Gullhamrar
          </h2>

          <p className="text-auto text-lg font-normal font-['TG_Malromur'] leading-7 max-w-[600px] mx-auto">
            A dramatic display typeface with strong character and expressive qualities,
            ideal for editorial headlines, poetry, and literary applications where personality matters.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/gullhamrar"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto text-base font-semibold font-['TG_Malromur'] uppercase tracking-wider hover:bg-fg-88 transition-colors"
            >
              View Typeface Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SpecimenGullhamrarHub
