
export default function WordListStackedCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        {/* Left column - Word list */}
        <div className="col-start-2 col-span-3 space-y-10 text-auto font-['TGGullhamrar']">
          <p className="text-[128px]" style={{ fontWeight: 700, lineHeight: '128px' }}>Kossar</p>
          <p className="text-[128px]" style={{ fontWeight: 700, lineHeight: '128px' }}>Armlög</p>
          <p className="text-[128px]" style={{ fontWeight: 700, lineHeight: '128px' }}>Daður</p>
          <p className="text-[128px]" style={{ fontWeight: 700, lineHeight: '128px' }}>Flangs</p>
        </div>

        {/* Right column - Special characters */}
        <div className="col-start-6 col-span-7 space-y-10 text-auto font-['TGGullhamrar']">
         
          <p className="text-[128px]" style={{ fontWeight: 300, lineHeight: '128px' }}>{'{'}01.2559.273{'}'}</p>
          <p className="text-[128px]" style={{ fontWeight: 300, lineHeight: '128px' }}>ÞUS & FJAS-NP</p>
          <p className="text-[128px]" style={{ fontWeight: 300, lineHeight: '128px' }}>*GLUNDROÐI*</p>
          <p className="text-[128px]" style={{ fontWeight: 300, lineHeight: '128px' }}>BLÍSTUR-FLAUT</p>
          
        </div>
      </div>

    </section>
  )
}
