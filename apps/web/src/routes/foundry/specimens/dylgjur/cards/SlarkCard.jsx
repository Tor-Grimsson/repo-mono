export default function SlarkCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full h-full flex items-center justify-center" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex items-center justify-center">
          <p className="text-auto-inverse font-['TGDylgjur'] leading-none" style={{ fontSize: 'clamp(150px, 18vw, 320px)', fontWeight: 700, letterSpacing: '0.05em' }}>SLARK</p>
        </div>
      </div>
    </section>
  )
}
