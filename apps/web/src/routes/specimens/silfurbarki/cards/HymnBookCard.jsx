export default function HymnBookCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10">
          {/* Hymn header */}
          <div className="text-center mb-12 border-b border-auto opacity-30 pb-6">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50 mb-2">
              SÁLMUR 118
            </p>
            <h2 className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,72px)] leading-tight">
              Þakka skaparanum
            </h2>
          </div>

          {/* Hymn verses */}
          <div className="space-y-10 text-auto">
            <div className="space-y-3">
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                Lofið Drottin, því að hann er góður,<br />
                og miskunn hans varir að eilífu.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                Látið Ísrael segja:<br />
                Miskunn hans varir að eilífu.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                Látið Arons hús segja:<br />
                Miskunn hans varir að eilífu.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                Látið þá sem óttast Drottin segja:<br />
                Miskunn hans varir að eilífu.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-30">
              HYMNAL SETTING • 28 PT VERSE • 72 PT TITLE
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
