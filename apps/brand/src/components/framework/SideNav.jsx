import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from '@kolkrabbi/kol-icons'
import { ThemeToggle } from '@kolkrabbi/kol-framework'
import { Button, Tooltip } from '@kolkrabbi/kol-component'
import { NAV_TREE, getActiveCategory } from './sidebars.config'

/* TWO LEVELS ONLY (2026-08-01). A category is a grouping LABEL — no route, not
 * clickable. A page is a route. The `#anchor` section layer that used to sit
 * under a page is gone, and with it `collectSectionIds`, `useScrollSpy`,
 * `hasActiveDescendant`, `SectionLeaf`, `GroupNode` and `ChildNode`. Each former
 * section is its own page now, so there is nothing left to scroll-spy. */

const pageBase =
  'kol-sidenav-link kol-helper-10 block relative py-[4px] pl-14 pr-6 no-underline transition-colors duration-150'

/* The active-dot is a DS pseudo-element positioned by `--kol-sidenav-dot-left`
 * (kol-components-atoms.css:716). Without the var it falls back to `left: 2px`
 * — the rail's outer edge, nowhere near the label it marks. The page row indents
 * 56px, so the dot sits 14px inside that, in the gutter the icon column leaves. */
const PAGE_INDENT = 56
const pageStyle = { '--kol-sidenav-dot-left': `${PAGE_INDENT - 14}px` }
/* CATEGORY AND PAGE MUST NOT SHARE A STOP. Category takes `emphasis` (100%),
 * page takes `strong` (80%) — two rungs of the same ladder, so the tree reads as
 * a hierarchy rather than a wall. Both earlier versions were wrong in opposite
 * directions: pages sat on `text-body` (fg-64) and read as a grey wash ("why is
 * everything so muted!!! it cant all be just fg-64"), then at fg-80 they tied
 * with the category row ("why is it the same color"). Ladder: kol-opacity.css. */
const pageCls = `${pageBase} text-strong hover:text-emphasis`
const pageActiveCls = `${pageBase} is-active`

