export default function KarpBusinessCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-16">
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 700 }}>KARP</p>

          <div className="relative">
            <div className="w-64 h-32 bg-surface-inverse" style={{ transform: 'skewX(-20deg)' }} />

            <div className="mt-8 space-y-2">
              <p className="text-auto-inverse font-['TGDylgjur'] text-4xl" style={{ fontWeight: 700 }}>hrím ÍSBÚÐ</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-sm uppercase tracking-wider">GÖTUVEGI 17</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-sm uppercase tracking-wider">940 FJARÐARHÖFN</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
