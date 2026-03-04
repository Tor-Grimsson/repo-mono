import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Divider, Icon } from '@kol/ui'
import { ShellTocContext } from '@kol/ui/layout'
import {
  DocsHeader,
  DocsArticle,
  DocsCodeBlock,
  DocsToc
} from '../../components/workshop/docs'
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'
import { isIndexFile, getTagColor } from '../../utils/docsHelpers'

const documentationModules = import.meta.glob(
  [
    '@docs/documentation/0[0-9]-*/*.md'
  ],
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
)

// Build a Set of known doc IDs for fast lookup
const knownDocIds = new Set(documentationInventory.map((d) => d.id))

/**
 * Resolve a .md link URL to an app route, or null if not a known doc.
 * Extracts the doc ID from the filename portion of the URL.
 */
const resolveDocLink = (url) => {
  if (!url || !url.includes('.md')) return null
  // Strip anchor fragment
  const [pathPart, anchor] = url.split('#')
  const basename = pathPart.split('/').pop().replace(/\.md$/, '')
  if (knownDocIds.has(basename)) {
    const route = `/docs/${basename}`
    return anchor ? `${route}#${anchor}` : route
  }
  return null
}

const SidebarSection = ({ sectionKey, label, collapsedSections, toggleSection, children }) => (
  <div>
    <button
      type="button"
      className="shell-sidebar-toggle shell-sidebar-label"
      onClick={() => toggleSection(sectionKey)}
    >
      <svg
        className={`h-3 w-3 transition-transform ${collapsedSections[sectionKey] ? '' : 'rotate-90'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      {label}
    </button>
    {!collapsedSections[sectionKey] && children}
  </div>
)

const DocReaderSidebar = ({ toc, allTags, docId }) => {
  const [collapsedSections, setCollapsedSections] = useState({})
  const toggleSection = (key) => setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="space-y-4">
      <SidebarSection
        sectionKey="toc"
        label="On this page"
        collapsedSections={collapsedSections}
        toggleSection={toggleSection}
      >
        <DocsToc toc={toc} />
      </SidebarSection>

      <Divider className="docs-divider" />

      <SidebarSection
        sectionKey="actions"
        label="Quick actions"
        collapsedSections={collapsedSections}
        toggleSection={toggleSection}
      >
        <div className="space-y-1">
          <Link to="/docs" className="shell-sidebar-action">
            <Icon name="arrow-left" size={14} />
            All documentation
          </Link>
          <Link to="/workshop/components" className="shell-sidebar-action">
            <Icon name="grid" size={14} />
            View components
          </Link>
          <button
            className="shell-sidebar-action"
            type="button"
            onClick={() => navigator.clipboard.writeText(`docs/documentation/${docId}.md`)}
            title="Copy file path to clipboard"
          >
            <Icon name="copy" size={14} />
            Copy path
          </button>
        </div>
      </SidebarSection>

      {allTags.length > 0 && (
        <>
          <Divider className="docs-divider" />
          <SidebarSection
            sectionKey="tags"
            label="Tags"
            collapsedSections={collapsedSections}
            toggleSection={toggleSection}
          >
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
          </SidebarSection>
        </>
      )}
    </div>
  )
}

const DocumentationReader = () => {
  const { docId } = useParams()
  const setTocContent = useContext(ShellTocContext)

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

  const { sections, toc, introBlocks, inlineTags } = useMemo(() => {
    if (!rawMarkdown) return { sections: [], toc: [], introBlocks: [], inlineTags: [] }
    const parsed = parseDocsMarkdown(rawMarkdown)
    return { sections: parsed.sections, toc: parsed.toc, introBlocks: parsed.introBlocks, inlineTags: parsed.inlineTags }
  }, [rawMarkdown])

  // Combine frontmatter tags with inline hashtags
  const allTags = useMemo(() => {
    const frontmatterTags = doc?.metadata?.tags || []
    return [...new Set([...frontmatterTags, ...inlineTags])]
  }, [doc, inlineTags])

  // Extract H1 title from introBlocks
  const docTitle = useMemo(() => {
    const h1Block = introBlocks.find((block) => block.type === 'heading1')
    return h1Block?.content || null
  }, [introBlocks])

  useEffect(() => {
    setTocContent(<DocReaderSidebar key={docId} toc={toc} allTags={allTags} docId={docId} />)
    return () => setTocContent(null)
  }, [setTocContent, docId, toc, allTags])

  if (!doc) {
    return (
      <div className="max-w-[1400px] mx-auto px-10 py-16">
        <DocsHeader title="Document Not Found" subtitle={`Could not find document: ${docId}`} />
        <p className="kol-mono-xs mt-6">
          <Link to="/docs" className="text-accent-primary">
            ← Back to documentation
          </Link>
        </p>
      </div>
    )
  }

  return (
    <DocsArticle>
        {docTitle && (
          <h1 className="docs-title">{docTitle}</h1>
        )}
        {/* Render intro blocks (excluding H1 which is docTitle) */}
        {introBlocks.filter(b => b.type !== 'heading1').map((block, index) => {
          const blockKey = `intro-${block.type}-${index}`
          switch (block.type) {
            case 'paragraph':
              return (
                <p key={blockKey}>
                  {block.tokens ? renderInlineTokens(block.tokens, blockKey, resolveDocLink) : block.content}
                </p>
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
            case 'list':
              return block.items ? (
                <ul key={blockKey} className="docs-list tight">
                  {block.items.map((item, i) => (
                    <li key={i}>
                      {item.tokens ? renderInlineTokens(item.tokens, `${blockKey}-item-${i}`, resolveDocLink) : item.content}
                    </li>
                  ))}
                </ul>
              ) : null
            case 'blockquote':
              return (
                <blockquote key={blockKey} className="docs-callout">
                  {block.tokens ? renderInlineTokens(block.tokens, blockKey, resolveDocLink) : block.content}
                </blockquote>
              )
            case 'divider':
              return <Divider key={blockKey} className="docs-divider" opacity="12" />
            case 'code':
              return (
                <DocsCodeBlock
                  key={blockKey}
                  code={block.lines.join('\n')}
                />
              )
            case 'table':
              return (
                <div key={blockKey} className="kol-table-wrapper kol-table--simple">
                  <table className="kol-table">
                    <thead className="kol-table-thead">
                      <tr>
                        {block.headers.map((header, headerIndex) => (
                          <th key={headerIndex} className="kol-table-cell-title">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="kol-table-row">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="kol-table-cell-text">
                              {cell.tokens ? renderInlineTokens(cell.tokens, `${blockKey}-row-${rowIndex}-cell-${cellIndex}`, resolveDocLink) : cell.content}
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
                      {block.tokens ? renderInlineTokens(block.tokens, blockKey, resolveDocLink) : block.content}
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
                          {item.tokens ? renderInlineTokens(item.tokens, `${blockKey}-item-${itemIndex}`, resolveDocLink) : item.content || item}
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
                      {block.tokens ? renderInlineTokens(block.tokens, blockKey, resolveDocLink) : block.content}
                    </blockquote>
                  )
                case 'divider':
                  return <Divider key={blockKey} className="docs-divider" opacity="12" />
                case 'table':
                  return (
                    <div key={blockKey} className="kol-table-wrapper kol-table--simple">
                      <table className="kol-table">
                        <thead className="kol-table-thead">
                          <tr>
                            {block.headers.map((header, headerIndex) => (
                              <th key={headerIndex} className="kol-table-cell-title">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="kol-table-row">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="kol-table-cell-text">
                                  {cell.tokens ? renderInlineTokens(cell.tokens, `${blockKey}-row-${rowIndex}-cell-${cellIndex}`, resolveDocLink) : cell.content}
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
  )
}

export default DocumentationReader
