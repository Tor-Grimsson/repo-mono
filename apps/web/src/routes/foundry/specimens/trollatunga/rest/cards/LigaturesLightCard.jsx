export default function LigaturesLightCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="space-y-12 mb-24">
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              ffl fi fj fl ff ffi
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              ct st sp ft tt fr
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              Th ll № fh Qu
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight italic" style={{ fontWeight: 700 }}>
              & ß ẞ Æ ð $
            </p>
          </div>

          <div className="space-y-12">
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              ffl fi fj fl ff ffi
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              ct st sp ft tt fr
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              Th ll № fh Qu
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(80px,10vw,160px)] leading-tight" style={{ fontWeight: 700 }}>
              & ß ẞ Æ ð $
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
