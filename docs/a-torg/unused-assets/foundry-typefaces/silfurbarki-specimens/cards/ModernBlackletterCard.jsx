export default function ModernBlackletterCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="space-y-16">
            <h1 className="text-auto font-['TGSilfurbarki'] text-[clamp(70px,9vw,160px)] leading-none tracking-tight">
              ÚTGÁFA
            </h1>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(32px,4vw,56px)] leading-tight">
                  Tónlist &<br />
                  Menning
                </p>
              </div>
              <div>
                <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,18px)] leading-relaxed opacity-70">
                  Brotaletur Silfurbarki<br />
                  finnst í nútímalegum<br />
                  hönnunarverkum og<br />
                  listrænum sýningum
                </p>
              </div>
            </div>

            <div className="border-t border-auto opacity-20 pt-8">
              <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-40">
                CONTEMPORARY USAGE • 160 PT HEADLINE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
