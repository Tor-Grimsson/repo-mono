import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ShellLayout, ShellSidebar, RightRail, buildTagCounts, useTagMode, TagPath } from '@kolkrabbi/kol-workshop'
import { Asset } from '@kolkrabbi/kol-brand/svg'
import { useScrollSpy } from '@kolkrabbi/kol-component'
import { Icon } from '@kolkrabbi/kol-icons'
import { WORKSHOP_ROUTES, buildWorkshopSearchItems } from '../../data/workshop/navigation.js'
import { VAULT_CATEGORIES, TAG_INVENTORY } from '../../data/workshop/vault.js'
import { labelFromSlug } from '../../data/workshop/labels.js'
import TakeoverMenu from '../layout/TakeoverMenu.jsx'

/**
 * WorkshopChrome — this app's adapter onto @kolkrabbi/kol-workshop, mounted
 * ONCE as a route-level layout. Mirrors kol-ds-ui showcase/src/lib/
 * ShellChrome.jsx: pages are content only and render into the shell's Outlet;
 * the TOC is DERIVED from the rendered headings, never passed. Replaces the
 * retired in-repo workshop-system compositions.
 */

/* Auto-TOC: read the headings the page actually rendered. Anchors can sit on
 * the heading or its wrapping section; headings inside demos/figures are
 * sample content, not the document, and are excluded at the source. */
function useHeadings() {
  const { pathname } = useLocation()
  const [items, setItems] = useState([])

  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return undefined

    const read = () => {
      const seen = new Set()
      const found = [...main.querySelectorAll('h2, h3')]
        .filter((h) => !h.closest('[data-toc-skip], .kol-doc-figure, .kol-demo-stage'))
        .map((h) => {
          const id = h.id || h.closest('section[id]')?.id
          return id ? { id, label: h.textContent.trim(), sub: h.tagName === 'H3' } : null
        })
        .filter(Boolean)
        /* Several headings can share one wrapping section[id] (card grids on
         * overview pages) — one anchor, one row; duplicates collide as keys. */
        .filter((item) => (seen.has(item.id) ? false : seen.add(item.id)))
      setItems((prev) =>
        prev.length === found.length && prev.every((p, i) => p.id === found[i].id) ? prev : found
      )
    }

    read()
    const observer = new MutationObserver(read)
    observer.observe(main, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname])

  return items
}

/* The default right rail — THE RightRail from kol-workshop, handed derived
 * data. DocumentationReader portals its own richer version (frontmatter tags,
 * related) over this via ShellTocContext on /workshop/docs/:id. */
function AutoToc() {
  const headings = useHeadings()
  const navigate = useNavigate()
  const { openTagMode } = useTagMode()
  const topTags = useMemo(() => buildTagCounts(TAG_INVENTORY).slice(0, 12), [])
  const activeId = useScrollSpy(headings.map((h) => h.id), { root: '#main' })

  const actions = [
    { id: 'back', label: 'Back', icon: <Icon name="arrow-left" size={14} />, onClick: () => navigate(-1) },
    { id: 'docs', label: 'All documentation', icon: <Icon name="book-open" size={14} />, to: '/workshop/docs' },
    { id: 'components', label: 'View components', icon: <Icon name="grid" size={14} />, to: '/workshop/design-system/components' },
    { id: 'copy', label: 'Copy path', icon: <Icon name="copy" size={14} />, onClick: () => navigator.clipboard.writeText(window.location.href) },
    { id: 'graph', label: 'Graph view', icon: <Icon name="polygon" size={14} />, onClick: () => openTagMode(null, { view: 'graph' }) },
  ]

  return (
    <RightRail
      toc={headings}
      activeId={activeId}
      related={[]}
      actions={actions}
      topTags={topTags}
      tags={[]}
      renderTag={(tag) => <TagPath tag={tag} />}
      onTagClick={(tag) => openTagMode(tag)}
      icon={Icon}
    />
  )
}

/* The brand pair: KOLKRABBI wordmark home, WORKSHOP wordmark to the surface —
 * the same pair the old WorkshopHeader drew. */
function WorkshopBrand() {
  return (
    <>
      <Link to="/" className="shell-header-logo hidden md:flex shrink-0 items-center text-emphasis lg:w-64">
        <Asset name="kol-wordmark" title="Kolkrabbi" className="inline-flex [&>svg]:h-6 [&>svg]:w-auto" />
      </Link>
      <Link to="/workshop" className="shell-header-logo flex items-center text-emphasis">
        <Asset name="wordmark-workshop" title="Workshop" className="inline-flex [&>svg]:h-6 [&>svg]:w-auto" />
      </Link>
    </>
  )
}

/* Sidebar order (user ruling 2026-08-08): Workshop's own surfaces first,
 * then the vault categories — Documentation, Operations. The old `docs`
 * route group is superseded by the vault tree. */
