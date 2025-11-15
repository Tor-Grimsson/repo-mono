export default function OrnamentalLettersCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="space-y-12">
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(150px,18vw,280px)] leading-none">
                Q
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">
                H
              </p>
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">
                S
              </p>
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">
                R
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-40">
              ORNAMENTAL LETTERS • 140-280 PT
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
