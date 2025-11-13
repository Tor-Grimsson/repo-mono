import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function SignageCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-12">
          <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
            RETAIL SIGNAGE APPLICATION
          </p>

          <p className="text-auto-inverse font-['TGGullhamrar'] text-4xl italic" style={{ fontWeight: 400 }}>hrím</p>

          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            KARP
          </p>

          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(48px,6vw,88px)] leading-none" style={{ fontWeight: 400 }}>
            ÍSBÚÐ
          </p>

          <div className="w-full max-w-[600px] h-32 bg-surface-inverse" style={{ transform: 'skewX(-20deg)' }} />

          <div className="space-y-2 pt-8">
            <p className="text-auto-inverse font-['TGGullhamrar'] text-2xl uppercase tracking-wider" style={{ fontWeight: 700 }}>
              GÖTUVEGI 17
            </p>
            <p className="text-auto-inverse font-['TGGullhamrar'] text-2xl uppercase tracking-wider" style={{ fontWeight: 700 }}>
              940 FJARÐARHÖFN
            </p>
          </div>

          <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50 pt-8">
            LOCATION IDENTIFIER / ADDRESS DISPLAY
          </p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
