export default function TwelveColumnsCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <p className="text-auto font-['TGOrdspor'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Layout Demonstration
            </p>
            <h2 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              10 Columns
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="col-span-1 bg-surface/5 border border-auto/10 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGOrdspor'] text-sm font-bold">{i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
