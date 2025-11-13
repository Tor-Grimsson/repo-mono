export default function PoemPage1DarkCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 md:col-span-10 md:col-start-2 space-y-8 text-auto-inverse font-['TGDylgjur']" style={{ fontWeight: 300 }}>
          <p className="text-[clamp(40px,5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>Að tikka er sama og að haka</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight text-justify">Að haka er að grafa sig djúpt og eyða kraftinum í að vinna bug á</p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight">
            einni skakkaðri hugmynd sem<br />
            birtist af handahófi, eins og þegar manni<br />
            dettur sálarfrændi í hug á miðri göngu
          </p>
          <p className="text-[clamp(28px,3.5vw,48px)] leading-tight text-justify">
            og menn verða einfaldlega að elta þá hugmynd alveg þar til
            manneskjan er komin í skelliferð einmana og þreyttur
          </p>
          <p className="text-[clamp(36px,4.5vw,64px)] leading-tight" style={{ fontWeight: 400 }}>
            eins og hundrað í hundrað<br />
            þarna á gólfinu
          </p>
        </div>
      </div>
    </section>
  )
}
