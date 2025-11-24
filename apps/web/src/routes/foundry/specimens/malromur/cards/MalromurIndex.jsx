export default function SpecimenProseIndex() {
  return (
    <div className="w-full min-h-screen relative">
      {/* INDEX/DIRECTORY */}
      <section className="w-full h-screen snap-start flex items-center">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
            <div className="col-span-8 col-start-3">
              <h2 className="text-auto text-3xl font-normal font-['TGMalromur'] mb-8" style={{ lineHeight: '40px' }}>
                Index <span className="italic">of</span> Icelandic Terms
              </h2>
            </div>

            <div className="col-span-2 col-start-3 text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>
              <div className="space-y-3">
              <div>
                <p className="font-semibold">Ást</p>
                <p className="pl-4 text-xs italic">love, affection</p>
              </div>
              <div>
                <p className="font-semibold">Augnablik</p>
                <p className="pl-4 text-xs italic">moment, instant</p>
              </div>
              <div>
                <p className="font-semibold">Bátur</p>
                <p className="pl-4 text-xs italic">boat, vessel</p>
              </div>
              <div>
                <p className="font-semibold">Bjór</p>
                <p className="pl-4 text-xs italic">beer</p>
              </div>
              <div>
                <p className="font-semibold">Bók</p>
                <p className="pl-4 text-xs italic">book</p>
              </div>
              <div>
                <p className="font-semibold">Dagur</p>
                <p className="pl-4 text-xs italic">day</p>
              </div>
              <div>
                <p className="font-semibold">Draumur</p>
                <p className="pl-4 text-xs italic">dream</p>
              </div>
              <div>
                <p className="font-semibold">Eldur</p>
                <p className="pl-4 text-xs italic">fire</p>
              </div>
              </div>
            </div>

            <div className="col-span-2 text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>
              <div className="space-y-3">
              <div>
                <p className="font-semibold">Fjall</p>
                <p className="pl-4 text-xs italic">mountain</p>
              </div>
              <div>
                <p className="font-semibold">Flugvöllur</p>
                <p className="pl-4 text-xs italic">airport</p>
              </div>
              <div>
                <p className="font-semibold">Gluggaveður</p>
                <p className="pl-4 text-xs italic">window weather</p>
              </div>
              <div>
                <p className="font-semibold">Hestur</p>
                <p className="pl-4 text-xs italic">horse</p>
              </div>
              <div>
                <p className="font-semibold">Himinn</p>
                <p className="pl-4 text-xs italic">sky, heaven</p>
              </div>
              <div>
                <p className="font-semibold">Jökull</p>
                <p className="pl-4 text-xs italic">glacier</p>
              </div>
              <div>
                <p className="font-semibold">Kaffi</p>
                <p className="pl-4 text-xs italic">coffee</p>
              </div>
              <div>
                <p className="font-semibold">Köttur</p>
                <p className="pl-4 text-xs italic">cat</p>
              </div>
              </div>
            </div>

            <div className="col-span-2 text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>
              <div className="space-y-3">
              <div>
                <p className="font-semibold">Ljós</p>
                <p className="pl-4 text-xs italic">light</p>
              </div>
              <div>
                <p className="font-semibold">Matur</p>
                <p className="pl-4 text-xs italic">food</p>
              </div>
              <div>
                <p className="font-semibold">Myrkur</p>
                <p className="pl-4 text-xs italic">darkness</p>
              </div>
              <div>
                <p className="font-semibold">Náttúra</p>
                <p className="pl-4 text-xs italic">nature</p>
              </div>
              <div>
                <p className="font-semibold">Regn</p>
                <p className="pl-4 text-xs italic">rain</p>
              </div>
              <div>
                <p className="font-semibold">Sjór</p>
                <p className="pl-4 text-xs italic">sea, ocean</p>
              </div>
              <div>
                <p className="font-semibold">Sól</p>
                <p className="pl-4 text-xs italic">sun</p>
              </div>
              <div>
                <p className="font-semibold">Stjarna</p>
                <p className="pl-4 text-xs italic">star</p>
              </div>
              </div>
            </div>

            <div className="col-span-2 text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>
              <div className="space-y-3">
              <div>
                <p className="font-semibold">Tími</p>
                <p className="pl-4 text-xs italic">time</p>
              </div>
              <div>
                <p className="font-semibold">Vatn</p>
                <p className="pl-4 text-xs italic">water, lake</p>
              </div>
              <div>
                <p className="font-semibold">Veður</p>
                <p className="pl-4 text-xs italic">weather</p>
              </div>
              <div>
                <p className="font-semibold">Vindur</p>
                <p className="pl-4 text-xs italic">wind</p>
              </div>
              <div>
                <p className="font-semibold">Vor</p>
                <p className="pl-4 text-xs italic">spring</p>
              </div>
              <div>
                <p className="font-semibold">Þjóð</p>
                <p className="pl-4 text-xs italic">nation, people</p>
              </div>
              <div>
                <p className="font-semibold">Örn</p>
                <p className="pl-4 text-xs italic">eagle</p>
              </div>
              <div>
                <p className="font-semibold">Ævintýri</p>
                <p className="pl-4 text-xs italic">adventure, fairy tale</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
