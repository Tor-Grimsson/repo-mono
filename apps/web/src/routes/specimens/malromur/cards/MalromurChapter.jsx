export default function SpecimenProseChapter() {
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
            <span className="italic">Chapter Opening</span>
          </p>

          <div className="w-32 h-[1px] bg-surface-inverse mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-auto text-base font-normal font-['TGMalromur'] leading-6">
            <p>
              Book Interior
            </p>
            <p>
              Prose Style <span className="italic">06</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-auto text-sm font-normal font-['TGMalromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* TWO-PAGE SPREAD / CHAPTER OPENING */}
      <section className="w-full min-h-screen flex items-center justify-center px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 gap-16">
            {/* Left page */}
            <div className="flex items-center justify-end">
              <div className="max-w-[400px] text-right">
                <p className="text-auto text-sm font-normal font-['TGMalromur'] uppercase tracking-wider mb-4">
                  Chapter V.
                </p>
                <h2 className="text-auto text-4xl font-semibold font-['TGMalromur'] leading-tight">
                  On Flight
                </h2>
              </div>
            </div>

            {/* Right page */}
            <div className="flex items-center">
              <div className="max-w-[500px] space-y-6 text-auto text-base font-normal font-['TGMalromur'] leading-7">
                <p className="italic">
                  A great difference subsisting on the wing
                </p>

                <p>
                  One of the most striking features of bird life is surely its restless activity. This is always apparent, but it attains its climax at almost fevered excitement at the spring advances and the potential instinct for <span className="italic">mating</span> is ultra-potent, or both intensified dramatically.
                </p>

                <p>
                  In their normal routine many resident species are comparatively unobtrusive. A certain resident robin, or beautiful resident in mid-air, is with calm wings sweeps noisily along the ridge of an orchard boundary wall, its flight is compounded with curious sidelong glides and pauses, interspersed amid the ground. And there, as to be added, are evidences in the lofty maple tree from whence it took its rise.
                </p>

                <p>
                  Most birds have sufficient aerial skill to enable them to proceed in their course of migration unobstructed by adverse conditions. There may be some natural barriers, mountains, or seas, which impel them to deviate from their natural course. But these are exceptions – with most residents, migration is accompanied by great smoothness of aerial motion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
