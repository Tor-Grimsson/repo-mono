export default function EditorialCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <p className="text-auto font-['TGOrdspor'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Editorial Layout
            </p>
            <h2 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              3 + 6 + 1
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-2">
              <p className="text-auto font-['TGOrdspor'] text-[clamp(11px,1.2vw,14px)] uppercase tracking-widest opacity-60 mb-4">
                Chapter 01
              </p>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed opacity-80">
                Margin notes and annotations provide context without interrupting reading flow.
              </p>
            </div>

            <div className="col-span-6">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(36px,4.5vw,72px)] leading-tight mb-8" style={{ fontWeight: 700 }}>
                Griðkerfi í íslenskri hönnun
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(15px,1.6vw,20px)] leading-relaxed mb-6">
                Svissnesk hönnunarregla byggir á kerfisbundnum nálgun þar sem allt efni er skipulagt eftir griði. Þessi aðferð tryggir samræmi, skýrleika og fagurfræðilegt jafnvægi í gegnum allt verkið.
              </p>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(15px,1.6vw,20px)] leading-relaxed mb-6">
                Með því að nota 12 dálka kerfi getum við skipt umbrotinu á margan hátt - frá einföldum tvískiptum umbrotum til flóknari þríggja eða fjögurra dálka setningar. Rifin á milli dálka, eða gutterar, halda efninu aðskildu og læsilegu.
              </p>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(15px,1.6vw,20px)] leading-relaxed">
                Grunnlínukerfi tryggir að textinn sitji á föstum línum sem endurtaka sig niður síðuna. Þetta skapar lóðrétt takt sem gerir umbrotið rólegra og samhæfðara.
              </p>
            </div>

            <div className="col-span-2">
              <div className="w-full aspect-square bg-surface/10 mb-6"></div>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(11px,1.2vw,14px)] leading-relaxed opacity-60">
                Fig. 1.1 — Grid system demonstration showing column divisions and baseline rhythm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
