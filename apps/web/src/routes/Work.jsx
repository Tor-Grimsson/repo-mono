import { useCallback, useRef, useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AsciiClouds } from '@kol/ui'
import { getAllProjects } from '../lib/queries'
import ShelfCard from '../components/work/ShelfCard'
import ProjectListItem from '../components/work/ProjectListItem'
import { useWorkView } from '../context/WorkViewContext'

const SHELF_TYPES = [
  { key: 'client', label: 'Client Work' },
  { key: 'collection', label: 'Collections' },
  { key: 'tool', label: 'Tools' },
  { key: 'system', label: 'Systems' },
]

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

function repeatProjects(projects, count = 8) {
  if (projects.length === 0) return []
  const result = []
  for (let i = 0; i < count; i++) {
    result.push({ ...projects[i % projects.length], _repeatIndex: i })
  }
  return result
}

// Scroll-driven parallax speed — fraction of scroll delta applied to shelf
const SCROLL_PARALLAX_MIN = 0.1
const SCROLL_PARALLAX_MAX = 0.4

function ShelfRow({ type, projects, fromLeft }) {
  const repeated = repeatProjects(projects, 8)
  const hasDragged = useRef(false)
  const sectionRef = useRef(null)
  const lastScrollY = useRef(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: fromLeft ? 'end' : 'start',
    containScroll: false,
    ...(fromLeft && { startIndex: repeated.length - 1 }),
  })

  // Scroll-driven parallax: page scroll nudges the carousel (disabled on mobile)
  useEffect(() => {
    if (!emblaApi) return
    if (IS_MOBILE) return

    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const inView = rect.bottom > 0 && rect.top < window.innerHeight
      if (!inView) {
        lastScrollY.current = window.scrollY
        return
      }

      const delta = window.scrollY - lastScrollY.current
      lastScrollY.current = window.scrollY

      // Ease-in: parallax strength increases the further down the page
      const scrollProgress = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1)
      const parallax = SCROLL_PARALLAX_MIN + (SCROLL_PARALLAX_MAX - SCROLL_PARALLAX_MIN) * (scrollProgress * scrollProgress)

      const engine = emblaApi.internalEngine()
      const offset = delta * parallax * (fromLeft ? 1 : -1)
      engine.scrollBody.useDuration(0)
      engine.scrollTo.distance(offset, false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [emblaApi, fromLeft])

  const onPointerDown = useCallback(() => {
    hasDragged.current = false
  }, [])

  const onPointerMove = useCallback(() => {
    if (emblaApi?.internalEngine().dragHandler.pointerDown()) {
      hasDragged.current = true
    }
  }, [emblaApi])

  const onClickCapture = useCallback((e) => {
    if (hasDragged.current) e.preventDefault()
  }, [])

  return (
    <section ref={sectionRef} className="py-6 md:py-16">
      <div
        className="overflow-visible select-none"
        ref={emblaRef}
        style={{
          paddingLeft: fromLeft ? undefined : 'max(4rem, calc((100vw - 1400px) / 2 + 16rem))',
          paddingRight: fromLeft ? 'max(4rem, calc((100vw - 1400px) / 2 + 16rem))' : undefined,
        }}
      >
        <div
          className="flex gap-8 items-end"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onClickCapture={onClickCapture}
        >
          {repeated.map((project, i) => (
            <ShelfCard key={`${project._id}-${i}`} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className={`max-w-[1400px] mx-auto mt-4 md:mt-6 ${fromLeft ? 'pr-4 md:pr-64 text-right' : 'pl-4 md:pl-64'}`}>
        <p className="kol-helper-xs text-auto uppercase">{type.label}</p>
      </div>
    </section>
  )
}

const MOTION_EASE = [0.16, 1, 0.3, 1]

const introVariants = {
  hidden: (direction) => ({ x: direction * 40, opacity: 0 }),
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: MOTION_EASE } },
  exit: (direction) => ({ x: direction * -40, opacity: 0, transition: { duration: 0.3, ease: MOTION_EASE } }),
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'


function ListView({ projects }) {
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setHasAnimated(true))
  }, [])

  return (
    <div className="pt-16">
      {projects.map((project, i) => (
        <div
          key={project._id}
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0px)' : `translateY(${-(20 + (i % 3) * 8)}px)`,
            transition: `opacity ${0.7 + (i % 3) * 0.15}s ${EASE} ${i * 0.07}s, transform ${0.7 + (i % 3) * 0.15}s ${EASE} ${i * 0.07}s`,
          }}
        >
          <Link to={`/work/${project.slug.current}`} state={{ backgroundLocation: location }}>
            <ProjectListItem
              project={project}
              isActive={activeIndex === i}
              onMouseEnter={() => setActiveIndex(i)}
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

function filterProjects(projects, query) {
  if (!query.trim()) return projects
  const q = query.toLowerCase()
  return projects.filter((p) =>
    p.title?.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    p.client?.toLowerCase().includes(q) ||
    p.type?.toLowerCase().includes(q) ||
    p.tags?.some((t) => t.toLowerCase().includes(q))
  )
}

export default function Work() {
  const { viewMode, setViewMode, searchQuery } = useWorkView()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('view') === 'list') setViewMode('list')
  }, [])
  const direction = viewMode === 'shelf' ? -1 : 1

  const [projects, setProjects] = useState([])

  useEffect(() => {
    let cancelled = false
    getAllProjects().then((data) => {
      if (!cancelled) setProjects(data)
    })
    return () => { cancelled = true }
  }, [])

  const filtered = filterProjects(projects, searchQuery)
  const projectsByType = (type) => filtered.filter((p) => p.type === type)

  return (
    <>
      <main className="relative pt-20 md:pt-56 pb-16 md:pb-32 min-h-screen bg-surface-secondary">
        {location.pathname === '/work' && viewMode === 'shelf' && <AsciiClouds variant="drift" />}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={viewMode}
            custom={direction}
            variants={introVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={`max-w-[1400px] mx-auto px-4 md:px-6 pt-16 md:pt-32 ${viewMode === 'shelf' ? 'lg:pl-64' : ''}`}>
              <div className="max-w-[520px]">
                <p className="kol-mono-xs text-auto uppercase tracking-widest mb-2">Use Cases</p>
                <h1 className="kol-heading-lg text-auto">Featured client work, collections, tools and ui systems</h1>
              </div>
            </div>

            {viewMode === 'shelf' ? (
              <div className={`flex flex-col gap-12 md:gap-24 transition-opacity duration-500 ${window.location.pathname !== '/work' ? 'opacity-20' : 'opacity-100'}`}>
                {SHELF_TYPES.map((type, typeIndex) => {
                  const typeProjects = projectsByType(type.key)
                  if (typeProjects.length === 0) return null
                  return (
                    <ShelfRow
                      key={type.key}
                      type={type}
                      projects={typeProjects}
                      fromLeft={typeIndex % 2 === 1}
                      rowDelay={0}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                <ListView projects={filtered} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

    </>
  )
}
