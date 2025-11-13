import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard, SpecimenHero } from '@kol/ui'

const SpecimenGullhamrarHubGrid = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [showGrid, setShowGrid] = useState(true)

  const columns = 12
  const gutter = 24
  const marginX = 48
  const baselineGrid = 24

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
    <main className="min-h-screen w-full bg-auto">
      {/* Grid Toggle Button */}
      <button
        onClick={() => setShowGrid(!showGrid)}
        className="fixed top-8 right-8 z-50 px-6 py-3 bg-black text-white text-sm font-['TGMalromur'] uppercase tracking-wider hover:bg-black/80 transition-colors"
      >
        {showGrid ? 'Hide Grid' : 'Show Grid'}
      </button>

      {/* Column Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-40" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
          <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            {[...Array(columns)].map((_, i) => (
              <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
            ))}
          </div>
        </div>
      )}

      {/* Baseline Grid Overlay - 24px with faint 8px subdivisions */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-40" style={{
          backgroundImage: `
            repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px),
            repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
          `
        }}></div>
      )}

      {/* Hero Section */}
      <section style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
            <SpecimenHero
              title="Gullhamrar Specimens"
              subtitle="Expressive typography for poetry and editorial contexts"
              description="TG Gullhamrar is a display typeface designed for dramatic and expressive applications. This specimen collection showcases its use in Icelandic poetry and literary contexts."
              fontFamily="TGGullhamrar"
            />
          </div>
        </div>
      </section>

      {/* Patterns Grid */}
      <section className="w-full py-16" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12 mb-8">
            <span className="text-black text-xs font-semibold font-['TGMalromur'] uppercase tracking-widest opacity-60">
              Available Patterns
            </span>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-6">
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
      <section className="w-full py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12 md:col-span-8 md:col-start-3 text-center space-y-8">
            <div className="w-32 h-[1px] bg-black/20 mx-auto" />

            <h2 className="text-auto text-4xl font-normal font-['TGGullhamrar'] leading-tight">
              About TG Gullhamrar
            </h2>

            <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
              A dramatic display typeface with strong character and expressive qualities,
              ideal for editorial headlines, poetry, and literary applications where personality matters.
            </p>

            <div className="pt-4">
              <Link
                to="/foundry/gullhamrar"
                className="inline-block px-12 py-4 bg-black text-white text-base font-semibold font-['TGMalromur'] uppercase tracking-wider hover:bg-black/80 transition-colors"
              >
                View Typeface Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SpecimenGullhamrarHubGrid
