import { Divider } from '@kol/ui'

export default function SpecimenProseEditorial() {
  return (
    <div className="w-full min-h-screen relative">
      {/* EDITORIAL ARTICLE */}
      <section className="w-full h-screen snap-start flex items-center">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
            <div className="col-span-4 col-start-2 mb-8">
              <p className="text-auto text-sm font-normal font-['TGMalromur'] mb-2" style={{ lineHeight: '24px' }}>
                "O my soul, do not aspire to immortal life, lout exhaust the limits of the possible."
              </p>
              <p className="text-auto text-sm font-normal font-['TGMalromur'] italic text-right" style={{ lineHeight: '24px' }}>
                —Pindar, Pythian iii
              </p>
            </div>

            {/* Title - constrained to 4 columns within the 5-column article area */}
            <div className="col-span-5 col-start-2">
              <div style={{ maxWidth: 'calc((86px * 5) + (24px * 4))' }} className="mb-8">
                <h3 className="text-auto text-[60px] font-bold font-['TGMalromur'] mb-2" style={{ lineHeight: '64px' }}>
                  An Absurd reasoning
                </h3>

                <h3 className="text-auto text-[48px] font-light font-['TGMalromur'] italic" style={{ lineHeight: '48px' }}>
                  Absurdity and Suicide
                </h3>
              </div>

              <p className="text-auto text-base font-normal font-['TGMalromur'] mb-6" style={{ lineHeight: '24px' }}>
                There is but one truly serious philosophical problem, and that is suicide. Judging whether life is or is not worth living amounts to answering the fundamental question of philosophy. All the rest—whether or not the world has three dimensions, whether the mind has nine or twelve categories—comes afterwards. These are games; one must first answer.
              </p>

              <p className="text-auto text-base font-normal font-['TGMalromur'] mb-6" style={{ lineHeight: '24px' }}>
                And if it is true, as Nietzsche claims, that a philosopher, to deserve our respect, must preach by example, you can appreciate the importance of that reply, for it will precede the definitive act. These are facts the heart can feel; yet they call for careful study before they become clear to the intellect.
              </p>

              <p className="text-auto text-base font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>
                If I ask myself how to judge that this question is more urgent than that, I reply that one judges by the actions it entails. I have never seen anyone die for the ontological argument. Galileo, who held a scientific truth of great importance, abjured it with the greatest ease as soon as it endangered his life. In a certain sense, he did right. That truth was not worth the stake.
              </p>
            </div>

            {/* Sidebar */}
            <div className="col-span-5 col-start-7 row-start-2 bg-fg-04 rounded p-8 h-fit">
              <div className="mb-6">
                <p className="text-auto text-xs font-semibold font-['TGMalromur'] uppercase tracking-wider my-4" style={{ lineHeight: '16px' }}>
                  Type Specimen
                </p>
                <Divider opacity="48" className="w-12 mb-4" />
              </div>

              <p className="text-auto text-sm font-light font-['TGMalromur'] mb-4" style={{ lineHeight: '24px' }}>
                <span className="font-semibold pr-1">Designer:</span> Tór Grímsson
              </p>

              <p className="text-auto text-sm font-light font-['TGMalromur'] mb-4" style={{ lineHeight: '24px' }}>
                <span className="font-semibold pr-1">Classification:</span> Transitional serif, inspired by late 18th century specimen catalogues
              </p>

              <p className="text-auto text-sm font-light font-['TGMalromur'] mb-4" style={{ lineHeight: '24px' }}>
                <span className="font-semibold pr-1">Weights:</span> From thin to black, with corresponding italics
              </p>

              <p className="text-auto text-sm font-light font-['TGMalromur'] mb-6" style={{ lineHeight: '24px' }}>
                <span className="font-semibold pr-1">Use cases:</span> Books, periodicals, editorial design, scientific publications, formal documents
              </p>

              <div className="mt-8 p-4 bg-surface">
                <p className="text-auto text-2xl font-normal font-['TGMalromur'] text-center italic" style={{ lineHeight: '32px' }}>
                  "From the point of view of the relative value of truth"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
