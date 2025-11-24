import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard, SpecimenHero } from '@kol/ui'

const SpecimenRotHub = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const patterns = [
    {
      name: 'Complete Specimen',
      typeface: 'TG Rót',
      subtitle: 'Pattern 01',
      description: 'Full typeface specimen showcasing character set, applications, and real-world usage',
      link: '/foundry/specimen/rot/complete',
      category: 'Specimen'
    },
    {
      name: 'Design System Typography',
      typeface: 'TG Rót',
      subtitle: 'Pattern 02',
      description: 'Complete type scale demonstrating variable font capabilities in structured design systems',
      link: '/foundry/specimen/rot/design-systems',
      category: 'Systems'
    },
    {
      name: 'Specimen Selection 1',
      typeface: 'TG Rót',
      subtitle: 'Ligatures & Character Set',
      description: 'Comprehensive ligature overview, waterfall display, complete character set, and specimen details',
      link: '/foundry/specimen/rot/rest-1-selection',
      category: 'Specimen'
    },
    {
      name: 'Specimen Selection 2',
      typeface: 'TG Rót',
      subtitle: 'Poetry & Weight Variations',
      description: 'Icelandic poetry applications, modern printing types, and variable weight demonstrations',
      link: '/foundry/specimen/rot/rest-2-selection',
      category: 'Specimen'
    },
    {
      name: 'Specimen Selection 3',
      typeface: 'TG Rót',
      subtitle: 'Display & Size Progression',
      description: 'Editorial display applications, Icelandic poetry showcase, and typographic size scales',
      link: '/foundry/specimen/rot/rest-3-selection',
      category: 'Specimen'
    },
    {
      name: 'Specimen Selection 4',
      typeface: 'TG Rót',
      subtitle: 'Ornamental & Grid Layouts',
      description: 'Leturgerd presentation, large-scale ligatures, ornamental styling, and grid-based compositions',
      link: '/foundry/specimen/rot/rest-4-selection',
      category: 'Specimen'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Rót Specimens"
        subtitle="Variable sans-serif for design systems"
        description="TG Rót is a variable sans-serif typeface with two axes—weight and width—designed specifically for structured design systems. Complete typographic hierarchy from display to utility sizes."
        fontFamily="TGRoot"
        fontWeight={700}
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

      {/* Variable Font Features */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-auto text-4xl font-normal font-['TGRoot'] leading-tight mb-4" style={{ fontWeight: 700 }}>
              Variable Font Axes
            </h2>
            <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
              Two axes of continuous variation for precise typographic control
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-primary p-12 rounded-sm">
              <div className="mb-6">
                <div className="kol-mono-xs text-fg-48 mb-2">Weight Axis</div>
                <div className="text-auto text-2xl font-normal font-['TGRoot']" style={{ fontWeight: 400 }}>
                  100–900
                </div>
              </div>
              <p className="kol-text-md text-fg-64">
                Nine weights from Thin to Black, providing complete flexibility for hierarchical typography
              </p>
            </div>

            <div className="bg-surface-primary p-12 rounded-sm">
              <div className="mb-6">
                <div className="kol-mono-xs text-fg-48 mb-2">Width Axis</div>
                <div className="text-auto text-2xl font-normal font-['TGRoot']" style={{ fontWeight: 400 }}>
                  100–400
                </div>
              </div>
              <p className="kol-text-md text-fg-64">
                Narrow to Extended proportions for spatial efficiency and emphasis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Typeface */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="text-auto text-4xl font-normal font-['TGRoot'] leading-tight" style={{ fontWeight: 700 }}>
            About TG Rót
          </h2>

          <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
            A variable sans-serif typeface designed for the demands of modern design systems.
            With two variable axes and a complete type scale, Rót provides systematic control
            for digital products and interfaces.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/root"
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

export default SpecimenRotHub
