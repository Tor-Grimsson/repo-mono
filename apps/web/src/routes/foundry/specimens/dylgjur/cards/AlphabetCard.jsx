export default function AlphabetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: `${gutter}px` }}>
        {/* Left Column - Uppercase */}
        <div className="col-start-2 col-span-4 space-y-2 text-auto font-['TGDylgjur']">
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>ABCDEFG</p>
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>HIJKLMNO</p>
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>PQRSTUV</p>
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>WXYZ&</p>
        </div>

        {/* Right Column - Lowercase */}
        <div className="col-start-7 col-span-5 space-y-2 text-auto font-['TGDylgjur']">
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>abcdef</p>
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>ghijklm</p>
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>nopqrst</p>
          <p className="text-[128px] leading-tight" style={{ fontWeight: 700 }}>uvwxyz?!</p>
        </div>
      </div>
    </section>
  )
}
