export default function CharacterSetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-12">
            <h3 className="text-auto font-['TGTrollatunga'] text-[clamp(20px,2.5vw,32px)] mb-2">
              Tröllatunga Character Set
            </h3>
            <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">
              Complete Alphabet Display
            </p>
          </div>

          <div className="grid grid-cols-10 gap-6">
            {/* Row 1 - Uppercase */}
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char, i) => (
              <div key={`upper1-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,48px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}

            {/* Row 2 - Uppercase K-T */}
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((char, i) => (
              <div key={`upper2-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,48px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}

            {/* Row 3 - Uppercase U-Z */}
            {['U', 'V', 'W', 'X', 'Y', 'Z', '', '', '', ''].map((char, i) => (
              <div key={`upper3-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,48px)]" style={{ fontWeight: 700 }}>{char}</p>
              </div>
            ))}

            {/* Row 4 - Lowercase a-j */}
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((char, i) => (
              <div key={`lower1-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,48px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}

            {/* Row 5 - Lowercase k-t */}
            {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map((char, i) => (
              <div key={`lower2-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,48px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}

            {/* Row 6 - Lowercase u-z */}
            {['u', 'v', 'w', 'x', 'y', 'z', '', '', '', ''].map((char, i) => (
              <div key={`lower3-${i}`} className="border border-auto flex items-center justify-center p-4">
                <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,48px)]" style={{ fontWeight: 400 }}>{char}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
