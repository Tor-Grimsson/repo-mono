import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import GridOverlay from '../../../../../components/specimens/GridOverlay'
import FloatingNavigation from '../../../../../components/specimens/FloatingNavigation'

// Lazy load all specimen cards
const MalromurTitlePage = lazy(() => import('../cards/MalromurTitlePage'))
const MalromurEditorial = lazy(() => import('../cards/MalromurEditorial'))
const MalromurDataTable = lazy(() => import('../cards/MalromurDataTable'))
const MalromurMenu = lazy(() => import('../cards/MalromurMenu'))
const MalromurNewsletter = lazy(() => import('../cards/MalromurNewsletter'))
const MalromurIndex = lazy(() => import('../cards/MalromurIndex'))
const MalromurChapter = lazy(() => import('../cards/MalromurChapter'))
const MalromurTOC = lazy(() => import('../cards/MalromurTOC'))
const MalromurScientific = lazy(() => import('../cards/MalromurScientific'))
const MalromurLegislative = lazy(() => import('../cards/MalromurLegislative'))
const MalromurVariableAxis = lazy(() => import('../cards/MalromurVariableAxis'))

// Define sections outside component to avoid recreation
const sections = [
  { id: 'title-page', label: 'Title' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'data-tables', label: 'Data Tables' },
  { id: 'menu', label: 'Menu' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'index', label: 'Index' },
  { id: 'chapter', label: 'Chapter' },
  { id: 'toc', label: 'TOC' },
  { id: 'scientific', label: 'Scientific Paper' },
  { id: 'legislative', label: 'Legislative' },
  { id: 'variable-axis', label: 'Weight Variations' },
]

export default function MalromurSpecimens() {
  const columns = 12
  const gutter = 24
  const marginX = 180
  const columnWidth = 86
  const [activeSection, setActiveSection] = useState('title-page')
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

          // If bottom of variable-axis is at or above the nav position (96px from top)
          if (variableAxisBottom <= navThreshold) {
            // Calculate absolute position for nav
            const variableAxisOffsetBottom = variableAxisElement.offsetTop + variableAxisElement.offsetHeight
            const navElement = document.getElementById('floating-nav')
            const navHeight = navElement?.offsetHeight || 0
            const stopPosition = variableAxisOffsetBottom - navHeight

            setNavStopPosition(stopPosition)
            setNavAtBottom(true)
          } else {
            // Variable-axis bottom is below nav position, keep nav fixed
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
          <div id="title-page">
            <MalromurTitlePage />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="editorial">
            <MalromurEditorial />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="data-tables">
            <MalromurDataTable />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="menu">
            <MalromurMenu />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="newsletter">
            <MalromurNewsletter />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="index">
            <MalromurIndex />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="chapter">
            <MalromurChapter />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="toc">
            <MalromurTOC />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="scientific">
            <MalromurScientific />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="legislative" className="py-24">
            <MalromurLegislative />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="variable-axis" ref={variableAxisRef}>
            <MalromurVariableAxis />
          </div>
        </Suspense>
      </GridOverlay>
      </div>
    </div>
  )
}
