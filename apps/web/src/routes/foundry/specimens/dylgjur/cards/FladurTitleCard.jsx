export default function FladurTitleCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-auto">
        <p className="font-['TGDylgjur'] text-[160px] leading-none" style={{ fontWeight: 400 }}>TG</p>
        <h1 className="font-['TGDylgjur'] leading-none" style={{ fontSize: '280px', fontWeight: 400, letterSpacing: '-0.01em' }}>FLAÐUR</h1>
      </div>

      
    </section>
  )
}
