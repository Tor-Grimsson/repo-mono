import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function WordListLightCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-8 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>MAKRÁÐUR</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>SÆLLÍFI</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>VELLYSTING</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>VANAFESTA</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>KYRRÐ</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>RÓSEMI</p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
