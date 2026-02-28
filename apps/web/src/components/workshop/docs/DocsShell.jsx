import { createContext, useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { documentationInventory } from '../../../data/workshop/documentationInventory'
import { buildDocHighlightTabs } from '../../../utils/docsTabBuilder'
import {
  extractDocNumber,
  cleanTitle,
  categoryLabels,
  groupDocsByMajor
} from '../../../utils/docsHelpers'
import { ShellHeader, ShellDrawer, ShellSearchOverlay } from '@kol/ui/layout'
import DocsLayout, { DocsNavColumn, DocsMainColumn, DocsTocColumn } from './DocsLayout'

export const DocsTocContext = createContext(null)

const DocsShell = () => {
  const { docId: activeDocId } = useParams()
  const [tocContent, setTocContent] = useState(null)
  const groupedDocs = useMemo(() => groupDocsByMajor(documentationInventory), [])
  const docTabs = useMemo(() => buildDocHighlightTabs(), [])

  const docsSearchItems = useMemo(() =>
    documentationInventory.map((d) => ({ id: d.id, label: d.title, path: d.id, tags: d.metadata?.tags || [] })),
    []
  )

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

  const [navCollapsed, setNavCollapsed] = useState(false)
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (!isNavDrawerOpen) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsNavDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isNavDrawerOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeAllDrawers = () => setIsNavDrawerOpen(false)

  const renderNavigationGroups = (onNavigate) => (
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
    <DocsTocContext.Provider value={setTocContent}>
    <div className="fixed inset-0 flex flex-col bg-surface-primary">
      <ShellHeader
        brandLogoSrc="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/workshop/workshop-docs/workshop-docs.svg"
        brandLogoAlt="Docs"
        routes={docTabs}
        basePath="/docs"
        onMenuOpen={() => setIsNavDrawerOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        onSidebarToggle={() => setSidebarCollapsed(p => !p)}
      />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
          <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8 pb-16">
            <DocsLayout>
              {!sidebarCollapsed && (
                <DocsNavColumn className="hidden lg:block lg:w-[256px]">
                  <div className="shell-sidebar-sticky lg:sticky lg:top-6 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
                    {renderNavigationGroups()}
                  </div>
                </DocsNavColumn>
              )}

              <DocsMainColumn className="w-full lg:min-w-0">
                <Outlet />
              </DocsMainColumn>

              <DocsTocColumn className="hidden xl:block xl:w-[256px]">
                <div className="shell-sidebar-sticky xl:sticky xl:top-6 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto">
                  {tocContent}
                </div>
              </DocsTocColumn>
            </DocsLayout>
          </div>
        </div>
      </div>

      <ShellDrawer
        isOpen={isNavDrawerOpen}
        onClose={closeAllDrawers}
        anchor="left"
      >
        {renderNavigationGroups(closeAllDrawers)}
      </ShellDrawer>

      <ShellSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={docsSearchItems}
        basePath="/docs"
      />
    </div>
    </DocsTocContext.Provider>
  )
}

export default DocsShell
