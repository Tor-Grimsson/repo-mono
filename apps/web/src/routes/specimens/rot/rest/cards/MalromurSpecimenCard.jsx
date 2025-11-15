export default function MalromurSpecimenCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px`, paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-start-2 col-span-10">
          <div className="flex justify-between items-start mb-12 border-b border-auto opacity-20 pb-4">
            <p className="text-auto text-sm font-['TGMalromur'] opacity-70">
              Sýnishorn og prufur
            </p>
            <p className="text-auto text-sm font-['TGMalromur'] opacity-50">
              128 PT
            </p>
          </div>

          <h2 className="text-auto font-['TGMalromur'] text-[clamp(32px,4vw,56px)] mb-8">
            TG <span className="italic">Málrómur</span>
          </h2>

          <div className="mb-12">
            <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mb-4">
              Bold italic
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(60px,8vw,128px)] leading-tight italic" style={{ fontWeight: 700 }}>
              Rennimjúkt eðal<br />
              flauel, duft slæðist<br />
              niður, silkislaufa<br />
              & æðardúnn, fiður<br />
              daðradalur, friður.
            </p>
          </div>

          <div>
            <p className="text-auto text-xs font-['TGMalromur'] opacity-50 mb-4">
              Regular
            </p>
            <p className="text-auto font-['TGMalromur'] text-[clamp(24px,3vw,60px)] leading-relaxed" style={{ fontWeight: 400 }}>
              Sjáumst sjaldnar en sálagárur, samverustundir
              við skák að sötri, soðin sjálfsögðum samtölum.
              Spakir sötra á sætu seyði, sjónlistarspjall,
              síðfóníur, söngur sungin suður af Síberíu,
              setið að sálrænum stríðsglæpum, svaðil-pöttum
              og skyndimátum, svarthvítar svikamyllur,
              sökkvandi
              skálínur spegla sýnirnar – seinni tíðirnar.
            </p>
          </div>

          <div className="mt-16">
            <p className="text-auto text-xs font-['TGMalromur'] opacity-40">
              Kolkrabbi Vinnustofa 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
