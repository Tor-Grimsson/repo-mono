export default function SpecimenSheetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
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
  )
}
