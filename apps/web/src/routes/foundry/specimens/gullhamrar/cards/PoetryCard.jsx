import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function PoetryCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-16 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(60px,8vw,128px)] leading-tight" style={{ fontWeight: 300 }}>
            Hafið,
          </p>
          <p className="text-[clamp(60px,8vw,128px)] leading-tight" style={{ fontWeight: 300 }}>
            sæ til sólar
          </p>
          <p className="text-[clamp(48px,6vw,96px)] leading-tight text-right" style={{ fontWeight: 300 }}>
            —spenntar
          </p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
