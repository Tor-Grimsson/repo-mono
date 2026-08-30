import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SideNav } from '@kolkrabbi/kol-framework'
import { Icon } from '@kolkrabbi/kol-icons'
import { ModalProvider } from '@kolkrabbi/kol-component'
import { NAV_TREE } from './sidebars.config'
import useEmbed from './useEmbed.js'
import useScrollSpy from '../hooks/useScrollSpy'

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

/**
 * @param {string} pageWash  the page plane's wash over the primary back — the SAME
 *   prop and variable as kol-shell's `AppShell` (`--kol-shell-page-wash`; there
 *   `PageShell` paints it, here the plane does), so a brand page and a monitor /
 *   mirror / fxr page step their lightness with one name (user 2026-08-27: "at
 *   least it's prefixed the same"). A translucent `fg-*` over `surface-primary`,
 *   never an opaque surface swap — the swap hides the structure. Unset = the
 *   plane IS the back, exactly as AppShell defaults.
 */
export default function BrandLayout({ pageWash }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()
  /* the plane paints the wash; the var lives on the plane so any child that
     reads it (a future PageShell) resolves the same value */
  /* Home is the image page — the hero owns its ground, no wash (user 2026-08-27) */
  const plane = {
    '--kol-shell-page-wash': pathname === '/' ? undefined : pageWash,
    background: 'var(--kol-shell-page-wash, var(--kol-surface-primary))',
  }
  const embedded = useEmbed()

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  /* Section categories (Brand, Assets): every sidebar row whose `to` is a hash
     on the current path is an anchor on this page — spy them so the row lights
     as you scroll. Bare-route rows (Overview, and every page in the tool
     categories) light when no section is in view. */
  const sectionIds = NAV_TREE.flatMap((c) => c.pages ?? [])
    .map((p) => p.to.split('#'))
    .filter(([path, hash]) => path === pathname && hash)
    .map(([, hash]) => hash)
  const activeId = useScrollSpy(sectionIds)
  const isActive = (to) => {
    const [path, hash] = to.split('#')
    return path === pathname && (hash ? hash === activeId : !activeId)
  }

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
        <div className="min-h-dvh min-w-0" style={plane}>
          <Outlet />
        </div>
      </ModalProvider>
    )
  }

  return (
    <ModalProvider>
      {/* TWO surfaces, not one (2026-08-01 ruling: "we already decided sidebar
          vs. main color"). The BACK is `surface-primary`; the MAIN plane is
          the `pageWash` over it (2026-08-27 — AppShell's model; was an opaque
          `surface-tertiary` swap, ruled 2026-08-24, before that `oq-04`).

          The SIDEBAR sits on the back — `surface-primary` (user ruling
          2026-08-24, was fg-02): the package SideNav renders chromeless via
          `background={false}` and takes no className, so the fill lives in
          `styles/sidenav-collapse.css`. Pages still declare none. */}
      <div className="kol-brand-layout bg-surface-primary min-h-dvh" data-drawer-open={drawerOpen ? 'true' : undefined}>
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

        <SideNav drawerOpen={drawerOpen} onCloseDrawer={() => setDrawerOpen(false)} navTree={NAV_TREE} isActive={isActive} background={false} />
        <div className="min-w-0" style={plane}>
          <Outlet />
        </div>
      </div>
    </ModalProvider>
  )
}
