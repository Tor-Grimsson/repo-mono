export default function GridLayoutLightCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 86px)', gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10 grid grid-cols-10" style={{ gap: `${gutter}px` }}>
          <div className="border-2 border-auto p-8 flex items-center justify-center h-[200px] col-span-3">
            <p className="text-auto font-['TGDylgjur'] text-[56px] leading-none text-center" style={{ fontWeight: 400 }}>lýðskrum</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center h-[200px] col-span-3">
            <p className="text-auto font-['TGDylgjur'] text-[56px] leading-none text-center" style={{ fontWeight: 700 }}>hergnýr</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center h-[200px] col-span-4">
            <p className="text-auto font-['TGDylgjur'] text-[56px] leading-none text-center" style={{ fontWeight: 700 }}>Glundroði</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center h-[200px] col-span-4">
            <p className="text-auto font-['TGDylgjur'] text-[56px] leading-none text-center" style={{ fontWeight: 300 }}>skrílslæti</p>
          </div>
          <div className="border-2 border-auto p-8 flex items-center justify-center h-[200px] col-span-6">
            <p className="text-auto font-['TGDylgjur'] text-[56px] leading-none text-center" style={{ fontWeight: 400 }}>ýfingar</p>
          </div>
        </div>
      </div>
    </section>
  )
}
