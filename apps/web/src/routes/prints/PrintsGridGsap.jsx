import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import SEO from '../../components/layout/SEO'
import { PrintGridCard } from '@kol/ui'
import PrintGridCardGsap from '../../../../../packages/ui/src/molecules/PrintGridCardGsap'
import { prints } from '../../data/prints'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website'
const COL_COUNT = 4
const GAP = 24
const COLUMN_SPEEDS = [28, 38, 22, 34] // px/s — varied but intentional

export default function PrintsGridGsap({ onCardClick }) {
  const [shuffledPrints] = useState(() => [...prints].sort(() => Math.random() - 0.5))
  const columnRefs = useRef([])
  const tweensRef = useRef([])
  const containerRef = useRef(null)

  // Split prints into columns
  const columns = Array.from({ length: COL_COUNT }, () => [])
  shuffledPrints.forEach((print, i) => {
    columns[i % COL_COUNT].push(print)
  })

  useEffect(() => {
    const colEls = columnRefs.current.filter(Boolean)
    if (!colEls.length) return

    // Kill previous
    tweensRef.current.forEach(tw => tw.kill())
    tweensRef.current = []

    colEls.forEach((colEl, i) => {
      colEl.style.willChange = 'transform'

      const singleSetHeight = colEl.scrollHeight / 2
      const speed = COLUMN_SPEEDS[i] || 30

      const initialOffset = -(singleSetHeight * ((i * 0.15) % 1))
      gsap.set(colEl, { y: initialOffset })

      const tween = gsap.to(colEl, {
        y: initialOffset - singleSetHeight,
        duration: singleSetHeight / speed,
        ease: 'none',
        repeat: -1
      })

      tweensRef.current.push(tween)
    })

    // Pause when hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        tweensRef.current.forEach(tw => {
          if (entry.isIntersecting) tw.resume()
          else tw.pause()
        })
      },
      { threshold: 0 }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      tweensRef.current.forEach(tw => tw.kill())
      tweensRef.current = []
    }
  }, [shuffledPrints])

  return (
    <>
      <SEO
        title="Prints — Art Print Store"
        description="Original art prints available for purchase. Limited editions and open editions in various sizes."
        ogTitle="Art Prints — Kolkrabbi"
        ogDescription="Browse and purchase original art prints, limited editions, and open editions."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/prints"
        canonical="https://kolkrabbi.io/prints"
      />
      <main className="w-full overflow-x-hidden bg-surface-primary">
        {/* Hero — GSAP river */}
        <div
          ref={containerRef}
          className="w-full overflow-hidden"
          style={{ height: '300vh' }}
        >
          <div
            className="flex gap-6"
            style={{
              transform: 'rotate(-15deg) scale(1.3)',
              transformOrigin: 'center center',
              height: '140%',
              marginTop: '-20%'
            }}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex-1 overflow-hidden">
                <div
                  ref={el => { columnRefs.current[colIndex] = el }}
                  className="flex flex-col"
                  style={{ gap: `${GAP}px` }}
                >
                  {[...col, ...col].map((print, i) => (
                    <PrintGridCardGsap
                      key={`${print.id}-${i >= col.length ? 'dup' : 'orig'}`}
                      print={print}
                      onCardClick={onCardClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breather */}
        <div className="h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-6">
            <h1 className="kol-display-lg">Prints</h1>
            <p className="kol-mono-text text-fg-48 max-w-[600px] mx-auto">Original art prints on archival cotton rag. Signed, numbered, and shipped flat with a certificate of authenticity.</p>
          </div>
        </div>

        {/* Behind the Print — editorial process section */}
        <section className="py-32 px-6 md:px-8">
          <div className="max-w-[1400px] mx-auto space-y-6 mb-16">
            <p className="kol-helper-uc-xs text-accent-primary tracking-widest">Behind the Print</p>
            <h2 className="kol-heading-md max-w-[600px]">From studio to paper</h2>
          </div>

          {/* Horizontal scroll strip */}
          <div className="relative -mx-6 md:-mx-8">
            <div className="flex gap-5 overflow-x-auto px-6 md:px-8 pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
              {/* Card 1 — tall */}
              <div className="flex-shrink-0 snap-start w-[320px] md:w-[380px] space-y-4">
                <div className="aspect-[3/4] rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-blokk/print/blokk-print-1700.jpg`} alt="Print inspection" className="size-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-1">
                  <p className="kol-helper-uc-xs text-fg-48">01</p>
                  <p className="kol-mono-xs text-fg-64">Each artwork begins as a digital composition, layering texture and geometry.</p>
                </div>
              </div>

              {/* Card 2 — wide */}
              <div className="flex-shrink-0 snap-start w-[480px] md:w-[560px] space-y-4">
                <div className="aspect-[16/10] rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-tangents/artwork/tangents-artwork-1700.jpg`} alt="Studio process" className="size-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-1">
                  <p className="kol-helper-uc-xs text-fg-48">02</p>
                  <p className="kol-mono-xs text-fg-64">Color proofing and test prints on different paper stocks before the final run.</p>
                </div>
              </div>

              {/* Card 3 — square */}
              <div className="flex-shrink-0 snap-start w-[360px] md:w-[420px] space-y-4">
                <div className="aspect-square rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-faust/artwork/faust-artwork-1700.jpg`} alt="Paper detail" className="size-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-1">
                  <p className="kol-helper-uc-xs text-fg-48">03</p>
                  <p className="kol-mono-xs text-fg-64">Hahnemuhle 308gsm cotton rag — archival pigment ink rated for 100+ years.</p>
                </div>
              </div>

              {/* Card 4 — tall */}
              <div className="flex-shrink-0 snap-start w-[320px] md:w-[380px] space-y-4">
                <div className="aspect-[3/4] rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-midnight/print/midnight-print-1700.jpg`} alt="Signing" className="size-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-1">
                  <p className="kol-helper-uc-xs text-fg-48">04</p>
                  <p className="kol-mono-xs text-fg-64">Each print is hand-signed, numbered, and stamped with an embossed seal.</p>
                </div>
              </div>

              {/* Card 5 — wide */}
              <div className="flex-shrink-0 snap-start w-[480px] md:w-[560px] space-y-4">
                <div className="aspect-[16/10] rounded overflow-hidden bg-surface-secondary border border-fg-08">
                  <img src={`${cdnBase}/art-prints/print-weissensee/artwork/weissensee-artwork-1700.jpg`} alt="Exhibition" className="size-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-1">
                  <p className="kol-helper-uc-xs text-fg-48">05</p>
                  <p className="kol-mono-xs text-fg-64">Shipped flat in rigid packaging with a certificate of authenticity.</p>
                </div>
              </div>

              {/* Spacer for last card padding */}
              <div className="flex-shrink-0 w-6 md:w-8" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="max-w-[800px] mx-auto px-6 md:px-8 py-32 text-center space-y-6">
          <h2 className="kol-heading-md">Original Art Prints</h2>
          <p className="kol-mono-sm text-fg-64 leading-relaxed">
            Each piece is printed on archival cotton rag paper using pigment inks rated for 100+ years. Signed, numbered, and shipped flat with a certificate of authenticity. Limited editions won't be reprinted once sold out.
          </p>
        </section>

        {/* Static gallery grid */}
        <section aria-label="Print catalog" className="max-w-[1600px] mx-auto px-6 md:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shuffledPrints.map((print) => (
              <PrintGridCard
                key={print.id}
                print={print}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
