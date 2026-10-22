import { useNavigate } from 'react-router-dom'
import TiltBento from './TiltBento'

const hlsBase = 'https://b2.kolkrabbi.io/website/hls-library/video-home'
const imgBase = 'https://b2.kolkrabbi.io/website/asset-library/homepage/home-highlight'

// Component
const HomeHighlights = () => {
  const navigate = useNavigate()
  // The card's CTA and links are real <a href>s; this is their SPA intercept (capture-phase).
  const onNavigate = (e) => { e.preventDefault(); navigate(e.currentTarget.getAttribute('href')) }

  return (
    <section id="work" className="w-full pb-12">
      <div className="w-full max-w-[var(--kol-container-max)] mx-auto flex flex-col gap-8">

          {/* Row 0: Monitor - full-width card */}
         <div className="reveal-from-left self-stretch md:h-[640px] rounded inline-flex justify-start items-end">
            <TiltBento
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
               /* HLS on B2 like the other tiles (2026-10-14) — was a 35 MB mp4 served from
                * public/img/dev/; encoded to four renditions, the still beside the playlist */
               src={`${hlsBase}/hl-monitor/hls/master.m3u8`}
               poster={`${hlsBase}/hl-monitor/monitor-still.png`}
               imageClassName="object-cover object-center"
               title={<>Monitor</>}
               subtitle="Modular Video Synthesizer"
               description="Video Modulo rack engine runs 50 modules at 60fps on Canvas2D."
               href="/work/monitor"
               onNavigate={onNavigate}
               buttonLabel="View Project"
               titleClassName="kol-sans-heading-02 text-light-fixed uppercase"
               overlayOpacity={40}
               enableTilt={false}
            />
         </div>

          {/* Row 1: Single full-width card - from left */}
         <div className="reveal-from-left self-stretch md:h-[640px] rounded inline-flex justify-start items-end">
            <TiltBento
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-end items-start gap-2 overflow-hidden"
               src={`${hlsBase}/hl-malmromur/hls/master.m3u8`}
               poster={`${hlsBase}/hl-malmromur/hl-malromur-still.jpg`}
               title={<>Málrómur</>}
               subtitle="Variable Serif Typeface"
               description="Variable serif typeface for editorial design."
               href="/foundry/typefaces/malromur"
               onNavigate={onNavigate}
               buttonLabel="View Project"
               titleClassName="kol-sans-heading-02 text-light-fixed uppercase"
               overlayOpacity={40}
               enableTilt={false}
            />
         </div>

         {/* Row 2: Single full-width card - from right */}
         <div className="reveal-from-right self-stretch md:h-[640px] rounded inline-flex justify-start items-end">
            <TiltBento
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
               src={`${hlsBase}/hl-radial/hls/master.m3u8`}
               poster={`${hlsBase}/hl-radial/radial-dial-still.png`}
               title={<>Radial Dial</>}
               subtitle="360° Sine wave generator"
               description="An experimental tool for generating harmonic circular patterns using polar coordinates and sine wave modulation."
               href="/work/kol-radial"
               onNavigate={onNavigate}
               buttonLabel="View Project"
               links={[{ label: 'Read on Stack', href: '/stack/kol-radial' }]}
               titleClassName="kol-sans-heading-02 text-light-fixed uppercase"
               overlayOpacity={40}
               enableTilt={false}
            />
         </div>

         {/* Row 3: Split layout - converging from both sides */}
         <div className="w-full flex flex-col gap-6 md:flex-row md:h-[640px] md:gap-8">
            <div className="reveal-from-left w-full md:flex-1">
               <TiltBento
                  className="w-full md:h-[640px] rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
                  src={`${imgBase}/hl-chess/hl-chess-1200.jpg`}
                  imageClassName="object-cover object-center"
                  title={<>Chess Analysis</>}
                  subtitle="Interactive chess game analyzer"
                  description="Chess positions analyser with interactive analytics"
                  href="/workshop/chess"
                  onNavigate={onNavigate}
                  buttonLabel="View Project"
                  titleClassName="kol-sans-heading-02 text-light-fixed uppercase"
                  overlayOpacity={40}
                  enableTilt={false}
               />
            </div>
            <div className="w-full md:flex-1 flex flex-col gap-6">
               <div className="reveal-from-right md:h-[320px]" style={{ '--reveal-delay': '0.1s' }}>
                  <TiltBento
                     className="w-full h-full rounded inline-flex border border-fg-08 justify-start items-start gap-2 overflow-hidden"
                     src={`${hlsBase}/hl-trollatunga/hls/master.m3u8`}
                     poster={`${hlsBase}/hl-trollatunga/trollatunga-still-wide.jpg`}
                     title={<>Visuals</>}
                     subtitle="Experimental motion and visual patches"
                     description="Explore motion graphics, experimental animations, and Touch Designer patches."
                     href="/work/motion-1"
                     onNavigate={onNavigate}
                     buttonLabel="View Project"
                     titleClassName="kol-sans-heading-02 text-light-fixed uppercase"
                     overlayOpacity={40}
                     enableTilt={false}
                  />
               </div>
               <div className="reveal-from-right md:h-[320px]" style={{ '--reveal-delay': '0.2s' }}>
                  <TiltBento
                     className="w-full h-full rounded inline-flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
                     src={`${imgBase}/hl-analytics/hl-analytics-1200.jpg`}
                     title={<>Analytics Dashboard</>}
                     subtitle="Performance tracking and visualization"
                     description="Analytics dashboard with interactive charts, metrics tracking, and data visualization components."
                     href="/workshop/metrics"
                     onNavigate={onNavigate}
                     buttonLabel="View Project"
                     titleClassName="kol-sans-heading-02 text-light-fixed uppercase"
                     overlayOpacity={40}
                     enableTilt={false}
                  />
               </div>
            </div>
         </div>

         {/* Row 4: Single full-width card - from left */}
         <div className="reveal-from-left self-stretch md:h-[640px] rounded inline-flex justify-start items-end">
            <TiltBento
               className="flex-1 self-stretch rounded flex border border-fg-08 justify-start items-end gap-2 overflow-hidden"
               src={`${imgBase}/hl-print/hl-print-1600.jpg`}
               title={<>Prints</>}
               subtitle="Limited edition art prints"
               description="Exclusive collection of fine art prints, available in limited editions with premium materials and finishes."
               href="/prints"
               onNavigate={onNavigate}
               buttonLabel="View Project"
               titleClassName="kol-sans-heading-02 text-light-fixed uppercase"
               overlayOpacity={40}
               enableTilt={false}
            />
         </div>

      </div>
    </section>
  )
}

export default HomeHighlights
