export default function WaterfallCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10 space-y-8">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(100px,12vw,200px)] leading-none" style={{ fontWeight: 700 }}>
                Blóta
              </p>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">200 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(85px,10vw,170px)] leading-none" style={{ fontWeight: 700 }}>
                Refir
              </p>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">170 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(72px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
                Áföllum
              </p>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">144 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(58px,7vw,112px)] leading-none" style={{ fontWeight: 700 }}>
                Ranadýra
              </p>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">112 PT</p>
            </div>

         

            <div className="flex items-baseline justify-between">
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(36px,4.5vw,72px)] leading-none" style={{ fontWeight: 700 }}>
                Sporðskjulaga
              </p>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">72 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,56px)] leading-none" style={{ fontWeight: 700 }}>
                Gimsteinar & gyllinet
              </p>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">56 PT</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(22px,2.8vw,44px)] leading-none" style={{ fontWeight: 700 }}>
                Ráðstefnur varasalvasala
              </p>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">44 PT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
