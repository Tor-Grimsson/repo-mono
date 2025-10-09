import React from 'react'
import { SectionTitle } from '@kol/ui'

const LicenseSection = () => {
  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-8 items-center text-center"
      style={{
        backgroundColor: (() => {
          const isDarkMode = typeof document !== 'undefined' &&
            (document.documentElement.classList.contains('dark') ||
             document.documentElement.getAttribute('data-theme') === 'dark')
          return isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        })()
      }}
    >
      <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Licensing</h3>
      <p className="transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
        TG Mairomur is available for both personal and commercial use.
        Please review our licensing terms before use.
      </p>
    </section>
  )
}

export default LicenseSection
