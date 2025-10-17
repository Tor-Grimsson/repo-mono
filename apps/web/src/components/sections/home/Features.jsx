import { motion } from 'framer-motion'
import { useBentoTilt } from '../../../hooks/useBentoTilt'
import { useBentoTiltMotion } from '../../../hooks/useBentoTiltMotion'
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'
import ComingSoonCard from '../work/ComingSoonCard'
import { SectionLabel } from '@kol/ui'

// Bento Card Component accepts these properties, ...rest is f.e. id
const BentoCard = ({
  src,
  title,
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
    >
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className={`absolute left-0 top-0 size-full object-cover object-center rounded-md overflow-hidden ${isTouchDevice ? 'pointer-events-none' : ''}`}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-auto">
        <div>
          <h1 className="kol-heading-xl uppercase font-black">{title}</h1>
          {description && (
            <p className="mt-1 max-w-64 kol-mono text-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </Component>
  )
}

// Page content

const Features = () => {
  const useMotion = false

  return (
    // Page Content Container

    <section id="work" className="pb-20 md:pd-0 px-6 lg:px-12">
      {/* // text section */}
      <div className="mx-auto flex flex-col gap-8">
        <div className="h-[80vh] flex flex-col justify-end">
          <SectionLabel text="Selected Work" />

          <p className="kol-mono text-auto">
            Develop a sleek and timeless brand identity, with a story that reflects your values, a message that aligns with your audience, and a strategy to operate—tailored fitted to the core of your brand.
          </p>
        </div>

        {/* // Bento Cards */}

        <BentoCard
          useMotion={useMotion}
          className="bentoItem relative mb-0 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
          src="videos/videofeat-3.mp4"
          title={<>Tröllatunga</>}
          description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into arewarding adventure."
        />

        {/* // Bento Card Container */}

        <div className="grid h-[96rem] grid-cols-2 grid-rows-4 gap-6">
          <BentoCard
            useMotion={useMotion}
            className="bentoItem col-span-2 md:col-span-1 rounded-md overflow-hidden md:row-span-2"
            src="videos/videofeat-1.mp4"
            title={<>Flaður</>}
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
          />

          <BentoCard
            useMotion={useMotion}
            className="bentoItem col-span-2 row-span-1 ms-32 rounded-md overflow-hidden md:col-span-1"
            src="videos/videofeat-2.mp4"
            title={<>Silfurbarki</>}
            description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
            id="silfurbarki"
          />

          <BentoCard
            useMotion={useMotion}
            className="bentoItem col-span-2 row-span-1 h-full w-[calc(100%-8rem)] me-32 rounded-md overflow-hidden md:col-span-1"
            src="videos/videofeat-4.mp4"
            title={<>Gullhamrar</>}
            description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
            alignRight={true}
          />

          {/* // Link to Coming Soon Card */}

          <ComingSoonCard className="col-span-1 row-span-1 md:col-span-1 md:row-span-2" />

          <BentoCard
            useMotion={useMotion}
            className="col-span-1 row-span-1 md:col-span-1 md:row-span-2 size-full object-cover object-center rounded-md overflow-hidden"
            src="videos/videofeat-5.mp4"
          />
        </div>
      </div>
    </section>
  )
}

export default Features
