import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon, ThemeToggleButton, useTheme, SidebarMenuItem } from '@kol/ui'
import { STYLEGUIDE_ROUTES } from '../../../data/styleguide/navigation'
import Wordmark from '../../ui/Wordmark'
import Logomark from '../../ui/Logomark'

const ICON_MAP = {
  'styleguide-home': 'styleguide',
  foundations: 'foundation',
  components: 'component'
}

const resolveIconName = (route) => {
  if (route.icon) return route.icon
  return ICON_MAP[route.id] ?? 'arrow-downright'
}

const StyleguideSidebar = ({
  isCollapsed,
  setIsCollapsed,
  expandedItems,
  setExpandedItems
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const normalizedPath = location.pathname.replace(/\/$/, '')
  const collapseTimeoutRef = useRef(null)

  const findActiveGroup = () =>
    STYLEGUIDE_ROUTES.find((route) =>
      route.children?.some((child) => {
        const fullPath = `/styleguide/${child.path}`
        return normalizedPath === fullPath || normalizedPath.startsWith(`${fullPath}/`)
      })
    )

  // Auto-expand active group on route change
  useEffect(() => {
    const active = findActiveGroup()
    if (active) {
      setExpandedItems((prev) => (prev[active.id] ? prev : { ...prev, [active.id]: true }))
    }
  }, [normalizedPath, setExpandedItems])

  // Handle mouse enter/leave for auto-collapse
  const handleMouseEnter = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current)
      collapseTimeoutRef.current = null
    }
  }

  const handleMouseLeave = () => {
    // Start timer to collapse groups when mouse leaves sidebar
    collapseTimeoutRef.current = setTimeout(() => {
      setExpandedItems({})
    }, 2000) // 2 second delay
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
    }
  }, [])

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
    <aside
      className={`relative border-0 px-4 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r border-fg-08 ${asidePadding} lg:py-10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
                <SidebarMenuItem
                  key={route.id}
                  label={route.label}
                  icon={resolveIconName(route)}
                  isCollapsed={isCollapsed}
                  hasChildren={true}
                  isExpanded={isExpanded}
                  onClick={() => toggleGroup(route.id)}
                >
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
                        className={({ isActive }) =>
                          `sidebar-menu-item !border-0 inline-flex w-full items-center gap-3 px-4 py-2 text-sm normal-case ${
                            isActive ? 'is-active' : ''
                          }`
                        }
                      >
                        {child.icon && <Icon name={child.icon} size={16} />}
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </SidebarMenuItem>
              )
            }

            const to = route.path ? route.path : '.'
            return (
              <SidebarMenuItem
                key={route.id}
                label={route.label}
                icon={resolveIconName(route)}
                to={to}
                isCollapsed={isCollapsed}
                hasChildren={false}
              />
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
  )
}

export default StyleguideSidebar
