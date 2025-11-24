import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function SpecialCharactersCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-6 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>RAUP.GORT</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 300 }}>:VELLYSTINGAR:</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>RAUP:GORT</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>&lt;LÓFAKLAPP&gt;</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 300 }}>{'{'}1.456-2559.273{'}'}</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>ÞUS & FJAS-NP</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 300 }}>*GLUNDROÐI*</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>BLÍSTUR-FLAUT</p>
          <p className="text-[clamp(36px,4.5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>[ÖNGÞVEITI]</p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
