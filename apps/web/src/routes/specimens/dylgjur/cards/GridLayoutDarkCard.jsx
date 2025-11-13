export default function GridLayoutDarkCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 grid grid-cols-2 gap-4">
          <div className="border-2 border-auto-inverse p-12 flex items-center justify-center min-h-[250px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>ÞRUSK</p>
          </div>
          <div className="border-2 border-auto-inverse p-12 flex items-center justify-center min-h-[250px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>DYNKUR</p>
          </div>
          <div className="border-2 border-auto-inverse p-12 flex items-center justify-center min-h-[250px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>AMBUR</p>
          </div>
          <div className="border-2 border-auto-inverse p-12 flex items-center justify-center min-h-[250px]">
            <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 700 }}>SKARKALI</p>
          </div>
        </div>
      </div>
    </section>
  )
}
