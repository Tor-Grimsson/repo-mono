export default function GridLayoutDarkCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 86px)', gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10 grid grid-cols-2" style={{ gap: `${gutter}px` }}>
          <div className="border-2 border-auto p-12 flex items-center justify-center h-[250px]">
            <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none text-center" style={{ fontWeight: 700 }}>ÞRUSK</p>
          </div>
          <div className="border-2 border-auto p-12 flex items-center justify-center h-[250px]">
            <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none text-center" style={{ fontWeight: 700 }}>DYNKUR</p>
          </div>
          <div className="border-2 border-auto p-12 flex items-center justify-center h-[250px]">
            <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none text-center" style={{ fontWeight: 700 }}>AMBUR</p>
          </div>
          <div className="border-2 border-auto p-12 flex items-center justify-center h-[250px]">
            <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none text-center" style={{ fontWeight: 700 }}>SKARKALI</p>
          </div>
        </div>
      </div>
    </section>
  )
}
