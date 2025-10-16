import React from 'react'
import { SectionTitle } from '@kol/ui'

const CarouselSection = () => {
  // Placeholder for future carousel implementation
  const fonts = ['Font 1', 'Font 2', 'Font 3', 'Font 4']

  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-8"
      style={{ '--card-opacity': '10%' }}
    >
      <h3 className="kol-label" >View Other Fonts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fonts.map((font, index) => (
          <div
            key={index}
            className="hoverFlipTheme p-8 border rounded-lg text-center transition-colors duration-300 cursor-pointer"
            style={{ borderColor: 'var(--kol-border-default)' }}
          >
            <div className="text-4xl font-bold mb-4 transition-colors duration-300">
              Aa
            </div>
            <p className="transition-colors duration-300">
              {font}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CarouselSection
