import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@kol/ui'
import Wordmark from '../ui/Wordmark'

const NAV_ITEMS = [
  { to: '/work', label: 'Work' },
  { to: '/foundry', label: 'Foundry' },
  { to: '/stack', label: 'Stack' },
  { to: '/styleguide', label: 'Styleguide' },
  { to: '/#story', label: 'Studio' }
]

const Navbar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--foreground)'
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

            <nav className="hidden items-center gap-6 md:flex">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `kol-label nav-link-underline ${isActive ? 'opacity-100' : 'opacity-80'}`
                  }
                  style={{ fontFamily: 'var(--font-family-rgrot-narrow)' }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle variant="icon" className="md:hidden" />
              <ThemeToggle className="hidden md:flex" />

              <button
                className={`md:hidden z-50 ${isMobileMenuOpen ? 'flex h-6 w-7 flex-col items-center justify-center' : 'flex flex-col items-end justify-center space-y-1'}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: 'var(--foreground)',
                    transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none',
                    transformOrigin: 'center'
                  }}
                />
                <span
                  className={`block h-0.5 w-5 transition-opacity duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: 'var(--foreground)',
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                />
                <span
                  className={`block h-0.5 w-7 transition-all duration-300 ${isMobileMenuOpen ? 'absolute' : ''}`}
                  style={{
                    backgroundColor: 'var(--foreground)',
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bgAbsoluteBlack/60 backdrop-blur md:hidden"
          onClick={toggleMobileMenu}
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
                color: 'var(--foreground)'
              }}
              onClick={handleNavClick}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  )
}

export default Navbar
