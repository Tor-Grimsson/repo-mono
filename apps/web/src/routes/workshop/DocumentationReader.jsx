import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tag, Divider } from '@kol/ui'
import {
  DocsHeader,
  DocsLayout,
  DocsNavColumn,
  DocsMainColumn,
  DocsTocColumn,
  DocsArticle
} from '../../components/workshop/docs'
import { documentationInventory } from '../../data/workshop/documentationInventory'
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown.jsx'

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

  if (!doc) {
    return (
      <div className="space-y-8">
        <DocsHeader title="Document Not Found" subtitle={`Could not find document: ${docId}`} />
        <p className="kol-mono-xs">
          <Link to="/workshop/design-system/documentation" className="text-accent-primary">
            ← Back to documentation
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <DocsHeader title={doc.title} subtitle={doc.file} />

      <div className="flex flex-wrap gap-2">
        {doc.metadata.status && <Tag>{`Status · ${capitalise(doc.metadata.status)}`}</Tag>}
        {doc.metadata.category && <Tag>{`Category · ${capitalise(doc.metadata.category)}`}</Tag>}
        {doc.metadata['content type'] && (
          <Tag>{`Type · ${capitalise(doc.metadata['content type'])}`}</Tag>
        )}
        {doc.metadata.version && <Tag>{`Version ${doc.metadata.version}`}</Tag>}
      </div>

      <Divider className="my-20 opacity-60" />

      <DocsLayout>
        <DocsNavColumn sticky className="text-auto">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="kol-mono-text-label uppercase opacity-60">Documentation</h2>
              <p className="kol-mono-xs text-fg-64">
                Browse all documentation by category
              </p>
            </div>

            <Divider className="w-full opacity-60" />

            <div className="space-y-6">
              {Object.entries(groupedDocs)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([major, docs]) => (
                  <div key={major} className="space-y-2">
                    <p className="kol-mono-xs opacity-60">
                      {major}.x.x {categoryLabels[major] || 'Other'}
                    </p>
                    <ul className="space-y-1">
                      {docs.map((d) => {
                        const isActive = d.id === docId
                        return (
                          <li key={d.id}>
                            <Link
                              to={`/workshop/design-system/documentation/${d.id}`}
                              className={`block rounded px-3 py-2 text-sm transition-colors ${
                                isActive
                                  ? 'bg-accent-primary text-accent-primary-foreground'
                                  : 'bg-fg-02/40 text-auto hover:bg-fg-02'
                              }`}
                            >
                              <div className="flex flex-col gap-1">
                                <span className="kol-mono-xs">{d.id}</span>
                                {d.metadata.status && (
                                  <span className="kol-mono-xxs uppercase tracking-[0.18em] text-fg-48">
                                    {d.metadata.status}
                                  </span>
                                )}
                              </div>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </DocsNavColumn>

        <DocsMainColumn className="text-auto">
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
                        <pre key={blockKey} className="docs-codeblock">
                          <code>{block.lines.join('\n')}</code>
                        </pre>
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

        <DocsTocColumn className="text-auto">
          <p className="kol-mono-text-label uppercase opacity-60">On this page</p>
          <nav>
            <ul className="space-y-2">
              {toc.map((item) => {
                const indent = item.level === 3 ? 'pl-3' : item.level === 4 ? 'pl-6' : ''
                return (
                  <li key={item.id} className={`kol-mono-xs text-auto opacity-80 ${indent}`}>
                    <a href={`#${item.id}`} className="hover:text-accent-primary transition-colors">
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Divider className="w-full opacity-60" />

          <div className="space-y-2">
            <p className="kol-mono-xs uppercase opacity-60">Quick actions</p>
            <div className="space-y-2">
              <Link
                to="/workshop/design-system/documentation"
                className="block w-full rounded bg-fg-02/40 px-3 py-2 text-left text-sm hover:bg-fg-02 transition-colors"
              >
                ← All documentation
              </Link>
            </div>
          </div>
        </DocsTocColumn>
      </DocsLayout>
    </div>
  )
}

export default DocumentationReader
