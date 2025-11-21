import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@kol/ui'
import { Link } from 'react-router-dom'
import { useBentoTilt } from '../../../hooks/useBentoTilt'
import { useBentoTiltMotion } from '../../../hooks/useBentoTiltMotion'
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'
import ComingSoonCard from '../work/ComingSoonCard'

// Bento Card Component
const BentoCard = ({
  src,
  title,
  subtitle,
  description,
  titleClassName = 'kol-heading-xl text-auto uppercase',
  href,
  overlayOpacity = 60,
  alignRight = false,
  className = '',
  useMotion = false,
  ...rest
}) => {
  const isTouchDevice = useIsTouchDevice()
  const tiltPropsCss = useBentoTilt()
  const tiltPropsMotion = useBentoTiltMotion()
  const tiltProps = useMotion ? tiltPropsMotion : tiltPropsCss
  const Component = useMotion ? motion.div : 'div'
  const videoRef = useRef(null)

  // Check if src is a video file
  const isVideo = src && /\.(mov|mp4|webm)$/i.test(src)

  return (
    <Component
      className={`relative group ${alignRight ? 'ms-auto' : 'size-full'} ${className}`}
      {...(!isTouchDevice && tiltProps)}
      {...rest}
      style={{
        ...((!isTouchDevice && tiltProps.style) || {}),
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute left-0 top-0 size-full object-cover object-center rounded-md overflow-hidden ${isTouchDevice ? 'pointer-events-none' : ''}`}
        />
      ) : (
        <img
          src={src}
          alt=""
          className={`absolute left-0 top-0 size-full object-cover object-center rounded-md overflow-hidden ${isTouchDevice ? 'pointer-events-none' : ''}`}
        />
      )}
      {/* Dark background overlay on hover */}
      <div className="relative z-10 flex size-full h-full flex-col justify-start items-start text-auto">
        <div className="relative z-10 max-w-[384px] w-full h-full self-stretch">
          {overlayOpacity > 0 && (
            <div
              className="absolute -inset-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
              }}
            />
          )}
          <div className="relative z-20 h-full flex flex-col justify-start items-start gap-4 p-6 md:p-8">
            {title && (
              <h1 className={titleClassName}>{title}</h1>
            )}
            {subtitle && (
              <p className="kol-mono-text text-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">{subtitle}</p>
            )}
            {description && (
              <p className="kol-mono-xs text-auto pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
            )}
            {href && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {href.startsWith('http') || href.startsWith('mailto') ? (
                  <Button href={href} variant="primary" size="sm">
                    View Project
                  </Button>
                ) : (
                  <Link to={href}>
                    <Button variant="primary" size="sm">
                      View Project
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Component>
  )
}

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
               description="A contemporary variable serif typeface for editorial design."
               href="/foundry/malromur"
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
               href="/workshop/apparatus/circle-generator"
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
                  description="Analyze chess positions and games with interactive visualization tools for strategic insights."
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
                     titleClassName="kol-heading-md text-auto uppercase"
                  />
               </div>
               <div className="h-[440px] md:h-[320px]">
                  <BentoCard
                     useMotion={useMotion}
                     className="w-full h-full rounded inline-flex justify-start items-end gap-2 overflow-hidden"
                     src="/img/home/highlights-04.png"
                     title={<>Analytics Dashboard</>}
                     subtitle="Performance tracking and visualization"
                     description="Comprehensive analytics dashboard with interactive charts, metrics tracking, and data visualization components."
                     href="/workshop/analytics/dashboard"
                     overlayOpacity={80}
                     titleClassName="kol-heading-md text-auto uppercase"
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
