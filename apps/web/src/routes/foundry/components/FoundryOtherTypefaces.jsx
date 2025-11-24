import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypefaceCard } from '@kol/ui'
import FoundrySection from './FoundrySection'

const FoundryOtherTypefaces = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const typefaces = [
    {
      name: 'TG MÁLRÓMUR',
      subtitle: 'Discourse',
      description: 'Variable typeface for nuanced communication',
      link: '/foundry/malromur',
      fontFamily: 'TGMalromur'
    },
    {
      name: 'TG RÓT',
      subtitle: 'Foundation',
      description: 'Variable tuning system for precise control',
      link: '/foundry/root',
      fontFamily: 'TGRoot'
    },
    {
      name: 'TG DYLGJUR',
      subtitle: 'Falsehood',
      description: 'Sharp angles for critical discourse',
      link: '/foundry/dylgjur',
      fontFamily: 'TGDylgjur'
    },
    {
      name: 'TG GULLHAMRAR',
      subtitle: 'Compliment',
      description: 'Variable weight with warm, graceful forms',
      link: '/foundry/gullhamrar',
      fontFamily: 'TGGullhamrar'
    },
    {
      name: 'TG ORÐSPOR',
      subtitle: 'Etymology',
      description: 'Variable typeface tracing linguistic roots',
      link: '/foundry/ordspor',
      fontFamily: 'TGOrdspor'
    },
    {
      name: 'TG SILFURBARKI',
      subtitle: 'Silver Bark',
      description: 'Elegant letterforms inspired by birch trees',
      link: '/foundry/silfurbarki',
      fontFamily: 'TGSilfurbarki'
    },
    {
      name: 'TG TRÖLLATUNGA',
      subtitle: 'Troll Tongue',
      description: 'Bold character for mythological narratives',
      link: '/foundry/trollatunga',
      fontFamily: 'TGTrollatunga'
    }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          variant="label"
          label="Explore Typefaces"
          showDropdown={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {typefaces.map((typeface, index) => (
            <Link key={index} to={typeface.link}>
              <TypefaceCard
                name={typeface.name}
                subtitle={typeface.subtitle}
                description={typeface.description}
                fontFamily={typeface.fontFamily}
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
