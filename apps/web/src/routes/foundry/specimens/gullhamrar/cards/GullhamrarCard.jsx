import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function CharacterSetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-12">
          <div className="text-center space-y-2">
            <p className="text-auto-inverse font-['TGMalromur'] text-xs uppercase tracking-wider">Presents</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-xs uppercase tracking-wider">Kolkrabbi Vinnustofa</p>
          </div>

          <div className="text-center">
            <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(60px,8vw,120px)] leading-none mb-4" style={{ fontWeight: 400 }}>
              TG
            </p>
            <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(80px,10vw,160px)] leading-none mb-8" style={{ fontWeight: 700 }}>
              Gullhamrar
            </p>
            <p className="text-auto-inverse font-['TGMalromur'] text-sm">Modern Typeface</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-sm">Variable weight</p>
          </div>

          <div className="space-y-4 text-auto-inverse font-['TGGullhamrar']">
            <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 700 }}>
              ABCDEFGHIJKLMN
            </p>
            <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 700 }}>
              OPQRSTUVWXYZ
            </p>
            <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 300 }}>
              abcdefghijklmn
            </p>
            <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 300 }}>
              opqrstuvwxyz
            </p>
            <p className="text-[clamp(48px,6vw,88px)] leading-tight" style={{ fontWeight: 400 }}>
              1234567890
            </p>
          </div>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
