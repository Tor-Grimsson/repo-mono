import React from 'react'
import { SectionTitle } from '@kol/ui'

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
      <h3 className="kol-label" >Font Pairings</h3>
      <div className="w-full flex flex-col gap-6">
        {pairings.map((pairing, index) => (
          <div
            key={index}
            className="hoverFlipTheme p-6 border rounded-lg transition-colors duration-300"
            style={{ borderColor: 'var(--surface-border)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold transition-colors duration-300">
                {pairing.primary}
              </span>
              <span>+</span>
              <span className="text-2xl transition-colors duration-300">
                {pairing.secondary}
              </span>
            </div>
            <p className="text-sm transition-colors duration-300">
              {pairing.usage}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PairingsSection
