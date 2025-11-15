export default function TitlePageCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse relative overflow-hidden" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '64px', paddingBottom: '64px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex items-center justify-center relative z-10">
          {/* Black metal style title */}
          <div className="text-center space-y-12">
            <h1 className="text-auto font-['TGSilfurbarki'] leading-none tracking-tight" style={{
              fontSize: 'clamp(140px, 18vw, 320px)',
              fontWeight: 400,
              textShadow: '0 0 40px rgba(255,255,255,0.3)'
            }}>
              SILFURBARKI
            </h1>
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-[0.5em] opacity-50">
              BROTALETUR • KOLKRABBI • MMXXV
            </p>
          </div>

          {/* Minimal geometric frame */}
          <div className="absolute inset-0 border-[1px] border-auto opacity-10 m-16" />
        </div>
      </div>
    </section>
  )
}
