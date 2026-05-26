import { useEffect, useCallback, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Icon, Divider, SourcesItem } from '@kol/ui'
import { getAllProjects } from '../lib/queries'
import TiltCard from '../components/animation/TiltCard'
import ShelfCard from '../components/work/ShelfCard'
import ImageLightbox from '../components/work/ImageLightbox'

const EASE = [0.16, 1, 0.3, 1]

function isVideo(src) {
  return src?.endsWith('.mp4') || src?.endsWith('.mov') || src?.endsWith('.webm')
}

function GalleryCarousel({ media, title }) {
  const hasDragged = useRef(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: false,
  })

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

  if (!media?.length) return null

  return (
    <>
      <div className="overflow-visible" ref={emblaRef}>
        <div
          className="flex gap-4 items-end"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onClickCapture={onClickCapture}
        >
          {media.map((item, i) => {
            const isGalleryVideo = item._type === 'galleryVideo'
            const authored = item.aspectRatio === '5:3' ? 5 / 3 : item.aspectRatio === '4:5' ? 4 / 5 : null
            const ar = authored ?? item.dimensions?.aspectRatio ?? 0.8
            const isWide = ar >= 1
            return (
              <div
                key={item._key || i}
                className="flex-none overflow-hidden rounded-[2px] cursor-pointer"
                style={{
                  width: isWide ? 'min(80%, 700px)' : 'min(50%, 400px)',
                  aspectRatio: ar,
                }}
                onClick={() => { if (!hasDragged.current) setLightboxIndex(i) }}
              >
                {isGalleryVideo ? (
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.alt || `${title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          media={media}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i - 1 + media.length) % media.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % media.length)}
        />
      )}
    </>
  )
}

function MoreWorkShelf({ projects }) {
  const hasDragged = useRef(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: false,
  })

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
    <div className="pb-24">
      <p className="kol-mono-xs text-fg-48 uppercase tracking-widest mb-6">More Work</p>
      <div className="overflow-visible" ref={emblaRef}>
        <div
          className="flex gap-4 items-end"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onClickCapture={onClickCapture}
        >
          {projects.map((p, i) => (
            <ShelfCard key={`${p._id}-${i}`} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WorkDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isModal = !!location.state?.backgroundLocation
  const panelRef = useRef(null)
  const heroSectionRef = useRef(null)
  const gridRef = useRef(null)
  const videoRef = useRef(null)
  const [arrowVisible, setArrowVisible] = useState(true)
  const [pastHero, setPastHero] = useState(false)

  const [allProjects, setAllProjects] = useState([])

  useEffect(() => {
    let cancelled = false
    getAllProjects().then((data) => {
      if (!cancelled) setAllProjects(data)
    })
    return () => { cancelled = true }
  }, [])
  const project = allProjects.find((p) => p.slug.current === slug) || null
  const notFound = allProjects.length > 0 && !project

  const handleClose = useCallback(() => {
    isModal ? navigate(-1) : navigate('/work')
  }, [isModal, navigate])

  useEffect(() => {
    if (isModal && panelRef.current) panelRef.current.scrollTop = 0
    else if (!isModal) window.scrollTo(0, 0)
    setArrowVisible(true)
    setPastHero(false)
  }, [slug, isModal])

  // Hide arrow as soon as grid starts entering view
  useEffect(() => {
    const panel = panelRef.current
    const grid = gridRef.current
    if (!panel || !grid) return
    const heroSection = heroSectionRef.current
    const onScroll = () => {
      const gridTop = grid.getBoundingClientRect().top
      const panelTop = panel.getBoundingClientRect().top
      const panelBottom = panel.getBoundingClientRect().bottom
      setArrowVisible(gridTop > panelBottom - 40)
      setPastHero(gridTop <= panelBottom)
      // Pause video only when hero section is fully off-screen
      if (videoRef.current && heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        if (heroBottom < panelTop) videoRef.current.pause()
        else videoRef.current.play()
      }
    }
    panel.addEventListener('scroll', onScroll, { passive: true })
    return () => panel.removeEventListener('scroll', onScroll)
  }, [slug, project])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleClose])


  if (notFound) {
    return <Navigate to="/work" replace />
  }

  if (!project) return null

  const otherProjects = allProjects.filter((p) => p._id !== project._id)
  const shelfProjects = otherProjects
  const heroUrl = project.heroVideo?.url || project.heroImage?.url
  const heroIsVideo = isVideo(heroUrl)

  const liveUrl = project.links?.find((l) => l.label === 'Live')?.url
  const repoUrl = project.links?.find((l) => l.label === 'Repo')?.url
  const workshopUrl = project.links?.find((l) => l.label === 'Workshop')?.url

  const scrollToGrid = () => {
    if (gridRef.current && panelRef.current) {
      const top = gridRef.current.offsetTop
      panelRef.current.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Backdrop — modal only */}
      {isModal && (
        <motion.div
          className="fixed inset-0 z-[70]"
          style={{  }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          onClick={handleClose}
        />
      )}

      {/* Panel — modal: slides up from bottom; standalone: normal flow */}
      <motion.div
        ref={panelRef}
        className={isModal
          ? "fixed top-0 right-0 bottom-0 z-[80] w-full md:w-[78vw] overflow-y-auto overflow-x-hidden bg-surface-primary select-none"
          : "w-full min-h-screen overflow-x-hidden bg-surface-primary select-none"
        }
        initial={isModal ? { y: '100%' } : false}
        animate={isModal ? { y: 0 } : undefined}
        transition={isModal ? { duration: 0.2, ease: EASE } : undefined}
      >
        {/* Sticky header — always at top */}
        <div
          className={`sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 transition-all duration-300 ${pastHero ? 'bg-fg-inverse-48' : 'bg-fg-inverse-80'}`}
          style={{
            backdropFilter: pastHero ? 'blur(4px)' : 'none',
            WebkitBackdropFilter: pastHero ? 'blur(4px)' : 'none',
          }}
        >
          <motion.p
            className="kol-mono-xs text-white/60 uppercase tracking-widest mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
          >
            / {project.type}
          </motion.p>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-fg-04 transition-colors hover:bg-fg-08 cursor-pointer"
            style={{ backdropFilter: 'blur(8px)' }}
            aria-label="Close"
          >
            <Icon name="cross" size={20} />
          </button>
        </div>

        {/* ── Section 1: Hero — tall container so sticky title spans hero + gap ── */}
        <div ref={heroSectionRef} className="relative -mt-[68px] h-[120svh] md:h-[150vh]">
          {/* Video / image fills first 100vh only */}
          <div className="absolute inset-x-0 top-0 h-screen">
            {heroIsVideo ? (
              <video
                ref={videoRef}
                src={heroUrl}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={heroUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Title text — sticky, stays pinned from hero through gap until grid pushes it */}
          <div className="sticky top-20 z-10 px-4 md:px-8 lg:px-12 pt-12">
            <div className="inline-block max-w-[600px] bg-surface-primary rounded-[2px] p-4 pl-8 md:pl-12 lg:pl-16 -ml-8 md:-ml-12 lg:-ml-16">
              <motion.p
                className="kol-mono-xs text-auto uppercase tracking-widest mb-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
              >
                {project.client || project.title}
              </motion.p>
              <motion.h1
                className="kol-heading-lg text-auto"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              >
                {project.description}
              </motion.h1>
            </div>
          </div>

          {/* Down arrow — bottom of video area */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-10"
            style={{ top: 'calc(100vh - 5rem)', pointerEvents: arrowVisible ? 'auto' : 'none' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: arrowVisible ? 1 : 0, y: arrowVisible ? 0 : 8 }}
            transition={{ duration: arrowVisible ? 0.5 : 0.25, delay: arrowVisible ? 1.2 : 0, ease: EASE }}
          >
            <button
              type="button"
              onClick={scrollToGrid}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-primary border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
              aria-label="Scroll to gallery"
            >
              <Icon name="chevron-down" size={20} />
            </button>
          </motion.div>
        </div>

        {/* ── Section 2: Grid ── */}
        <div ref={gridRef} className="pt-16">
          {/* Gallery carousel */}
          {project.media?.length > 0 && (
            <div className="pl-4 md:pl-8 lg:pl-12 mb-32">
              <GalleryCarousel media={project.media} title={project.title} />
            </div>
          )}

          <div className="px-4 md:px-8 lg:px-12">
            {/* Metadata — 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {/* Col 1: Tags, About */}
              <div className="flex flex-col gap-4">
                {project.tags?.length > 0 && (
                  <div>
                    <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">Tags</p>
                    <p className="kol-mono-sm-regular text-auto">{project.tags.join(', ')}</p>
                  </div>
                )}
                {project.about && (
                  <div>
                    <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">About</p>
                    <p className="kol-mono-sm-regular text-auto">{project.about}</p>
                  </div>
                )}
              </div>

              {/* Col 2: Year, Type, Client */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">Year</p>
                  <p className="kol-mono-sm-regular text-auto">{project.year}</p>
                </div>
                <div>
                  <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">Type</p>
                  <p className="kol-mono-sm-regular text-auto capitalize">{project.type}</p>
                </div>
                {project.client && (
                  <div>
                    <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">Client</p>
                    <p className="kol-mono-sm-regular text-auto">{project.client}</p>
                  </div>
                )}
              </div>

              {/* Col 3: Links */}
              {(project.type === 'tool' || project.type === 'system') && project.links?.length > 0 ? (
                <div>
                  <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-3">Sources & References</p>
                  <ul className="sources-list">
                    {project.links.map((link, i) => (
                      <SourcesItem
                        key={i}
                        number={String(i + 1).padStart(2, '0')}
                        title={link.label}
                        href={link.url}
                        meta={link.url}
                      />
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {liveUrl && (
                    <div>
                      <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">Live</p>
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="kol-mono-sm-regular text-auto hover:text-fg-64 transition-colors underline">{liveUrl}</a>
                    </div>
                  )}
                  {repoUrl && (
                    <div>
                      <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">Repository</p>
                      <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="kol-mono-sm-regular text-auto hover:text-fg-64 transition-colors underline">{repoUrl}</a>
                    </div>
                  )}
                  {workshopUrl && (
                    <div>
                      <p className="kol-mono-xxs text-fg-48 uppercase tracking-widest mb-1">Workshop</p>
                      <Link to={workshopUrl} className="kol-mono-sm-regular text-auto hover:text-fg-64 transition-colors underline">{workshopUrl}</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Divider className="mb-24" />

            {/* Recent work shelf */}
            {shelfProjects.length > 0 && (
              <MoreWorkShelf projects={shelfProjects} />
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
