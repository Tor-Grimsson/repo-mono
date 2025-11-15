export default function AsymmetricCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="mb-16">
            <p className="text-auto font-['TGMalromur'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Asymmetric Layout
            </p>
            <h2 className="text-auto font-['TGRoot'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              8 + 4
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            <div style={{ gridColumn: 'span 8' }}>
              <h3 className="text-auto font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Primary Content Area
              </h3>
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed mb-8">
                Þetta er aðalefnissvæðið sem spannar 8 dálka. Stærra svæði gefur meira rými fyrir meginefni, myndir, eða lengri texta. Ójafnvægi í umbrotinu skapar áhugaverðan mismun og leiðir auganu um síðuna.
              </p>
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                Griðkerfið heldur öllu í samræmi þrátt fyrir ójafnt hlutfall. Typography fylgir grunnlínu kerfinu og skapar samfellu í gegnum allt skipulagið.
              </p>
              <div className="w-full h-64 bg-surface-inverse/10 mt-8"></div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="space-y-6">
              <div className="bg-surface-inverse/10 p-6">
                <h4 className="text-auto font-['TGRoot'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Sidebar
                </h4>
                <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  4 column sidebar for supporting content, metadata, or navigation.
                </p>
              </div>

              <div className="bg-surface-inverse/10 p-6">
                <h4 className="text-auto font-['TGRoot'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Notes
                </h4>
                <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  Supplementary information aligned to the grid.
                </p>
              </div>

              <div className="bg-surface-inverse/10 p-6">
                <h4 className="text-auto font-['TGRoot'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Metadata
                </h4>
                <p className="text-auto font-['TGMalromur'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  Date, author, or other contextual details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
