import React from 'react'
import { PairingsList } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FoundryTypefacePairingRoot = () => {
  const pairings = [
    {
      leftTitle: 'Rót',
      leftTag: 'Narrow Width',
      leftDescription: 'Condensed forms for space-efficient layouts',
      rightTitle: 'Rót',
      rightTag: 'Wide Width',
      rightDescription: 'Expanded forms for emphasis and display'
    },
    {
      leftTitle: 'Rót',
      leftTag: 'Light Weight',
      leftDescription: 'Delicate appearance for refined, minimal typography',
      rightTitle: 'Rót',
      rightTag: 'Black Weight',
      rightDescription: 'Maximum weight for strong impact and attention'
    },
    {
      leftTitle: 'Rót',
      leftTag: 'Regular Weight',
      leftDescription: 'Balanced weight for body text and UI elements',
      rightTitle: 'Rót',
      rightTag: 'Bold Weight',
      rightDescription: 'Increased weight for emphasis and hierarchy'
    },
    {
      leftTitle: 'Rót',
      leftTag: 'Condensed Bold',
      leftDescription: 'Space-efficient forms with strong presence',
      rightTitle: 'Rót',
      rightTag: 'Wide Regular',
      rightDescription: 'Expanded forms with balanced weight'
    }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          variant="label"
          label="Font Pairings"
          showDropdown={false}
        />

        <PairingsList pairings={pairings} />
      </div>
    </section>
  )
}

export default FoundryTypefacePairingRoot
