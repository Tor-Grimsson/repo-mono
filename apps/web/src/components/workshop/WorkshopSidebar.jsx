import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShellSidebar } from '@kol/ui/layout'
import { Icon } from '@kol/ui'
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'
import {
  extractDocNumber,
  cleanTitle,
  categoryLabels,
  groupDocsByMajor
} from '../../utils/docsHelpers'

const DocsSidebar = ({ onNavigate, collapsed, onToggle }) => {
  const location = useLocation()
  const activeDocId = useMemo(() => {
    const match = location.pathname.match(/^\/workshop\/docs\/(.+)$/)
    return match ? match[1] : null
  }, [location.pathname])

  const groupedDocs = useMemo(() => groupDocsByMajor(documentationInventory), [])

  const [collapsedGroups, setCollapsedGroups] = useState(() => {
    const initialState = {}
    Object.keys(groupedDocs).forEach((major) => {
      initialState[major] = true
    })
    return initialState
  })

  // Auto-expand the group containing the active doc
  useEffect(() => {
    if (!activeDocId) return
    for (const [major, docs] of Object.entries(groupedDocs)) {
      if (docs.some(d => d.id === activeDocId)) {
        setCollapsedGroups(prev => ({ ...prev, [major]: false }))
        break
      }
    }
  }, [activeDocId, groupedDocs])

  const toggleGroup = (major) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [major]: !prev[major]
    }))
  }

  return (
    <div className="space-y-4">
      <div className="shell-sidebar-toggle shell-sidebar-label" style={{ justifyContent: 'space-between', paddingRight: '4px' }}>
        <Link to="/workshop/docs" className="shell-sidebar-label" onClick={(e) => {
          if (collapsed && onToggle) onToggle()
          if (onNavigate) onNavigate(e)
        }}>
          Documentation
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand Documentation' : 'Collapse Documentation'}
          className="flex items-center justify-center"
          style={{ height: '16.5px', marginBottom: '8px' }}
        >
          <Icon
            name="stroke-chevron-down"
            size={10}
            className={`stroke-[2.5] transition-transform ${collapsed ? '' : 'rotate-180'}`}
          />
        </button>
      </div>

      {!collapsed && <div className="space-y-4">
        {Object.entries(groupedDocs)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([major, docs]) => {
            const isCollapsed = collapsedGroups[major]
            return (
              <div key={major} className="shell-nav-group">
                <button
                  type="button"
                  className="shell-nav-group-header w-full text-left"
                  onClick={() => toggleGroup(major)}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className={`h-3 w-3 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {categoryLabels[major] || 'Other'}
                  </span>
                  <span className="shell-nav-group-count">({docs.length})</span>
                </button>
                {!isCollapsed && (
                  <div className="shell-nav-items">
                    {docs.map((d) => {
                      const isActive = d.id === activeDocId
                      return (
                        <Link
                          key={d.id}
                          to={`/workshop/docs/${d.id}`}
                          className={`shell-nav-item shell-nav-item-doc ${isActive ? 'active' : ''}`}
                          onClick={onNavigate}
                        >
                          <span className="shell-nav-item-title">{cleanTitle(d.title, d.id)}</span>
                          <span className="shell-nav-item-id">{extractDocNumber(d.id)}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
      </div>}
    </div>
  )
}

const WorkshopSidebar = ({ onNavigate }) => {
  const location = useLocation()
  const [workshopCollapsed, setWorkshopCollapsed] = useState(false)
  const [docsCollapsed, setDocsCollapsed] = useState(true)

  // Auto-expand Documentation section when on a docs route
  useEffect(() => {
    if (location.pathname.startsWith('/workshop/docs')) {
      setDocsCollapsed(false)
    }
  }, [location.pathname])

  const workshopRoutes = useMemo(
    () => WORKSHOP_ROUTES.filter(r => r.id !== 'docs'),
    []
  )

  return (
    <div className="space-y-6">
      <ShellSidebar
        routes={workshopRoutes}
        basePath="/workshop"
        onNavigate={onNavigate}
        label="Workshop"
        labelTo="/workshop"
        collapsed={workshopCollapsed}
        onToggle={() => setWorkshopCollapsed(p => !p)}
      />
      <DocsSidebar
        onNavigate={onNavigate}
        collapsed={docsCollapsed}
        onToggle={() => setDocsCollapsed(p => !p)}
      />
    </div>
  )
}

export default WorkshopSidebar
