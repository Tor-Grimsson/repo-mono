
export default function CharacterSetCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-span-12 space-y-12">
          <div className="text-center space-y-1">
            <p className="text-auto font-['TGGullhamrar'] text-base">Presents</p>
            <p className="text-auto font-['TGGullhamrar'] text-base uppercase tracking-wider">Kolkrabbi Vinnustofa</p>
          </div>

          <div className="text-center">
            <p className="text-auto font-['TGGullhamrar'] text-[120px] mb-4" style={{ fontWeight: 400, lineHeight: '120px' }}>
              TG
            </p>
            <p className="text-auto font-['TGGullhamrar'] text-[160px] mb-8" style={{ fontWeight: 700, lineHeight: '160px' }}>
              Gullhamrar
            </p>
          <div className="text-center space-y-1">
            <p className="text-auto font-['TGGullhamrar'] text-base">Modern Typeface</p>
            <p className="text-auto font-['TGGullhamrar'] text-base uppercase tracking-wider">Variable weight</p>
          </div>
         </div>

          
        </div>
      </div>

    </section>
  )
}
