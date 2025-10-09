import React from 'react'
import { Button, SectionTitle } from '@kol/ui'

const CtaFoundry = () => {
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
      <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Questions?</h3>
      <p className="text-xl transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
        Get in touch with our team
      </p>
      <div className="flex gap-4">
        <Button variant="primary" className="w-auto">Contact Us</Button>
        <Button variant="secondary" className="w-auto">FAQ</Button>
      </div>
    </section>
  )
}

export default CtaFoundry
