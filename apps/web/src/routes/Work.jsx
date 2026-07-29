import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { motion, AnimatePresence } from 'framer-motion'
import ContentFilters from '../components/ui/ContentFilters.jsx'
import { ParallaxShelf, WorkListItem } from '@kolkrabbi/kol-content'
import { getAllProjects } from '../lib/queries'
import AsciiClouds from '../components/ui/AsciiClouds'
import SEO from '../components/layout/SEO'
import { seoMetadata } from '../data/seoMetadata'
import { useWorkView } from '../context/WorkViewContext'

const SHELF_TYPES = [
  { key: 'client', label: 'Client Work' },
  { key: 'collection', label: 'Collections' },
  { key: 'typeface', label: 'Typefaces' },
  { key: 'tool', label: 'Tools' },
  { key: 'system', label: 'Systems' },
]

// Flatten a Sanity project into kol-content's flat card props.
// titleClassName rides along — ParallaxShelf spreads items into its WorkCards.
const toCardItem = (p) => ({
  title: p.title,
  thumbnail: p.thumbnail?.url,
  href: `/work/${p.slug.current}`,
  client: p.client,
  type: p.type,
  year: p.year,
  titleClassName: 'work-display-title text-4xl lg:text-5xl',
})

const MOTION_EASE = [0.16, 1, 0.3, 1]

const introVariants = {
  hidden: (direction) => ({ x: direction * 40, opacity: 0 }),
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: MOTION_EASE } },
  exit: (direction) => ({ x: direction * -40, opacity: 0, transition: { duration: 0.3, ease: MOTION_EASE } }),
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'


const TYPE_LABELS = { client: 'Client', collection: 'Collection', typeface: 'Typeface', tool: 'Tool', system: 'System' }

function ListRows({ projects }) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setHasAnimated(true))
  }, [])

  return (
    <div>
      {projects.map((project, i) => (
        <div
          key={project._id}
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0px)' : `translateY(${-(20 + (i % 3) * 8)}px)`,
            transition: `opacity ${0.7 + (i % 3) * 0.15}s ${EASE} ${i * 0.07}s, transform ${0.7 + (i % 3) * 0.15}s ${EASE} ${i * 0.07}s`,
          }}
        >
          <WorkListItem
            title={project.title}
            titleClassName="kol-mono-12 uppercase"
            thumbnail={project.thumbnail?.url}
            tags={project.tags?.length ? project.tags : undefined}
            tagsSeparator=" · "
            type={project.type}
            year={project.year}
            description={project.description}
            previewClassName="work-display-preview text-xl md:text-5xl"
            href={`/work/${project.slug.current}`}
            active={activeIndex === i}
            onMouseEnter={() => setActiveIndex(i)}
            onNavigate={(href, e) => { e.preventDefault(); navigate(href) }}
          />
        </div>
      ))}
    </div>
  )
}

function ListView({ projects, total }) {
  const filterGroups = useMemo(() => {
    const types = [...new Set(projects.map((p) => p.type).filter(Boolean))].sort()
    const tags = [...new Set(projects.flatMap((p) => p.tags || []).filter(Boolean))].sort()
    const groups = []
    if (types.length > 0) {
      groups.push({
        label: 'Type',
        key: 'type',
        values: types.map((t) => TYPE_LABELS[t] || t),
      })
    }
    if (tags.length > 0) {
      groups.push({ label: 'Tags', key: 'tags', values: tags })
    }
    return groups
  }, [projects])

  return (
    <ContentFilters
      items={projects.map((p) => ({ ...p, type: TYPE_LABELS[p.type] || p.type }))}
      title="All Projects"
      totalCount={total}
      filterGroups={filterGroups}
      mutuallyExclusiveFilters={['type']}
      renderItem={(filteredItems) => <ListRows projects={filteredItems} />}
    />
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
  const navigate = useNavigate()
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
      <SEO
        title={seoMetadata.work.title}
        description={seoMetadata.work.description}
        ogImage={seoMetadata.work.image}
        ogUrl="https://kolkrabbi.io/work"
        canonical="https://kolkrabbi.io/work"
      />
      <main id="main" className="relative pt-20 md:pt-56 pb-16 md:pb-32 min-h-screen bg-surface-primary">
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
                <p className="kol-mono-10 text-auto uppercase tracking-widest mb-2">Use Cases</p>
                <h1 className="kol-sans-heading-01 text-auto">Featured client work, collections, tools and ui systems</h1>
              </div>
            </div>

            {viewMode === 'shelf' ? (
              <div className={`flex flex-col gap-12 md:gap-24 transition-opacity duration-500 ${window.location.pathname !== '/work' ? 'opacity-20' : 'opacity-100'}`}>
                {SHELF_TYPES.map((type, typeIndex) => {
                  const typeProjects = projectsByType(type.key)
                  if (typeProjects.length === 0) return null
                  return (
                    <ParallaxShelf
                      key={type.key}
                      type={type}
                      items={typeProjects.map(toCardItem)}
                      fromLeft={typeIndex % 2 === 1}
                      plugins={[WheelGesturesPlugin()]}
                      onNavigate={(href, e) => { e.preventDefault(); navigate(href) }}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-16">
                <ListView projects={filtered} total={projects.length} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

    </>
  )
}
