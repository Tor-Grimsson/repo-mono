import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Dropdown, Icon, ThemeToggleButton, useTheme } from '@kol/ui'
import { STYLEGUIDE_ROUTES } from '../../../data/styleguide/navigation'
import Wordmark from '../../ui/Wordmark'
import Logomark from '../../ui/Logomark'
import { StyleguideExpansionProvider } from '../../../routes/styleguide/StyleguideExpansionContext'

const ICON_MAP = {
  'styleguide-home': 'styleguide',
  foundations: 'foundation',
  components: 'component'
}

const resolveIconName = (route) => {
  if (route.icon) return route.icon
  return ICON_MAP[route.id] ?? 'arrow-downright'
}

const StyleguideLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const normalizedPath = location.pathname.replace(/\/$/, '')

  const findActiveGroup = () =>
    STYLEGUIDE_ROUTES.find((route) =>
      route.children?.some((child) => {
        const fullPath = `/styleguide/${child.path}`
        return normalizedPath === fullPath || normalizedPath.startsWith(`${fullPath}/`)
      })
    )

  const [expandedItems, setExpandedItems] = useState(() => {
    const active = findActiveGroup()
    return active ? { [active.id]: true } : {}
  })

  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const active = findActiveGroup()
    if (active) {
      setExpandedItems((prev) => (prev[active.id] ? prev : { ...prev, [active.id]: true }))
    }
  }, [normalizedPath])

  const dropdownOptions = useMemo(() => {
    const flattened = STYLEGUIDE_ROUTES.flatMap(({ label, path, children }) => {
      if (children) {
        return children.map((child) => ({
          label: `${label}: ${child.label}`,
          value: `/styleguide/${child.path}`
        }))
      }
      return [
        {
          label,
          value: path ? `/styleguide/${path}` : '/styleguide'
        }
      ]
    })

    return [
      ...flattened,
      { label: 'Reports: Type Report', value: '/styleguide/type-report' }
    ]
  }, [])

  const currentDropdownValue = useMemo(() => {
    const match = dropdownOptions.find((option) => {
      if (option.value === '/styleguide') {
        return normalizedPath === '/styleguide'
      }
      return normalizedPath === option.value || normalizedPath.startsWith(`${option.value}/`)
    })
    return match ? match.value : '/styleguide'
  }, [dropdownOptions, normalizedPath])

  const handleDropdownChange = (value) => {
    if (value) navigate(value, { replace: false })
  }

  const isApparatusView = normalizedPath.startsWith('/styleguide/apparatus')

  const toggleGroup = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const closeGroup = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: false
    }))
  }

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev)
    setExpandedItems({})
  }

  const gridTemplateClass = isCollapsed
    ? 'lg:grid-cols-[96px_minmax(0,1fr)]'
    : 'lg:grid-cols-[260px_minmax(0,1fr)]'

  const asidePadding = isCollapsed ? 'lg:px-4' : 'lg:px-6'

  const renderCollapsedThemeToggle = () => (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`theme-toggle-horizontal ${theme === 'dark' ? 'toggled' : ''} inline-flex h-10 w-10 items-center justify-center`}
      style={{ color: 'var(--kol-surface-on-primary)' }}
    >
      <span
        className="icon-swap-container"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '18px',
          height: '18px',
          overflow: 'hidden'
        }}
      >
        <Icon
          name="theme-toggle"
          size={18}
          style={{ position: 'absolute', transition: 'transform 0.3s ease' }}
        />
        <Icon
          name="theme-toggle"
          size={18}
          style={{ position: 'absolute', transition: 'transform 0.3s ease' }}
        />
      </span>
    </button>
  )

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--kol-surface-primary)', color: 'var(--kol-surface-on-primary)' }}
    >
      <div className={`mx-auto flex w-full flex-col lg:grid ${gridTemplateClass}`}>
        <aside
          className={`relative border-0 px-4 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r border-fg-08 ${asidePadding} lg:py-10`}
        >
          <div className={`flex flex-1 flex-col gap-6 ${isCollapsed ? 'items-center' : ''}`}>
            <div
              className={
                isCollapsed
                  ? 'flex w-full flex-col items-center gap-4'
                  : 'flex items-start justify-between'
              }
            >
              <Link to="/" className="inline-flex items-center transition-opacity hover:opacity-80">
                {isCollapsed ? (
                  <Logomark className="h-10 w-10" title="Kolkrabbi logomark" />
                ) : (
                  <Wordmark className="h-6 w-auto" />
                )}
              </Link>
              <button
                type="button"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={toggleSidebar}
                className="btn-outline !border-0 inline-flex h-10 w-10 items-center justify-center px-0 py-0 text-sm"
              >
                <Icon
                  name="arrow-downright"
                  size={16}
                  style={{
                    transform: isCollapsed ? 'rotate(135deg)' : 'rotate(-45deg)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </button>
            </div>

            {!isCollapsed && (
              <div className="space-y-3">
                <h1
                  className="text-[48px] font-medium uppercase leading-none"
                  style={{ fontFamily: 'var(--kol-font-family-rgrot-tight)' }}
                >
                  Design System
                </h1>
                <p className="kol-mono-text opacity-70">
                  Tokens, components, and live previews for light & dark parity.
                </p>
              </div>
            )}

            <div className="divider-auto w-full"></div>

            <nav
              className={
                isCollapsed
                  ? 'relative hidden flex-1 flex-col items-center gap-3 lg:flex'
                  : 'relative hidden flex-1 flex-col gap-2 lg:flex'
              }
            >
              {STYLEGUIDE_ROUTES.map((route) => {
                if (route.children) {
                  const isExpanded = Boolean(expandedItems[route.id])
                  return (
                    <div key={route.id} className="relative">
                      <button
                        onClick={() => toggleGroup(route.id)}
                        className={
                          isCollapsed
                            ? 'btn-outline !border-0 flex h-10 w-10 items-center justify-center'
                            : 'btn-outline !border-0 inline-flex w-full items-center justify-between px-4 py-2 text-sm normal-case'
                        }
                      >
                        <span className="flex items-center gap-3">
                          <Icon name={resolveIconName(route)} size={16} />
                          {!isCollapsed && <span>{route.label}</span>}
                        </span>
                        {!isCollapsed && (
                          <span className="text-xs">{isExpanded ? '−' : '+'}</span>
                        )}
                      </button>
                      {isExpanded && (
                        <div
                          className={
                            isCollapsed
                              ? 'absolute left-[calc(100%+12px)] top-0 z-20 flex w-60 flex-col gap-1 rounded-xl border border-auto bg-auto p-3 shadow-lg'
                              : 'ml-4 mt-1 flex flex-col gap-1'
                          }
                        >
                          {route.children.map((child) => (
                            <NavLink
                              key={child.id}
                              to={child.path}
                              onClick={(e) => {
                                setTimeout(() => closeGroup(route.id), 0)
                              }}
                              className={({ isActive }) =>
                                `btn-outline !border-0 inline-flex w-full items-center justify-between px-4 py-2 text-sm normal-case ${
                                  isActive ? 'is-active' : ''
                                }`
                              }
                              style={({ isActive }) => (
                                isActive
                                  ? {
                                      backgroundColor: 'var(--kol-surface-on-primary)',
                                      color: 'var(--kol-surface-primary)'
                                    }
                                  : undefined
                              )}
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                const to = route.path ? route.path : '.'
                return (
                  <NavLink
                    key={route.id}
                    to={to}
                    end={!route.path}
                    className={({ isActive }) =>
                      `${isCollapsed
                        ? 'btn-outline !border-0 flex h-10 w-10 items-center justify-center rounded-full'
                        : 'btn-outline !border-0 inline-flex w-full items-center justify-between px-4 py-2 text-sm normal-case'} ${isActive ? 'is-active' : ''}`
                    }
                    style={({ isActive }) => (
                      isActive && !isCollapsed
                        ? {
                            backgroundColor: 'var(--kol-surface-on-primary)',
                            color: 'var(--kol-surface-primary)'
                          }
                        : undefined
                    )}
                    aria-label={isCollapsed ? route.label : undefined}
                    title={isCollapsed ? route.label : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={resolveIconName(route)} size={16} />
                      {!isCollapsed && <span>{route.label}</span>}
                    </span>
                  </NavLink>
                )
              })}
            </nav>

            <div className="hidden lg:flex lg:w-full lg:justify-center">
              {isCollapsed ? (
                renderCollapsedThemeToggle()
              ) : (
                <ThemeToggleButton
                  variant="compact"
                  isToggled={theme === 'dark'}
                  onClick={toggleTheme}
                />
              )}
            </div>
          </div>
        </aside>

        <main className={isApparatusView ? 'flex-1' : 'flex-1 space-y-10'}>
          <div className="lg:hidden px-4 pt-6 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <ThemeToggleButton
                variant="compact"
                isToggled={theme === 'dark'}
                onClick={toggleTheme}
              />
              <div className="min-w-[200px]">
                <Dropdown
                  options={dropdownOptions}
                  value={currentDropdownValue}
                  onChange={handleDropdownChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-hidden">
            <StyleguideExpansionProvider>
              <div className={isApparatusView ? 'h-full w-full' : 'space-y-10 px-4 pb-16 pt-10 sm:px-8 lg:px-12'}>
                <Outlet />
              </div>
            </StyleguideExpansionProvider>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StyleguideLayout
