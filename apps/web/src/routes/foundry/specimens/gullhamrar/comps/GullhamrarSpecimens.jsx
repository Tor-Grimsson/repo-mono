import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import GridOverlay from '../../../../../components/specimens/GridOverlay'
import FloatingNavigation from '../../../../../components/specimens/FloatingNavigation'

// Lazy load all specimen cards
const TitleCard = lazy(() => import('../cards/TitleCard'))
const AmpersandCard = lazy(() => import('../cards/AmpersandCard'))
const WordListDualCard = lazy(() => import('../cards/WordListDualCard'))
const AaSpecimenCard = lazy(() => import('../cards/AaSpecimenCard'))
const WordListStackedCard = lazy(() => import('../cards/WordListStackedCard'))
const PoetryCard = lazy(() => import('../cards/PoetryCard'))
const SignageCard = lazy(() => import('../cards/SignageCard'))
const AlphabetCard = lazy(() => import('../cards/AlphabetCard'))
const PoemPageCard = lazy(() => import('../cards/PoemPageCard'))
const GullhamrarCard = lazy(() => import('../cards/GullhamrarCard'))
const GullhamrarVariableAxis = lazy(() => import('../cards/GullhamrarVariableAxis'))

// Define sections outside component to avoid recreation
const sections = [
  { id: 'title-page', label: 'Title' },
  { id: 'ampersand', label: 'Ampersand' },
  { id: 'word-list-dual', label: 'Word List I' },
  { id: 'aa-specimen', label: 'Aa Specimen' },
  { id: 'word-list-stacked', label: 'Word List II' },
  { id: 'poetry', label: 'Poetry' },
  { id: 'signage', label: 'Signage' },
  { id: 'poem-page-1', label: 'Poem Page' },
  { id: 'alphabet-dual', label: 'Alphabet' },
  { id: 'character-set', label: 'Gullhamrar' },
  { id: 'variable-axis', label: 'Weight Variations' },
]

export default function GullhamrarSpecimens() {
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
            <TitleCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="ampersand">
            <AmpersandCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="word-list-dual">
            <WordListDualCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="aa-specimen">
            <AaSpecimenCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="word-list-stacked">
            <WordListStackedCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="poetry">
            <PoetryCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="signage">
            <SignageCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="poem-page-1">
            <PoemPageCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="alphabet-dual">
            <AlphabetCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="character-set">
            <GullhamrarCard columns={columns} gutter={gutter} marginX={marginX} />
          </div>
        </Suspense>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><div className="kol-text-md text-fg-48">Loading...</div></div>}>
          <div id="variable-axis" ref={variableAxisRef}>
            <GullhamrarVariableAxis />
          </div>
        </Suspense>
      </GridOverlay>
      </div>
    </div>
  )
}
