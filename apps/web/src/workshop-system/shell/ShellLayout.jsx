import { createContext, useState, useEffect, Suspense } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import WorkshopHeader from './WorkshopHeader.jsx'
import ShellSidebar from './ShellSidebar.jsx'
import { Button, ShellDrawer, ShellSearchOverlay, Tooltip } from '@kolkrabbi/kol-component'
import { Asset } from '@kolkrabbi/kol-brand/svg'

// Pages can register right-rail TOC content via this context.
// Usage: const setTocContent = useContext(ShellTocContext)
// useLayoutEffect(() => { setTocContent(<MyToc />) ; return () => setTocContent(null) }, [])
export const ShellTocContext = createContext(null)

// Pages that need to fill the viewport (e.g. iframe embeds) can opt into full-height mode.
// Usage: const setFullHeight = useContext(ShellFullHeightContext)
// useLayoutEffect(() => { setFullHeight(true) ; return () => setFullHeight(false) }, [setFullHeight])
export const ShellFullHeightContext = createContext(null)

// Pages can request the right sidebar to start collapsed.
// Usage: const setTocCollapsed = useContext(ShellTocCollapsedContext)
// useLayoutEffect(() => { setTocCollapsed(true) ; return () => setTocCollapsed(false) }, [setTocCollapsed])
export const ShellTocCollapsedContext = createContext(null)

const NavColumn = ({ children }) => (
  <aside aria-label="Navigation" className="shell-sidebar-sticky hidden lg:block shrink-0 h-full min-h-0 overflow-y-auto overscroll-none pt-6 md:pt-6 lg:pt-8 pb-8">
    {children}
  </aside>
)

const MainColumn = ({ children, fullHeight }) => (
  <main
    id="main"
    className={`w-full min-w-0 h-full min-h-0 ${fullHeight ? 'overflow-hidden flex flex-col' : 'overflow-y-auto overscroll-none'}`}
    style={fullHeight ? undefined : { scrollbarGutter: 'stable' }}
  >
    {fullHeight
      ? children
      : <div className="pt-6 md:pt-6 lg:pt-8 pb-16">{children}</div>
    }
  </main>
)

const TocColumn = ({ children }) => (
  <aside aria-label="Table of contents" className="shell-sidebar-sticky hidden lg:block shrink-0 h-full min-h-0 overflow-y-auto overscroll-none pt-6 md:pt-6 lg:pt-8 pb-8">
    {children}
  </aside>
)

