export default function PantoneSwatchesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-3 col-span-8">
            <div className="space-y-12">
              {/* Header */}
              <div className="pb-8 border-b-2 border-auto">
                <p className="text-auto text-xs font-['TGRoot'] uppercase tracking-wider mb-4 opacity-40">
                  Press Release — For Immediate Release
                </p>
                <h1 className="text-auto font-['TGRoot'] text-6xl font-black leading-none mb-6" style={{ fontWeight: 900 }}>
                  PANTONE<br />
                  Color of the Year<br />
                  2026
                </h1>
                <p className="text-auto font-['TGRoot'] text-xl font-normal opacity-60" style={{ fontWeight: 400 }}>
                  Introducing PANTONE 17-3938 Resonant Azure
                </p>
              </div>

              {/* Body */}
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-auto text-sm font-['TGRoot'] leading-relaxed">
                    PANTONE 17-3938 Resonant Azure represents a convergence of technological optimism and environmental consciousness, embodying the duality of our digital and natural worlds.
                  </p>
                  <p className="text-auto text-sm font-['TGRoot'] leading-relaxed opacity-70">
                    This vivid blue shade speaks to our desire for tranquility while acknowledging the dynamic energy of contemporary life.
                  </p>
                </div>

                <div>
                  <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                    Color Specifications
                  </h2>
                  <div className="space-y-3 text-auto text-xs font-['TGRoot']">
                    <p><span className="font-bold">PANTONE:</span> 17-3938 TPG</p>
                    <p><span className="font-bold">RGB:</span> 98, 145, 224</p>
                    <p><span className="font-bold">HEX:</span> #6291E0</p>
                    <p><span className="font-bold">CMYK:</span> 56, 35, 0, 12</p>
                  </div>
                </div>
              </div>

              {/* Swatches */}
              <div className="grid grid-cols-4 gap-4 pt-8">
                <div>
                  <div className="w-full h-32 bg-[#6291E0] rounded mb-2" />
                  <p className="text-auto text-xs font-['TGRoot'] font-bold">17-3938</p>
                  <p className="text-auto text-[10px] font-['TGRoot'] opacity-60">Resonant Azure</p>
                </div>
                <div>
                  <div className="w-full h-32 bg-surface rounded mb-2" />
                  <p className="text-auto text-xs font-['TGRoot'] font-bold">19-4029</p>
                  <p className="text-auto text-[10px] font-['TGRoot'] opacity-60">Midnight Navy</p>
                </div>
                <div>
                  <div className="w-full h-32 bg-surface rounded border border-auto/10 mb-2" />
                  <p className="text-auto text-xs font-['TGRoot'] font-bold">11-0602</p>
                  <p className="text-auto text-[10px] font-['TGRoot'] opacity-60">Cloud Dancer</p>
                </div>
                <div>
                  <div className="w-full h-32 bg-gray-600 rounded mb-2" />
                  <p className="text-auto text-xs font-['TGRoot'] font-bold">17-1464</p>
                  <p className="text-auto text-[10px] font-['TGRoot'] opacity-60">Flame Orange</p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-auto/20">
                <p className="text-auto text-xs font-['TGRoot'] opacity-50">
                  Contact: press@pantone.com<br />
                  Pantone LLC, a wholly owned subsidiary of X-Rite, Incorporated
                </p>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
