import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function WordListDualCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-start pt-10" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        {/* Left column - Dark word list */}
        <div className="col-span-6 flex flex-col gap-4 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Værð</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Deyfð</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Rénun</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Svíun</p>
          <p className="text-[clamp(60px,8vw,128px)] leading-none" style={{ fontWeight: 300 }}>Þögn</p>
        </div>

        {/* Right column - Light word list */}
        <div className="col-span-4 flex flex-col gap-2 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>MAKRÁÐUR</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>SÆLLÍFI</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>VELLYSTING</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>VANAFESTA</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>KYRRÐ</p>
          <p className="text-[clamp(50px,6vw,96px)] leading-tight" style={{ fontWeight: 700 }}>RÓSEMI</p>
        </div>

        {/* <div className="col-span-4 flex flex-col gap-2 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Kossar</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Armlög</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Daður</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Flangs</p>
        </div> */}

      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
