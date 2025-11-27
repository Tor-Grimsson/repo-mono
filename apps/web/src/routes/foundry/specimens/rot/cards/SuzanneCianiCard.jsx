export default function SuzanneCianiCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
            <div className="space-y-8">
              {/* Title */}
              <div>
                <p className="text-auto text-xs font-['TGRoot'] uppercase tracking-wider mb-4 opacity-40">
                  Electronic Music Performance · 1975
                </p>
                <h1 className="text-auto font-['TGRoot'] text-7xl font-black leading-none mb-4" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                  SUZANNE CIANI
                </h1>
                <p className="text-auto font-['TGRoot'] text-xl font-normal opacity-70" style={{ fontWeight: 400 }}>
                  Live on the Buchla Synthesizer
                </p>
              </div>

              {/* Content sections */}
              <div className="space-y-8">
                <div className="grid pt-8 border-t-2 border-auto" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
                  <div className="col-span-5 space-y-6">
                    <div>
                      <blockquote className="text-auto text-2xl font-['TGRoot'] font-normal leading-tight italic" style={{ fontWeight: 400 }}>
                        "The Buchla is not an instrument you play—it's an instrument you converse with. Every patch is a dialogue between intention and surprise."
                      </blockquote>
                      <p className="text-auto text-xs font-['TGRoot'] mt-4 mb-12 opacity-50">
                        — Suzanne Ciani, 1975
                      </p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-auto text-xs font-['TGRoot'] leading-relaxed">
                        Recorded live at WBAI Free Music Store, New York City, May 1975. Ciani performs improvised compositions on the Buchla 200 Series Modular Electronic Music System.
                      </p>
                      <p className="text-auto text-xs font-['TGRoot'] leading-relaxed opacity-70">
                        This historic performance captures the pioneering work of one of electronic music's most innovative composers during the formative years of synthesizer music.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-5">
                    <h2 className="text-auto font-['TGRoot'] text-2xl font-bold pb-4 border-b-2 border-auto mb-6" style={{ fontWeight: 700 }}>
                      Performance Program
                    </h2>

                    <div className="space-y-6">
                      <div className="flex justify-between items-start pb-4 border-b border-auto/20">
                        <div className="flex-1">
                          <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                            Part I: Butterfly
                          </p>
                          <p className="text-auto text-xs font-['TGRoot'] opacity-60">
                            Exploring amplitude modulation and complex waveform interactions
                          </p>
                        </div>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-40">8:47</p>
                      </div>

                      <div className="flex justify-between items-start pb-4 border-b border-auto/20">
                        <div className="flex-1">
                          <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                            Part II: Ocean Waves
                          </p>
                          <p className="text-auto text-xs font-['TGRoot'] opacity-60">
                            Voltage-controlled filters creating organic soundscapes
                          </p>
                        </div>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-40">12:18</p>
                      </div>

                      <div className="flex justify-between items-start pb-4 border-b border-auto/20">
                        <div className="flex-1">
                          <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                            Part III: The Velocity of Love
                          </p>
                          <p className="text-auto text-xs font-['TGRoot'] opacity-60">
                            Sequential voltage control and gate patterns
                          </p>
                        </div>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-40">15:03</p>
                      </div>

                      <div className="flex justify-between items-start pb-4">
                        <div className="flex-1">
                          <p className="text-auto font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                            Part IV: Industrial Landscape
                          </p>
                          <p className="text-auto text-xs font-['TGRoot'] opacity-60">
                            Noise generators and random voltage sources
                          </p>
                        </div>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-40">11:24</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credits and Technical Specs */}
              <div className="pt-8 border-t border-auto/20">
                <div className="grid gap-y-8" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
                  <div className="col-span-3">
                    <h3 className="text-auto font-['TGRoot'] text-base font-bold mb-2" style={{ fontWeight: 700 }}>
                      Technical Specifications
                    </h3>
                    <div className="space-y-1 text-auto text-xs font-['TGRoot']">
                      <p><span className="font-light">Instrument:</span> Buchla 200 Series</p>
                      <p><span className="font-light">Format:</span> 1/4" Reel-to-Reel</p>
                      <p><span className="font-light">Duration:</span> 47:32</p>
                      <p><span className="font-light">Studio:</span> WBAI Radio</p>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <h3 className="text-auto font-['TGRoot'] text-base font-bold mb-2" style={{ fontWeight: 700 }}>
                      Credits
                    </h3>
                    <div className="space-y-1 text-auto text-xs font-['TGRoot']">
                      <p><span className="font-light">Performer:</span> Suzanne Ciani</p>
                      <p><span className="font-light">Engineer:</span> Robert Margouleff</p>
                      <p><span className="font-light">Mastering:</span> Bernie Grundman</p>
                      <p><span className="font-light">Photography:</span> Michael Ochs</p>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <h3 className="text-auto font-['TGRoot'] text-base font-bold mb-2" style={{ fontWeight: 700 }}>
                      Publication Details
                    </h3>
                    <div className="space-y-1 text-auto text-xs font-['TGRoot']">
                      <p><span className="font-light">Publisher:</span> Finders Keepers Records</p>
                      <p><span className="font-light">Catalog No:</span> FKR 095LP</p>
                      <p><span className="font-light">Released:</span> October 2018</p>
                      <p><span className="font-light">Format:</span> 180g Vinyl LP + Download</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
