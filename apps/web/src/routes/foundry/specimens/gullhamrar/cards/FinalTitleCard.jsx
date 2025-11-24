export default function FinalTitleCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid w-full py-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex justify-between items-start">
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(80px,10vw,160px)] leading-none mb-4" style={{ fontWeight: 400 }}>
          TG
        </p>
        <h1 className="text-auto-inverse font-['TGGullhamrar'] leading-none" style={{
          fontSize: 'clamp(120px, 15vw, 280px)',
          fontWeight: 700,
          letterSpacing: '-0.02em'
        }}>
          Gullhamrar
        </h1>
        <p className="text-auto-inverse font-['TGMalromur'] text-sm uppercase tracking-wider mt-8 opacity-70">
          Leturgerð
        </p>
      </div>

      <div className="grid w-full py-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex justify-between items-end">
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider">
            Kolkrabbi<br />Vinnustofa
          </p>
          <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-70">2025</p>
        </div>
      </div>
    </section>
  )
}
