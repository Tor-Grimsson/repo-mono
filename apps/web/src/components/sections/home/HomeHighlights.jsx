import BentoCard from '../../cards/BentoCard'

// Component
const HomeHighlights = () => {
  const useMotion = false

  return (
    <section id="work" className="w-full pb-12">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">

          {/* Row 1: Single full-width card */}
         <div className="self-stretch h-[440px] md:h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-end items-start gap-2 overflow-hidden"
               src="/img/highlights/highlight-1-malromur.png"
               title={<>Málrómur</>}
               subtitle="Variable Serif Typeface"
               description="Variable serif typeface for editorial design."
               href="/foundry/typefaces/malromur"
               overlayOpacity={80}
            />
         </div>

         {/* Row 2: Single full-width card */}
         <div className="self-stretch h-[440px] md:h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="/videos/riadial-dial-5-dark.mov"
               title={<>Radial Dial</>}
               subtitle="360° Sine wave generator"
               description="An experimental tool for generating harmonic circular patterns using polar coordinates and sine wave modulation."
               href="/workshop/apparatus/radial-editor"
               overlayOpacity={60}
            />
         </div>

         {/* Row 3: Split layout */}
         <div className="w-full flex flex-col gap-6 md:flex-row md:h-[640px] md:gap-8">
            <div className="w-full md:flex-1">
               <BentoCard
                  useMotion={useMotion}
                  className="w-full h-[440px] md:h-[640px] rounded flex justify-start items-end gap-2 overflow-hidden"
                  src="/img/highlights/highlight-3-apparat-square-alter-b.png"
                  title={<>Chess Analysis</>}
                  subtitle="Interactive chess game analyzer"
                  description="Chess positions analyser with interactive analytics"
                  href="/workshop/chess/analysis"
                  overlayOpacity={80}
               />
            </div>
            <div className="w-full md:flex-1 flex flex-col gap-6">
               <div className="h-[440px] md:h-[320px]">
                  <BentoCard
                     useMotion={useMotion}
                     className="w-full h-full rounded inline-flex justify-start items-start gap-2 overflow-hidden"
                     src="/img/home/highlights-03.png"
                     title={<>Illustrations</>}
                     subtitle="Visual design explorations"
                     description="A collection of illustrated works and conceptual explorations"
                     href="/collections/illustrations"
                     overlayOpacity={80}
                     titleClassName="kol-heading-md text-light-fixed uppercase"
                  />
               </div>
               <div className="h-[440px] md:h-[320px]">
                  <BentoCard
                     useMotion={useMotion}
                     className="w-full h-full rounded inline-flex justify-start items-end gap-2 overflow-hidden"
                     src="/img/home/highlights-04.png"
                     title={<>Analytics Dashboard</>}
                     subtitle="Performance tracking and visualization"
                     description="Analytics dashboard with interactive charts, metrics tracking, and data visualization components."
                     href="/workshop/analytics/dashboard"
                     overlayOpacity={80}
                     titleClassName="kol-heading-md text-light-fixed uppercase"
                  />
               </div>
            </div>
         </div>

         {/* Row 4: Single full-width card */}
         <div className="self-stretch h-[440px] md:h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="/videos/motion-graphics/motion-graphic-2.mov"
               title={<>Visuals</>}
               subtitle="Experimental motion and visual patches"
               description="Explore motion graphics, experimental animations, and Touch Designer patches."
               href="/collections/motion-graphics"
               overlayOpacity={0}
            />
         </div>

      </div>
    </section>
  )
}

export default HomeHighlights
