import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon } from '@kolkrabbi/kol-icons'
import { ThemeToggle } from '@kolkrabbi/kol-framework'
import { useScrollSpy, Button, Tooltip } from '@kolkrabbi/kol-component'
import { KolLogo } from '../../brand/logos'
import { NAV_TREE, getActivePage } from './sidebars.config'

/* Walk the active page's children and return all leaf section ids (for scroll-spy). */
function collectSectionIds(node) {
  if (!node?.children) return []
  const ids = []
  const walk = (children) => {
    for (const c of children) {
      if (c.id && !c.to) ids.push(c.id)
      if (c.children) walk(c.children)
    }
  }
  walk(node.children)
  return ids
}

const linkBase = 'kol-sidenav-link kol-helper-10 block relative py-[4px] no-underline transition-colors duration-150'
const linkCls = `${linkBase} text-body hover:text-emphasis`
const linkActiveCls = `${linkBase} is-active`

/* Walk the children tree; return true if any leaf matches activeSectionId. */
function hasActiveDescendant(children, activeSectionId) {
  if (!activeSectionId) return false
  for (const c of children ?? []) {
    if (c.id === activeSectionId) return true
    if (c.children && hasActiveDescendant(c.children, activeSectionId)) return true
  }
  return false
}

const leafStyle = (indent) => ({
  paddingLeft: indent,
  '--kol-sidenav-dot-left': `${indent - 14}px`,
})

function SectionLeaf({ leaf, basePath, isActive, indent }) {
  return (
    <li>
      <Link
        to={`${basePath}#${leaf.id}`}
        className={isActive ? linkActiveCls : linkCls}
        style={leafStyle(indent)}
      >
        {leaf.label}
      </Link>
    </li>
  )
}

function RouteLeaf({ leaf, indent }) {
  return (
    <li>
      <NavLink
        to={leaf.to}
        end
        className={({ isActive }) => (isActive ? linkActiveCls : linkCls)}
        style={leafStyle(indent)}
      >
        {leaf.label}
      </NavLink>
    </li>
  )
}

function GroupNode({ group, basePath, activeSectionId, indent }) {
  const isAncestor = hasActiveDescendant(group.children, activeSectionId)
  return (
    <li>
      <div
        className={`kol-sidenav-group kol-helper-10 ${isAncestor ? 'text-emphasis' : 'text-subtle'}`}
        style={{ paddingLeft: indent }}
      >
        {group.label}
      </div>
      <ul className="kol-sidenav-list">
        {group.children.map((child, i) => (
          <ChildNode
            key={child.id ?? child.to ?? `g-${i}`}
            child={child}
            basePath={basePath}
            activeSectionId={activeSectionId}
            indent={indent + 12}
          />
        ))}
      </ul>
    </li>
  )
}

function ChildNode({ child, basePath, activeSectionId, indent }) {
  if (child.children) {
    return <GroupNode group={child} basePath={basePath} activeSectionId={activeSectionId} indent={indent} />
  }
  if (child.to) {
    return <RouteLeaf leaf={child} indent={indent} />
  }
  if (child.id) {
    return (
      <SectionLeaf
        leaf={child}
        basePath={basePath}
        isActive={activeSectionId === child.id}
        indent={indent}
      />
    )
  }
  return null
}

