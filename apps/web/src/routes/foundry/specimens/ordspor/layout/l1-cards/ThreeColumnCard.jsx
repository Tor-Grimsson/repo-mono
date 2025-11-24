export default function ThreeColumnCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Three Column Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              4 + 4 + 4
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 4' }} className="bg-surface p-8 border border-auto/10">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column 1
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                Each column spans 4 grid columns, creating a balanced three-column layout ideal for cards, galleries, or modular content.
              </p>
              <div className="w-full h-32 bg-surface-inverse/5"></div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="bg-surface p-8 border border-auto/10">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column 2
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                Grid system allows for consistent spacing and alignment across all elements while maintaining visual hierarchy.
              </p>
              <div className="w-full h-32 bg-surface-inverse/5"></div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="bg-surface p-8 border border-auto/10">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column 3
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                Systematic approach to layout creates harmony and rhythm throughout the composition.
              </p>
              <div className="w-full h-32 bg-surface-inverse/5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
