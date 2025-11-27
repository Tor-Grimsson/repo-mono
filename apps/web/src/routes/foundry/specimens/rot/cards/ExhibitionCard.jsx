export default function ExhibitionCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-3 col-span-8">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-auto pb-4 mb-12">
              <div>
                <p className="text-auto text-[10px] font-['TGRoot'] uppercase tracking-wider mb-2 opacity-50">
                  SPECIMENS OF TG ROOT
                </p>
                <p className="text-auto text-xs font-['TGRoot'] uppercase opacity-40">
                  10 ROOT
                </p>
              </div>
              <div>
                <p className="text-auto text-xs font-['TGRoot'] uppercase opacity-40">
                  FEATURED
                </p>
                <p className="text-auto text-[10px] font-['TGRoot'] opacity-40 text-right">
                  125
                </p>
              </div>
            </div>

            {/* 14/2 POINT - PERFORMANCES */}
            <div className="mb-12 pb-8 border-b-2 border-auto">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGRoot'] uppercase opacity-40">14/2 POINT</p>
                <p className="text-auto text-[10px] font-['TGRoot'] opacity-40">64.16.24.20</p>
              </div>
              <h2 className="text-auto font-['TGRoot'] text-5xl font-bold leading-tight">
                PERFORMANCES<br />
                Remarkable Country
              </h2>
            </div>
          </div>
      </div>
    </section>
  )
}
