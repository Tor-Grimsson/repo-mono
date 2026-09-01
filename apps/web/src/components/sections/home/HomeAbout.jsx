import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { AnimatedTitle } from '@kolkrabbi/kol-component'

gsap.registerPlugin(ScrollTrigger)

const cdnBase = 'https://b2.kolkrabbi.io/website/asset-library/homepage'

// The Animation Logic

const HomeAbout = () => {

  useGSAP(() => {
    // Responsive scroll distance based on viewport size
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    const scrollDistance = isMobile ? '+=600' : isTablet ? '+=800' : '+=1200'

    // Image clip animation
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: `${scrollDistance} center`,
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    })

    clipAnimation.to('.mask-clip-path', {
      // Animation Clip Path
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      aspectRatio: 'auto',
      borderRadius: 0,
    })

  })

  // Page Content

  return (
    <div id="studio" className="min-h-screen w-full">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* // Intro Text */}
        {/* `--kol-text-heading-02` is a FLAT 40px — declared once at :root and never
          * redefined at any breakpoint (only heading-01 and the display ramp step).
          * The title below is clamp(3rem, 8vw, 6rem), so it runs 48px here and 96px
          * on desktop while this line never moved: the eyebrow:title ratio collapsed
          * from 2.4 on desktop to 1.2 on a phone. Clamped to track the title instead
          * of overriding the DS token, which every other consumer shares. */}
        <p className="kol-sans-heading-02 text-[clamp(22px,3.6vw,40px)] font-normal tracking-[0.04em] uppercase text-auto">
          Kolkrabbi Vinnustofa
        </p>

        {/* Animated Title Component */}

        <AnimatedTitle
          title="Design studio & Atelier based in Reykjavík"
          /* `animatedTitle` is load-bearing, not decoration (2026-08-31): the type
           * lives in `styles/animations.css` as `.animatedTitle .animatedWord`, a
           * DESCENDANT selector. The DS AnimatedTitle puts `.animatedWord` on each
           * word but the container only ever gets `containerClass` — without this
           * the rule never matches and every word fell back to ui-sans-serif at
           * 16px, unstyled. */
          containerClass="animatedTitle mb-5 text-center text-auto"
        />

      </div>

      {/* Image id "clip> link to timeline in Animation Logic" */}
      {/* ".mask-clip-path" link to clip path in Animation Logic */}

      <div className="h-dvh w-full" id="clip">
        <div className="mask-clip-path aboutImage">
          <img
            src={`${cdnBase}/home-about/home-about-1200.jpg`}
            srcSet={`
              ${cdnBase}/home-about/home-about-400.jpg 400w,
              ${cdnBase}/home-about/home-about-800.jpg 800w,
              ${cdnBase}/home-about/home-about-1200.jpg 1200w,
              ${cdnBase}/home-about/home-about-1600.jpg 1600w,
              ${cdnBase}/home-about/home-about-2560.jpg 2560w
            `}
            sizes="100vw"
            alt="Dancers in a minimalist studio"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default HomeAbout
