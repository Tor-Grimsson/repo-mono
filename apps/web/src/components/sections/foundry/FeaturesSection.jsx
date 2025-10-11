import React from 'react'

const FeaturesSection = () => {
  const features = [
    {
      title: 'Stylistic Alternates',
      description: 'Alternative character forms for enhanced typographic expression'
    },
    {
      title: 'Ligatures',
      description: 'Contextual and discretionary ligatures for improved readability'
    },
    {
      title: 'Kerning Pairs',
      description: 'Optimized spacing between character pairs'
    },
    {
      title: 'Extended Language Support',
      description: 'Support for Latin, Cyrillic, and Greek character sets'
    }
  ]

  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-8"
      style={{ '--card-opacity': '10%' }}
    >
      <div className="fontBadge">
        OpenType Features
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="hoverFlipTheme border rounded-lg flex flex-col gap-3 p-6 transition-colors duration-300"
            style={{ borderColor: 'var(--surface-border)' }}
          >
            <h3 className="font-bold transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
