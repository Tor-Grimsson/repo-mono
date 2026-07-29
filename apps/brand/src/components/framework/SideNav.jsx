import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon } from '@kolkrabbi/kol-icons'
import { ThemeToggle } from '@kolkrabbi/kol-framework'
import { useScrollSpy } from '@kol/component'
import { NAV_TREE, getActivePage } from './sidebars.config'

/* Walk the active page's children and return all leaf section ids (for scroll-spy). */
function collectSectionIds(node) {
  if (!node?.children) return []
  const ids = []
  const walk = (children) => {
    for (const c of children) {
      if (c.id && !c.to) ids.push(c.id)
      if (c.children) walk(c.children)
    }
  }
  walk(node.children)
  return ids
}

const linkBase = 'kol-sidenav-link kol-helper-10 block relative py-[4px] no-underline transition-colors duration-150'
const linkCls = `${linkBase} text-body hover:text-emphasis`
const linkActiveCls = `${linkBase} is-active`

/* Walk the children tree; return true if any leaf matches activeSectionId. */
function hasActiveDescendant(children, activeSectionId) {
  if (!activeSectionId) return false
  for (const c of children ?? []) {
    if (c.id === activeSectionId) return true
    if (c.children && hasActiveDescendant(c.children, activeSectionId)) return true
  }
  return false
}

const leafStyle = (indent) => ({
  paddingLeft: indent,
  '--kol-sidenav-dot-left': `${indent - 14}px`,
})

function SectionLeaf({ leaf, basePath, isActive, indent }) {
  return (
    <li>
      <Link
        to={`${basePath}#${leaf.id}`}
        className={isActive ? linkActiveCls : linkCls}
        style={leafStyle(indent)}
      >
        {leaf.label}
      </Link>
    </li>
  )
}

function RouteLeaf({ leaf, indent }) {
  return (
    <li>
      <NavLink
        to={leaf.to}
        end
        className={({ isActive }) => (isActive ? linkActiveCls : linkCls)}
        style={leafStyle(indent)}
      >
        {leaf.label}
      </NavLink>
    </li>
  )
}

function GroupNode({ group, basePath, activeSectionId, indent }) {
  const isAncestor = hasActiveDescendant(group.children, activeSectionId)
  return (
    <li>
      <div
        className={`kol-sidenav-group kol-helper-10 uppercase ${isAncestor ? 'text-emphasis' : 'text-subtle'}`}
        style={{ paddingLeft: indent }}
      >
        {group.label}
      </div>
      <ul className="kol-sidenav-list">
        {group.children.map((child, i) => (
          <ChildNode
            key={child.id ?? child.to ?? `g-${i}`}
            child={child}
            basePath={basePath}
            activeSectionId={activeSectionId}
            indent={indent + 12}
          />
        ))}
      </ul>
    </li>
  )
}

function ChildNode({ child, basePath, activeSectionId, indent }) {
  if (child.children) {
    return <GroupNode group={child} basePath={basePath} activeSectionId={activeSectionId} indent={indent} />
  }
  if (child.to) {
    return <RouteLeaf leaf={child} indent={indent} />
  }
  if (child.id) {
    return (
      <SectionLeaf
        leaf={child}
        basePath={basePath}
        isActive={activeSectionId === child.id}
        indent={indent}
      />
    )
  }
  return null
}

export default function SideNav({ drawerOpen = false, onCloseDrawer }) {
  const { pathname } = useLocation()
  const activePage = getActivePage(pathname)
  const sectionIds = activePage ? collectSectionIds(activePage) : []
  const onPageRoot = activePage && pathname === activePage.to
  const activeSectionId = useScrollSpy(onPageRoot ? sectionIds : [])

  return (
    <aside
      className={`kol-sidenav sticky top-0 self-start h-dvh flex flex-col border-r border-fg-08 z-20 bg-surface-primary${drawerOpen ? ' is-drawer-open' : ''}`}
    >
      <div className="kol-sidenav-scroll flex-1 flex flex-col justify-between overflow-y-auto pt-4 pb-4 [scrollbar-width:thin]">
        <ul className="kol-sidenav-tree flex flex-col gap-[2px]">
          {NAV_TREE.map((page) => {
            const isActivePage = activePage?.id === page.id
            return (
              <li key={page.id}>
                <NavLink
                  to={page.to}
                  end={page.to === '/'}
                  className={({ isActive }) =>
                    `kol-sidenav-hop kol-helper-12 relative flex items-center gap-3 py-2 pr-10 pl-6 no-underline${isActive ? ' is-active' : ''}`
                  }
                >
                  <span className="kol-sidenav-hop-icon inline-flex items-center justify-center w-5 h-5 shrink-0" aria-hidden="true">
                    <Icon name={page.icon} size={16} />
                  </span>
                  <span className="kol-sidenav-hop-label flex-1 min-w-0">{page.label}</span>
                </NavLink>

                {isActivePage && page.children && (
                  <ul className="kol-sidenav-list mb-2 flex flex-col gap-2">
                    {page.children.map((child, i) => (
                      <ChildNode
                        key={child.id ?? child.to ?? `g-${i}`}
                        child={child}
                        basePath={page.to}
                        activeSectionId={activeSectionId}
                        indent={56}
                      />
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex px-6">
          <ThemeToggle variant="button" size="md" />
        </div>
      </div>

      <div className="kol-sidenav-footer flex items-center pl-6 pr-4 h-14 border-t border-fg-08 min-w-0">
        <a
          href="https://kolkrabbi.io"
          target="_blank"
          rel="noopener"
          className="kol-helper-10 !font-normal no-underline group whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
        >
          <span className="text-body group-hover:text-emphasis">Kolkrabbi Vinnustofa</span>
          <span className="text-meta group-hover:text-emphasis"> · {new Date().getFullYear()}</span>
        </a>
      </div>
    </aside>
  )
}
