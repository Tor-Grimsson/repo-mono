export default function GridLigaturesCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 86px)', gap: `${gutter}px` }}>
        <div className="col-start-3 col-span-8 grid grid-rows-5 gap-0 border-2 border-auto">
          <div className="border-b-2 border-auto p-8 grid grid-cols-2 items-center">
            <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none" style={{ fontWeight: 700 }}>ARMLÖG</p>
            <p className="text-auto font-['TGDylgjur'] text-4xl leading-none text-right" style={{ fontWeight: 300 }}>37</p>
          </div>

          <div className="border-b-2 border-auto p-8">
            <div className="flex items-center justify-between">
              <div className="w-24 h-16 rounded-full border-2 border-auto flex items-center justify-center">
                <p className="text-auto font-['TGDylgjur'] text-xs uppercase tracking-wider">TG<br />FLAÐUR</p>
              </div>
              <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none" style={{ fontWeight: 400 }}>ÆVINTÝR</p>
            </div>
          </div>

          <div className="border-b-2 border-auto p-8 grid grid-cols-2 items-center">
            <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none" style={{ fontWeight: 700 }}>KVERKAR</p>
            <p className="text-auto font-['TGDylgjur'] text-4xl leading-none text-right" style={{ fontWeight: 300 }}>2</p>
          </div>

          <div className="border-b-2 border-auto p-8 flex items-center justify-between">
            <p className="text-auto font-['TGDylgjur'] text-3xl leading-none" style={{ fontWeight: 300 }}>/ HNJASK {'{}'}</p>
          </div>

          <div className="p-8 grid grid-cols-2 items-center">
            <p className="text-auto font-['TGDylgjur'] text-[88px] leading-none" style={{ fontWeight: 700 }}>KVERKAR</p>
            <p className="text-auto font-['TGDylgjur'] text-4xl leading-none text-right" style={{ fontWeight: 300 }}>2025</p>
          </div>
        </div>
      </div>
    </section>
  )
}
