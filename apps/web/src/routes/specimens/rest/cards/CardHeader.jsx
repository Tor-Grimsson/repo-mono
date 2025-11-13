export default function CardHeader({ columns, gutter, label, size }) {
  return (
    <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
      <div className="col-span-12 flex justify-between items-start border-b border-auto-inverse opacity-30 pb-4 mb-16">
        <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
          {label || 'Sýnishorn og prufur'}
        </p>
        {size && (
          <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-50">
            {size}
          </p>
        )}
      </div>
    </div>
  )
}
