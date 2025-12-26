export default function FinalTitleCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '64px', paddingBottom: '64px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        {/* Header */}
        <div className="absolute top-16 left-12">
          <p className="text-auto text-sm font-['TGMalromur'] font-bold">
            TG SILFURBARKI<br />
            Brotaletur
          </p>
        </div>

        {/* Center content */}
        <div className="col-span-12 flex items-center justify-center">
          <div className="text-center space-y-12">
            <h1 className="text-auto font-['TGSilfurbarki'] leading-none" style={{
              fontSize: 'clamp(150px, 18vw, 320px)',
              fontWeight: 400,
              letterSpacing: '-0.01em'
            }}>
              SILFURBARKI
            </h1>
            <p className="text-auto text-sm font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50">
              GUTENBERG • HYMNS • CHARTERS • RUNIC • BLACK METAL
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-[0.3em] opacity-40">
              BROTALETUR — KOLKRABBI VINNUSTOFA — MMXXV
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-16 left-12">
          <p className="text-auto text-sm font-['TGMalromur'] font-bold">
            KOLKRABBI<br />
            VINNUSTOFA
          </p>
        </div>

        <div className="absolute bottom-16 right-12">
          <p className="text-auto text-sm font-['TGMalromur'] opacity-70">
            2025
          </p>
        </div>
      </div>
    </section>
  )
}
