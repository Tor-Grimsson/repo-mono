import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import GridOverlay from '../../../../../components/specimens/GridOverlay'
import FloatingNavigation from '../../../../../components/specimens/FloatingNavigation'

// Lazy load all specimen cards
const GridSystemIntroCard = lazy(() => import('../cards/GridSystemIntroCard'))
const TwelveColumnsCard = lazy(() => import('../cards/TwelveColumnsCard'))
const TwoColumnCard = lazy(() => import('../cards/TwoColumnCard'))
const ThreeColumnCard = lazy(() => import('../cards/ThreeColumnCard'))
const AsymmetricCard = lazy(() => import('../cards/AsymmetricCard'))
const ComplexGridCard = lazy(() => import('../cards/ComplexGridCard'))
const BaselineGridCard = lazy(() => import('../cards/BaselineGridCard'))
const EditorialCard = lazy(() => import('../cards/EditorialCard'))
const TypeSizesCard = lazy(() => import('../cards/TypeSizesCard'))

// Define sections outside component to avoid recreation
const sections = [
  { id: 'section-1', label: 'Grid Intro' },
  { id: 'section-2', label: 'Twelve Columns' },
  { id: 'section-3', label: 'Two Column' },
  { id: 'section-4', label: 'Three Column' },
  { id: 'section-5', label: 'Asymmetric' },
  { id: 'section-6', label: 'Complex Grid' },
  { id: 'section-7', label: 'Baseline Grid' },
  { id: 'section-8', label: 'Editorial' },
  { id: 'section-9', label: 'Type Sizes' },
]

export default function OrdsporSpecimens() {
  const columns = 12
  const gutter = 24
  const marginX = 180
  const columnWidth = 86
  const [activeSection, setActiveSection] = useState('section-1')
  const [navVisible, setNavVisible] = useState(true)
  const [navAtBottom, setNavAtBottom] = useState(false)
  const [navStopPosition, setNavStopPosition] = useState(0)
  const typeSizesRef = useRef(null)

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
    if (!typeSizesRef.current) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const typeSizesElement = typeSizesRef.current
          if (!typeSizesElement) return

          const typeSizesRect = typeSizesElement.getBoundingClientRect()
          const typeSizesBottom = typeSizesRect.bottom
          const navThreshold = 96 // top-24 in pixels

          // If bottom of type sizes is at or above the nav position (96px from top)
          if (typeSizesBottom <= navThreshold) {
            // Calculate absolute position for nav
            const typeSizesOffsetBottom = typeSizesElement.offsetTop + typeSizesElement.offsetHeight
            const navElement = document.getElementById('floating-nav')
            const navHeight = navElement?.offsetHeight || 0
            const stopPosition = typeSizesOffsetBottom - navHeight

            setNavStopPosition(stopPosition)
            setNavAtBottom(true)
          } else {
            // Type sizes bottom is below nav position, keep nav fixed
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
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-1">
            <GridSystemIntroCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-2">
            <TwelveColumnsCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-3">
            <TwoColumnCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-4">
            <ThreeColumnCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-5">
            <AsymmetricCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-6">
            <ComplexGridCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-7">
            <BaselineGridCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-8">
            <EditorialCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-auto">Loading...</div></div>}>
          <div id="section-9" ref={typeSizesRef}>
            <TypeSizesCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        </GridOverlay>
      </div>
    </div>
  )
}
