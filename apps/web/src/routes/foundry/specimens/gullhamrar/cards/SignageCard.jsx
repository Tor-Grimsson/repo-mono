
export default function SignageCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-5 col-span-8 space-y-8">
          <p className="text-auto font-['TGGullhamrar'] text-4xl italic" style={{ fontWeight: 400, lineHeight: '44px' }}>hrím</p>

         <div>
           

            <p className="text-auto font-['TGGullhamrar'] text-[200px]" style={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '200px' }}>
               KRAP
            </p>

            <p className="text-auto font-['TGGullhamrar'] text-[88px]" style={{ fontWeight: 400, lineHeight: '88px' }}>
               ÍSBÚÐ
            </p>
         </div> 



         <div className="flex flex-row gap-8 pt-8">
            <p className="text-auto font-['TGGullhamrar'] text-2xl uppercase tracking-wider" style={{ fontWeight: 700, lineHeight: '32px' }}>
              GÖTUVEGI 17
            </p>
            <p className="text-auto font-['TGGullhamrar'] text-2xl uppercase tracking-wider" style={{ fontWeight: 700, lineHeight: '32px' }}>
              |
            </p>
            <p className="text-auto font-['TGGullhamrar'] text-2xl uppercase tracking-wider" style={{ fontWeight: 700, lineHeight: '32px' }}>
              940 FJARÐARHÖFN
            </p>
         </div>


        </div>
      </div>

    </section>
  )
}
