import React, { useState } from 'react'

function LayoutL2() {
  const [showGrid, setShowGrid] = useState(true)

  // Grid configuration
  const columns = 12
  const gutter = 24 // px
  const baselineGrid = 24 // px
  const marginX = 48 // px

  return (
    <div className="w-full bg-surface relative">

      {/* Grid Toggle Button - Fixed position */}
      <button
        onClick={() => setShowGrid(!showGrid)}
        className="fixed top-8 right-8 z-50 bg-surface-inverse text-auto-inverse px-4 py-2 text-xs font-['TGMalromur'] uppercase tracking-wider hover:bg-gray-800 transition-colors"
      >
        {showGrid ? 'Hide Grid' : 'Show Grid'}
      </button>

      {/* PAGE 1: TYPE SIZES SPECIMEN (from RotComplete) */}
      <section className="w-full min-h-screen bg-surface py-24 relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
            <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
              {[...Array(columns)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay - 24px with faint 8px subdivisions */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 6' }}>
              {/* Header */}
              <div className="flex justify-between items-start border-b-2 border-auto pb-4 mb-12">
            <div>
              <p className="text-auto text-[10px] font-['TGMalromur'] uppercase tracking-wider mb-2 opacity-50">
                SPECIMENS OF TG ROOT
              </p>
              <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">
                10 ROOT
              </p>
            </div>
            <div>
              <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">
                FEATURED
              </p>
              <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40 text-right">
                125
              </p>
            </div>
          </div>

          {/* 14/2 POINT */}
          <div className="mb-12 pb-8 border-b-2 border-auto">
            <div className="flex justify-between items-baseline mb-4">
              <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">14/2 POINT</p>
              <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">64.16.24.20</p>
            </div>
            <h2 className="text-auto font-['TGRoot'] text-5xl font-bold leading-tight">
              PERFORMANCES<br />
              Remarkable Country
            </h2>
          </div>

          {/* 16/2 POINT */}
          <div className="mb-12 pb-8 border-b-2 border-auto">
            <div className="flex justify-between items-baseline mb-4">
              <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">16/2 POINT</p>
              <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">50.20.24.20</p>
            </div>
            <h2 className="text-auto font-['TGRoot'] text-4xl font-bold leading-tight">
              CORRESPONDENCE<br />
              Distinguished Questions
            </h2>
          </div>

          {/* 18/2 POINT */}
          <div className="mb-12 pb-8 border-b-2 border-auto">
            <div className="flex justify-between items-baseline mb-4">
              <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">18/2 POINT</p>
              <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">70.54.24.20</p>
            </div>
            <h2 className="text-auto font-['TGRoot'] text-3xl font-bold leading-tight">
              ENTERPRICING MERCHANT<br />
              Sending Phonograph Message
            </h2>
          </div>

          {/* Two column samples */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="pb-6 border-b border-auto">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">20/2 POINT</p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">60.12.23.24</p>
              </div>
              <h3 className="text-auto font-['TGRoot'] text-2xl font-bold leading-tight">
                UNREALIZATION<br />
                Beautiful Invasions
              </h3>
            </div>

            <div className="pb-6 border-b border-auto">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">18/2 POINT</p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">59.16.22.24</p>
              </div>
              <h3 className="text-auto font-['TGRoot'] text-2xl font-bold leading-tight">
                BUREAUCRATIC GAMES<br />
                Enchanted Marches
              </h3>
            </div>

            <div className="pb-6 border-b border-auto">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">24/2 POINT</p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">54.16.22.24</p>
              </div>
              <h3 className="text-auto font-['TGRoot'] text-xl font-bold leading-tight">
                POCKET ESTIMATE<br />
                Provocation and Sensation
              </h3>
            </div>

            <div className="pb-6 border-b border-auto">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">24/2 POINT</p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">74.60.32.24</p>
              </div>
              <h3 className="text-auto font-['TGRoot'] text-xl font-bold leading-tight">
                PHOTOGRAPHERS RESOLUTION<br />
                Gorgeous, Gallant and Charming
              </h3>
            </div>

            <div className="pb-6 border-b border-auto">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">22/2 POINT</p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">47.61.32.24</p>
              </div>
              <h3 className="text-auto font-['TGRoot'] text-lg font-bold leading-tight">
                PATENT CYLINDER MACHINES<br />
                Magnificent Assortment Embelded<br />
                Extraordinary Presentation
              </h3>
            </div>

            <div className="pb-6 border-b border-auto">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-auto text-xs font-['TGMalromur'] uppercase opacity-40">20/2 POINT</p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40">40.70.32.24</p>
              </div>
              <h3 className="text-auto font-['TGRoot'] text-lg font-bold leading-tight">
                FATHOMS ROTARY MOTORS<br />
                Merry Deception Roussaelum<br />
                Supercalience Propounders
              </h3>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LayoutL2
