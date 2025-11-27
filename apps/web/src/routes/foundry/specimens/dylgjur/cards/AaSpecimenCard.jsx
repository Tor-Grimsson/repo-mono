export default function AaSpecimenCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-16 flex items-center justify-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full h-full flex items-center justify-center" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 flex items-center justify-center">
          <p className="text-auto font-['TGDylgjur'] leading-none" style={{ fontSize: '480px', fontWeight: 400 }}>Aa</p>
        </div>
      </div>
    </section>
  )
}
