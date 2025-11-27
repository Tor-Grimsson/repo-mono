export default function BadalamentiPoetryCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="flex justify-between items-start mb-12 border-b border-auto-inverse opacity-30 pb-4">
            <p className="text-auto-inverse text-sm font-['TGMalromur']">
              TG Badalamenti
            </p>
            <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-50">
              2025
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
              Lofaðu mér epískum
              <span className="italic"> hversdagsleika,</span>
            </p>

            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
              seldu mér <span className="italic">samsæri</span><br />
              á staurfæti almúgans,
            </p>

            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
              færðu mér fönix sem<br />
              kann ekki að <span className="italic">fljúga;</span><br />
              reis ekki úr ösku og<br />
              er of brotinn til að<br />
              <span className="italic">trúa</span> á sjálfan sig.
            </p>
          </div>

          <div className="mt-16">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              120 PT
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
