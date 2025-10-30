import React from 'react'
import { ImageSection } from '@kol/ui'
import FoundryHero from '../components/sections/foundry/FoundryHero'
import FoundryStyleSection from '../components/sections/foundry/FoundryStyleSection'
import FontPreviewSection from '../components/sections/foundry/FontPreviewSection'
import VariableFontSection from '../components/sections/foundry/VariableFontSection'
import FoundryCharacterSets from '../components/sections/foundry/FoundryCharacterSets'
import FoundryOpentypeFeatures from '../components/sections/foundry/FoundryOpentypeFeatures'
import FoundryTypefaceDetails from '../components/sections/foundry/FoundryTypefaceDetails'
import FoundryLicenseQuestions from '../components/sections/foundry/FoundryLicenseQuestions'
import FoundryOtherTypefaces from '../components/sections/foundry/FoundryOtherTypefaces'
import FoundryTypefacePairing from '../components/sections/foundry/FoundryTypefacePairing'
import CtaGlobal from '../components/sections/cta/CtaGlobal'

export default function Foundry() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div>
        <FoundryHero />
      </div>

      <ImageSection src="/img/tgm/hero.png" alt="TG Málrómur showcase" />
      <FoundryStyleSection />

      <ImageSection src="/img/features/card-item-base-7.png" alt="TG Málrómur showcase" />
      <FontPreviewSection />

      <ImageSection src="/img/features/card-item-base-1.png" alt="TG Málrómur showcase" />
      <VariableFontSection />

      <FoundryCharacterSets />

      <ImageSection src="/img/features/card-item-base-6.png" alt="TG Málrómur showcase" />

      <FoundryOpentypeFeatures />

      <FoundryTypefaceDetails />
      <FoundryLicenseQuestions />

      <div className="main-wrapper">
        <div className="card-wrapper">
          <FoundryTypefacePairing />
        </div>
        <div className="card-wrapper">
          <FoundryOtherTypefaces />
        </div>
      </div>

      <CtaGlobal />
    </main>
  )
}
