export default function DylgjurComplete1() {
  return (
    <div className="w-full min-h-screen relative">

      {/* PAGE 1: TITLE PAGE - TG DYLGJA - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              MMXXV
            </p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              TG Gullhamrar
            </p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              2025
            </p>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <p className="text-white font-['TGDylgjur'] text-[clamp(80px,10vw,160px)] leading-none" style={{ fontWeight: 400 }}>
              TG
            </p>
            <div className="w-full max-w-[800px] h-px bg-white opacity-30" />
            <h1 className="text-white font-['TGDylgjur'] leading-none" style={{
              fontSize: 'clamp(120px, 15vw, 280px)',
              fontWeight: 400,
              letterSpacing: '-0.01em'
            }}>
              DYLGJA
            </h1>
          </div>

          {/* Footer */}
          <div className="flex justify-center">
            <p className="text-white text-sm font-['TGMalromur'] opacity-70">
              Kolkrabbi Vinnustofa
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 2: WORD GRID WITH BADGES - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-rows-4 gap-0 border-2 border-black">
            {/* Row 1 */}
            <div className="border-b-2 border-black p-8 flex items-center justify-between">
              <p className="text-black font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                PERA
              </p>
              <div className="w-32 h-32 rounded-full border-2 border-black flex items-center justify-center">
                <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">
                  GULLHAMRAR
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="border-b-2 border-black p-8 flex items-center justify-between">
              <p className="text-black font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                ÞVÆLA
              </p>
              <div className="w-32 h-32 rounded-full border-2 border-black flex items-center justify-center">
                <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">
                  GULLHAMRAR
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="border-b-2 border-black p-8 flex items-center justify-between">
              <p className="text-black font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                ÆLA
              </p>
              <div className="w-32 h-32 rounded-full border-2 border-black flex items-center justify-center">
                <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">
                  GULLHAMRAR
                </p>
              </div>
            </div>

            {/* Row 4 */}
            <div className="p-8 flex items-center justify-between">
              <p className="text-black font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-none" style={{ fontWeight: 700 }}>
                ÞRUSK
              </p>
              <div className="w-32 h-32 rounded-full border-2 border-black flex items-center justify-center">
                <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">
                  GULLHAMRAR
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3: WORD LIST - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              MMXXV
            </p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              TG Gullhamrar
            </p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              2025
            </p>
          </div>

          <div className="space-y-8 text-white font-['TGDylgjur']">
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              Hvísl
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>
              Dylgjur
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>
              Gnýr
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              Bárugjálp
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>
              Þrusk
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>
              Kverkar
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              flaður
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>
              fagurgali
            </p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-16 left-8">
            <p className="text-white text-sm font-['TGMalromur'] opacity-70">
              Kolkrabbi Vinnustofa
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 4: GIANT AMPERSAND - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          <p className="text-black font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(200px, 25vw, 480px)',
            fontWeight: 400
          }}>
            &
          </p>
        </div>
      </section>

      {/* PAGE 5: WORD LIST - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-12">
          <div className="space-y-10 text-white font-['TGDylgjur']">
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>
              Værð
            </p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>
              Deyfð
            </p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>
              Rénun
            </p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>
              Svíun
            </p>
            <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>
              Þögn
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 6: WORD LIST - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-12">
          <div className="space-y-8 text-black font-['TGDylgjur']">
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              makráður
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              sællífi
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              vellysting
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              vanafesta
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>
              Kyrrð
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>
              Rósemi
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 7: CHARACTER DETAIL - Á bc é fg */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-16 flex items-center justify-center overflow-hidden">
        <div className="max-w-[1400px] w-full">
          <p className="text-black font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(180px, 22vw, 400px)',
            fontWeight: 400,
            letterSpacing: '-0.02em'
          }}>
            Á bc é fg
          </p>
        </div>
      </section>

      {/* PAGE 8: CHARACTER DETAIL - dð gh í */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-16 flex items-center justify-center overflow-hidden">
        <div className="max-w-[1400px] w-full">
          <p className="text-black font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(180px, 22vw, 400px)',
            fontWeight: 400,
            letterSpacing: '-0.02em'
          }}>
            dð gh í
          </p>
        </div>
      </section>

      {/* PAGE 9: Aa SPECIMEN - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          <p className="text-white font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(200px, 25vw, 480px)',
            fontWeight: 400
          }}>
            Aa
          </p>
        </div>
      </section>

      {/* PAGE 10: WORD LIST STACKED - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-10">
          <p className="text-black font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
            Kossar
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
            Armlög
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
            Daður
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
            Flangs
          </p>
        </div>
      </section>

      {/* PAGE 11: SINGLE WORD - dynkur - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          <p className="text-white font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(120px, 15vw, 280px)',
            fontWeight: 400
          }}>
            dynkur
          </p>
        </div>
      </section>

      {/* PAGE 12: SPECIAL CHARACTERS & PUNCTUATION - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-8">
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 400 }}>
            RAUP.GORT
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 300 }}>
            :vellystingar:
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 700 }}>
            &lt;LÓFAKLAPP&gt;
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 300 }}>
            {'{'}1.456-2559.273{'}'}
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 400 }}>
            ÞUS & FJAS-NP
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 300 }}>
            *glundroði*
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 400 }}>
            Blístur-FLAUT
          </p>
          <p className="text-black font-['TGDylgjur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 700 }}>
            [öngþveiti]
          </p>
        </div>
      </section>

      {/* PAGE 13: SLARK - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          <p className="text-white font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(150px, 18vw, 320px)',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}>
            SLARK
          </p>
        </div>
      </section>

      {/* PAGE 14: Ys & þys LIGATURE - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          <p className="text-black font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(120px, 15vw, 280px)',
            fontWeight: 400
          }}>
            Ys & þys
          </p>
        </div>
      </section>

      {/* PAGE 15: EXTENSIVE WORD LIST - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-black font-['TGDylgjur']">
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>argaþras</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>hnotabit</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>illdeilinn</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>orðaskaki</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>málastapp</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>ýfingar</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>hergnýr</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>húllumhæ</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>hnefasteytingar</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>karp</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>glymjandi</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>Glundroði</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>lýðskrum</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>þæfingur</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>Mjóróma</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>gnöldur</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>glumrugangur</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>Írafár</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>kveinstafir</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>jódynur</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>Offors</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>skrílslæti</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>stímabrak</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>Skvamp</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>uppivöðslusemi</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>Traðk</p>
          </div>
        </div>
      </section>

      {/* PAGE 16: KARP BUSINESS CARD - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-16">
          <p className="text-black font-['TGDylgjur'] text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 700 }}>
            KARP
          </p>

          <div className="relative">
            {/* Parallelogram shape */}
            <div className="w-64 h-32 bg-black" style={{ transform: 'skewX(-20deg)' }} />

            {/* Business card info */}
            <div className="mt-8 space-y-2">
              <p className="text-black font-['TGDylgjur'] text-4xl" style={{ fontWeight: 700 }}>
                hrím ÍSBÚÐ
              </p>
              <p className="text-black font-['TGMalromur'] text-sm uppercase tracking-wider">
                GÖTUVEGI 17
              </p>
              <p className="text-black font-['TGMalromur'] text-sm uppercase tracking-wider">
                940 FJARÐARHÖFN
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 17: WORD BROKEN ACROSS LINES - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1000px] w-full">
          <p className="text-white font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(100px, 12vw, 240px)',
            fontWeight: 400
          }}>
            húll<br />
            um<br />
            hæ
          </p>
        </div>
      </section>

      {/* PAGE 18: WORD LIST WITH ORGANIC SHAPES - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[1200px] mx-auto relative">
          {/* Organic curved shapes as SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 900" preserveAspectRatio="none">
            <path d="M 200 200 Q 400 100 600 200 T 1000 200" fill="none" stroke="black" strokeWidth="2" />
            <ellipse cx="300" cy="500" rx="150" ry="100" fill="none" stroke="black" strokeWidth="2" />
            <path d="M 700 600 Q 800 500 900 600 Q 1000 700 900 800" fill="none" stroke="black" strokeWidth="2" />
          </svg>

          <div className="relative z-10 space-y-6 text-black font-['TGDylgjur']">
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>fjaðrafok</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>glumrugangur</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>glundroði</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>glymjandi</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>gnauð</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>gnöldur</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>gorgeir</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>hergnýr</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>hnefasteytingar</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>hnjask</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>Hvassyrði</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>húllumhæ</p>
            <p className="text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 400 }}>írafár</p>
          </div>
        </div>
      </section>

      {/* PAGE 19: FUM FÁT - OUTLINE/SOLID CONTRAST - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          <p className="text-white font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(120px, 15vw, 280px)',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}>
            <span style={{
              WebkitTextStroke: '2px white',
              WebkitTextFillColor: 'transparent'
            }}>FUM</span>
            {' '}
            <span>FÁT</span>
          </p>
        </div>
      </section>

      {/* PAGE 20: WORD LIST - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-10">
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 700 }}>
            Glymjandi
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 700 }}>
            Þrusk
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 700 }}>
            Blístur
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 700 }}>
            Klamarí
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 700 }}>
            Moldviðri
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 700 }}>
            Grobb
          </p>
        </div>
      </section>

      {/* PAGE 21: UPPERCASE ALPHABET - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-8">
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            ABCDEFG
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            HIJKLMNO
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            PQRSTUV
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            WXYZ&
          </p>
        </div>
      </section>

      {/* PAGE 22: LOWERCASE ALPHABET - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-8">
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            abcdef
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            gh ijklm
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            nopqrst
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            uvw xy z? !
          </p>
        </div>
      </section>

      {/* PAGE 23: FULL CHARACTER SET - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[1200px] mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">
              Presents Kolkrabbi Vinnustofa
            </p>
            <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">
              TG Gullhamrar
            </p>
            <p className="text-black font-['TGMalromur'] text-xs uppercase tracking-wider">
              Modern Typeface Variable weight
            </p>
          </div>

          {/* Character display */}
          <div className="space-y-6 text-black font-['TGDylgjur']">
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>
              ABCDEFGHIJKLMN
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>
              OPQRSTUVWXYZ
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              abcdefghijklmn
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>
              opqrstuvwxyz
            </p>
            <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>
              0123456789
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 24: RAFTJAN - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          <p className="text-black font-['TGDylgjur'] leading-none" style={{
            fontSize: 'clamp(120px, 15vw, 280px)',
            fontWeight: 400
          }}>
            Raftjan
          </p>
        </div>
      </section>

      {/* PAGE 25: POEM PAGE 1 - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              MMXXV
            </p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              TG Dylgjur
            </p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              2025
            </p>
          </div>

          {/* Poem - Swiss grid with expressionist line breaks */}
          <div className="space-y-8 text-black font-['TGDylgjur']" style={{ fontWeight: 300 }}>
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
            <p className="text-[clamp(36px,4.5vw,64px)] leading-tight" style={{ fontWeight: 700 }}>
              eins og hundrað í hundrað<br />
              þarna á gólfinu
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 26: GRID LAYOUT - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-black p-8 flex items-center justify-center min-h-[200px]">
              <p className="text-black font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 400 }}>
                lýðskrum
              </p>
            </div>
            <div className="border-2 border-black p-8 flex items-center justify-center min-h-[200px]">
              <p className="text-black font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 700 }}>
                hergnýr
              </p>
            </div>
            <div className="border-2 border-black p-8 flex items-center justify-center min-h-[200px]">
              <p className="text-black font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 700 }}>
                Glundroði
              </p>
            </div>
            <div className="border-2 border-black p-8 flex items-center justify-center min-h-[200px] col-span-2">
              <p className="text-black font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 300 }}>
                skrílslæti
              </p>
            </div>
            <div className="border-2 border-black p-8 flex items-center justify-center min-h-[200px]">
              <p className="text-black font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 400 }}>
                ýfingar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 27: POEM PAGE 2 - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          {/* Poem - expressionist arrangement */}
          <div className="space-y-12 text-white font-['TGDylgjur']">
            <p className="text-[clamp(36px,4.5vw,64px)] leading-tight" style={{ fontWeight: 400 }}>
              og situr þar.<br />
              Var þetta gagnlegt?
            </p>
            <p className="text-[clamp(28px,3.5vw,48px)] leading-tight text-justify" style={{ fontWeight: 300 }}>
              Var þetta eitthvað sem hjálpaði einhverjum eða bjargaði einhverju? Svaraði einhverri spuringu, eða reisti eitthvað nýtt?
            </p>
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
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

      {/* PAGE 28: GRID LAYOUT - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-white p-12 flex items-center justify-center min-h-[250px]">
              <p className="text-white font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>
                ÞRUSK
              </p>
            </div>
            <div className="border-2 border-white p-12 flex items-center justify-center min-h-[250px]">
              <p className="text-white font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>
                DYNKUR
              </p>
            </div>
            <div className="border-2 border-white p-12 flex items-center justify-center min-h-[250px]">
              <p className="text-white font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>
                AMBUR
              </p>
            </div>
            <div className="border-2 border-white p-12 flex items-center justify-center min-h-[250px]">
              <p className="text-white font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>
                SKARKALI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 29: POEM PAGE 3 - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          {/* Poem - final section */}
          <div className="space-y-10 text-black font-['TGDylgjur']">
            <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
              Það sem að<br />
              brýtur upp hakann er eitthvað<br />
              sem að er algjörlega ótengdi
            </p>
            <p className="text-[clamp(36px,4.5vw,64px)] leading-tight text-justify" style={{ fontWeight: 400 }}>
              og minnir mann á að maðurinn veit í rauninni ekki einu sinni hvað hann er að leita að.
            </p>
            <p className="text-[clamp(28px,3.5vw,48px)] leading-tight" style={{ fontWeight: 300 }}>
              Maðurinn er bara að<br />
              keyra sig í kringum sinn eigin hala
            </p>
            <p className="text-[clamp(40px,5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>
              og situr þar<br />
              eins og<br />
              hundur
            </p>
            <p className="text-[clamp(24px,3vw,40px)] leading-tight text-justify" style={{ fontWeight: 300 }}>
              þetta er nú eins og að hugsa um afvegaleiddan vin sem maður er hættur að tala við, það gerir ekkert gott.
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 30: FULL ICELANDIC CHARACTER SET - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-8">
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            ÁbcdÐÉf
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            ghÍjklmn
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            ÖpÞqrst
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            uvwxyzÆ
          </p>
          <p className="text-white font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            2345678
          </p>
        </div>
      </section>

      {/* PAGE 31: LOWERCASE ALPHABET - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center relative">
        <div className="max-w-[1000px] w-full">
          {/* Header */}
          <div className="absolute top-16 left-8 right-8 flex justify-between">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              MMXXV
            </p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              TG Gullhamrar
            </p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              2025
            </p>
          </div>

          <div className="space-y-8 text-black font-['TGDylgjur']">
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              abcdef
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              ghijklm
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              nopqrst
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
              uvwxyz
            </p>
          </div>

          {/* Badge */}
          <div className="absolute bottom-16 right-8">
            <div className="w-32 h-20 rounded-full border-2 border-black flex items-center justify-center">
              <p className="text-black font-['TGDylgjur'] text-sm uppercase tracking-wider">
                TG<br />FLAÐUR
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-16 left-8">
            <p className="text-black text-sm font-['TGMalromur'] opacity-70">
              Kolkrabbi Vinnustofa
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 32: POEM PAGE 1 (REPEAT) - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          {/* Poem - Swiss grid with expressionist line breaks */}
          <div className="space-y-8 text-white font-['TGDylgjur']" style={{ fontWeight: 300 }}>
            <p className="text-[clamp(40px,5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>
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

      {/* PAGE 33: TG FLAÐUR TITLE - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center">
        <div className="max-w-[1400px] w-full h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              MMXXV
            </p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              TG Gullhamrar
            </p>
            <p className="text-white text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              2025
            </p>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <p className="text-white font-['TGDylgjur'] text-[clamp(80px,10vw,160px)] leading-none" style={{ fontWeight: 400 }}>
              TG
            </p>
            <h1 className="text-white font-['TGDylgjur'] leading-none" style={{
              fontSize: 'clamp(120px, 15vw, 280px)',
              fontWeight: 400,
              letterSpacing: '-0.01em'
            }}>
              FLAÐUR
            </h1>
          </div>

          {/* Footer */}
          <div className="flex justify-center">
            <p className="text-white text-sm font-['TGMalromur'] opacity-70">
              Kolkrabbi Vinnustofa
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 34: LOWERCASE ALPHABET - LIGHT (VARIATION) */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center relative">
        <div className="max-w-[1000px] w-full">
          {/* Header */}
          <div className="absolute top-16 left-8 right-8 flex justify-between">
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              MMXXV
            </p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              TG Flaður
            </p>
            <p className="text-black text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
              2025
            </p>
          </div>

          <div className="space-y-8 text-black font-['TGDylgjur']">
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 300 }}>
              abcdef
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 300 }}>
              ghijklm
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 300 }}>
              nopqrst
            </p>
            <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 300 }}>
              uvwxyz
            </p>
          </div>

          {/* Badge */}
          <div className="absolute bottom-16 right-8">
            <div className="w-32 h-20 rounded-full border-2 border-black flex items-center justify-center">
              <p className="text-black font-['TGDylgjur'] text-sm uppercase tracking-wider">
                TG<br />FLAÐUR
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-16 left-8">
            <p className="text-black text-sm font-['TGMalromur'] opacity-70">
              Kolkrabbi Vinnustofa
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 35: GRID WITH LIGATURES - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-rows-5 gap-0 border-2 border-black">
            {/* Row 1 */}
            <div className="border-b-2 border-black p-8 grid grid-cols-2 items-center">
              <p className="text-black font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>
                ARMLÖG
              </p>
              <p className="text-black font-['TGDylgjur'] text-4xl leading-none text-right" style={{ fontWeight: 300 }}>
                37
              </p>
            </div>

            {/* Row 2 */}
            <div className="border-b-2 border-black p-8">
              <div className="flex items-center justify-between">
                <div className="w-24 h-16 rounded-full border-2 border-black flex items-center justify-center">
                  <p className="text-black font-['TGDylgjur'] text-xs uppercase tracking-wider">
                    TG<br />FLAÐUR
                  </p>
                </div>
                <p className="text-black font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 400 }}>
                  ÆVINTÝR
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="border-b-2 border-black p-8 grid grid-cols-2 items-center">
              <p className="text-black font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>
                KVERKAR
              </p>
              <p className="text-black font-['TGDylgjur'] text-4xl leading-none text-right" style={{ fontWeight: 300 }}>
                2
              </p>
            </div>

            {/* Row 4 */}
            <div className="border-b-2 border-black p-8 flex items-center justify-between">
              <p className="text-black font-['TGDylgjur'] text-3xl leading-none" style={{ fontWeight: 300 }}>
                / HNJASK {'{}'}
              </p>
            </div>

            {/* Row 5 */}
            <div className="p-8 grid grid-cols-2 items-center">
              <p className="text-black font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>
                KVERKAR
              </p>
              <p className="text-black font-['TGDylgjur'] text-4xl leading-none text-right" style={{ fontWeight: 300 }}>
                2025
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
