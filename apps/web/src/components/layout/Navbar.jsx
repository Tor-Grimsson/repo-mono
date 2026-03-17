import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme, Icon } from '@kol/ui'
import { KolWordmark as Wordmark } from '@kol/ui'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'
import { useWorkView } from '../../context/WorkViewContext'

const CUBIC_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function WorkViewToggle() {
  const { viewMode, setViewMode, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useWorkView()
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
    if (!isSearchOpen) setSearchQuery('')
  }, [isSearchOpen, setSearchQuery])

  return (
    <div className="flex items-center">
      {/* Close button — appears when search is open */}
      <span
        className="inline-flex overflow-hidden flex-shrink-0"
        style={{
          width: isSearchOpen ? 36 : 0,
          marginRight: isSearchOpen ? 12 : 0,
          opacity: isSearchOpen ? 1 : 0,
          transition: `width 600ms ${CUBIC_EASE}, margin 600ms ${CUBIC_EASE}, opacity 300ms ${CUBIC_EASE}`,
        }}
      >
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-fg-96 transition-colors hover:bg-fg-88"
          style={{ color: 'var(--kol-surface-primary)' }}
          onClick={() => setIsSearchOpen(false)}
          aria-label="Close search"
        >
          <Icon name="cross" size={20} />
        </button>
      </span>

      {/* Toggle — collapses when search is open */}
      <div
        className="relative flex items-center rounded-full bg-fg-04 h-9 overflow-hidden"
        style={{
          width: isSearchOpen ? 0 : 176,
          marginRight: isSearchOpen ? 0 : 12,
          opacity: isSearchOpen ? 0 : 1,
          transition: `width 600ms ${CUBIC_EASE}, margin 600ms ${CUBIC_EASE}, opacity 300ms ${CUBIC_EASE}`,
        }}
      >
        <div
          className="absolute top-0 h-9 rounded-full bg-fg-96"
          style={{
            width: 96,
            left: viewMode === 'shelf' ? 0 : 80,
            transition: 'left 600ms cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
        />

        <button
          type="button"
          className="relative z-10 flex items-center justify-center rounded-full h-9 kol-helper-s transition-colors duration-300"
          style={{
            width: 96,
            letterSpacing: 0,
            color: viewMode === 'shelf' ? 'var(--kol-surface-primary)' : 'color-mix(in srgb, var(--kol-surface-on-primary) 80%, transparent)',
            paddingRight: viewMode === 'shelf' ? undefined : 8,
          }}
          onClick={() => setViewMode('shelf')}
          aria-pressed={viewMode === 'shelf'}
        >
          <span
            className="inline-flex overflow-hidden flex-shrink-0"
            style={{
              width: viewMode === 'shelf' ? 20 : 0,
              marginRight: viewMode === 'shelf' ? 8 : 0,
              opacity: viewMode === 'shelf' ? 1 : 0,
              transition: `width 600ms ${CUBIC_EASE}, margin 600ms ${CUBIC_EASE}, opacity 300ms ${CUBIC_EASE}`,
            }}
          >
            <Icon name="library" size={20} />
          </span>
          Shelf
        </button>
        <button
          type="button"
          className="relative z-10 flex items-center justify-center rounded-full h-9 -ml-4 kol-helper-s transition-colors duration-300"
          style={{
            width: 96,
            letterSpacing: 0,
            color: viewMode === 'list' ? 'var(--kol-surface-primary)' : 'color-mix(in srgb, var(--kol-surface-on-primary) 80%, transparent)',
            paddingLeft: viewMode === 'list' ? undefined : 8,
          }}
          onClick={() => setViewMode('list')}
          aria-pressed={viewMode === 'list'}
        >
          <span
            className="inline-flex overflow-hidden flex-shrink-0"
            style={{
              width: viewMode === 'list' ? 20 : 0,
              marginRight: viewMode === 'list' ? 8 : 0,
              opacity: viewMode === 'list' ? 1 : 0,
              transition: `width 600ms ${CUBIC_EASE}, margin 600ms ${CUBIC_EASE}, opacity 300ms ${CUBIC_EASE}`,
            }}
          >
            <Icon name="view-list" size={20} />
          </span>
          List
        </button>
      </div>

      {/* Search — icon button expands to search bar */}
      <div
        className="flex items-center bg-fg-04 rounded-full h-9"
        style={{
          width: isSearchOpen ? 280 : 36,
          transition: `width 600ms ${CUBIC_EASE}`,
        }}
      >
        <button
          type="button"
          className={`flex items-center justify-center w-9 h-9 rounded-full text-auto flex-shrink-0 border border-transparent ${isSearchOpen ? '' : 'transition-colors hover:border-fg-12'}`}
          onClick={() => !isSearchOpen && setIsSearchOpen(true)}
          aria-label="Search projects"
        >
          <Icon name="search-16" size={16} className="text-fg-80" />
        </button>
        {isSearchOpen && (
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder=""
            className="bg-transparent outline-none kol-helper-regular-s flex-1 text-fg-80 caret-current pr-4"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsSearchOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

const WORKSHOP_NESTED_ROUTE_IDS = new Set([
  'home',
  'design-system',
  'components',
  'apparat',
  'hall-of-mirrors',
  'chess',
  'analytics'
])

const formatWorkshopHref = (path = '') => {
  if (!path) return '/workshop'
  return `/workshop/${path.replace(/^\/+/, '')}`
}

// Build the Workshop submenu dynamically so it stays in sync with the sidebar structure
const WORKSHOP_PARENT_LINKS = WORKSHOP_ROUTES.map((route) => {
  const fallbackChild = route.children?.[0]
  const relativePath = route.path ?? fallbackChild?.path ?? ''
  const label = route.label
  const href = formatWorkshopHref(relativePath)

  if (!label) {
    return null
  }

  const includeNested = WORKSHOP_NESTED_ROUTE_IDS.has(route.id)
  const childLinks = includeNested
    ? route.children
        ?.map((child) => {
          if (!child?.label) {
            return null
          }
          return {
            to: formatWorkshopHref(child.path),
            label: child.label
          }
        })
        .filter(Boolean)
    : null

  return childLinks?.length
    ? { label, children: childLinks, toggleOnly: true }
    : { to: href, label }
}).filter(Boolean)

const NAV_ITEMS = [
  { to: '/studio', label: 'Studio' },
  { to: '/work', label: 'Work' },
  { to: '/workshop/docs', label: 'Docs' },
  { to: '/foundry', label: 'Foundry' },
  { to: '/stack', label: 'Stack' },
  { to: '/prints', label: 'Prints' },
  {
    label: 'Workshop',
    to: '/workshop',
    children: WORKSHOP_PARENT_LINKS
  }
]

const VARIANT_TOKENS = {
  default: {
    surface: 'var(--kol-surface-primary)',
    onSurface: 'var(--kol-surface-on-primary)'
  },
  inverse: {
    surface: 'var(--kol-surface-inverse)',
    onSurface: 'var(--kol-surface-on-inverse)'
  }
}

const Navbar = ({ variant = 'default' }) => {
  const tokens = VARIANT_TOKENS[variant] || VARIANT_TOKENS.default
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [expandedSubNav, setExpandedSubNav] = useState(null)
  const [expandedMobileSections, setExpandedMobileSections] = useState({})
  const dropdownRef = useRef(null)

  const isWork = location.pathname === '/work' || location.pathname.startsWith('/work/')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const viewportMiddle = window.innerHeight / 2

      if (currentScrollY > viewportMiddle) {
        setHasScrolledDown(true)
      }

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
    setExpandedMobileSections({})
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
        setExpandedSubNav(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setExpandedSubNav(null)
  }, [activeDropdown])

  const pausedVideosRef = useRef([])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      const next = !prev
      if (next) {
        // Pause all playing videos
        const videos = document.querySelectorAll('video')
        pausedVideosRef.current = [...videos].filter(v => !v.paused)
        pausedVideosRef.current.forEach(v => v.pause())
      } else {
        // Resume videos that were playing
        pausedVideosRef.current.forEach(v => v.play())
        pausedVideosRef.current = []
        setExpandedMobileSections({})
      }
      return next
    })
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
    setExpandedMobileSections({})
  }

  const handleDropdownToggle = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const toggleMobileSection = (label) => {
    setExpandedMobileSections((prev) => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: isHovered
            ? 'transform 300ms ease-in-out, background-color 80ms ease-out'
            : 'transform 300ms ease-in-out, background-color 600ms ease-in 1000ms',
          backgroundColor: isHovered ? 'var(--kol-surface-primary)' : '',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          color: tokens.onSurface
        }}
      >
        <div className="w-full px-4 py-4 md:px-6 lg:px-8">
          {isWork ? (
            <div className="hidden lg:grid grid-cols-8 items-center">
              <div className="col-start-1">
                <Link
                  to="/"
                  className="mt-[2px] flex items-center transition-opacity hover:opacity-80"
                  style={{ color: 'inherit' }}
                >
                  <Wordmark className="h-6 w-auto" tone={variant} />
                </Link>
              </div>
              <div className="col-start-7 flex justify-end">
                <WorkViewToggle />
              </div>
              <div className="col-start-8 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="flex items-center justify-center w-9 h-9 rounded-md md:hover:bg-fg-08 transition-colors"
                  style={{ color: tokens.onSurface }}
                >
                  <Icon name="theme-toggle" size={20} />
                </button>
                <div className="relative shrink-0 w-9 h-9">
                  <button
                    className="z-50 absolute inset-0 flex flex-col items-center justify-center gap-1.5"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                  >
                    <span
                      className="block h-0.5 w-7 transition-all duration-300"
                      style={{
                        backgroundColor: tokens.onSurface,
                        transform: isMobileMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                      }}
                    />
                    <span
                      className="block h-0.5 w-7 transition-all duration-300"
                      style={{
                        backgroundColor: tokens.onSurface,
                        opacity: isMobileMenuOpen ? 0 : 1,
                      }}
                    />
                    <span
                      className="block h-0.5 w-7 transition-all duration-300"
                      style={{
                        backgroundColor: tokens.onSurface,
                        transform: isMobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                      }}
                    />
                  </button>

                  {isMobileMenuOpen && (
                    <div
                      className="absolute top-full right-0 mt-4 w-48 rounded-b py-2"
                      style={{ backgroundColor: tokens.surface, color: tokens.onSurface }}
                    >
                      {NAV_ITEMS.map((item) => {
                        const href = item.to || item.children?.[0]?.to || '#'
                        return (
                          <NavLink
                            key={href}
                            to={href}
                            className="block px-4 py-2 kol-mono-text text-right transition-opacity opacity-60 hover:opacity-100"
                            style={{ fontSize: '16px', color: 'inherit' }}
                            onClick={handleNavClick}
                          >
                            {item.label}
                          </NavLink>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          <div className={`${isWork ? 'lg:hidden' : ''} flex items-center justify-between`}>
            <Link
              to="/"
              className="mt-[2px] flex items-center transition-opacity hover:opacity-80"
              style={{ color: 'inherit' }}
            >
              <Wordmark className="h-6 w-auto" tone={variant} />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                  return (
                    <div key={item.label} className="relative">
                      <div className="flex items-center group">
                        {item.to ? (
                          <Link
                            to={item.to}
                            className="kol-mono-text nav-link-underline"
                            style={{ fontSize: '16px', color: 'inherit' }}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            className="kol-mono-text nav-link-underline"
                            style={{ fontSize: '16px', color: 'inherit' }}
                            onClick={() => handleDropdownToggle(item.label)}
                          >
                            {item.label}
                          </button>
                        )}
                        <button
                          className="ml-1 p-0.5"
                          style={{ color: 'inherit' }}
                          onClick={() => handleDropdownToggle(item.label)}
                          aria-expanded={activeDropdown === item.label}
                          aria-haspopup="true"
                          aria-label={`Toggle ${item.label} menu`}
                        >
                          <Icon
                            name="stroke-chevron-down"
                            size={12}
                            className={`stroke-[3] transition-all duration-200 overflow-hidden ${
                              activeDropdown === item.label
                                ? 'w-3 opacity-100'
                                : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-100'
                            }`}
                            style={{
                              transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                          />
                        </button>
                      </div>

                      {activeDropdown === item.label && (
                        <div
                          className="absolute top-full -left-4 mt-2 w-48 rounded-b"
                          style={{
                            backgroundColor: tokens.surface,
                            color: tokens.onSurface,
                          }}
                        >
                          <div className="py-2">
                            {item.children.map((child) => (
                              <div
                                key={child.label || child.to}
                                className="px-4 py-2 transition-colors"
                                style={{ borderBottom: '1px solid transparent' }}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  {child.toggleOnly ? (
                                    <button
                                      type="button"
                                      className="kol-mono-text flex-1 text-left transition-opacity opacity-60 hover:opacity-100 flex items-center justify-between"
                                      style={{ fontSize: '16px', color: 'inherit' }}
                                      onClick={() => setExpandedSubNav((prev) => (prev === child.label ? null : child.label))}
                                      aria-expanded={expandedSubNav === child.label}
                                    >
                                      {child.label}
                                      <Icon
                                        name="stroke-chevron-down"
                                        size={12}
                                        className="ml-2 stroke-[3] transition-transform"
                                        style={{ transform: expandedSubNav === child.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                      />
                                    </button>
                                  ) : (
                                    <>
                                      <NavLink
                                        to={child.to}
                                        className="kol-mono-text flex-1 transition-opacity opacity-60 hover:opacity-100"
                                        style={{ fontSize: '16px', color: 'inherit' }}
                                        onClick={() => {
                                          handleNavClick()
                                          setActiveDropdown(null)
                                        }}
                                      >
                                        {child.label}
                                      </NavLink>
                                      {child.children?.length > 0 && (
                                        <button
                                          type="button"
                                          className="p-1 transition-opacity opacity-60 hover:opacity-100"
                                          onClick={() => setExpandedSubNav((prev) => (prev === child.label ? null : child.label))}
                                          aria-expanded={expandedSubNav === child.label}
                                          aria-label={`Expand ${child.label}`}
                                        >
                                          <Icon
                                            name="stroke-chevron-down"
                                            size={12}
                                            className="stroke-[3] transition-transform"
                                            style={{ transform: expandedSubNav === child.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                          />
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>

                                {child.children?.length > 0 && expandedSubNav === child.label && (
                                  <div
                                    className="mt-2 flex flex-col gap-2 border-l pl-3"
                                    style={{
                                      borderColor: `color-mix(in srgb, ${tokens.onSurface} 20%, transparent)`
                                    }}
                                  >
                                    {child.children.map((subchild) => (
                                      <NavLink
                                        key={subchild.to}
                                        to={subchild.to}
                                        className="kol-mono-text opacity-50 hover:opacity-100 transition-opacity"
                                        style={{ fontSize: '14px', color: 'inherit' }}
                                        onClick={() => {
                                          handleNavClick()
                                          setActiveDropdown(null)
                                          setExpandedSubNav(null)
                                        }}
                                      >
                                        {subchild.label}
                                      </NavLink>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="kol-mono-text nav-link-underline"
                    style={{ fontSize: '16px', color: 'inherit' }}
                  >
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center justify-center w-9 h-9 rounded-md md:hover:bg-fg-08 transition-colors"
                style={{ color: tokens.onSurface }}
              >
                <Icon name="theme-toggle" size={20} />
              </button>

              <button
                className="lg:hidden z-50 shrink-0 w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span
                  className="block h-0.5 w-7 transition-all duration-300"
                  style={{
                    backgroundColor: tokens.onSurface,
                    transform: isMobileMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="block h-0.5 w-7 transition-all duration-300"
                  style={{
                    backgroundColor: tokens.onSurface,
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block h-0.5 w-7 transition-all duration-300"
                  style={{
                    backgroundColor: tokens.onSurface,
                    transform: isMobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur lg:hidden"
          style={{
            backgroundColor: `color-mix(in srgb, ${tokens.surface} 60%, transparent)`
          }}
          onClick={toggleMobileMenu}
        >
          <div className="h-full">
            <div
              className="w-full h-full flex flex-col items-start justify-start gap-4 px-16 pt-32 pb-16 overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
            >
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="flex w-full flex-col gap-4">
                      <div className="flex items-center justify-between w-full">
                        {item.to ? (
                          <NavLink
                            to={item.to}
                            className="kol-helper-xl text-left flex-1 text-[28px] leading-tight"
                            style={{ color: 'inherit' }}
                            onClick={handleNavClick}
                          >
                            {item.label}
                          </NavLink>
                        ) : (
                          <button
                            type="button"
                            className="kol-helper-xl text-left flex-1 text-[28px] leading-tight"
                            style={{ color: 'inherit' }}
                            onClick={() => toggleMobileSection(item.label)}
                          >
                            {item.label}
                          </button>
                        )}
                        <button
                          type="button"
                          className="ml-4 relative z-10"
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            toggleMobileSection(item.label)
                          }}
                          aria-label={`Toggle ${item.label} menu`}
                          aria-expanded={Boolean(expandedMobileSections[item.label])}
                        >
                        <Icon
                          name="stroke-chevron-down"
                          size={24}
                          className="stroke-[2.5]"
                          style={{
                            color: tokens.onSurface,
                            transform: expandedMobileSections[item.label] ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }}
                        />
                        </button>
                      </div>
                      {expandedMobileSections[item.label] && (
                        <div className="flex flex-col items-start gap-4 pl-2">
                          {item.children.map((child) => {
                            const href = child.to || child.children?.[0]?.to || '#'
                            return (
                              <NavLink
                                key={href}
                                to={href}
                                className="kol-helper-md"
                                style={{ color: 'inherit' }}
                                onClick={handleNavClick}
                              >
                                {child.label}
                              </NavLink>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="kol-helper-xl text-[28px] leading-tight"
                    style={{ color: 'inherit' }}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </NavLink>
                )
              })}
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Navbar
