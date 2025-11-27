
export default function WordListDualCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="w-full flex-1 grid items-start pt-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        {/* Left column - Dark word list */}
        <div className="col-start-3 col-span-4 flex flex-col gap-2 text-auto font-['TGGullhamrar']">
          <p className="text-[96px]" style={{ fontWeight: 300, lineHeight: '110px' }}>Værð</p>
          <p className="text-[96px]" style={{ fontWeight: 300, lineHeight: '110px' }}>Deyfð</p>
          <p className="text-[96px]" style={{ fontWeight: 300, lineHeight: '110px' }}>Rénun</p>
          <p className="text-[96px]" style={{ fontWeight: 300, lineHeight: '110px' }}>Svíun</p>
          <p className="text-[96px]" style={{ fontWeight: 300, lineHeight: '110px' }}>Þögn</p>
          <p className="text-[96px]" style={{ fontWeight: 300, lineHeight: '110px' }}>Kyrrð</p>
        </div>

        {/* Right column - Light word list */}
        <div className="col-start-7 col-span-4 flex flex-col gap-2 text-auto font-['TGGullhamrar']">
          <p className="text-[96px]" style={{ fontWeight: 700, lineHeight: '110px' }}>MAKRÁÐUR</p>
          <p className="text-[96px]" style={{ fontWeight: 700, lineHeight: '110px' }}>SÆLLÍFI</p>
          <p className="text-[96px]" style={{ fontWeight: 700, lineHeight: '110px' }}>VELLYSTING</p>
          <p className="text-[96px]" style={{ fontWeight: 700, lineHeight: '110px' }}>VANAFESTA</p>
          <p className="text-[96px]" style={{ fontWeight: 700, lineHeight: '110px' }}>Öngþveiti</p>
          <p className="text-[96px]" style={{ fontWeight: 700, lineHeight: '110px' }}>RÓSEMI</p>
        </div>

        {/* <div className="col-span-4 flex flex-col gap-2 text-auto font-['TGGullhamrar']">
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Kossar</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Armlög</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Daður</p>
          <p className="text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>Flangs</p>
        </div> */}

      </div>

    </section>
  )
}
