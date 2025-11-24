export default function BlackMetalLogoCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10 relative z-10">
          {/* Band logo style */}
          <div className="text-center space-y-16">
            <h1 className="text-auto font-['TGSilfurbarki'] leading-none tracking-tighter" style={{
              fontSize: 'clamp(100px, 13vw, 240px)',
              fontWeight: 400,
              textShadow: '0 0 60px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.4)'
            }}>
              HELHEIMR
            </h1>

            <div className="space-y-6">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,80px)] leading-tight tracking-tight">
                Myrkviðr
              </p>
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,80px)] leading-tight tracking-tight">
                Niflheimr
              </p>
            </div>
          </div>

          {/* Gothic corner ornaments */}
          <div className="absolute top-8 left-8 text-auto opacity-30">
            <p className="text-6xl font-['TGSilfurbarki']">✦</p>
          </div>
          <div className="absolute top-8 right-8 text-auto opacity-30">
            <p className="text-6xl font-['TGSilfurbarki']">✦</p>
          </div>
          <div className="absolute bottom-8 left-8 text-auto opacity-30">
            <p className="text-6xl font-['TGSilfurbarki']">✦</p>
          </div>
          <div className="absolute bottom-8 right-8 text-auto opacity-30">
            <p className="text-6xl font-['TGSilfurbarki']">✦</p>
          </div>
        </div>
      </div>
    </section>
  )
}
