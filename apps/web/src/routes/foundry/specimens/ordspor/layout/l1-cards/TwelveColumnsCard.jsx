export default function TwelveColumnsCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Layout Demonstration
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              12 Columns
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ gridColumn: 'span 1' }} className="bg-surface-inverse/5 border border-auto/10 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-sm font-bold">{i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
