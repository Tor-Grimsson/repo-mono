import { motion } from 'framer-motion'
import { Button } from '@kol/ui'
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
      <img
        src={src}
        alt=""
        className={`absolute left-0 top-0 size-full object-cover object-center rounded-md overflow-hidden ${isTouchDevice ? 'pointer-events-none' : ''}`}
      />
      {/* Dark background overlay on hover */}
      {overlayOpacity > 0 && (
        <div
          className="w-[468px] h-full left-0 top-0 absolute rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
        />
      )}

      <div className="relative z-10 flex size-full flex-col justify-start items-start p-6 md:p-8 text-auto">
        <div className="max-w-[384px] flex flex-col justify-start items-start gap-4">
          {title && (
            <h1 className="kol-heading-xl text-auto uppercase">{title}</h1>
          )}
          {subtitle && (
            <p className="kol-mono-text text-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">{subtitle}</p>
          )}
          {description && (
            <p className="kol-mono-xs text-auto pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
          )}
          {href && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                href={href}
                variant="primary"
                size="sm"
              >
                View Project
              </Button>
            </div>
          )}
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
         <div className="self-stretch h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-end items-start gap-2 overflow-hidden"
               src="/img/highlights/highlight-1-malromur.png"
               title={<>Málrómur</>}
               subtitle="A contemporary variable serif typeface for editorial design"
               description="A contemporary serif typeface optimized for editorial design and professional publishing."
               href="/foundry/malromur"
               overlayOpacity={40}
            />
         </div>

         {/* Row 2: Single full-width card */}
         <div className="self-stretch h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="/img/highlights/highlight-2-circle-generator.png"
               title={<>Circle generator</>}
               subtitle="Interactive circle vector apparatus"
               description="An experimental tool for generating geometric compositions and exploring circular design patterns."
               href="/workshop/apparatus/circle-generator"
               overlayOpacity={10}
            />
         </div>

         {/* Row 3: Split layout - 1 large + 2 stacked cards */}
         <div className="self-stretch h-[640px] inline-flex justify-start items-center gap-8">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="/img/highlights/highlight-3-apparat-square-alter-b.png"
               title={<>Chess Analysis</>}
               subtitle="Interactive chess game analyzer"
               description="Analyze chess positions and games with interactive visualization tools for strategic insights."
               href="/workshop/chess/analysis"
               overlayOpacity={60}
            />
            <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-6">
               <div className="self-stretch flex-1 pl-24 flex flex-col justify-start items-start gap-2">
               <BentoCard
                  useMotion={useMotion}
                  className="self-stretch flex-1 rounded inline-flex justify-start items-start gap-2 overflow-hidden"
                  src="/img/highlights/highlight-4-illustrations-c.png"
                  title={<>Illustrations</>}
                  subtitle="Visual design explorations"
                  description="A collection of illustrated works and conceptual explorations"
                  href="/collections/illustrations"
                  overlayOpacity={60}
               />
               </div>
               <div className="self-stretch flex-1 pr-24 flex flex-col justify-start items-start gap-2">
               <BentoCard
                  useMotion={useMotion}
                  className="self-stretch flex-1 rounded inline-flex justify-start items-end gap-2 overflow-hidden"
                  src="/img/highlights/highlight-5-work.png"
                  title={<>Client Work</>}
                  subtitle="Selected projects and collaborations"
                  description="Explore our portfolio of client work including brand identity, digital products, and creative direction."
                  href="/work"
                  overlayOpacity={60}
               />
               </div>
            </div>
         </div>

         {/* Row 4: Single full-width card */}
         <div className="self-stretch h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="/img/highlights/highlight-6-motion.png"
               title={<>Motion Graphics</>}
               subtitle="Experimental motion and generative visuals"
               description="Explore experimental motion graphics, generative animations, and Touch Designer explorations."
               href="/collections/motion-graphics"
               overlayOpacity={60}
            />
         </div>

      </div>
    </section>
  )
}

export default HomeHighlights
