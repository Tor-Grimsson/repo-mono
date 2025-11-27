export default function CardHeader({ columns, gutter }) {
  return (
    <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
      <div className="col-span-12 flex justify-between items-start py-6">
        <p className="text-auto text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">MMXXV</p>
        <p className="text-auto text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">TG Gullhamrar</p>
        <p className="text-auto text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">2025</p>
      </div>
    </div>
  )
}
