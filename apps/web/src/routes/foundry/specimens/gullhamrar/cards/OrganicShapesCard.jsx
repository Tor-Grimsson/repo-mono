import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function OrganicShapesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center relative" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 900" preserveAspectRatio="none">
          <circle cx="200" cy="300" r="120" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 800 200 Q 900 300 800 400" fill="none" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="400" cy="700" rx="100" ry="150" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        <div className="col-span-12 relative z-10 space-y-6 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>fjaðrafok glumrugangur</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>glundroði glymjandi gnauð gnöldur gorgeir</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>hergnýr hnefasteytingar hnjask Hvassyrði húllumhæ írafár jódynur</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>kveinstafir lýðskrum Mjóróma Mælgi Offors</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>orustugnýr</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>skrílslæti</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 700 }}>Skvamp</p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
