import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { AnimatePresence } from 'framer-motion'
import SEO from '../../components/layout/SEO'
import PrintDetailOverlay from './PrintDetailOverlay'
import { prints, getPrintBySlug } from '../../data/prints'
import { useParams, useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website'

/**
 * Experimental Prints Landing — "The Drift"
 *
 * Concept: A sideways-scrolling gallery driven by vertical scroll.
 * The entire page is a single horizontal plane. Prints float at
 * different vertical positions and scales, like pieces pinned to
 * a massive studio wall. The background shifts from pitch black
 * through warm cream to acid yellow as you traverse the wall.
 *
 * Navigation is disorienting on purpose — the scroll direction
 * disconnects from the movement direction. Prints drift at
 * different parallax speeds. Text runs vertically. The final
 * section snaps back to vertical for the catalog grid.
 */

// Distribute prints across the horizontal plane with varied positions
const LAYOUT = prints.map((print, i) => {
  // Deterministic pseudo-random using index
  const seed = (i * 7 + 3) % 24
  const row = i % 3
  const yPositions = [8, 35, 62] // top, middle, bottom (% of viewport)
  const baseY = yPositions[row]
  const yJitter = ((seed % 7) - 3) * 3 // -9 to +9
  const scale = [0.7, 1, 0.85, 1.15, 0.75, 0.95, 1.1, 0.8][i % 8]
  const rotation = ((seed % 5) - 2) * 1.5 // -3 to +3 degrees
  const parallaxSpeed = [0.6, 0.8, 1, 1.2, 0.7, 0.9, 1.1, 0.85][i % 8]

  return {
    print,
    x: i * 520 + (seed % 3) * 60, // horizontal position with jitter
    y: baseY + yJitter,
    scale,
    rotation,
    parallaxSpeed,
    width: scale > 1 ? 400 : scale > 0.85 ? 340 : 280
  }
})

const TOTAL_WIDTH = (prints.length * 520) + 800 // total scrollable width

export default function PrintsExperimental() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const print = slug ? getPrintBySlug(slug) : null
  const isOverlayOpen = Boolean(print)

  const containerRef = useRef(null)
  const horizontalRef = useRef(null)
  const titleRef = useRef(null)
  const bgRef = useRef(null)
  const catalogRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleCardClick = useCallback((rect, printSlug) => {
    navigate(`/prints/${printSlug}`)
  }, [navigate])

  const handleClose = useCallback(() => {
    navigate('/prints')
  }, [navigate])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll driven by vertical scroll
      const horizontalScroll = gsap.to(horizontalRef.current, {
        x: () => -(TOTAL_WIDTH - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${TOTAL_WIDTH}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Background color shift across the scroll
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${TOTAL_WIDTH}`,
          scrub: true,
        },
        keyframes: [
          { backgroundColor: '#000000', duration: 0 },
          { backgroundColor: '#0a0a08', duration: 0.15 },
          { backgroundColor: '#1a1812', duration: 0.3 },
          { backgroundColor: '#f5f0e8', duration: 0.5 },  // warm cream
          { backgroundColor: '#e8df00', duration: 0.7 },  // acid yellow
          { backgroundColor: '#c8ff00', duration: 0.85 },  // electric chartreuse
          { backgroundColor: '#0a0a0a', duration: 1 },    // back to black
        ]
      })

      // Title parallax — moves slower than the scroll
      gsap.to(titleRef.current, {
        x: () => -(TOTAL_WIDTH - window.innerWidth) * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${TOTAL_WIDTH}`,
          scrub: 1,
        }
      })

      // Per-card parallax
      const cards = horizontalRef.current?.querySelectorAll('[data-drift-card]')
      cards?.forEach((card, i) => {
        const layout = LAYOUT[i]
        if (!layout) return
        const speed = (layout.parallaxSpeed - 1) * 300

        gsap.to(card, {
          x: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${TOTAL_WIDTH}`,
            scrub: 1,
          }
        })
      })

      return () => {
        horizontalScroll.scrollTrigger?.kill()
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="Prints — Art Print Store"
        description="Original art prints available for purchase."
        ogTitle="Art Prints — Kolkrabbi"
        ogDescription="Browse and purchase original art prints."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/prints"
        canonical="https://kolkrabbi.io/prints"
      />

      <main id="main" className="w-full overflow-x-hidden">
        {/* === HORIZONTAL DRIFT SECTION === */}
        <div
          ref={bgRef}
          style={{ backgroundColor: '#000000' }}
          className="transition-colors duration-0"
        >
          <section
            ref={containerRef}
            className="relative h-screen overflow-hidden"
          >
            {/* Massive vertical title — pinned, slow parallax */}
            <div
              ref={titleRef}
              className="absolute left-8 top-0 h-full flex items-center z-10 pointer-events-none select-none"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              <span
                className="text-[20vw] font-bold tracking-[-0.04em] leading-none opacity-[0.06] mix-blend-difference"
                style={{ color: '#ffffff' }}
              >
                PRINTS
              </span>
            </div>

            {/* Horizontal track */}
            <div
              ref={horizontalRef}
              className="absolute top-0 left-0 h-full flex items-start"
              style={{ width: `${TOTAL_WIDTH}px` }}
            >
              {/* Opening breathing space */}
              <div className="flex-shrink-0 w-[50vw] h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <p className="kol-helper-12 uppercase tracking-[6px] mix-blend-difference" style={{ color: '#ffffff' }}>Kolkrabbi</p>
                  <h1 className="kol-display-lg mix-blend-difference" style={{ color: '#ffffff' }}>Prints</h1>
                  <p className="kol-mono-10 mix-blend-difference opacity-40 mt-4" style={{ color: '#ffffff' }}>Scroll to drift</p>
                </div>
              </div>

              {/* Floating print cards */}
              {LAYOUT.map((item, i) => (
                <div
                  key={item.print.id}
                  data-drift-card
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${item.x + 600}px`, // offset for opening space
                    top: `${item.y}%`,
                    width: `${item.width}px`,
                    transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
                    transformOrigin: 'center center',
                  }}
                  onClick={() => handleCardClick(null, item.print.slug)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                  <div className="relative overflow-hidden rounded transition-transform duration-500 group-hover:scale-[1.03]">
                    <img
                      src={item.print.images?.[2] || item.print.image}
                      alt={item.print.name}
                      className="w-full aspect-[3/4] object-cover"
                      loading="lazy"
                    />
                    {/* Hover label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="kol-helper-12 uppercase text-white tracking-widest">{item.print.name}</p>
                      <p className="kol-mono-10 text-white/60 mt-1">{item.print.year}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* End card — CTA to scroll down */}
              <div
                className="absolute right-[200px] top-1/2 -translate-y-1/2 text-center space-y-6"
                style={{ left: `${TOTAL_WIDTH - 500}px` }}
              >
                <p className="kol-helper-12 uppercase tracking-[6px] mix-blend-difference" style={{ color: '#ffffff' }}>
                  24 Prints
                </p>
                <p className="kol-mono-10 mix-blend-difference opacity-40" style={{ color: '#ffffff' }}>
                  Continue scrolling for catalog
                </p>
              </div>
            </div>

            {/* Progress indicator — thin line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-fg-08">
              <div
                className="h-full bg-accent-primary"
                style={{ width: '0%' }}
                ref={el => {
                  if (!el) return
                  gsap.to(el, {
                    width: '100%',
                    ease: 'none',
                    scrollTrigger: {
                      trigger: containerRef.current,
                      start: 'top top',
                      end: () => `+=${TOTAL_WIDTH}`,
                      scrub: true,
                    }
                  })
                }}
              />
            </div>
          </section>
        </div>

        {/* === VERTICAL SECTIONS BELOW === */}

        {/* Breather */}
        <div className="h-[70vh] flex items-center justify-center px-6 bg-surface-primary">
          <div className="text-center space-y-6 max-w-[600px]">
            <p className="kol-helper-12 uppercase text-accent-primary tracking-widest">Archival Editions</p>
            <p className="kol-mono-12 text-fg-48 leading-relaxed">
              Pigment inks on Hahnemuhle cotton rag. Signed, numbered, shipped flat. Limited editions are never reprinted once sold out.
            </p>
          </div>
        </div>

        {/* Behind the Print — staggered editorial grid */}
        <section className="py-32 px-6 md:px-8 bg-surface-primary">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-16 space-y-4">
              <p className="kol-helper-12 uppercase text-accent-primary tracking-widest">Behind the Print</p>
              <h2 className="kol-sans-heading-02">From studio to paper</h2>
            </div>

            {/* Staggered masonry-style editorial grid */}
            <div className="grid grid-cols-12 gap-5">
              {/* Large — spans 7 columns */}
              <div className="col-span-12 md:col-span-7 space-y-4">
                <div className="aspect-[16/10] rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-borg/artwork/borg-artwork-1700.jpg`} alt="Process" className="size-full object-cover" loading="lazy" />
                </div>
                <p className="kol-mono-10 text-fg-48">Digital composition — layering texture, geometry, and color.</p>
              </div>

              {/* Tall — spans 5 columns */}
              <div className="col-span-12 md:col-span-5 space-y-4 md:mt-24">
                <div className="aspect-[3/4] rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-hornhimna/print/hornhimna-print-1700.jpg`} alt="Print detail" className="size-full object-cover" loading="lazy" />
                </div>
                <p className="kol-mono-10 text-fg-48">Test prints on archival cotton rag, 308gsm.</p>
              </div>

              {/* Small — spans 4 columns */}
              <div className="col-span-6 md:col-span-4 space-y-4 md:-mt-16">
                <div className="aspect-square rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-mytar/artwork/mytar-artwork-1132.jpg`} alt="Detail" className="size-full object-cover" loading="lazy" />
                </div>
                <p className="kol-mono-10 text-fg-48">Embossed seal and signature.</p>
              </div>

              {/* Wide — spans 8 columns */}
              <div className="col-span-6 md:col-span-8 space-y-4">
                <div className="aspect-[2/1] rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-skinnalon/artwork/skinnalon-artwork-1700.jpg`} alt="Exhibition" className="size-full object-cover" loading="lazy" />
                </div>
                <p className="kol-mono-10 text-fg-48">Rigid flat packaging with certificate of authenticity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog grid */}
        <section
          ref={catalogRef}
          aria-label="Print catalog"
          className="max-w-[1600px] mx-auto px-6 md:px-8 py-32 bg-surface-primary"
        >
          <div className="mb-12 space-y-4">
            <p className="kol-helper-12 uppercase text-accent-primary tracking-widest">Catalog</p>
            <h2 className="kol-sans-heading-02">All Prints</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {prints.map((p) => (
              <div
                key={p.id}
                className="group cursor-pointer space-y-3"
                onClick={() => handleCardClick(null, p.slug)}
              >
                <div className="aspect-[3/4] rounded overflow-hidden bg-surface-secondary border border-fg-08 transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={p.images?.[2] || p.image}
                    alt={p.name}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="kol-mono-10 truncate">{p.name}</p>
                  <p className="kol-mono-10 text-fg-32 flex-shrink-0">{p.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Detail overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <PrintDetailOverlay
            key={slug}
            print={print}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  )
}
