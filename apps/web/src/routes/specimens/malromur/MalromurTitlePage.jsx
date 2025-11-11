export default function SpecimenProseTitlePage() {
  return (
    <div className="w-full min-h-screen relative bg-[#F5F1E8]">
      {/* TITLE PAGE - OUTER */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-black text-[64px] font-normal font-['TG_Malromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-black mx-auto mb-8" />

          <p className="text-black text-xl font-normal font-['TG_Malromur'] leading-7 mb-2">
            <span className="italic">Title Page</span>
          </p>

          <div className="w-32 h-[1px] bg-black mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-black text-base font-normal font-['TG_Malromur'] leading-6">
            <p>
              Entry Point
            </p>
            <p>
              Prose Style <span className="italic">08</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TG_Malromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* TITLE PAGE - DEMONSTRATION */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-black text-[64px] font-normal font-['TG_Malromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-black mx-auto mb-8" />

          <p className="text-black text-xl font-normal font-['TG_Malromur'] leading-7 mb-2">
            <span className="italic">A Study in Prose Styles</span>
          </p>

          <div className="w-32 h-[1px] bg-black mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-black text-base font-normal font-['TG_Malromur'] leading-6">
            <p>
              Following the unique gestures <span className="italic">of</span> the types <span className="italic">of</span> various contexts
            </p>
            <p>
              as typeset in 2024 <span className="italic">for</span> the digital age
            </p>
          </div>

          <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TG_Malromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>
    </div>
  )
}
