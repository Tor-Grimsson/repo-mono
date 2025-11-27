import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import GridOverlay from '../../../../../components/specimens/GridOverlay'
import FloatingNavigation from '../../../../../components/specimens/FloatingNavigation'

// Lazy load all specimen cards
const DylgjurTitleCard = lazy(() => import('../cards/DylgjurTitleCard'))
const WordGridBadgesCard = lazy(() => import('../cards/WordGridBadgesCard'))
const AaSpecimenCard = lazy(() => import('../cards/AaSpecimenCard'))
const WordListCard = lazy(() => import('../cards/WordListCard'))
const LigatureCard = lazy(() => import('../cards/LigatureCard'))
const GridLigaturesCard = lazy(() => import('../cards/GridLigaturesCard'))
const GridLayoutLightCard = lazy(() => import('../cards/GridLayoutLightCard'))
const GridLayoutDarkCard = lazy(() => import('../cards/GridLayoutDarkCard'))
const AlphabetCard = lazy(() => import('../cards/AlphabetCard'))
const DylgjurVariableAxis = lazy(() => import('../cards/DylgjurVariableAxis'))
const FladurTitleCard = lazy(() => import('../cards/FladurTitleCard'))

// Define sections outside component to avoid recreation
const sections = [
  { id: 'dylgjur-title', label: 'Title Page' },
  { id: 'word-grid', label: 'Word Grid' },
  { id: 'aa-specimen', label: 'Aa Specimen' },
  { id: 'word-list', label: 'Word List' },
  { id: 'ligature', label: 'Ligatures' },
  { id: 'alphabet', label: 'Alphabet' },
  { id: 'grid-layout-light', label: 'Grid Layout' },
  { id: 'grid-layout-dark', label: 'Grid Layout' },
  { id: 'fladur-title', label: 'Flaður' },
  { id: 'grid-ligatures', label: 'Grid Mixed' },
  { id: 'raftjan', label: 'Variable weight' },
]

export default function DylgjurSpecimens() {
  const columns = 12
  const gutter = 24
  const marginX = 180
  const columnWidth = 86
  const [activeSection, setActiveSection] = useState('dylgjur-title')
  const [navVisible, setNavVisible] = useState(true)
  const [navAtBottom, setNavAtBottom] = useState(false)
  const [navStopPosition, setNavStopPosition] = useState(0)
  const icelandicRef = useRef(null)

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
    if (!icelandicRef.current) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const icelandicElement = icelandicRef.current
          if (!icelandicElement) return

          const icelandicRect = icelandicElement.getBoundingClientRect()
          const icelandicBottom = icelandicRect.bottom
          const navThreshold = 96 // top-24 in pixels

          // If bottom of icelandic is at or above the nav position (96px from top)
          if (icelandicBottom <= navThreshold) {
            // Calculate absolute position for nav
            const icelandicOffsetBottom = icelandicElement.offsetTop + icelandicElement.offsetHeight
            const navElement = document.getElementById('floating-nav')
            const navHeight = navElement?.offsetHeight || 0
            const stopPosition = icelandicOffsetBottom - navHeight

            setNavStopPosition(stopPosition)
            setNavAtBottom(true)
          } else {
            // Icelandic bottom is below nav position, keep nav fixed
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
          <div id="dylgjur-title">
            <DylgjurTitleCard />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="word-grid">
            <WordGridBadgesCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="aa-specimen">
            <AaSpecimenCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="word-list">
            <WordListCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="ligature">
            <LigatureCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="alphabet">
            <AlphabetCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="grid-layout-light">
            <GridLayoutLightCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="grid-layout-dark">
            <GridLayoutDarkCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="fladur-title">
            <FladurTitleCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="grid-ligatures">
            <GridLigaturesCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="raftjan" ref={icelandicRef}>
            <DylgjurVariableAxis columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        </GridOverlay>
      </div>
    </div>
  )
}
