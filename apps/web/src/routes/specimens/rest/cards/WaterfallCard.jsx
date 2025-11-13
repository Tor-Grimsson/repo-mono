export default function WaterfallCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-8">
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(160px,20vw,344px)] leading-none" style={{ fontWeight: 700 }}>
                Blóta
              </p>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">344 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(140px,18vw,296px)] leading-none" style={{ fontWeight: 700 }}>
                Refir
              </p>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">296 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(120px,15vw,240px)] leading-none" style={{ fontWeight: 700 }}>
                Áföllum
              </p>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">240 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(90px,11vw,184px)] leading-none" style={{ fontWeight: 700 }}>
                Ranadýra
              </p>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">184 PT</p>
            </div>

            <div className="flex items-center justify-between gap-6">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
                Alsjáandi
              </p>
              <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-90 flex-shrink-0">
                <ellipse cx="60" cy="40" rx="58" ry="38" fill="white" />
                <circle cx="60" cy="40" r="20" fill="black" />
              </svg>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">144 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(55px,7vw,112px)] leading-none" style={{ fontWeight: 700 }}>
                Sporðskjulaga
              </p>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">112 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(40px,5vw,80px)] leading-none" style={{ fontWeight: 700 }}>
                Gimsteinar & gyllinet
              </p>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">80 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-none" style={{ fontWeight: 700 }}>
                Ráðstefnur varasalvasala
              </p>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">64 PT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
