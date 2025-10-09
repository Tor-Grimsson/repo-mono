import { useState } from 'react'
import { Link } from 'react-router-dom'

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
    <footer className="p-8 md:p-12" style={{ backgroundColor: 'var(--color-brand-yellow)' }}>
      <div className="flex flex-col lg:flex-row justify-between items-start mb-12 md:mb-14 lg:mb-16 gap-8 md:gap-10 lg:gap-12">
        <div className="h-14 lg:h-16">
          <div className="h-full flex items-center text-3xl uppercase" style={{ fontFamily: 'var(--font-family-rgrot-narrow)', color: 'var(--color-brand-dark)' }}>
            Kolkrabbi
          </div>
        </div>

        <div className="flex w-full items-start gap-12 md:gap-16 lg:gap-20 lg:pt-16">
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-6">
            <p className="text-xs uppercase" style={{ fontFamily: 'var(--font-family-rgrot-compact)', color: 'var(--color-brand-dark)' }}>Menu</p>
            <div className="flex flex-col gap-1 lg:gap-2 text-[28px] uppercase" style={{ fontFamily: 'var(--font-family-rgrot-narrow)', color: 'var(--color-brand-dark)' }}>
              <Link to="/" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Home</Link>
              <Link to="/work" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Work</Link>
              <Link to="/fonts" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Fonts</Link>
              <Link to="/foundry" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Foundry</Link>
              <Link to="/#story" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Studio</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 lg:gap-6">
            <p className="text-xs uppercase" style={{ fontFamily: 'var(--font-family-rgrot-compact)', color: 'var(--color-brand-dark)' }}>Follow</p>
            <div className="flex flex-col gap-1 md:gap-2 text-[28px] uppercase" style={{ fontFamily: 'var(--font-family-rgrot-narrow)', color: 'var(--color-brand-dark)' }}>
              <a href="https://instagram.com/kolkrabbi" target="_blank" rel="noopener noreferrer" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Instagram</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Dribbble</a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Behance</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-opacity" onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Twitter</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="border-t" style={{ borderColor: 'var(--color-brand-dark)' }} />

        <div className="flex justify-between items-center">
          <p className="text-base md:text-lg uppercase" style={{ fontFamily: 'var(--font-family-rgrot-narrow)', color: 'var(--color-brand-dark)' }}>© 2025 Kolkrabbi</p>

          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={handleHover}
            className="text-base md:text-lg uppercase transition-opacity"
            style={{ fontFamily: 'var(--font-family-rgrot-narrow)', color: 'var(--color-brand-dark)' }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <span className="flex items-center gap-1">
              <span
                className="inline-block w-3.5 h-3.5 md:w-4 md:h-4 transition-transform"
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
    </footer>
  )
}
