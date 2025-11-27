export default function CharacterDisplayCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-16 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        {/* Header */}
        <div className="col-start-3 col-span-8 mb-8">
          <p className="text-auto text-sm font-['TGRoot'] font-bold">
            TG RÓT<br />
            Leturgerð 2025
          </p>
        </div>

        {/* Giant ð character */}
        <div className="col-span-12 flex items-center justify-center">
          <p className="text-auto font-['TGRoot'] text-[900px] leading-none" style={{ fontWeight: 400 }}>
            ð
          </p>
        </div>
      </div>
    </section>
  )
}
