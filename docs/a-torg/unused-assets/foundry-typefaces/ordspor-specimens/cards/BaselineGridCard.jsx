export default function BaselineGridCard({ columns, gutter, marginX }) {
  const baselineGrid = 24

  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <p className="text-auto font-['TGOrdspor'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Vertical Rhythm
            </p>
            <h2 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none mb-6" style={{ fontWeight: 700 }}>
              Baseline Grid
            </h2>
            <p className="text-auto font-['TGOrdspor'] text-[clamp(16px,1.8vw,24px)] leading-relaxed" style={{ maxWidth: '800px' }}>
              All text aligns to a {baselineGrid}px baseline grid creating consistent vertical rhythm throughout the layout.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-3">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(32px,4vw,48px)] mb-6" style={{ fontWeight: 700, lineHeight: `${baselineGrid * 2}px` }}>
                Large Heading
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)]" style={{ lineHeight: `${baselineGrid}px` }}>
                Text snaps to baseline grid lines, creating visual harmony and making multi-column layouts easier to balance.
              </p>
            </div>

            <div className="col-span-3">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(32px,4vw,48px)] mb-6" style={{ fontWeight: 700, lineHeight: `${baselineGrid * 2}px` }}>
                Medium Text
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)]" style={{ lineHeight: `${baselineGrid}px` }}>
                Notice how all baselines align across columns. This systematic approach creates order and rhythm.
              </p>
            </div>

            <div className="col-span-4">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(32px,4vw,48px)] mb-6" style={{ fontWeight: 700, lineHeight: `${baselineGrid * 2}px` }}>
                Alignment
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)]" style={{ lineHeight: `${baselineGrid}px` }}>
                Grid provides structure while typography provides hierarchy and meaning within that structure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
