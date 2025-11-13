import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function WordListDarkCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-10 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Værð</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Deyfð</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Rénun</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Svíun</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Þögn</p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
