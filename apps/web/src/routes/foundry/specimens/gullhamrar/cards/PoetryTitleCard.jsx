export default function PoetryTitleCard() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-8">
      <div className="max-w-[640px] mx-auto text-center">
        <h1 className="text-auto text-[64px] font-normal font-['TGGullhamrar'] leading-[72px] tracking-wide mb-8">
          TG GULLHAMRAR
        </h1>

        <div className="w-32 h-[1px] bg-fg-96 mx-auto mb-8" />

        <p className="text-auto text-xl font-normal font-['TGGullhamrar'] leading-7 mb-2">
          <span className="italic">Icelandic Poetry</span>
        </p>

        <div className="w-32 h-[1px] bg-fg-96 mx-auto mt-8 mb-12" />

        <div className="space-y-6 text-auto text-base font-normal font-['TGGullhamrar'] leading-6">
          <p>
            Contemporary Icelandic Poetry Layout
          </p>
          <p>
            Specimen <span className="italic">01</span>
          </p>
        </div>

        <div className="mt-20 space-y-4 text-auto text-sm font-normal font-['TGGullhamrar'] leading-5">
          <p>Type design</p>
          <p className="italic">by Kolkrabbi Foundry</p>
        </div>
      </div>
    </section>
  )
}
