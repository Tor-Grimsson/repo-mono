export default function IcelandicPoetryCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-16 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-4 col-span-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <p className="text-auto text-sm font-['TGRoot'] uppercase tracking-wider opacity-100">
                TG RÓT
              </p>
              <p className="text-auto text-sm font-['TGRoot'] uppercase tracking-wider opacity-100">
                2025
              </p>
            </div>

            <div className="w-full h-px bg-surface-inverse opacity-30 mb-24" />

            {/* Main text */}
            <div className="space-y-12 text-auto font-['TGRoot']" style={{ fontWeight: 300 }}>
              <p className="text-[56px] leading-none">
                Lofaðu mér epískum<br />
                hversdagsleika,
              </p>
              <p className="text-[56px] leading-none">
                seldu mér samsæri<br />
                á staurfæti almúgans,
              </p>
              <p className="text-[56px] leading-none">
                færðu mér fönix sem<br />
                kann ekki að fljúga; reis<br />
                ekki úr ösku og<br />
                er of brotinn til að<br />
                trúa á sjálfan sig.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-16">
              <p className="text-auto text-xs font-['TGRoot'] opacity-100">
                56 PT
              </p>
            </div>
        </div>
      </div>
    </section>
  )
}
