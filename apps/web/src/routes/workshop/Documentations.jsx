import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CodeBlock, Divider, Icon } from '@kolkrabbi/kol-component'
import { PageSection } from '@kolkrabbi/kol-framework'
import { ShellTocContext } from '../../workshop-system/index.js'
import { DocsArticle, useTagMode } from '../../workshop-system/index.js'
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../workshop-system/index.js'
import landingMarkdown from '@docs/documentation/INDEX.md?raw'

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
      const ListComponent = block.ordered ? 'ol' : 'ul'
      return (
        <ListComponent key={blockKey}>
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
        <CodeBlock
          key={blockKey}
          code={block.lines.join('\n')}
          language={block.lang}
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

const DocsLandingToc = ({ tocEntries, allTagsWithCount, openTagMode }) => {
  const [tagsExpanded, setTagsExpanded] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <p className="shell-sidebar-label kol-helper-10 text-meta">On this page</p>
        <nav>
          <ul className="space-y-1">
            {tocEntries.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="shell-sidebar-link kol-mono-14 text-body">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Divider className="docs-divider" />

      <div>
        <p className="shell-sidebar-label kol-helper-10 text-meta">Quick actions</p>
        <div className="space-y-1">
          <Link to="/workshop/components" className="shell-sidebar-action kol-mono-14 text-body">
            <Icon name="grid" size={14} />
            View components
          </Link>
          <button
            className="shell-sidebar-action kol-mono-14 text-body"
            type="button"
            onClick={() => navigator.clipboard.writeText('docs/documentation/INDEX.md')}
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
            className="shell-sidebar-label kol-helper-10 text-meta flex items-center gap-1.5"
            onClick={() => setTagsExpanded((v) => !v)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <Icon name={tagsExpanded ? 'chevron-down' : 'chevron-right'} size={12} />
            Tags
          </button>
        </div>
        {tagsExpanded && (
          <div className="flex flex-col">
            {allTagsWithCount.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                className="docs-tag-list-item"
                onClick={() => openTagMode(tag)}
              >
                <span>{tag}</span>
                <span className="docs-tag-list-count">{count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const Documentations = () => {
  const setTocContent = useContext(ShellTocContext)
  const { openTagMode } = useTagMode()

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

  const allTagsWithCount = useMemo(() => {
    const counts = {}
    documentationInventory.forEach((d) => {
      if (Array.isArray(d.metadata?.tags)) {
        d.metadata.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1 })
      }
    })
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }, [])

  useEffect(() => {
    setTocContent(<DocsLandingToc tocEntries={tocEntries} allTagsWithCount={allTagsWithCount} openTagMode={openTagMode} />)
    return () => setTocContent(null)
  }, [setTocContent, allTagsWithCount, tocEntries, openTagMode])

  return (
    <PageSection id="docs-home">
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
    </PageSection>
  )
}

export default Documentations
