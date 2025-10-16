import React from 'react'
import { FeatureGrid, FontBadge } from '@kol/ui'

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
      <FontBadge>
        OpenType Features
      </FontBadge>
      <FeatureGrid features={features} />
    </section>
  )
}

export default FeaturesSection
