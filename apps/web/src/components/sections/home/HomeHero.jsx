import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useState } from 'react'
import { ScrollTrigger } from 'gsap/all'
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'
import { useTheme } from '@kol/ui'

gsap.registerPlugin(ScrollTrigger)

const HomeHero = ({ onVideoStart }) => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const isTouchDevice = useIsTouchDevice()
  const { theme } = useTheme()

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    if (onVideoStart) {
      onVideoStart()
    }
  }

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    })

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    })
  })

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-surface-inverse"
      >
        <video
          key={theme}
          src={theme === 'dark' ? 'videos/vid-nrml.mov' : 'videos/vid-nrml-inverse.mov'}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/img/home/home-video-ph.png"
          className={`absolute left-0 top-0 size-full object-cover object-center ${isTouchDevice ? 'pointer-events-none' : ''}`}
          onCanPlay={handleVideoLoad}
        />

        {/* Text overlay on video */}
        <div
          className="absolute inset-0 z-40 flex items-end justify-end p-12"
          style={{ mixBlendMode: 'difference' }}
        >
          <h1
            className="kol-heading-display"
            style={{
              color: 'var(--kol-color-absolute-white)',
              fontSize: 'clamp(4rem, 8vw, 9rem)',
            }}
          >
            Vinnustofa
          </h1>
        </div>
      </div>

      {/* Text below video frame */}
      <div className="absolute inset-0 flex items-end justify-end p-12" style={{ zIndex: 5 }}>
        <h1
          className="kol-heading-display text-auto"
          style={{ fontSize: 'clamp(4rem, 8vw, 9rem)' }}
        >
          Vinnustofa
        </h1>
      </div>
    </div>
  )
}

export default HomeHero
