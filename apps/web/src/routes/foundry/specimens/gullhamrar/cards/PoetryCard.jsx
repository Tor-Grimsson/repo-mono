
export default function PoetryCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-3 col-span-8 space-y-16 text-auto font-['TGGullhamrar']">
          <p className="text-[128px]" style={{ fontWeight: 300, lineHeight: '140px' }}>
            Hafið,
          </p>
          <p className="text-[128px]" style={{ fontWeight: 300, lineHeight: '140px' }}>
            sæ til sólar
          </p>
          <p className="text-[96px] text-right" style={{ fontWeight: 300, lineHeight: '110px' }}>
            —spenntar
          </p>
        </div>
      </div>

    </section>
  )
}
