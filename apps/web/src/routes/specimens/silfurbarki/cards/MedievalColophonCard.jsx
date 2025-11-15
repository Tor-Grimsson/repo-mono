export default function MedievalColophonCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-3 col-span-8 flex items-center">
          <div className="text-center space-y-12 w-full">
            {/* Colophon marker */}
            <div className="flex justify-center">
              <div className="w-16 h-16 border-2 border-auto flex items-center justify-center">
                <p className="text-auto font-['TGSilfurbarki'] text-4xl">✽</p>
              </div>
            </div>

            <h2 className="text-auto font-['TGSilfurbarki'] text-[clamp(40px,5vw,72px)] leading-tight">
              Hér lýkur bók þessi
            </h2>

            <div className="space-y-6">
              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] leading-relaxed">
                Rituð og prentuð í Reykjavík<br />
                árið tvö þúsund og tuttugu og fimm<br />
                að stjórn Kolkrabba vinnustofu
              </p>

              <p className="text-auto font-['TGMalromur'] text-[clamp(14px,1.8vw,20px)] leading-relaxed">
                Leturgerðin Silfurbarki<br />
                var hönnuð til heiðurs<br />
                fornum handritum
              </p>
            </div>

            <div className="pt-8">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(24px,3vw,40px)]">
                Deo gratias
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
