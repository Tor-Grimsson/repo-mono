import React from 'react'

/**
 * StyleCard - Individual font weight display card
 *
 * Foundry atom for displaying a single font weight/style
 * Shows weight name and numeric weight value with hover effect
 *
 * @param {Object} props
 * @param {string} props.label - Weight label (e.g., "Bold", "Regular Italic")
 * @param {number} props.weight - Numeric weight value (100-900)
 * @param {boolean} props.italic - Whether to apply italic style
 * @param {Function} props.onMouseEnter - Callback fired on mouse enter
 * @param {string} props.className - Additional classes
 */
const StyleCard = ({ label, weight, italic = false, onMouseEnter, className = '' }) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      className={`styleButtonWithHover hoverFlipTheme text-center px-4 py-3 rounded md:rounded-lg group h-full flex flex-row items-center justify-between md:items-start ${className}`.trim()}
    >
      <span
        className="font-medium transition-colors duration-300 lg:text-2xl text-left md:self-end"
        style={{
          fontFamily: 'TGMalromur',
          fontStyle: italic ? 'italic' : 'normal',
          fontWeight: weight,
          fontSize: 'clamp(12px, calc(16px - (500px - 100vw) * 0.08), 16px)'
        }}
      >
        {label}
      </span>
      <span
        className="lg:text-2xl font-bold transition-colors duration-200 text-right md:self-start"
        style={{
          fontFamily: 'TGMalromur',
          fontSize: 'clamp(12px, calc(16px - (500px - 100vw) * 0.08), 16px)',
          color: 'var(--status-danger)'
        }}
      >
        {weight}
      </span>
    </button>
  )
}

export default StyleCard
