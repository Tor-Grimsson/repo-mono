import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon, useTheme, Divider, ThemeToggleButton } from '@kol/ui'
import { WORKSHOP_ROUTES } from '../../../data/workshop/navigation'
import Wordmark from '../../ui/Wordmark'
import Logomark from '../../ui/Logomark'

const ICON_MAP = {
  'styleguide': 'styleguide',
  'home': 'styleguide',
  'design-system': 'styleguide',
  foundations: 'foundation',
  components: 'component',
  apparatus: 'interactive',
  chess: 'chess-pawn'
}

const resolveIconName = (route) => {
  if (route.icon) return route.icon
  return ICON_MAP[route.id] ?? 'arrow-downright'
}

const ensureStyleguidePath = (path = '') => {
  if (!path) return '/workshop'
  return path.startsWith('/workshop') ? path : `/workshop/${path}`
}

const computeDestination = (node) => {
  if (!node) return '/workshop'
  if (node.path !== undefined && node.path !== null) {
    return ensureStyleguidePath(node.path)
  }
  if (Array.isArray(node.children) && node.children.length > 0) {
    return computeDestination(node.children[0])
  }
  return '/workshop'
}

const isNodeActive = (node, normalizedPath) => {
  const destination = computeDestination(node)

  if (normalizedPath === destination) {
    return true
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    return node.children.some((child) => isNodeActive(child, normalizedPath))
  }

  return normalizedPath.startsWith(`${destination}/`)
}

