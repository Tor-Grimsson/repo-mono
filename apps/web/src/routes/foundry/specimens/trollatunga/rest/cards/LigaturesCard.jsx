import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function LigaturesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12">
          <CardHeader columns={columns} gutter={gutter} label="Sýnishorn og prufur" size="160 PT" />

          <h2 className="text-auto-inverse font-['TGMalromur'] text-[clamp(40px,5vw,72px)] mb-12 italic">
            Samsteypur / Ligatures
          </h2>

          <div className="space-y-8">
            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4">
                Bold
              </p>
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none" style={{ fontWeight: 700 }}>
                ffl fi fj fl ff ffi fr
              </p>
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4" style={{ fontWeight: 700 }}>
                ct st sp ft fh tt ll
              </p>
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4" style={{ fontWeight: 700 }}>
                Th № Qu ß ẞ Æ
              </p>
            </div>

            <div>
              <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50 mb-4 mt-12">
                Bold Italic
              </p>
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none italic" style={{ fontWeight: 700 }}>
                ffl fi fj fl ff ffi fr
              </p>
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4 italic" style={{ fontWeight: 700 }}>
                ct st sp ft fh tt ll
              </p>
              <p className="text-auto-inverse font-['TGRoot'] text-[clamp(80px,10vw,160px)] leading-none mt-4 italic" style={{ fontWeight: 700 }}>
                Th № Qu ß ẞ Æ
              </p>
            </div>
          </div>

          <CardFooter columns={columns} gutter={gutter} />
        </div>
      </div>
    </section>
  )
}
