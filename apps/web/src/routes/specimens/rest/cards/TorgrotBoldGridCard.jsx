export default function TorgrotBoldGridCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="mb-8 flex justify-between items-baseline border-b border-auto/10 pb-2">
            <h2 className="text-auto font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] tracking-wider">
              Torgrot-REMASTER
            </h2>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Sat, 24 May 2025 at 20:11 · 1
            </p>
          </div>

          <div className="grid grid-cols-10 gap-0 border-l border-t border-auto/20 mb-12">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={`upper1-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={`upper2-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={`upper3-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={`lower1-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={`lower2-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={`lower3-${i}`} className="border-r border-b border-auto/20 aspect-square flex items-center justify-center">
                <p className="text-auto font-['TGMalromur'] text-[clamp(28px,3.5vw,64px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
