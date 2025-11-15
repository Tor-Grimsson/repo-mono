export default function MedievalCharterCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10">
          {/* Formal decree header */}
          <div className="text-center mb-12">
            <p className="text-auto font-['TGSilfurbarki'] text-[clamp(50px,6.5vw,96px)] leading-none">
              Tilskipun
            </p>
            <div className="w-full h-[2px] bg-auto mt-4 mb-4" />
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-[0.4em] opacity-50">
              Gefin út árið MMXXV
            </p>
          </div>

          {/* Decree body */}
          <div className="space-y-6">
            <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,24px)] leading-relaxed">
              Svo skulum vér gjöra kunnugt með þessu opna bréfi, að vér höfum veitt og með þessu bréfi veitum vér...
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,24px)] leading-relaxed">
              ...öllum þeim sem þetta bréf sjá eða heyra, að þeir skulu virða og halda þetta ákvæði í alla framtíð...
            </p>

            <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,24px)] leading-relaxed">
              ...og skal þetta bréf staðfest með innsigli okkar og votturum.
            </p>
          </div>

          {/* Signatures section */}
          <div className="mt-16 pt-8 border-t-2 border-auto">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                  Sigurður
                </p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mt-1">
                  Vottur
                </p>
              </div>
              <div>
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                  Kristín
                </p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mt-1">
                  Vottur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
