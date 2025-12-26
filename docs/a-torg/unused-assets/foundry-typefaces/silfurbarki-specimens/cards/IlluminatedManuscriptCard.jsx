export default function IlluminatedManuscriptCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10">
          {/* Manuscript page */}
          <div className="border border-auto opacity-20 p-12">
            <div className="space-y-6">
              {/* Large ornate drop cap */}
              <div className="float-left mr-6 mt-4">
                <p className="text-auto font-['TGSilfurbarki'] text-[clamp(140px,16vw,220px)] leading-none">
                  H
                </p>
              </div>

              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed" style={{ fontWeight: 300 }}>
                andarit þetta er ritað á skinni úr kálfskinni og geymir sögur úr fornum tímum, þegar goðin ríktu yfir heiminum og hetjur gengu um lönd Norðrlanda.
              </p>

              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
                Fornar rúnir segja frá ævintýrum þeirra sem lögðu á haf út til að leita að nýjum löndum og frægð.
              </p>

              <p className="text-auto font-['TGMalromur'] text-[clamp(16px,2vw,28px)] leading-relaxed mt-6" style={{ fontWeight: 300 }}>
                Í þessum texta finnum við merki um fornan tíma, þegar skriftarlist var æðsta list mannkyns.
              </p>
            </div>

            {/* Marginal note */}
            <div className="mt-12 border-t border-auto opacity-20 pt-4">
              <p className="text-auto text-xs font-['TGMalromur'] italic opacity-40">
                Manuscript folio, 220 pt drop cap, 28 pt body
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
