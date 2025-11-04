import { useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon, Divider } from '@kol/ui'
import { STYLEGUIDE_ROUTES } from '../../data/styleguide/navigation.js'

const ICON_MAP = {
  styleguide: 'styleguide',
  foundations: 'foundation',
  components: 'component'
}

const getIconName = (node) => {
  if (node?.icon) return node.icon
  return ICON_MAP[node?.id] || 'styleguide'
}

const computeDestination = (node) => {
  if (!node) return '/styleguide'
  if (node.path) {
    return node.path.startsWith('/styleguide') ? node.path : `/styleguide/${node.path}`
  }
  if (Array.isArray(node.children) && node.children.length > 0) {
    return computeDestination(node.children[0])
  }
  return '/styleguide'
}

const FlexSidebarRow = ({
  node,
  depth,
  expanded,
  toggleGroup,
  isActive
}) => {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0
  const indentPx = depth * 16
  const commonClasses = [
    'flex items-center gap-3 rounded transition-colors duration-200',
    'px-3 py-2'
  ]
  const activeClasses = isActive
    ? 'bg-fg-04 text-auto'
    : 'text-fg-64 hover:text-auto hover:bg-fg-02'

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => toggleGroup(node.id)}
          className={[...commonClasses, activeClasses].join(' ')}
          style={{ paddingInlineStart: `${indentPx}px` }}
        >
          <Icon name={getIconName(node)} size={16} />
          <span className="kol-mono-text text-[14px]">{node.label}</span>
          <Icon
            name={expanded ? '12px-minus' : '12px-plus'}
            size={12}
            className="ml-auto"
          />
        </button>

        {expanded ? (
          <div className="flex flex-col gap-1">
            {node.children.map((child) => (
              <FlexSidebarChild
                key={child.id}
                node={child}
                depth={depth + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <NavLink
      to={computeDestination(node)}
      className={({ isActive: navActive }) =>
        [
          ...commonClasses,
          navActive ? 'bg-fg-04 text-auto' : 'text-fg-64 hover:text-auto hover:bg-fg-02'
        ].join(' ')
      }
      style={{ paddingInlineStart: `${indentPx}px` }}
    >
      <Icon name={getIconName(node)} size={16} />
      <span className="kol-mono-text text-[14px]">{node.label}</span>
    </NavLink>
  )
}

const FlexSidebarChild = ({ node, depth }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const destination = computeDestination(node)
  const isActive = location.pathname === destination || location.pathname.startsWith(`${destination}/`)
  const indentPx = depth * 16
  const hasChildren = Array.isArray(node.children) && node.children.length > 0

  if (hasChildren) {
    const [expanded, setExpanded] = useState(false)
    return (
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={[
            'flex items-center gap-3 rounded px-3 py-2 transition-colors duration-200',
            isActive ? 'bg-fg-04 text-auto' : 'text-fg-64 hover:text-auto hover:bg-fg-02'
          ].join(' ')}
          style={{ paddingInlineStart: `${indentPx}px` }}
        >
          <Icon name={getIconName(node)} size={16} />
          <span className="kol-mono-text text-[14px]">{node.label}</span>
          <Icon
            name={expanded ? '12px-minus' : '12px-plus'}
            size={12}
            className="ml-auto"
          />
        </button>
        {expanded ? (
          <div className="flex flex-col gap-1">
            {node.children.map((child) => (
              <FlexSidebarChild
                key={child.id}
                node={child}
                depth={depth + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => navigate(destination)}
      className={[
        'flex items-center gap-3 rounded px-3 py-2 text-left transition-colors duration-200',
        isActive ? 'bg-fg-04 text-auto' : 'text-fg-64 hover:text-auto hover:bg-fg-02'
      ].join(' ')}
      style={{ paddingInlineStart: `${indentPx}px` }}
    >
      <Icon name={getIconName(node)} size={16} />
      <span className="kol-mono-text text-[14px]">{node.label}</span>
    </button>
  )
}

const useFlattenedRoutes = () => {
  const location = useLocation()
  return useMemo(() => {
    return STYLEGUIDE_ROUTES.map((route) => {
      const destination = computeDestination(route)
      const isActive =
        location.pathname === destination || location.pathname.startsWith(`${destination}/`)
      return {
        ...route,
        destination,
        isActive
      }
    })
  }, [location.pathname])
}

const FlexSidebar = () => {
  const [expandedGroups, setExpandedGroups] = useState({})
  const flattened = useFlattenedRoutes()
  const toggleGroup = (id) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev?.[id] }))
  }

  return (
    <div className="flex flex-col gap-4 rounded border border-fg-08 bg-surface-secondary/20 p-6">
      <div className="space-y-2">
        <p className="kol-mono-xs uppercase text-fg-48 tracking-[0.2em]">
          Flex Sidebar Prototype
        </p>
        <p className="kol-mono-sm-fine text-fg-64">
          Icons and labels align via flex rows. Indentation is handled with padding per depth level.
        </p>
      </div>

      <Divider className="opacity-60" />

      <nav className="flex flex-col gap-1">
        {flattened.map((node) => (
          <FlexSidebarRow
            key={node.id}
            node={node}
            depth={0}
            expanded={Boolean(expandedGroups[node.id])}
            toggleGroup={toggleGroup}
            isActive={node.isActive}
          />
        ))}
      </nav>
    </div>
  )
}

export default FlexSidebar