const ShellLayout = ({ routes = [], basePath = '/', brandLogoSrc, brandLogoAlt = '', renderSidebar, searchItems, defaultTocContent }) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [tocCollapsed, setTocCollapsed] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [tocContent, setTocContent] = useState(null)
  const [isFullHeight, setIsFullHeight] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      } else if ((e.altKey) && e.key === 'b') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const effectiveTocContent = tocContent ?? defaultTocContent
  const hasToc = Boolean(effectiveTocContent)
  const showNav = !navCollapsed
  const showToc = hasToc && !tocCollapsed

  const layoutType = showNav && showToc ? 'nav-toc' : showNav ? 'nav' : showToc ? 'toc' : 'none'

  const gridCols = showNav
    ? showToc
      ? 'lg:grid-cols-[256px_minmax(0,1fr)] xl:grid-cols-[256px_minmax(0,1fr)_224px]'
      : 'lg:grid-cols-[256px_minmax(0,1fr)]'
    : showToc
      ? 'xl:grid-cols-[minmax(0,1fr)_224px]'
      : ''

  // Adapt the old flat `routes` + callbacks to the DS ShellHeader API
  // (brand node · nav[{label,href,icon}] · isActive · onNavigate · actions slot).
  const joinPath = (p) => `${basePath.replace(/\/$/, '')}/${String(p ?? '').replace(/^\//, '')}`
  const navItems = routes.map((r) => ({
    label: r.label,
    href: r.path ? joinPath(r.path) : basePath,
    icon: r.icon,
  }))
  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`)
  const handleNavigate = (event, item) => {
    if (item.href) {
      event.preventDefault()
      navigate(item.href)
    }
  }
  const brand = brandLogoSrc ? (
    <Link to={basePath} className="shell-header-logo flex items-center text-emphasis">
      <img src={brandLogoSrc} alt={brandLogoAlt} className="h-6 w-auto" />
    </Link>
  ) : (
    // Two separate wordmarks: KOLKRABBI holds the logo slot (reserves the 256px
    // nav column at lg+) and links to the SITE home; WORKSHOP falls at the
    // content-column edge and links to the workshop root. Both h-6.
    <>
      <Link to="/" className="shell-header-logo hidden md:flex shrink-0 items-center text-emphasis lg:w-64">
        <Asset name="kol-wordmark" title="Kolkrabbi" className="inline-flex [&>svg]:h-6 [&>svg]:w-auto" />
      </Link>
      <Link to={basePath} className="shell-header-logo flex items-center text-emphasis">
        <Asset name="wordmark-workshop" title="Workshop" className="inline-flex [&>svg]:h-6 [&>svg]:w-auto" />
      </Link>
    </>
  )
  const searchTrigger = (
    <Tooltip label="Search">
      <Button variant="ghost" quiet iconOnly="search" iconSize={18} onClick={() => setIsSearchOpen(true)} aria-label="Search" />
    </Tooltip>
  )

  return (
    <ShellTocContext.Provider value={setTocContent}>
      <ShellFullHeightContext.Provider value={setIsFullHeight}>
        <ShellTocCollapsedContext.Provider value={setTocCollapsed}>
        <div className="fixed inset-0 flex flex-col bg-surface-primary text-auto">
          <WorkshopHeader
            brand={brand}
            nav={navItems}
            isActive={isActive}
            onNavigate={handleNavigate}
            actions={searchTrigger}
            onMenuClick={() => {
              if (window.matchMedia('(min-width: 1024px)').matches) {
                setNavCollapsed((p) => !p)
                setTocCollapsed((p) => !p)
              } else {
                setIsNavDrawerOpen(true)
              }
            }}
            onNavToggle={() => setNavCollapsed((p) => !p)}
            onTocToggle={hasToc ? () => setTocCollapsed((p) => !p) : null}
            navCollapsed={navCollapsed}
            tocCollapsed={tocCollapsed}
          />

          {/* Three independent scroll regions: each rail scrolls its own overflow,
            * main scrolls unless a page locks it (ShellFullHeightContext — embeds).
            * overscroll-none stops chaining between regions and the edge bounce. */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full w-full px-4 md:px-5 lg:px-6">
              <div className={`shell-content-grid grid gap-8 ${gridCols} h-full min-h-0`} data-layout={layoutType}>
                  {showNav && (
                    <NavColumn>
                      {renderSidebar ? renderSidebar({}) : <ShellSidebar routes={routes} basePath={basePath} />}
                    </NavColumn>
                  )}

                  <MainColumn fullHeight={isFullHeight}>
                    <div className={isFullHeight ? 'flex flex-col flex-1 min-h-0 [&>*]:flex-1 [&>*]:flex [&>*]:flex-col [&>*]:min-h-0' : ''}>
                      <Suspense fallback={<div className="flex items-center justify-center p-12 text-fg-48">Loading…</div>}>
                        <Outlet />
                      </Suspense>
                    </div>
                  </MainColumn>

                  {showToc && (
                    <TocColumn>
                      {effectiveTocContent}
                    </TocColumn>
                  )}
                </div>
              </div>
            </div>

          <ShellDrawer
            isOpen={isNavDrawerOpen}
            onClose={() => setIsNavDrawerOpen(false)}
          >
            {renderSidebar
              ? renderSidebar({ onNavigate: () => setIsNavDrawerOpen(false) })
              : <ShellSidebar routes={routes} basePath={basePath} onNavigate={() => setIsNavDrawerOpen(false)} />
            }
          </ShellDrawer>

          <ShellSearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            routes={routes}
            basePath={basePath}
            items={searchItems}
          />
        </div>
        </ShellTocCollapsedContext.Provider>
      </ShellFullHeightContext.Provider>
    </ShellTocContext.Provider>
  )
}

export default ShellLayout
