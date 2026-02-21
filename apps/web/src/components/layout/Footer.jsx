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
      className="bg-surface-tertiary pt-12 px-4 pb-8 md:pt-16 md:px-6 md:pb-12 lg:px-8 min-h-[500px]"
    >
      <div className="max-w-[1800px] mx-auto flex flex-col justify-between min-h-[calc(500px-80px)] md:min-h-[calc(500px-112px)]">
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-10 lg:gap-12">
        <div className="reveal h-10 lg:h-12" style={{ '--reveal-delay': '0s' }}>
          <Link to="/">
            <Wordmark className="h-full" />
          </Link>
        </div>

        <div className="flex items-start gap-12 md:gap-16 lg:gap-20 pt-[40px] md:w-1/2">
          <div className="reveal flex flex-col gap-3 md:gap-4 lg:gap-6" style={{ '--reveal-delay': '0.1s' }}>
            <p className="kol-label-compact text-xs uppercase" style={{ color: 'var(--kol-surface-on-primary)' }}>Menu</p>
            <div className="flex flex-col gap-1 lg:gap-2" style={{ color: 'var(--kol-surface-on-primary)' }}>
              <Link to="/work" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Work</Link>
              <Link to="/collections" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Collections</Link>
              <Link to="/workshop" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Workshop</Link>
              <Link to="/foundry" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Foundry</Link>
              <Link to="/studio" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Studio</Link>
              <Link to="/workshop/design-system/documentation" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Documentation</Link>
            </div>
          </div>

          <div className="reveal flex flex-col gap-3 md:gap-4 lg:gap-6" style={{ '--reveal-delay': '0.2s' }}>
            <p className="kol-label-compact text-xs uppercase" style={{ color: 'var(--kol-surface-on-primary)' }}>Follow</p>
            <div className="flex flex-col gap-1 md:gap-2" style={{ color: 'var(--kol-surface-on-primary)' }}>
              <a href="https://www.instagram.com/kolkrabbi_/" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Instagram</a>
              <a href="https://www.behance.net/kolkrabbi_" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Behance</a>
              <a href="https://dribbble.com/kolkrabbi" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Dribbble</a>
              <a href="https://www.youtube.com/@kolkrabbi-io" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>YouTube</a>
              <a href="https://www.tiktok.com/@kolkrabbi_" target="_blank" rel="noopener noreferrer" className="kol-heading-sm transition-opacity" style={{ fontSize: '32px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>TikTok</a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <div className="flex flex-col gap-3">
          <div className="border-t" style={{ borderColor: 'var(--kol-border-default)', opacity: 0.6 }} />

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
      </div>
    </footer>
  )
}
