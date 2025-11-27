export default function IcelandicPoetryDisplayCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="max-w-[1000px] w-full">
        <div className="space-y-12">
          <p className="text-auto font-['TGMalromur'] text-[clamp(50px,7vw,120px)] leading-tight">
            FAGUR ER<br />
            SJÓFIÐLU
          </p>

          <p className="text-auto font-['TGMalromur'] text-[clamp(40px,5.5vw,96px)] leading-tight italic">
            bragur, setur ei<br />
            skilyrðum bann
          </p>

          <p className="text-auto font-['TGMalromur'] text-[clamp(32px,4.5vw,80px)] leading-tight">
            Fettir og brettir<br />
            úthöfum — Elskan
          </p>

          <p className="text-auto font-['TGMalromur'] text-[clamp(28px,4vw,64px)] leading-tight italic">
            ég kenndi honum<br />
            allt sem hann kann
          </p>
        </div>
      </div>
    </section>
  )
}