export default function SideNav({ drawerOpen = false, onCloseDrawer }) {
  const { pathname } = useLocation()
  const activePage = getActivePage(pathname)
  /* PARKED 2026-08-01, not dead. Section anchors left NAV_TREE for
   * `SECTION_ANCHORS` (sidebars.config.js), so `sectionIds` is empty and
   * scroll-spy is a no-op — every remaining child is a route, handled by
   * `RouteLeaf`. `collectSectionIds` / `SectionLeaf` / `hasActiveDescendant`
   * stay for the same reason: paste an anchor array back onto a page row and
   * the whole layer works again with no other edit. */
  const sectionIds = activePage ? collectSectionIds(activePage) : []
  const onPageRoot = activePage && pathname === activePage.to
  const activeSectionId = useScrollSpy(onPageRoot ? sectionIds : [])

  /* Manual rail collapse. Stamps `data-sidenav="collapsed"` on the root — the
   * contract the rail CSS keys off. Preference persists across navigation;
   * the ≤1024px media rail overrides it while the viewport is narrow. */
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('kol-sidenav') === 'collapsed' } catch { return false }
  })

  /* Which page trees are expanded. INDEPENDENT per page (user ruling
   * 2026-08-01) — the tree used to render only under the active page, so
   * arriving somewhere silently closed wherever you were and two could never
   * be open at once. The active page seeds itself open on navigation but is
   * never force-closed, and the set persists like the collapse preference. */
  const [openPages, setOpenPages] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('kol-sidenav-open') || 'null')
      if (Array.isArray(saved)) return new Set(saved)
    } catch { /* storage blocked or malformed */ }
    return new Set()
  })

  useEffect(() => {
    if (!activePage?.id) return
    setOpenPages((prev) => (prev.has(activePage.id) ? prev : new Set(prev).add(activePage.id)))
  }, [activePage?.id])

  useEffect(() => {
    try { localStorage.setItem('kol-sidenav-open', JSON.stringify([...openPages])) } catch { /* storage blocked */ }
  }, [openPages])

  const togglePage = (id) => setOpenPages((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  useEffect(() => {
    const root = document.documentElement
    if (collapsed) root.setAttribute('data-sidenav', 'collapsed')
    else root.removeAttribute('data-sidenav')
    try { localStorage.setItem('kol-sidenav', collapsed ? 'collapsed' : 'expanded') } catch { /* storage blocked */ }
  }, [collapsed])

  return (
    <aside
      /* No background of its own — the shell's single surface now comes from
         BrandLayout (2026-08-01 ruling: one bg, set high, pages declare none).
         The sidebar's own `bg-fg-02` was the second of the two declarations
         that ruling removes; it separates from the content by position and the
         collapsed rail's own rules, not by a second tint. */
      className={`kol-sidenav sticky top-0 self-start h-dvh flex flex-col z-20${collapsed ? ' is-collapsed' : ''}${drawerOpen ? ' is-drawer-open' : ''}`}
    >
      {/* A/B RESOLVED 2026-08-01 — the Button won, the IconFrame-in-a-bare-button
          was dropped. Once component 0.20.0 hoisted both glyph ladders into one
          module the two rendered identically (16 in a 28 square, measured), so
          size stopped being the differentiator and the pick came down to STATES:
          this is a click target, and IconFrame ships hover/active/focus-less BY
          DESIGN — that is the whole point of the atom. A collapse toggle with no
          hover feedback and no focus ring is an affordance and a11y failure.
          `radius="full"` shipped in the same wave, so the round shape survives on
          one element instead of a button wrapping a frame. Its own colour override
          went with it: a Button variant already pairs fill and ink, which is
          exactly what the bare span could not do. Brief: ButtonIconOnlyParity. */}
      <Button
        variant="primary"
        size="sm"
        radius="full"
        iconOnly={collapsed ? 'chevron-right' : 'chevron-left'}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
        title={collapsed ? 'Expand' : 'Collapse'}
        onClick={() => setCollapsed((v) => !v)}
        /* Offset is half the pinned sm square so it sits centred on the sidebar's
           right edge. The DS hardcodes that square in kol-components-atoms.css and
           exposes no token for it, so the half stays a literal. */
        className="kol-sidenav-toggle absolute top-5 right-[-14px] z-[2]"
      />

      <div className="kol-sidenav-scroll flex-1 flex flex-col justify-between overflow-y-auto pt-4 pb-4 [scrollbar-width:thin]">
        <nav aria-label="Sections">
        <ul className="kol-sidenav-tree flex flex-col gap-[2px]">
          {NAV_TREE.map((page) => {
            const isOpen = openPages.has(page.id)
            /* Home wears the lockup instead of a glyph + text label. Rendered
               through KolLogo (svgr, currentColor intact) so it inherits the row
               colour like every other hop rather than carrying its own paint.
               `aria-label` keeps the row named once the text is gone. */
            const isHome = page.id === 'home'
            const hop = (
              <NavLink
                to={page.to}
                end={page.to === '/'}
                aria-label={isHome ? page.label : undefined}
                className={({ isActive }) =>
                  `kol-sidenav-hop kol-helper-12 relative flex items-center gap-3 py-2 pr-10 pl-6 no-underline${isActive ? ' is-active' : ''}`
                }
              >
                {isHome ? (
                  /* The horizontal lockup can't fit the collapsed rail — it
                     overflows where a glyph would sit, so the rail takes the
                     square logomark instead. Same component, same currentColor
                     inheritance; only the variant swaps. */
                  <span className="kol-sidenav-hop-lockup flex-1 min-w-0 inline-flex items-center" aria-hidden="true">
                    <KolLogo variant={collapsed ? 'logomark' : 'lockup-hori'} height={collapsed ? 20 : 16} />
                  </span>
                ) : (
                  <>
                    <span className="kol-sidenav-hop-icon inline-flex items-center justify-center w-5 h-5 shrink-0" aria-hidden="true">
                      <Icon name={page.icon} size={16} />
                    </span>
                    <span className="kol-sidenav-hop-label flex-1 min-w-0">{page.label}</span>
                  </>
                )}
              </NavLink>
            )
            return (
              <li key={page.id} className="relative">
                {/* Collapsed rail hides `.kol-sidenav-hop-label`, so the row is a
                    bare glyph — the tooltip is the only thing naming it. DS
                    `Tooltip` (kol-component, floating-ui): hover + focus, portalled
                    so the rail's overflow can't clip it. Expanded rows carry their
                    own visible label and get none. */}
                {collapsed ? (
                  <Tooltip label={page.label} placement="right" triggerClassName="block">
                    {hop}
                  </Tooltip>
                ) : hop}

                {/* Sits in the gutter the hop row already reserves with `pr-10`.
                    A sibling of the NavLink, never a child — a button inside a
                    link is a nested interactive. `.kol-sidenav-section-toggle`
                    is the package's own hook: it carries no look, only the
                    rail/drawer visibility rules, so the geometry is inline. */}
                {page.children && (
                  <button
                    type="button"
                    className="kol-sidenav-section-toggle absolute top-2 right-3 w-6 h-6 inline-flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer text-meta hover:text-emphasis transition-colors"
                    aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${page.label} sections`}
                    aria-expanded={isOpen}
                    onClick={() => togglePage(page.id)}
                  >
                    <Icon
                      name="chevron-down"
                      size={12}
                      className={`transition-transform duration-150${isOpen ? '' : ' -rotate-90'}`}
                    />
                  </button>
                )}

                {page.children && isOpen && (
                  <ul className="kol-sidenav-list mb-2 flex flex-col gap-2">
                    {page.children.map((child, i) => (
                      <ChildNode
                        key={child.id ?? child.to ?? `g-${i}`}
                        child={child}
                        basePath={page.to}
                        activeSectionId={activeSectionId}
                        indent={56}
                      />
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
        </nav>

        {/* hop-bare carries its own px-6, matching the sidenav's 24px gutter —
            that's what the alias exists for, so the slot adds no padding of its
            own. Collapsed falls back to `icon`: a full-width label can't sit in
            the 56px rail. */}
        <div className="kol-sidenav-theme-slot flex">
          <ThemeToggle variant={collapsed ? 'icon' : 'hop-bare'} size="md" />
        </div>
      </div>

      <div className="kol-sidenav-footer flex items-center pl-6 pr-4 h-14 border-t border-fg-08 min-w-0">
        <a
          href="https://kolkrabbi.io"
          target="_blank"
          rel="noopener"
          className="kol-helper-10 !font-normal no-underline group whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
        >
          {/* Collapsed rail shows the initial alone; the full wordmark overflows it.
              Both live inside the same <a> so the link survives either state. */}
          <span className="kol-sidenav-footer-mark text-body group-hover:text-emphasis">K</span>
          <span className="kol-sidenav-footer-full">
            <span className="text-body group-hover:text-emphasis">Kolkrabbi Vinnustofa</span>
            <span className="text-meta group-hover:text-emphasis"> · {new Date().getFullYear()}</span>
          </span>
        </a>
      </div>
    </aside>
  )
}
