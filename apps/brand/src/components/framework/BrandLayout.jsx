import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SideNav } from '@kolkrabbi/kol-framework'
import { Icon } from '@kolkrabbi/kol-icons'
import { ModalProvider } from '@kolkrabbi/kol-component'
import { NAV_TREE } from './sidebars.config'
import useEmbed from './useEmbed.js'

/* One-time purge (2026-08-09). Every `kol-sidenav: collapsed` the pre-grab
 * builds stored was written by their own collapsed-by-default boot, not by a
 * user gesture — clear it once so nobody inherits a phantom rail. The package
 * hook persists REAL drags/toggles under the same key from here on. */
try {
  if (!localStorage.getItem('kol-sidenav-v2')) {
    localStorage.removeItem('kol-sidenav')
    localStorage.setItem('kol-sidenav-v2', '1')
  }
} catch { /* storage blocked */ }

export default function BrandLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()
  const embedded = useEmbed()

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  /* ?embed=1 — main content only, for iframing brand pages into the website's
     workshop. No `.kol-brand-layout` grid either: the class reserves the
     sidenav rail, and embed drops chrome by absence, not by hiding. */
  if (embedded) {
    return (
      <ModalProvider>
        <div className="bg-oq-04 min-h-dvh min-w-0">
          <Outlet />
        </div>
      </ModalProvider>
    )
  }

  return (
    <ModalProvider>
      {/* TWO surfaces, not one (2026-08-01 ruling: "we already decided sidebar
          vs. main color"). This is the MAIN surface — `bg-oq-04`, an opaque
          tier, which is the position `Library.jsx` argued in its own comment
          ("Page surface = an OPAQUE tier, never an fg alpha").

          The SIDEBAR keeps its own fg-02 plane: the package SideNav (0.15.1)
          renders chromeless via `background={false}` and takes no className,
          so the fill lives in `styles/sidenav-collapse.css`. Pages still
          declare none. */}
      <div className="kol-brand-layout bg-oq-04 min-h-dvh" data-drawer-open={drawerOpen ? 'true' : undefined}>
        <button
          type="button"
          className="kol-sidenav-hamburger md:hidden fixed top-3 left-3 z-30 w-10 h-10 inline-flex items-center justify-center rounded-full bg-surface-primary border border-fg-08 text-emphasis"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <Icon name={drawerOpen ? 'x' : 'hamburger'} size={18} />
        </button>

        <div
          className="kol-sidenav-backdrop fixed inset-0 z-20 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-200 md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />

        <SideNav drawerOpen={drawerOpen} navTree={NAV_TREE} background={false} />
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </ModalProvider>
  )
}