const WorkshopSidebar = ({
  isCollapsed,
  setIsCollapsed,
  expandedItems,
  setExpandedItems,
  isSidebarLocked,
  setIsSidebarLocked
}) => {
  // WorkshopSidebar always requires router context - it's only used in WorkshopLayout
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const normalizedPath = location.pathname.replace(/\/$/, '')
  const collapseTimeoutRef = useRef(null)
  const lastExpandedRef = useRef({})
  const [activeOverlay, setActiveOverlay] = useState(null)
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 })

  const findActiveGroup = () =>
    WORKSHOP_ROUTES.find((route) => {
      const destination = computeDestination(route)
      if (normalizedPath === destination) {
        return true
      }

      return route.children?.some((child) => {
        const fullPath = `/workshop/${child.path}`
        return normalizedPath === fullPath || normalizedPath.startsWith(`${fullPath}/`)
      })
    })

  // Auto-expand active group on route change
  const activeGroup = findActiveGroup()
  const activeGroupId = activeGroup?.id

  useEffect(() => {
    if (!activeGroup) return
    const destination = computeDestination(activeGroup)
    if (normalizedPath === destination) return

    setExpandedItems((prev) => {
      if (prev[activeGroupId]) return prev
      return { ...prev, [activeGroupId]: true }
    })
  }, [activeGroup, activeGroupId, normalizedPath, setExpandedItems])

  // Close overlay on route change
  useEffect(() => {
    setActiveOverlay(null)
  }, [normalizedPath])

  // Handle mouse enter/leave for auto-collapse
  const handleMouseEnter = () => {}

  const handleMouseLeave = () => {}

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

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      if (next) {
        lastExpandedRef.current = expandedItems
        setExpandedItems({})
      } else {
        setExpandedItems(lastExpandedRef.current || {})
      }
      return next
    })
    setActiveOverlay(null)
  }

  const primaryIcons = useMemo(() => {
    return WORKSHOP_ROUTES.map((route) => {
      const destination = computeDestination(route)
      const isActive = normalizedPath === destination || normalizedPath.startsWith(`${destination}/`)

      return {
        id: route.id,
        label: route.label,
        icon: resolveIconName(route),
        to: destination,
        isActive,
        hasChildren: Boolean(route.children?.length)
      }
    })
  }, [normalizedPath])



      // LIST RENDER FLEX NODE

  const renderFlexNode = (node, depth = 0) => {
    const destination = computeDestination(node)
    const hasChildren = Array.isArray(node.children) && node.children.length > 0
    const isActive = isNodeActive(node, normalizedPath)
    const indentStyle = depth ? { marginInlineStart: `${depth * 24}px` } : undefined
    const isExpanded = hasChildren ? Boolean(expandedItems[node.id]) : false


     // CHILD LIST

    if (hasChildren) {
      const handleParentClick = (event) => {
        event.preventDefault()
        toggleGroup(node.id)
      }

      const handleToggleClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleGroup(node.id)
      }

      const handleToggleKey = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          event.stopPropagation()
          toggleGroup(node.id)
        }
      }

      return (
        <div key={node.id} className="flex flex-col gap-1" style={indentStyle}>
          <button
            type="button"
            className={[
              'flex h-9 w-full items-center gap-4 rounded-full px-3 transition-colors duration-200 text-left',
              isActive ? 'bg-fg-02 text-auto' : 'text-auto hover:bg-fg-012'
            ].join(' ')}
            onClick={handleParentClick}
          >
            <Icon
              name={resolveIconName(node)}
              size={16}
              className="text-current"
            />
            <span className="kol-mono-text text-[14px]">{node.label}</span>
            <span
              role="button"
              tabIndex={0}
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-current transition-colors duration-200 hover:bg-fg-012 focus:outline-none focus:ring-2 focus:ring-fg-08"
              onClick={handleToggleClick}
              onKeyDown={handleToggleKey}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
            >
              <Icon name={isExpanded ? '12px-minus' : '12px-plus'} size={12} className="text-current" />
            </span>
          </button>

          {isExpanded ? (
            <div className="flex flex-col gap-0">
              {node.children.map((child) => renderFlexNode(child, depth + 1))}
            </div>
          ) : null}
        </div>
      )
    }

    return (
      <NavLink
        key={node.id}
        to={destination}
        className={({ isActive: navActive }) => {
          const shouldBeActive = navActive
          return [
            'flex h-9 items-center gap-3 rounded-full px-3 transition-colors duration-200',
            shouldBeActive ? 'bg-fg-04 text-auto' : 'text-auto hover:bg-fg-012'
          ].join(' ')
        }}
        style={indentStyle}
      >
        <Icon
          name={resolveIconName(node)}
          size={16}
          className="text-current"
        />
        <span className="kol-mono-text text-[14px]">{node.label}</span>
      </NavLink>
    )
  }

  const handlePrimaryIconClick = (event, item) => {
    if (!isCollapsed) {
      return
    }
    event.preventDefault()

    if (activeOverlay === item.id) {
      // Clicking the same icon closes the overlay
      setActiveOverlay(null)
    } else if (item.hasChildren) {
      // Get the icon's position to place overlay below it
      const rect = event.currentTarget.getBoundingClientRect()
      setOverlayPosition({
        top: rect.bottom + 8,
        left: rect.left
      })
      setActiveOverlay(item.id)
    } else {
      // Navigate directly for items without children
      navigate(item.to)
      setActiveOverlay(null)
    }
  }

  return (
    <>
      {activeOverlay && isCollapsed ? (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[55]"
            onClick={() => setActiveOverlay(null)}
          />
          {/* Portal overlay positioned below the icon */}
          <div
            className="fixed z-[60] rounded p-3 bg-surface-secondary bg-opacity-hex-8"
            style={{
              top: overlayPosition.top,
              left: overlayPosition.left
            }}
          >
            {(() => {
              const activeRoute = WORKSHOP_ROUTES.find(r => r.id === activeOverlay)
              return activeRoute?.children ? (
                <>
                  <div className="mb-3 kol-helper-s text-fg-80">
                    {activeRoute.label}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {activeRoute.children.map((child) => {
                      const childPath = `/workshop/${child.path}`
                      const isActive = normalizedPath === childPath
                      return (
                        <button
                          key={child.id}
                          type="button"
                          className={`relative flex items-center gap-3 pl-5 text-left kol-helper-xs transition-opacity ${
                            isActive ? 'text-fg-96 opacity-100' : 'text-fg-48 opacity-60 hover:opacity-100'
                          }`}
                          onClick={() => {
                            navigate(childPath)
                            setActiveOverlay(null)
                          }}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-[5px] h-[3px] w-[3px] rounded-full bg-fg-64" />
                          )}
                          {child.label}
                        </button>
                      )
                    })}
                  </div>
                </>
              ) : null
            })()}
          </div>
        </>
      ) : null}

      <aside
        className="relative hidden h-full flex-1 flex-col transition-all duration-200 lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isCollapsed ? (
          <div className="flex w-full flex-1 flex-col items-center border-r border-fg-08 px-3 py-6 transition-all duration-200 lg:w-[96px]">
          <div className="flex flex-col items-center gap-6">
            <Link to="/" className="transition-opacity hover:opacity-80">
              <Logomark className="h-10 w-10" title="Kolkrabbi logomark" />
            </Link>

            <button
              type="button"
              aria-label="Expand sidebar"
              onClick={toggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-fg-02 hover:bg-fg-16"
            >
              <Icon name="chevron-left" size={16} />
            </button>
          </div>

          <Divider className="my-6 w-8" />

          <nav className="flex flex-1 flex-col items-center gap-3 overflow-y-auto">
            {primaryIcons.map((item) => (
              <div key={item.id} className="relative">
                <Link
                  to={item.to}
                  aria-label={item.label}
                  title={item.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-transparent transition-colors ${
                    item.isActive
                      ? 'bg-fg-04 text-fg-96'
                      : 'text-fg-48 hover:bg-fg-04 hover:text-fg-96'
                  }`}
                  onClick={(event) => handlePrimaryIconClick(event, item)}
                >
                  <Icon name={item.icon} size={18} />
                </Link>
              </div>
            ))}
          </nav>

          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-fg-0 text-fg-96'
                  : 'text-fg-48 hover:bg-fg-04 hover:text-fg-96'
              }`}
            >
              <Icon name="theme-toggle" size={18} className="text-current" />
            </button>
            <button
              type="button"
              className="toggle-switch border-0 bg-surface-primary"
              data-state={isSidebarLocked ? 'on' : 'off'}
              onClick={() => setIsSidebarLocked(!isSidebarLocked)}
              aria-label="Lock sidebar"
              aria-pressed={isSidebarLocked}
            >
              <span className="toggle-switch-indicator" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col border-r border-fg-08 px-6 py-10 transition-all duration-200 lg:h-full lg:w-[304px] lg:overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center transition-opacity hover:opacity-80">
              <Wordmark className="h-6 w-auto" />
            </Link>
            <button
              type="button"
              aria-label="Collapse sidebar"
              onClick={toggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-fg-02 hover:bg-fg-02"
            >
              <Icon name="chevron-right" size={16} />
            </button>
          </div>

          <div className="space-y-3 mt-8">
            <Link
              to="/workshop"
              className="inline-flex text-[48px] kol-display-lg uppercase transition-opacity hover:opacity-80"
              style={{ fontFamily: 'var(--kol-font-family-rgrot-tight)' }}
            >
              Workshop
            </Link>
            <p className="kol-mono-text text-[14px] text-fg-48">
              Tokens, components, and live previews for light &amp; dark parity.
            </p>
          </div>

          <Divider className="w-full my-10" />

          <nav className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
            {WORKSHOP_ROUTES.map((route) => renderFlexNode(route))}
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <ThemeToggleButton
              variant="compact"
              isToggled={theme === 'dark'}
              onClick={toggleTheme}
            />
            <button
              type="button"
              className="toggle-switch border-0 bg-surface-primary"
              data-state={isSidebarLocked ? 'on' : 'off'}
              onClick={() => setIsSidebarLocked(!isSidebarLocked)}
              aria-label="Lock sidebar"
              aria-pressed={isSidebarLocked}
            >
              <span className="toggle-switch-indicator" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </aside>
    </>
  )
}

export default WorkshopSidebar

export const WorkshopSidebarMobileNav = ({ isOpen, onClose, normalizedPath }) => {
  const themeContext = useTheme()
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = {}
    WORKSHOP_ROUTES.forEach((route) => {
      if (isNodeActive(route, normalizedPath)) {
        initial[route.id] = true
      }
    })
    return initial
  })

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    setExpandedGroups((prev) => {
      const next = { ...prev }
      WORKSHOP_ROUTES.forEach((route) => {
        if (isNodeActive(route, normalizedPath)) {
          next[route.id] = true
        }
      })
      return next
    })
  }, [normalizedPath])

  if (!isOpen) return null

  const toggleMobileGroup = (id) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 z-[70] bg-fg-0 opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[420px] flex-col bg-surface-primary px-5 py-6 shadow-2xl sm:px-6 sm:py-8">
        <div className="flex items-center justify-between gap-3">
          <Wordmark className="h-6 w-auto" />
          <div className="flex items-center gap-2">
            <ThemeToggleButton
              variant="compact"
              isToggled={themeContext.theme === 'dark'}
              onClick={themeContext.toggleTheme}
            />
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-fg-16 px-3 py-1 text-xs uppercase tracking-[0.16em] text-fg-64 hover:border-fg-24"
            >
              <Icon name="chevron-right" size={12} className="rotate-180 text-current" />
              Close
            </button>
          </div>
        </div>
        <Divider className="my-5" />
        <nav className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
          {WORKSHOP_ROUTES.map((route) => {
            const destination = computeDestination(route)
            const routeActive = isNodeActive(route, normalizedPath)
            const hasChildren = Boolean(route.children?.length)
            const isExpanded = expandedGroups[route.id]

            return (
              <div key={route.id} className="rounded-3xl border border-fg-08 p-3">
                <NavLink
                  to={destination}
                  onClick={onClose}
                  className={({ isActive }) => {
                    const shouldBeActive = isActive || routeActive
                    return [
                      'flex items-center justify-between rounded-2xl px-2 py-1.5 transition-colors',
                      shouldBeActive ? 'text-auto' : 'text-fg-72'
                    ].join(' ')
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="kol-helper-xxs uppercase tracking-[0.32em] text-fg-48">
                      Section
                    </span>
                    <span className="kol-mono-text text-[15px]">{route.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-fg-56">
                    {hasChildren ? (
                      <button
                        type="button"
                        aria-label={isExpanded ? `Collapse ${route.label}` : `Expand ${route.label}`}
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          toggleMobileGroup(route.id)
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-fg-12 hover:border-fg-16"
                      >
                        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={14} />
                      </button>
                    ) : null}
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fg-12">
                      <Icon name={resolveIconName(route)} size={16} />
                    </span>
                  </div>
                </NavLink>

                {hasChildren && isExpanded ? (
                  <div className="mt-3 space-y-2 border-l border-fg-08 pl-4">
                    {route.children.map((child) => {
                      const childDestination = ensureStyleguidePath(child.path)
                      const isChildActive =
                        normalizedPath === childDestination ||
                        normalizedPath.startsWith(`${childDestination}/`)

                      return (
                        <NavLink
                          key={child.id}
                          to={childDestination}
                          onClick={onClose}
                          className={({ isActive }) => {
                            const shouldBeActive = isActive || isChildActive
                            return [
                              'flex items-center justify-between rounded-full px-3 py-2 text-[13px] transition-colors',
                              shouldBeActive
                                ? 'bg-fg-04 text-auto'
                                : 'text-fg-64 hover:bg-fg-02'
                            ].join(' ')
                          }}
                        >
                          <span className="kol-mono-text text-[13px]">{child.label}</span>
                          <Icon name={child.icon ?? resolveIconName(child)} size={12} className="text-current" />
                        </NavLink>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
