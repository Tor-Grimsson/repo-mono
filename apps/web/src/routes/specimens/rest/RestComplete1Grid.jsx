import { useState } from 'react'

export default function RestComplete1Grid() {
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

      {/* PAGE 1: TITLE PAGE - TG RÓT LIGATURES - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
            {/* Header */}
            <div className="flex justify-between items-start mb-16 border-b border-auto-inverse opacity-30 pb-4">
              <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
                Sýnishorn og prufur
              </p>
              <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-50">
                160 PT
              </p>
            </div>

            {/* Ligatures title */}
            <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,72px)] mb-12 italic">
              Samsteypur / Ligatures
            </h2>

            {/* Bold ligatures */}
            <div className="space-y-8">
              <div>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">
                  Bold
                </p>
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none" style={{ fontWeight: 700 }}>
                  ffl fi fj fl ff ffi fr
                </p>
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4" style={{ fontWeight: 700 }}>
                  ct st sp ft fh tt ll
                </p>
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4" style={{ fontWeight: 700 }}>
                  Th № Qu ß ẞ Æ
                </p>
              </div>

              <div>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4 mt-12">
                  Bold Italic
                </p>
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none italic" style={{ fontWeight: 700 }}>
                  ffl fi fj fl ff ffi fr
                </p>
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4 italic" style={{ fontWeight: 700 }}>
                  ct st sp ft fh tt ll
                </p>
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4 italic" style={{ fontWeight: 700 }}>
                  Th № Qu ß ẞ Æ
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16">
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
                Kolkrabbi Vinnustofa 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2: TG RÓT WEIGHTS - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-16">
              <p className="text-auto text-sm font-['TGMalromur'] font-bold">
                TG RÓT
              </p>
              <p className="text-auto text-sm font-['TGMalromur'] opacity-50">
                240 PT
              </p>
            </div>

            {/* Weight demonstrations */}
            <div className="space-y-6">
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
      </section>

      {/* PAGE 3: TG RÓT WATERFALL - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12 space-y-8">
            <div className="space-y-6">
              <div className="flex items-baseline justify-between">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(160px,20vw,344px)] leading-none" style={{ fontWeight: 700 }}>
                  Blóta
                </p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">344 PT</p>
              </div>

              <div className="flex items-baseline justify-between">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(140px,18vw,296px)] leading-none" style={{ fontWeight: 700 }}>
                  Refir
                </p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">296 PT</p>
              </div>

              <div className="flex items-baseline justify-between">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(120px,15vw,240px)] leading-none" style={{ fontWeight: 700 }}>
                  Áföllum
                </p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">240 PT</p>
              </div>

              <div className="flex items-baseline justify-between">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(90px,11vw,184px)] leading-none" style={{ fontWeight: 700 }}>
                  Ranadýra
                </p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">184 PT</p>
              </div>

              <div className="flex items-center justify-between gap-6">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
                  Alsjáandi
                </p>
                {/* Eye icon */}
                <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-90 flex-shrink-0">
                  <ellipse cx="60" cy="40" rx="58" ry="38" fill="white" />
                  <circle cx="60" cy="40" r="20" fill="black" />
                </svg>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">144 PT</p>
              </div>

              <div className="flex items-baseline justify-between">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(55px,7vw,112px)] leading-none" style={{ fontWeight: 700 }}>
                  Sporðskjulaga
                </p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">112 PT</p>
              </div>

              <div className="flex items-baseline justify-between">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(40px,5vw,80px)] leading-none" style={{ fontWeight: 700 }}>
                  Gimsteinar & gyllinet
                </p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">80 PT</p>
              </div>

              <div className="flex items-baseline justify-between">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-none" style={{ fontWeight: 700 }}>
                  Ráðstefnur varasalvasala
                </p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">64 PT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4: MÁLRÓMUR SPECIMEN - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b border-auto opacity-20 pb-4">
              <p className="text-auto text-sm font-['TGMalromur'] opacity-70">
                Sýnishorn og prufur
              </p>
              <p className="text-auto text-sm font-['TGMalromur'] opacity-50">
                128 PT
              </p>
            </div>

            <h2 className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,56px)] mb-8">
              TG <span className="italic">Málrómur</span>
            </h2>

            {/* Bold Italic display */}
            <div className="mb-12">
              <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mb-4">
                Bold italic
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(60px,8vw,128px)] leading-tight italic" style={{ fontWeight: 700 }}>
                Rennimjúkt eðal<br />
                flauel, duft slæðist<br />
                niður, silkislaufa<br />
                & æðardúnn, fiður<br />
                daðradalur, friður.
              </p>
            </div>

            {/* Regular prose */}
            <div>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mb-4">
                Regular
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,60px)] leading-relaxed" style={{ fontWeight: 400 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir
                við skák að sötri, soðin sjálfsögðum samtölum.
                Spakir sötra á sætu seyði, sjónlistarspjall,
                síðfóníur, söngur sungin suður af Síberíu,
                setið að sálrænum stríðsglæpum, svaðil-pöttum
                og skyndimátum, svarthvítar svikamyllur,
                sökkvandi
                skálínur spegla sýnirnar – seinni tíðirnar.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-16">
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
                Kolkrabbi Vinnustofa 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 5: MÁLRÓMUR POETRY - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10">
            {/* Poem content */}
            <div className="space-y-8 text-auto-inverse font-['TGMalromur']">
              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed" style={{ fontWeight: 400 }}>
                Puntaður í eigin hylli, lá flatur – alveg kylli,
                og spurði með snatri:
              </p>

              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                – Er þetta bara minn eigin kvilli?
                – Hvað annað leynist þessa kilja á milli?
              </p>

              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                – Ekkert, hvíslaði Snati
                – bara bókasafn fullt af hatri
              </p>

              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed" style={{ fontWeight: 400 }}>
                Tóm tvítogar til tveggja nátta;
              </p>

              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                – Bíðið nú við, og í bilinu bið:
                – Ohm, verið fjögur til átta.
              </p>

              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed" style={{ fontWeight: 400 }}>
                Finn þann dóm í dróma,
                fimm tommu kjaftur og málróm í kóma,
                sem sjaldan sér kann að halda,
                en góður í mó að malda
              </p>

              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed" style={{ fontWeight: 400 }}>
                Gleymi svo og spyr aftur, eins og fylliraftur:
              </p>

              <p className="text-[clamp(20px,2.8vw,40px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                – Hvar er þessi svokallaði innri kraftur?
              </p>
            </div>

            {/* Footer */}
            <div className="mt-24">
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
                60 PT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 6: MÁLRÓMUR TEXT SETTING - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-3 col-span-8">
            <div className="space-y-8">
              <h3 className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] italic">
                Málrómur
              </h3>

              <div className="space-y-6">
                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed" style={{ fontWeight: 400 }}>
                  Puntaður í eigin hylli, lá flatur – alveg kylli,
                  og spurði með snatri:
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                  – Er þetta bara minn eigin kvilli?
                  – Hvað annað leynist þessa kilja á milli?
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed italic" style={{ fontWeight: 700 }}>
                  – Ekkert, hvíslaði Snati
                  – bara bókasafn fullt af hatri
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed" style={{ fontWeight: 400 }}>
                  Tóm tvítogar til tveggja nátta;
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed italic" style={{ fontWeight: 700 }}>
                  – Bíðið nú við, og í bilinu bið:
                  – Ohm, verið fjögur til átta.
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed" style={{ fontWeight: 400 }}>
                  Finn þann dóm í dróma,
                  fimm tommu kjaftur og málróm í kóma,
                  sem sjaldan sér kann að halda,
                  en góður í mó að malda
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed" style={{ fontWeight: 400 }}>
                  Gleymi svo og spyr aftur, eins og fylliraftur:
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                  – Hvar er þessi svokallaði innri kraftur?
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center">
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
                36 POINT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 7: SWATCHES - EDITORIAL STYLE - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12 space-y-16">
            <div className="border-b border-auto-inverse opacity-20 pb-8">
              <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider mb-8 opacity-50">
                Style: Regular • Swatches • Size: 16 pt
              </p>
              <h2 className="text-auto-inverse font-['TGRoot'] text-[clamp(60px,8vw,120px)] leading-tight uppercase" style={{ fontWeight: 700 }}>
                A NEW WORLD<br />
                NATURALS APPROACH<br />
                WITH CAUTION
              </h2>
            </div>

            <div className="border-b border-auto-inverse opacity-20 pb-8">
              <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider mb-8 opacity-50">
                Style: Regular • Swatches • Size: 16 pt
              </p>
              <h2 className="text-auto-inverse font-['TGRoot'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
                Prioritiase the<br />
                seasonal life of<br />
                flower plantios
              </h2>
            </div>

            <div>
              <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider mb-8 opacity-50">
                Style: Regular • Swatches • Size: 16 pt
              </p>
              <h2 className="text-auto-inverse font-['TGRoot'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
                Piet outdoor<br />
                harlem nights
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 8: TORGROT CHARACTER SET - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
            <div className="mb-12">
              <h3 className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,40px)] mb-2">
                Torgrot-REMASTER
              </h3>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
                Style Comparison Rows
              </p>
            </div>

            {/* Character grid */}
            <div className="grid grid-cols-10 gap-4 border-2 border-auto p-8">
              {/* Row 1 - Uppercase */}
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
                <div key={`upper1-${i}`} className="border border-auto flex items-center justify-center p-4">
                  <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
                </div>
              ))}

              {/* Row 2 - Uppercase K-T */}
              {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
                <div key={`upper2-${i}`} className="border border-auto flex items-center justify-center p-4">
                  <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
                </div>
              ))}

              {/* Row 3 - Uppercase U-Z */}
              {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
                <div key={`upper3-${i}`} className="border border-auto flex items-center justify-center p-4">
                  <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
                </div>
              ))}

              {/* Row 4 - Lowercase a-j */}
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
                <div key={`lower1-${i}`} className="border border-auto flex items-center justify-center p-4">
                  <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
                </div>
              ))}

              {/* Row 5 - Lowercase k-t */}
              {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
                <div key={`lower2-${i}`} className="border border-auto flex items-center justify-center p-4">
                  <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
                </div>
              ))}

              {/* Row 6 - Lowercase u-z */}
              {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
                <div key={`lower3-${i}`} className="border border-auto flex items-center justify-center p-4">
                  <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 9: FINAL TITLE PAGE - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          {/* Header */}
          <div className="absolute top-16 left-12">
            <p className="text-auto-inverse text-sm font-['TGMalromur'] font-bold">
              KOLKRABBI<br />
              VINNUSTOFA
            </p>
          </div>

          {/* Center content */}
          <div className="col-span-12 flex items-center justify-center">
            <div className="text-center space-y-12">
              <div className="space-y-6">
                <h1 className="text-auto-inverse font-['TGRoot'] leading-none" style={{
                  fontSize: 'clamp(100px, 13vw, 200px)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em'
                }}>
                  TG RÓT
                </h1>
                <h2 className="text-auto-inverse font-['TGMalromur'] leading-none italic" style={{
                  fontSize: 'clamp(80px, 10vw, 160px)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em'
                }}>
                  Málrómur
                </h2>
              </div>
              <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50">
                REST SPECIMEN • MMXXV
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-16 right-12">
            <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-70">
              2025
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
