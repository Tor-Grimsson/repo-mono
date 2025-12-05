import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useTheme } from '@kol/ui'
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'
import HlsVideo from '../../media/HlsVideo'

gsap.registerPlugin(ScrollTrigger)

const HomeHero = ({ onVideoStart }) => {
  const isTouchDevice = useIsTouchDevice()
  const { theme } = useTheme()
  const frameRef = useRef(null)
  const titleRef = useRef(null)

  const videoSrc = useMemo(() => {
    // Temporary swap: show light (v1) when site is in dark mode and vice versa
    if (theme === 'dark') {
      return 'https://f005.backblazeb2.com/file/kolkrabbi/website/homepage-hero/hls/master.m3u8'
    }
    return 'https://f005.backblazeb2.com/file/kolkrabbi/website/homepage-hero-v3/hls/master.m3u8'
  }, [theme])

  const handleVideoLoad = () => {
    if (onVideoStart) {
      onVideoStart()
    }
  }

  useEffect(() => {
    if (!frameRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frameRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
      tl.fromTo(frameRef.current,
        {
          scale: 1,
          skewY: 0
        },
        {
          scale: 0.92,
          skewY: -1.25,
          ease: 'none'
        }, 0)
      tl.fromTo(titleRef.current,
        {
          yPercent: 0,
          opacity: 1
        },
        {
          yPercent: -20,
          opacity: 0,
          ease: 'none'
        }, 0)
    }, frameRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="home-hero">
      <div ref={frameRef} className="home-hero__frame">
        <HlsVideo
          src={videoSrc}
          poster="/img/home/home-video-ph.png"
          className={`absolute left-0 top-0 size-full object-cover object-center ${isTouchDevice ? 'pointer-events-none' : ''}`}
          onCanPlay={handleVideoLoad}
        />

        <div ref={titleRef} className="home-hero__title">
          <h1 className="kol-heading-display home-hero__titleText">Vinnustofa</h1>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
