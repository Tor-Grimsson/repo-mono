export default function MalromurAlmannarCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="flex justify-between items-start mb-12 border-b border-auto opacity-20 pb-4">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-50">
              Specimens of Modern Printing Types
            </p>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              307
            </p>
          </div>

          <h2 className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,48px)] mb-12 italic text-center">
            Málrómur
          </h2>

          <div className="space-y-16">
            <div className="border-b border-auto opacity-10 pb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">36 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-relaxed italic">
                <span className="not-italic uppercase">ALMANNAR!</span><br />
                For piano and<br />
                cornet, the best<br />
                tune on the list<br />
                <span className="not-italic">Only 24 Cents</span>
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-auto text-xs font-['TGMalromur']">36 POINT</p>
                <p className="text-auto text-xs font-['TGMalromur'] opacity-50">5A 8a $5.50</p>
              </div>
              <p className="text-auto font-['TGMalromur'] text-[clamp(30px,4vw,72px)] leading-relaxed italic">
                <span className="not-italic uppercase">MARK DOWN</span><br />
                In prices of mining<br />
                sites and machines<br />
                for imitating eagles<br />
                and other birds.<br />
                <span className="not-italic">A choice lot at $ 3.65</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
