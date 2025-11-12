import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from '../../animation/AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)

const StudioHero = () => {
  useGSAP(() => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    const scrollDistance = isMobile ? '+=600' : isTablet ? '+=800' : '+=1200'

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#studio-clip',
        start: 'center center',
        end: `${scrollDistance} center`,
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    })

    clipAnimation.to('.studio-mask-clip-path', {
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      aspectRatio: 'auto',
      borderRadius: 0,
    })
  })

  return (
    <div id="studio" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="kol-heading-md uppercase text-auto">
          Kolkrabbi Vinnustofa
        </p>

        <AnimatedTitle
          title="A design studio rooted in craft and clarity"
          containerClass="mb-5 text-center text-auto"
        />

        <div className="aboutSubtext" style={{ zIndex: 30 }}>
          <div className="aboutSubtextInner">
            <p className="kol-display-lg text-auto">Building meaningful visual systems</p>
            <p className="kol-mono-text text-auto">
              We're a small studio based in Reykjavík, focused on visual identity, custom typography, and thoughtful design systems for brands that value craftsmanship and clarity.
            </p>
          </div>
        </div>
      </div>

      <div className="h-dvh w-screen" id="studio-clip">
        <div className="studio-mask-clip-path aboutImage">
          <img
            src="/img/highlights/highlight-5-work.png"
            alt="Kolkrabbi Studio"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default StudioHero
