import { useState } from 'react'

export default function SpecimenOneGrid() {
  const [showGrid, setShowGrid] = useState(true)
  const columns = 12
  const gutter = 24
  const marginX = 48
  const baselineGrid = 24

  return (
    <>
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

      {/* TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px`, width: '100%', maxWidth: '1440px' }}>
          <div className="col-span-12 flex items-center justify-center">
            <div className="max-w-[640px] mx-auto text-center">
              <h1 className="text-black text-[64px] font-normal font-['TGGullhamrar'] leading-[72px] tracking-wide mb-8">
                TG GULLHAMRAR
              </h1>

              <div className="w-32 h-[1px] bg-black mx-auto mb-8" />

              <p className="text-black text-xl font-normal font-['TGGullhamrar'] leading-7 mb-2">
                <span className="italic">Icelandic Poetry</span>
              </p>

              <div className="w-32 h-[1px] bg-black mx-auto mt-8 mb-12" />

              <div className="space-y-6 text-black text-base font-normal font-['TGGullhamrar'] leading-6">
                <p>
                  Contemporary Icelandic Poetry Layout
                </p>
                <p>
                  Specimen <span className="italic">01</span>
                </p>
              </div>

              <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TGGullhamrar'] leading-5">
                <p>Type design</p>
                <p className="italic">by Kolkrabbi Foundry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POETRY LAYOUT */}
      <div className="w-full h-[2400px] relative bg-white">
        {/* Content */}
        <div className="relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            {/* Year - Top Left */}
            <div className="col-span-2 text-black text-3xl font-normal font-['TGGullhamrar'] leading-8">
              2025
            </div>

            {/* Main Heading */}
            <div className="col-span-8 text-black text-3xl font-normal font-['TGGullhamrar'] leading-8">
              TG RÓT
            </div>

            {/* Right Sidebar Text - Top */}
            <div className="col-span-2 text-justify text-black text-base font-normal font-['TGGullhamrar'] leading-5">
              Vitiði ekki um manninn sem dreymir um gula sportbílinn á eftirlaunaárum?
            </div>

            {/* Side Text - Left Column */}
            <div className="col-span-2 text-black text-base font-normal font-['TGGullhamrar'] leading-5" style={{ marginTop: '679px' }}>
              Ég erfði leiðara erfiðra heil-helja varaafla skalf taflkafla kappla keppniskapplag, rófa í lófa, léttur í dundi, sápa í spóa og lófi í lundi, klappaði Tófu og Tóta heimskum hundi, lérhefti sviðna viðna, brostnir draumar, finnur kiðna liðna, svikinna vina minna.<br/>
              Ég erfði erfiða afleiðara, varaafla kapla afruglara, lérhefti sviðna viðna; sú er mín iðja.
            </div>

            {/* Hero Heading */}
            <div className="col-span-8 text-black text-8xl font-normal font-['TGGullhamrar'] leading-[104px]" style={{ marginTop: '-600px' }}>
              Skoðun um enga sérstaka skoðun:
            </div>

            {/* Subheading */}
            <div className="col-span-8 col-start-3 text-black text-6xl font-normal font-['TGGullhamrar'] leading-[64px]" style={{ marginTop: '-376px' }}>
              Ekkert spes look, samt hress!
            </div>

            {/* Body Text - Left Column */}
            <div className="col-span-4 col-start-3 text-black text-3xl font-normal font-['TGGullhamrar'] leading-8" style={{ marginTop: '-272px' }}>
              Áfallaáverkar athygli mína fangar víðfarnir áfangastígar – afskræmingar fínar, bregður undir þig þínum betri fætinum vopnaður gimmsteinum og gillineti, sannfærðu neðan-heima, klófestir út í geim að hún sé hvorki þaðan eða héðan í orðum laymans er kleinan leyst upp í leiði manns – manns að norð-austan<br/>
              Einn í ginnungargapi, mannapi dynkur, vá en flynkur! loginn snúinn út úr sínu valdi, náttmyrkur og alkaldi – styrkur rís úr eyðimerkursandi, alsjáandi.
            </div>

            {/* Body Text - Right Column */}
            <div className="col-span-4 col-start-7 text-black text-3xl font-normal font-['TGGullhamrar'] leading-8" style={{ marginTop: '-272px' }}>
              "Fýrum upp í hellunni og horfum á draslið brenna í skemmunni" Syngdu hærra, dansaðu fastar, miklu neðar og miklu hraðar,<br/>
              Kinnhestum sleginn, manneldismegin, heldreginn, óþveginn – og í þokkabót röngum megin.
            </div>

            {/* Pull Quote */}
            <div className="col-span-4 col-start-7 text-black text-5xl font-normal font-['TGGullhamrar'] leading-[56px]" style={{ marginTop: '0px' }}>
              Fýrum upp í hellunni og horfum á draslið brenna í skemmunni.
            </div>

            {/* Technical Info - Bottom Left */}
            <div className="col-span-2 text-black text-lg font-normal font-['TGGullhamrar'] leading-5" style={{ marginTop: '1056px' }}>
              Handeo<br/>
              Djaneelio handemounious<br/>
              durungero forneldrich<br/>
              tchingertio flannelism<br/>
              schwlagrech<br/>
              tchingertio
            </div>
            <div className="col-span-1 text-black text-lg font-normal font-['TGGullhamrar'] leading-5 tracking-tight" style={{ marginTop: '1056px' }}>
              [ 2-0. 25 ]<br/>
              [ 44. 48 ]<br/>
              [ 20.19.1 ]<br/>
              [ 1. 99-2 ]<br/>
              [ 99.0.7 ]<br/>
              [ 2.029 ]
            </div>

            {/* Page Number */}
            <div className="col-span-2 text-right text-black text-3xl font-normal font-['TGGullhamrar'] leading-8" style={{ marginTop: '1984px' }}>
              34
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
