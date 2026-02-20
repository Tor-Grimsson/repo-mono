// Import docs from numbered folders only (00-09), excluding archive/ and cdn-backblaze/
const documentationModules = import.meta.glob(
  [
    '@docs/documentation/0[0-9]-*/*.md',
    '@docs/documentation/04-pages/collections/*.md'
  ],
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
)

const parseFrontmatter = (raw) => {
  const metadata = {}
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return metadata

  const lines = match[1].split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const kvMatch = lines[i].match(/^([A-Za-z][A-Za-z0-9 -]*):\s*(.*)$/)
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase()
      const value = kvMatch[2].trim()
      if (!value) {
        // Check for YAML block-list continuation lines (  - item)
        const items = []
        while (i + 1 < lines.length && lines[i + 1].match(/^\s+-\s+/)) {
          i++
          items.push(lines[i].replace(/^\s+-\s+/, '').trim())
        }
        metadata[key] = items.length ? items : ''
      } else {
        metadata[key] = value
      }
    }
  }

  // Parse tags array from YAML "[foo, bar, baz]" string into JS array
  if (typeof metadata.tags === 'string' && metadata.tags.startsWith('[')) {
    metadata.tags = metadata.tags.slice(1, -1).split(',').map(t => t.trim()).filter(Boolean)
  }

  return metadata
}

const documentationInventory = Object.entries(documentationModules).map(([path, raw]) => {
  const normalisedPath = path.replace(/^.*\/docs\/documentation\//, 'docs/documentation/')
  const lines = raw.split(/\r?\n/)
  const headingLine = lines.find((line) => line.startsWith('# ')) ?? ''
  const title = headingLine.replace(/^#\s+/, '').trim()
  const metadata = parseFrontmatter(raw)
  const filename = normalisedPath.split('/').pop() ?? ''
  const parentFolder = normalisedPath.split('/').slice(-2, -1)[0] ?? ''
  const baseId = filename.replace(/\.md$/, '')

  // Make index.md IDs unique by prefixing with parent folder
  const id = baseId === 'index' ? `${parentFolder}-index` : baseId

  return {
    id,
    file: normalisedPath,
    title: title || metadata.title || id,
    metadata
  }
})

documentationInventory.sort((a, b) => a.file.localeCompare(b.file))

const documentationCounts = documentationInventory.reduce(
  (acc, doc) => {
    acc.total += 1

    const { metadata } = doc

    if (metadata.status) {
      acc.statuses[metadata.status] = (acc.statuses[metadata.status] ?? 0) + 1
    }

    if (metadata.category) {
      acc.categories[metadata.category] = (acc.categories[metadata.category] ?? 0) + 1
    }

    if (metadata['content-type']) {
      acc.contentTypes[metadata['content-type']] =
        (acc.contentTypes[metadata['content-type']] ?? 0) + 1
    }

    return acc
  },
  { total: 0, statuses: {}, categories: {}, contentTypes: {} }
)

export { documentationInventory, documentationCounts }

export default {
  inventory: documentationInventory,
  counts: documentationCounts
}
