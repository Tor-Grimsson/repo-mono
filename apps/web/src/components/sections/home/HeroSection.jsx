import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@kol/ui/atoms'
import { ScrollTrigger } from 'gsap/all'
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = ({ onVideoStart }) => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState(0)
  const isTouchDevice = useIsTouchDevice()

  const totalVideos = 4
  const nextVideoRef = useRef(null)

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1)
  }

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1

  const handleMiniVdClick = () => {
    setHasClicked(true)

    setCurrentIndex(upcomingVideoIndex)
  }

  useEffect(() => {
    if (loadedVideos === 1 && onVideoStart) {
      onVideoStart()
    }
  }, [loadedVideos, onVideoStart])

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#next-video', { visibility: 'visible' })

        gsap.to('#next-video', {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => nextVideoRef.current.play(),
        })

        gsap.from('#current-video', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        })
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  )

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

  const getVideoSrc = (index) => `videos/video-${index}.mp4`

  return (
    // Loader screen
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* <div className="absolute top-[0px] w-200 h-[100px] bg-black z-10" /> */}
      {/* Video frames */}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-surface-inverse"
      >
        <div>
          {!isTouchDevice && (
            <div className="mask-clip-path absoluteCenter absolute z-50 size-64 cursor-pointer overflow-hidden">
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all rounded-lg duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVideoRef}
                  src={getVideoSrc(upcomingVideoIndex)}
                  loop
                  muted
                  preload="metadata"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onCanPlay={handleVideoLoad}
                />
              </div>
            </div>
          )}

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            preload="metadata"
            id="next-video"
            className={`absoluteCenter invisible absolute z-20 size-64 object-cover object-center ${isTouchDevice ? 'pointer-events-none' : ''}`}
            onCanPlay={handleVideoLoad}
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            preload="metadata"
            className={`absolute left-0 top-0 size-full object-cover object-center ${isTouchDevice ? 'pointer-events-none' : ''}`}
            onCanPlay={handleVideoLoad}
          />
        </div>

        {/* // Text Section BR */}

        <h1 className="kol-heading-display absolute bottom-5 right-5 z-40" style={{ color: '#f5f5f5' }}>
          Vinnustofa
        </h1>

        {/* // Text Section TL */}

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5">
            {/* <h1 className="kol-heading-display text-[var(--color-brand-light)]">Kolkrabbi</h1> */}
            {/* <p className="mb-5 max-w-64 kol-mono text-[var(--color-brand-light)]">
              Design Studio & Atelier
              <br />
              Based in Reykjavík, Iceland
            </p> */}

            {/* // Button */}

            {/* <Button variant="accent" href="#contact">
              Get in Touch
            </Button> */}
          </div>
        </div>
      </div>

      <h1 className="kol-heading-display absolute bottom-5 right-5" style={{ color: '#1e1e21' }}>
        Vinnustofa
      </h1>
    </div>
  )
}

export default HeroSection
