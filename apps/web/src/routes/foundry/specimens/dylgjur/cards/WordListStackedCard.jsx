export default function WordListStackedCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-10">
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Kossar</p>
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Armlög</p>
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Daður</p>
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Flangs</p>
        </div>
      </div>
    </section>
  )
}
