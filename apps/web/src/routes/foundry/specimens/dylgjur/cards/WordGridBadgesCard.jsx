export default function WordGridBadgesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 86px)', gap: `${gutter}px` }}>
        <div className="col-start-3 col-span-8 grid grid-rows-4 gap-0 border-2 border-auto">
          <div className="border-b-2 border-auto p-8 flex items-center justify-between">
            <p className="text-auto font-['TGDylgjur'] text-[120px] leading-none" style={{ fontWeight: 700 }}>PERA</p>
            <div className="w-32 h-32 rounded-full border-2 border-auto flex items-center justify-center">
              <p className="text-auto font-['TGDylgjur'] text-xs uppercase tracking-wider">GULLHAMRAR</p>
            </div>
          </div>

          <div className="border-b-2 border-auto p-8 flex items-center justify-between">
            <p className="text-auto font-['TGDylgjur'] text-[120px] leading-none" style={{ fontWeight: 700 }}>ÞVÆLA</p>
            <div className="w-32 h-32 rounded-full border-2 border-auto flex items-center justify-center">
              <p className="text-auto font-['TGDylgjur'] text-xs uppercase tracking-wider">GULLHAMRAR</p>
            </div>
          </div>

          <div className="border-b-2 border-auto p-8 flex items-center justify-between">
            <p className="text-auto font-['TGDylgjur'] text-[120px] leading-none" style={{ fontWeight: 700 }}>ÆLA</p>
            <div className="w-32 h-32 rounded-full border-2 border-auto flex items-center justify-center">
              <p className="text-auto font-['TGDylgjur'] text-xs uppercase tracking-wider">GULLHAMRAR</p>
            </div>
          </div>

          <div className="p-8 flex items-center justify-between">
            <p className="text-auto font-['TGDylgjur'] text-[120px] leading-none" style={{ fontWeight: 700 }}>ÞRUSK</p>
            <div className="w-32 h-32 rounded-full border-2 border-auto flex items-center justify-center">
              <p className="text-auto font-['TGDylgjur'] text-xs uppercase tracking-wider">GULLHAMRAR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
