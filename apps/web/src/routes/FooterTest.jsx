import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

// =============================================================================
// Palette — 3 harmonious colors: deep ink, warm amber, cool sage
// =============================================================================

const C = {
  ink: '#0a0f1a',
  amber: '#c4956a',
  sage: '#7a9e8e',
  ghost: 'rgba(255,255,255,0.06)',
  line: 'rgba(255,255,255,0.08)',
  dim: 'rgba(255,255,255,0.35)',
  soft: 'rgba(255,255,255,0.55)',
  bright: 'rgba(255,255,255,0.88)',
}

// =============================================================================
// Shared data
// =============================================================================

const SOCIALS = [
  { href: 'https://www.instagram.com/kolkrabbi_/', text: 'Instagram' },
  { href: 'https://www.behance.net/kolkrabbi_', text: 'Behance' },
  { href: 'https://dribbble.com/kolkrabbi', text: 'Dribbble' },
  { href: 'https://www.youtube.com/@kolkrabbi-io', text: 'YouTube' },
  { href: 'https://www.tiktok.com/@kolkrabbi_', text: 'TikTok' },
]

const SITE_TREE = {
  Site: [
    { to: '/', text: 'Home' }, { to: '/work', text: 'Work' },
    { to: '/studio', text: 'Studio' }, { to: '/stack', text: 'Stack' },
  ],
  Collections: [
    { to: '/collections', text: 'Overview' }, { to: '/collections/illustrations', text: 'Illustrations' },
    { to: '/collections/grids', text: 'Grids' }, { to: '/collections/logomarks', text: 'Logomarks' },
    { to: '/collections/motion-graphics', text: 'Motion' },
  ],
  Foundry: [
    { to: '/foundry', text: 'Overview' }, { to: '/foundry/typefaces/malromur', text: 'Malromur' },
    { to: '/foundry/typefaces/root', text: 'Root' }, { to: '/foundry/typefaces/trollatunga', text: 'Trollatunga' },
    { to: '/foundry/typefaces/dylgjur', text: 'Dylgjur' }, { to: '/foundry/typefaces/gullhamrar', text: 'Gullhamrar' },
  ],
  Specimens: [
    { to: '/foundry/specimen', text: 'Overview' }, { to: '/foundry/specimen/malromur', text: 'Malromur' },
    { to: '/foundry/specimen/rot', text: 'Rot' }, { to: '/foundry/specimen/trollatunga', text: 'Trollatunga' },
  ],
  Workshop: [
    { to: '/workshop', text: 'Overview' }, { to: '/workshop/docs', text: 'Docs' },
    { to: '/workshop/design-system/colors', text: 'Colors' }, { to: '/workshop/design-system/typography', text: 'Typography' },
    { to: '/workshop/design-system/icons', text: 'Icons' }, { to: '/workshop/components/atoms', text: 'Atoms' },
  ],
  Apparat: [
    { to: '/workshop/apparat', text: 'Overview' }, { to: '/workshop/apparat/frequency-modulator', text: 'Freq. Modulator' },
    { to: '/workshop/apparat/kol-radial', text: 'Kol Radial' }, { to: '/workshop/apparat/kol-editor', text: 'Kol Editor' },
  ],
  Mirrors: [
    { to: '/workshop/mirrors/displacement', text: 'Displacement' }, { to: '/workshop/mirrors/movement', text: 'Movement' },
    { to: '/workshop/mirrors/copies', text: 'Copies' }, { to: '/workshop/mirrors/symphony', text: 'Symphony' },
  ],
}

// =============================================================================
// 10 narrative cards
// =============================================================================

