export default function CardFooter({ columns, gutter }) {
  return (
    <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
      <div className="col-span-12 mt-16">
        <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
          Kolkrabbi Vinnustofa 2025
        </p>
      </div>
    </div>
  )
}
