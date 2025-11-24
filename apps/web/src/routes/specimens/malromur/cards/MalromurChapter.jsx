export default function SpecimenProseChapter() {
  return (
    <div className="w-full min-h-screen relative">
      {/* TWO-PAGE SPREAD / CHAPTER OPENING */}
      <section className="w-full h-screen snap-start flex items-center">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
            {/* Left page */}
            <div className="col-span-5 col-start-2 flex items-center justify-end" style={{ minHeight: '600px' }}>
              <div className="text-right">
                <p className="text-auto text-sm font-normal font-['TGMalromur'] uppercase tracking-wider mb-4" style={{ lineHeight: '24px' }}>
                  Chapter V.
                </p>
                <h2 className="text-auto text-4xl font-semibold font-['TGMalromur']" style={{ lineHeight: '48px' }}>
                  On Flight
                </h2>
              </div>
            </div>

            {/* Right page */}
            <div className="col-span-4 flex items-center">
              <div className="space-y-6 text-auto text-base font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>
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
