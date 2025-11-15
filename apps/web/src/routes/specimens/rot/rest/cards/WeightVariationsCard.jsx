export default function WeightVariationsCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10">
          <div className="space-y-12">
            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Light</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 300 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Regular</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 400 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Bold</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight" style={{ fontWeight: 700 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Light Italic</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight italic" style={{ fontWeight: 300 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">Bold Italic</p>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,80px)] leading-tight italic" style={{ fontWeight: 700 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              80 PT WEIGHT COMPARISON
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
