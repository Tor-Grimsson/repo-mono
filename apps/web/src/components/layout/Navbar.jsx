import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggleButton, useTheme } from '@kol/ui'
import Wordmark from '../ui/Wordmark'

const NAV_ITEMS = [
  { to: '/work', label: 'Work' },
  {
    label: 'Foundry',
    children: [
      { to: '/foundry', label: 'Overview' },
      { to: '/foundry/typefaces', label: 'All Typefaces' },
      { to: '/foundry/specimens', label: 'Specimens' },
      { to: '/specimen/prose', label: 'Prose Styles' },
      { to: '/foundry/licensing', label: 'Licensing' }
    ]
  },
  { to: '/stack', label: 'Stack' },
  {
    label: 'Collections',
    children: [
      { to: '/collections/illustrations', label: 'Illustrations' },
      { to: '/collections/logomarks', label: 'Logomarks' }
    ]
  },
  { to: '/demo', label: 'Demo' },
  { to: '/workshop', label: 'Workshop' },
  { to: '/#story', label: 'Studio' }
]

const Navbar = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
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
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const handleDropdownToggle = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          backgroundColor: 'var(--kol-surface-primary)',
          color: 'var(--kol-surface-on-primary)'
        }}
      >
        <div className="w-full px-4 py-4 lg:px-5">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="mt-[2px] flex items-center transition-opacity hover:opacity-80"
            >
              <Wordmark className="h-6 w-auto" />
            </Link>

            <nav className="hidden items-center gap-6 md:flex" ref={dropdownRef}>
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="relative">
                      <button
                        className="kol-mono-text nav-link-underline flex items-center gap-1 group-hover:gap-2 group"
                        style={{ fontSize: '16px' }}
                        onClick={() => handleDropdownToggle(item.label)}
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="transition-all duration-200 opacity-0 group-hover:opacity-100"
                          style={{
                            transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        >
                          <path
                            d="M2 4L6 8L10 4"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-200"
                            onMouseEnter={(e) => e.target.style.strokeWidth = '2'}
                            onMouseLeave={(e) => e.target.style.strokeWidth = '1.5'}
                          />
                        </svg>
                      </button>

                      {activeDropdown === item.label && (
                        <div
                          className="absolute top-full left-0 mt-2 w-48 bg-surface-primary shadow-lg"
                          style={{
                            backgroundColor: 'var(--kol-surface-primary)',
                          }}
                        >
                          <div className="py-2">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.to}
                                to={child.to}
                                className="block px-4 py-2 kol-mono-text hover:bg-surface-secondary transition-colors"
                                style={{ fontSize: '16px' }}
                                onClick={() => {
                                  handleNavClick()
                                  setActiveDropdown(null)
                                }}
                              >
                                {child.label}
                              </NavLink>
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
                    style={{ fontSize: '16px' }}
                  >
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggleButton
                variant="default"
                isToggled={theme === 'dark'}
                onClick={toggleTheme}
              />

              <button
                className={`md:hidden z-50 ${isMobileMenuOpen ? 'flex h-6 w-7 flex-col items-center justify-center' : 'flex flex-col items-end justify-center space-y-1'}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: 'var(--kol-surface-on-primary)',
                    transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none',
                    transformOrigin: 'center'
                  }}
                />
                <span
                  className={`block h-0.5 w-5 transition-opacity duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: 'var(--kol-surface-on-primary)',
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                />
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: 'var(--kol-surface-on-primary)',
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
            backgroundColor: 'color-mix(in srgb, var(--kol-surface-primary) 60%, transparent)'
          }}
          onClick={toggleMobileMenu}
        >
          <div className="h-full flex flex-col items-center justify-center gap-8">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="flex flex-col items-center gap-4">
                    <span
                      className="kol-heading-lg uppercase"
                      style={{
                        fontSize: '48px',
                        lineHeight: '100%',
                        color: 'var(--kol-surface-on-primary)'
                      }}
                    >
                      {item.label}
                    </span>
                    <div className="flex flex-col items-center gap-4">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className="kol-heading-md"
                          style={{
                            fontSize: '32px',
                            lineHeight: '100%',
                            color: 'var(--kol-surface-on-primary)'
                          }}
                          onClick={handleNavClick}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="kol-heading-lg uppercase"
                  style={{
                    fontSize: '48px',
                    lineHeight: '100%',
                    color: 'var(--kol-surface-on-primary)'
                  }}
                  onClick={handleNavClick}
                >
                  {item.label}
                </NavLink>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
