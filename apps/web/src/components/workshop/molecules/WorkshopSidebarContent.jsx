import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DocsToc, Icon } from '@kolkrabbi/kol-component'

const SidebarSection = ({ label, collapsed, onToggle, children, indent = false }) => (
  <div>
    <button type="button" className="shell-sidebar-toggle shell-sidebar-label kol-helper-10 text-meta" onClick={onToggle} style={{ justifyContent: 'space-between', paddingRight: '4px', paddingBottom: '12px' }}>
      <span>{label}</span>
      <Icon
        name="stroke-chevron-down"
        size={10}
        className={`stroke-[2.5] transition-transform ${collapsed ? '' : 'rotate-180'}`}
      />
    </button>
    {!collapsed && children}
  </div>
)

const WorkshopSidebarContent = ({ sections = [], links = [] }) => {
  const navigate = useNavigate()
  const [tocCollapsed, setTocCollapsed] = useState(false)
  const [docsCollapsed, setDocsCollapsed] = useState(false)
  const [actionsCollapsed, setActionsCollapsed] = useState(false)

  const hasSections = sections.length > 0
  const hasLinks = links.length > 0

  return (
    <div className="space-y-10 pr-4">
      {hasSections && (
        <SidebarSection label="On this page" collapsed={tocCollapsed} onToggle={() => setTocCollapsed(p => !p)}>
          <DocsToc toc={sections} />
        </SidebarSection>
      )}

      {hasLinks && (
        <SidebarSection label="Documentation" collapsed={docsCollapsed} onToggle={() => setDocsCollapsed(p => !p)}>
          <nav className="space-y-0">
            {links.map(({ id, label }) => (
              <Link key={id} to={`/workshop/docs/${id}`} className="shell-sidebar-link block kol-mono-14 text-body">
                {label}
              </Link>
            ))}
          </nav>
        </SidebarSection>
      )}

      <SidebarSection label="Quick actions" collapsed={actionsCollapsed} onToggle={() => setActionsCollapsed(p => !p)}>
        <div className="space-y-1">
          <button
            className="shell-sidebar-action kol-mono-14 text-body"
            type="button"
            onClick={() => navigate(-1)}
          >
            <Icon name="arrow-left" size={14} />
            Back
          </button>
          <Link to="/workshop/docs" className="shell-sidebar-action kol-mono-14 text-body">
            <Icon name="dashboard-book-open" size={14} />
            All documentation
          </Link>
          <Link to="/workshop" className="shell-sidebar-action kol-mono-14 text-body">
            <Icon name="layout" size={14} />
            Workshop home
          </Link>
          <button
            className="shell-sidebar-action kol-mono-14 text-body"
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
