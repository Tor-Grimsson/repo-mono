export default function LigatureFflLargeCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="w-full">
        <div className="mb-8 px-12 flex justify-between items-baseline">
          <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] italic tracking-wider opacity-60">
            Sýnishorn og prufur
          </h2>
          <p className="text-auto text-xs font-['TGMalromur'] italic opacity-40">
            960 pt
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[70vh]">
          <p className="text-auto font-['TGMalromur'] text-[clamp(280px,35vw,640px)] leading-none italic">
            ffl
          </p>
        </div>

        <div className="px-12 flex justify-end">
          <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
            2025
          </p>
        </div>
      </div>
    </section>
  )
}
