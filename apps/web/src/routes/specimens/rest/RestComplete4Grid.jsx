import { useState } from 'react'

export default function RestComplete4Grid() {
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

      <div className="w-full bg-surface">

      {/* PAGE 1: MÁLRÓMUR POETRY - 36PT - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-16 flex justify-between items-baseline border-b border-auto/10 pb-4">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider">
              Málrómur
            </h2>
            <div className="flex gap-8 items-baseline">
              <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
                36 POINT
              </p>
              <p className="text-auto text-xs font-['TGMalromur'] tracking-wider opacity-50">
                5A 8a $5.50
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed">
              Puntaður í eigin hylli, lá flatur – alveg kylli,<br />
              og spurði með snatri:
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed italic">
              – Er þetta bara minn eigin kvilli?<br />
              – Hvað annað leynist þessa kilja á milli?
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed">
              – <span className="italic">Ekkert</span>, hvíslaði Snati<br />
              – <span className="italic">bara bókasafn fullt af hatri</span>
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed">
              Tóm tvítogar til tveggja nátta;
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed italic">
              – Bíðið nú við, og í bilinu bið:<br />
              – Ohm, verið fjögur til átta.
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed">
              Finn þann dóm í dróma,<br />
              fimm tommu kjaftur og málróm í kóma,<br />
              sem sjaldan sér kann að halda,<br />
              en góður í mó að malda
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed">
              Gleymi svo og spyr aftur, eins og fylliraftur:
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] leading-relaxed italic">
              – Hvar er þessi svokallaði innri kraftur?
            </p>
          </div>
         </div> 
        </div>
      </section>

      {/* PAGE 2: LETURGERÐ 224PT - DARK PRESENTATION */}
      <section className="w-full min-h-screen bg-surface-inverse px-12 py-24 flex items-center justify-center">
        <div className="max-w-[1400px] w-full">
          <div className="mb-8 flex justify-between items-baseline">
            <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] uppercase tracking-widest">
              Leturgerð
            </h2>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40 tracking-wider">
              224 pt
            </p>
          </div>

          <div className="bg-surface p-16">
            <div className="mb-12 text-center">
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,32px)] italic mb-2">
                Málrómur
              </p>
            </div>

            <div className="space-y-6 text-center mb-12">
              <p className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,16px)]">
                36 POINT
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,16px)] opacity-60">
                5A 8a $5.50
              </p>
            </div>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed mb-8">
              Puntaður í eigin hylli, lá flatur – alveg kylli,<br />
              og spurði með snatri:
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed italic mb-8">
              – Er þetta bara minn eigin kvilli?<br />
              – Hvað annað leynist þessa kilja á milli?
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed mb-8">
              – <span className="italic">Ekkert</span>, hvíslaði Snati<br />
              – <span className="italic">bara bókasafn fullt af hatri</span>
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed mb-8">
              Tóm tvítogar til tveggja nátta:
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed italic mb-8">
              – Bíðið nú við, og í bilinu bið:<br />
              – Ohm, verið fjögur til átta.
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed mb-8">
              Finn þann dóm í dróma,<br />
              fimm tommu kjaftur og málróm í kóma,<br />
              sem sjaldan sér kann að halda,<br />
              en góður í mó að malda
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed mb-8">
              Gleymi svo og spyr aftur, eins og fylliraftur:
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.2vw,36px)] leading-relaxed italic">
              – Hvar er þessi svokallaði innri kraftur?
            </p>
          </div>

          <div className="mt-8 flex justify-between items-baseline">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-60">
              Kolkrabbi<br />Vinnustofa
            </p>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-60">
              2025
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 3: LIGATURE FFL 960PT - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24 flex items-center justify-center">
        <div className="w-full">
          <div className="mb-8 px-12 flex justify-between items-baseline">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] italic tracking-wider opacity-60">
              Sýnishorn og prufur
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] italic opacity-40">
              960 pt
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[70vh]">
            <p className="text-auto font-['TGMalromur'] text-[clamp(280px,35vw,640px)] leading-none italic">
              ffl
            </p>
          </div>

          <div className="px-12 flex justify-end">
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              2025
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 4: ESZETT ẞ CHARACTER - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24 flex items-center justify-center">
        <div className="w-full max-w-[1400px]">
          <p className="text-auto font-['TGRoot'] text-[clamp(480px,60vw,960px)] leading-none text-center" style={{ fontWeight: 300 }}>
            ẞ
          </p>
        </div>
      </section>

      {/* PAGE 5: TG RÓT ESZETT ß - LIGHT WITH HEADER */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="mb-12 flex justify-start items-baseline">
            <div>
              <h2 className="text-auto font-['TGRoot'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-1" style={{ fontWeight: 700 }}>
                TG RÓT
              </h2>
              <p className="text-auto font-['TGRoot'] text-[clamp(12px,1.2vw,16px)] opacity-60" style={{ fontWeight: 400 }}>
                Leturgerð 2025
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[70vh]">
            <p className="text-auto font-['TGRoot'] text-[clamp(480px,60vw,960px)] leading-none italic" style={{ fontWeight: 300 }}>
              ß
            </p>
          </div>
        </div>
        
      </section>

      {/* PAGE 6: FFL LIGATURE DARK - 960PT */}
      <section className="w-full min-h-screen bg-surface-inverse px-8 py-24 flex items-center justify-center">
        <div className="w-full">
          <div className="mb-8 px-12 flex justify-between items-baseline border-b border-auto-inverse/10 pb-2">
            <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] italic tracking-wider">
              Sýnishorn og prufur
            </h2>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] italic opacity-50">
              960 pt
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[70vh]">
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(280px,35vw,640px)] leading-none italic">
              ffl
            </p>
          </div>

          <div className="px-12 flex justify-end">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">
              2025
            </p>
          </div>
        </div>
        
      </section>

      {/* PAGE 7: TG MÁLRÓMUR ORNAMENTAL - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse px-12 py-24 flex items-center justify-center">
        <div className="w-full max-w-[1200px]">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto-inverse/10 pb-4">
            <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] uppercase tracking-widest">
              Leturgerð
            </h2>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              2025
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(60px,8vw,140px)] uppercase tracking-wider text-center">
              TG
            </p>

            <div className="w-full max-w-[800px] h-px bg-surface/20"></div>

            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(48px,6vw,96px)] italic text-center leading-tight">
              Málrómur
            </p>

            {/* Ornamental flourish */}
            <div className="flex items-center justify-center">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none" className="opacity-80">
                <path d="M20 50 Q50 20, 100 50 T180 50" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M100 50 L100 70 Q90 80, 80 70 Q90 60, 100 70 Q110 60, 120 70 Q110 80, 100 70" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-baseline border-t border-auto-inverse/10 pt-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-60">
              Kolkrabbi<br />Vinnustofa
            </p>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-60">
              2025
            </p>
          </div>
        </div>
        
      </section>

      {/* PAGE 8: TORGROT CHARACTER GRID - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="grid grid-cols-10 gap-0 border-l border-t border-auto/20 mb-12">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={i} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]">{char}</p>
              </div>
            ))}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={i} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]">{char}</p>
              </div>
            ))}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={i} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]">{char}</p>
              </div>
            ))}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={i} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]">{char}</p>
              </div>
            ))}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={i} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]">{char}</p>
              </div>
            ))}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={i} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]">{char}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 9: TORGROT CONTINUOUS - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="space-y-12 text-center">
            <p className="text-auto font-['TGMalromur'] text-[clamp(48px,6vw,120px)] leading-tight tracking-tight">
              ABCDEFGHIJ<br />
              KLMNOPQRST<br />
              UVWXYZ
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(36px,4.5vw,96px)] leading-tight tracking-tight">
              abcdefghijklmno<br />
              pqrstuvwxyz
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 10: TORGROT BOLD GRID - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="grid grid-cols-10 gap-0 border-l border-t border-auto/20 mb-12">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={`bold-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={`bold-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={`bold-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={`bold-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={`bold-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={`bold-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 11: TORGROT ITALIC CONTINUOUS - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="space-y-12 text-center">
            <p className="text-auto font-['TGMalromur'] text-[clamp(48px,6vw,120px)] leading-tight tracking-tight italic">
              ABCDEFGHIJ<br />
              KLMNOPQRST<br />
              UVWXYZ
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(36px,4.5vw,96px)] leading-tight tracking-tight italic">
              abcdefghijklmnopq<br />
              rstuvwxyz
            </p>
          </div>
        </div>
       </div>
      </section>

      {/* PAGE 12: TORGROT LIGHT WEIGHT GRID - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="grid grid-cols-10 gap-0 border-l border-t border-auto/20 mb-12">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={`light-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 300 }}>{char}</p>
              </div>
            ))}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={`light-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 300 }}>{char}</p>
              </div>
            ))}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={`light-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 300 }}>{char}</p>
              </div>
            ))}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={`light-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 300 }}>{char}</p>
              </div>
            ))}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={`light-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 300 }}>{char}</p>
              </div>
            ))}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={`light-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 300 }}>{char}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 13: TORGROT ITALIC LIGHT CONTINUOUS - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="space-y-12 text-center">
            <p className="text-auto font-['TGMalromur'] text-[clamp(48px,6vw,120px)] leading-tight tracking-tight italic" style={{ fontWeight: 300 }}>
              ABCDEFGHIJ<br />
              KLMNOPQRST<br />
              UVWXYZ
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(36px,4.5vw,96px)] leading-tight tracking-tight italic" style={{ fontWeight: 300 }}>
              abcdefghijklmno<br />
              pqrstuvwxyz
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 14: TORGROT MEDIUM WEIGHT GRID - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="grid grid-cols-10 gap-0 border-l border-t border-auto/20 mb-12">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={`med-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 500 }}>{char}</p>
              </div>
            ))}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={`med-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 500 }}>{char}</p>
              </div>
            ))}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={`med-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 500 }}>{char}</p>
              </div>
            ))}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={`med-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 500 }}>{char}</p>
              </div>
            ))}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={`med-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 500 }}>{char}</p>
              </div>
            ))}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={`med-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 500 }}>{char}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 15: TORGROT MEDIUM ITALIC CONTINUOUS - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="space-y-12 text-center">
            <p className="text-auto font-['TGMalromur'] text-[clamp(48px,6vw,120px)] leading-tight tracking-tight italic" style={{ fontWeight: 500 }}>
              ABCDEFGHIJ<br />
              KLMNOPQRST<br />
              UVWXYZ
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(36px,4.5vw,96px)] leading-tight tracking-tight italic" style={{ fontWeight: 500 }}>
              abcdefghijklmno<br />
              pqrstuvwxyz
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 16: TORGROT REGULAR CONTINUOUS - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="space-y-12 text-center">
            <p className="text-auto font-['TGMalromur'] text-[clamp(56px,7vw,140px)] leading-tight tracking-tight" style={{ fontWeight: 400 }}>
              ABCDEFGHIJ<br />
              KLMNOPQRST<br />
              UVWXYZ
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(42px,5.2vw,112px)] leading-tight tracking-tight" style={{ fontWeight: 400 }}>
              abcdefghijklmno<br />
              pqrstuvwxyz
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 17: TORGROT REGULAR GRID - LIGHT */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="grid grid-cols-10 gap-0 border-l border-t border-auto/20 mb-12">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={`reg-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={`reg-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={`reg-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={`reg-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={`reg-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={`reg-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* PAGE 18: TORGROT REGULAR ITALIC CONTINUOUS - FINAL */}
      <section className="w-full min-h-screen bg-surface px-8 py-24">
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="space-y-12 text-center">
            <p className="text-auto font-['TGMalromur'] text-[clamp(56px,7vw,140px)] leading-tight tracking-tight italic" style={{ fontWeight: 400 }}>
              ABCDEFGHIJ<br />
              KLMNOPQRST<br />
              UVWXYZ
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(42px,5.2vw,112px)] leading-tight tracking-tight italic" style={{ fontWeight: 400 }}>
              abcdefghijklmno<br />
              pqrstuvwxyz
            </p>
          </div>
        </div>
        </div>
      </section>

    </div>

    </div>
  )
}
