export default function RunicInscriptionCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10">
          <div className="space-y-16">
            {/* Main inscription */}
            <div className="text-center space-y-8">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,80px)] leading-tight">
                Rúnir þessar<br />
                risti Þorsteinn<br />
                í minning
              </p>
            </div>

            <div className="w-full h-[1px] bg-auto opacity-20" />

            {/* Secondary text */}
            <div className="text-center">
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] leading-relaxed opacity-80">
                Ristingarnar bera með sér forn merking<br />
                úr tímum Víkinga og forfeðra okkar<br />
                sem ferðuðust um lönd og höf
              </p>
            </div>
          </div>

          <div className="mt-24 text-center">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-30">
              RUNIC INSCRIPTION STYLE • 80 PT DISPLAY
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
