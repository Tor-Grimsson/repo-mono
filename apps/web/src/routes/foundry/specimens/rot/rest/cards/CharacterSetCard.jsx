export default function CharacterSetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="mb-12">
            <h3 className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,40px)] mb-2">
              Torgrot-REMASTER
            </h3>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Style Comparison Rows
            </p>
          </div>

          <div className="grid grid-cols-10 gap-4 border-2 border-auto p-8">
            {/* Row 1 - Uppercase */}
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={`upper1-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}

            {/* Row 2 - Uppercase K-T */}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={`upper2-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}

            {/* Row 3 - Uppercase U-Z */}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={`upper3-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}

            {/* Row 4 - Lowercase a-j */}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={`lower1-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}

            {/* Row 5 - Lowercase k-t */}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={`lower2-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}

            {/* Row 6 - Lowercase u-z */}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={`lower3-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGRoot'] text-[clamp(40px,5vw,72px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
