import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FoundryOtherTypefaces = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const typefaces = [
    {
      name: 'TG RÓT',
      subtitle: 'Specimen 01',
      description: 'Skoðun um enga sérstaka skoðun',
      link: '/specimen/one'
    },
    {
      name: 'TG MÁLRÓMUR',
      subtitle: 'Specimen 02',
      description: 'Variable Axis Exploration',
      link: '/specimen/two'
    },
    {
      name: 'TG GULLHAMRAR',
      subtitle: 'Specimen 03',
      description: 'A Study in Prose Styles',
      link: '/specimen/prose'
    },
    {
      name: 'TG TRÖLLATUNGA',
      subtitle: 'Specimen 04',
      description: 'OpenType Features',
      link: '/specimen/four'
    },
    {
      name: 'TG LÓGARTEXTI',
      subtitle: 'Specimen 05',
      description: 'Legislative Documentation',
      link: '/specimen/five'
    }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          variant="label"
          label="Specimen"
          showDropdown={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {typefaces.map((typeface, index) => (
            <Link key={index} to={typeface.link}>
              <TypefaceCard
                name={typeface.name}
                subtitle={typeface.subtitle}
                description={typeface.description}
                isActive={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoundryOtherTypefaces
