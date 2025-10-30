import React from 'react'
import { PairingsList } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FoundryTypefacePairing = () => {
  const pairings = [
    {
      leftTitle: 'Málrómur',
      leftTag: 'Standard',
      leftDescription: 'Default character forms with standard ligatures',
      rightTitle: 'Málrómur',
      rightTag: 'Stylistic',
      rightDescription: 'Alternative character forms for unique typographic expression'
    },
    {
      leftTitle: 'Málrómur',
      leftTag: 'Regular Weight',
      leftDescription: 'Balanced weight for body text and extended reading',
      rightTitle: 'Málrómur',
      rightTag: 'Bold Weight',
      rightDescription: 'Increased weight for emphasis and hierarchy'
    },
    {
      leftTitle: 'Málrómur',
      leftTag: 'Roman Style',
      leftDescription: 'Upright letterforms for primary content',
      rightTitle: 'Málrómur',
      rightTag: 'Italic Style',
      rightDescription: 'Slanted letterforms for emphasis and quotes'
    },
    {
      leftTitle: 'Málrómur',
      leftTag: 'Light Weight',
      leftDescription: 'Delicate appearance for elegant, refined typography',
      rightTitle: 'Málrómur',
      rightTag: 'Black Weight',
      rightDescription: 'Maximum weight for strong impact and attention'
    }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
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

export default FoundryTypefacePairing
