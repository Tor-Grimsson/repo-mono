// Import docs from numbered folders only (00-07), excluding archive/
const documentationModules = import.meta.glob(
  ['@docs/documentation/0[0-7]-*/**/*.md'],
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
)

const parseMetadataLines = (lines) => {
  const metadata = {}

  for (const line of lines) {
    if (line.trim() === '---') {
      break
    }
    const match = line.match(/^\*\*(.+?)\*\*:\s*(.*)$/)
    if (match) {
      metadata[match[1].toLowerCase()] = match[2].trim()
    }
  }

  return metadata
}

const documentationInventory = Object.entries(documentationModules).map(([path, raw]) => {
  const normalisedPath = path.replace(/^.*\/docs\/documentation\//, 'docs/documentation/')
  const lines = raw.split(/\r?\n/)
  const headingLine = lines.find((line) => line.startsWith('# ')) ?? ''
  const title = headingLine.replace(/^#\s+/, '').trim()
  const metadata = parseMetadataLines(lines)
  const filename = normalisedPath.split('/').pop() ?? ''
  const parentFolder = normalisedPath.split('/').slice(-2, -1)[0] ?? ''
  const baseId = filename.replace(/\.md$/, '')

  // Make index.md IDs unique by prefixing with parent folder
  const id = baseId === 'index' ? `${parentFolder}-index` : baseId

  return {
    id,
    file: normalisedPath,
    title: title || id,
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

    if (metadata['content type']) {
      acc.contentTypes[metadata['content type']] =
        (acc.contentTypes[metadata['content type']] ?? 0) + 1
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
