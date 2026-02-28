import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon } from '@kol/ui'

const SidebarSection = ({ label, collapsed, onToggle, children }) => (
  <div>
    <button type="button" className="shell-sidebar-toggle shell-sidebar-label" onClick={onToggle}>
      <svg
        className={`h-3 w-3 transition-transform ${collapsed ? '' : 'rotate-90'}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      {label}
    </button>
    {!collapsed && children}
  </div>
)

const WorkshopDocLinks = ({ links }) => {
  const [docsCollapsed, setDocsCollapsed] = useState(false)
  const [actionsCollapsed, setActionsCollapsed] = useState(false)

  return (
    <div className="space-y-4">
      <SidebarSection label="Documentation" collapsed={docsCollapsed} onToggle={() => setDocsCollapsed(p => !p)}>
        <nav className="space-y-0">
          {links.map(({ id, label }) => (
            <Link key={id} to={`/docs/${id}`} className="shell-sidebar-link block">
              {label}
            </Link>
          ))}
        </nav>
      </SidebarSection>

      <Divider className="docs-divider" />

      <SidebarSection label="Quick actions" collapsed={actionsCollapsed} onToggle={() => setActionsCollapsed(p => !p)}>
        <div className="space-y-1">
          <Link to="/docs" className="shell-sidebar-action">
            <Icon name="arrow-left" size={14} />
            All documentation
          </Link>
          <Link to="/workshop" className="shell-sidebar-action">
            <Icon name="layout" size={14} />
            Workshop home
          </Link>
          <button
            className="shell-sidebar-action"
            type="button"
            onClick={() => navigator.clipboard.writeText(window.location.pathname)}
            title="Copy page path to clipboard"
          >
            <Icon name="copy" size={14} />
            Copy path
          </button>
        </div>
      </SidebarSection>
    </div>
  )
}

export default WorkshopDocLinks
