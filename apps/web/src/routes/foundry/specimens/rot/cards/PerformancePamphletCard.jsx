export default function PerformancePamphletCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-3 col-span-8 space-y-16">
          {/* Front */}
          <div className="text-center space-y-8">
                <h1 className="text-auto font-['TGRoot'] text-7xl font-black leading-none" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                  DREI
                </h1>

                <div className="space-y-2">
                  <p className="text-auto font-['TGRoot'] text-3xl font-bold" style={{ fontWeight: 700 }}>
                    Körper • Raum • Zeit
                  </p>
                </div>

                <div className="pt-8 border-t border-auto/20">
                  <p className="text-auto text-sm font-['TGRoot'] opacity-70">
                    Eine Performance von<br />
                    Hanna Müller · Lars Schneider · Eva Koch
                  </p>
                </div>
              </div>

              {/* Interior */}
              <div className="space-y-12 pt-16 border-t border-auto/20">
                <div>
                  <h2 className="text-auto font-['TGRoot'] text-2xl font-bold mb-4" style={{ fontWeight: 700 }}>
                    Aufführungen
                  </h2>
                  <div className="space-y-3 text-auto text-sm font-['TGRoot']">
                    <p className="opacity-80">Donnerstag, 20:00 Uhr — HAU Berlin</p>
                    <p className="opacity-80">Freitag, 20:00 Uhr — HAU Berlin</p>
                    <p className="opacity-80">Samstag, 19:00 Uhr — HAU Berlin</p>
                  </div>
                </div>

                <div>
                  <p className="text-auto text-sm font-['TGRoot'] leading-relaxed opacity-70">
                    DREI untersucht die Beziehung zwischen Körper und architektonischem Raum durch eine Choreographie des Alltäglichen. Drei Performer bewegen sich durch streng definierte geometrische Muster und schaffen dabei eine Spannung zwischen individueller Geste und kollektiver Struktur.
                  </p>
                </div>

                <div className="pt-6 border-t border-auto/20">
                  <p className="text-auto text-xs font-['TGRoot'] opacity-50">
                    Dauer: 75 Minuten ohne Pause<br />
                    Tickets: www.hebbel-am-ufer.de
                  </p>
                </div>
          </div>
        </div>
      </div>
    </section>
  )
}
