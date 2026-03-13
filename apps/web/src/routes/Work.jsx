import { useState, useCallback, useRef, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AsciiClouds } from '@kol/ui'
import { getAllProjects } from '../lib/queries'
import TiltCard from '../components/animation/TiltCard'
import ProjectListItem from '../components/work/ProjectListItem'
import { useWorkView } from '../context/WorkViewContext'

const SHELF_TYPES = [
  { key: 'client', label: 'Client Work' },
  { key: 'collection', label: 'Collections' },
  { key: 'tool', label: 'Tools' },
  { key: 'system', label: 'Systems' },
]

const HEIGHTS = ['h-[408px] md:h-[560px]', 'h-[372px] md:h-[520px]', 'h-[336px] md:h-[480px]']

function getHeight(index) {
  return HEIGHTS[index % HEIGHTS.length]
}

function repeatProjects(projects, count = 8) {
  if (projects.length === 0) return []
  const result = []
  for (let i = 0; i < count; i++) {
    result.push({ ...projects[i % projects.length], _repeatIndex: i })
  }
  return result
}

// Scroll-driven parallax speed — fraction of scroll delta applied to shelf
const SCROLL_PARALLAX = 0.5

function ShelfRow({ type, projects, fromLeft, rowDelay = 0 }) {
  const repeated = repeatProjects(projects, 8)
  const hasDragged = useRef(false)
  const sectionRef = useRef(null)
  const lastScrollY = useRef(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), rowDelay * 1000)
    return () => clearTimeout(timer)
  }, [rowDelay])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: fromLeft ? 'end' : 'start',
    containScroll: false,
    ...(fromLeft && { startIndex: repeated.length - 1 }),
  })

  // Scroll-driven parallax: page scroll nudges the carousel
  useEffect(() => {
    if (!emblaApi) return
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

      // Ramp: full speed at viewport center, zero at edges
      const center = (rect.top + rect.bottom) / 2
      const viewCenter = window.innerHeight / 2
      const engine = emblaApi.internalEngine()
      // fromLeft rows move opposite direction so all converge through center
      const offset = delta * SCROLL_PARALLAX * (fromLeft ? 1 : -1)
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
    <section ref={sectionRef} className="py-16">
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
            <Link
              key={`${project._id}-${i}`}
              to={`/work/${project.slug.current}`}
              className={`flex-none w-[280px] md:w-[400px] ${getHeight(i)} group`}
              style={{ perspective: 800 }}
            >
              <div
                style={{
                  transformOrigin: 'bottom center',
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'rotateX(0deg) translateY(0px)' : `rotateX(${20 + (i % 3) * 8}deg) translateY(${30 + (i % 4) * 10}px)`,
                  transition: `opacity ${0.7 + (i % 3) * 0.15}s ${EASE} ${i * 0.07}s, transform ${0.7 + (i % 3) * 0.15}s ${EASE} ${i * 0.07}s`,
                }}
                className="w-full h-full"
              >
                <TiltCard
                  src={project.thumbnail?.url}
                  alt={project.title}
                  className="w-full h-full rounded-[4px]"
                  variant="grounded"
                >
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="kol-mono-text mix-blend-difference" style={{ color: '#ccc' }}>{project.title}</p>
                  </div>
                </TiltCard>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={`max-w-[1400px] mx-auto mt-4 md:mt-6 ${fromLeft ? 'pr-64 text-right' : 'pl-64'}`}>
        <p className="kol-helper-regular-xs text-fg-48 uppercase">{type.label}</p>
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
          <Link to={`/work/${project.slug.current}`}>
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
  const { viewMode, searchQuery } = useWorkView()
  const location = useLocation()
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
      <main className="relative pt-56 pb-32 min-h-screen">
        <AsciiClouds variant="drift" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={viewMode}
            custom={direction}
            variants={introVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={`max-w-[1400px] mx-auto pt-32 ${viewMode === 'shelf' ? 'pl-64' : ''}`}>
              <div className="max-w-[520px]">
                <p className="kol-mono-xs text-auto uppercase tracking-widest mb-2">Use Cases</p>
                <h1 className="kol-heading-lg text-auto">Featured client work, collections, tools and ui systems</h1>
              </div>
            </div>

            {viewMode === 'shelf' ? (
              <div className="flex flex-col gap-24">
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
              <div className="max-w-[1400px] mx-auto">
                <ListView projects={filtered} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Outlet context={{ projects }} />
    </>
  )
}
