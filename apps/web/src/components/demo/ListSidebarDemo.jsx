import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Icon, Divider } from '@kol/ui'
import { STYLEGUIDE_ROUTES } from '../../data/styleguide/navigation.js'

const ensureDestination = (node) => {
  if (!node) return '/styleguide'
  if (node.path) {
    return node.path.startsWith('/styleguide') ? node.path : `/styleguide/${node.path}`
  }
  if (Array.isArray(node.children) && node.children.length > 0) {
    return ensureDestination(node.children[0])
  }
  return '/styleguide'
}

const ListNode = ({ node, depth, expandedMap, toggle }) => {
  const location = useLocation()
  const destination = ensureDestination(node)
  const isActive =
    location.pathname === destination || location.pathname.startsWith(`${destination}/`)
  const hasChildren = Array.isArray(node.children) && node.children.length > 0
  const paddingStyle = depth ? { paddingInlineStart: `${depth * 16}px` } : undefined
  const isExpanded = hasChildren ? Boolean(expandedMap?.[node.id]) : false

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          className={`flex w-full items-center gap-3 rounded px-3 py-2 transition-colors ${
            isActive ? 'bg-fg-04 text-auto' : 'text-fg-64 hover:bg-fg-02 hover:text-auto'
          }`}
          style={paddingStyle}
          onClick={() => toggle(node.id)}
          aria-expanded={isExpanded}
        >
          <Icon name={node.icon || 'component'} size={16} />
          <span className="kol-mono-text text-[14px]">{node.label}</span>
          <Icon
            name={isExpanded ? '12px-minus' : '12px-plus'}
            size={12}
            className="ml-auto"
          />
        </button>
        {isExpanded ? (
          <ul className="mt-2 space-y-1">
            {node.children.map((child) => (
              <ListNode
                key={child.id}
                node={child}
                depth={depth + 1}
                expandedMap={expandedMap}
                toggle={toggle}
              />
            ))}
          </ul>
        ) : null}
      </li>
    )
  }

  return (
    <li>
      <NavLink
        to={destination}
        className={({ isActive: navActive }) =>
          `flex items-center gap-3 rounded px-3 py-2 transition-colors ${
            navActive ? 'bg-fg-04 text-auto' : 'text-fg-64 hover:bg-fg-02 hover:text-auto'
          }`
        }
        style={paddingStyle}
      >
        <Icon name={node.icon || 'component'} size={16} />
        <span className="kol-mono-text text-[14px]">{node.label}</span>
      </NavLink>
    </li>
  )
}

const ListSidebarDemo = () => {
  const [expanded, setExpanded] = useState({ foundations: true })
  const routes = useMemo(() => STYLEGUIDE_ROUTES.slice(0, 3), [])
  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="flex flex-col gap-4 rounded border border-fg-08 bg-surface-secondary/30 p-6">
      <div className="space-y-2">
        <p className="kol-mono-xs uppercase text-fg-48 tracking-[0.2em]">
          List / Tree Pattern
        </p>
        <p className="kol-mono-sm-fine text-fg-64">
          Semantic &lt;nav&gt;&lt;ul&gt; tree. Indentation handled by padding utilities, no component wrappers.
        </p>
      </div>

      <Divider className="opacity-60" />

      <nav>
        <ul className="space-y-1">
          {routes.map((route) => (
            <ListNode
              key={route.id}
              node={route}
              depth={0}
              expandedMap={expanded}
              toggle={toggle}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default ListSidebarDemo
