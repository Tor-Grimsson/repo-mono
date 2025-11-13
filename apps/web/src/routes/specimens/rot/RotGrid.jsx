import React, { useState } from 'react'

export default function RotGrid() {
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

      {/* SECTION 1: CHARACTER SET (from RotComplete Section 4) */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
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
            <div style={{ gridColumn: 'span 9' }}>
              {/* Header */}
              <h2 className="text-auto-inverse text-4xl font-normal font-['TGMalromur'] mb-12">
                Characters
              </h2>

              {/* Main character display */}
              <div className="relative bg-gray-800 rounded-3xl p-12 mb-16 overflow-hidden">
                {/* Character set */}
                <div className="relative z-10 text-auto-inverse" style={{ fontFamily: 'TGRoot', fontWeight: 500 }}>
                  <div className="text-7xl leading-tight mb-3">AÁÆBCDÐÉFG</div>
                  <div className="text-7xl leading-tight mb-3">HÍÍJKLMNÓÖpP</div>
                  <div className="text-7xl leading-tight mb-3">QÖRSTUÝVWX</div>
                  <div className="text-6xl leading-tight mb-3">§|aáðçdðéf@</div>
                  <div className="text-6xl leading-tight mb-3">gğhíjklmnóöpb</div>
                  <div className="text-6xl leading-tight mb-3">¶*qrstúývwxyz..</div>
                  <div className="text-7xl leading-tight">0123456789!?</div>
                </div>
              </div>

              {/* Weight list */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12">
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-auto-inverse font-['TGRoot'] text-xl" style={{ fontWeight: 100 }}>
                      TG Root Thin
                    </span>
                    <span className="text-auto-inverse font-['TGMalromur'] text-sm italic opacity-60">
                      italic
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-auto-inverse font-['TGRoot'] text-xl" style={{ fontWeight: 300 }}>
                      TG Root Light
                    </span>
                    <span className="text-auto-inverse font-['TGMalromur'] text-sm italic opacity-60">
                      italic
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-auto-inverse font-['TGRoot'] text-xl" style={{ fontWeight: 400 }}>
                      TG Root Regular
                    </span>
                    <span className="text-auto-inverse font-['TGMalromur'] text-sm italic opacity-60">
                      italic
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-auto-inverse font-['TGRoot'] text-xl" style={{ fontWeight: 700 }}>
                      TG Root Bold
                    </span>
                    <span className="text-auto-inverse font-['TGMalromur'] text-sm italic opacity-60">
                      italic
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-auto-inverse font-['TGRoot'] text-xl" style={{ fontWeight: 900 }}>
                      TG Root Black
                    </span>
                    <span className="text-auto-inverse font-['TGMalromur'] text-sm italic opacity-60">
                      italic
                    </span>
                  </div>
                </div>

                {/* Full character set small */}
                <div className="text-auto-inverse text-xs font-['TGMalromur'] leading-relaxed opacity-60 flex flex-col justify-end">
                  <p className="mb-2">AÁÆBCDÐÉFGHÍJKLMNÓÖPPQRSTUÝVWXYZÞ</p>
                  <p className="mb-2">aáæbcdðéfghíjklmnóöppqrstuývwxyzþ</p>
                  <p>0123456789 !?@#$%&amp;*()[]&#123;&#125;|/\-_+=&lt;&gt;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TYPE SIZES (from RotComplete Section 7) */}
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
            <div style={{ gridColumn: 'span 9' }}>
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

      {/* SECTION 3: GERMAN CATALOGUE (from RotComplete2 Section 1) */}
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
            <div style={{ gridColumn: 'span 9' }}>
              {/* Cover */}
              <div className="mb-32">
                <div className="mb-12">
                  <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider mb-2 opacity-40">
                    Ausstellungskatalog
                  </p>
                  <h1 className="text-auto font-['TGRoot'] text-8xl font-black leading-none mb-6" style={{ fontWeight: 900 }}>
                    Dieter<br />Bauhman
                  </h1>
                  <p className="text-auto font-['TGRoot'] text-2xl font-normal leading-tight opacity-60" style={{ fontWeight: 400 }}>
                    Stille Geometrien
                  </p>
                </div>

                <div className="border-t-2 border-auto pt-6">
                  <p className="text-auto text-sm font-['TGMalromur'] leading-relaxed opacity-70">
                    Museum für Moderne Kunst Frankfurt<br />
                    14 März – 18 Juni 2025
                  </p>
                </div>
              </div>

              {/* Interior spread */}
              <div className="grid grid-cols-2 gap-16 mb-32">
                <div>
                  <h2 className="text-auto font-['TGRoot'] text-4xl font-bold leading-tight mb-6" style={{ fontWeight: 700 }}>
                    Katalog
                  </h2>
                  <div className="space-y-4 text-auto text-sm font-['TGMalromur'] leading-relaxed">
                    <p className="opacity-70">
                      Die Ausstellung präsentiert fünfzig Jahre minimalistischer Malerei von Dieter Bauhman, einem der bedeutendsten deutschen Künstler der Nachkriegszeit.
                    </p>
                    <p className="opacity-70">
                      Seine Werke zeichnen sich durch strenge geometrische Formen und eine reduzierte Farbpalette aus, die an die Bauhaus-Tradition anknüpfen.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-auto pl-4">
                    <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                      Werk Nr. 47
                    </p>
                    <p className="text-auto text-xs font-['TGMalromur'] opacity-60">
                      Öl auf Leinwand, 200 × 150 cm, 1987
                    </p>
                  </div>

                  <div className="border-l-4 border-auto pl-4">
                    <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                      Werk Nr. 52
                    </p>
                    <p className="text-auto text-xs font-['TGMalromur'] opacity-60">
                      Öl auf Leinwand, 180 × 180 cm, 1991
                    </p>
                  </div>

                  <div className="border-l-4 border-auto pl-4">
                    <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                      Werk Nr. 63
                    </p>
                    <p className="text-auto text-xs font-['TGMalromur'] opacity-60">
                      Acryl auf Leinwand, 220 × 160 cm, 2003
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SUZANNE CIANI (from RotComplete2 Section 6) */}
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
            <div style={{ gridColumn: 'span 9' }}>
              <div className="space-y-16">
                {/* Title page */}
                <div className="space-y-8">
                  <div>
                    <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider mb-6 opacity-40">
                      Electronic Music Performance · 1975
                    </p>
                    <h1 className="text-auto font-['TGRoot'] text-8xl font-black leading-none mb-4" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                      SUZANNE<br />
                      CIANI
                    </h1>
                    <p className="text-auto font-['TGRoot'] text-3xl font-normal opacity-70" style={{ fontWeight: 400 }}>
                      Live on the Buchla Synthesizer
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-12 pt-8 border-t-2 border-auto">
                    <div className="space-y-4">
                      <p className="text-auto text-sm font-['TGMalromur'] leading-relaxed">
                        Recorded live at WBAI Free Music Store, New York City, May 1975. Ciani performs improvised compositions on the Buchla 200 Series Modular Electronic Music System.
                      </p>
                      <p className="text-auto text-sm font-['TGMalromur'] leading-relaxed opacity-70">
                        This historic performance captures the pioneering work of one of electronic music's most innovative composers during the formative years of synthesizer music.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                        Technical Specifications
                      </h2>
                      <div className="space-y-2 text-auto text-sm font-['TGMalromur']">
                        <p><span className="font-bold">Instrument:</span> Buchla 200 Series</p>
                        <p><span className="font-bold">Format:</span> 1/4" Reel-to-Reel</p>
                        <p><span className="font-bold">Duration:</span> 47:32</p>
                        <p><span className="font-bold">Studio:</span> WBAI Radio</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Track listing */}
                <div className="space-y-6">
                  <h2 className="text-auto font-['TGRoot'] text-3xl font-bold pb-4 border-b-2 border-auto" style={{ fontWeight: 700 }}>
                    Performance Program
                  </h2>

                  <div className="space-y-6">
                    <div className="flex justify-between items-start pb-4 border-b border-auto/20">
                      <div className="flex-1">
                        <p className="text-auto font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part I: Butterfly
                        </p>
                        <p className="text-auto text-sm font-['TGMalromur'] opacity-60">
                          Exploring amplitude modulation and complex waveform interactions
                        </p>
                      </div>
                      <p className="text-auto text-sm font-['TGMalromur'] opacity-40">8:47</p>
                    </div>

                    <div className="flex justify-between items-start pb-4 border-b border-auto/20">
                      <div className="flex-1">
                        <p className="text-auto font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part II: Ocean Waves
                        </p>
                        <p className="text-auto text-sm font-['TGMalromur'] opacity-60">
                          Voltage-controlled filters creating organic soundscapes
                        </p>
                      </div>
                      <p className="text-auto text-sm font-['TGMalromur'] opacity-40">12:18</p>
                    </div>

                    <div className="flex justify-between items-start pb-4 border-b border-auto/20">
                      <div className="flex-1">
                        <p className="text-auto font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part III: The Velocity of Love
                        </p>
                        <p className="text-auto text-sm font-['TGMalromur'] opacity-60">
                          Sequential voltage control and gate patterns
                        </p>
                      </div>
                      <p className="text-auto text-sm font-['TGMalromur'] opacity-40">15:03</p>
                    </div>

                    <div className="flex justify-between items-start pb-4 border-b border-auto/20">
                      <div className="flex-1">
                        <p className="text-auto font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part IV: Industrial Landscape
                        </p>
                        <p className="text-auto text-sm font-['TGMalromur'] opacity-60">
                          Noise generators and random voltage sources
                        </p>
                      </div>
                      <p className="text-auto text-sm font-['TGMalromur'] opacity-40">11:24</p>
                    </div>
                  </div>
                </div>

                {/* Credits */}
                <div className="pt-12 border-t border-auto/20">
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-auto font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                        Credits
                      </h3>
                      <div className="space-y-2 text-auto text-sm font-['TGMalromur']">
                        <p><span className="font-bold">Performer:</span> Suzanne Ciani</p>
                        <p><span className="font-bold">Engineer:</span> Robert Margouleff</p>
                        <p><span className="font-bold">Mastering:</span> Bernie Grundman</p>
                        <p><span className="font-bold">Photography:</span> Michael Ochs</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-auto font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                        Publication Details
                      </h3>
                      <div className="space-y-2 text-auto text-sm font-['TGMalromur']">
                        <p><span className="font-bold">Publisher:</span> Finders Keepers Records</p>
                        <p><span className="font-bold">Catalog No:</span> FKR 095LP</p>
                        <p><span className="font-bold">Released:</span> October 2018</p>
                        <p><span className="font-bold">Format:</span> 180g Vinyl LP + Download</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="pt-12 border-t border-auto/20">
                  <blockquote className="text-auto text-lg font-['TGRoot'] font-normal leading-relaxed italic opacity-70" style={{ fontWeight: 400 }}>
                    "The Buchla is not an instrument you play—it's an instrument you converse with. Every patch is a dialogue between intention and surprise."
                  </blockquote>
                  <p className="text-auto text-sm font-['TGMalromur'] mt-4 opacity-50">
                    — Suzanne Ciani, 1975
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ICELANDIC POETRY (from RotComplete3 Page 1) */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
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
            <div style={{ gridColumn: 'span 10' }}>
              {/* Header */}
              <div className="flex justify-between items-start mb-24">
                <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
                  TG RÓT
                </p>
                <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
                  2025
                </p>
              </div>

              <div className="w-full h-px bg-surface opacity-30 mb-24" />

              {/* Main text */}
              <div className="space-y-12 text-auto-inverse font-['TGRoot']" style={{ fontWeight: 300 }}>
                <p className="text-[clamp(60px,8vw,120px)] leading-none">
                  Lofaðu mér epískum<br />
                  hversdagsleika,
                </p>
                <p className="text-[clamp(60px,8vw,120px)] leading-none">
                  seldu mér samsæri<br />
                  á staurfæti almúgans,
                </p>
                <p className="text-[clamp(60px,8vw,120px)] leading-none">
                  færðu mér fönix sem<br />
                  kann ekki að fljúga; reis<br />
                  ekki úr ösku og<br />
                  er of brotinn til að<br />
                  trúa á sjálfan sig.
                </p>
              </div>

              {/* Footer */}
              <div className="mt-24 pt-12 border-t border-auto-inverse/30">
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">
                  120 PT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WEIGHT SPECIMENS (from RotComplete3 Page 4) */}
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
            <div style={{ gridColumn: 'span 9' }}>
              {/* Header */}
              <div className="flex justify-between items-start mb-12">
                <p className="text-auto text-sm font-['TGMalromur'] font-bold">
                  TG RÓT
                </p>
                <p className="text-auto text-sm font-['TGMalromur'] opacity-40">
                  240 PT
                </p>
              </div>

              {/* Weight demonstrations */}
              <div className="space-y-8">
                <p className="text-auto font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 100 }}>
                  Þunnur
                </p>

                <p className="text-auto font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 300 }}>
                  Léttur
                </p>

                <p className="text-auto font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 400 }}>
                  Tíður
                </p>

                <p className="text-auto font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 700 }}>
                  Djarfur
                </p>

                <p className="text-auto font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 900 }}>
                  Þykkur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: RESUME (from RotComplete4 Page 1) */}
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
            <div style={{ gridColumn: 'span 10' }}>
              {/* Header */}
              <h1 className="text-auto font-['TGRoot'] text-5xl mb-16" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                TÓR GRÍMSSON
              </h1>

              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-16">
                {/* Left Column */}
                <div className="space-y-12">
                  {/* About */}
                  <div>
                    <h2 className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-4 opacity-50" style={{ fontWeight: 700 }}>
                      ABOUT
                    </h2>
                    <p className="text-auto font-['TGRoot'] text-sm leading-relaxed mb-4" style={{ fontWeight: 400 }}>
                      Tór is an Icelandic designer/creative with focus in on branding, illustration, form design and visual identity.
                    </p>
                    <p className="text-auto font-['TGRoot'] text-sm leading-relaxed" style={{ fontWeight: 400 }}>
                      He currently works at his studio Kolkrabbi and is based in Reykjavík.
                    </p>
                  </div>

                  {/* Contact */}
                  <div>
                    <h2 className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-4 opacity-50" style={{ fontWeight: 700 }}>
                      CONTACT
                    </h2>
                    <p className="text-auto font-['TGRoot'] text-sm leading-relaxed" style={{ fontWeight: 400 }}>
                      tor@kolkrabbi.is<br />
                      [+354] 892 2928
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-12">
                  {/* Education */}
                  <div>
                    <h2 className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-4 opacity-50" style={{ fontWeight: 700 }}>
                      EDUCATION
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>IUA</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>2015</p>
                        </div>
                        <div className="text-right">
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>Visual Comm.</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>B.A.</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>WKHS</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>2014</p>
                        </div>
                        <div className="text-right">
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>Fine Arts</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>EQF – 5/6</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>LHÍ</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>2009</p>
                        </div>
                        <div className="text-right">
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>Fine Arts</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>B.A.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-4 opacity-50" style={{ fontWeight: 700 }}>
                      EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>Kolkrabbi</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>2023</p>
                        </div>
                        <div className="text-right">
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>Designer / Art Director</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>Client Consultation</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>Tempo</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>2019</p>
                        </div>
                        <div className="text-right">
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>Graphic Designer</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>Marketing</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>TMS</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>2014</p>
                        </div>
                        <div className="text-right">
                          <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>Graphic Designer</p>
                          <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>Marketing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: INVOICE (from RotComplete4 Page 3) */}
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
            <div style={{ gridColumn: 'span 9' }}>
              {/* Logo and Contact */}
              <div className="flex justify-between items-start mb-16">
                <div className="flex items-center gap-3">
                  {/* Simple Kolkrabbi logo representation */}
                  <div className="w-8 h-8 bg-gray-800" />
                  <p className="text-auto font-['TGRoot'] text-xl" style={{ fontWeight: 700 }}>KOLKRABBI</p>
                </div>
                <div className="text-right">
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>kolkrabbi.io</p>
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>tor@kolkrabbi.io</p>
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>+354 892 2928</p>
                </div>
              </div>

              {/* Invoice Details Grid */}
              <div className="grid grid-cols-4 gap-8 mb-16">
                <div>
                  <p className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-2 opacity-50" style={{ fontWeight: 700 }}>Client</p>
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>Líf Kírópraktík</p>
                  <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>kt. 431017-1050</p>
                </div>
                <div>
                  <p className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-2 opacity-50" style={{ fontWeight: 700 }}>Date</p>
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>11/11 '25</p>
                  <p className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mt-4 mb-2 opacity-50" style={{ fontWeight: 700 }}>Due Date</p>
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>16/11 '25</p>
                </div>
                <div>
                  <p className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-2 opacity-50" style={{ fontWeight: 700 }}>Invoice nr.</p>
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>102</p>
                </div>
                <div className="text-right">
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>Þórður Grímsson</p>
                  <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>280485-2339</p>
                  <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>Skipholt 51</p>
                  <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>105 Reykjavík</p>
                </div>
              </div>

              {/* Invoice Table */}
              <div className="border border-auto/20 rounded-lg overflow-hidden">
                <div className="bg-surface-inverse/5 px-6 py-4">
                  <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 700 }}>Project</p>
                </div>
                <div className="px-6 py-6 border-b border-auto/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-auto font-['TGRoot'] text-base mb-2" style={{ fontWeight: 400 }}>Grafísk hönnun,</p>
                      <p className="text-auto font-['TGRoot'] text-base" style={{ fontWeight: 400 }}>plaköt, nafnspjöld</p>
                      <p className="text-auto font-['TGRoot'] text-sm mt-6 opacity-60" style={{ fontWeight: 400 }}>Stundir: 10</p>
                      <p className="text-auto font-['TGRoot'] text-sm opacity-60" style={{ fontWeight: 400 }}>Tímakaup: 13.000,-</p>
                    </div>
                    <p className="text-auto font-['TGRoot'] text-xl" style={{ fontWeight: 700 }}>130.000,-</p>
                  </div>
                </div>
                <div className="px-6 py-4 border-b border-auto/10">
                  <div className="flex justify-between">
                    <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>VSK 24%</p>
                    <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>0</p>
                  </div>
                </div>
                <div className="px-6 py-6 bg-surface-inverse/5">
                  <div className="flex justify-between">
                    <p className="text-auto font-['TGRoot'] text-lg" style={{ fontWeight: 700 }}>Total</p>
                    <p className="text-auto font-['TGRoot'] text-2xl" style={{ fontWeight: 700 }}>130.000,-</p>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="mt-12 pt-8 border-t border-auto/10">
                <p className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-2 opacity-50" style={{ fontWeight: 700 }}>Account</p>
                <p className="text-auto font-['TGRoot'] text-sm" style={{ fontWeight: 400 }}>Reikningsnúmer: 0123-26-001320</p>
              </div>

              {/* Terms */}
              <div className="mt-8 pt-8 border-t border-auto/10">
                <p className="text-auto font-['TGRoot'] text-xs uppercase tracking-wider mb-3 opacity-50" style={{ fontWeight: 700 }}>Terms</p>
                <p className="text-auto font-['TGRoot'] text-sm leading-relaxed" style={{ fontWeight: 400 }}>
                  Payment terms for this project are 50% upfront payment, paid by the project commencement date. The remaining 50% to be invoiced upon satisfactory project completion, payment is appreciated within 14 days of invoicing unless otherwise stated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
