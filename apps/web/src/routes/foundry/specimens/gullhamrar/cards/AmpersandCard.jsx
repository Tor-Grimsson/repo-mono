
export default function AmpersandCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-span-6 flex items-center justify-center">
          <p className="text-auto font-['TGGullhamrar']" style={{ fontSize: '480px', fontWeight: 400, lineHeight: '480px' }}>&</p>
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <p className="text-auto font-['TGGullhamrar']" style={{ fontSize: '480px', fontWeight: 400, lineHeight: '480px' }}>ß</p>
        </div>
      </div>

    </section>
  )
}
