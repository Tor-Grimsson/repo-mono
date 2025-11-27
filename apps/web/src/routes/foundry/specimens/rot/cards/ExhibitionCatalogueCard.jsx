export default function ExhibitionCatalogueCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-3 col-span-8">
            {/* Cover */}
            <div className="mb-32">
              <div className="mb-12">
                <p className="text-auto text-xs font-['TGRoot'] uppercase tracking-wider mb-2 opacity-40">
                  Ausstellungskatalog
                </p>
                <h1 className="text-auto font-['TGRoot'] text-8xl font-black leading-none mb-6" style={{ fontWeight: 900 }}>
                  Dieter<br />Bauhman
                </h1>
                <p className="text-auto font-['TGRoot'] text-2xl font-normal leading-tight opacity-60" style={{ fontWeight: 400 }}>
                  Stille Geometrien
                </p>
              </div>

              <div className="border-t-2 border-auto pt-6">
                <p className="text-auto text-sm font-['TGRoot'] leading-relaxed opacity-70">
                  Museum für Moderne Kunst Frankfurt<br />
                  14 März – 18 Juni 2025
                </p>
              </div>
            </div>

            {/* Interior spread */}
            <div className="grid grid-cols-2 gap-16 mb-32">
              <div>
                <h2 className="text-auto font-['TGRoot'] text-4xl font-bold leading-tight mb-6" style={{ fontWeight: 700 }}>
                  Katalog
                </h2>
                <div className="space-y-4 text-auto text-sm font-['TGRoot'] leading-relaxed">
                  <p className="opacity-70">
                    Die Ausstellung präsentiert fünfzig Jahre minimalistischer Malerei von Dieter Bauhman, einem der bedeutendsten deutschen Künstler der Nachkriegszeit.
                  </p>
                  <p className="opacity-70">
                    Seine Werke zeichnen sich durch strenge geometrische Formen und eine reduzierte Farbpalette aus, die an die Bauhaus-Tradition anknüpfen.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-auto pl-4">
                  <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                    Werk Nr. 47
                  </p>
                  <p className="text-auto text-xs font-['TGRoot'] opacity-60">
                    Öl auf Leinwand, 200 × 150 cm, 1987
                  </p>
                </div>

                <div className="border-l-4 border-auto pl-4">
                  <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                    Werk Nr. 52
                  </p>
                  <p className="text-auto text-xs font-['TGRoot'] opacity-60">
                    Öl auf Leinwand, 180 × 180 cm, 1991
                  </p>
                </div>

                <div className="border-l-4 border-auto pl-4">
                  <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                    Werk Nr. 63
                  </p>
                  <p className="text-auto text-xs font-['TGRoot'] opacity-60">
                    Acryl auf Leinwand, 220 × 160 cm, 2003
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
