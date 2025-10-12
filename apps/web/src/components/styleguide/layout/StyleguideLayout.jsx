import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { STYLEGUIDE_ROUTES } from '../../../data/styleguide/navigation'
import { ThemeToggle, Dropdown } from '@kol/ui'
import Wordmark from '../../ui/Wordmark'

const StyleguideLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const dropdownOptions = STYLEGUIDE_ROUTES.map(({ label, path }) => ({
    label,
    value: path ? `/styleguide/${path}` : '/styleguide'
  }))

  const normalizedPath = location.pathname.replace(/\/$/, '')
  const currentDropdownValue = (() => {
    const match = dropdownOptions.find(option => {
      if (option.value === '/styleguide') {
        return normalizedPath === '/styleguide'
      }
      return normalizedPath === option.value || normalizedPath.startsWith(`${option.value}/`)
    })
    return match ? match.value : '/styleguide'
  })()

  const handleDropdownChange = (value) => {
    if (!value) return
    navigate(value, { replace: false })
  }
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--surface-primary)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto flex w-full flex-col lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside
          className="surface-panel border-0 px-4 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-opacity-40 lg:px-6 lg:py-10"
          style={{ borderColor: 'var(--foreground)' }}
        >
          <div className="flex flex-1 flex-col">
            <div className="overflow-visible mb-12 lg:mb-0 lg:pb-12">
              <Link to="/" className="inline-flex items-center transition-opacity hover:opacity-80">
                <Wordmark className="h-6 w-auto" />
              </Link>
              <h1 className="mt-8 text-[48px] font-medium uppercase leading-none" style={{ fontFamily: 'var(--font-family-rgrot-tight)' }}>Design System</h1>
              <p className="kol-mono-body mt-3 opacity-70">
                Tokens, components, and live previews for light & dark parity.
              </p>
            </div>
            <div className="h-px w-full opacity-40" style={{ backgroundColor: 'var(--foreground)' }}></div>
            <nav className="hidden flex-1 flex-col gap-2 lg:flex lg:pt-12">
              {STYLEGUIDE_ROUTES.map(({ id, label, path }) => (
                <NavLink
                  key={id}
                  to={path ? path : '.'}
                  end={path === ''}
                  className={({ isActive }) =>
                    `btn-outline !border-0 inline-flex normal-case w-full items-center justify-between px-4 py-2 text-sm ${
                      isActive ? 'is-active' : ''
                    }`}
                  style={({ isActive }) => (
                    isActive
                      ? {
                          backgroundColor: 'var(--foreground)',
                          color: 'var(--surface-primary)'
                        }
                      : undefined
                  )}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="hidden lg:flex lg:w-full">
              <ThemeToggle variant="compact" />
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-10">
          <div className="lg:hidden px-4 pt-6 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <ThemeToggle variant="compact" />
              <div className="min-w-[200px]">
                <Dropdown
                  options={dropdownOptions}
                  value={currentDropdownValue}
                  onChange={handleDropdownChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="space-y-10 px-4 pb-16 pt-10 sm:px-8 lg:px-12">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StyleguideLayout
