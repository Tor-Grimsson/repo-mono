import { useState } from 'react'
import GridToggle from '../../../components/specimens/GridToggle'
import LeturgerdPresentationCard from './cards/LeturgerdPresentationCard'
import LigatureFflLargeCard from './cards/LigatureFflLargeCard'
import MalromurOrnamentalCard from './cards/MalromurOrnamentalCard'
import TorgrotContinuousCard from './cards/TorgrotContinuousCard'
import TorgrotBoldGridCard from './cards/TorgrotBoldGridCard'

export default function RestComplete4Selection() {
  const [showGrid, setShowGrid] = useState(true)
  const columns = 12
  const gutter = 24
  const marginX = 48
  const baselineGrid = 24

  return (
    <div className="w-full min-h-screen relative bg-surface">
      <GridToggle showGrid={showGrid} onToggle={() => setShowGrid(!showGrid)} />

      {/* Column Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-40" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
          <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            {[...Array(columns)].map((_, i) => (
              <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
            ))}
          </div>
        </div>
      )}

      {/* Baseline Grid Overlay - 24px with faint 8px subdivisions */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-40" style={{
          backgroundImage: `
            repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px),
            repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
          `
        }}></div>
      )}

      <LeturgerdPresentationCard columns={columns} gutter={gutter} marginX={marginX} />
      <LigatureFflLargeCard columns={columns} gutter={gutter} marginX={marginX} />
      <MalromurOrnamentalCard columns={columns} gutter={gutter} marginX={marginX} />
      <TorgrotContinuousCard columns={columns} gutter={gutter} marginX={marginX} />
      <TorgrotBoldGridCard columns={columns} gutter={gutter} marginX={marginX} />

    </div>
  )
}
