
export default function AlphabetDualCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="grid w-full flex-1" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        {/* Left column - Uppercase */}
        <div className="col-start-3 col-span-5 flex flex-col justify-center gap-6 text-auto font-['TGGullhamrar']">
          <p className="text-[120px]" style={{ fontWeight: 700, lineHeight: '140px' }}>
            ÁBCÐÉFG
          </p>
          <p className="text-[120px]" style={{ fontWeight: 700, lineHeight: '140px' }}>
            HÍJKLMNÓ
          </p>
          <p className="text-[120px]" style={{ fontWeight: 700, lineHeight: '140px' }}>
            ÞQRSTÚV
          </p>
          <p className="text-[120px]" style={{ fontWeight: 700, lineHeight: '140px' }}>
            WXÝZ&ß
          </p>
        </div>

        {/* Right column - Lowercase */}
        <div className="col-span-5 flex flex-col justify-center gap-6 text-auto font-['TGGullhamrar']">
          <p className="text-[120px]" style={{ fontWeight: 400, lineHeight: '140px' }}>
            ábcðéfg
          </p>
          <p className="text-[120px]" style={{ fontWeight: 400, lineHeight: '140px' }}>
            híjklmnó
          </p>
          <p className="text-[120px]" style={{ fontWeight: 400, lineHeight: '140px' }}>
            þqrstúv
          </p>
          <p className="text-[120px]" style={{ fontWeight: 400, lineHeight: '140px' }}>
            wxýz,;?!
          </p>
        </div>
      </div>

    </section>
  )
}
