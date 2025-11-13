import React, { useState } from 'react'

function LayoutL1() {
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

      {/* PAGE 1: GRID SYSTEM INTRODUCTION */}
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

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-24">
            <h1 className="text-auto font-['TGRoot'] text-[clamp(72px,9vw,160px)] leading-none mb-8" style={{ fontWeight: 700 }}>
              Grid<br />System
            </h1>
            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2vw,32px)] leading-relaxed" style={{ maxWidth: '600px' }}>
              A modular approach to typographic layout based on Swiss design principles.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 4' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Columns
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                {columns}-column grid system with {gutter}px gutters
              </p>
            </div>

            <div style={{ gridColumn: 'span 4' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Baseline
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                {baselineGrid}px baseline grid for vertical rhythm
              </p>
            </div>

            <div style={{ gridColumn: 'span 4' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Margins
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                {marginX}px horizontal margins
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2: 12-COLUMN DEMONSTRATION */}
      <section className="w-full min-h-screen bg-[#f5f1e8] py-24 relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
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

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Layout Demonstration
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              12 Columns
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ gridColumn: 'span 1' }} className="bg-surface-inverse/5 border border-auto/10 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-sm font-bold">{i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 3: 6-COLUMN (2×6) LAYOUT */}
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

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Two Column Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              6 + 6
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 6' }} className="bg-surface-inverse p-12">
              <h3 className="text-auto-inverse font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Left Column
              </h3>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                Spanning 6 columns with {gutter}px gutter. Typography aligned to baseline grid for vertical rhythm and visual consistency.
              </p>
            </div>

            <div style={{ gridColumn: 'span 6' }} className="bg-[#f5f1e8] p-12">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Right Column
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                Equal width columns create balanced compositions. Grid system provides structure while maintaining flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4: 4-COLUMN (3×4) LAYOUT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] py-24 relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
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

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Three Column Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              4 + 4 + 4
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 4' }} className="bg-surface p-8 border border-auto/10">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column 1
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                Each column spans 4 grid columns, creating a balanced three-column layout ideal for cards, galleries, or modular content.
              </p>
              <div className="w-full h-32 bg-surface-inverse/5"></div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="bg-surface p-8 border border-auto/10">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column 2
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                Grid system allows for consistent spacing and alignment across all elements while maintaining visual hierarchy.
              </p>
              <div className="w-full h-32 bg-surface-inverse/5"></div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="bg-surface p-8 border border-auto/10">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column 3
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                Systematic approach to layout creates harmony and rhythm throughout the composition.
              </p>
              <div className="w-full h-32 bg-surface-inverse/5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 5: ASYMMETRIC LAYOUT (8 + 4) */}
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

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Asymmetric Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              8 + 4
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 8' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Primary Content Area
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed mb-8">
                Þetta er aðalefnissvæðið sem spannar 8 dálka. Stærra svæði gefur meira rými fyrir meginefni, myndir, eða lengri texta. Ójafnvægi í umbrotinu skapar áhugaverðan mismun og leiðir auganu um síðuna.
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                Griðkerfið heldur öllu í samræmi þrátt fyrir ójafnt hlutfall. Typography fylgir grunnlínu kerfinu og skapar samfellu í gegnum allt skipulagið.
              </p>
              <div className="w-full h-64 bg-surface-inverse/5 mt-8"></div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="space-y-6">
              <div className="bg-[#f5f1e8] p-6">
                <h4 className="text-auto font-['TGRoot'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Sidebar
                </h4>
                <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  4 column sidebar for supporting content, metadata, or navigation.
                </p>
              </div>

              <div className="bg-[#f5f1e8] p-6">
                <h4 className="text-auto font-['TGRoot'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Notes
                </h4>
                <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  Supplementary information aligned to the grid.
                </p>
              </div>

              <div className="bg-[#f5f1e8] p-6">
                <h4 className="text-auto font-['TGRoot'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Metadata
                </h4>
                <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  Date, author, or other contextual details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 6: EDITORIAL LAYOUT (3 + 6 + 3) */}
      <section className="w-full min-h-screen bg-[#1a1d23] py-24 relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
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

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-16">
            <p className="text-auto-inverse font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Editorial Layout
            </p>
            <h2 className="text-auto-inverse font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              3 + 6 + 3
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 3' }}>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(11px,1.2vw,14px)] uppercase tracking-widest opacity-60 mb-4">
                Chapter 01
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed opacity-80">
                Margin notes and annotations provide context without interrupting reading flow.
              </p>
            </div>

            <div style={{ gridColumn: 'span 6' }}>
              <h3 className="text-auto-inverse font-['TGRoot'] text-[clamp(36px,4.5vw,72px)] leading-tight mb-8" style={{ fontWeight: 700 }}>
                Griðkerfi í íslenskri hönnun
              </h3>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(15px,1.6vw,20px)] leading-relaxed mb-6">
                Svissnesk hönnunarregla byggir á kerfisbundnum nálgun þar sem allt efni er skipulagt eftir griði. Þessi aðferð tryggir samræmi, skýrleika og fagurfræðilegt jafnvægi í gegnum allt verkið.
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(15px,1.6vw,20px)] leading-relaxed mb-6">
                Með því að nota 12 dálka kerfi getum við skipt umbrotinu á margan hátt - frá einföldum tvískiptum umbrotum til flóknari þríggja eða fjögurra dálka setningar. Rifin á milli dálka, eða gutterar, halda efninu aðskildu og læsilegu.
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(15px,1.6vw,20px)] leading-relaxed">
                Grunnlínukerfi tryggir að textinn sitji á föstum línum sem endurtaka sig niður síðuna. Þetta skapar lóðrétt takt sem gerir umbrotið rólegra og samhæfðara.
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }}>
              <div className="w-full aspect-square bg-surface/5 mb-6"></div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(11px,1.2vw,14px)] leading-relaxed opacity-60">
                Fig. 1.1 — Grid system demonstration showing column divisions and baseline rhythm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 7: COMPLEX GRID COMBINATION */}
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

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Complex Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none mb-8" style={{ fontWeight: 700 }}>
              Mixed Grid
            </h2>
          </div>

          <div className="grid mb-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 12' }} className="bg-surface-inverse p-12">
              <h3 className="text-auto-inverse font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
                Full Width Header
              </h3>
            </div>
          </div>

          <div className="grid mb-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 7' }} className="bg-[#f5f1e8] p-8">
              <h4 className="text-auto font-['TGRoot'] text-[clamp(28px,3.5vw,56px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                7 Columns
              </h4>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                Asymmetric layouts create dynamic compositions while maintaining grid discipline.
              </p>
            </div>

            <div style={{ gridColumn: 'span 5' }} className="bg-[#f5f1e8] p-8">
              <h4 className="text-auto font-['TGRoot'] text-[clamp(28px,3.5vw,56px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                5 Columns
              </h4>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                Flexible grid allows for varied proportions and hierarchies.
              </p>
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 3' }} className="bg-[#f5f1e8] p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }} className="bg-[#f5f1e8] p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }} className="bg-[#f5f1e8] p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }} className="bg-[#f5f1e8] p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 8: BASELINE GRID DEMONSTRATION */}
      <section className="w-full min-h-screen bg-[#f5f1e8] py-24 relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
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

        {/* Baseline Grid Overlay - More visible */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.2) 0px, rgba(239, 68, 68, 0.2) 1px, transparent 1px, transparent ${baselineGrid}px)`
          }}></div>
        )}

        <div className="relative z-10">
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Vertical Rhythm
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none mb-6" style={{ fontWeight: 700 }}>
              Baseline Grid
            </h2>
            <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed" style={{ maxWidth: '800px' }}>
              All text aligns to a {baselineGrid}px baseline grid creating consistent vertical rhythm throughout the layout.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 4', lineHeight: `${baselineGrid}px` }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,48px)] mb-6" style={{ fontWeight: 700, lineHeight: `${baselineGrid * 2}px` }}>
                Large Heading
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)]" style={{ lineHeight: `${baselineGrid}px` }}>
                Text snaps to baseline grid lines, creating visual harmony and making multi-column layouts easier to balance.
              </p>
            </div>

            <div style={{ gridColumn: 'span 4', lineHeight: `${baselineGrid}px` }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,48px)] mb-6" style={{ fontWeight: 700, lineHeight: `${baselineGrid * 2}px` }}>
                Medium Text
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)]" style={{ lineHeight: `${baselineGrid}px` }}>
                Notice how all baselines align across columns. This systematic approach creates order and rhythm.
              </p>
            </div>

            <div style={{ gridColumn: 'span 4', lineHeight: `${baselineGrid}px` }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,48px)] mb-6" style={{ fontWeight: 700, lineHeight: `${baselineGrid * 2}px` }}>
                Alignment
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)]" style={{ lineHeight: `${baselineGrid}px` }}>
                Grid provides structure while typography provides hierarchy and meaning within that structure.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LayoutL1
