import React from 'react'
import { PairingCard } from '../../atoms/foundry/index.js'

/**
 * PairingsList - Vertical list of font pairings
 *
 * Foundry molecule that composes multiple PairingCard atoms
 * into a vertical list with consistent spacing
 *
 * @param {Object} props
 * @param {Array<{primary: string, secondary: string, usage: string}>} props.pairings - Array of pairing objects
 * @param {string} props.className - Additional classes
 */
const PairingsList = ({ pairings, className = '' }) => {
  return (
    <div className={`w-full flex flex-col gap-6 ${className}`.trim()}>
      {pairings.map((pairing, index) => (
        <PairingCard
          key={index}
          primary={pairing.primary}
          secondary={pairing.secondary}
          usage={pairing.usage}
        />
      ))}
    </div>
  )
}

export default PairingsList
