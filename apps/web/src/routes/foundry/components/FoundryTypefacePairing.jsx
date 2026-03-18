import React from 'react'
import { PairingsList } from '@kol/ui'
import FoundrySection from './FoundrySection'

const FoundryTypefacePairing = () => {
  const pairings = [
    {
      leftTitle: 'Málrómur',
      leftTag: 'Body Text',
      leftDescription: 'Variable weight for nuanced discourse and extended reading',
      leftFontFamily: 'TGMalromur',
      rightTitle: 'Gullhamrar',
      rightTag: 'Headings',
      rightDescription: 'Warm, graceful forms for elegant hierarchy',
      rightFontFamily: 'TGGullhamrar'
    },
    {
      leftTitle: 'Rót',
      leftTag: 'Precision',
      leftDescription: 'Variable tuning system for technical documentation',
      leftFontFamily: 'TGRoot',
      rightTitle: 'Dylgjur',
      rightTag: 'Critique',
      rightDescription: 'Sharp angles for critical annotations and emphasis',
      rightFontFamily: 'TGDylgjur'
    },
    {
      leftTitle: 'Tröllatunga',
      leftTag: 'Mythological',
      leftDescription: 'Bold character for legendary narratives',
      leftFontFamily: 'TGTrollatunga',
      rightTitle: 'Málrómur',
      rightTag: 'Versatile',
      rightDescription: 'Balanced forms for diverse applications',
      rightFontFamily: 'TGMalromur'
    }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          label="Font Pairings"
          size="sm"
          showDropdown={false}
        />

        <PairingsList pairings={pairings} />
      </div>
    </section>
  )
}

export default FoundryTypefacePairing
