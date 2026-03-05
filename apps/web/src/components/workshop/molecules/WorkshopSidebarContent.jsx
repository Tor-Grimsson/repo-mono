import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon } from '@kol/ui'
import DocsToc from '../docs/DocsToc'

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

const WorkshopSidebarContent = ({ sections = [], links = [] }) => {
  const [tocCollapsed, setTocCollapsed] = useState(false)
  const [docsCollapsed, setDocsCollapsed] = useState(false)
  const [actionsCollapsed, setActionsCollapsed] = useState(false)

  const hasSections = sections.length > 0
  const hasLinks = links.length > 0

  return (
    <div className="space-y-4">
      {hasSections && (
        <>
          <SidebarSection label="On this page" collapsed={tocCollapsed} onToggle={() => setTocCollapsed(p => !p)}>
            <DocsToc toc={sections} />
          </SidebarSection>
          <Divider className="docs-divider" />
        </>
      )}

      {hasLinks && (
        <>
          <SidebarSection label="Documentation" collapsed={docsCollapsed} onToggle={() => setDocsCollapsed(p => !p)}>
            <nav className="space-y-0">
              {links.map(({ id, label }) => (
                <Link key={id} to={`/workshop/docs/${id}`} className="shell-sidebar-link block">
                  {label}
                </Link>
              ))}
            </nav>
          </SidebarSection>
          <Divider className="docs-divider" />
        </>
      )}

      <SidebarSection label="Quick actions" collapsed={actionsCollapsed} onToggle={() => setActionsCollapsed(p => !p)}>
        <div className="space-y-1">
          <Link to="/workshop/docs" className="shell-sidebar-action">
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

export default WorkshopSidebarContent
