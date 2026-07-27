import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useThemeAttr } from '../../../hooks/useThemeAttr'
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'
import HlsVideo from '../../media/HlsVideo'

gsap.registerPlugin(ScrollTrigger)

const HomeHero = ({ onVideoStart }) => {
  const isTouchDevice = useIsTouchDevice()
  const theme = useThemeAttr()
  const frameRef = useRef(null)
  const titleRef = useRef(null)

  const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/hls-library/video-home'

  const videoSrc = useMemo(() => {
    const variant = theme === 'dark' ? 'hero-dark' : 'hero-light'
    return `${cdnBase}/${variant}/hls/master.m3u8`
  }, [theme])

  const posterSrc = useMemo(() => {
    const variant = theme === 'dark' ? 'hero-dark' : 'hero-light'
    const filename = theme === 'dark' ? 'still-hero-4k-dark.jpg' : 'still-hero-4k-light.jpg'
    return `${cdnBase}/${variant}/${filename}`
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
    <section className="home-hero full-bleed">
      <div ref={frameRef} className="home-hero__frame">
        <HlsVideo
          src={videoSrc}
          poster={posterSrc}
          className={`absolute left-0 top-0 size-full object-cover object-center ${isTouchDevice ? 'pointer-events-none' : ''}`}
          onCanPlay={handleVideoLoad}
        />

        <div ref={titleRef} className="home-hero__title">
          <h1 className="kol-display-lg home-hero__titleText">Vinnustofa</h1>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
