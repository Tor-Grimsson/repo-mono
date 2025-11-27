export default function TwoColumnCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <p className="text-auto font-['TGOrdspor'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Layout Demonstration
            </p>
            <h2 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              Two Columns
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-5">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Column One
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                A two-column layout provides clear separation between content areas while maintaining visual balance. This structure works well for articles, documentation, and comparative content.
              </p>
            </div>

            <div className="col-span-5">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Column Two
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                Equal column widths create a harmonious rhythm across the page. The consistent vertical alignment reinforces the grid structure and provides readers with predictable content flow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
