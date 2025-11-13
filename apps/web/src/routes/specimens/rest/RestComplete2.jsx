export default function RestComplete2() {
  return (
    <div className="w-full min-h-screen relative">

      {/* PAGE 1: LIGATURES ITALIC & BOLD - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          {/* Italic ligatures */}
          <div className="space-y-12 mb-24">
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              ffl fi fj fl ff ffi
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              ct st sp ft tt fr
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              Th ll № fh Qu
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              & ß ẞ Æ ð $
            </p>
          </div>

          {/* Bold ligatures */}
          <div className="space-y-12">
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              ffl fi fj fl ff ffi
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              ct st sp ft tt fr
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              Th ll № fh Qu
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              & ß ẞ Æ ð $
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 2: TG BADALAMENTI POETRY - DARK */}
      <section className="w-full min-h-screen bg-[#2a3342] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-auto-inverse opacity-30 pb-4">
            <p className="text-auto-inverse text-sm font-['TGMalromur']">
              TG Badalamenti
            </p>
            <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-50">
              2025
            </p>
          </div>

          {/* Poetry content */}
          <div className="space-y-8">
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
              Lofaðu mér epískum
              <span className="italic"> hversdagsleika,</span>
            </p>

            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
              seldu mér <span className="italic">samsæri</span><br />
              á staurfæti almúgans,
            </p>

            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
              færðu mér fönix sem<br />
              kann ekki að <span className="italic">fljúga;</span><br />
              reis ekki úr ösku og<br />
              er of brotinn til að<br />
              <span className="italic">trúa</span> á sjálfan sig.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-16">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              120 PT
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 3: MÁLRÓMUR CHARACTER SET - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <p className="text-auto text-sm font-['TGMalromur']">
              TG Málrómur
            </p>
            <p className="text-auto text-sm font-['TGMalromur'] opacity-50">
              180 PT
            </p>
          </div>

          {/* Character display */}
          <div className="space-y-6">
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,180px)] leading-tight">
              A Á Æ B C D Ð É F
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,180px)] leading-tight">
              G H I J K L M N Ó Q
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,180px)] leading-tight">
              Þ P R S T U Ý V W X
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,180px)] leading-tight">
              §/a<span className="text-orange-500">á</span>æbdðé@$
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,180px)] leading-tight">
              fg<span className="text-orange-500">g</span>h*íjklmnó
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,180px)] leading-tight">
              pÞqrstúvwxyz
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,180px)] leading-tight">
              :;0123456789!?
            </p>
          </div>

          {/* Footer */}
          <div className="mt-16">
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              2025
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 4: MODERN PRINTING TYPES - SPECIMEN 1 - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
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
                Eyðimerkur<br />
                sandalabarnakór,
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight italic">
                skelli mér í sjósund
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                fæ aldrei nóg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 5: MODERN PRINTING TYPES - SPECIMEN 2 - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
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
                Core FLOWERS
              </p>
            </div>

            <div className="border-b border-auto opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                DANDINESQUE
              </p>
            </div>

            <div className="border-b border-auto opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight italic">
                Mifflima
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 6: TWO COLUMN LAYOUT - MÁLRÓMUR EDITORIAL - DARK */}
      <section className="w-full min-h-screen bg-[#2a3342] px-12 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-2 gap-16">
            {/* Left column */}
            <div className="space-y-6">
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 400 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir
                við skák að sötri, soðin sjálfsögðum samtölum.
                Spakir sötra á sætu seyði, sjónlistarspjall,
                síðfóníur, söngur sungin suður af Síberíu.
              </p>

              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 400 }}>
                Setið að sálrænum stríðsglæpum, svaðil-pöttum
                og skyndimátum, svarthvítar svikamyllur,
                sökkvandi skálínur spegla sýnirnar – seinni tíðirnar.
              </p>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                Rennimjúkt eðal flauel, duft slæðist
                niður, silkislaufa & æðardúnn, fiður
                daðradalur, friður.
              </p>

              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 700 }}>
                Puntaður í eigin hylli, lá flatur – alveg kylli,
                og spurði með snatri: Er þetta bara minn eigin kvilli?
              </p>

              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed italic" style={{ fontWeight: 400 }}>
                Hvað annað leynist þessa kilja á milli?
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 border-t border-auto-inverse opacity-20 pt-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              TWO COLUMN EDITORIAL LAYOUT • 28 PT BODY
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 7: RÓT DISPLAY COMBINATIONS - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full space-y-16">
          <div className="space-y-4">
            <p className="text-auto font-['TGRoot'] text-[clamp(60px,8vw,144px)] leading-none" style={{ fontWeight: 700 }}>
              Blóta & Refir
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed italic">
              Lofaðu mér epískum hversdagsleika
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto font-['TGRoot'] text-[clamp(60px,8vw,144px)] leading-none" style={{ fontWeight: 300 }}>
              Ranadýra
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed">
              Seldu mér samsæri á staurfæti almúgans
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto font-['TGRoot'] text-[clamp(60px,8vw,144px)] leading-none" style={{ fontWeight: 900 }}>
              Gimsteinar
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed italic" style={{ fontWeight: 700 }}>
              Færðu mér fönix sem kann ekki að fljúga
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 8: MÁLRÓMUR WEIGHT VARIATIONS - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full">
          <div className="space-y-12">
            {/* Light */}
            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Light</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 300 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            {/* Regular */}
            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Regular</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 400 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            {/* Bold */}
            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Bold</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 700 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            {/* Light Italic */}
            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Light Italic</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight italic" style={{ fontWeight: 300 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            {/* Bold Italic */}
            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Bold Italic</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight italic" style={{ fontWeight: 700 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              80 PT WEIGHT COMPARISON
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 9: MIXED TYPOGRAPHY LAYOUT - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          {/* Large display */}
          <div className="mb-16">
            <p className="text-auto font-['TGRoot'] text-[clamp(100px,13vw,240px)] leading-none" style={{ fontWeight: 700 }}>
              Sporðskjulaga
            </p>
          </div>

          {/* Two column mixed content */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed">
                Finn þann dóm í dróma,
                fimm tommu kjaftur og málróm í kóma,
                sem sjaldan sér kann að halda,
                en góður í mó að malda.
              </p>
              <p className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 700 }}>
                Gimsteinar<br />
                & gyllinet
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2.5vw,32px)] leading-relaxed italic">
                Gleymi svo og spyr aftur, eins og fylliraftur:
                Hvar er þessi svokallaði innri kraftur?
              </p>
              <p className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight" style={{ fontWeight: 300 }}>
                Ráðstefnur<br />
                varasalvasala
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 10: FINAL TITLE PAGE - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center relative">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          {/* Header */}
          <div className="absolute top-16 left-8">
            <p className="text-auto-inverse text-sm font-['TGMalromur'] font-bold">
              REST SPECIMEN<br />
              VOLUME TWO
            </p>
          </div>

          {/* Center content */}
          <div className="text-center space-y-12">
            <div className="space-y-8">
              <h1 className="text-auto-inverse font-['TGRoot'] leading-none" style={{
                fontSize: 'clamp(120px, 15vw, 240px)',
                fontWeight: 700,
                letterSpacing: '-0.01em'
              }}>
                RÓT
              </h1>
              <h2 className="text-auto-inverse font-['TGMalromur'] leading-none italic" style={{
                fontSize: 'clamp(100px, 13vw, 200px)',
                fontWeight: 700,
                letterSpacing: '-0.01em'
              }}>
                Málrómur
              </h2>
            </div>
            <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50">
              LIGATURES • CHARACTERS • PRINTING TYPES
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
  )
}
