export default function CardFooter({ columns, gutter }) {
  return (
    <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
      <div className="col-span-12 py-6">
        <p className="text-auto text-sm font-['TGMalromur'] opacity-70">Kolkrabbi Vinnustofa</p>
      </div>
    </div>
  )
}
