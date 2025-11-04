import { useEffect, useMemo, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon, useTheme, Divider, ThemeToggleButton } from '@kol/ui'
import { STYLEGUIDE_ROUTES } from '../../../data/styleguide/navigation'
import Wordmark from '../../ui/Wordmark'
import Logomark from '../../ui/Logomark'

const ICON_MAP = {
  'styleguide': 'styleguide',
  foundations: 'foundation',
  components: 'component',
  apparatus: 'interactive'
}

const resolveIconName = (route) => {
  if (route.icon) return route.icon
  return ICON_MAP[route.id] ?? 'arrow-downright'
}

const ensureStyleguidePath = (path = '') => {
  if (!path) return '/styleguide'
  return path.startsWith('/styleguide') ? path : `/styleguide/${path}`
}

const computeDestination = (node) => {
  if (!node) return '/styleguide'
  if (node.path !== undefined && node.path !== null) {
    return ensureStyleguidePath(node.path)
  }
  if (Array.isArray(node.children) && node.children.length > 0) {
    return computeDestination(node.children[0])
  }
  return '/styleguide'
}

const isNodeActive = (node, normalizedPath) => {
  const destination = computeDestination(node)

  if (node.id === 'styleguide') {
    return normalizedPath === '/styleguide'
  }

  if (normalizedPath === destination) {
    return true
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    return node.children.some((child) => isNodeActive(child, normalizedPath))
  }

  return normalizedPath.startsWith(`${destination}/`)
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
  const lastExpandedRef = useRef({})

  const findActiveGroup = () =>
    STYLEGUIDE_ROUTES.find((route) => {
      const destination = computeDestination(route)
      if (normalizedPath === destination) {
        return true
      }

      return route.children?.some((child) => {
        const fullPath = `/styleguide/${child.path}`
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
  }

  const primaryIcons = useMemo(() => {
    return STYLEGUIDE_ROUTES.map((route) => {
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
    const hasChildren = Array.isArray(node.children) && node.children.length > 0
    const destination = computeDestination(node)
    const isActive = isNodeActive(node, normalizedPath)
    const indentStyle = depth ? { marginInlineStart: `${depth * 24}px` } : undefined
    const isExpanded = hasChildren ? Boolean(expandedItems[node.id]) : false


     // CHILD LIST

    if (hasChildren) {
      const handleParentClick = (event) => {
        if (normalizedPath === destination) {
          event.preventDefault()
          toggleGroup(node.id)
          return
        }

        if (isExpanded) {
          setExpandedItems((prev) => {
            if (!prev[node.id]) return prev
            const next = { ...prev }
            delete next[node.id]
            return next
          })
        }
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
          <NavLink
            to={destination}
            className={({ isActive: navActive }) =>
              [
                'flex h-9 w-full items-center gap-3 rounded-full px-3 transition-colors duration-200',
                (navActive || isActive) ? 'bg-fg-02 text-auto' : 'text-auto hover:bg-fg-012'
              ].join(' ')
            }
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
          </NavLink>

          {isExpanded ? (
            <div className="flex flex-col gap-1">
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
        className={({ isActive: navActive }) =>
          [
            'flex h-9 items-center gap-3 rounded-full px-3 transition-colors duration-200',
            navActive ? 'bg-fg-04 text-auto' : 'text-auto hover:bg-fg-012'
          ].join(' ')
        }
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
    setIsCollapsed(false)
    if (item.hasChildren) {
      setExpandedItems((prev) => ({ ...prev, [item.id]: true }))
    } else {
      navigate(item.to)
    }
  }

  return (
    <aside
      className="relative flex h-full flex-1 flex-col lg:sticky lg:top-0 lg:h-screen lg:w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isCollapsed ? (
        <div className="flex w-[96px] flex-1 flex-col items-center border-r border-fg-08 px-3 py-6 lg:h-full">
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
              <Link
                key={item.id}
                to={item.to}
                aria-label={item.label}
                title={item.label}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-transparent transition-colors ${
                  item.isActive
                    ? 'bg-fg-16 text-fg-96'
                    : 'text-fg-48 hover:bg-fg-04 hover:text-fg-96'
                }`}
                onClick={(event) => handlePrimaryIconClick(event, item)}
              >
                <Icon name={item.icon} size={18} />
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-fg-16 text-fg-96'
                  : 'text-fg-48 hover:bg-fg-04 hover:text-fg-96'
              }`}
            >
              <Icon name="theme-toggle" size={18} className="text-current" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-[304px] flex-1 flex-col border-r border-fg-08 px-6 py-10 lg:h-full lg:overflow-y-auto">
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
              to="/styleguide"
              className="inline-flex text-[48px] kol-display-lg uppercase transition-opacity hover:opacity-80"
              style={{ fontFamily: 'var(--kol-font-family-rgrot-tight)' }}
            >
              Styleguide
            </Link>
            <p className="kol-mono-text text-[14px] text-fg-48">
              Tokens, components, and live previews for light &amp; dark parity.
            </p>
          </div>

          <Divider className="w-full my-10" />

          <nav className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
            {STYLEGUIDE_ROUTES.map((route) => renderFlexNode(route))}
          </nav>

          <div className="mt-6 flex justify-start">
            <ThemeToggleButton
              variant="compact"
              isToggled={theme === 'dark'}
              onClick={toggleTheme}
            />
          </div>
        </div>
      )}
    </aside>
  )
}

export default StyleguideSidebar
