import { useState } from 'react'

export default function GullhamrarComplete1Grid() {
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
        className="fixed top-8 right-8 z-50 px-6 py-3 bg-black text-white text-sm font-['TGMalromur'] uppercase tracking-wider hover:bg-black/80 transition-colors"
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

      {/* PAGE 1: TITLE PAGE - TG GULLHAMRAR - DARK */}
      <section className="w-full min-h-screen bg-black py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <p className="text-white font-['TGGullhamrar'] text-[clamp(80px,10vw,160px)] leading-none" style={{ fontWeight: 400 }}>TG</p>
              <div className="w-full max-w-[800px] h-px bg-white opacity-30" />
              <h1 className="text-white font-['TGGullhamrar'] leading-none" style={{ fontSize: 'clamp(120px, 15vw, 280px)', fontWeight: 400 }}>
                Gullhamrar
              </h1>
            </div>

            <div className="flex justify-center">
              <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2: AMPERSAND - LIGHT */}
      <section className="w-full min-h-screen bg-white py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex items-center justify-center h-full">
              <p className="text-black font-['TGGullhamrar'] leading-none" style={{ fontSize: 'clamp(200px, 25vw, 480px)', fontWeight: 400 }}>&</p>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-black text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3: LONG S (ß) - LIGHT */}
      <section className="w-full min-h-screen bg-white py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex items-center justify-center h-full">
              <p className="text-black font-['TGGullhamrar'] leading-none" style={{ fontSize: 'clamp(200px, 25vw, 480px)', fontWeight: 400 }}>ß</p>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-black text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4: WORD LIST - DARK */}
      <section className="w-full min-h-screen bg-black py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-10 text-white font-['TGGullhamrar']">
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Værð</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Deyfð</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Rénun</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Svíun</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Þögn</p>
          </div>

          <div className="col-span-12 absolute bottom-16 left-8">
            <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
          </div>
        </div>
      </section>

      {/* PAGE 5: WORD LIST - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-8 text-black font-['TGGullhamrar']">
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>MAKRÁÐUR</p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>SÆLLÍFI</p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>VELLYSTING</p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>VANAFESTA</p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>KYRRÐ</p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>RÓSEMI</p>
          </div>

          <div className="col-span-12 absolute bottom-16 left-8">
            <p className="text-black text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
          </div>
        </div>
      </section>

      {/* PAGE 6: Aa SPECIMEN - DARK */}
      <section className="w-full min-h-screen bg-black py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex items-center justify-center h-full">
              <p className="text-white font-['TGGullhamrar'] leading-none" style={{ fontSize: 'clamp(200px, 25vw, 480px)', fontWeight: 400 }}>Aa</p>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 7: WORD LIST STACKED - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-10 text-black font-['TGGullhamrar']">
            <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Kossar</p>
            <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Armlög</p>
            <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Daður</p>
            <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Flangs</p>
          </div>

          <div className="col-span-12 absolute bottom-16 left-8">
            <p className="text-black text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
          </div>
        </div>
      </section>

      {/* PAGE 8: CHARACTER DETAIL - Áb é fg */}
      <section className="w-full min-h-screen bg-white py-16 flex items-center justify-center overflow-hidden" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12">
            <p className="text-black font-['TGGullhamrar'] leading-none" style={{
              fontSize: 'clamp(180px, 22vw, 400px)',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}>
              Áb é fg
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 9: CHARACTER DETAIL - dð ghí */}
      <section className="w-full min-h-screen bg-white py-16 flex items-center justify-center overflow-hidden" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12">
            <p className="text-black font-['TGGullhamrar'] leading-none" style={{
              fontSize: 'clamp(180px, 22vw, 400px)',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}>
              dð ghí
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 10: SINGLE WORD - dynkur - DARK */}
      <section className="w-full min-h-screen bg-black py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex items-center justify-center h-full">
              <p className="text-white font-['TGGullhamrar'] leading-none" style={{ fontSize: 'clamp(120px, 15vw, 280px)', fontWeight: 400 }}>
                dynkur
              </p>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 11: SPECIAL CHARACTERS & PUNCTUATION - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-6 text-black font-['TGGullhamrar']">
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>RAUP.GORT</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 300 }}>:VELLYSTINGAR:</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>RAUP:GORT</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>&lt;LÓFAKLAPP&gt;</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 300 }}>{'{'}1.456-2559.273{'}'}</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>ÞUS & FJAS-NP</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 300 }}>*GLUNDROÐI*</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>BLÍSTUR-FLAUT</p>
            <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>[ÖNGÞVEITI]</p>
          </div>

          <div className="col-span-12 absolute bottom-16 left-8">
            <p className="text-black text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
          </div>
        </div>
      </section>

      {/* PAGE 12: SLARK - DARK */}
      <section className="w-full min-h-screen bg-black py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex items-center justify-center h-full">
              <p className="text-white font-['TGGullhamrar'] leading-none" style={{
                fontSize: 'clamp(150px, 18vw, 320px)',
                fontWeight: 700,
                letterSpacing: '0.05em'
              }}>
                SLARK
              </p>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 13: POETRY - DARK - Hafið, sæ til sólar */}
      <section className="w-full min-h-screen bg-black py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-16 text-white font-['TGGullhamrar']">
            <p className="text-[clamp(60px,8vw,128px)] leading-tight" style={{ fontWeight: 300 }}>
              Hafið,
            </p>
            <p className="text-[clamp(60px,8vw,128px)] leading-tight" style={{ fontWeight: 300 }}>
              sæ til sólar
            </p>
            <p className="text-[clamp(48px,6vw,96px)] leading-tight text-right" style={{ fontWeight: 300 }}>
              —spenntar
            </p>
          </div>

          <div className="col-span-12 absolute bottom-16 left-8">
            <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
          </div>
        </div>
      </section>

      {/* PAGE 14: LIGATURES - Ys & Þys - LIGHT */}
      <section className="w-full min-h-screen bg-white py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex items-center justify-center h-full">
              <div className="space-y-8 text-black font-['TGGullhamrar']">
                <p className="text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 700 }}>Ys &</p>
                <p className="text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 700 }}>Þys</p>
              </div>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-black text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 15: EXTENDED WORD LIST - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 space-y-6">
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
              ARGAÞRAS · HNOTABIT · ILLDEILINN ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
              ORÐASKAKI · MÁLASTAPP · ÝFINGAR ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
              HERGNÝR · HÚLLUMHÆ ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
              HNEFASTEYTINGAR · KARP · GLYMJANDI ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
              GLUNDROÐI · LÝÐSKRUM · ÞÆFINGUR ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
              MJÓRÓMA · GNÖLDUR · GLUMRUGANGUR ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
              ÍRAFÁR · KVEINSTAFIR · JÓDYNUR ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
              OFFORS · SKRÍLSLÆTI · STÍMABRAK ·
            </p>
            <p className="text-black font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
              SKVAMP · UPPIVÖÐSLUSEMI · TRAÐK
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 16: SIGNAGE/LOGO - KARP ÍSBÚÐ - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-12">
            <p className="text-black text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              RETAIL SIGNAGE APPLICATION
            </p>

            <p className="text-black font-['TGGullhamrar'] text-4xl italic" style={{ fontWeight: 400 }}>hrím</p>

            <p className="text-black font-['TGGullhamrar'] text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              KARP
            </p>

            <p className="text-black font-['TGGullhamrar'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 400 }}>
              ÍSBÚÐ
            </p>

            <div className="w-full max-w-[600px] h-32 bg-black" style={{ transform: 'skewX(-20deg)' }} />

            <div className="space-y-2 pt-8">
              <p className="text-black font-['TGGullhamrar'] text-2xl uppercase tracking-wider" style={{ fontWeight: 700 }}>
                GÖTUVEGI 17
              </p>
              <p className="text-black font-['TGGullhamrar'] text-2xl uppercase tracking-wider" style={{ fontWeight: 700 }}>
                940 FJARÐARHÖFN
              </p>
            </div>

            <p className="text-black text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50 pt-8">
              LOCATION IDENTIFIER / ADDRESS DISPLAY
            </p>
          </div>

          <div className="col-span-12 absolute bottom-16 left-8">
            <p className="text-black text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
          </div>
        </div>
      </section>

      {/* PAGE 17: WORD BROKEN ACROSS LINES - DARK */}
      <section className="w-full min-h-screen bg-black py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex items-center justify-center h-full">
              <div className="space-y-0 text-white font-['TGGullhamrar']">
                <p className="text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 700 }}>HÚLL</p>
                <p className="text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 300, WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>um</p>
                <p className="text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 700 }}>HÆ</p>
              </div>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 18: WORD LIST WITH ORGANIC SHAPES - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full relative" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 900" preserveAspectRatio="none">
            <circle cx="200" cy="300" r="120" fill="none" stroke="black" strokeWidth="2" />
            <path d="M 800 200 Q 900 300 800 400" fill="none" stroke="black" strokeWidth="2" />
            <ellipse cx="400" cy="700" rx="100" ry="150" fill="none" stroke="black" strokeWidth="2" />
          </svg>

          <div className="col-span-12 relative z-10 space-y-6 text-black font-['TGGullhamrar']">
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>fjaðrafok glumrugangur</p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>glundroði glymjandi gnauð gnöldur gorgeir</p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>hergnýr hnefasteytingar hnjask Hvassyrði húllumhæ írafár jódynur</p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>kveinstafir lýðskrum Mjóróma Mælgi Offors</p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>orustugnýr</p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>skrílslæti</p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>Skvamp</p>
          </div>
        </div>
      </section>

      {/* PAGE 19: FUM FÁT - OUTLINE/SOLID CONTRAST - DARK */}
      <section className="w-full min-h-screen bg-black py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 relative h-full">
            <div className="absolute top-16 left-0 right-0 flex justify-between">
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex flex-col items-center justify-center h-full space-y-16">
              <p className="text-white font-['TGGullhamrar'] leading-none" style={{
                fontSize: 'clamp(120px, 15vw, 280px)',
                fontWeight: 700
              }}>
                FUM
              </p>
              <p className="text-white font-['TGGullhamrar'] leading-none" style={{
                fontSize: 'clamp(120px, 15vw, 280px)',
                fontWeight: 700,
                WebkitTextStroke: '3px white',
                WebkitTextFillColor: 'transparent'
              }}>
                FÁT
              </p>
            </div>

            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 20: WORD LIST - DARK */}
      <section className="w-full min-h-screen bg-black py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-10 text-white font-['TGGullhamrar']">
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 400 }}>Glymjandi</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 400 }}>Þrusk</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 400 }}>Blístur</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 400 }}>Klamarí</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 400 }}>Moldviðri</p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 400 }}>Grobb</p>
          </div>

          <div className="col-span-12 absolute bottom-16 left-8">
            <p className="text-white text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
          </div>
        </div>
      </section>

      {/* PAGE 21: UPPERCASE ALPHABET - DARK */}
      <section className="w-full min-h-screen bg-black py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full relative" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 absolute top-0 left-0">
            <div className="w-32 h-16 rounded-full border-2 border-white flex items-center justify-center">
              <p className="text-white font-['TGMalromur'] text-xs uppercase tracking-wider">
                KOLKRABBI<br />VINNUSTOFA
              </p>
            </div>
          </div>

          <div className="col-span-12 space-y-6 text-white font-['TGGullhamrar'] pt-24">
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
              ABCDEFG
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
              HIJKLMNO
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
              PQRSTUV
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
              WXYZ&
            </p>
          </div>

          <div className="col-span-12">
            <p className="text-white text-xs font-['TGMalromur'] opacity-50 pt-12">
              Kolkrabbi Vinnustofa
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 22: LOWERCASE ALPHABET - DARK */}
      <section className="w-full min-h-screen bg-black py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full relative" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 space-y-6 text-white font-['TGGullhamrar']">
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              abcdefg
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              hijklmno
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              pqrstuv
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              wxyzß?!
            </p>
          </div>

          <div className="col-span-12 absolute bottom-16 right-8">
            <div className="w-32 h-16 rounded-full border-2 border-white flex items-center justify-center">
              <p className="text-white font-['TGMalromur'] text-xs uppercase tracking-wider">
                KOLKRABBI<br />VINNUSTOFA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 23: POEM PAGE 1 - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 flex justify-between items-start mb-16">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
          </div>

          <div className="col-span-12 space-y-8 text-black font-['TGGullhamrar']" style={{ fontWeight: 300 }}>
            <p className="text-[clamp(40px,5vw,72px)] leading-tight">
              Að tikka er sama og að haka
            </p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight text-justify">
              Að haka er að grafa sig djúpt og eyða kraftinum í að vinna bug á
            </p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight">
              einni skakkaðri hugmynd sem<br />
              birtist af handahófi, eins og þegar manni<br />
              dettur sálarfrændi í hug á miðri göngu
            </p>
            <p className="text-[clamp(28px,3.5vw,48px)] leading-tight text-justify">
              og menn verða einfaldlega að elta þá hugmynd alveg þar til
              manneskjan er komin í skelliferð einmana og þreyttur
            </p>
            <p className="text-[clamp(36px,4.5vw,64px)] leading-tight" style={{ fontWeight: 400 }}>
              eins og hundrað í hundrað<br />
              þarna á gólfinu
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 24: GRID LAYOUT - DARE SIGNAGE - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12">
            <p className="text-black text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50 mb-8">
              TYPOGRAPHIC SYSTEM / GRID APPLICATION
            </p>

            <div className="grid grid-rows-4 gap-0 border-2 border-black">
              <div className="border-b-2 border-black p-12 flex items-center justify-between">
                <p className="text-black font-['TGGullhamrar'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                  ANRÐ
                </p>
                <div className="w-24 h-12 rounded-full border-2 border-black flex items-center justify-center">
                  <p className="text-black font-['TGMalromur'] text-xs uppercase">GULL<br />HAMRAR</p>
                </div>
              </div>

              <div className="border-b-2 border-black p-12 flex items-center justify-between">
                <div className="w-24 h-12 rounded-full border-2 border-black flex items-center justify-center">
                  <p className="text-black font-['TGMalromur'] text-xs uppercase">GULL<br />HAMRAR</p>
                </div>
                <p className="text-black font-['TGGullhamrar'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                  DARE
                </p>
              </div>

              <div className="border-b-2 border-black p-12 flex items-center justify-between">
                <p className="text-black font-['TGGullhamrar'] text-6xl leading-none" style={{ fontWeight: 300 }}>
                  ⌐
                </p>
                <p className="text-black font-['TGGullhamrar'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                  DARE
                </p>
                <div className="w-24 h-12 rounded-full border-2 border-black flex items-center justify-center">
                  <p className="text-black font-['TGMalromur'] text-xs uppercase">GULL<br />HAMRAR</p>
                </div>
              </div>

              <div className="p-12 flex items-center justify-between">
                <div className="w-24 h-12 rounded-full border-2 border-black flex items-center justify-center">
                  <p className="text-black font-['TGMalromur'] text-xs uppercase">GULL<br />HAMRAR</p>
                </div>
                <p className="text-black font-['TGGullhamrar'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                  DARE
                </p>
              </div>
            </div>

            <p className="text-black text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50 mt-8">
              MODULAR BRANDING COMPONENTS
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 25: FULL CHARACTER SET SPECIMEN - LIGHT */}
      <section className="w-full min-h-screen bg-white py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 space-y-12">
            <div className="text-center space-y-2">
              <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">Presents</p>
              <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">Kolkrabbi Vinnustofa</p>
            </div>

            <div className="text-center">
              <p className="text-black font-['TGGullhamrar'] text-[clamp(60px,8vw,120px)] leading-none mb-4" style={{ fontWeight: 400 }}>
                TG
              </p>
              <p className="text-black font-['TGGullhamrar'] text-[clamp(80px,10vw,160px)] leading-none mb-8" style={{ fontWeight: 700 }}>
                Gullhamrar
              </p>
              <p className="text-black font-['TGMalromur'] text-sm">Modern Typeface</p>
              <p className="text-black font-['TGMalromur'] text-sm">Variable weight</p>
            </div>

            <div className="space-y-4 text-black font-['TGGullhamrar']">
              <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 700 }}>
                ABCDEFGHIJKLMN
              </p>
              <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 700 }}>
                OPQRSTUVWXYZ
              </p>
              <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 300 }}>
                abcdefghijklmn
              </p>
              <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 300 }}>
                opqrstuvwxyz
              </p>
              <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 400 }}>
                1234567890
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 26: LARGE SINGLE WORDS - LIGHT */}
      <section className="w-full min-h-screen bg-white py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 space-y-16 text-black font-['TGGullhamrar']">
            <p className="text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 400 }}>
              Offors
            </p>
            <p className="text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 400 }}>
              Raftjan
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 27: POEM PAGE 2 - DARK */}
      <section className="w-full min-h-screen bg-black py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1200px' }}>
          <div className="col-span-12 space-y-12 text-white font-['TGGullhamrar']">
            <p className="text-[clamp(36px,4.5vw,64px)] leading-tight" style={{ fontWeight: 400 }}>
              og situr þar.<br />
              Var þetta gagnlegt?
            </p>
            <p className="text-[clamp(28px,3.5vw,48px)] leading-tight text-justify" style={{ fontWeight: 300 }}>
              Var þetta eitthvað sem hjálpaði einhverjum eða bjargaði einhverju? Svaraði einhverri spuringu, eða reisti eitthvað nýtt?
            </p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
              Sjaldan, mjög<br />
              sjaldan í rauninni
            </p>
            <p className="text-[clamp(24px,3vw,40px)] leading-tight text-justify" style={{ fontWeight: 300 }}>
              það sem að er gagnlegt er yfirleitt eitthvað sem að brýtur upp þessa hakann
            </p>
            <p className="text-[clamp(40px,5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>
              ekki eitthvað sem að<br />
              er beint í verkin
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 28: FINAL TITLE PAGE - LIGHT */}
      <section className="w-full min-h-screen bg-white py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, maxWidth: '1440px' }}>
          <div className="col-span-12 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-black font-['TGGullhamrar'] text-[clamp(80px,10vw,160px)] leading-none mb-4" style={{ fontWeight: 400 }}>
                TG
              </p>
              <h1 className="text-black font-['TGGullhamrar'] leading-none" style={{
                fontSize: 'clamp(120px, 15vw, 280px)',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}>
                Gullhamrar
              </h1>
              <p className="text-black font-['TGMalromur'] text-sm uppercase tracking-wider mt-8 opacity-70">
                Leturgerð
              </p>
            </div>

            <div className="flex justify-between items-end">
              <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider">
                Kolkrabbi<br />Vinnustofa
              </p>
              <p className="text-black text-sm font-['TGMalromur'] opacity-70">2025</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
