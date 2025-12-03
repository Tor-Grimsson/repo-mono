import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon } from '@kol/ui'
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
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'
import { buildDocHighlightTabs } from '../../utils/docsTabBuilder'

const fallbackMarkdown = `# Kolkrabbi Design System

A comprehensive design system for building consistent, accessible, and beautiful digital experiences.

---

## Overview

Design tokens, components, and patterns for cohesive interfaces. Browse the navigation to explore documentation organized by category.

- **Foundation** – Core tokens and architecture
- **Design System** – Colors, typography, spacing
- **Components** – Atoms, molecules, organisms
- **Pages** – Templates and layouts
`

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
  { id: 'documentation-structure', label: 'Documentation Structure' }
]

const Documentations = () => {
  const docsData = useMemo(() => documentationInventory, [])

  const groupedDocs = useMemo(() => {
    const groups = {}
    docsData.forEach((d) => {
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
                    {`0${major}`.slice(-2)} {categoryLabels[major] || 'Other'}
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
                        <span className="docs-nav-item-id">{extractDocNumber(d.id)}</span>
                        <span className="docs-nav-item-title">{cleanTitle(d.title, d.id, categoryLabels)}</span>
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
    return tocFromDoc.length ? tocFromDoc : tocFallback
  }, [tocFromDoc])

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

export default Documentations
