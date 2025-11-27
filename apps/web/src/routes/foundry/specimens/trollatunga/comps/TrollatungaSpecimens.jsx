import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import GridOverlay from '../../../../../components/specimens/GridOverlay'
import FloatingNavigation from '../../../../../components/specimens/FloatingNavigation'

const CharacterSetCard = lazy(() => import('../cards/CharacterSetCard'))
const WaterfallCard = lazy(() => import('../cards/WaterfallCard'))
const IcelandicPoetryDisplayCard = lazy(() => import('../cards/IcelandicPoetryDisplayCard'))
const LigaturesCard = lazy(() => import('../cards/LigaturesCard'))
const WeightVariationsCard = lazy(() => import('../cards/WeightVariationsCard'))

const sections = [
  { id: 'section-1', label: 'Character Set' },
  { id: 'section-2', label: 'Waterfall' },
  { id: 'section-3', label: 'Poetry Display' },
  { id: 'section-4', label: 'Ligatures' },
  { id: 'section-5', label: 'Weight Variations' }
]

export default function TrollatungaSpecimens() {
  const columns = 12
  const gutter = 24
  const marginX = 180
  const columnWidth = 86

  const [activeSection, setActiveSection] = useState('section-1')
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionRefs = useRef({})
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      setIsScrolling(true)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      const scrollPosition = window.scrollY + window.innerHeight / 3

      let currentSection = 'section-1'
      sections.forEach(({ id }) => {
        const element = sectionRefs.current[id]
        if (element) {
          const { top } = element.getBoundingClientRect()
          const absoluteTop = top + window.scrollY
          if (scrollPosition >= absoluteTop) {
            currentSection = id
          }
        }
      })

      setActiveSection(currentSection)
    }

    let rafId
    const rafHandleScroll = () => {
      rafId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', rafHandleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', rafHandleScroll)
      if (rafId) cancelAnimationFrame(rafId)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleNavigate = (sectionId) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-surface-secondary relative">
      <FloatingNavigation
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isScrolling={isScrolling}
      />
      <div className="pt-24">
        <GridOverlay columns={columns} gutter={gutter} marginX={marginX} columnWidth={columnWidth}>
          <Suspense fallback={<div className="w-full min-h-screen bg-surface flex items-center justify-center"><p className="text-auto">Loading...</p></div>}>
            <div ref={(el) => (sectionRefs.current['section-1'] = el)} id="section-1">
              <CharacterSetCard columns={columns} gutter={gutter} marginX={marginX} />
            </div>
          </Suspense>

          <Suspense fallback={<div className="w-full min-h-screen bg-surface flex items-center justify-center"><p className="text-auto">Loading...</p></div>}>
            <div ref={(el) => (sectionRefs.current['section-2'] = el)} id="section-2">
              <WaterfallCard columns={columns} gutter={gutter} marginX={marginX} />
            </div>
          </Suspense>

          <Suspense fallback={<div className="w-full min-h-screen bg-surface flex items-center justify-center"><p className="text-auto">Loading...</p></div>}>
            <div ref={(el) => (sectionRefs.current['section-3'] = el)} id="section-3">
              <IcelandicPoetryDisplayCard columns={columns} gutter={gutter} marginX={marginX} />
            </div>
          </Suspense>

          <Suspense fallback={<div className="w-full min-h-screen bg-surface flex items-center justify-center"><p className="text-auto">Loading...</p></div>}>
            <div ref={(el) => (sectionRefs.current['section-4'] = el)} id="section-4">
              <LigaturesCard columns={columns} gutter={gutter} marginX={marginX} />
            </div>
          </Suspense>

          <Suspense fallback={<div className="w-full min-h-screen bg-surface flex items-center justify-center"><p className="text-auto">Loading...</p></div>}>
            <div ref={(el) => (sectionRefs.current['section-5'] = el)} id="section-5">
              <WeightVariationsCard columns={columns} gutter={gutter} marginX={marginX} />
            </div>
          </Suspense>
        </GridOverlay>
      </div>
    </div>
  )
}
