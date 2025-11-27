export default function MalromurOrnamentalCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="w-full max-w-[1200px]">
        <div className="mb-8 flex justify-between items-baseline border-b border-auto-inverse/10 pb-4">
          <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.2vw,18px)] uppercase tracking-widest">
            Leturgerð
          </h2>
          <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
            2025
          </p>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
          <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(60px,8vw,140px)] uppercase tracking-wider text-center">
            TG
          </p>

          <div className="w-full max-w-[800px] h-px bg-surface/20"></div>

          <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(48px,6vw,96px)] italic text-center leading-tight">
            Málrómur
          </p>

          <div className="flex items-center justify-center">
            <svg width="200" height="100" viewBox="0 0 200 100" fill="none" className="opacity-80">
              <path d="M20 50 Q50 20, 100 50 T180 50" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M100 50 L100 70 Q90 80, 80 70 Q90 60, 100 70 Q110 60, 120 70 Q110 80, 100 70" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-baseline border-t border-auto-inverse/10 pt-4">
          <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-60">
            Kolkrabbi<br />Vinnustofa
          </p>
          <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-60">
            2025
          </p>
        </div>
      </div>
    </section>
  )
}
