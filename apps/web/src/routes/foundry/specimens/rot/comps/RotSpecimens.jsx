import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import GridOverlay from '../../../../../components/specimens/GridOverlay'
import FloatingNavigation from '../../../../../components/specimens/FloatingNavigation'

// Lazy load all specimen cards
const HeroTitleCard = lazy(() => import('../cards/HeroTitleCard'))
const ExhibitionCard = lazy(() => import('../cards/ExhibitionCard'))
const ExhibitionCatalogueCard = lazy(() => import('../cards/ExhibitionCatalogueCard'))
const PerformancePamphletCard = lazy(() => import('../cards/PerformancePamphletCard'))
const PantoneSwatchesCard = lazy(() => import('../cards/PantoneSwatchesCard'))
const TheatrePlayPages12Card = lazy(() => import('../cards/TheatrePlayPages12Card'))
const TheatrePlayPages34Card = lazy(() => import('../cards/TheatrePlayPages34Card'))
const RestaurantMenuCard = lazy(() => import('../cards/RestaurantMenuCard'))
const SuzanneCianiCard = lazy(() => import('../cards/SuzanneCianiCard'))
const IcelandicPoetryCard = lazy(() => import('../cards/IcelandicPoetryCard'))
const CharacterDisplayCard = lazy(() => import('../cards/CharacterDisplayCard'))
const RotVariableAxis = lazy(() => import('../cards/RotVariableAxis'))

// Define sections outside component to avoid recreation
const sections = [
  { id: 'section-1', label: 'Hero Title' },
  { id: 'section-2', label: 'Exhibition' },
  { id: 'section-3', label: 'Catalogue' },
  { id: 'section-4', label: 'Pamphlet' },
  { id: 'section-5', label: 'Pantone' },
  { id: 'section-6', label: 'Play 1-2' },
  { id: 'section-7', label: 'Play 3-4' },
  { id: 'section-8', label: 'Restaurant' },
  { id: 'section-9', label: 'Suzanne Ciani' },
  { id: 'section-10', label: 'Icelandic Poetry' },
  { id: 'section-11', label: 'Character Display' },
  { id: 'section-12', label: 'Variable Axis' },
]

export default function RotSpecimens() {
  const columns = 12
  const gutter = 24
  const marginX = 180
  const columnWidth = 86
  const [activeSection, setActiveSection] = useState('section-1')
  const [navVisible, setNavVisible] = useState(true)
  const [navAtBottom, setNavAtBottom] = useState(false)
  const [navStopPosition, setNavStopPosition] = useState(0)
  const variableAxisRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Throttle scroll handler using requestAnimationFrame
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 2

          for (const section of sections) {
            const element = document.getElementById(section.id)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section.id)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setNavVisible(false)
    }, 10000)

    const handleMouseEnter = () => {
      setNavVisible(true)
      clearTimeout(timeoutId)
      timeoutId = null
    }

    const handleMouseLeave = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setNavVisible(false)
      }, 10000)
    }

    const navElement = document.getElementById('floating-nav')
    if (navElement) {
      navElement.addEventListener('mouseenter', handleMouseEnter)
      navElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      clearTimeout(timeoutId)
      if (navElement) {
        navElement.removeEventListener('mouseenter', handleMouseEnter)
        navElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  useEffect(() => {
    if (!variableAxisRef.current) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const variableAxisElement = variableAxisRef.current
          if (!variableAxisElement) return

          const variableAxisRect = variableAxisElement.getBoundingClientRect()
          const variableAxisBottom = variableAxisRect.bottom
          const navThreshold = 96 // top-24 in pixels

          // If bottom of variable axis is at or above the nav position (96px from top)
          if (variableAxisBottom <= navThreshold) {
            // Calculate absolute position for nav
            const variableAxisOffsetBottom = variableAxisElement.offsetTop + variableAxisElement.offsetHeight
            const navElement = document.getElementById('floating-nav')
            const navHeight = navElement?.offsetHeight || 0
            const stopPosition = variableAxisOffsetBottom - navHeight

            setNavStopPosition(stopPosition)
            setNavAtBottom(true)
          } else {
            // Variable axis bottom is below nav position, keep nav fixed
            setNavAtBottom(false)
          }

          ticking = false
        })
        ticking = true
      }
    }

    // Run once on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-surface-secondary relative">
      <FloatingNavigation
        sections={sections}
        activeSection={activeSection}
        navVisible={navVisible}
        scrollToSection={scrollToSection}
        navAtBottom={navAtBottom}
        navStopPosition={navStopPosition}
      />

      <div className="pt-24">
        <GridOverlay columns={columns} gutter={gutter} marginX={marginX} columnWidth={columnWidth}>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-1">
            <HeroTitleCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-2">
            <ExhibitionCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-3">
            <ExhibitionCatalogueCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-4">
            <PerformancePamphletCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-5">
            <PantoneSwatchesCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-6">
            <TheatrePlayPages12Card columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-7">
            <TheatrePlayPages34Card columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-8">
            <RestaurantMenuCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-9">
            <SuzanneCianiCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-10">
            <IcelandicPoetryCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-11">
            <CharacterDisplayCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="section-12" ref={variableAxisRef}>
            <RotVariableAxis columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        </GridOverlay>
      </div>
    </div>
  )
}
