import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard } from '@kol/ui'

const FoundrySpecimens = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const specimens = [
    {
      name: 'TG RÓT',
      subtitle: 'Specimen 01',
      description: 'Skoðun um enga sérstaka skoðun',
      link: '/specimen/one',
      category: 'Poetry'
    },
    {
      name: 'TG MÁLRÓMUR',
      subtitle: 'Specimen 02',
      description: 'Variable Axis Exploration',
      link: '/specimen/two',
      category: 'Variable'
    },
    {
      name: 'TG GULLHAMRAR',
      subtitle: 'Specimen 03',
      description: 'A Study in Prose Styles',
      link: '/specimen/prose',
      category: 'Prose',
      featured: true
    },
    {
      name: 'TG TRÖLLATUNGA',
      subtitle: 'Specimen 04',
      description: 'OpenType Features',
      link: '/specimen/four',
      category: 'Scientific'
    },
    {
      name: 'TG LÓGARTEXTI',
      subtitle: 'Specimen 05',
      description: 'Legislative Documentation',
      link: '/specimen/five',
      category: 'Legal'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 py-24 lg:py-32 flex flex-col items-center justify-center text-center">
        <div className="max-w-[900px] mx-auto space-y-8">
          <h1 className="text-auto text-7xl font-normal font-['TG_Malromur'] leading-tight">
            Specimen Library
          </h1>

          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <p className="text-auto text-2xl font-normal font-['TG_Malromur'] leading-8 italic opacity-70">
            A comprehensive collection of type specimens
          </p>

          <p className="text-auto text-lg font-normal font-['TG_Malromur'] leading-7 max-w-[700px] mx-auto pt-4">
            Each specimen demonstrates different applications and contexts for our typefaces.
            From poetry to scientific papers, from variable axis exploration to legislative documents.
          </p>
        </div>
      </section>

      {/* Featured Specimen */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="text-auto text-xs font-semibold font-['TG_Malromur'] uppercase tracking-widest opacity-60">
              Featured
            </span>
          </div>

          {specimens
            .filter(s => s.featured)
            .map((specimen, index) => (
              <Link key={specimen.link} to={specimen.link}>
                <div className="group bg-container-primary p-12 lg:p-16 rounded-sm hover:shadow-2xl transition-shadow duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div>
                        <div className="text-auto text-xs font-semibold font-['TG_Malromur'] uppercase tracking-widest mb-2 opacity-60">
                          {specimen.subtitle}
                        </div>
                        <h2 className="text-auto text-6xl font-medium font-['TG_Malromur'] leading-tight mb-3 group-hover:opacity-70 transition-opacity">
                          {specimen.name}
                        </h2>
                        <p className="text-auto text-2xl font-normal font-['TG_Malromur'] italic opacity-60">
                          {specimen.description}
                        </p>
                      </div>

                      <div className="w-16 h-[1px] bg-fg-24" />

                      <div className="inline-flex items-center gap-2 text-auto text-sm font-semibold font-['TG_Malromur'] uppercase tracking-wider group-hover:gap-4 transition-all">
                        Explore specimen
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>

                    <div className="aspect-[4/3] bg-surface-secondary rounded-sm flex items-center justify-center">
                      <div className="text-auto text-8xl font-normal font-['TG_Malromur'] italic opacity-20">
                        Aa
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* All Specimens Grid */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="text-auto text-xs font-semibold font-['TG_Malromur'] uppercase tracking-widest opacity-60">
              All Specimens
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specimens.map((specimen, index) => (
              <Link key={specimen.link} to={specimen.link}>
                <TypefaceCard
                  name={specimen.name}
                  subtitle={specimen.subtitle}
                  description={specimen.description}
                  isActive={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Prose Styles */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="text-auto text-4xl font-normal font-['TG_Malromur'] leading-tight">
            Explore Prose Styles
          </h2>

          <p className="text-auto text-lg font-normal font-['TG_Malromur'] leading-7 max-w-[600px] mx-auto">
            Dive deeper into our comprehensive prose styles specimen, featuring 8 distinct typographic patterns for real-world applications.
          </p>

          <div className="pt-4">
            <Link
              to="/specimen/prose"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto text-base font-semibold font-['TG_Malromur'] uppercase tracking-wider hover:bg-fg-88 transition-colors"
            >
              View Prose Styles
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FoundrySpecimens
