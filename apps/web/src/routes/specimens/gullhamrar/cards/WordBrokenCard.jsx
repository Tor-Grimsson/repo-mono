import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function WordBrokenCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex items-center justify-center">
          <div className="space-y-0 text-auto-inverse font-['TGGullhamrar']">
            <p className="text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 700 }}>HÚLL</p>
            <p className="text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 300, WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>um</p>
            <p className="text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 700 }}>HÆ</p>
          </div>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
