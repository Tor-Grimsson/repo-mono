import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function ExtendedWordListCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-6">
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
            ARGAÞRAS · HNOTABIT · ILLDEILINN ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
            ORÐASKAKI · MÁLASTAPP · ÝFINGAR ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
            HERGNÝR · HÚLLUMHÆ ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
            HNEFASTEYTINGAR · KARP · GLYMJANDI ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
            GLUNDROÐI · LÝÐSKRUM · ÞÆFINGUR ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
            MJÓRÓMA · GNÖLDUR · GLUMRUGANGUR ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
            ÍRAFÁR · KVEINSTAFIR · JÓDYNUR ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>
            OFFORS · SKRÍLSLÆTI · STÍMABRAK ·
          </p>
          <p className="text-auto-inverse font-['TGGullhamrar'] text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
            SKVAMP · UPPIVÖÐSLUSEMI · TRAÐK
          </p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
