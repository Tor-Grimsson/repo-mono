export default function PoemPage3Card({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse py-24" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="w-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 md:col-span-10 md:col-start-2 space-y-10 text-auto-inverse font-['TGDylgjur']">
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 300 }}>
            Það sem að<br />
            brýtur upp hakann er eitthvað<br />
            sem að er algjörlega ótengdi
          </p>
          <p className="text-[clamp(36px,4.5vw,64px)] leading-tight text-justify" style={{ fontWeight: 400 }}>
            og minnir mann á að maðurinn veit í rauninni ekki einu sinni hvað hann er að leita að.
          </p>
          <p className="text-[clamp(28px,3.5vw,48px)] leading-tight" style={{ fontWeight: 300 }}>
            Maðurinn er bara að<br />
            keyra sig í kringum sinn eigin hala
          </p>
          <p className="text-[clamp(40px,5vw,72px)] leading-tight" style={{ fontWeight: 700 }}>
            og situr þar<br />
            eins og<br />
            hundur
          </p>
          <p className="text-[clamp(24px,3vw,40px)] leading-tight text-justify" style={{ fontWeight: 300 }}>
            þetta er nú eins og að hugsa um afvegaleiddan vin sem maður er hættur að tala við, það gerir ekkert gott.
          </p>
        </div>
      </div>
    </section>
  )
}
