export default function SizeProgressionCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">36 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-tight">
              Beautiful Invasions
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">30 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(26px,3.5vw,60px)] leading-tight">
              BUREAUCRATIC GAMES
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">24 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(22px,3vw,48px)] leading-tight">
              Enchanted Marches Tonight
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">18 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-tight">
              Photographers resolution Gorgeous display
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">14 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(14px,1.8vw,28px)] leading-tight">
              Provocation and Sensation Patent cylinder machines
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">12 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.5vw,24px)] leading-tight">
              POCKET ESTIMATE magnificent Assortment Exhibitied Gallery
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">10 POINT</p>
            <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
              Gorgeous, Gallant and Charming magnificent Assortment 1234567890
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
