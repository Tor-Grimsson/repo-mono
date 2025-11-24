export default function UppercaseAlphabetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-8">
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>ABCDEFG</p>
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>HIJKLMNO</p>
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>PQRSTUV</p>
          <p className="text-auto-inverse font-['TGDylgjur'] text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>WXYZ&</p>
        </div>
      </div>
    </section>
  )
}
