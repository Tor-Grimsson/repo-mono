export default function BookTitlePageCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-3 col-span-8 flex items-center">
          <div className="border-2 border-auto p-16 text-center space-y-12 w-full">
            {/* Ornamental top */}
            <div className="text-auto text-2xl">✦ ✦ ✦</div>

            <h1 className="text-auto font-['TGSilfurbarki'] text-[clamp(50px,6.5vw,96px)] leading-tight">
              Edda Snorra<br />
              Sturlusonar
            </h1>

            <div className="space-y-4">
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] uppercase tracking-[0.3em]">
                Útgefandi
              </p>
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                Kolkrabbi
              </p>
            </div>

            <p className="text-auto font-['TGMalromur'] text-sm opacity-50">
              REYKJAVÍK • MMXXV
            </p>

            {/* Ornamental bottom */}
            <div className="text-auto text-2xl pt-8">✦ ✦ ✦</div>
          </div>
        </div>
      </div>
    </section>
  )
}
