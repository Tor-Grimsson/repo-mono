export default function WeightVariationsCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-12">
            <h3 className="text-auto font-['TGTrollatunga'] text-[clamp(20px,2.5vw,32px)] mb-2">
              Weight Variations
            </h3>
            <p className="text-auto text-xs font-['TGTrollatunga'] opacity-40">
              Font Weight Comparison
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-50 mb-4">Light</p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            <div>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-50 mb-4">Regular</p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            <div>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-50 mb-4">Bold</p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            <div>
              <p className="text-auto text-xs font-['TGTrollatunga'] opacity-50 mb-4">Light Italic</p>
              <p className="text-auto font-['TGTrollatunga'] text-[clamp(28px,3.5vw,56px)] leading-tight italic" style={{ fontWeight: 300 }}>
                Sjáumst sjaldnar en sálagárur, samverustundir við skák
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}