function WorkshopSidebarStack({ onNavigate }) {
  const surfaceRoutes = WORKSHOP_ROUTES.filter((r) => r.id !== 'docs')
  return (
    <div className="shell-rail-stack">
      <ShellSidebar
        routes={surfaceRoutes}
        basePath="/workshop"
        label="Workshop"
        labelTo="/workshop"
        onNavigate={onNavigate}
      />
      {VAULT_CATEGORIES.map(([category, groups]) => (
        <ShellSidebar
          key={category}
          routes={groups}
          basePath="/"
          label={labelFromSlug(category)}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )
}

/* The + that becomes an X — the takeover trigger's workshop variant. Same two
 * bars at rest as a plus; the whole glyph rotates 45° when open. */
function PlusX({ open }) {
  return (
    <span
      className="relative inline-block w-8 h-8 transition-transform duration-300"
      style={{ transform: open ? 'rotate(45deg)' : 'none' }}
      aria-hidden="true"
    >
      <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-current" />
      <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-current" />
    </span>
  )
}

export default function WorkshopChrome() {
  const { openTagMode } = useTagMode()
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef(null)

  /* The X's ride (user spec 2026-08-12): on open it travels slowly from its
   * bottom-right rest up to the normal top-right X slot, and every link line
   * it passes gets pushed left while the X overlaps it, springing back after.
   * On close it rides back down the same way. The button is `fixed` with a
   * set height, so once `top` is written `bottom` is ignored — we seed `top`
   * from the current rect and tween that. */
  useGSAP(() => {
    const btn = triggerRef.current
    if (!btn) return
    const links = gsap.utils.toArray('nav[aria-label="Primary"] [data-menu-item]')
    const pushers = links.map((el) => gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power2.out' }))
    const wasHit = links.map(() => false)

    /* ascii sparkles — same flair family as AsciiCursor's fireworks: a few
     * glyphs pop at the collision edge, drift off and fade, self-remove. */
    const SPARKS = ['*', '+', '·', '˚', 'x']
    const spark = (x, y, n = 3) => {
      for (let i = 0; i < n; i++) {
        const s = document.createElement('span')
        s.textContent = SPARKS[(Math.random() * SPARKS.length) | 0]
        s.className = 'kol-mono-14 text-emphasis'
        s.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:60;pointer-events:none;line-height:1`
        document.body.appendChild(s)
        gsap.to(s, {
          x: -(10 + Math.random() * 36),
          y: (Math.random() - 0.5) * 44,
          rotation: (Math.random() - 0.5) * 120,
          opacity: 0,
          duration: 0.6 + Math.random() * 0.4,
          ease: 'power2.out',
          onComplete: () => s.remove(),
        })
      }
    }

    const bump = () => {
      const b = btn.getBoundingClientRect()
      links.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const hit = b.bottom > r.top && b.top < r.bottom
        if (hit && !wasHit[i]) spark(b.left, r.top + r.height / 2)
        wasHit[i] = hit
        pushers[i](hit ? -(b.width + 8) : 0)
      })
    }
    const restTop = () => window.innerHeight - 24 - btn.offsetHeight /* bottom-6 */
    gsap.set(btn, { top: btn.getBoundingClientRect().top })
    if (menuOpen) {
      /* wait for the panel fade-in so the ride happens over visible links */
      gsap.to(btn, {
        top: 16, delay: 0.4, duration: 1.6, ease: 'power1.inOut', overwrite: 'auto', onUpdate: bump,
        onComplete: () => {
          bump()
          const b = btn.getBoundingClientRect()
          spark(b.left + b.width / 2, b.top + b.height / 2, 5) /* arrival burst */
        },
      })
    } else {
      gsap.to(btn, {
        top: restTop(), duration: 0.8, ease: 'power1.inOut', overwrite: 'auto', onUpdate: bump,
        onComplete: () => { gsap.set(btn, { clearProps: 'top' }); links.forEach((el) => gsap.set(el, { x: 0 })) },
      })
    }
  }, { dependencies: [menuOpen] })

  /* ONE search: routes + vault docs + tag rows in the same palette. Tag rows
   * carry an action (toggle tag mode) instead of an href. */
  const searchItems = useMemo(() => {
    const tags = buildTagCounts(TAG_INVENTORY).map(({ tag, count }) => ({
      id: `tag-${tag}`,
      label: tag,
      sectionLabel: 'Tags',
      keywords: [`${count} docs`],
      action: () => openTagMode(tag),
    }))
    return [...buildWorkshopSearchItems(), ...tags]
  }, [openTagMode])

  return (
    <>
      {/* DOUBLE GUTTER below lg (user 2026-09-02, phone review): the shell
        * frame pads the grid by --kol-pad-chrome-x (24, flat) and every page
        * inside is a `.kol-page` that pads AGAIN by --kol-pad-section-x (20 →
        * 32), so a 390 phone read 44 where the site sits at 20. The second pad
        * is the content's inset from the RAIL, and the rail only mounts at lg —
        * so below lg it insets from nothing. Zero it there; lg+ is untouched.
        * A wrapper, not a rule: ShellLayout is the DS's and this is the app's
        * adapter. DS-side this is a ShellLayout/PageSection fix. */}
      <div className="max-lg:[&_.kol-page]:px-0">
        <ShellLayout
          routes={WORKSHOP_ROUTES}
          basePath="/workshop"
          brand={<WorkshopBrand />}
          renderSidebar={({ onNavigate }) => <WorkshopSidebarStack onNavigate={onNavigate} />}
          defaultTocContent={<AutoToc />}
          searchItems={searchItems}
        />
      </div>
      {/* The site takeover, workshop entry: floating trigger bottom-right (the
        * shell's own chrome is untouched), z-50 so the same forms close over
        * the z-40 menu. Bare glyph, no chip — same idiom as the hamburger.
        * SAME BOX AS THE HAMBURGER (user 2026-09-02, phone review): Navbar's
        * button is `w-9 h-9` inside `px-4 md:px-6 lg:px-8 py-4`, so its X
        * centres 18px in from the padding on both axes. This one was
        * `right-6 w-12` — the open X sat 14px further in and 6px lower than the
        * site's. The ride still ends at top:16 (= the header's py-4). */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        className="fixed bottom-6 right-4 md:right-6 lg:right-8 z-50 w-9 h-9 inline-flex items-center justify-center text-emphasis"
      >
        <PlusX open={menuOpen} />
      </button>
      <TakeoverMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
