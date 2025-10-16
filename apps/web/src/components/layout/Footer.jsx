import { useState } from 'react'
import { Link } from 'react-router-dom'
import Wordmark from '../ui/Wordmark'

export default function Footer() {
  const [isAnimating, setIsAnimating] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHover = () => {
    setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 800)
    }, 100)
  }

  return (
    <footer
      className="pt-12 px-8 pb-8 md:pt-16 md:px-12 md:pb-12 min-h-[500px] flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--kol-color-median-light)',
        color: 'var(--kol-surface-on-primary)'
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-10 lg:gap-12">
        <Link to="/" className="h-10 lg:h-12">
          <Wordmark className="h-full" />
        </Link>

        <div className="flex items-start gap-12 md:gap-16 lg:gap-20 pt-[40px] md:w-1/2">
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-6">
            <p className="kol-label-compact text-xs uppercase" style={{ color: 'var(--foreground)' }}>Menu</p>
            <div className="flex flex-col gap-1 lg:gap-2" style={{ color: 'var(--foreground)' }}>
              <Link to="/" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Home</Link>
              <Link to="/work" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Work</Link>
              <Link to="/styleguide" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Styleguide</Link>
              <Link to="/foundry" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Foundry</Link>
              <Link to="/#story" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Studio</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 lg:gap-6">
            <p className="kol-label-compact text-xs uppercase" style={{ color: 'var(--foreground)' }}>Follow</p>
            <div className="flex flex-col gap-1 md:gap-2" style={{ color: 'var(--foreground)' }}>
              <a href="https://instagram.com/kolkrabbi" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Instagram</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Dribbble</a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Behance</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Twitter</a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <div className="flex flex-col gap-3">
          <div className="border-t" style={{ borderColor: 'var(--surface-border)', opacity: 0.6 }} />

        <div className="flex justify-between items-center">
          <p className="kol-label-compact text-xs uppercase">© 2025 Kolkrabbi</p>

          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={handleHover}
            className="kol-label-compact text-xs uppercase transition-opacity cursor-pointer"
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <span className="flex items-center justify-center gap-1">
              <span
                className="inline-flex items-center justify-center transition-transform"
                style={{
                  transform: isAnimating ? 'translateY(-4px) scale(1.1)' : 'translateY(0) scale(1)',
                  transitionDuration: '800ms'
                }}
              >
                ↑
              </span>
              Back to top
            </span>
          </button>
        </div>
        </div>
      </div>
    </footer>
  )
}
