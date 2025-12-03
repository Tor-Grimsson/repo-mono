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

const documentationModules = import.meta.glob(
  ['@docs/documentation/0[0-7]-*/**/*.md'],
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
)

const capitalise = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value

// Check if ID is from an actual index.md file (e.g., "00-metadata-index", "foundry-index")
// These don't have version numbers (dots), unlike "0.0.2-master-index"
const isIndexFile = (id) => id.endsWith('-index') && !id.includes('.')

// Map nested index files to their version prefix
const nestedIndexVersions = {
  'foundry': '4.5.0',
  'collections': '4.6.0'
}

const extractDocNumber = (id) => {
  // Handle index files - show version number for sorting
  if (isIndexFile(id)) {
    // Main section index: "04-pages-index" → "4.0.0"
    const folderMatch = id.match(/^(\d+)-[a-z-]+-index$/)
    if (folderMatch) {
      const major = folderMatch[1].replace(/^0/, '')
      return `${major}.0.0`
    }
    // Nested index: "foundry-index" → "4.5.0"
    const nestedMatch = id.match(/^([a-z]+)-index$/)
    if (nestedMatch && nestedIndexVersions[nestedMatch[1]]) {
      return nestedIndexVersions[nestedMatch[1]]
    }
    return 'Index'
  }
  // Extract version number from ID like "0.0.1-writing-guidelines" → "0.0.1"
  const match = id.match(/^(\d+\.\d+\.\d+)/)
  return match ? match[1] : id
}

// Main site pages that should have "Kolkrabbi" prefix
const kolkrabbiPages = ['4.1.0', '4.2.0', '4.3.0', '4.4.0']

// Subsection prefixes based on version range
const subsectionPrefixes = {
  '4.5': 'Foundry',
  '4.6': 'Collections'
}

const cleanTitle = (title, id, categoryLabels) => {
  // Handle index files - show "Section Index" (e.g., "Metadata Index")
  if (isIndexFile(id)) {
    const folderMatch = id.match(/^(\d+)-([a-z-]+)-index$/)
    if (folderMatch) {
      const major = folderMatch[1].replace(/^0/, '') // "00" → "0", "01" → "1"
      return `${categoryLabels[major] || 'Section'} Index`
    }
    // Handle nested index files like "foundry-index", "collections-index"
    const nestedMatch = id.match(/^([a-z]+)-index$/)
    if (nestedMatch) {
      return `${capitalise(nestedMatch[1])} Index`
    }
    return 'Section Index'
  }

  // Remove number prefix like "0.0.1 "
  let cleaned = title.replace(/^\d+\.\d+\.\d+\s*/, '')

  // Remove category prefix like "Metadata: " or "Design System: "
  cleaned = cleaned.replace(/^[A-Za-z\s]+:\s*/, '')

  cleaned = cleaned.trim() || title

  // Check version for prefixes
  const versionMatch = id.match(/^(\d+\.\d+)\.(\d+)/)
  if (versionMatch) {
    const majorMinor = versionMatch[1]

    // Add "Kolkrabbi" prefix for main site pages
    if (kolkrabbiPages.includes(`${majorMinor}.${versionMatch[2]}`)) {
      return `Kolkrabbi ${cleaned}`
    }

    // Add subsection prefix (Foundry, Collections)
    const prefix = subsectionPrefixes[majorMinor]
    if (prefix) {
      // Remove existing prefix from start (e.g., "Foundry Typefaces" → "Typefaces")
      const prefixPattern = new RegExp(`^(${prefix}|${prefix.replace(/s$/, '')})(\\s+|$)`, 'i')
      cleaned = cleaned.replace(prefixPattern, '').trim()
      // Remove existing suffix from end (e.g., "Illustrations Collection" → "Illustrations")
      const suffixPattern = new RegExp(`(\\s+|^)(${prefix}|${prefix.replace(/s$/, '')})$`, 'i')
      cleaned = cleaned.replace(suffixPattern, '').trim()
      return `${prefix} ${cleaned}`
    }
  }

  return cleaned
}

