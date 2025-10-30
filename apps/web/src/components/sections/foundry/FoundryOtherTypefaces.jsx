import { useState } from 'react'
import { TypefaceCard } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FoundryOtherTypefaces = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const typefaces = [
    {
      name: 'TRÖLLATUNGA',
      subtitle: 'Fall Foliage',
      description: 'Contextual and discretionary ligatures for improved readability'
    },
    {
      name: 'TRÖLLATUNGA',
      subtitle: 'Nordic Saga',
      description: 'Contextual and discretionary ligatures for improved readability'
    },
    {
      name: 'TRÖLLATUNGA',
      subtitle: 'Winter Frost',
      description: 'Contextual and discretionary ligatures for improved readability'
    },
    {
      name: 'TRÖLLATUNGA',
      subtitle: 'Mountain Peak',
      description: 'Contextual and discretionary ligatures for improved readability'
    }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <FoundrySection
          variant="label"
          label="Other Typefaces"
          showDropdown={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {typefaces.map((typeface, index) => (
            <TypefaceCard
              key={index}
              name={typeface.name}
              subtitle={typeface.subtitle}
              description={typeface.description}
              isActive={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoundryOtherTypefaces
