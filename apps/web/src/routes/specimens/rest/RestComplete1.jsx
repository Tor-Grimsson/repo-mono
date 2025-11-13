export default function RestComplete1() {
  return (
    <div className="w-full min-h-screen relative">

      {/* PAGE 1: TITLE PAGE - TG RÓT LIGATURES - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
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
      </section>

      {/* PAGE 2: TG RÓT WEIGHTS - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full">
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
      </section>

      {/* PAGE 3: TG RÓT WATERFALL - DARK */}
      <section className="w-full min-h-screen bg-[#2a3342] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full space-y-8">
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
                <circle cx="60" cy="40" r="20" fill="#2a3342" />
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
      </section>

      {/* PAGE 4: MÁLRÓMUR SPECIMEN - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1000px] w-full">
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
      </section>

      {/* PAGE 5: MÁLRÓMUR POETRY - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[900px] w-full">
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
      </section>

      {/* PAGE 6: MÁLRÓMUR TEXT SETTING - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[800px] w-full">
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
      </section>

      {/* PAGE 7: SWATCHES - EDITORIAL STYLE - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-24">
        <div className="max-w-[1200px] mx-auto space-y-16">
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
      </section>

      {/* PAGE 8: TORGROT CHARACTER SET - LIGHT */}
      <section className="w-full min-h-screen bg-[#f5f1e8] px-8 py-24 flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
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
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>A</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>B</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>C</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>D</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>E</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>F</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>G</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>H</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>I</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>J</p>
            </div>

            {/* Row 2 - Uppercase K-T */}
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>K</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>L</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>M</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>N</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>O</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>P</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>Q</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>R</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>S</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>T</p>
            </div>

            {/* Row 3 - Uppercase U-Z */}
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>U</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>V</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>W</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>X</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>Y</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>Z</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4"></div>
            <div className="border border-auto flex items-center justify-center p-4"></div>
            <div className="border border-auto flex items-center justify-center p-4"></div>
            <div className="border border-auto flex items-center justify-center p-4"></div>

            {/* Row 4 - Lowercase a-j */}
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>a</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>b</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>c</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>d</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>e</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>f</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>g</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>h</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>i</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>j</p>
            </div>

            {/* Row 5 - Lowercase k-t */}
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>k</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>l</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>m</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>n</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>o</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>p</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>q</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>r</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>s</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>t</p>
            </div>

            {/* Row 6 - Lowercase u-z */}
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>u</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>v</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>w</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>x</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>y</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4">
              <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>z</p>
            </div>
            <div className="border border-auto flex items-center justify-center p-4"></div>
            <div className="border border-auto flex items-center justify-center p-4"></div>
            <div className="border border-auto flex items-center justify-center p-4"></div>
            <div className="border border-auto flex items-center justify-center p-4"></div>
          </div>
        </div>
      </section>

      {/* PAGE 9: FINAL TITLE PAGE - DARK */}
      <section className="w-full min-h-screen bg-[#1a1d23] px-8 py-16 flex items-center justify-center relative">
        <div className="max-w-[1400px] w-full h-full flex items-center justify-center">
          {/* Header */}
          <div className="absolute top-16 left-8">
            <p className="text-auto-inverse text-sm font-['TGMalromur'] font-bold">
              KOLKRABBI<br />
              VINNUSTOFA
            </p>
          </div>

          {/* Center content */}
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
