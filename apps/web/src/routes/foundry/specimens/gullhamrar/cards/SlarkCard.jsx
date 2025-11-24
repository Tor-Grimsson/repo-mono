import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function SlarkCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex items-center justify-center">
          <p className="text-auto-inverse font-['TGGullhamrar'] leading-none" style={{
            fontSize: 'clamp(150px, 18vw, 320px)',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}>
            SLARK
          </p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
