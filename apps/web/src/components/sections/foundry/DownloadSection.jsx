import React from 'react'
import { Button, SectionTitle } from '@kol/ui'

const DownloadSection = () => {
  const details = [
    { title: 'Designer', value: 'Tor Grimsson' },
    { title: 'Categories', value: 'Serif, Italic, Display' },
    { title: 'Styles', value: '4 Weights' },
    { title: 'Format', value: 'OTF, WOFF2' }
  ]

  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-8 items-center"
      style={{ '--card-opacity': '10%' }}
    >
      <h3 className="kol-label" style={{ color: 'var(--foreground)' }}>Font Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {details.map((info, index) => (
          <div
            key={index}
            className="hoverFlipTheme border rounded-lg flex flex-col gap-3 p-6 transition-colors duration-300 items-center text-center"
            style={{ borderColor: 'var(--surface-border)' }}
          >
            <h3 className="text-sm font-semibold transition-colors duration-300">
              {info.title}
            </h3>
            <p className="text-lg transition-colors duration-300">
              {info.value}
            </p>
          </div>
        ))}
      </div>
      <Button variant="primary" className="w-auto">Download TG Mairomur</Button>
    </section>
  )
}

export default DownloadSection
