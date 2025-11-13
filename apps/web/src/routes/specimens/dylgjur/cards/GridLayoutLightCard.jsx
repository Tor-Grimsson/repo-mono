export default function GridLayoutLightCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 grid grid-cols-3 gap-4">
          <div className="border-2 border-auto p-8 flex items-center justify-center min-h-[200px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 400 }}>lýðskrum</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center min-h-[200px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 700 }}>hergnýr</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center min-h-[200px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 700 }}>Glundroði</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center min-h-[200px] col-span-2">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 300 }}>skrílslæti</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center min-h-[200px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(32px,4vw,56px)] leading-none" style={{ fontWeight: 400 }}>ýfingar</p>
          </div>
        </div>
      </div>
    </section>
  )
}
