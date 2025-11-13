import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function WordListDarkCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-8 text-auto-inverse font-['TGDylgjur']">
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>Hvísl</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>Dylgjur</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>Gnýr</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>Bárugjálp</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>Þrusk</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>Kverkar</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 300 }}>flaður</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 400 }}>fagurgali</p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
