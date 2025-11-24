export default function CharacterShowcaseCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">R</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">R</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Y</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Y</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">X</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">X</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">I</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">I</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">H</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">H</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Þ</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Þ</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Q</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Q</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">U</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">U</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">O</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">O</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">S</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">S</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Æ</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Æ</p>
            </div>
            <div className="text-center">
              <p className="text-auto font-['TGSilfurbarki'] text-[clamp(80px,10vw,140px)] leading-none">Ö</p>
              <p className="text-auto text-xs font-['TGMalromur'] opacity-40 mt-2">Ö</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-auto text-xs font-['TGMalromur'] uppercase tracking-wider opacity-40">
              CHARACTER SPECIMEN • 140 PT
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
