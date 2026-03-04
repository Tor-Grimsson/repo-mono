import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Divider, Icon } from '@kol/ui'
import { ShellTocContext } from '@kol/ui/layout'
import {
  DocsArticle,
  DocsCodeBlock,
  TagGraph
} from '../../components/workshop/docs'
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'
import { extractDocNumber, cleanTitle, getTagColor } from '../../utils/docsHelpers'
import landingMarkdown from '@docs/documentation/landing.md?raw'

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
      return <Divider key={blockKey} className="docs-divider" opacity="12" />
    default:
      return null
  }
}

const tocFallback = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'documentation-structure', label: 'Documentation Structure' }
]

const DocsLandingToc = ({ tocEntries, allTags, sidebarViewMode, setSidebarViewMode }) => {
  const [tagsExpanded, setTagsExpanded] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <p className="shell-sidebar-label">On this page</p>
        <nav>
          <ul className="space-y-1">
            {tocEntries.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="shell-sidebar-link">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Divider className="docs-divider" />

      <div>
        <p className="shell-sidebar-label">Quick actions</p>
        <div className="space-y-1">
          <Link to="/workshop/components" className="shell-sidebar-action">
            <Icon name="grid" size={14} />
            View components
          </Link>
          <button
            className="shell-sidebar-action"
            type="button"
            onClick={() => navigator.clipboard.writeText('docs/documentation/landing.md')}
            title="Copy file path to clipboard"
          >
            <Icon name="copy" size={14} />
            Copy repo path
          </button>
        </div>
      </div>

      <Divider className="docs-divider" />

      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            className="shell-sidebar-label flex items-center gap-1.5"
            onClick={() => setTagsExpanded((v) => !v)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <Icon name={tagsExpanded ? 'chevron-down' : 'chevron-right'} size={12} />
            Tags
          </button>
          {tagsExpanded && (
            <div className="flex gap-1">
              <button
                type="button"
                className={`docs-view-toggle docs-view-toggle--small ${sidebarViewMode === 'list' ? 'active' : ''}`}
                onClick={() => setSidebarViewMode('list')}
                title="List view"
              >
                <Icon name="list" size={12} />
              </button>
              <button
                type="button"
                className={`docs-view-toggle docs-view-toggle--small ${sidebarViewMode === 'graph' ? 'active' : ''}`}
                onClick={() => setSidebarViewMode('graph')}
                title="Graph view"
              >
                <Icon name="share-2" size={12} />
              </button>
            </div>
          )}
        </div>
        {tagsExpanded && (
          <div className="flex flex-col gap-1.5 items-start">
            {allTags.map((tag) => (
              <Link
                key={tag}
                to={`/docs?tag=${encodeURIComponent(tag)}`}
                className={`tag tag--${getTagColor(tag)}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const DocsTagToc = ({ allTags, activeTag, setSearchParams }) => (
  <div className="space-y-4">
    <div>
      <p className="shell-sidebar-label">Tags</p>
      <div className="flex flex-col gap-1.5 items-start mt-2">
        {allTags.map((tag) => (
          <Link
            key={tag}
            to={`/docs?tag=${encodeURIComponent(tag)}`}
            className={`tag tag--${getTagColor(tag)}${tag === activeTag ? ' tag--active' : ''}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>

    <Divider className="docs-divider" />

    <div>
      <button
        type="button"
        className="shell-sidebar-action"
        onClick={() => setSearchParams({})}
      >
        <Icon name="x" size={14} />
        All documentation
      </button>
    </div>
  </div>
)

const Documentations = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag')
  const setTocContent = useContext(ShellTocContext)
  const [tagViewMode, setTagViewMode] = useState('list') // 'list' or 'graph' for tag filtered view
  const [sidebarViewMode, setSidebarViewMode] = useState('list') // 'list' or 'graph' for landing page body

  const filteredDocs = useMemo(() => {
    if (!activeTag) return []
    return documentationInventory.filter(
      (d) => Array.isArray(d.metadata?.tags) && d.metadata.tags.includes(activeTag)
    )
  }, [activeTag])

  const { introBlocks, proposalSections } = useMemo(() => {
    const parsed = parseDocsMarkdown(landingMarkdown || fallbackMarkdown)
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

  const tocEntries = useMemo(() => {
    return tocFromDoc.length ? tocFromDoc : tocFallback
  }, [tocFromDoc])

  const allTags = useMemo(() => {
    const tags = new Set()
    documentationInventory.forEach((d) => {
      if (Array.isArray(d.metadata?.tags)) {
        d.metadata.tags.forEach((t) => tags.add(t))
      }
    })
    return [...tags].sort()
  }, [])

  useEffect(() => {
    if (activeTag) {
      setTocContent(<DocsTagToc allTags={allTags} activeTag={activeTag} setSearchParams={setSearchParams} />)
    } else {
      setTocContent(<DocsLandingToc tocEntries={tocEntries} allTags={allTags} sidebarViewMode={sidebarViewMode} setSidebarViewMode={setSidebarViewMode} />)
    }
    return () => setTocContent(null)
  }, [setTocContent, activeTag, allTags, tocEntries, setSearchParams, sidebarViewMode, setSidebarViewMode])

  if (activeTag) {
    return (
      <DocsArticle>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h1 className="docs-title">Tagged: {activeTag}</h1>
              <span className="text-fg-48 kol-mono-xs">({filteredDocs.length} {filteredDocs.length === 1 ? 'doc' : 'docs'})</span>
            </div>
            <button
              type="button"
              className="shell-sidebar-action"
              style={{ width: 'auto' }}
              onClick={() => setTagViewMode(tagViewMode === 'graph' ? 'list' : 'graph')}
            >
              <Icon name={tagViewMode === 'graph' ? 'list' : 'share-2'} size={14} />
              {tagViewMode === 'graph' ? 'List' : 'Node graph'}
            </button>
          </div>
          {tagViewMode === 'graph' ? (
            <TagGraph
              docs={filteredDocs}
              allDocs={documentationInventory}
              activeTag={activeTag}
              onTagClick={(tag) => setSearchParams({ tag })}
            />
          ) : (
            <>
              {filteredDocs.length === 0 ? (
                <p className="text-fg-48 kol-mono-xs">No documents found with tag "{activeTag}".</p>
              ) : (
                <div className="space-y-3">
                  {filteredDocs.map((d) => (
                    <Link
                      key={d.id}
                      to={`/docs/${d.id}`}
                      className="docs-card flex flex-col gap-2"
                    >
                      <span className="shell-nav-item-id">{extractDocNumber(d.id)}</span>
                      <span className="kol-mono-xs font-medium text-fg-80">{cleanTitle(d.title, d.id)}</span>
                      {Array.isArray(d.metadata?.tags) && d.metadata.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {d.metadata.tags.map((tag) => (
                            <span key={tag} className={`tag tag--${getTagColor(tag)}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </DocsArticle>
    )
  }

  return (
    <DocsArticle>
        {sidebarViewMode === 'graph' ? (
          <TagGraph
            docs={documentationInventory}
            activeTag={activeTag}
            onTagClick={(tag) => setSearchParams({ tag })}
          />
        ) : (
          <>
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
          </>
        )}
      </DocsArticle>
  )
}

export default Documentations
