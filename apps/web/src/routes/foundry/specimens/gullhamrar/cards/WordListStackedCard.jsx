import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function WordListStackedCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-10 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Kossar</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Armlög</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Daður</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Flangs</p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
