export default function GutenbergBibleCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        {/* Left column with drop cap */}
        <div className="col-span-6">
          <div className="float-left mr-4 mt-2">
            <p className="text-auto font-['TGSilfurbarki'] text-[clamp(120px,12vw,180px)] leading-none">
              Í
            </p>
          </div>
          <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed" style={{ fontWeight: 300 }}>
            upphafi skapaði Guð himin og jörð. Jörðin var auð og tóm og myrkur var yfir djúpinu, en andi Guðs sveif yfir vötnunum. Og Guð sagði: Verði ljós. Og ljós varð. Guð sá að ljósið var gott.
          </p>
          <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
            Guð skilldi ljósið frá myrkri. Guð kallaði ljósið dag en myrkrið kallaði hann nótt. Og varð kvöld og varð morgunn.
          </p>
        </div>

        {/* Right column */}
        <div className="col-span-6">
          <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed" style={{ fontWeight: 300 }}>
            Fyrsti dagur. Og Guð sagði: Verði hvolf mitt í vötnunum og skilji vötn í sundur. Guð gjörði hvolfið og skildi vötnin sem voru undir hvolfinu frá vötnunum sem voru yfir hvolfinu.
          </p>
          <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,24px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
            Og svo varð. Guð kallaði hvolfið himin. Og varð kvöld og varð morgunn, annar dagur.
          </p>
        </div>

        {/* Footer annotation */}
        <div className="col-span-12 mt-16 border-t border-auto opacity-20 pt-4">
          <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-40">
            GUTENBERG BIBLE LAYOUT • 24 PT BODY • 180 PT DROP CAP
          </p>
        </div>
      </div>
    </section>
  )
}
