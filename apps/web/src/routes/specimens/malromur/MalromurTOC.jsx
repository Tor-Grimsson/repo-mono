export default function SpecimenProseTOC() {
  return (
    <div className="w-full min-h-screen relative bg-[#F5F1E8]">
      {/* TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-black text-[64px] font-normal font-['TG_Malromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-black mx-auto mb-8" />

          <p className="text-black text-xl font-normal font-['TG_Malromur'] leading-7 mb-2">
            <span className="italic">Table of Contents</span>
          </p>

          <div className="w-32 h-[1px] bg-black mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-black text-base font-normal font-['TG_Malromur'] leading-6">
            <p>
              Navigation & Structure
            </p>
            <p>
              Prose Style <span className="italic">07</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TG_Malromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="w-full min-h-screen flex items-center justify-center px-8 py-24">
        <div className="max-w-[640px] mx-auto">
          <h2 className="text-center text-black text-3xl font-normal font-['TG_Malromur'] leading-10 mb-12">
            Table <span className="italic">of</span> Contents
          </h2>

          <div className="border-t-2 border-b-2 border-black py-8 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TG_Malromur']">Editorial</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TG_Malromur']">2</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TG_Malromur']">Data Tables</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TG_Malromur']">3</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TG_Malromur']">Menu Design</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TG_Malromur']">4</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TG_Malromur']">Newsletter</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TG_Malromur']">5</span>
            </div>

            <div className="flex justify-between items-baseline pl-8">
              <span className="text-black text-lg font-normal font-['TG_Malromur'] italic">Field Notes</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TG_Malromur']">6</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TG_Malromur']">Index</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TG_Malromur']">7</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TG_Malromur']">Chapter Opening</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TG_Malromur']">8</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
