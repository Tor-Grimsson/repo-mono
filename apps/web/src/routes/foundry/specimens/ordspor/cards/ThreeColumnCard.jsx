export default function ThreeColumnCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <p className="text-auto font-['TGOrdspor'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Layout Demonstration
            </p>
            <h2 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              Three Columns
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-3">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column One
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                Three-column layouts enable efficient content organization. This pattern works well for feature comparisons, product cards, and information hierarchies.
              </p>
            </div>

            <div className="col-span-3">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column Two
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                The narrower columns create a faster reading pace and allow for parallel content browsing. Users can scan multiple sections simultaneously.
              </p>
            </div>

            <div className="col-span-4">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(24px,3vw,48px)] leading-tight mb-4" style={{ fontWeight: 700 }}>
                Column Three
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(14px,1.5vw,18px)] leading-relaxed mb-6">
                This final column can be slightly wider to accommodate additional detail or serve as a focal point within the three-column structure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
