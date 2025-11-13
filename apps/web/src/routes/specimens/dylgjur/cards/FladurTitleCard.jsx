export default function FladurTitleCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid w-full py-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex justify-between items-start">
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Dylgjur</p>
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-auto-inverse">
        <p className="font-['TGDylgjur'] text-[clamp(80px,10vw,160px)] leading-none" style={{ fontWeight: 400 }}>TG</p>
        <h1 className="font-['TGDylgjur'] leading-none" style={{ fontSize: 'clamp(120px, 15vw, 280px)', fontWeight: 400, letterSpacing: '-0.01em' }}>FLAÐUR</h1>
      </div>

      <div className="grid w-full py-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex justify-center">
          <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
        </div>
      </div>
    </section>
  )
}
