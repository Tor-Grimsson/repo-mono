export default function ComplexGridCard({ columns, gutter, marginX }) {
  const baselineGrid = 24

  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Complex Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none mb-8" style={{ fontWeight: 700 }}>
              Mixed Grid
            </h2>
          </div>

          <div className="grid mb-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 12' }} className="bg-surface p-12">
              <h3 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
                Full Width Header
              </h3>
            </div>
          </div>

          <div className="grid mb-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 7' }} className="bg-surface-inverse/10 p-8">
              <h4 className="text-auto font-['TGRoot'] text-[clamp(28px,3.5vw,56px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                7 Columns
              </h4>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                Asymmetric layouts create dynamic compositions while maintaining grid discipline.
              </p>
            </div>

            <div style={{ gridColumn: 'span 5' }} className="bg-surface-inverse/10 p-8">
              <h4 className="text-auto font-['TGRoot'] text-[clamp(28px,3.5vw,56px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                5 Columns
              </h4>
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.5vw,18px)] leading-relaxed">
                Flexible grid allows for varied proportions and hierarchies.
              </p>
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 3' }} className="bg-surface-inverse/10 p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }} className="bg-surface-inverse/10 p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }} className="bg-surface-inverse/10 p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>

            <div style={{ gridColumn: 'span 3' }} className="bg-surface-inverse/10 p-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                3 col
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
