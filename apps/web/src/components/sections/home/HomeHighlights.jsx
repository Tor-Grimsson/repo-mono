import { motion } from 'framer-motion'
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
      className={`relative ${alignRight ? 'ms-auto' : 'size-full'} ${className}`}
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
      <div className="relative z-10 flex size-full flex-col justify-start items-start p-6 md:p-8 text-auto">
        <div className="max-w-[50%] flex flex-col justify-start items-start">
          {title && (
            <h1 className="kol-heading-xl text-auto uppercase">{title}</h1>
          )}
          {subtitle && (
            <p className="kol-mono-text text-auto">{subtitle}</p>
          )}
          {description && (
            <p className="kol-mono-xs text-auto mt-4">{description}</p>
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
    <section id="work" className="w-full">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">

          {/* Row 1: Single full-width card */}
         <div className="self-stretch h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-end items-start gap-2 overflow-hidden"
               src="img/features/card-item-base-3.png"
               title={<>Tröllatunga</>}
               subtitle="Daggered display typeface"
               description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into arewarding adventure."
            />
         </div>

         {/* Row 2: Single full-width card */}
         <div className="self-stretch h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="img/features/card-item-base-1.png"
               title={<>Flaður</>}
               subtitle="Daggered display typeface"
               description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
         </div>

         {/* Row 3: Split layout - 1 large + 2 stacked cards */}
         <div className="self-stretch h-[640px] inline-flex justify-start items-center gap-8">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="img/features/card-item-base-5.png"
               title={<>Silfurbarki</>}
               subtitle="Daggered display typeface"
               description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
            />
            <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-6">
               <div className="self-stretch flex-1 pl-24 flex flex-col justify-start items-start gap-2">
               <BentoCard
                  useMotion={useMotion}
                  className="self-stretch flex-1 rounded inline-flex justify-start items-start gap-2 overflow-hidden"
                  src="img/features/card-item-base-7.png"
                  title={<>Gullhamrar</>}
                  //  subtitle="Daggered display typeface"
                  description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
               />
               </div>
               <div className="self-stretch flex-1 pr-24 flex flex-col justify-start items-start gap-2">
               <BentoCard
                  useMotion={useMotion}
                  className="self-stretch flex-1 rounded inline-flex justify-start items-end gap-2 overflow-hidden"
                  src="img/features/card-item-base-2.png"
                  title={<>Gullhamrar</>}
                  //  subtitle="Daggered display typeface"
                  description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
               />
               </div>
            </div>
         </div>

         {/* Row 4: Single full-width card */}
         <div className="self-stretch h-[640px] rounded inline-flex justify-start items-end">
            <BentoCard
               useMotion={useMotion}
               className="flex-1 self-stretch rounded flex justify-start items-end gap-2 overflow-hidden"
               src="img/features/card-item-base-4.png"
               title={<>Skessuhellir</>}
               subtitle="Daggered display typeface"
               description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
            />
         </div>

      </div>
    </section>
  )
}

export default HomeHighlights
