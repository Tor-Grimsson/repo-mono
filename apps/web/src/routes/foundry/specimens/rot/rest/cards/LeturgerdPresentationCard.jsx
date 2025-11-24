export default function LeturgerdPresentationCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
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
  )
}
