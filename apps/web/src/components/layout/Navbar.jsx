import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme, Icon } from '@kol/ui'
import Wordmark from '../ui/Wordmark'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'
import { typefaceConfig } from '../../data/foundry/typefaceConfig'

const TYPEFACE_SUBNAV_IDS = ['malromur', 'rot', 'dylgjur', 'gullhamrar', 'trollatunga']
const WORKSHOP_NESTED_ROUTE_IDS = new Set([
  'home',
  'design-system',
  'components',
  'apparat',
  'hall-of-mirrors',
  'chess',
  'analytics'
])

const slugOverrides = {
  rot: 'root'
}

const TYPEFACE_CHILD_LINKS = TYPEFACE_SUBNAV_IDS.map((id) => {
  const config = typefaceConfig[id]
  if (!config) return null

  const slug = slugOverrides[id] || id
  return {
    to: `/foundry/typefaces/${slug}`,
    label: config.displayName || config.name || config.id
  }
}).filter(Boolean)

const SPECIMEN_CHILD_LINKS = TYPEFACE_SUBNAV_IDS.map((id) => {
  const config = typefaceConfig[id]
  if (!config) return null

  const slug = slugOverrides[id] || id
  const link = config.specimenLink || `/foundry/specimen/${slug}`
  return {
    to: link,
    label: config.displayName || config.name || config.id
  }
}).filter(Boolean)

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
  { to: '/docs', label: 'Docs' },
  {
    label: 'Foundry',
    children: [
      { to: '/foundry', label: 'Overview' },
      {
        label: 'Typefaces',
        children: [{ to: '/foundry/typefaces', label: 'Overview' }, ...TYPEFACE_CHILD_LINKS],
        hideMobileChildren: true,
        toggleOnly: true
      },
      {
        label: 'Specimen',
        children: [{ to: '/foundry/specimen', label: 'Overview' }, ...SPECIMEN_CHILD_LINKS],
        hideMobileChildren: true,
        toggleOnly: true
      },
      {
        label: 'Prose Styles',
        children: [
          { to: '/foundry/prose-styles', label: 'Overview' },
          { to: '/foundry/prose-specs/malromur', label: 'Málrómur' },
          { to: '/foundry/prose-specs/documentation', label: 'Documentation' },
          { to: '/foundry/prose-specs/stack', label: 'Stack' }
        ],
        toggleOnly: true
      },
      { to: '/foundry/licensing', label: 'Licensing' }
    ]
  },
  { to: '/stack', label: 'Stack' },
  { to: '/prints', label: 'Prints' },
  {
    label: 'Collections',
    children: [
      { to: '/collections', label: 'Overview' },
      { to: '/collections/illustrations', label: 'Illustrations' },
      { to: '/collections/grids', label: 'Grids' },
      { to: '/collections/logomarks', label: 'Logomarks' },
      { to: '/collections/motion-graphics', label: 'Motion Graphics' }
    ]
  },
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
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [expandedSubNav, setExpandedSubNav] = useState(null)
  const [expandedMobileSections, setExpandedMobileSections] = useState({})
  const dropdownRef = useRef(null)

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      const next = !prev
      if (!next) {
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
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          backgroundColor: tokens.surface,
          color: tokens.onSurface
        }}
      >
        <div className="w-full px-4 py-4 md:px-6 lg:px-8">
          <div className="max-w-[1800px] mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="mt-[2px] flex items-center transition-opacity hover:opacity-80"
              style={{ color: 'inherit' }}
            >
              <Wordmark className="h-6 w-auto" tone={variant} />
            </Link>

            <nav className="hidden items-center gap-6 md:flex" ref={dropdownRef}>
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
                className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-fg-08 transition-colors"
                style={{ color: tokens.onSurface }}
              >
                <Icon name="theme-toggle" size={20} />
              </button>

              <button
                className={`md:hidden z-50 ${isMobileMenuOpen ? 'flex h-6 w-7 flex-col items-center justify-center' : 'flex flex-col items-end justify-center space-y-1'}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: tokens.onSurface,
                    transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none',
                    transformOrigin: 'center'
                  }}
                />
                <span
                  className={`block h-0.5 w-5 transition-opacity duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: tokens.onSurface,
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                />
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: tokens.onSurface,
                    transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'none',
                    transformOrigin: 'center'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur md:hidden"
          style={{
            backgroundColor: `color-mix(in srgb, ${tokens.surface} 60%, transparent)`
          }}
          onClick={toggleMobileMenu}
        >
          <div className="h-full flex items-start justify-center">
            <div
              className="w-[400px] max-w-full h-full flex flex-col items-start justify-start gap-4 px-6 pt-32 pb-16 mt-32 overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
            >
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="flex w-full flex-col gap-4">
                      <div className="flex items-center justify-between w-full">
                        <NavLink
                          to={item.children?.[0]?.to || '#'}
                          className="kol-helper-xl text-left flex-1 text-[28px] leading-tight"
                          style={{ color: 'inherit' }}
                          onClick={handleNavClick}
                        >
                          {item.label}
                        </NavLink>
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
                          {item.children.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              className="kol-helper-md"
                              style={{ color: 'inherit' }}
                              onClick={handleNavClick}
                            >
                              {child.label}
                            </NavLink>
                          ))}
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
