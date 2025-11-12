import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-8"
      style={{ backgroundColor: 'var(--kol-surface-primary)' }}
    >
      <div className="max-w-[600px] space-y-8 text-center">
        <div className="space-y-4">
          <p
            className="kol-label-compact uppercase tracking-wider"
            style={{ color: 'var(--kol-surface-on-primary)', opacity: 0.5 }}
          >
            Error 404
          </p>
          <h1
            className="kol-heading-display"
            style={{ color: 'var(--kol-surface-on-primary)' }}
          >
            Page not found
          </h1>
          <p
            className="kol-mono-text text-lg"
            style={{ color: 'var(--kol-surface-on-primary)', opacity: 0.7 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="px-6 py-3 rounded transition-opacity kol-mono-text inline-block"
            style={{
              backgroundColor: 'var(--kol-surface-on-primary)',
              color: 'var(--kol-surface-primary)'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Go home
          </Link>

          <Link
            to="/work"
            className="px-6 py-3 rounded transition-opacity kol-mono-text inline-block"
            style={{
              backgroundColor: 'var(--kol-surface-secondary)',
              color: 'var(--kol-surface-on-primary)'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Browse work
          </Link>

          <Link
            to="/foundry"
            className="px-6 py-3 rounded transition-opacity kol-mono-text inline-block"
            style={{
              backgroundColor: 'var(--kol-surface-secondary)',
              color: 'var(--kol-surface-on-primary)'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Explore foundry
          </Link>
        </div>
      </div>
    </div>
  )
}