const CARDS = [
  {
    num: '01',
    title: 'A visual language\nborn in Reykjavik',
    body: 'Kolkrabbi is a comprehensive design system for building consistent, accessible, and beautiful digital experiences. Every token, every component, every animation is considered.',
    accent: C.amber,
    tag: 'Foundation',
  },
  {
    num: '02',
    title: 'Sixty-nine\ncolor tokens',
    body: 'A semantic color architecture spanning surface layers, accent palettes, and utility swatches. Designed for dark-first interfaces with automatic contrast guarantees.',
    accent: C.sage,
    tag: 'Colors',
  },
  {
    num: '03',
    title: 'Five typefaces.\nAll free.',
    body: 'The foundry ships custom typefaces under the SIL Open Font License. Malromur, Root, Trollatunga, Dylgjur, Gullhamrar. Each designed for real-world applications, not just demos.',
    accent: C.amber,
    tag: 'Foundry',
  },
  {
    num: '04',
    title: 'Specimens that\nbreathe',
    body: 'Interactive type specimens that showcase each face in context. Poetry grids, editorial layouts, data tables, restaurant menus, legislative documents. Type in its natural habitat.',
    accent: C.sage,
    tag: 'Specimens',
  },
  {
    num: '05',
    title: 'Atomic\ncomponents',
    body: '42 atoms. 27 molecules. Built on container queries, not media queries. Every component responds to its own space, not the viewport. Drop anywhere, it adapts.',
    accent: C.amber,
    tag: 'Components',
  },
  {
    num: '06',
    title: 'The Apparatus',
    body: 'Interactive tools built as first-class components. A frequency modulator, a radial editor, a distress engine. Each is both a creative tool and a stress test of the system.',
    accent: C.sage,
    tag: 'Apparat',
  },
  {
    num: '07',
    title: 'Hall of\nMirrors',
    body: 'SVG displacement maps, PixiJS integrations, glass effects, and visual feedback systems. The effects layer where the design system meets the unpredictable.',
    accent: C.amber,
    tag: 'Mirrors',
  },
  {
    num: '08',
    title: '79 documentation\nfiles',
    body: 'Every decision is documented. Architecture, token rationale, component APIs, prose style guides, CDN structure. The system documents itself as it grows.',
    accent: C.sage,
    tag: 'Docs',
  },
  {
    num: '09',
    title: 'Self-hosted\ninfrastructure',
    body: 'Umami analytics on Neon PostgreSQL. Backblaze B2 CDN. Vercel edge functions. All free tiers, all self-managed. The dashboard dogfoods the component system with live production data.',
    accent: C.amber,
    tag: 'Ops',
  },
  {
    num: '10',
    title: 'Scroll\ndown',
    body: 'This page demonstrates two footer proposals. Both hide beneath the content, revealed as you scroll past. Toggle between them with the switch below.',
    accent: C.sage,
    tag: 'Footer',
    isCTA: true,
  },
]

// =============================================================================
// Card component
// =============================================================================

