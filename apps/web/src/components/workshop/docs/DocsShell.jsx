import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { documentationInventory } from '../../../data/workshop/documentationInventory'
import { buildDocHighlightTabs } from '../../../utils/docsTabBuilder'
import {
  extractDocNumber,
  cleanTitle,
  categoryLabels,
  groupDocsByMajor
} from '../../../utils/docsHelpers'
import { ShellLayout } from '@kol/ui/layout'

const DocsShell = () => {
  const { docId: activeDocId } = useParams()
  const groupedDocs = useMemo(() => groupDocsByMajor(documentationInventory), [])
  const docTabs = useMemo(() => buildDocHighlightTabs(), [])

  const docsSearchItems = useMemo(() =>
    documentationInventory.map((d) => ({ id: d.id, label: d.title, path: d.id, tags: d.metadata?.tags || [] })),
    []
  )

  const [collapsedGroups, setCollapsedGroups] = useState(() => {
    const initialState = {}
    Object.keys(groupedDocs).forEach((major) => {
      initialState[major] = true
    })
    return initialState
  })

  const toggleGroup = (major) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [major]: !prev[major]
    }))
  }

  const [navCollapsed, setNavCollapsed] = useState(false)

  const renderSidebar = ({ onNavigate } = {}) => (
    <div className="space-y-4">
      <button
        type="button"
        className="shell-sidebar-toggle shell-sidebar-label"
        onClick={() => setNavCollapsed(prev => !prev)}
      >
        <svg
          className={`h-3 w-3 transition-transform ${navCollapsed ? '' : 'rotate-90'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Documentation
      </button>

      {!navCollapsed && <div className="space-y-4">
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
                    {`0${major}`.slice(-2)} {categoryLabels[major] || 'Other'}
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
                          to={`/docs/${d.id}`}
                          className={`shell-nav-item ${isActive ? 'active' : ''}`}
                          onClick={onNavigate}
                        >
                          <span className="shell-nav-item-id">{extractDocNumber(d.id)}</span>
                          <span className="shell-nav-item-title">{cleanTitle(d.title, d.id)}</span>
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

  return (
    <ShellLayout
      routes={docTabs}
      basePath="/docs"
      brandLogoSrc="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/workshop/workshop-docs/workshop-docs.svg"
      brandLogoAlt="Docs"
      renderSidebar={renderSidebar}
      searchItems={docsSearchItems}
    />
  )
}

export default DocsShell
