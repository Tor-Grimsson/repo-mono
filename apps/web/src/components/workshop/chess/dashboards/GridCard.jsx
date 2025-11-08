import React from 'react'

/**
 * GridCard - Wrapper for components in the dashboard grid
 *
 * Span configurations:
 * - '1x1': Single cell (default)
 * - '2x1': 2 columns × 1 row
 * - '2x2': 2 columns × 2 rows
 * - '3x2': 3 columns × 2 rows
 * - '4x2': 4 columns × 2 rows (full width, double height)
 * - '1x2': 1 column × 2 rows (tall card)
 * - '3x1': 3 columns × 1 row
 * - '4x1': 4 columns × 1 row (full width strip)
 *
 * @param {string} span - Grid span configuration
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Component to display
 * @param {boolean} asCard - Wrap in card styling (for non-component content)
 */
const GridCard = ({
  span = '1x1',
  className = '',
  children,
  asCard = false
}) => {
  const spanConfigs = {
    '1x1': 'col-span-1 row-span-1',
    '2x1': 'col-span-2 row-span-1',
    '2x2': 'col-span-2 row-span-2',
    '3x2': 'col-span-3 row-span-2',
    '4x2': 'col-span-4 row-span-2',
    '4x3': 'col-span-4 row-span-3',
    '1x2': 'col-span-1 row-span-2',
    '3x1': 'col-span-3 row-span-1',
    '4x1': 'col-span-4 row-span-1'
  }

  const spanClass = spanConfigs[span] || spanConfigs['1x1']

  // If asCard, add card styling; otherwise just grid positioning
  const cardClass = asCard
    ? 'p-6 bg-fg-02 border border-fg-08 rounded flex flex-col'
    : ''

  return (
    <div className={`${spanClass} h-full ${cardClass} ${className}`.trim()}>
      {children}
    </div>
  )
}

export default GridCard
