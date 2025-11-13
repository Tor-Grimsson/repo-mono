import { useState } from 'react'

export default function RestComplete3Grid() {
  const [showGrid, setShowGrid] = useState(true)
  const columns = 12
  const gutter = 24
  const marginX = 48
  const baselineGrid = 24

  return (
    <div className="w-full min-h-screen relative">
      {/* Grid Toggle Button */}
      <button
        onClick={() => setShowGrid(!showGrid)}
        className="fixed top-8 right-8 z-50 px-6 py-3 bg-surface-inverse text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider hover:bg-surface-inverse/80 transition-colors"
      >
        {showGrid ? 'Hide Grid' : 'Show Grid'}
      </button>

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

      <div className="w-full min-h-screen relative">

      {/* PAGE 1: BADALAMENTI PATENTED SPECIMENS - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-auto opacity-20 pb-4">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Specimens of Modern Printing Types
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              307
            </p>
          </div>

          <div className="mb-12 flex justify-between items-baseline">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] uppercase tracking-wider">
              BADALAMENTI
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              PATENTED
            </p>
          </div>

          {/* Size specimens */}
          <div className="space-y-12">
            <div className="border-b border-auto opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">36 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-tight">
                MENS Club
              </p>
            </div>

            <div className="border-b border-auto opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">30 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(26px,3.5vw,60px)] leading-tight">
                MANN broddar
              </p>
            </div>

            <div className="border-b border-auto opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">24 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(22px,3vw,48px)] leading-tight">
                QUICK Return
              </p>
            </div>

            <div className="border-b border-auto opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">24 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(22px,3vw,48px)] leading-tight">
                Order General
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">24 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(22px,3vw,48px)] leading-tight">
                EXCURSIONS<br />
                Divorce Register
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 2: SJÓFIÐLA HYRPINGSORÐ - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-auto-inverse opacity-20 pb-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Ljóðskrípi & orðhyrpingar
            </p>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              #7
            </p>
          </div>

          <div className="mb-12 flex justify-between items-baseline">
            <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(24px,3vw,48px)] uppercase tracking-wider">
              SJÓFIÐLA
            </h2>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              HYRPINGSORÐ
            </p>
          </div>

          {/* Size specimens */}
          <div className="space-y-10">
            <div className="border-b border-auto-inverse opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">36 POINT</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">18/06 2025</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-tight">
                FAGUR ER SJÓFIÐLU<br />
                bragur, setur ei
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">30 POINT</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(26px,3.5vw,60px)] leading-tight">
                SKILYRÐUM BANN!<br />
                Fettir og brettir
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">24 POINT</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(22px,3vw,48px)] leading-tight">
                ÚTHÖFUM — ELSKAN; ÉG KENNDI<br />
                honum allt sem hann kann.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">18 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-tight">
                    UNREALIZATION<br />
                    Beautiful Invasions
                  </p>
                </div>

                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">12 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.5vw,24px)] leading-tight">
                    POCKET ESTIMATE<br />
                    Provocation and Sensation
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">10 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
                    Patent cylinder machines<br />
                    magnificent Assortment Exhibitied<br />
                    1234567890
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">14 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(14px,1.8vw,28px)] leading-tight">
                    BUREAUCRATIC GAMES<br />
                    Enchanted Marches
                  </p>
                </div>

                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">10 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
                    Photographers resolution<br />
                    Gorgeous, Gallant and Charming
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">10 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
                    Patent cylinder machines<br />
                    magnificent Assortment Exhibitied<br />
                    1234567890
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 3: MODERN PRINTING TYPES - MIXED STYLES - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-auto opacity-20 pb-4">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Specimens of Modern Printing Types
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              307
            </p>
          </div>

          {/* Specimens */}
          <div className="space-y-16">
            <div className="border-b border-auto opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                Beydo-<span className="italic">MÓÝÝO</span>
              </p>
            </div>

            <div className="border-b border-auto opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight italic">
                Cempohualox
              </p>
            </div>

            <div className="border-b border-auto opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                Gentiane Kaule
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 4: MODERN PRINTING TYPES CONTINUED - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-auto-inverse opacity-20 pb-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Specimens of Modern Printing Types
            </p>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              307
            </p>
          </div>

          {/* Specimens */}
          <div className="space-y-16">
            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                Core Uppsteiti
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                Badalamenti
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight italic">
                Málþóf
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 5: MÁLRÓMUR ALMANNAR - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-auto opacity-20 pb-4">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Specimens of Modern Printing Types
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              307
            </p>
          </div>

          <h2 className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] mb-12 italic text-center">
            Málrómur
          </h2>

          {/* Specimens */}
          <div className="space-y-16">
            <div className="border-b border-auto opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">36 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-relaxed italic">
                <span className="not-italic uppercase">ALMANNAR!</span><br />
                For piano and<br />
                cornet, the best<br />
                tune on the list<br />
                <span className="not-italic">Only 24 Cents</span>
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">36 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-relaxed italic">
                <span className="not-italic uppercase">MARK DOWN</span><br />
                In prices of mining<br />
                sites and machines<br />
                for imitating eagles<br />
                and other birds.<br />
                <span className="not-italic">A choice lot at $ 3.65</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 6: GRID LAYOUT - CHARACTER COMBINATIONS - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-3 gap-12">
            {/* Column 1 */}
            <div className="space-y-8">
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none">
                MENS
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none italic">
                Club
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none">
                MANN
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none italic">
                broddar
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none">
                QUICK
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none italic">
                Return
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-8">
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none">
                Order
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none italic">
                General
              </p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-none">
                EXCUR
              </p>
            </div>
          </div>
        </div>
        
      </section>

      {/* PAGE 7: ICELANDIC POETRY DISPLAY - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full">
          <div className="space-y-12">
            <p className="text-auto font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
              FAGUR ER<br />
              SJÓFIÐLU
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(40px,5.5vw,96px)] leading-tight italic">
              bragur, setur ei<br />
              skilyrðum bann
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4.5vw,80px)] leading-tight">
              Fettir og brettir<br />
              úthöfum — Elskan
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(28px,4vw,64px)] leading-tight italic">
              ég kenndi honum<br />
              allt sem hann kann
            </p>
          </div>
        </div>
      
      </section>

      {/* PAGE 8: SIZE PROGRESSION - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">36 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-tight">
              Beautiful Invasions
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">30 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(26px,3.5vw,60px)] leading-tight">
              BUREAUCRATIC GAMES
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">24 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(22px,3vw,48px)] leading-tight">
              Enchanted Marches Tonight
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">18 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-tight">
              Photographers resolution Gorgeous display
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">14 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(14px,1.8vw,28px)] leading-tight">
              Provocation and Sensation Patent cylinder machines
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">12 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.5vw,24px)] leading-tight">
              POCKET ESTIMATE magnificent Assortment Exhibitied Gallery
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">10 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
              Gorgeous, Gallant and Charming magnificent Assortment 1234567890
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 9: TWO COLUMN MIXED - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-12 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-2 gap-16">
            {/* Left column */}
            <div className="space-y-8">
              <p className="text-auto font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight uppercase">
                ALMANNAR!
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed italic">
                For piano and cornet, the best tune on the list. Only 24 Cents for the entire collection.
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed">
                UNREALIZATION Beautiful Invasions POCKET ESTIMATE Provocation and Sensation
              </p>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              <p className="text-auto font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight uppercase italic">
                MARK DOWN
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed italic">
                In prices of mining sites and machines for imitating eagles and other birds. A choice lot at $ 3.65
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed">
                BUREAUCRATIC GAMES Enchanted Marches Photographers resolution Gorgeous display
              </p>
            </div>
          </div>
        </div>
        
      </section>

      {/* PAGE 10: FINAL TITLE PAGE - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse px-8 py-16 flex items-center justify-center relative">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          {/* Header */}
          <div className="absolute top-16 left-8">
            <p className="text-auto-inverse text-sm font-['TGMalromur'] font-bold">
              REST SPECIMEN<br />
              VOLUME THREE
            </p>
          </div>

          {/* Center content */}
          <div className="text-center space-y-12">
            <div className="space-y-8">
              <h1 className="text-auto-inverse font-['TGMalromur'] leading-none" style={{
                fontSize: 'clamp(100px, 13vw, 200px)',
                fontWeight: 700,
                letterSpacing: '-0.01em'
              }}>
                BADALAMENTI
              </h1>
              <h2 className="text-auto-inverse font-['TGMalromur'] leading-none italic" style={{
                fontSize: 'clamp(80px, 10vw, 160px)',
                fontWeight: 400,
                letterSpacing: '-0.01em'
              }}>
                Sjófiðla
              </h2>
            </div>
            <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50">
              MODERN PRINTING TYPES • SPECIMENS • HYRPINGSORÐ
            </p>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-[0.3em] opacity-40">
              KOLKRABBI VINNUSTOFA • MMXXV
            </p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-16 right-8">
            <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-70">
              2025
            </p>
          </div>
        </div>
      
      </section>

    </div>

    </div>
  )
}
