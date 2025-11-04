import { useMemo } from 'react'
import { Tag, SectionToggle, Divider, StickyNavCard } from '@kol/ui'
import {
  DocsHeader,
  DocsLayout,
  DocsNavColumn,
  DocsMainColumn,
  DocsTocColumn,
  DocsArticle
} from '../../components/styleguide/docs'
import styleguideMetrics from '../../data/styleguide/system-metrics.json'
import { documentationInventory, documentationCounts } from '../../data/styleguide/documentationInventory'

const fallbackMarkdown = `# 0.0.0 Documentation System Proposal

**Version:** 1.0.0  \n**Date:** 2025-11-03  \n**Status:** Active  \n**Content Type:** implementation  \n**Category:** documentation

---

## Executive Summary

This proposal introduces a **numbered, metadata-driven documentation system** for the kolkrabbi design system. The system uses a three-tier hierarchy (\`M.m.p-name.md\`), separates content types (metadata, implementation, research), and enforces cross-references so every document is discoverable.

- **Scalable numbering** – 970,299 unique document slots.
- **Content clarity** – research, implementation, reference, and metadata separated.
- **Automated cross-referencing** – machine-readable frontmatter.
- **Predictable growth** – new categories can be added without renumbering.

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

const buildSummaryCards = (data) => {
  const cards = []

  const web = data.workspaces?.apps?.web
  if (web) {
    cards.push({
      heading: 'Workspace · Web',
      body: 'Routes, components, and utilities across the web app.',
      bullets: [
        web.routes != null ? `${formatNumber(web.routes)} routes` : null,
        web.components != null ? `${formatNumber(web.components)} components` : null,
        web.dataModules != null ? `${formatNumber(web.dataModules)} data modules` : null
      ].filter(Boolean)
    })
  }

  const ui = data.workspaces?.packages?.ui
  if (ui) {
    cards.push({
      heading: 'Package · @kol/ui',
      body: 'Shared UI kit powering docs and product surfaces.',
      bullets: [
        Array.isArray(ui.indexes) ? `${formatNumber(ui.indexes.length)} indexes` : null,
        ui.modules != null ? `${formatNumber(ui.modules)} modules` : null,
        ui.icons?.total != null ? `${formatNumber(ui.icons.total)} icons` : null
      ].filter(Boolean)
    })
  }

  const documentation = data.documentation
  if (documentation) {
    cards.push({
      heading: 'Docs Inventory',
      body: 'Active chapters and markdown files under the documentation system.',
      bullets: [
        documentation.styleguideChapters != null
          ? `${formatNumber(documentation.styleguideChapters)} styleguide chapters`
          : null,
        Array.isArray(documentation.files)
          ? `${formatNumber(documentation.files.length)} files tracked`
          : null,
        data.generatedAt ? `Snapshot ${new Date(data.generatedAt).toLocaleDateString()}` : null
      ].filter(Boolean)
    })
  }

  const site = data.site?.pages
  if (site) {
    cards.push({
      heading: 'Site Inventory',
      body: 'Route coverage across the applications.',
      bullets: [
        site.total != null ? `${formatNumber(site.total)} routes` : null,
        site.nested != null ? `${formatNumber(site.nested)} nested segments` : null
      ].filter(Boolean)
    })
  }

  return cards
}

const buildCollectionGroups = (data) => {
  const groups = []

  const apps = data.workspaces?.apps ?? {}
  const appKeys = Object.keys(apps)
  if (appKeys.length) {
    groups.push({
      id: 'apps',
      label: 'Applications',
      items: appKeys.map((key) => {
        const info = apps[key] ?? {}
        const meta = [
          info.routes != null ? `${formatNumber(info.routes)} routes` : null,
          info.components != null ? `${formatNumber(info.components)} components` : null
        ]
          .filter(Boolean)
          .join(' • ')
        return {
          id: `app-${key}`,
          label: capitalise(key),
          meta: meta || null
        }
      })
    })
  }

  const packages = data.workspaces?.packages ?? {}
  const packageKeys = Object.keys(packages)
  if (packageKeys.length) {
    groups.push({
      id: 'packages',
      label: 'Packages',
      items: packageKeys.map((key) => {
        const info = packages[key] ?? {}
        const meta = [
          info.modules != null ? `${formatNumber(info.modules)} modules` : null,
          info.schemas != null ? `${formatNumber(info.schemas)} schemas` : null,
          Array.isArray(info.entryPoints)
            ? `${formatNumber(info.entryPoints.length)} entry points`
            : null
        ]
          .filter(Boolean)
          .join(' • ')
        return {
          id: `package-${key}`,
          label: key,
          meta: meta || null
        }
      })
    })
  }

  const docFiles = data.documentation?.files ?? []
  if (docFiles.length) {
    groups.push({
      id: 'documentation',
      label: 'Documentation',
      items: docFiles.map((file) => ({
        id: file,
        label: file.replace('docs/', ''),
        meta: null
      }))
    })
  }

  const assets = data.assets ?? null
  if (assets) {
    groups.push({
      id: 'assets',
      label: 'Assets',
      items: [
        assets.logos != null
          ? { id: 'assets-logos', label: `${formatNumber(assets.logos)} logos` }
          : null,
        assets.illustrations != null
          ? { id: 'assets-illustrations', label: `${formatNumber(assets.illustrations)} illustrations` }
          : null
      ].filter(Boolean)
    })
  }

  return groups
}

const buildFolderTags = (data) => {
  const tags = []
  const appKeys = Object.keys(data.workspaces?.apps ?? {})
  const packageKeys = Object.keys(data.workspaces?.packages ?? {})

  if (appKeys.length) {
    tags.push(...appKeys.map((key) => `App · ${capitalise(key)}`))
  }

  if (packageKeys.length) {
    tags.push(...packageKeys.map((key) => `Package · ${key}`))
  }

  if (data.site?.pages) {
    tags.push('Site')
  }

  if (data.documentation) {
    tags.push('Documentation')
  }

  if (data.assets) {
    tags.push('Assets')
  }

  return tags
}

const tocFallback = [
  { id: 'overview', label: 'Overview' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'references', label: 'References' }
]

const renderParagraph = (text, key) => {
  const metaMatch = text.match(/^\*\*(.+?)\*\*:\s*(.*)/)
  if (metaMatch) {
    return (
      <p key={key} className="docs-meta-inline">
        <strong>{metaMatch[1]}:</strong> {metaMatch[2]}
      </p>
    )
  }

  return <p key={key}>{text}</p>
}

const Documentations = () => {
  const docsData = useMemo(() => documentationInventory, [])
  const docCounts = useMemo(() => documentationCounts, [])

  const metrics = useMemo(() => {
    const baseDocumentation = styleguideMetrics.documentation ?? {}
    const filesFromSnapshot = baseDocumentation.files ?? []
    const filesFromDocs = docsData.map((doc) => doc.file)
    const mergedFiles = Array.from(new Set([...filesFromSnapshot, ...filesFromDocs]))

    return {
      ...styleguideMetrics,
      documentation: {
        ...baseDocumentation,
        files: mergedFiles,
        totals: docCounts
      }
    }
  }, [docCounts, docsData])

  const docSummaries = useMemo(() => buildSummaryCards(metrics), [metrics])
  const collectionGroups = useMemo(() => buildCollectionGroups(metrics), [metrics])
  const folderTags = useMemo(() => buildFolderTags(metrics), [metrics])

  const { introBlocks, proposalSections } = useMemo(() => {
    const lines = fallbackMarkdown.split('\n')
    const sections = []
    const introBlocks = []

    let current = null
    let inCode = false
    let paragraphBuffer = []

    const getTargetBlocks = () => (current ? current.blocks : introBlocks)

    const flushParagraph = () => {
      if (paragraphBuffer.length > 0) {
        const text = paragraphBuffer.join(' ').trim()
        if (text) {
          getTargetBlocks().push({ type: 'paragraph', content: text })
        }
        paragraphBuffer = []
      }
    }

    const startNewSection = (heading) => {
      flushParagraph()
      if (current) {
        sections.push(current)
      }
      current = { heading, blocks: [] }
    }

    lines.forEach((line) => {
      const trimmed = line.trim()

      if (line.startsWith('## ')) {
        startNewSection(line.replace(/^##\s+/, ''))
        return
      }

      if (trimmed === '---') {
        flushParagraph()
        getTargetBlocks().push({ type: 'divider' })
        return
      }

      if (line.startsWith('# ')) {
        flushParagraph()
        getTargetBlocks().push({
          type: 'heading1',
          content: line.replace(/^#\s+/, '')
        })
        return
      }

      if (line.startsWith('```')) {
        if (inCode) {
          // closing fence
          inCode = false
        } else {
          flushParagraph()
          getTargetBlocks().push({ type: 'code', lines: [] })
          inCode = true
        }
        return
      }

      if (inCode) {
        const blocks = getTargetBlocks()
        const lastBlock = blocks[blocks.length - 1]
        if (lastBlock && lastBlock.type === 'code') {
          lastBlock.lines.push(line)
        }
        return
      }

      if (trimmed === '') {
        flushParagraph()
        return
      }

      const unorderedMatch = line.match(/^[\-\*]\s+(.*)/)
      if (unorderedMatch) {
        flushParagraph()
        const blocks = getTargetBlocks()
        const lastBlock = blocks[blocks.length - 1]
        if (lastBlock && lastBlock.type === 'list' && !lastBlock.ordered) {
          lastBlock.items.push(unorderedMatch[1])
        } else {
          blocks.push({
            type: 'list',
            ordered: false,
            items: [unorderedMatch[1]]
          })
        }
        return
      }

      const orderedMatch = line.match(/^\d+\.\s+(.*)/)
      if (orderedMatch) {
        flushParagraph()
        const blocks = getTargetBlocks()
        const lastBlock = blocks[blocks.length - 1]
        if (lastBlock && lastBlock.type === 'list' && lastBlock.ordered) {
          lastBlock.items.push(orderedMatch[1])
        } else {
          blocks.push({
            type: 'list',
            ordered: true,
            items: [orderedMatch[1]]
          })
        }
        return
      }

      if (line.startsWith('>')) {
        flushParagraph()
        getTargetBlocks().push({
          type: 'blockquote',
          content: line.replace(/^>\s?/, '')
        })
        return
      }

      paragraphBuffer.push(line)
    })

    flushParagraph()
    if (current) {
      sections.push(current)
    }

    return {
      introBlocks,
      proposalSections: sections
    }
  }, [])

  const tocFromDoc = useMemo(() => {
    return proposalSections.map(({ heading }) => ({
      id: heading.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      label: heading
    }))
  }, [proposalSections])

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

  return (
    <div className="space-y-8">
      <DocsHeader
        title="Documentation Hub"
        subtitle="Concept proposal for in-styleguide documentation using existing prose components and live markdown links."
      />

      <Divider className="my-20 opacity-60" />

      <div className="docs-folderbar">
        {folderTags.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>

      <div className="docs-breadcrumb">
        <span>Work</span>
        <span>→</span>
        <span>Engineering</span>
        <span>→</span>
        <span>Project Tasks Summary</span>
      </div>

      <DocsLayout>
        <DocsNavColumn sticky className="text-auto">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="kol-mono-text-label uppercase opacity-60">Collections</h2>
              <p className="kol-mono-xs text-fg-64">
                Sticky summary cards mirror the real markdown tree so you can jump between collections while scrolling.
              </p>
            </div>

            <div className="space-y-6">
              {docSummaries.map((summary, index) => (
                <StickyNavCard
                  key={summary.heading}
                  heading={summary.heading}
                  body={summary.body}
                  bullets={summary.bullets}
                  index={index}
                  isActive={index === 0}
                  collapsed={index > 0}
                />
              ))}
            </div>

            <Divider className="w-full opacity-60" />

            <div className="space-y-2">
              <p className="kol-mono-xs uppercase opacity-60">Filters</p>
              <div className="flex flex-wrap gap-2">
                <Tag>System</Tag>
                <Tag>Styleguide</Tag>
                <Tag>Operations</Tag>
              </div>
            </div>

            <Divider className="w-full opacity-60" />

            <div className="space-y-6">
              {collectionGroups.map((group) => (
                <div key={group.id} className="space-y-2">
                  <p className="kol-mono-xs opacity-60">{group.label}</p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item.id}
                        className="rounded bg-fg-02/40 px-3 py-2 text-sm text-auto"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="kol-mono-xs text-fg-64">{item.label}</span>
                          {item.meta ? (
                            <span className="kol-mono-xxs uppercase tracking-[0.18em] text-fg-48">
                              {item.meta}
                            </span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </DocsNavColumn>

        <DocsMainColumn className="text-auto">
          <DocsArticle>
            {introBlocks.length > 0 && (
              <section className="space-y-6">
                {introBlocks.map((block, index) => {
                  switch (block.type) {
                    case 'heading1':
                      return (
                        <h1 key={`intro-heading-${index}`} className="docs-title">
                          {block.content}
                        </h1>
                      )
                    case 'paragraph':
                      return renderParagraph(block.content, `intro-paragraph-${index}`)
                    case 'list': {
                      const listClass = block.ordered
                        ? 'docs-list docs-list--ordered tight'
                        : 'docs-list tight'
                      const ListComponent = block.ordered ? 'ol' : 'ul'
                      return (
                        <ListComponent key={`intro-list-${index}`} className={listClass}>
                          {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ListComponent>
                      )
                    }
                    case 'code':
                      return (
                        <pre key={`intro-code-${index}`} className="docs-codeblock">
                          <code>{block.lines.join('\n')}</code>
                        </pre>
                      )
                    case 'blockquote':
                      return (
                        <blockquote key={`intro-quote-${index}`} className="docs-callout">
                          {block.content}
                        </blockquote>
                      )
                    case 'divider':
                      return <Divider key={`intro-divider-${index}`} className="w-full opacity-60" />
                    default:
                      return null
                  }
                })}
              </section>
            )}

            {proposalSections.map(({ heading, blocks }) => {
              if (!heading) {
                return null
              }

              const id = heading.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

              return (
                <section key={id} id={id} className="space-y-6 scroll-mt-32">
                  <h2>{heading}</h2>
                  {blocks.map((block, index) => {
                    switch (block.type) {
                      case 'paragraph':
                        return renderParagraph(block.content, `${id}-paragraph-${index}`)
                      case 'list': {
                        const listClass = block.ordered
                          ? 'docs-list docs-list--ordered tight'
                          : 'docs-list tight'
                        const ListComponent = block.ordered ? 'ol' : 'ul'
                        return (
                          <ListComponent key={`${id}-list-${index}`} className={listClass}>
                            {block.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ListComponent>
                        )
                      }
                      case 'code':
                        return (
                          <pre key={`${id}-code-${index}`} className="docs-codeblock">
                            <code>{block.lines.join('\n')}</code>
                          </pre>
                        )
                      case 'blockquote':
                        return (
                          <blockquote key={`${id}-quote-${index}`} className="docs-callout">
                            {block.content}
                          </blockquote>
                        )
                      case 'divider':
                        return <Divider key={`${id}-divider-${index}`} className="w-full opacity-60" />
                      default:
                        return null
                    }
                  })}
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
                      <li key={doc.file} className="space-y-2">
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
          <ul className="kol-mono-xs text-auto space-y-2 pl-4">
            <li>Hook the left navigation to `system-metrics.json` for live file lists.</li>
            <li>Add query parameters so docs open to specific headings.</li>
            <li>Integrate search across markdown titles via the metrics snapshot.</li>
            <li>Consider formalizing docs-specific prose utilities once the layout solidifies.</li>
          </ul>
        </DocsMainColumn>

        <DocsTocColumn className="text-auto">
          <p className="kol-mono-text-label uppercase opacity-60">On this page</p>
          <nav>
            <ul className="space-y-2">
              {tocEntries.map((item) => (
                <li key={item.id} className="kol-mono-xs text-auto opacity-80">
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>

          <Divider className="w-full opacity-60" />

          <div className="space-y-2">
            <p className="kol-mono-xs uppercase opacity-60">Quick actions</p>
            <div className="space-y-2">
              <button className="w-full rounded bg-fg-02/40 px-3 py-2 text-left text-sm">
                Open in editor
              </button>
              <button className="w-full rounded bg-fg-02/40 px-3 py-2 text-left text-sm">
                Copy repo path
              </button>
            </div>
          </div>
        </DocsTocColumn>
      </DocsLayout>
    </div>
  )
}

export default Documentations
