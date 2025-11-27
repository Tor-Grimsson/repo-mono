export default function TitlePageCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full py-6" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-span-12 flex justify-between items-start text-auto">
          <p className="text-base font-['TGGullhamrar'] uppercase tracking-wider opacity-100">MMXXV</p>
          <p className="text-base font-['TGGullhamrar'] uppercase tracking-wider opacity-100">TG Gullhamrar</p>
          <p className="text-base font-['TGGullhamrar'] uppercase tracking-wider opacity-100">2025</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-auto">
        <p className="font-['TGGullhamrar'] text-[160px]" style={{ fontWeight: 400, lineHeight: '160px' }}>TG</p>
        <div className="w-full max-w-[800px] h-px bg-auto-inverse opacity-30" />
        <h1 className="font-['TGGullhamrar']" style={{ fontSize: '280px', fontWeight: 400, lineHeight: '280px' }}>
          Gullhamrar
        </h1>
      </div>

      <div className="grid w-full pb-28" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-span-12 flex justify-center text-auto">
          <p className="text-base font-['TGGullhamrar'] opacity-100">Kolkrabbi Vinnustofa</p>
        </div>
      </div>
    </section>
  )
}
