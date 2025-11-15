export default function SjofidlaHyrpingsordCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="flex justify-between items-start mb-12 border-b border-auto-inverse opacity-20 pb-4">
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Ljóðskrípi & orðhyrpingar
            </p>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
              #7
            </p>
          </div>

          <div className="mb-12 flex justify-between items-baseline">
            <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(24px,3vw,48px)] uppercase tracking-wider">
              SJÓFIÐLA
            </h2>
            <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              HYRPINGSORÐ
            </p>
          </div>

          <div className="space-y-10">
            <div className="border-b border-auto-inverse opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">36 POINT</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">18/06 2025</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-tight">
                FAGUR ER SJÓFIÐLU<br />
                bragur, setur ei
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">30 POINT</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(26px,3.5vw,60px)] leading-tight">
                SKILYRÐUM BANN!<br />
                Fettir og brettir
              </p>
            </div>

            <div className="border-b border-auto-inverse opacity-10 pb-6">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto-inverse text-xs font-['TGMalromur']">24 POINT</p>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(22px,3vw,48px)] leading-tight">
                ÚTHÖFUM — ELSKAN; ÉG KENNDI<br />
                honum allt sem hann kann.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">18 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(16px,2vw,36px)] leading-tight">
                    UNREALIZATION<br />
                    Beautiful Invasions
                  </p>
                </div>

                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">12 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(12px,1.5vw,24px)] leading-tight">
                    POCKET ESTIMATE<br />
                    Provocation and Sensation
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">10 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
                    Patent cylinder machines<br />
                    magnificent Assortment Exhibitied<br />
                    1234567890
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">14 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(14px,1.8vw,28px)] leading-tight">
                    BUREAUCRATIC GAMES<br />
                    Enchanted Marches
                  </p>
                </div>

                <div className="border-b border-auto-inverse opacity-10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">10 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
                    Photographers resolution<br />
                    Gorgeous, Gallant and Charming
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur']">10 POINT</p>
                    <p className="text-auto-inverse text-[9px] font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
                  </div>
                  <p className="text-auto-inverse font-['TGMalromur'] text-[clamp(10px,1.3vw,20px)] leading-tight">
                    Patent cylinder machines<br />
                    magnificent Assortment Exhibitied<br />
                    1234567890
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
