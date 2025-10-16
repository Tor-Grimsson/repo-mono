import React from 'react'
import { PairingsList } from '@kol/ui'

const PairingsSection = () => {
  const pairings = [
    { primary: 'TG Mairomur', secondary: 'Helvetica Neue', usage: 'Editorial Design' },
    { primary: 'TG Mairomur', secondary: 'Inter', usage: 'Web Design' },
    { primary: 'TG Mairomur', secondary: 'Garamond', usage: 'Print Design' },
    { primary: 'TG Mairomur', secondary: 'Futura', usage: 'Branding' }
  ]

  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-8"
      style={{ '--card-opacity': '10%' }}
    >
      <h3 className="kol-label">Font Pairings</h3>
      <PairingsList pairings={pairings} />
    </section>
  )
}

export default PairingsSection
