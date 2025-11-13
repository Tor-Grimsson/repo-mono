export default function LowercaseAlphabetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid w-full relative" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-6 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            abcdefg
          </p>
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            hijklmno
          </p>
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            pqrstuv
          </p>
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 400 }}>
            wxyzß?!
          </p>
        </div>

        <div className="col-span-12 absolute bottom-16 right-8">
          <div className="w-32 h-16 rounded-full border-2 border-auto-inverse flex items-center justify-center">
            <p className="text-auto-inverse font-['TGMalromur'] text-xs uppercase tracking-wider">
              KOLKRABBI<br />VINNUSTOFA
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
