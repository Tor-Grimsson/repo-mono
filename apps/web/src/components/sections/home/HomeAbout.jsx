import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from '../../animation/AnimatedTitle'
import { useLanguage } from '../../../contexts/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

// The Animation Logic

const HomeAbout = () => {
  const { t } = useLanguage()

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
    <div id="studio" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* // Intro Text */}
        <p className="kol-heading-md uppercase text-auto">
          {t('home.about.studio')}
        </p>

        {/* Animated Title Component */}

        <AnimatedTitle
          title={t('home.about.title')}
          containerClass="mb-5 text-center text-auto"
        />

        {/* Text Section Below */}

        <div className="aboutSubtext" style={{ zIndex: 30 }}>
          <div className="aboutSubtextInner">
            <p className="kol-display-lg text-light-fixed">{t('home.about.headline')}</p>
            <p className="kol-mono-text text-light-fixed">
              {t('home.about.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Image id "clip> link to timeline in Animation Logic" */}
      {/* ".mask-clip-path" link to clip path in Animation Logic */}

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path aboutImage">
          <img
            src="/img/home/about-2.png"
            alt="Dancers in a minimalist studio"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default HomeAbout
