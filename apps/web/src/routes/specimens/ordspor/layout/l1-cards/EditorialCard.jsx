export default function EditorialCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Editorial Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              3 + 6 + 3
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 3' }}>
              <p className="text-auto font-['TGMalromur'] text-[clamp(11px,1.2vw,14px)] uppercase tracking-widest opacity-60 mb-4">
                Chapter 01
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed opacity-80">
                Margin notes and annotations provide context without interrupting reading flow.
              </p>
            </div>

            <div style={{ gridColumn: 'span 6' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(36px,4.5vw,72px)] leading-tight mb-8" style={{ fontWeight: 700 }}>
                Griðkerfi í íslenskri hönnun
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(15px,1.6vw,20px)] leading-relaxed mb-6">
                Svissnesk hönnunarregla byggir á kerfisbundnum nálgun þar sem allt efni er skipulagt eftir griði. Þessi aðferð tryggir samræmi, skýrleika og fagurfræðilegt jafnvægi í gegnum allt verkið.
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(15px,1.6vw,20px)] leading-relaxed mb-6">
                Með því að nota 12 dálka kerfi getum við skipt umbrotinu á margan hátt - frá einföldum tvískiptum umbrotum til flóknari þríggja eða fjögurra dálka setningar. Rifin á milli dálka, eða gutterar, halda efninu aðskildu og læsilegu.
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(15px,1.6vw,20px)] leading-relaxed">
                Grunnlínukerfi tryggir að textinn sitji á föstum línum sem endurtaka sig niður síðuna. Þetta skapar lóðrétt takt sem gerir umbrotið rólegra og samhæfðara.
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }}>
              <div className="w-full aspect-square bg-surface-inverse/10 mb-6"></div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(11px,1.2vw,14px)] leading-relaxed opacity-60">
                Fig. 1.1 — Grid system demonstration showing column divisions and baseline rhythm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
