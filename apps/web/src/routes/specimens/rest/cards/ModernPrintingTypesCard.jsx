export default function ModernPrintingTypesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="flex justify-between items-start mb-12 border-b border-auto-inverse opacity-20 pb-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Specimens of Modern Printing Types
            </p>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              307
            </p>
          </div>

          <div className="space-y-16">
            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                Eyðimerkur<br />
                sandalabarnakór,
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight italic">
                skelli mér í sjósund
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">Style: Regular</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">Size: 256 pt</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(100px,13vw,256px)] leading-tight">
                fæ aldrei nóg.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
