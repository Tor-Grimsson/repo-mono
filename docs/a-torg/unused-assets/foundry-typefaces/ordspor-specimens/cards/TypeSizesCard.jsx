export default function TypeSizesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-3 col-span-8">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-auto pb-4 mb-12">
            <div>
              <p className="text-auto text-[10px] font-['TGOrdspor'] uppercase tracking-wider mb-2 opacity-50">
                SPECIMENS OF TG ORÐSPOR
              </p>
              <p className="text-auto text-xs font-['TGOrdspor'] uppercase opacity-40">
                10 ORÐSPOR
              </p>
            </div>
            <div>
              <p className="text-auto text-xs font-['TGOrdspor'] uppercase opacity-40">
                FEATURED
              </p>
              <p className="text-auto text-[10px] font-['TGOrdspor'] opacity-40 text-right">
                125
              </p>
            </div>
          </div>

          {/* 14/2 POINT */}
          <div className="mb-8 pb-6 border-b-2 border-auto">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-auto text-[10px] font-['TGOrdspor'] uppercase opacity-40">14/2 POINT</p>
              <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">64.16.24.20</p>
            </div>
            <h2 className="text-auto font-['TGOrdspor'] text-3xl font-bold leading-tight">
              PERFORMANCES<br />
              Remarkable Country
            </h2>
          </div>

          {/* 16/2 POINT */}
          <div className="mb-8 pb-6 border-b-2 border-auto">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-auto text-[10px] font-['TGOrdspor'] uppercase opacity-40">16/2 POINT</p>
              <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">50.20.24.20</p>
            </div>
            <h2 className="text-auto font-['TGOrdspor'] text-2xl font-bold leading-tight">
              CORRESPONDENCE<br />
              Distinguished Questions
            </h2>
          </div>

          

          {/* Two column samples */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="pb-4 border-b border-auto">
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-auto text-[9px] font-['TGOrdspor'] uppercase opacity-40">20/2 POINT</p>
                <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">60.12.23.24</p>
              </div>
              <h3 className="text-auto font-['TGOrdspor'] text-lg font-bold leading-tight">
                UNREALIZATION<br />
                Beautiful Invasions
              </h3>
            </div>

            <div className="pb-4 border-b border-auto">
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-auto text-[9px] font-['TGOrdspor'] uppercase opacity-40">18/2 POINT</p>
                <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">59.16.22.24</p>
              </div>
              <h3 className="text-auto font-['TGOrdspor'] text-lg font-bold leading-tight">
                BUREAUCRATIC GAMES<br />
                Enchanted Marches
              </h3>
            </div>

            <div className="pb-4 border-b border-auto">
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-auto text-[9px] font-['TGOrdspor'] uppercase opacity-40">24/2 POINT</p>
                <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">54.16.22.24</p>
              </div>
              <h3 className="text-auto font-['TGOrdspor'] text-base font-bold leading-tight">
                POCKET ESTIMATE<br />
                Provocation and Sensation
              </h3>
            </div>

            <div className="pb-4 border-b border-auto">
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-auto text-[9px] font-['TGOrdspor'] uppercase opacity-40">24/2 POINT</p>
                <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">74.60.32.24</p>
              </div>
              <h3 className="text-auto font-['TGOrdspor'] text-base font-bold leading-tight">
                PHOTOGRAPHERS RESOLUTION<br />
                Gorgeous, Gallant and Charming
              </h3>
            </div>

            <div className="pb-4 border-b border-auto">
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-auto text-[9px] font-['TGOrdspor'] uppercase opacity-40">22/2 POINT</p>
                <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">47.61.32.24</p>
              </div>
              <h3 className="text-auto font-['TGOrdspor'] text-sm font-bold leading-tight">
                PATENT CYLINDER MACHINES<br />
                Magnificent Assortment Embelded<br />
                Extraordinary Presentation
              </h3>
            </div>

            <div className="pb-4 border-b border-auto">
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-auto text-[9px] font-['TGOrdspor'] uppercase opacity-40">20/2 POINT</p>
                <p className="text-auto text-[8px] font-['TGOrdspor'] opacity-40">40.70.32.24</p>
              </div>
              <h3 className="text-auto font-['TGOrdspor'] text-sm font-bold leading-tight">
                FATHOMS ROTARY MOTORS<br />
                Merry Deception Roussaelum<br />
                Supercalience Propounders
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
