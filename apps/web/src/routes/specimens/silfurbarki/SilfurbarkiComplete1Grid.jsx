import { useState } from 'react'

export default function SilfurbarkiComplete1Grid() {
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

      {/* PAGE 1: TITLE PAGE - BLACK METAL AESTHETIC - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse relative overflow-hidden" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12 flex items-center justify-center relative z-10">
            {/* Black metal style title */}
            <div className="text-center space-y-12">
              <h1 className="text-auto-inverse font-['TGSilfurbarki'] leading-none tracking-tight" style={{
                fontSize: 'clamp(140px, 18vw, 320px)',
                fontWeight: 400,
                textShadow: '0 0 40px rgba(255,255,255,0.3)'
              }}>
                SILFURBARKI
              </h1>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-[0.5em] opacity-50">
                BROTALETUR • KOLKRABBI • MMXXV
              </p>
            </div>

            {/* Minimal geometric frame */}
            <div className="absolute inset-0 border-[1px] border-auto-inverse opacity-10 m-16" />
          </div>
        </div>
      </section>

      {/* PAGE 2: GUTENBERG BIBLE LAYOUT - TWO COLUMN - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          {/* Left column with drop cap */}
          <div className="col-span-6">
            <div className="float-left mr-4 mt-2">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(120px,12vw,180px)] leading-none">
                Í
              </p>
            </div>
            <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed" style={{ fontWeight: 300 }}>
              upphafi skapaði Guð himin og jörð. Jörðin var auð og tóm og myrkur var yfir djúpinu, en andi Guðs sveif yfir vötnunum. Og Guð sagði: Verði ljós. Og ljós varð. Guð sá að ljósið var gott.
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
              Guð skilldi ljósið frá myrkri. Guð kallaði ljósið dag en myrkrið kallaði hann nótt. Og varð kvöld og varð morgunn.
            </p>
          </div>

          {/* Right column */}
          <div className="col-span-6">
            <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed" style={{ fontWeight: 300 }}>
              Fyrsti dagur. Og Guð sagði: Verði hvolf mitt í vötnunum og skilji vötn í sundur. Guð gjörði hvolfið og skildi vötnin sem voru undir hvolfinu frá vötnunum sem voru yfir hvolfinu.
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
              Og svo varð. Guð kallaði hvolfið himin. Og varð kvöld og varð morgunn, annar dagur.
            </p>
          </div>

          {/* Footer annotation */}
          <div className="col-span-12 mt-16 border-t border-auto opacity-20 pt-4">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-40">
              GUTENBERG BIBLE LAYOUT • 24 PT BODY • 180 PT DROP CAP
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 3: HYMN BOOK LAYOUT - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10">
            {/* Hymn header */}
            <div className="text-center mb-12 border-b border-auto-inverse opacity-30 pb-6">
              <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50 mb-2">
                SÁLMUR 118
              </p>
              <h2 className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(40px,5vw,72px)] leading-tight">
                Þakka skaparanum
              </h2>
            </div>

            {/* Hymn verses */}
            <div className="space-y-10 text-auto-inverse">
              <div className="space-y-3">
                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                  Lofið Drottin, því að hann er góður,<br />
                  og miskunn hans varir að eilífu.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                  Látið Ísrael segja:<br />
                  Miskunn hans varir að eilífu.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                  Látið Arons hús segja:<br />
                  Miskunn hans varir að eilífu.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                  Látið þá sem óttast Drottin segja:<br />
                  Miskunn hans varir að eilífu.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center">
              <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-30">
                HYMNAL SETTING • 28 PT VERSE • 72 PT TITLE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4: SPECIMEN SHEET - OLD FOUNDRY STYLE - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
            {/* Header */}
            <div className="border-b-2 border-auto pb-4 mb-12">
              <div className="flex justify-between items-baseline">
                <h3 className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,80px)]">
                  Sýnishorn
                </h3>
                <p className="text-auto text-sm font-['TGMalromur'] opacity-50">
                  Kolkrabbi Vinnustofa — 2025
                </p>
              </div>
            </div>

            {/* Waterfall specimen */}
            <div className="space-y-6">
              <div className="border-b border-auto opacity-10 pb-2">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(60px,8vw,120px)] leading-none">
                  Handrit
                </p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40 mt-1">120 PT</p>
              </div>

              <div className="border-b border-auto opacity-10 pb-2">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(50px,6.5vw,96px)] leading-none">
                  Brotaletur
                </p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40 mt-1">96 PT</p>
              </div>

              <div className="border-b border-auto opacity-10 pb-2">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,72px)] leading-none">
                  Skjöl og rúnir
                </p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40 mt-1">72 PT</p>
              </div>

              <div className="border-b border-auto opacity-10 pb-2">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(32px,4vw,60px)] leading-none">
                  Diplómatísk ritsmíði
                </p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40 mt-1">60 PT</p>
              </div>

              <div className="border-b border-auto opacity-10 pb-2">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,48px)] leading-none">
                  Fornskjöl úr miðöldum
                </p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40 mt-1">48 PT</p>
              </div>

              <div className="border-b border-auto opacity-10 pb-2">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(18px,2.5vw,36px)] leading-tight">
                  Silfurbarki brotaletur fyrir bækur og handrit
                </p>
                <p className="text-auto text-[10px] font-['TGMalromur'] opacity-40 mt-1">36 PT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 5: BLACK METAL LOGO STYLE - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10 relative z-10">
            {/* Band logo style */}
            <div className="text-center space-y-16">
              <h1 className="text-auto-inverse font-['TGSilfurbarki'] leading-none tracking-tighter" style={{
                fontSize: 'clamp(100px, 13vw, 240px)',
                fontWeight: 400,
                textShadow: '0 0 60px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.4)'
              }}>
                HELHEIMR
              </h1>

              <div className="space-y-6">
                <p className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(40px,5vw,80px)] leading-tight tracking-tight">
                  Myrkviðr
                </p>
                <p className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(40px,5vw,80px)] leading-tight tracking-tight">
                  Niflheimr
                </p>
              </div>
            </div>

            {/* Gothic corner ornaments */}
            <div className="absolute top-8 left-8 text-auto-inverse opacity-30">
              <p className="text-6xl font-['TGSilfurbarki']">✦</p>
            </div>
            <div className="absolute top-8 right-8 text-auto-inverse opacity-30">
              <p className="text-6xl font-['TGSilfurbarki']">✦</p>
            </div>
            <div className="absolute bottom-8 left-8 text-auto-inverse opacity-30">
              <p className="text-6xl font-['TGSilfurbarki']">✦</p>
            </div>
            <div className="absolute bottom-8 right-8 text-auto-inverse opacity-30">
              <p className="text-6xl font-['TGSilfurbarki']">✦</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 6: CERTIFICATE / DIPLOMA LAYOUT - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10 border-4 border-auto p-12 relative">
            {/* Ornamental border corners */}
            <div className="absolute top-4 left-4 text-auto text-4xl font-['TGSilfurbarki']">❖</div>
            <div className="absolute top-4 right-4 text-auto text-4xl font-['TGSilfurbarki']">❖</div>
            <div className="absolute bottom-4 left-4 text-auto text-4xl font-['TGSilfurbarki']">❖</div>
            <div className="absolute bottom-4 right-4 text-auto text-4xl font-['TGSilfurbarki']">❖</div>

            {/* Certificate content */}
            <div className="text-center space-y-12">
              <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-[0.5em]">
                Vottorð
              </p>

              <h1 className="text-auto font-['TGSilfurbarki'] text-[clamp(60px,8vw,120px)] leading-tight">
                Silfurbarki
              </h1>

              <div className="space-y-4">
                <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] leading-relaxed">
                  Þetta staðfestir að handhafi þessa<br />
                  skjals hefur lokið námi í fornum<br />
                  bókmenntum og skriftarlist
                </p>
              </div>

              <div className="pt-8 border-t border-auto w-48 mx-auto mt-12">
                <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider">
                  Kolkrabbi Vinnustofa
                </p>
                <p className="text-auto font-['TGMalromur'] text-xs opacity-50 mt-1">
                  MMXXV
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 7: ILLUMINATED MANUSCRIPT - ORNATE DROP CAP - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10">
            {/* Manuscript page */}
            <div className="border border-auto-inverse opacity-20 p-12">
              <div className="space-y-6">
                {/* Large ornate drop cap */}
                <div className="float-left mr-6 mt-4">
                  <p className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(140px,16vw,220px)] leading-none">
                    H
                  </p>
                </div>

                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                  andarit þetta er ritað á skinni úr kálfskinni og geymir sögur úr fornum tímum, þegar goðin ríktu yfir heiminum og hetjur gengu um lönd Norðrlanda.
                </p>

                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
                  Fornar rúnir segja frá ævintýrum þeirra sem lögðu á haf út til að leita að nýjum löndum og frægð.
                </p>

                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
                  Í þessum texta finnum við merki um fornan tíma, þegar skriftarlist var æðsta list mannkyns.
                </p>
              </div>

              {/* Marginal note */}
              <div className="mt-12 border-t border-auto-inverse opacity-20 pt-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur'] italic opacity-40">
                  Manuscript folio, 220 pt drop cap, 28 pt body
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 8: MEDIEVAL CHARTER / DECREE - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10">
            {/* Formal decree header */}
            <div className="text-center mb-12">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(50px,6.5vw,96px)] leading-none">
                Tilskipun
              </p>
              <div className="w-full h-[2px] bg-surface-inverse mt-4 mb-4" />
              <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50">
                Gefin út árið MMXXV
              </p>
            </div>

            {/* Decree body */}
            <div className="space-y-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,24px)] leading-relaxed">
                Svo skulum vér gjöra kunnugt með þessu opna bréfi, að vér höfum veitt og með þessu bréfi veitum vér...
              </p>

              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,24px)] leading-relaxed">
                ...öllum þeim sem þetta bréf sjá eða heyra, að þeir skulu virða og halda þetta ákvæði í alla framtíð...
              </p>

              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,24px)] leading-relaxed">
                ...og skal þetta bréf staðfest með innsigli okkar og votturum.
              </p>
            </div>

            {/* Signatures section */}
            <div className="mt-16 pt-8 border-t-2 border-auto">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                    Sigurður
                  </p>
                  <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mt-1">
                    Vottur
                  </p>
                </div>
                <div>
                  <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                    Kristín
                  </p>
                  <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mt-1">
                    Vottur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 9: BOOK TITLE PAGE - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-3 col-span-8 flex items-center">
            <div className="border-2 border-auto-inverse p-16 text-center space-y-12 w-full">
              {/* Ornamental top */}
              <div className="text-auto-inverse text-2xl">✦ ✦ ✦</div>

              <h1 className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(50px,6.5vw,96px)] leading-tight">
                Edda Snorra<br />
                Sturlusonar
              </h1>

              <div className="space-y-4">
                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] uppercase tracking-[0.3em]">
                  Útgefandi
                </p>
                <p className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                  Kolkrabbi
                </p>
              </div>

              <p className="text-auto-inverse font-['TGMalromur'] text-sm opacity-50">
                REYKJAVÍK • MMXXV
              </p>

              {/* Ornamental bottom */}
              <div className="text-auto-inverse text-2xl pt-8">✦ ✦ ✦</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 10: CHARACTER SHOWCASE GRID - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">R</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">R</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Y</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Y</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">X</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">X</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">I</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">I</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">H</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">H</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Þ</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Þ</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Q</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Q</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">U</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">U</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">O</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">O</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">S</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">S</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Æ</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Æ</p>
              </div>
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Ö</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Ö</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-40">
                CHARACTER SPECIMEN • 140 PT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 11: RUNIC INSCRIPTION STYLE - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-2 col-span-10">
            <div className="space-y-16">
              {/* Main inscription */}
              <div className="text-center space-y-8">
                <p className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(40px,5vw,80px)] leading-tight">
                  Rúnir þessar<br />
                  risti Þorsteinn<br />
                  í minning
                </p>
              </div>

              <div className="w-full h-[1px] bg-surface opacity-20" />

              {/* Secondary text */}
              <div className="text-center">
                <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] leading-relaxed opacity-80">
                  Ristingarnar bera með sér forn merking<br />
                  úr tímum Víkinga og forfeðra okkar<br />
                  sem ferðuðust um lönd og höf
                </p>
              </div>
            </div>

            <div className="mt-24 text-center">
              <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-30">
                RUNIC INSCRIPTION STYLE • 80 PT DISPLAY
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 12: MEDIEVAL BOOK COLOPHON - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-start-3 col-span-8 flex items-center">
            <div className="text-center space-y-12 w-full">
              {/* Colophon marker */}
              <div className="flex justify-center">
                <div className="w-16 h-16 border-2 border-auto flex items-center justify-center">
                  <p className="text-auto font-['TGSilfurbarki'] text-4xl">✽</p>
                </div>
              </div>

              <h2 className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,72px)] leading-tight">
                Hér lýkur bók þessi
              </h2>

              <div className="space-y-6">
                <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] leading-relaxed">
                  Rituð og prentuð í Reykjavík<br />
                  árið tvö þúsund og tuttugu og fimm<br />
                  að stjórn Kolkrabba vinnustofu
                </p>

                <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] leading-relaxed">
                  Leturgerðin Silfurbarki<br />
                  var hönnuð til heiðurs<br />
                  fornum handritum
                </p>
              </div>

              <div className="pt-8">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                  Deo gratias
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 13: MODERN BLACKLETTER USAGE - POSTER STYLE - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
            <div className="space-y-16">
              <h1 className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(70px,9vw,160px)] leading-none tracking-tight">
                ÚTGÁFA
              </h1>

              <div className="grid grid-cols-2 gap-12">
                <div>
                  <p className="text-auto-inverse font-['TGSilfurbarki'] text-[clamp(32px,4vw,56px)] leading-tight">
                    Tónlist &<br />
                    Menning
                  </p>
                </div>
                <div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(14px,1.8vw,18px)] leading-relaxed opacity-70">
                    Brotaletur Silfurbarki<br />
                    finnst í nútímalegum<br />
                    hönnunarverkum og<br />
                    listrænum sýningum
                  </p>
                </div>
              </div>

              <div className="border-t border-auto-inverse opacity-20 pt-8">
                <p className="text-auto-inverse font-['TGMalromur'] text-xs uppercase tracking-wider opacity-40">
                  CONTEMPORARY USAGE • 160 PT HEADLINE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 14: ORNAMENTAL LETTERS SHOWCASE - LIGHT */}
      <section className="w-full min-h-screen bg-surface" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          <div className="col-span-12">
            <div className="space-y-12">
              <div className="text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(150px,18vw,280px)] leading-none">
                  Q
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">
                  H
                </p>
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">
                  S
                </p>
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">
                  R
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-40">
                ORNAMENTAL LETTERS • 140-280 PT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 15: FINAL TITLE - GRAND FINALE - LIGHT */}
      <section className="w-full min-h-screen bg-surface relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
          {/* Header */}
          <div className="absolute top-16 left-12">
            <p className="text-auto text-sm font-['TGMalromur'] font-bold">
              TG SILFURBARKI<br />
              Brotaletur
            </p>
          </div>

          {/* Center content */}
          <div className="col-span-12 flex items-center justify-center">
            <div className="text-center space-y-12">
              <h1 className="text-auto font-['TGSilfurbarki'] leading-none" style={{
                fontSize: 'clamp(150px, 18vw, 320px)',
                fontWeight: 400,
                letterSpacing: '-0.01em'
              }}>
                SILFURBARKI
              </h1>
              <p className="text-auto text-sm font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50">
                GUTENBERG • HYMNS • CHARTERS • RUNIC • BLACK METAL
              </p>
              <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-[0.3em] opacity-40">
                BROTALETUR — KOLKRABBI VINNUSTOFA — MMXXV
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-16 left-12">
            <p className="text-auto text-sm font-['TGMalromur'] font-bold">
              KOLKRABBI<br />
              VINNUSTOFA
            </p>
          </div>

          <div className="absolute bottom-16 right-12">
            <p className="text-auto text-sm font-['TGMalromur'] opacity-70">
              2025
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
