import React from 'react'

/**
 * PairingCard - Font pairing display card
 *
 * Foundry atom for displaying font pairing recommendations
 * Shows primary + secondary font with usage context
 *
 * @param {Object} props
 * @param {string} props.primary - Primary font name
 * @param {string} props.secondary - Secondary font name
 * @param {string} props.usage - Usage context description
 * @param {string} props.className - Additional classes
 */
const PairingCard = ({
  primary,
  secondary,
  usage,
  secondaryUsage,
  className = ''
}) => {
  return (
    <div
      className={`bg-auto rounded-lg border border-auto p-4 md:p-6 transition-colors duration-300 ${className}`.trim()}
    >
      <div className="flex flex-row gap-4 items-center">
        <div className="flex-1 space-y-2">
          <div className="kol-heading-sm text-auto">{primary}</div>
          {usage && <div className="kol-mono-xs opacity-60 text-auto">{usage}</div>}
        </div>

        <div className="bg-fg w-[4px] h-[100px]" />

        <div className="flex-1 space-y-2 text-right">
          <div className="kol-heading-sm text-auto">{secondary}</div>
          {(secondaryUsage || usage) && (
            <div className="kol-mono-xs opacity-60 text-auto">{secondaryUsage || usage}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PairingCard
