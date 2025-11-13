export default function TorgrotContinuousCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="space-y-12 text-center">
            <p className="text-auto font-['TGMalromur'] text-[clamp(48px,6vw,120px)] leading-tight tracking-tight">
              ABCDEFGHIJ<br />
              KLMNOPQRST<br />
              UVWXYZ
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(36px,4.5vw,96px)] leading-tight tracking-tight">
              abcdefghijklmno<br />
              pqrstuvwxyz
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
