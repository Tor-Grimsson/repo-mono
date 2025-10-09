import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/work', label: 'Work' },
  { to: '/foundry', label: 'Foundry' },
  { to: '/stack', label: 'Stack' },
  { to: '/#story', label: 'Studio' },
  { to: '/demo', label: 'Demo' },
]

const Navbar = ({ onToggleTheme }) => {
  const [isDark, setIsDark] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  useEffect(() => {
    // Check localStorage first, then fallback to current class
    const savedTheme = localStorage.getItem('theme')
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && document.documentElement.classList.contains('dark'))

    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const viewportMiddle = window.innerHeight / 2

      // Track if user has ever scrolled down past middle
      if (currentScrollY > viewportMiddle) {
        setHasScrolledDown(true)
      }

      // Show navbar at the top
      if (currentScrollY < viewportMiddle) {
        setIsVisible(true)
      }
      // Hide when scrolling down past middle
      else if (currentScrollY > lastScrollY && currentScrollY > viewportMiddle) {
        setIsVisible(false)
      }
      // Show when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleToggle = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    onToggleTheme?.()
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          backgroundColor: hasScrolledDown
            ? (isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)')
            : 'transparent',
          backdropFilter: hasScrolledDown ? 'blur(12px)' : 'none'
        }}
      >
        <div className="py-4 px-4 lg:px-5 w-full">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-3xl leading-[0.8] uppercase mt-[2px] hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-family-rgrot-narrow)', color: 'var(--color-text-primary)' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Kolkrabbi
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `kol-label nav-link-underline ${
                      isActive ? 'opacity-100' : 'opacity-80'
                    }`
                  }
                  style={{ fontFamily: 'var(--font-family-rgrot-narrow)' }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* Theme Toggle - Mobile (icon only) */}
              <button
                onClick={handleToggle}
                className="md:hidden flex items-center justify-center size-8 rounded-full transition-opacity duration-300 hover:opacity-80"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <div className="size-6 overflow-hidden rounded-full bg-transparent">
                  <div className="flex w-12 transition-transform duration-700 ease-in-out" style={{ transform: isDark ? 'translateX(0)' : 'translateX(-50%)' }}>
                    <span className="flex size-6 items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM11 11H4.069C4.15475 10.3136 4.32955 9.64126 4.589 9H11V11ZM11 15H4.589C4.32955 14.3587 4.15475 13.6864 4.069 13H11V15ZM11 4.069V7H5.765C7.06342 5.38055 8.94071 4.32948 11 4.069ZM5.765 17H11V19.931C8.94071 19.6705 7.06342 18.6194 5.765 17ZM13 19.931V4.069C16.939 4.564 20 7.927 20 12C20 16.073 16.939 19.436 13 19.931Z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="flex size-6 items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM11 11H4.069C4.15475 10.3136 4.32955 9.64126 4.589 9H11V11ZM11 15H4.589C4.32955 14.3587 4.15475 13.6864 4.069 13H11V15ZM11 4.069V7H5.765C7.06342 5.38055 8.94071 4.32948 11 4.069ZM5.765 17H11V19.931C8.94071 19.6705 7.06342 18.6194 5.765 17ZM13 19.931V4.069C16.939 4.564 20 7.927 20 12C20 16.073 16.939 19.436 13 19.931Z" fill="currentColor"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </button>

              {/* Theme Toggle - Desktop */}
              <button
                onClick={handleToggle}
                className="hidden md:flex group w-fit items-center gap-3 rounded-full border p-1 pl-4 transition-colors duration-300 bg-transparent"
                style={{ borderColor: 'var(--color-border)' }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-border-hover)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <span className="text-sm w-20 text-left opacity-30 transition-opacity duration-[400ms] group-hover:opacity-100 group-active:opacity-0" style={{ color: 'var(--color-text-primary)' }}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </span>
                <span className="block h-4 w-0.5" style={{ backgroundColor: 'var(--color-border)' }}></span>

                <div className="size-6 overflow-hidden rounded-full bg-transparent transition-colors duration-700">
                  <div className="flex w-12 transition-transform duration-700 ease-in-out" style={{ transform: isDark ? 'translateX(0)' : 'translateX(-50%)' }}>
                    <span className="flex size-6 items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM11 11H4.069C4.15475 10.3136 4.32955 9.64126 4.589 9H11V11ZM11 15H4.589C4.32955 14.3587 4.15475 13.6864 4.069 13H11V15ZM11 4.069V7H5.765C7.06342 5.38055 8.94071 4.32948 11 4.069ZM5.765 17H11V19.931C8.94071 19.6705 7.06342 18.6194 5.765 17ZM13 19.931V4.069C16.939 4.564 20 7.927 20 12C20 16.073 16.939 19.436 13 19.931Z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="flex size-6 items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM11 11H4.069C4.15475 10.3136 4.32955 9.64126 4.589 9H11V11ZM11 15H4.589C4.32955 14.3587 4.15475 13.6864 4.069 13H11V15ZM11 4.069V7H5.765C7.06342 5.38055 8.94071 4.32948 11 4.069ZM5.765 17H11V19.931C8.94071 19.6705 7.06342 18.6194 5.765 17ZM13 19.931V4.069C16.939 4.564 20 7.927 20 12C20 16.073 16.939 19.436 13 19.931Z" fill="currentColor"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden z-50 ${isMobileMenuOpen ? 'flex flex-col items-center justify-center w-7 h-6 relative' : 'flex flex-col items-end justify-center space-y-1'}`}
                onClick={toggleMobileMenu}
              >
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: isMobileMenuOpen ? 'var(--color-brand-light)' : 'var(--color-text-primary)',
                    transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none',
                    transformOrigin: 'center'
                  }}
                />
                <span
                  className={`block h-0.5 w-5 transition-opacity duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: isMobileMenuOpen ? 'var(--color-brand-light)' : 'var(--color-text-primary)',
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                />
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: isMobileMenuOpen ? 'var(--color-brand-light)' : 'var(--color-text-primary)',
                    transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'none',
                    transformOrigin: 'center'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
          style={{
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={toggleMobileMenu}
        >
          <div
            className="flex flex-col space-y-8"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-family-rgrot-narrow)',
                  fontSize: '48px',
                  lineHeight: '100%',
                  color: 'var(--color-brand-light)'
                }}
                onClick={handleNavClick}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
