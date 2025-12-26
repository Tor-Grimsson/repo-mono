export default function ComplexGridCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <p className="text-auto font-['TGOrdspor'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Complex Layout
            </p>
            <h2 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none mb-8" style={{ fontWeight: 700 }}>
              Mixed Grid
            </h2>
          </div>

          <div className="grid mb-6" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-10 bg-surface">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
                Full Width Header
              </h3>
            </div>
          </div>

          <div className="grid mb-6" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-6 bg-surface/10">
              <h4 className="text-auto font-['TGOrdspor'] text-[clamp(28px,3.5vw,56px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                6 Columns
              </h4>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                Asymmetric layouts create dynamic compositions while maintaining grid discipline.
              </p>
            </div>

            <div className="col-span-4 bg-surface/10">
              <h4 className="text-auto font-['TGOrdspor'] text-[clamp(28px,3.5vw,56px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                4 Columns
              </h4>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                Flexible grid allows for varied proportions and hierarchies.
              </p>
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-2 bg-surface/10">
              <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                2 col
              </p>
            </div>

            <div className="col-span-2 bg-surface/10">
              <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                2 col
              </p>
            </div>

            <div className="col-span-3 bg-surface/10">
              <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>

            <div className="col-span-3 bg-surface/10">
              <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
