export default function IcelandicPoetryDisplayCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="space-y-12">
          <p className="text-auto font-['TGTrollatunga'] text-[clamp(50px,7vw,120px)] leading-tight">
            FAGUR ER<br />
            SJÓFIÐLU
          </p>

          <p className="text-auto font-['TGTrollatunga'] text-[clamp(40px,5.5vw,96px)] leading-tight italic">
            bragur, setur ei<br />
            skilyrðum bann
          </p>

          <p className="text-auto font-['TGTrollatunga'] text-[clamp(32px,4.5vw,80px)] leading-tight">
            Fettir og brettir<br />
            úthöfum — Elskan
          </p>

         
          </div>
        </div>
      </div>
    </section>
  )
}
