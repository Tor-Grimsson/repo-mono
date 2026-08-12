import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tooltip } from '@kolkrabbi/kol-component'
import { Asset } from '@kolkrabbi/kol-brand/svg'
import { WorkViewToggle as KolWorkViewToggle } from '@kolkrabbi/kol-content'
import { useWorkView } from '../../context/WorkViewContext'
import TakeoverMenu from './TakeoverMenu'

/**
 * Navbar — ONE top bar, one structure, every route and every breakpoint.
 *
 * Wordmark left; tools slot, theme toggle and menu button right. All nav lives
 * behind the menu button, so there is no desktop link row and no mega-dropdown
 * (2026-08-12: the site was serving four different top bars — a link row, a
 * work-only 8-column grid with no links at all, the workshop shell header, and
 * nothing on four orphan routes).
 *
 * The tools slot is opt-in per route via TOOLS_ROUTES — page-local controls sit
 * next to the theme toggle instead of replacing the navigation.
 */

function WorkViewToggle() {
  const { viewMode, setViewMode, searchQuery, setSearchQuery } = useWorkView()

  return (
    <KolWorkViewToggle
      view={viewMode}
      onView={setViewMode}
      query={searchQuery}
      onQuery={setSearchQuery}
      listIcon="view-list"
    />
  )
}

/* Routes whose page-local control rides the navbar's tools slot.
 *
 * /stack, /prints and /foundry each already render their own view toggle and
 * search inside ContentFilters further down the page, so listing them here
 * would put two of the same control on one screen. They join once those move
 * up — one line each. */
const TOOLS_ROUTES = ['/work']

const tokens = {
  surface: 'var(--kol-surface-primary)',
  onSurface: 'var(--kol-surface-on-primary)'
}

/* The three animated bars of the menu button. */
const MenuBars = ({ open }) => (
  <>
    <span
      className="block h-0.5 w-8 transition-all duration-300"
      style={{
        backgroundColor: tokens.onSurface,
        transform: open ? 'translateY(8px) rotate(45deg)' : 'none',
      }}
    />
    <span
      className="block h-0.5 w-8 transition-all duration-300"
      style={{
        backgroundColor: tokens.onSurface,
        opacity: open ? 0 : 1,
      }}
    />
    <span
      className="block h-0.5 w-8 transition-all duration-300"
      style={{
        backgroundColor: tokens.onSurface,
        transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none',
      }}
    />
  </>
)

const Navbar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const showTools = TOOLS_ROUTES.some(
    (route) => location.pathname === route || location.pathname.startsWith(`${route}/`)
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const viewportMiddle = window.innerHeight / 2

      if (currentScrollY < viewportMiddle) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > viewportMiddle) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: 'transform 300ms ease-in-out, opacity 300ms ease',
          /* Transparent while the takeover is open — an opaque primary strip
           * across a tertiary field reads as a seam. */
          backgroundColor: isMobileMenuOpen ? 'transparent' : 'var(--kol-surface-primary)',
          opacity: isHovered || isMobileMenuOpen || lastScrollY < window.innerHeight ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          color: tokens.onSurface
        }}
      >
        <div className="w-full px-4 py-4 md:px-6 lg:px-8">
          {/* 8-column grid at lg+, the geometry the /work bar already had: the
            * wordmark opens column 1, page tools sit at the end of column 7,
            * the global controls own column 8. A flex row with a margin does
            * NOT reproduce this — the tools land ~190px too far right at
            * desktop width. Below lg it collapses to a plain flex row. */}
          <div className="flex items-center justify-between lg:grid lg:grid-cols-8 lg:gap-0">
            {/* The takeover carries the big logomark top-left, so the small
              * wordmark yields while it's open — invisible but still in the
              * grid, keeping columns 7/8 from shifting. */}
            <Link
              to="/"
              className={`mt-[2px] flex items-center transition-opacity hover:opacity-80 lg:col-start-1 ${isMobileMenuOpen ? 'invisible' : ''}`}
              style={{ color: 'inherit' }}
            >
              <Asset name="kol-wordmark" title="Kolkrabbi wordmark" className="inline-flex [&>svg]:h-6 [&>svg]:w-auto" />
            </Link>

            {showTools && !isMobileMenuOpen && (
              <div className="lg:col-start-7 lg:flex lg:justify-end">
                <WorkViewToggle />
              </div>
            )}

            {/* Theme toggle lives inside the takeover, not here — the bar is
              * wordmark · tools · menu button, nothing else. */}
            <div className="flex items-center lg:col-start-8 lg:justify-end">
              <Tooltip label="Toggle menu" triggerClassName="shrink-0 inline-flex">
              <button
                className="z-50 w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <MenuBars open={isMobileMenuOpen} />
              </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>

      {/* The open menu is a full-bleed opaque takeover (ref. roscoproduction.com):
        * big logomark top-left, studio line + instagram + theme toggle
        * bottom-left, nav links bottom-right. The X stays in the z-50 header. */}
      <TakeoverMenu open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

    </>
  )
}

export default Navbar
