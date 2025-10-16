import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from '../../animation/AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)

// The Animation Logic

const About = () => {
  useGSAP(() => {
    // Disable complex scroll animations on mobile
    const clipAnimation = gsap.timeline({
      // Timeline
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    })

    clipAnimation.to('.mask-clip-path', {
      // Animation Clip Path
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    })
  })

  // Page Content

  return (
    <div id="studio" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* // Intro Text */}
        <p className="kol-heading-lg uppercase md:text-[10px] text-black">
          Kolkrabbi Vinnustofa
        </p>

        {/* Animated Title Component */}

        <AnimatedTitle
          title="Design studio & Atelier based in Reykjavík"
          containerClass="mb-5 text-center text-black"
        />

        {/* Text Section Below */}

        <div className="aboutSubtext">
          <p className="kol-text text-black">Design studio & Atelier based in Reykjavík</p>
          <p className="kol-mono-xs text-gray-600">
            Visual language, defined by a set of foundational principles; from
            logo design and it's usage in various formats.
          </p>
        </div>
      </div>

      {/* Image id "clip> link to timeline in Animation Logic" */}
      {/* ".mask-clip-path" link to clip path in Animation Logic */}

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path aboutImage">
          <img
            src="/img/Kolk-img/kolk-about-1.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default About
