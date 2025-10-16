import React from 'react'

/**
 * GlyphItem - Single glyph character display
 *
 * Foundry atom for displaying individual glyph characters
 * Features bordered box with hover theme flip effect
 *
 * @param {Object} props
 * @param {string} props.glyph - Single character to display
 * @param {string} props.className - Additional classes
 */
const GlyphItem = ({ glyph, className = '' }) => {
  return (
    <div
      className={`hoverFlipTheme aspect-square border rounded-lg flex items-center justify-center text-3xl leading-none transition-colors duration-300 w-16 h-16 ${className}`.trim()}
      style={{
        fontFamily: 'TGMalromur',
        borderColor: 'var(--kol-border-default)'
      }}
    >
      {glyph}
    </div>
  )
}

export default GlyphItem
