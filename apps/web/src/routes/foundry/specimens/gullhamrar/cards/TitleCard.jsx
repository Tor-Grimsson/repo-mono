export default function TitlePageCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid w-full py-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex justify-between items-start text-auto-inverse">
          <p className="text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
          <p className="text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
          <p className="text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-auto-inverse">
        <p className="font-['TGGullhamrar'] text-[clamp(80px,10vw,160px)] leading-none" style={{ fontWeight: 400 }}>TG</p>
        <div className="w-full max-w-[800px] h-px bg-auto-inverse opacity-30" />
        <h1 className="font-['TGGullhamrar'] leading-none" style={{ fontSize: 'clamp(120px, 15vw, 280px)', fontWeight: 400 }}>
          Gullhamrar
        </h1>
      </div>

      <div className="grid w-full pb-28" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex justify-center text-auto-inverse">
          <p className="text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
        </div>
      </div>
    </section>
  )
}
