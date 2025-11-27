import { useState } from 'react'
import GridToggle from './GridToggle'

export default function GridOverlay({
  columns = 12,
  gutter = 24,
  marginX = 48,
  columnWidth = 108,
  baselineGrid = 24,
  initialGridMode = 'columns',
  children
}) {
  const [gridMode, setGridMode] = useState(initialGridMode)

  return (
    <div className="w-full min-h-screen relative" style={{ scrollBehavior: 'smooth' }}>
      {/* Grid Toggle */}
      <GridToggle gridMode={gridMode} onToggle={(mode) => setGridMode(mode)} />

      {/* Column Grid Overlay */}
      {(gridMode === 'both' || gridMode === 'columns') && (
        <div className="absolute inset-0 pointer-events-none z-40" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
          <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, ${columnWidth}px)`, gap: `${gutter}px` }}>
            {[...Array(columns)].map((_, i) => (
              <div key={i} className="bg-blue-500/[0.02] border-l border-r border-blue-500/10"></div>
            ))}
          </div>
        </div>
      )}

      {/* Baseline Grid Overlay - 24px with faint 8px subdivisions */}
      {gridMode === 'both' && (
        <div className="absolute inset-0 pointer-events-none z-40" style={{
          backgroundImage: `
            repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px),
            repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
          `
        }}></div>
      )}

      {/* Content */}
      {children}
    </div>
  )
}
