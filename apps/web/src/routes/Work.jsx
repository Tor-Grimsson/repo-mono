import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentFilters, ContentCollection, ContentCard, ContentRow, SectionText, Tag } from '@kolkrabbi/kol-component'
import { ParallaxShelf } from '@kolkrabbi/kol-content'
import SectionCtaWrapper from '../components/sections/shared/SectionCtaWrapper'
import { getAllProjects } from '../lib/queries'
import AsciiClouds from '../components/ui/AsciiClouds'
import SEO from '../components/layout/SEO'
import { seoMetadata } from '../data/seoMetadata'
import { useWorkView } from '../context/WorkViewContext'

const SHELF_TYPES = [
  { key: 'client', keys: ['client'], label: 'Client Work' },
  { key: 'collection', keys: ['collection'], label: 'Collections' },
  { key: 'typeface', keys: ['typeface'], label: 'Typefaces' },
  // tools + systems are ONE shelf (user 2026-08-27)
  { key: 'tools-systems', keys: ['tool', 'system'], label: 'Tools & Systems' },
]

// Every foundry face gets a card on the Typefaces shelf (user 2026-08-27) —
// faces without a Sanity project render as placeholders linking to their page.
const TYPEFACE_FACES = [
  { title: 'TG Málrómur', href: '/foundry/typefaces/malromur' },
  { title: 'TG Rót', href: '/foundry/typefaces/root' },
  { title: 'TG Tröllatunga', href: '/foundry/typefaces/trollatunga' },
  { title: 'TG Dylgjur', href: '/foundry/typefaces/dylgjur' },
  { title: 'TG Gullhamrar', href: '/foundry/typefaces/gullhamrar' },
]
const typefacePlaceholders = (items) =>
  TYPEFACE_FACES
    .filter((f) => !items.some((it) => it.title === f.title))
    .map((f) => ({ title: f.title, thumbnail: null, href: f.href, client: null, type: 'typeface', year: '2025' }))

// Flatten a Sanity project into the shelf's flat card props.
const toCardItem = (p) => ({
  title: p.title,
  thumbnail: p.thumbnail?.url,
  href: `/work/${p.slug.current}`,
  client: p.client,
  type: p.type,
  year: p.year,
})

const MOTION_EASE = [0.4, 0, 0.2, 1] // mirrors --kol-ease-house (theme 0.44.0); framer-motion can't read a CSS var

const introVariants = {
  hidden: (direction) => ({ x: direction * 40, opacity: 0 }),
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: MOTION_EASE } },
  exit: (direction) => ({ x: direction * -40, opacity: 0, transition: { duration: 0.3, ease: MOTION_EASE } }),
}


export const TYPE_LABELS = { client: 'Client', collection: 'Collection', typeface: 'Typeface', tool: 'Tool', system: 'System' }

// The page's face for the work card title — the one thing the DS card does not
// own. Passed as `titleClass` to the grid card and to the shelf (which renders
// the same `ContentCard work` since kol-content 0.11.0).
export const WORK_TITLE_FACE = 'work-display-title text-4xl lg:text-5xl text-fg-inverse truncate'

// THE grid work card: DS `ContentCard work` + content + the face. `item` is the
// flat `toCardItem` shape. The shelf renders kol-content's default (0.12.0: enter + tilt).
function WorkContentCard({ item, className }) {
  const navigate = useNavigate()
  return (
    <ContentCard
      variant="showcase"
      className={className}
      title={item.title}
      titleClass={WORK_TITLE_FACE}
      meta={`${item.client || TYPE_LABELS[item.type] || item.type} · ${item.year}`}
      media={item.thumbnail ? <img src={item.thumbnail} alt="" /> : undefined}
      href={item.href}
      onNavigate={(e) => { e.preventDefault(); navigate(item.href) }}
    />
  )
}

