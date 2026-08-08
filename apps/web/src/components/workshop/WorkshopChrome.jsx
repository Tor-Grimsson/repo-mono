import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShellLayout, ShellSidebar, RightRail, buildTagCounts, useTagMode, TagPath } from '@kolkrabbi/kol-workshop'
import { Asset } from '@kolkrabbi/kol-brand/svg'
import { useScrollSpy } from '@kolkrabbi/kol-component'
import { Icon } from '@kolkrabbi/kol-icons'
import { WORKSHOP_ROUTES, buildWorkshopSearchItems } from '../../data/workshop/navigation.js'
import { VAULT_CATEGORIES, TAG_INVENTORY } from '../../data/workshop/vault.js'
import { labelFromSlug } from '../../data/workshop/labels.js'

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

export default function WorkshopChrome() {
  const { openTagMode } = useTagMode()

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
    <ShellLayout
      routes={WORKSHOP_ROUTES}
      basePath="/workshop"
      brand={<WorkshopBrand />}
      renderSidebar={({ onNavigate }) => <WorkshopSidebarStack onNavigate={onNavigate} />}
      defaultTocContent={<AutoToc />}
      searchItems={searchItems}
    />
  )
}
