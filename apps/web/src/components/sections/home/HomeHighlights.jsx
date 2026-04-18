import BentoCard from '../../cards/BentoCard'

const hlsBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/hls-library/video-home'
const imgBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/homepage/home-highlight'

// Component
const HomeHighlights = () => {
  const useMotion = false

  return (
    <section id="work" className="w-full pb-12">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">

          {/* Row 0: Monitor - full-width card */}
         <div className="reveal-from-left self-stretch h-[264px] md:h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
               src="/img/home-highlight/monitor.mp4"
               poster="/img/home-highlight/monitor.png"
               imageClassName="object-cover object-center"
               title={<>Monitor</>}
               subtitle="Modular Video Synthesizer"
               description="Video Modulo rack engine runs 50 modules at 60fps on Canvas2D."
               href="/work/monitor"
               overlayOpacity={40}
            />
         </div>

          {/* Row 1: Single full-width card - from left */}
         <div className="reveal-from-left self-stretch h-[264px] md:h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-end items-start gap-2 overflow-hidden"
               src={`${hlsBase}/hl-malmromur/hls/master.m3u8`}
               poster={`${hlsBase}/hl-malmromur/hl-malromur-still.jpg`}
               title={<>Málrómur</>}
               subtitle="Variable Serif Typeface"
               description="Variable serif typeface for editorial design."
               href="/foundry/typefaces/malromur"
               overlayOpacity={40}
            />
         </div>

         {/* Row 2: Single full-width card - from right */}
         <div className="reveal-from-right self-stretch h-[264px] md:h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
               src={`${hlsBase}/hl-radial/hls/master.m3u8`}
               poster={`${hlsBase}/hl-radial/radial-dial-still.png`}
               title={<>Radial Dial</>}
               subtitle="360° Sine wave generator"
               description="An experimental tool for generating harmonic circular patterns using polar coordinates and sine wave modulation."
               href="/workshop/apparat/kol-radial"
               overlayOpacity={40}
            />
         </div>

         {/* Row 3: Split layout - converging from both sides */}
         <div className="w-full flex flex-col gap-6 md:flex-row md:h-[640px] md:gap-8">
            <div className="reveal-from-left w-full md:flex-1">
               <BentoCard
                  useMotion={useMotion}
                  className="w-full h-[264px] md:h-[640px] rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
                  src={`${imgBase}/hl-chess/hl-chess-1200.jpg`}
                  imageClassName="object-cover object-center"
                  title={<>Chess Analysis</>}
                  subtitle="Interactive chess game analyzer"
                  description="Chess positions analyser with interactive analytics"
                  href="/workshop/chess/analysis"
                  overlayOpacity={40}
               />
            </div>
            <div className="w-full md:flex-1 flex flex-col gap-6">
               <div className="reveal-from-right h-[264px] md:h-[320px]" style={{ '--reveal-delay': '0.1s' }}>
                  <BentoCard
                     useMotion={useMotion}
                     className="w-full h-full rounded inline-flex border border-fg-08 justify-start items-start gap-2 overflow-hidden"
                     src={`${hlsBase}/hl-trollatunga/hls/master.m3u8`}
                     poster={`${hlsBase}/hl-trollatunga/trollatunga-still-wide.jpg`}
                     title={<>Visuals</>}
                     subtitle="Experimental motion and visual patches"
                     description="Explore motion graphics, experimental animations, and Touch Designer patches."
                     href="/work/motion-1"
                     overlayOpacity={40}
                     titleClassName="kol-heading-md text-light-fixed uppercase"
                  />
               </div>
               <div className="reveal-from-right h-[264px] md:h-[320px]" style={{ '--reveal-delay': '0.2s' }}>
                  <BentoCard
                     useMotion={useMotion}
                     className="w-full h-full rounded inline-flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
                     src={`${imgBase}/hl-analytics/hl-analytics-1200.jpg`}
                     title={<>Analytics Dashboard</>}
                     subtitle="Performance tracking and visualization"
                     description="Analytics dashboard with interactive charts, metrics tracking, and data visualization components."
                     href="/workshop/dashboard"
                     overlayOpacity={40}
                     titleClassName="kol-heading-md text-light-fixed uppercase"
                  />
               </div>
            </div>
         </div>

         {/* Row 4: Single full-width card - from left */}
         <div className="reveal-from-left self-stretch h-[264px] md:h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
               src={`${imgBase}/hl-print/hl-print-1600.jpg`}
               title={<>Prints</>}
               subtitle="Limited edition art prints"
               description="Exclusive collection of fine art prints, available in limited editions with premium materials and finishes."
               href="/prints"
               overlayOpacity={40}
            />
         </div>

      </div>
    </section>
  )
}

export default HomeHighlights
