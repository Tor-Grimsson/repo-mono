export default function TwoColumnCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Two Column Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              6 + 6
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 6' }} className="bg-surface p-12">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Left Column
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                Spanning 6 columns with {gutter}px gutter. Typography aligned to baseline grid for vertical rhythm and visual consistency.
              </p>
            </div>

            <div style={{ gridColumn: 'span 6' }} className="bg-surface-inverse/5 p-12">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Right Column
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                Equal width columns create balanced compositions. Grid system provides structure while maintaining flexibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
