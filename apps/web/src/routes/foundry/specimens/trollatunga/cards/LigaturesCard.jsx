export default function LigaturesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-12">
            <h3 className="text-auto font-['TGTrollatunga'] text-[clamp(20px,2.5vw,32px)] mb-2">
              Samsteypur / Ligatures
            </h3>
            <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">
              Special Character Combinations
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-50 mb-4">
                Bold
              </p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(56px,7vw,112px)] leading-none" style={{ fontWeight: 700 }}>
                ffl fi fj fl ff ffi fr
              </p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(56px,7vw,112px)] leading-none mt-4" style={{ fontWeight: 700 }}>
                ct st sp ft fh tt ll
              </p>
             
            </div>

            <div>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-50 mb-4 mt-12">
                Bold Italic
              </p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(56px,7vw,112px)] leading-none italic" style={{ fontWeight: 700 }}>
                ffl fi fj fl ff ffi fr
              </p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(56px,7vw,112px)] leading-none mt-4 italic" style={{ fontWeight: 700 }}>
                ct st sp ft fh tt ll
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
