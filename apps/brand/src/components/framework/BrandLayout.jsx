import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideNav from '../framework/SideNav'
import { Icon } from '@kolkrabbi/kol-icons'
import { ModalProvider } from '@kolkrabbi/kol-component'

export default function BrandLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  return (
    <ModalProvider>
      {/* TWO surfaces, not one (2026-08-01 ruling: "we already decided sidebar
          vs. main color"). This is the MAIN surface — `bg-oq-04`, an opaque
          tier, which is the position `Library.jsx` argued in its own comment
          ("Page surface = an OPAQUE tier, never an fg alpha").

          The SIDEBAR carries its own `bg-fg-02` in `SideNav.jsx` — the user's
          pick, and the whole point is that the two read as different planes.
          An earlier pass hoisted ONE background here and stripped the sidebar's,
          which flattened them into a single field. Pages still declare none. */}
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

        <SideNav drawerOpen={drawerOpen} onCloseDrawer={() => setDrawerOpen(false)} />
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </ModalProvider>
  )
}
