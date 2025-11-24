import { Divider } from '@kol/ui'

export default function SpecimenProseTitlePage() {
  return (
    <div className="w-full min-h-screen relative">
      {/* TITLE PAGE - DEMONSTRATION */}
      <section className="w-full h-screen flex items-center justify-center px-8 snap-start">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-auto text-[64px] font-normal font-['TGMalromur'] italic leading-[72px] tracking-wide mb-8">
            Málrómur
          </h1>

          <Divider opacity="24" className="w-32 mx-auto mb-8" />

          <p className="text-auto text-xl font-normal font-['TGMalromur'] leading-7 mb-2">
            <span className="italic">A Study in Prose Styles</span>
          </p>

          <Divider opacity="24" className="w-32 mx-auto mt-8 mb-12" />

          <div className="space-y-2 text-auto text-base font-normal font-['TGMalromur'] leading-6">
            <p>
              Following the unique gestures <span className="italic">of</span> the types <span className="italic">of</span> various contexts
            </p>
            <p>
              as typeset in 2026 <span className="italic">for</span> the digital age
            </p>
          </div>

          <div className="mt-20 space-y-2 text-auto text-sm font-normal font-['TGMalromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>
    </div>
  )
}
