export default function CertificateCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
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
  )
}