function NarrativeCard({ card, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-12 gap-6 md:gap-0 items-center transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
      }}
    >
      {/* Number — large */}
      <div className={`md:col-span-2 ${isEven ? 'md:order-1' : 'md:order-1'}`}>
        <span
          className="block text-[clamp(4rem,10vw,8rem)] font-extralight leading-none tracking-tighter"
          style={{ color: card.accent, opacity: 0.25 }}
        >
          {card.num}
        </span>
      </div>

      {/* Content */}
      <div className={`md:col-span-5 ${isEven ? 'md:order-2' : 'md:order-3'}`}>
        <div className="flex flex-col gap-4">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-medium"
            style={{ color: card.accent }}
          >
            {card.tag}
          </span>
          <h2
            className="text-[clamp(1.5rem,3.5vw,3rem)] font-light leading-[1.1] tracking-tight whitespace-pre-line"
            style={{ color: C.bright }}
          >
            {card.title}
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: C.dim }}>
            {card.body}
          </p>
        </div>
      </div>

      {/* Visual block — abstract shape */}
      <div className={`md:col-span-5 ${isEven ? 'md:order-3' : 'md:order-2'} flex ${isEven ? 'justify-end' : 'justify-start'}`}>
        <div
          className="relative w-full max-w-sm aspect-[4/3] rounded overflow-hidden"
          style={{ background: C.ghost }}
        >
          {/* Decorative lines */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-px transition-all duration-1000"
                style={{
                  background: card.accent,
                  opacity: visible ? 0.15 : 0,
                  width: visible ? `${60 + i * 8}%` : '0%',
                  transitionDelay: `${300 + i * 100}ms`,
                }}
              />
            ))}
          </div>
          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-16 h-16"
            style={{
              background: `linear-gradient(135deg, ${card.accent}15 0%, transparent 60%)`,
            }}
          />
          {card.isCTA && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-bounce" style={{ color: C.dim }}>
                &darr;
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Footer Proposal A — Sticky reveal, minimal/mega toggle
// =============================================================================

function FooterA() {
  const [expanded, setExpanded] = useState(false)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      className="transition-all duration-500 ease-in-out overflow-hidden"
      style={{
        background: C.ink,
        height: expanded ? '80vh' : '64px',
      }}
    >
      {expanded ? (
        // Mega — site tree
        <div className="flex flex-col h-full px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <span style={{ color: C.dim }} className="text-[10px] uppercase tracking-[0.15em]">
              Site tree
            </span>
            <button onClick={() => setExpanded(false)} style={{ color: C.dim }} className="text-[10px] uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">
              Collapse &darr;
            </button>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-5 overflow-y-auto">
            {Object.entries(SITE_TREE).map(([label, links]) => (
              <div key={label} className="flex flex-col gap-2">
                <span style={{ color: C.amber }} className="text-[10px] uppercase tracking-[0.15em] font-medium">
                  {label}
                </span>
                <div className="flex flex-col gap-0.5">
                  {links.map(({ to, text }) => (
                    <Link key={to} to={to} className="text-sm leading-relaxed hover:opacity-80 transition-opacity" style={{ color: C.dim }}>
                      {text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <span style={{ color: C.amber }} className="text-[10px] uppercase tracking-[0.15em] font-medium">Follow</span>
              <div className="flex flex-col gap-0.5">
                {SOCIALS.map(({ href, text }) => (
                  <a key={text} href={href} target="_blank" rel="noopener noreferrer" className="text-sm leading-relaxed hover:opacity-80 transition-opacity" style={{ color: C.dim }}>
                    {text}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 mt-4" style={{ borderTop: `1px solid ${C.line}` }}>
            <Link to="/" className="text-sm font-medium tracking-tight hover:opacity-80 transition-opacity" style={{ color: C.soft }}>kolkrabbi</Link>
            <div className="flex items-center gap-4">
              <span style={{ color: C.dim }} className="text-xs">Reykjavik, Iceland</span>
              <span style={{ color: C.dim }} className="text-xs">&copy; 2025</span>
              <button onClick={scrollToTop} style={{ color: C.dim }} className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">&uarr; Top</button>
            </div>
          </div>
        </div>
      ) : (
        // Minimal — single bar
        <div className="flex items-center justify-between px-6 lg:px-8 h-full">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium tracking-tight hover:opacity-80 transition-opacity" style={{ color: C.soft }}>kolkrabbi</Link>
            <span style={{ color: C.dim }} className="text-xs">&copy; 2025</span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            {SOCIALS.map(({ href, text }) => (
              <a key={text} href={href} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.12em] hover:opacity-70 transition-opacity" style={{ color: C.dim }}>
                {text}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setExpanded(true)} className="group flex items-center gap-1 opacity-40 hover:opacity-70 transition-opacity" title="Expand site tree">
              {[0, 1, 2].map(i => (
                <span key={i} className="rounded-full group-hover:w-2.5 transition-all" style={{ width: 4, height: 4, background: C.sage }} />
              ))}
            </button>
            <button onClick={scrollToTop} style={{ color: C.dim }} className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">&uarr; Top</button>
          </div>
        </div>
      )}
    </footer>
  )
}

// =============================================================================
// Footer Proposal B — Trapdoor, per-section expand
// =============================================================================

function TreeSection({ label, links, count, isOpen, onToggle }) {
  return (
    <div className="flex flex-col">
      <button onClick={onToggle} className="group flex items-center gap-2 py-1.5 text-left">
        <span className="text-[10px] uppercase tracking-[0.15em] font-medium transition-opacity" style={{ color: C.amber, opacity: isOpen ? 1 : 0.5 }}>
          {label}
        </span>
        <span className="text-[10px] tabular-nums" style={{ color: C.dim, opacity: 0.4 }}>{count}</span>
        <span className="text-[9px] transition-transform" style={{ color: C.dim, opacity: 0.4, transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>&rsaquo;</span>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? `${links.length * 28 + 8}px` : '0px', opacity: isOpen ? 1 : 0 }}>
        <div className="flex flex-col gap-0.5 pb-2">
          {links.map(({ to, text }) => (
            <Link key={to} to={to} className="text-sm leading-relaxed pl-2 hover:opacity-80 transition-opacity" style={{ color: C.dim, borderLeft: `1px solid ${C.line}` }}>
              {text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function FooterB() {
  const [openSections, setOpenSections] = useState(new Set())
  const allKeys = [...Object.keys(SITE_TREE), 'Follow']
  const allOpen = openSections.size === allKeys.length
  const anyOpen = openSections.size > 0

  const toggle = (label) => setOpenSections(prev => {
    const next = new Set(prev)
    next.has(label) ? next.delete(label) : next.add(label)
    return next
  })

  const toggleAll = () => setOpenSections(allOpen ? new Set() : new Set(allKeys))
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      className="flex flex-col transition-all duration-500 overflow-hidden"
      style={{ background: C.ink, minHeight: anyOpen ? '80vh' : '140px' }}
    >
      {/* Top */}
      <div className="flex items-center justify-between px-6 lg:px-8 pt-6 pb-3">
        <Link to="/" className="text-sm font-medium tracking-tight hover:opacity-80 transition-opacity" style={{ color: C.soft }}>kolkrabbi</Link>
        <div className="flex items-center gap-4">
          <span style={{ color: C.dim, opacity: 0.4 }} className="text-xs">Reykjavik</span>
          <button onClick={toggleAll} className="group flex items-center gap-1 opacity-40 hover:opacity-60 transition-opacity" title={allOpen ? 'Collapse' : 'Expand all'}>
            {[0, 1, 2].map(i => (
              <span key={i} className="rounded-full transition-all duration-300" style={{ width: allOpen ? 8 : 3, height: 3, background: C.sage }} />
            ))}
          </button>
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6">
          {Object.entries(SITE_TREE).map(([label, links]) => (
            <TreeSection key={label} label={label} links={links} count={links.length} isOpen={openSections.has(label)} onToggle={() => toggle(label)} />
          ))}
          <TreeSection label="Follow" links={SOCIALS.map(s => ({ to: s.href, text: s.text }))} count={SOCIALS.length} isOpen={openSections.has('Follow')} onToggle={() => toggle('Follow')} />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between px-6 lg:px-8 py-3" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="hidden md:flex items-center gap-4">
          {SOCIALS.map(({ href, text }) => (
            <a key={text} href={href} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.12em] hover:opacity-60 transition-opacity" style={{ color: C.dim, opacity: 0.5 }}>
              {text}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span style={{ color: C.dim }} className="text-xs">&copy; 2025</span>
          <button onClick={scrollToTop} style={{ color: C.dim }} className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">&uarr; Top</button>
        </div>
      </div>
    </footer>
  )
}

// =============================================================================
// Main page
// =============================================================================

export default function FooterTest() {
  const [proposal, setProposal] = useState('A')
  const Footer = proposal === 'A' ? FooterA : FooterB

  return (
    <div className="relative" style={{ background: C.ink }}>
      {/* Page content — on top, solid bg, covers the footer */}
      <div
        className="relative z-10 min-h-screen"
        style={{
          background: C.ink,
          boxShadow: '0 60px 120px -30px rgba(0,0,0,0.5)',
        }}
      >
        {/* ---- Hero ---- */}
        <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 relative overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[160px] pointer-events-none" style={{ background: `${C.amber}12` }} />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[160px] pointer-events-none" style={{ background: `${C.sage}10` }} />

          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.amber }}>
              kolkrabbi.io
            </span>
            <h1
              className="text-[clamp(2.5rem,7vw,6rem)] font-extralight leading-[0.95] tracking-tighter"
              style={{ color: C.bright }}
            >
              Design system,<br />
              type foundry<br />
              <span style={{ color: C.sage }}>&amp; studio</span>
            </h1>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: C.dim }}>
              A comprehensive system for building consistent, accessible, and beautiful digital experiences.
              Explore the journey from foundation to production.
            </p>
            <div className="flex items-center gap-6 mt-4">
              <span className="text-xs uppercase tracking-widest" style={{ color: C.dim }}>Scroll to explore</span>
              <span className="text-lg animate-bounce" style={{ color: C.amber }}>&darr;</span>
            </div>
          </div>
        </section>

        {/* ---- Narrative cards ---- */}
        <section className="px-6 lg:px-12 py-24">
          <div className="max-w-6xl mx-auto flex flex-col gap-32">
            {CARDS.map((card, i) => (
              <NarrativeCard key={card.num} card={card} index={i} />
            ))}
          </div>
        </section>

        {/* ---- Proposal toggle ---- */}
        <section className="px-6 lg:px-12 py-16">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: C.dim }}>Footer proposal</span>
            <div className="flex items-center gap-1 p-0.5 rounded-full" style={{ background: C.ghost }}>
              <button
                onClick={() => setProposal('A')}
                className="px-5 py-2 rounded-full text-xs font-medium transition-all"
                style={{
                  background: proposal === 'A' ? C.amber : 'transparent',
                  color: proposal === 'A' ? C.ink : C.dim,
                }}
              >
                A &mdash; Reveal
              </button>
              <button
                onClick={() => setProposal('B')}
                className="px-5 py-2 rounded-full text-xs font-medium transition-all"
                style={{
                  background: proposal === 'B' ? C.sage : 'transparent',
                  color: proposal === 'B' ? C.ink : C.dim,
                }}
              >
                B &mdash; Trapdoor
              </button>
            </div>
            <p className="text-xs text-center max-w-sm" style={{ color: C.dim }}>
              Scroll past this section to reveal the footer underneath.
              {proposal === 'A' ? ' Look for the three dots to expand the site tree.' : ' Click any section label to expand it.'}
            </p>
          </div>
        </section>

      </div>

      {/* Footer — sits below content in DOM, sticky to bottom of viewport.
          As you scroll past the content, the footer is revealed underneath
          because it sticks to the bottom while content scrolls away above. */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  )
}
