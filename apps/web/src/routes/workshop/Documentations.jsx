import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, SectionToggle, Divider, Icon } from '@kol/ui'
import {
  DocsPageHeader,
  DocsLayout,
  DocsNavColumn,
  DocsMainColumn,
  DocsTocColumn,
  DocsArticle,
  DocsCodeBlock,
  DocsRailDrawer
} from '../../components/workshop/docs'
import { documentationInventory, documentationCounts } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'
import { buildDocHighlightTabs } from '../../utils/docsTabBuilder'

const fallbackMarkdown = `# Kolkrabbi Design System

A comprehensive design system for building consistent, accessible, and beautiful digital experiences.

---

## Getting Started

Welcome to the Kolkrabbi Design System documentation. This system provides a complete set of design tokens, components, and patterns to help you build cohesive interfaces.

### What's Inside

- **Foundation** – Color systems, typography, spacing, and core design tokens
- **Components** – Reusable UI components from atoms to organisms
- **Patterns** – Common interface patterns and best practices
- **Specimens** – Typography specimens and font showcase

### Quick Links

Explore the documentation sections in the left sidebar to dive deeper into specific topics. Each document includes implementation details, usage guidelines, and live examples where applicable.

---

## Documentation Structure

The documentation is organized using a hierarchical numbering system (M.m.p) where:

- **Major (M)** – Top-level categories (0-9): Metadata, Foundation, Design System, Components, Pages, Content, Research, Operations, Decisions, Future
- **Minor (m)** – Subsections within each category (0-99)
- **Patch (p)** – Specific topics or revisions (0-99)

Browse the navigation to explore all available documentation.

---
`

const formatNumber = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '0'
  }
  return value.toLocaleString('en-US')
}

const capitalise = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value

const renderBlock = (block, keyPrefix) => {
  const blockKey = `${keyPrefix}-${block.type}`

  switch (block.type) {
    case 'heading1':
      return (
        <h1 key={blockKey} className="docs-title">
          {block.content}
        </h1>
      )
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
}

const tocFallback = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'documentation-structure', label: 'Documentation Structure' },
  { id: 'documentation-inventory', label: 'Documentation Inventory' }
]