function ListRows({ projects, layout = 'list' }) {
  const navigate = useNavigate()

  const go =(href) => (event) => { event.preventDefault(); navigate(href) }
  const tagNodes = (tags) => tags?.length ? tags.map((t) => (
    <Tag key={t} variant="tertiary">{t}</Tag>
  )) : undefined

  // GRID — the same WorkContentCard the shelf renders
  if (layout === 'grid') {
    return (
      <ContentCollection form="grid" cols={{ md: 3, xl: 4 }}>
        {projects.map((project) => <WorkContentCard key={project._id} item={toCardItem(project)} />)}
      </ContentCollection>
    )
  }

  // LIST — the DS work row (WorkListingRowsAndFilters, component 0.100.0):
  // content + the page's face only. The local WorkListItem rows + their
  // stagger retired; the collection owns the enter.
  return (
    <ContentCollection form="list" gap={24}>
      {projects.map((project) => (
        <ContentRow
          key={project._id}
          variant="showcase"
          title={project.title}
          tags={tagNodes(project.tags)}
          meta={project.type}
          date={project.year}
          body={project.description}
          /* the face is the page's (work-display-preview); voice/ink are the DS's */
          bodyClass="work-display-preview text-2xl md:text-6xl leading-tight text-emphasis truncate"
          media={project.thumbnail?.url ? <img src={project.thumbnail.url} alt="" /> : undefined}
          href={`/work/${project.slug.current}`}
          onNavigate={go(`/work/${project.slug.current}`)}
        />
      ))}
    </ContentCollection>
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
      layoutPlacement="header"
      items={projects.map((p) => ({ ...p, type: TYPE_LABELS[p.type] || p.type }))}
      title="All Projects"
      totalCount={total}
      filterGroups={filterGroups}
      mutuallyExclusiveFilters={['type']}
      layoutOptions={[{ value: 'list', label: 'LIST' }, { value: 'grid', label: 'GRID' }]}
      layoutClassName="kol-helper-14"
      renderItem={(filteredItems, _view, layout) => <ListRows projects={filteredItems} layout={layout} />}
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
  const projectsByType = (keys) => filtered.filter((p) => keys.includes(p.type))

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
            <div className={`kol-page pt-0 ${viewMode === 'shelf' ? 'lg:pl-64' : ''}`}>
              <div className="max-w-[var(--kol-content-panel)]">
                <SectionText
                  eyebrow="Use Cases"
                  headline="Featured client work, collections, tools and ui systems"
                  headlineSize="heading-01"
                  headlineAs="h1"
                />
              </div>
            </div>

            {viewMode === 'shelf' ? (
              <div className={`flex flex-col gap-12 md:gap-24 pb-[100vh] transition-opacity duration-500 ${window.location.pathname !== '/work' ? 'opacity-20' : 'opacity-100'}`}>
                {SHELF_TYPES.map((type, typeIndex) => {
                  const typeProjects = projectsByType(type.keys)
                  let items = typeProjects.map(toCardItem)
                  if (type.key === 'typeface') items = [...items, ...typefacePlaceholders(items)]
                  // a 5th placeholder card so the last shelf's track is long enough to parallax (user 2026-08-27)
                  // (this shelf runs fromLeft — the array's head lands at the far end, so the placeholder goes first)
                  if (type.key === 'tools-systems') items = [{ title: '', thumbnail: null, href: '/work', client: null, type: 'tool', year: '' }, ...items]
                  if (items.length === 0) return null
                  return (
                    <ParallaxShelf
                      key={type.key}
                      type={type}
                      items={items}
                      fromLeft={typeIndex % 2 === 1}
                      plugins={[WheelGesturesPlugin()]}
                      onNavigate={(href, e) => { e.preventDefault(); navigate(href) }}
                      titleClass={WORK_TITLE_FACE}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="kol-page pt-0">
                <ListView projects={filtered} total={projects.length} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contact CTA — Home's, as the last card on the page, no surface (user 2026-08-27) */}
        {/* SectionCta ships NO horizontal padding of its own, so the page
          * owns it — same as Home and Studio (kol-framework.css:340).
          * PageGutterOwnership remainder; missed on the first pass because I
          * swept the DS's route list instead of grepping the component. */}
        <div className="kol-page">
          <SectionCtaWrapper background="none" />
        </div>
      </main>

    </>
  )
}