const DocumentationReader = () => {
  const { docId } = useParams()

  const doc = useMemo(() => {
    return documentationInventory.find((d) => d.id === docId)
  }, [docId])

  const rawMarkdown = useMemo(() => {
    if (!doc) return null
    // For index files, the docId is like "00-metadata-index" but the file is "index.md"
    // For regular files, docId matches the filename (e.g., "0.0.1-writing-guidelines")
    const path = Object.keys(documentationModules).find((p) => {
      if (isIndexFile(docId)) {
        // Match index.md files by checking if the path ends with /index.md
        // and the parent folder matches the docId prefix
        const folderMatch = docId.match(/^(\d+-[a-z-]+)-index$/)
        const nestedMatch = docId.match(/^([a-z]+)-index$/)
        if (folderMatch) {
          // e.g., "00-metadata-index" → look for "00-metadata/index.md"
          return p.includes(`/${folderMatch[1]}/index.md`)
        } else if (nestedMatch) {
          // e.g., "foundry-index" → look for "foundry/index.md"
          return p.includes(`/${nestedMatch[1]}/index.md`)
        }
      }
      return p.endsWith(`${docId}.md`)
    })
    return path ? documentationModules[path] : null
  }, [doc, docId])

  const { sections, toc, introBlocks } = useMemo(() => {
    if (!rawMarkdown) return { sections: [], toc: [], introBlocks: [] }
    const parsed = parseDocsMarkdown(rawMarkdown)
    return { sections: parsed.sections, toc: parsed.toc, introBlocks: parsed.introBlocks }
  }, [rawMarkdown])

  // Extract H1 title from introBlocks
  const docTitle = useMemo(() => {
    const h1Block = introBlocks.find((block) => block.type === 'heading1')
    return h1Block?.content || null
  }, [introBlocks])

  // Group docs by major number for navigation
  const groupedDocs = useMemo(() => {
    const groups = {}
    documentationInventory.forEach((d) => {
      // Match version-numbered docs like "4.1.0-home" → major "4"
      const majorMatch = d.id.match(/^(\d+)\./)
      // Match index files like "04-pages-index" → major "4" (strip leading zero)
      const indexMatch = d.id.match(/^(\d+)-[a-z]+-index$/)
      // Match nested index files like "foundry-index", "collections-index" → need to check title for category

      let major = null
      if (majorMatch) {
        major = majorMatch[1]
      } else if (indexMatch) {
        major = indexMatch[1].replace(/^0/, '') // "04" → "4", "00" → "0"
      } else if (isIndexFile(d.id)) {
        // For nested index files (foundry-index, collections-index), extract major from title
        const titleMatch = d.title.match(/^(\d+)\./)
        if (titleMatch) {
          major = titleMatch[1]
        }
      }

      if (major !== null) {
        if (!groups[major]) {
          groups[major] = []
        }
        groups[major].push(d)
      }
    })
    // Sort each group by version number
    Object.keys(groups).forEach((major) => {
      groups[major].sort((a, b) => {
        const aNum = extractDocNumber(a.id)
        const bNum = extractDocNumber(b.id)
        return aNum.localeCompare(bNum, undefined, { numeric: true })
      })
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
                    {`0${major}`.slice(-2)} {categoryLabels[major] || 'Other'}
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
                          <span className="docs-nav-item-id">{extractDocNumber(d.id)}</span>
                          <span className="docs-nav-item-title">{cleanTitle(d.title, d.id, categoryLabels)}</span>
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
          <div className="mx-auto w-full max-w-[1320px] pb-16 pt-6">
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
              <DocsNavColumn className="hidden lg:block lg:w-[256px]">
                <div className="lg:sticky lg:top-4">
                  {renderNavigationGroups()}
                </div>
              </DocsNavColumn>

              <DocsMainColumn className="w-full lg:min-w-0">
                <DocsArticle>
                  {docTitle && (
                    <h1 className="docs-title">{docTitle}</h1>
                  )}
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
                            return <Divider key={blockKey} className="w-full opacity-60 mb-4" />
                          case 'table':
                            return (
                              <div key={blockKey} className="docs-table-wrapper">
                                <table className="docs-table">
                                  <thead>
                                    <tr>
                                      {block.headers.map((header, headerIndex) => (
                                        <th key={headerIndex}>{header}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {block.rows.map((row, rowIndex) => (
                                      <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                          <td key={cellIndex}>
                                            {cell.tokens ? renderInlineTokens(cell.tokens, `${blockKey}-row-${rowIndex}-cell-${cellIndex}`) : cell.content}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )
                          default:
                            return null
                        }
                      })}
                    </section>
                  ))}
                </DocsArticle>
              </DocsMainColumn>

              <DocsTocColumn className="hidden xl:block xl:w-[256px]">
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
