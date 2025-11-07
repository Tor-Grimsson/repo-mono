import React from 'react'

/**
 * DashboardGrid - Flexible grid system for chess dashboard layouts
 *
 * Layouts:
 * - '4-col': 4 columns × 200px rows (default)
 * - '6-col': 6 columns × 180px rows (dense)
 * - 'board-focus': 3fr/2fr columns × 240px rows (board emphasis)
 * - '3-col': 3 columns × 200px rows (simple)
 *
 * @param {string} layout - Grid configuration preset
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - GridCard components
 */
const DashboardGrid = ({
  layout = '4-col',
  className = '',
  children
}) => {
  const gridConfigs = {
    '4-col': 'grid-cols-4 auto-rows-[minmax(240px,_auto)]',
    '6-col': 'grid-cols-6 auto-rows-[180px]',
    'board-focus': 'grid-cols-[3fr_2fr] auto-rows-[240px]',
    '3-col': 'grid-cols-3 auto-rows-[200px]'
  }

  const gridClass = gridConfigs[layout] || gridConfigs['4-col']

  return (
    <div className={`grid ${gridClass} gap-4 w-full items-stretch ${className}`.trim()}>
      {children}
    </div>
  )
}

export default DashboardGrid
