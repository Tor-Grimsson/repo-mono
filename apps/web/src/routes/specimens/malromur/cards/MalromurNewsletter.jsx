export default function SpecimenProseNewsletter() {
  return (
    <div className="w-full min-h-screen relative bg-surface-inverse">
      {/* TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-auto text-[64px] font-normal font-['TGMalromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-surface-inverse mx-auto mb-8" />

          <p className="text-auto text-xl font-normal font-['TGMalromur'] leading-7 mb-2">
            <span className="italic">Newsletter</span>
          </p>

          <div className="w-32 h-[1px] bg-surface-inverse mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-auto text-base font-normal font-['TGMalromur'] leading-6">
            <p>
              Multi-Column Publications
            </p>
            <p>
              Prose Style <span className="italic">04</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-auto text-sm font-normal font-['TGMalromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER/BULLETIN */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <h2 className="text-auto text-5xl font-normal font-['TGMalromur'] leading-tight mb-2">
              Bulletin #35
            </h2>
            <p className="text-auto text-2xl font-normal font-['TGMalromur'] italic leading-8">
              General Notes
            </p>
            <div className="w-24 h-[1px] bg-surface-inverse mt-4" />
          </div>

          <div className="mb-8">
            <h3 className="text-auto text-xl font-semibold font-['TGMalromur'] leading-7 mb-2">
              The Long-billed Marsh Wren
            </h3>
            <p className="text-auto text-base font-normal font-['TGMalromur'] italic leading-6 mb-4">
              Capture of a Second Specimen
            </p>
            <div className="w-16 h-[1px] bg-surface-inverse mb-6" />

            <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 italic mb-4">
              With a pair of Field Glasses the Cardinal can be seen at a great distance in winter.
            </p>
          </div>

          <div className="columns-3 gap-8 text-auto text-sm font-normal font-['TGMalromur'] leading-6">
            <p className="mb-4">
              On November 12th we set out with determination and a singular purpose: to observe the behavioral patterns of the Long-billed Marsh Wren in its natural habitat. The morning was crisp, with a light fog hanging over the marshlands that would soon give way to the warming sun. Armed with our field notebooks and a keen sense of anticipation, we proceeded to the eastern edge of the wetlands.
            </p>

            <p className="mb-4">
              Our first sighting came at approximately 9:30 AM, when a distinctive chattering call drew our attention to a dense patch of cattails. There, perched precariously on a swaying stem, was an adult specimen in full breeding plumage. The bird's characteristic upright tail and nervous demeanor were immediately apparent.
            </p>

            <p className="mb-4">
              What followed was a remarkable display of territorial behavior. The wren proceeded to visit no fewer than six separate nest structures within a radius of twenty meters, each constructed with the intricate dome shape characteristic of the species. It became clear that this particular individual was maintaining multiple nesting sites, a behavior previously documented but rarely observed in such detail.
            </p>

            <p className="mb-4">
              The vocal repertoire proved equally fascinating. Over the course of three hours, we documented fourteen distinct call variations, ranging from harsh scolding notes to melodious warbling sequences. The complexity of the species' acoustic communication suggests a level of social organization that merits further investigation.
            </p>

            <p className="mb-4">
              Perhaps most intriguing was the bird's interaction with a nearby population of Red-winged Blackbirds. Rather than displaying the expected territorial aggression, the wren seemed to tolerate, and at times even approach, the larger birds. This behavioral anomaly raises questions about interspecies dynamics in marsh ecosystems.
            </p>

            <p className="mb-4">
              As the afternoon progressed and the temperature rose, activity levels decreased markedly. By 2:00 PM, the bird had retreated deep into the vegetation, and our observations concluded. The day's fieldwork provided valuable data points that will contribute to our ongoing study of marsh bird ecology and behavior.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