const Documentations = () => {
  const docsData = useMemo(() => documentationInventory, [])
  const docCounts = useMemo(() => documentationCounts, [])

  const groupedDocs = useMemo(() => {
    const groups = {}
    docsData.forEach((d) => {
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
  }, [docsData])

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

  const generatedTabs = useMemo(() => buildDocHighlightTabs(), [])

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
                    {docs.map((d) => (
                      <Link
                        key={d.id}
                        to={`/workshop/design-system/documentation/${d.id}`}
                        className="docs-nav-item"
                        onClick={onNavigate}
                      >
                        <span className="docs-nav-item-id">{d.id}</span>
                        <span className="docs-nav-item-title">{d.title}</span>
                      </Link>
                    ))}
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
          <p className="docs-sidebar-label">
            {filteredTocEntries.length} {filteredTocEntries.length === 1 ? 'result' : 'results'}
          </p>
        ) : (
          <p className="docs-sidebar-label">On this page</p>
        )}
        <nav>
          <ul className="space-y-1">
            {filteredTocEntries.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="docs-sidebar-link"
                  onClick={onNavigate}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Divider className="w-full opacity-40" />

      <div>
        <p className="docs-sidebar-label">Navigation</p>
        <div className="space-y-1">
          <a
            href="#documentation-inventory"
            className="docs-sidebar-action"
            onClick={onNavigate}
          >
            <Icon name="list" size={14} />
            Documentation list
          </a>
        </div>
      </div>
    </div>
  )

  const heroTabs = generatedTabs.length > 0
    ? generatedTabs
    : [
        {
          id: 'docs-home',
          label: 'Documentation Inventory',
          path: '/workshop/design-system/documentation'
        }
      ]

  const { introBlocks, proposalSections } = useMemo(() => {
    const parsed = parseDocsMarkdown(fallbackMarkdown)
    return {
      introBlocks: parsed.introBlocks,
      proposalSections: parsed.sections
    }
  }, [])

  const tocFromDoc = useMemo(() => {
    return proposalSections.map(({ heading, id }) => ({
      id,
      label: heading
    }))
  }, [proposalSections])

  const [searchQuery, setSearchQuery] = useState('')

  const tocEntries = useMemo(() => {
    const base = tocFromDoc.length ? tocFromDoc : tocFallback
    if (docsData.length) {
      return [
        ...base,
        {
          id: 'documentation-inventory',
          label: 'Documentation Inventory'
        }
      ]
    }
    return base
  }, [docsData.length, tocFromDoc])

  const filteredTocEntries = useMemo(() => {
    if (!searchQuery.trim()) return tocEntries
    const query = searchQuery.toLowerCase()
    return tocEntries.filter(item =>
      item.label.toLowerCase().includes(query)
    )
  }, [tocEntries, searchQuery])

  return (
    <div className="fixed inset-0 flex flex-col bg-surface-primary">
      <DocsPageHeader tabs={heroTabs} onSearch={setSearchQuery} searchQuery={searchQuery} />

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
                  <span className="kol-mono-xs text-fg-80">{`${filteredTocEntries.length} sections`}</span>
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
                  {introBlocks.length > 0 && (
                    <section className="space-y-6">
                      {introBlocks.map((block, index) => renderBlock(block, `intro-${index}`))}
                    </section>
                  )}

                  {proposalSections.map(({ heading, id, blocks }) => {
                    if (!heading) {
                      return null
                    }

                    return (
                      <section key={id} id={id} className="space-y-6 scroll-mt-32">
                        <h2>{heading}</h2>
                        {blocks.map((block, index) => renderBlock(block, `${id}-${index}`))}
                      </section>
                    )
                  })}

                  {docsData.length > 0 && (
                    <section id="documentation-inventory" className="space-y-6 scroll-mt-32">
                      <div className="space-y-2">
                        <h2>Documentation Inventory</h2>
                        <p className="kol-mono-xs opacity-60">
                          Synced from <code>docs/documentation</code> so the styleguide mirrors the live markdown.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Tag>{`${formatNumber(docCounts.total)} files`}</Tag>
                          {Object.entries(docCounts.statuses).map(([status, count]) => (
                            <Tag key={`status-${status}`}>
                              {`Status · ${capitalise(status)} · ${formatNumber(count)}`}
                            </Tag>
                          ))}
                        </div>
                        {Object.keys(docCounts.categories).length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(docCounts.categories).map(([category, count]) => (
                              <Tag key={`category-${category}`}>
                                {`Category · ${capitalise(category)} · ${formatNumber(count)}`}
                              </Tag>
                            ))}
                          </div>
                        )}
                      </div>

                      <Divider className="w-full opacity-40" />

                      <ul className="space-y-6">
                        {docsData.map((doc) => {
                          const version = doc.metadata.version
                          const date = doc.metadata.date

                          return (
                            <li key={doc.file}>
                              <Link
                                to={`/workshop/design-system/documentation/${doc.id}`}
                                className="docs-card space-y-2"
                              >
                                <div className="space-y-1">
                                  <p className="text-lg font-medium leading-tight">{doc.title}</p>
                                  <p className="kol-mono-xs opacity-60">{doc.file}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {doc.metadata.status && (
                                    <Tag>{`Status · ${capitalise(doc.metadata.status)}`}</Tag>
                                  )}
                                  {doc.metadata.category && (
                                    <Tag>{`Category · ${capitalise(doc.metadata.category)}`}</Tag>
                                  )}
                                  {doc.metadata['content type'] && (
                                    <Tag>{`Type · ${capitalise(doc.metadata['content type'])}`}</Tag>
                                  )}
                                </div>

                                {(version || date) && (
                                  <div className="flex flex-wrap gap-4 kol-mono-xs opacity-60">
                                    {version && <span>{`Version ${version}`}</span>}
                                    {date && <span>{`Dated ${date}`}</span>}
                                  </div>
                                )}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  )}
                </DocsArticle>

                <Divider className="w-full opacity-60" />

                <SectionToggle
                  label="Proposed Enhancements"
                  isExpanded
                  onToggle={() => {}}
                  indicator={false}
                  withDivider={false}
                  className="!justify-start"
                />
                <ul className="kol-mono-xs space-y-2 pl-4 text-auto">
                  <li>Hook the left navigation to `system-metrics.json` for live file lists.</li>
                  <li>Add query parameters so docs open to specific headings.</li>
                  <li>Integrate search across markdown titles via the metrics snapshot.</li>
                  <li>Consider formalizing docs-specific prose utilities once the layout solidifies.</li>
                </ul>
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

export default Documentations
