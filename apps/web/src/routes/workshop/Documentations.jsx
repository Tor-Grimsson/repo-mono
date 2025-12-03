import { useMemo, useState } from 'react'
import { Divider, Icon } from '@kol/ui'
import {
  DocsShell,
  DocsArticle,
  DocsCodeBlock
} from '../../components/workshop/docs'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'

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

const Documentations = () => {
  const [searchQuery, setSearchQuery] = useState('')

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

  const renderTocContent = (onNavigate) => (
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

      <Divider className="docs-divider" />

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

  return (
    <DocsShell
      tocContent={renderTocContent}
      tocCount={filteredTocEntries.length}
      onSearch={setSearchQuery}
      searchQuery={searchQuery}
    >
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
    </DocsShell>
  )
}

export default Documentations
