export default function RestaurantMenuCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-3 col-span-8">
            <div className="space-y-12">
              {/* Header */}
              <div className="text-center space-y-2 pb-12 border-b border-auto/20">
                <h1 className="text-auto font-['TGRoot'] text-6xl font-black leading-none" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                  NOMA
                </h1>
                <p className="text-auto text-sm font-['TGRoot'] opacity-60">
                  Fem Retters Menu<br />
                  København · 2025
                </p>
                <div className="flex justify-center gap-1 text-auto text-2xl">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>

              {/* Menu items in 2 columns */}
              <div className="grid gap-y-8" style={{ gridTemplateColumns: 'repeat(8, 86px)', gap: '24px' }}>
                {/* Column 1 - Courses 1-3 */}
                <div className="col-start-1 col-span-4 space-y-8">
                  {/* Course 1 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-auto/10 pb-3">
                      <div className="flex-1">
                        <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-1" style={{ fontWeight: 700 }}>
                          Første ret
                        </h2>
                        <p className="text-auto font-['TGRoot'] text-base font-normal mb-2" style={{ fontWeight: 400 }}>
                          Røget Ål · Grønne Æbler · Peberrod
                        </p>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-60 leading-relaxed">
                          Røget ål fra Limfjorden med syltede grønne æbler, peberrodsemulsion og sprøde urtechips
                        </p>
                      </div>
                    </div>
                    <p className="text-auto text-xs font-['TGRoot'] italic opacity-50">
                      Pairing: Riesling, Weingut Knipser 2023 • Pfalz, Tyskland
                    </p>
                  </div>

                  {/* Course 2 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-auto/10 pb-3">
                      <div className="flex-1">
                        <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-1" style={{ fontWeight: 700 }}>
                          Anden ret
                        </h2>
                        <p className="text-auto font-['TGRoot'] text-base font-normal mb-2" style={{ fontWeight: 400 }}>
                          Kammuslinger · Tang · Sødmælksskum
                        </p>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-60 leading-relaxed">
                          Råe kammuslinger med fermenteret tang, sødmælksskum og vild peberurt
                        </p>
                      </div>
                    </div>
                    <p className="text-auto text-xs font-['TGRoot'] italic opacity-50">
                      Pairing: Chablis 1er Cru, Domaine Vocoret 2022 • Bourgogne, Frankrig
                    </p>
                  </div>

                  {/* Course 3 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-auto/10 pb-3">
                      <div className="flex-1">
                        <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-1" style={{ fontWeight: 700 }}>
                          Tredje ret
                        </h2>
                        <p className="text-auto font-['TGRoot'] text-base font-normal mb-2" style={{ fontWeight: 400 }}>
                          Grillet Hummer · Brændte Løg · Mos
                        </p>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-60 leading-relaxed">
                          Hummer grillet over birkebål med emulsion af brændte løg og skovmossmør
                        </p>
                      </div>
                    </div>
                    <p className="text-auto text-xs font-['TGRoot'] italic opacity-50">
                      Pairing: Puligny-Montrachet, Domaine Leflaive 2021 • Bourgogne, Frankrig
                    </p>
                  </div>
                </div>

                {/* Column 2 - Courses 4-6 */}
                <div className="col-start-5 col-span-4 space-y-8">
                  {/* Course 4 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-auto/10 pb-3">
                      <div className="flex-1">
                        <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-1" style={{ fontWeight: 700 }}>
                          Fjerde ret
                        </h2>
                        <p className="text-auto font-['TGRoot'] text-base font-normal mb-2" style={{ fontWeight: 400 }}>
                          Vildt · Rødbede · Gran
                        </p>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-60 leading-relaxed">
                          Kronvildt fra Jægersborg Dyrehave med rødbede fem måder og grannalebouillon
                        </p>
                      </div>
                    </div>
                    <p className="text-auto text-xs font-['TGRoot'] italic opacity-50">
                      Pairing: Pinot Noir, Domaine Méo-Camuzet 2019 • Bourgogne, Frankrig
                    </p>
                  </div>

                  {/* Course 5 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-auto/10 pb-3">
                      <div className="flex-1">
                        <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-1" style={{ fontWeight: 700 }}>
                          Femte ret
                        </h2>
                        <p className="text-auto font-['TGRoot'] text-base font-normal mb-2" style={{ fontWeight: 400 }}>
                          Æble · Havtorn · Birk
                        </p>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-60 leading-relaxed">
                          Æblesorbet med havtorngelé, birkesirup og frosne birkeblade
                        </p>
                      </div>
                    </div>
                    <p className="text-auto text-xs font-['TGRoot'] italic opacity-50">
                      Pairing: Sauternes, Château d'Yquem 2020 • Bordeaux, Frankrig
                    </p>
                  </div>

                  {/* Course 6 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-auto/10 pb-3">
                      <div className="flex-1">
                        <h2 className="text-auto font-['TGRoot'] text-lg font-bold mb-1" style={{ fontWeight: 700 }}>
                          Sjette ret
                        </h2>
                        <p className="text-auto font-['TGRoot'] text-base font-normal mb-2" style={{ fontWeight: 400 }}>
                          Chokolade · Lakrids · Timian
                        </p>
                        <p className="text-auto text-xs font-['TGRoot'] opacity-60 leading-relaxed">
                          Mørk chokoladekage med lakridsglasur, tørret timian og flagesalt
                        </p>
                      </div>
                    </div>
                    <p className="text-auto text-xs font-['TGRoot'] italic opacity-50">
                      Pairing: Porto, Taylor's 20 Year Tawny • Douro, Portugal
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-12 border-t border-auto/20 text-center space-y-4">
                <p className="text-auto text-sm font-['TGRoot'] opacity-50">
                  Menu designet af Chefkok René Redzepi<br />
                  Alle ingredienser er lokale og sæsonbestemte
                </p>
                <p className="text-auto text-xs font-['TGRoot'] opacity-40">
                  Kr. 3.500 per person · Vinmenu Kr. 2.200
                </p>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
