import React from 'react'
import { SectionTitle } from '@kol/ui'

const LicenseSection = () => {
  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-8 items-center text-center"
      style={{ '--card-opacity': '10%' }}
    >
      <h3 className="kol-label" >Licensing</h3>
      <p className="transition-colors duration-300" >
        TG Mairomur is available for both personal and commercial use.
        Please review our licensing terms before use.
      </p>
    </section>
  )
}

export default LicenseSection
