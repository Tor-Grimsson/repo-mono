import React from 'react'
import { StyleCard } from '../../atoms/foundry/index.js'

/**
 * StylesGrid - Grid of font weight examples
 *
 * Foundry molecule that composes multiple StyleCard atoms
 * into a responsive grid layout with hover handlers
 *
 * @param {Object} props
 * @param {Array<{label: string, weight: number, italic?: boolean}>} props.styles - Array of style objects
 * @param {Function} props.onStyleHover - Callback fired when hovering over a style
 * @param {string} props.className - Additional classes
 */
const StylesGrid = ({ styles, onStyleHover, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 h-full auto-rows-fr ${className}`.trim()}>
      {styles.map((style, index) => (
        <StyleCard
          key={`${style.label}-${index}`}
          label={style.label}
          weight={style.weight}
          italic={style.italic}
          onMouseEnter={() => onStyleHover?.(style)}
        />
      ))}
    </div>
  )
}

export default StylesGrid
