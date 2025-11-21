import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tag, Divider, Icon } from '@kol/ui'
import {
  DocsHeader,
  DocsPageHeader,
  DocsLayout,
  DocsNavColumn,
  DocsMainColumn,
  DocsTocColumn,
  DocsArticle,
  DocsCodeBlock,
  DocsToc,
  DocsRailDrawer
} from '../../components/workshop/docs'
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'
import { buildDocHighlightTabs } from '../../utils/docsTabBuilder'

const documentationModules = import.meta.glob('@docs/documentation/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const capitalise = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value

const DocumentationReader = () => {
  const { docId } = useParams()

  const doc = useMemo(() => {
    return documentationInventory.find((d) => d.id === docId)
  }, [docId])

  const rawMarkdown = useMemo(() => {
    if (!doc) return null
    const path = Object.keys(documentationModules).find((p) =>
      p.endsWith(`${docId}.md`)
    )
    return path ? documentationModules[path] : null
  }, [doc, docId])

  const { sections, toc } = useMemo(() => {
    if (!rawMarkdown) return { sections: [], toc: [] }
    const parsed = parseDocsMarkdown(rawMarkdown)
    return { sections: parsed.sections, toc: parsed.toc }
  }, [rawMarkdown])

  // Group docs by major number for navigation
  const groupedDocs = useMemo(() => {
    const groups = {}
    documentationInventory.forEach((d) => {
      const majorMatch = d.id.match(/^(\d+)\./)
      if (majorMatch) {
        const major = majorMatch[1]
        if (!groups[major]) {
          groups[major] = []
        }
        groups[major].push(d)
      }
    })
    return groups
  }, [])

  const categoryLabels = {
    '0': 'Metadata',
    '1': 'Foundation',
    '2': 'Design System',
    '3': 'Components',
    '4': 'Pages',
    '5': 'Content',
    '6': 'Research',
    '7': 'Operations',
    '8': 'Decisions',
    '9': 'Future'
  }

  const docTabs = useMemo(() => buildDocHighlightTabs(), [])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredToc = useMemo(() => {
    if (!searchQuery.trim()) return toc
    const query = searchQuery.toLowerCase()
    return toc.filter(item =>
      item.heading.toLowerCase().includes(query)
    )
  }, [toc, searchQuery])

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
                    {major}.x.x {categoryLabels[major] || 'Other'}
                  </span>
                  <span className="docs-nav-group-count">({docs.length})</span>
                </button>
                {!isCollapsed && (
                  <div className="docs-nav-items">
                    {docs.map((d) => {
                      const isActive = d.id === docId
                      return (
                        <Link
                          key={d.id}
                          to={`/workshop/design-system/documentation/${d.id}`}
                          className={`docs-nav-item ${isActive ? 'active' : ''}`}
                          onClick={onNavigate}
                        >
                          <span className="docs-nav-item-id">{d.id}</span>
                          <span className="docs-nav-item-title">{d.title}</span>
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

  const renderTocColumnContent = (onNavigate) => (
    <div className="space-y-4">
      <div>
        {searchQuery.trim() ? (
          <>
            <p className="docs-sidebar-label">
              {filteredToc.length} {filteredToc.length === 1 ? 'result' : 'results'}
            </p>
            <DocsToc toc={filteredToc} onNavigate={onNavigate} />
          </>
        ) : (
          <>
            <p className="docs-sidebar-label">On this page</p>
            <DocsToc toc={toc} onNavigate={onNavigate} />
          </>
        )}
      </div>

      <Divider className="w-full opacity-40" />

      <div>
        <p className="docs-sidebar-label">Quick actions</p>
        <div className="space-y-1">
          <Link
            to="/workshop/design-system/documentation"
            className="docs-sidebar-action"
            onClick={onNavigate}
          >
            <Icon name="arrow-left" size={14} />
            All documentation
          </Link>
          <button
            className="docs-sidebar-action opacity-40 cursor-not-allowed"
            disabled
            title="Not yet implemented"
            type="button"
          >
            <Icon name="pen" size={14} />
            <span className="line-through">Open in editor</span>
          </button>
          <button
            className="docs-sidebar-action"
            type="button"
            onClick={() => {
              const path = `docs/documentation/${docId}.md`
              navigator.clipboard.writeText(path)
              if (onNavigate) onNavigate()
            }}
            title="Copy file path to clipboard"
          >
            <Icon name="copy" size={14} />
            Copy repo path
          </button>
        </div>
      </div>
    </div>
  )

  if (!doc) {
    return (
      <div className="fixed inset-0 flex flex-col">
        <DocsPageHeader tabs={docTabs} onSearch={setSearchQuery} searchQuery={searchQuery} />

        <div className="flex-1 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10 py-16">
            <DocsHeader title="Document Not Found" subtitle={`Could not find document: ${docId}`} />
            <p className="kol-mono-xs mt-6">
              <Link to="/workshop/design-system/documentation" className="text-accent-primary">
                ← Back to documentation
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-surface-primary">
      <DocsPageHeader tabs={docTabs} onSearch={setSearchQuery} searchQuery={searchQuery} />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="mx-auto w-full max-w-[1320px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 border-b border-fg-08 pb-4 lg:hidden">
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
                  <span className="kol-mono-xs text-fg-80">{`${toc.length} sections`}</span>
                </div>
                <Icon name="list" size={16} className="text-fg-64" />
              </button>
            </div>

            <DocsLayout className="mt-6">
              <DocsNavColumn className="hidden lg:block lg:w-[304px]">
                <div className="lg:sticky lg:top-4">
                  {renderNavigationGroups()}
                </div>
              </DocsNavColumn>

              <DocsMainColumn className="w-full lg:min-w-0">
                <DocsArticle>
                  {sections.map(({ heading, id, blocks }) => (
                    <section key={id} id={id} className="space-y-6 scroll-mt-32">
                      <h2>{heading}</h2>
                      {blocks.map((block, index) => {
                        const blockKey = `${id}-${block.type}-${index}`

                        switch (block.type) {
                          case 'heading3':
                            return (
                              <h3 key={blockKey} id={block.id}>
                                {block.content}
                              </h3>
                            )
                          case 'heading4':
                            return (
                              <h4 key={blockKey} id={block.id}>
                                {block.content}
                              </h4>
                            )
                          case 'paragraph':
                            return (
                              <p key={blockKey}>
                                {block.tokens ? renderInlineTokens(block.tokens, blockKey) : block.content}
                              </p>
                            )
                          case 'list': {
                            const listClass = block.ordered
                              ? 'docs-list docs-list--ordered tight'
                              : 'docs-list tight'
                            const ListComponent = block.ordered ? 'ol' : 'ul'
                            return (
                              <ListComponent key={blockKey} className={listClass}>
                                {block.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    {item.tokens ? renderInlineTokens(item.tokens, `${blockKey}-item-${itemIndex}`) : item.content || item}
                                  </li>
                                ))}
                              </ListComponent>
                            )
                          }
                          case 'code':
                            return (
                              <DocsCodeBlock
                                key={blockKey}
                                code={block.lines.join('\n')}
                              />
                            )
                          case 'blockquote':
                            return (
                              <blockquote key={blockKey} className="docs-callout">
                                {block.tokens ? renderInlineTokens(block.tokens, blockKey) : block.content}
                              </blockquote>
                            )
                          case 'divider':
                            return <Divider key={blockKey} className="w-full opacity-60" />
                          default:
                            return null
                        }
                      })}
                    </section>
                  ))}
                </DocsArticle>
              </DocsMainColumn>

              <DocsTocColumn className="hidden xl:block xl:w-[192px]">
                <div className="xl:sticky xl:top-4">
                  {renderTocColumnContent()}
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
        {renderTocColumnContent(closeAllDrawers)}
      </DocsRailDrawer>
    </div>
  )
}

export default DocumentationReader
