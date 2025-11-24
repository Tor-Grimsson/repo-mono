export default function GridSystemIntroCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="mb-24">
            <h1 className="text-auto font-['TGRoot'] text-[clamp(72px,9vw,160px)] leading-none mb-8" style={{ fontWeight: 700 }}>
              Grid<br />System
            </h1>
            <p className="text-auto font-['TGMalromur'] text-[clamp(18px,2vw,32px)] leading-relaxed" style={{ maxWidth: '600px' }}>
              A modular approach to typographic layout based on Swiss design principles.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 4' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Columns
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                {columns}-column grid system with {gutter}px gutters
              </p>
            </div>

            <div style={{ gridColumn: 'span 4' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Baseline
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                24px baseline grid for vertical rhythm
              </p>
            </div>

            <div style={{ gridColumn: 'span 4' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(14px,1.5vw,20px)] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>
                Margins
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                {marginX}px horizontal margins
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
