import { useEffect, useCallback, useRef, useState } from 'react'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Divider } from '@kolkrabbi/kol-component'
import { SourcesReferences, WorkCard } from '@kolkrabbi/kol-content'
import { getAllProjects } from '../lib/queries'
import SEO from '../components/layout/SEO'
import TiltCard from '../components/ui/TiltCard'
import ImageLightbox from '../components/ui/ImageLightbox'

const EASE = [0.4, 0, 0.2, 1] // mirrors --kol-ease-house (theme 0.44.0); framer-motion can't read a CSS var

function isVideo(src) {
  return src?.endsWith('.mp4') || src?.endsWith('.mov') || src?.endsWith('.webm')
}

// B2-hosted work videos ship a sibling poster.jpg next to video.mp4.
function b2Poster(url) {
  return url?.includes('/video.mp4') ? url.replace('/video.mp4', '/poster.jpg') : undefined
}

const isVideoItem = (item) =>
  item._type === 'galleryVideo' || item._type === 'galleryHostedVideo' || isVideo(item.url)

// Gallery video that only fetches/plays while in view — keeps scrolled-past
// videos at ~0 bandwidth (no autoPlay attribute; the observer drives playback).
function GalleryVideo({ src, poster, className }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <video ref={ref} src={src} poster={poster} muted playsInline loop preload="metadata" className={className} />
  )
}

function GalleryCarousel({ media, title }) {
  const hasDragged = useRef(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin()])

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

  // Prefer the B2-hosted twin; drop the old uploaded galleryVideo it supersedes
  // (the twin's _key is `hv-<sourceKey>`). Falls back to the old file if no twin exists.
  const twinKeys = new Set(
    media.filter((m) => m._type === 'galleryHostedVideo').map((m) => m._key)
  )
  const renderMedia = media.filter(
    (m) => !(m._type === 'galleryVideo' && twinKeys.has(`hv-${m._key}`))
  )

  return (
    <>
      <div className="overflow-visible" ref={emblaRef}>
        <div
          className="flex gap-4 items-end"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onClickCapture={onClickCapture}
        >
          {renderMedia.map((item, i) => {
            const isVid = isVideoItem(item)
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
                {isVid ? (
                  <GalleryVideo
                    src={item.url}
                    poster={b2Poster(item.url)}
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
          media={renderMedia}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i - 1 + renderMedia.length) % renderMedia.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % renderMedia.length)}
        />
      )}
    </>
  )
}

function MoreWorkShelf({ projects }) {
  const navigate = useNavigate()
  const hasDragged = useRef(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin()])

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
      <p className="kol-mono-10 text-fg-48 uppercase tracking-widest mb-6">More Work</p>
      <div className="overflow-visible" ref={emblaRef}>
        <div
          className="flex gap-4 items-end"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onClickCapture={onClickCapture}
        >
          {projects.map((p, i) => (
            <WorkCard
              key={`${p._id}-${i}`}
              title={p.title}
              titleClassName="work-display-title text-4xl lg:text-5xl"
              metaClassName="kol-mono-10 uppercase"
              thumbnail={p.thumbnail?.url}
              href={`/work/${p.slug.current}`}
              client={p.client}
              type={p.type}
              year={p.year}
              index={i}
              onNavigate={(href, e) => { e.preventDefault(); navigate(href) }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WorkDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const heroSectionRef = useRef(null)
  const gridRef = useRef(null)
  const videoRef = useRef(null)

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
    navigate('/work')
  }, [navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Pause hero video when scrolled out of view
  useEffect(() => {
    const hero = heroSectionRef.current
    const video = videoRef.current
    if (!hero || !video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
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
  const heroUrl = project.heroVideoUrl || project.heroImage?.url
  const heroIsVideo = isVideo(heroUrl)

  const liveUrl = project.links?.find((l) => l.label === 'Live')?.url
  const repoUrl = project.links?.find((l) => l.label === 'Repo')?.url
  const workshopUrl = project.links?.find((l) => l.label === 'Workshop')?.url

  const heroAspect = project.heroVideoUrl
    ? (project.heroVideoAspect === '4:5' ? 4 / 5 : 5 / 3)
    : (project.heroImage?.dimensions?.aspectRatio ?? 5 / 3)

  return (
    <>
      <SEO
        title={project.seo?.metaTitle || `${project.title} — Kolkrabbi`}
        description={project.seo?.metaDescription || project.description || project.about}
        ogImage={project.thumbnail?.url}
        ogUrl={`https://kolkrabbi.io/work/${project.slug.current}`}
        canonical={`https://kolkrabbi.io/work/${project.slug.current}`}
      />
      <main id="main" className="w-full min-h-screen overflow-x-hidden bg-surface-primary pt-[68px]">
        {/* Hero — locked to source aspect ratio */}
        <div ref={heroSectionRef} className="relative" style={{ aspectRatio: heroAspect }}>
          {heroIsVideo ? (
            <video
              ref={videoRef}
              src={heroUrl}
              poster={b2Poster(heroUrl)}
              aria-label={project.title}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={heroUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Title overlay — bottom-left of the hero frame */}
          <div className="absolute bottom-0 left-0 z-10 p-4 md:p-8 lg:p-12">
            <div className="inline-block max-w-[600px] bg-surface-primary rounded-[2px] p-4">
              <motion.p
                className="kol-mono-10 text-auto uppercase tracking-widest mb-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
              >
                {project.client || project.title}
              </motion.p>
              <motion.h1
                className="kol-sans-heading-01 text-auto"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              >
                {project.description}
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Grid */}
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
                    <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">Tags</p>
                    <p className="kol-mono-12 text-auto">{project.tags.join(', ')}</p>
                  </div>
                )}
                {project.about && (
                  <div>
                    <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">About</p>
                    <p className="kol-mono-12 text-auto">{project.about}</p>
                  </div>
                )}
              </div>

              {/* Col 2: Year, Type, Client */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">Year</p>
                  <p className="kol-mono-12 text-auto">{project.year}</p>
                </div>
                <div>
                  <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">Type</p>
                  <p className="kol-mono-12 text-auto capitalize">{project.type}</p>
                </div>
                {project.client && (
                  <div>
                    <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">Client</p>
                    <p className="kol-mono-12 text-auto">{project.client}</p>
                  </div>
                )}
              </div>

              {/* Col 3: Links */}
              {(project.type === 'tool' || project.type === 'system') && project.links?.length > 0 ? (
                <div>
                  <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-3">Sources & References</p>
                  <SourcesReferences
                    title=""
                    sources={project.links.map((link) => ({ title: link.label, href: link.url, note: link.url }))}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {liveUrl && (
                    <div>
                      <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">Live</p>
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="kol-mono-12 text-auto hover:text-fg-64 transition-colors underline">{liveUrl}</a>
                    </div>
                  )}
                  {repoUrl && (
                    <div>
                      <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">Repository</p>
                      <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="kol-mono-12 text-auto hover:text-fg-64 transition-colors underline">{repoUrl}</a>
                    </div>
                  )}
                  {workshopUrl && (
                    <div>
                      <p className="kol-mono-8 text-fg-48 uppercase tracking-widest mb-1">Workshop</p>
                      <Link to={workshopUrl} className="kol-mono-12 text-auto hover:text-fg-64 transition-colors underline">{workshopUrl}</Link>
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
      </main>
    </>
  )
}
