export default function WordListCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: `${gutter}px` }}>
        {/* Left Column - Word List Dark */}
        <div className="col-start-3 col-span-4 space-y-2 text-auto font-['TGDylgjur']">
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Hvísl</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Dylgjur</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Gnýr</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Kverkar</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>flaður</p>
        </div>

        {/* Right Column - Word List Stacked */}
        <div className="col-start-7 col-span-4 space-y-2 text-auto font-['TGDylgjur']">
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Kossar</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Armlög</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Daður</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>Flangs</p>
          <p className="text-[96px] leading-tight" style={{ fontWeight: 700 }}>fagurgali</p>
        </div>
      </div>
    </section>
  )
}
