import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Divider, Icon } from '@kol/ui'
import {
  DocsHeader,
  DocsShell,
  DocsArticle,
  DocsCodeBlock,
  DocsToc
} from '../../components/workshop/docs'
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'
import { isIndexFile } from '../../utils/docsHelpers'

const documentationModules = import.meta.glob(
  ['@docs/documentation/0[0-7]-*/**/*.md'],
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
)

const DocumentationReader = () => {
  const { docId } = useParams()
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredToc = useMemo(() => {
    if (!searchQuery.trim()) return toc
    const query = searchQuery.toLowerCase()
    return toc.filter(item =>
      item.heading.toLowerCase().includes(query)
    )
  }, [toc, searchQuery])

  const renderTocContent = (onNavigate) => (
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

      <Divider className="docs-divider" />

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
          <Link
            to="/workshop/components"
            className="docs-sidebar-action"
            onClick={onNavigate}
          >
            <Icon name="grid" size={14} />
            View components
          </Link>
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
      <DocsShell
        tocContent={<div />}
        tocCount={0}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      >
        <div className="max-w-[1400px] mx-auto px-10 py-16">
          <DocsHeader title="Document Not Found" subtitle={`Could not find document: ${docId}`} />
          <p className="kol-mono-xs mt-6">
            <Link to="/workshop/design-system/documentation" className="text-accent-primary">
              ← Back to documentation
            </Link>
          </p>
        </div>
      </DocsShell>
    )
  }

  return (
    <DocsShell
      activeDocId={docId}
      tocContent={renderTocContent}
      tocCount={toc.length}
      onSearch={setSearchQuery}
      searchQuery={searchQuery}
    >
      <DocsArticle>
        {docTitle && (
          <h1 className="docs-title">{docTitle}</h1>
        )}
        {/* Quick nav */}
        {toc.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 kol-mono-xs text-fg-48 mb-8">
            {toc.slice(0, 8).map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-fg-80">
                {item.heading}
              </a>
            ))}
          </div>
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
                  return <Divider key={blockKey} className="docs-divider" opacity="12" />
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
    </DocsShell>
  )
}

export default DocumentationReader
