export default function SpecimenProseEditorial() {
  return (
    <div className="w-full min-h-screen relative bg-[#F5F1E8]">
      {/* TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-auto text-[64px] font-normal font-['TGMalromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-surface-inverse mx-auto mb-8" />

          <p className="text-auto text-xl font-normal font-['TGMalromur'] leading-7 mb-2">
            <span className="italic">Editorial</span>
          </p>

          <div className="w-32 h-[1px] bg-surface-inverse mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-auto text-base font-normal font-['TGMalromur'] leading-6">
            <p>
              Magazine & Journal Layout
            </p>
            <p>
              Prose Style <span className="italic">01</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-auto text-sm font-normal font-['TGMalromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* EDITORIAL ARTICLE */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
              "There's something placid and comforting about this lighter touch, especially when compared to the vigorous, authoritative book Romans that would follow it."
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Main article column */}
            <div className="col-span-7 space-y-6">
              <div className="mb-8">
                <h3 className="text-auto text-[64px] font-medium font-['TGMalromur'] leading-[64px] mb-2">
                  On the
                </h3>
                <h3 className="text-auto text-[64px] font-medium font-['TGMalromur'] leading-[64px] mb-2">
                  graceful
                </h3>
                <h3 className="text-auto text-[64px] font-medium font-['TGMalromur'] leading-[64px]">
                  serif
                </h3>
              </div>

              <p className="text-auto text-base font-normal font-['TGMalromur'] leading-6">
                The serif (also called <span className="italic">seraph</span>) is the finishing stroke at the base or top of letterforms. The word originated from the Dutch <span className="italic">schreef</span> meaning line or stroke. In Latin typography, serifs provide visual horizontal emphasis to guide the eye along lines of text. They also help distinguish individual letters.
              </p>

              <p className="text-auto text-base font-normal font-['TGMalromur'] leading-6">
                This particular cut of type was based on the types cut by William Martin in the late 18th century for William Bulmer. These types were regarded as the finest of their era. Unlike the vigorous, authoritative book romans that would follow, Martin's types possessed a lighter touch – something placid and comforting about their design.
              </p>

              <p className="text-auto text-base font-normal font-['TGMalromur'] leading-6">
                The contrast between thick and thin strokes is pronounced but not aggressive. The letterforms are sturdy but refined. There is a sense of confidence without ostentation, elegance without fragility. This balance makes it suitable for extended reading while maintaining enough personality for display settings.
              </p>
            </div>

            {/* Sidebar */}
            <div className="col-span-5 bg-[#E8DCC0] p-8">
              <div className="mb-6">
                <p className="text-auto text-xs font-semibold font-['TGMalromur'] uppercase tracking-wider mb-2">
                  Type Specimen
                </p>
                <div className="w-12 h-[1px] bg-surface-inverse mb-4" />
              </div>

              <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
                <span className="font-semibold">Designer:</span> Kolkrabbi Foundry
              </p>

              <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
                <span className="font-semibold">Classification:</span> Transitional serif, inspired by late 18th century British typography
              </p>

              <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
                <span className="font-semibold">Weights:</span> From thin to black, with corresponding italics
              </p>

              <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-5 mb-6">
                <span className="font-semibold">Use cases:</span> Books, periodicals, editorial design, scientific publications, formal documents
              </p>

              <div className="mt-8 p-4 bg-surface">
                <p className="text-auto text-2xl font-normal font-['TGMalromur'] leading-7 text-center italic">
                  "A lighter touch compared to vigorous book Romans"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