export default function SideNav({ drawerOpen = false, onCloseDrawer }) {
  const { pathname } = useLocation()
  const activeCategory = getActiveCategory(pathname)
  /* A category is active when the current route is one of its pages. It never
     matches by prefix on its own — it has no route to match with. */
  const isActiveCat = (cat) => cat.id === activeCategory?.id

  /* Manual rail collapse. Stamps `data-sidenav="collapsed"` on the root — the
   * contract the rail CSS keys off. The ≤1024px media rail overrides it while
   * the viewport is narrow.
   *
   * LOADS EXPANDED, ALWAYS (2026-08-09 — reverses the 08-01 "load the sidebar
   * collapsed" ruling). In-memory only, the same contract as the disclosure
   * set below: collapse survives navigation but never a reload. The old
   * `kol-sidenav` localStorage key is dead on purpose — a stale stored
   * `collapsed` must not veto the load state. */
  const [collapsed, setCollapsed] = useState(false)

  /* Which categories are expanded. INDEPENDENT per category (user ruling
   * 2026-08-01) — arriving somewhere must not silently close wherever you were,
   * and two can be open at once.
   *
   * LOADS CLOSED, ALWAYS (2026-08-06: "page loads with three expanded when it
   * should load collapsed"). In-memory only — disclosure survives navigation
   * (the layout keeps this mounted) but never a reload. An earlier version
   * persisted the set to localStorage; that made "load collapsed" untrue the
   * moment anything had ever been opened. */
  const [openPages, setOpenPages] = useState(() => new Set())

  const togglePage = (id) => setOpenPages((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  useEffect(() => {
    const root = document.documentElement
    if (collapsed) root.setAttribute('data-sidenav', 'collapsed')
    else root.removeAttribute('data-sidenav')
  }, [collapsed])

  return (
    <aside
      /* `bg-fg-02` — the SIDEBAR surface, and it is deliberately not the main
         one. BrandLayout carries `bg-oq-04` for the content plane; these two
         reading as different planes is the point (2026-08-01: "we already
         decided sidebar vs. main color").

         An earlier pass hoisted a single background to the layout and stripped
         this line, on the reasoning that one shell = one surface. That was the
         wrong trade: it left the rail and the page as one undifferentiated
         field. PAGES still declare no background — only these two do. */
      className={`kol-sidenav bg-fg-02 sticky top-0 self-start h-dvh flex flex-col z-20${collapsed ? ' is-collapsed' : ''}${drawerOpen ? ' is-drawer-open' : ''}`}
    >
      {/* A/B CLOSED 2026-08-01 by the user — "remove the icon keepo nbutton".
          The IconFrame control and its bare wrapping <button> are gone; the DS
          Button is the collapse control. It carries the state machine the frame
          deliberately lacks, which is the right property for a click target.

          Offset is half the pinned sm square so it sits centred on the sidebar's
          right edge — the DS hardcodes that square in kol-components-atoms.css and
          exposes no token for it, so the half stays a literal. */}
      <Button
        variant="primary"
        size="sm"
        radius="full"
        iconOnly={collapsed ? 'chevron-right' : 'chevron-left'}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
        title={collapsed ? 'Expand' : 'Collapse'}
        onClick={() => setCollapsed((v) => !v)}
        className="kol-sidenav-toggle absolute top-5 right-[-14px] z-[2]"
      />

      <div className="kol-sidenav-scroll flex-1 flex flex-col justify-between overflow-y-auto pt-4 pb-4 [scrollbar-width:thin]">
        <nav aria-label="Sections">
        <ul className="kol-sidenav-tree flex flex-col gap-[2px]">
          {NAV_TREE.map((cat) => {
            const isOpen = openPages.has(cat.id)
            const isLink = !cat.pages?.length && cat.to
            const rowCls = `kol-sidenav-hop kol-helper-12 text-emphasis w-full relative flex items-center gap-3 py-2 pr-10 pl-6 no-underline`
            const glyph = (
              <span className="kol-sidenav-hop-icon inline-flex items-center justify-center w-5 h-5 shrink-0" aria-hidden="true">
                <Icon name={cat.icon} size={16} />
              </span>
            )
            /* A category is a <button>, not a link — it has no route by
               definition, and an <a href> would promise a page that does not
               exist. Clicking it discloses its pages.

               THE ONE EXCEPTION is a category with `to` and no `pages` (Home):
               it has nothing to disclose, so a button would be a control that
               does nothing and a caret would point at an empty list. */
            const head = isLink ? (
              <NavLink
                to={cat.to}
                end
                className={({ isActive }) => `${rowCls}${isActive ? ' is-active' : ''}`}
              >
                {glyph}
                <span className="kol-sidenav-hop-label flex-1 min-w-0">{cat.label}</span>
              </NavLink>
            ) : (
              <button
                type="button"
                className={`${rowCls} bg-transparent border-0 cursor-pointer text-left${isActiveCat(cat) ? ' is-active' : ''}`}
                aria-expanded={isOpen}
                onClick={() => togglePage(cat.id)}
              >
                {glyph}
                <span className="kol-sidenav-hop-label flex-1 min-w-0">{cat.label}</span>
                <Icon
                  name="chevron-down"
                  size={12}
                  className={`kol-sidenav-hop-caret absolute top-3 right-3 transition-transform duration-150${isOpen ? '' : ' -rotate-90'}`}
                />
              </button>
            )
            return (
              <li key={cat.id} className="relative">
                {/* Collapsed rail hides `.kol-sidenav-hop-label`, so the row is a
                    bare glyph — the tooltip is the only thing naming it. DS
                    `Tooltip` (kol-component, floating-ui): hover + focus,
                    portalled so the rail's overflow can't clip it. */}
                {collapsed ? (
                  <Tooltip label={cat.label} placement="right" triggerClassName="block">
                    {head}
                  </Tooltip>
                ) : head}

                {!isLink && isOpen && (
                  <ul className="kol-sidenav-list mb-2 flex flex-col gap-[2px]">
                    {cat.pages.map((page) => (
                      <li key={page.to}>
                        <NavLink
                          to={page.to}
                          end
                          style={pageStyle}
                          className={({ isActive }) => (isActive ? pageActiveCls : pageCls)}
                        >
                          {page.label}
                        </NavLink>
                      </li>
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
