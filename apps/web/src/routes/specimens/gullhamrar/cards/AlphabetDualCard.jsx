import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function AlphabetDualCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        {/* Left column - Uppercase */}
        <div className="col-span-6 flex flex-col justify-center gap-6 text-auto-inverse font-['TGGullhamrar']">
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

        {/* Right column - Lowercase */}
        <div className="col-span-6 flex flex-col justify-center gap-6 text-auto-inverse font-['TGGullhamrar']">
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
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
