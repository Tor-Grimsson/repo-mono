export default function UppercaseAlphabetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid w-full relative" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 absolute top-0 left-0">
          <div className="w-32 h-16 rounded-full border-2 border-auto-inverse flex items-center justify-center">
            <p className="text-auto-inverse font-['TGMalromur'] text-xs uppercase tracking-wider">
              KOLKRABBI<br />VINNUSTOFA
            </p>
          </div>
        </div>

        <div className="col-span-12 space-y-6 text-auto-inverse font-['TGGullhamrar'] pt-24">
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
            ABCDEFG
          </p>
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
            HIJKLMNO
          </p>
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
            PQRSTUV
          </p>
          <p className="text-[clamp(60px,8vw,120px)] leading-tight" style={{ fontWeight: 700 }}>
            WXYZ&
          </p>
        </div>

        <div className="col-span-12">
          <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 pt-12">
            Kolkrabbi Vinnustofa
          </p>
        </div>
      </div>
    </section>
  )
}
