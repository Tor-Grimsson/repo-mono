export default function WordBrokenCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <p className="text-auto-inverse font-['TGDylgjur'] leading-none" style={{ fontSize: 'clamp(100px, 12vw, 240px)', fontWeight: 400 }}>
            húll<br />
            um<br />
            hæ
          </p>
        </div>
      </div>
    </section>
  )
}
