import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@kol/ui'
import { documentationInventory } from '../../../data/workshop/documentationInventory'
import { buildDocHighlightTabs } from '../../../utils/docsTabBuilder'
import {
  extractDocNumber,
  cleanTitle,
  categoryLabels,
  groupDocsByMajor
} from '../../../utils/docsHelpers'
import DocsPageHeader from './DocsPageHeader'
import DocsLayout, { DocsNavColumn, DocsMainColumn, DocsTocColumn } from './DocsLayout'
import DocsRailDrawer from './DocsRailDrawer'

/**
 * Shared layout shell for documentation pages
 * Handles: header, navigation sidebar, mobile drawers, state management
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content area
 * @param {React.ReactNode} props.tocContent - Right sidebar content
 * @param {string} props.activeDocId - Currently active doc ID (for nav highlighting)
 * @param {number} props.tocCount - Number of TOC items (for mobile button)
 * @param {function} props.onSearch - Search handler (receives query string)
 * @param {string} props.searchQuery - Current search query value
 */
const DocsShell = ({
  children,
  tocContent,
  activeDocId,
  tocCount = 0,
  onSearch,
  searchQuery = ''
}) => {
  const groupedDocs = useMemo(() => groupDocsByMajor(documentationInventory), [])
  const docTabs = useMemo(() => buildDocHighlightTabs(), [])

  // Initialize collapsed state - all groups collapsed by default
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

  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const [isTocDrawerOpen, setIsTocDrawerOpen] = useState(false)

  useEffect(() => {
    if (!isNavDrawerOpen && !isTocDrawerOpen) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsNavDrawerOpen(false)
        setIsTocDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isNavDrawerOpen, isTocDrawerOpen])

  const closeAllDrawers = () => {
    setIsNavDrawerOpen(false)
    setIsTocDrawerOpen(false)
  }

  const renderNavigationGroups = (onNavigate) => (
    <div className="space-y-4">
      <h2 className="docs-sidebar-label">Documentation</h2>

      <div className="space-y-4">
        {Object.entries(groupedDocs)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([major, docs]) => {
            const isCollapsed = collapsedGroups[major]
            return (
              <div key={major} className="docs-nav-group">
                <button
                  type="button"
                  className="docs-nav-group-header w-full text-left"
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
                  <span className="docs-nav-group-count">({docs.length})</span>
                </button>
                {!isCollapsed && (
                  <div className="docs-nav-items">
                    {docs.map((d) => {
                      const isActive = d.id === activeDocId
                      return (
                        <Link
                          key={d.id}
                          to={`/workshop/design-system/documentation/${d.id}`}
                          className={`docs-nav-item ${isActive ? 'active' : ''}`}
                          onClick={onNavigate}
                        >
                          <span className="docs-nav-item-id">{extractDocNumber(d.id)}</span>
                          <span className="docs-nav-item-title">{cleanTitle(d.title, d.id)}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 flex flex-col bg-surface-primary">
      <DocsPageHeader tabs={docTabs} onSearch={onSearch} searchQuery={searchQuery} />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
          <div className="mx-auto w-full max-w-[1400px] px-10 pb-16 pt-6">
            {/* Mobile navigation buttons */}
            <div className="flex flex-wrap items-center gap-3 border-b border-fg-08 pb-4 px-4 sm:px-6 lg:hidden">
              <button
                type="button"
                onClick={() => setIsNavDrawerOpen(true)}
                className="flex flex-1 items-center justify-between rounded-full border border-fg-12 bg-fg-02 px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-fg-24"
              >
                <div className="flex flex-col">
                  <span className="kol-helper-xs uppercase tracking-[0.18em] text-fg-48">Menu</span>
                  <span className="kol-mono-xs text-fg-80">Documentation</span>
                </div>
                <Icon name="chevron-right" size={16} className="text-fg-64" />
              </button>
              <button
                type="button"
                onClick={() => setIsTocDrawerOpen(true)}
                className="flex flex-1 items-center justify-between rounded-full border border-fg-12 bg-fg-02 px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-fg-24"
              >
                <div className="flex flex-col">
                  <span className="kol-helper-xs uppercase tracking-[0.18em] text-fg-48">On this page</span>
                  <span className="kol-mono-xs text-fg-80">{`${tocCount} sections`}</span>
                </div>
                <Icon name="list" size={16} className="text-fg-64" />
              </button>
            </div>

            <DocsLayout className="mt-6">
              <DocsNavColumn className="hidden lg:block lg:w-[256px]">
                <div className="lg:sticky lg:top-6">
                  {renderNavigationGroups()}
                </div>
              </DocsNavColumn>

              <DocsMainColumn className="w-full lg:min-w-0">
                {children}
              </DocsMainColumn>

              <DocsTocColumn className="hidden xl:block xl:w-[256px]">
                <div className="xl:sticky xl:top-6">
                  {typeof tocContent === 'function' ? tocContent() : tocContent}
                </div>
              </DocsTocColumn>
            </DocsLayout>
          </div>
        </div>
      </div>

      <DocsRailDrawer
        isOpen={isNavDrawerOpen}
        onClose={closeAllDrawers}
        title="Documentation"
        anchor="left"
      >
        {renderNavigationGroups(closeAllDrawers)}
      </DocsRailDrawer>

      <DocsRailDrawer
        isOpen={isTocDrawerOpen}
        onClose={closeAllDrawers}
        title="On this page"
        anchor="right"
      >
        {typeof tocContent === 'function' ? tocContent(closeAllDrawers) : tocContent}
      </DocsRailDrawer>
    </div>
  )
}

export default DocsShell
