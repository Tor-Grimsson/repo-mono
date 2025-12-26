export default function GridSystemIntroCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-24">
            <h1 className="text-auto font-['TGOrdspor'] text-[clamp(72px,9vw,160px)] leading-none mb-8" style={{ fontWeight: 700 }}>
              Grid<br />System
            </h1>
            <p className="text-auto font-['TGOrdspor'] text-[clamp(18px,2vw,32px)] leading-relaxed" style={{ maxWidth: '600px' }}>
              A modular approach to typographic layout based on Swiss design principles.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-3">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Columns
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                10-column grid system with 24px gutters
              </p>
            </div>

            <div className="col-span-3">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Baseline
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                24px baseline grid for vertical rhythm
              </p>
            </div>

            <div className="col-span-4">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Margins
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                180px horizontal margins
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
