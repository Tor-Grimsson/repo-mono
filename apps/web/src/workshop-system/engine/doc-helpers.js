/**
 * Shared doc/tag helpers — pure, zero-dependency. Lifted verbatim.
 *
 * These bake in the KOL numbered-doc taxonomy (`categoryLabels`, version
 * conventions, `kolkrabbiPages`). That's correct for a KOL package; a future
 * consumer with a different scheme would parameterize these — not yet needed.
 */

export const capitalise = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value

// Index.md files (e.g. "00-metadata-index", "foundry-index") have no version dots
export const isIndexFile = (id) => id.endsWith('-index') && !id.includes('.')

/**
 * Resolve a markdown link target to a known doc id, or null. Pure — knows
 * nothing about routes (the reader maps the id → route via docHref).
 *
 * Handles the two link shapes the vault uses:
 *   - regular file:  "../02-design-system/03-typography.md" → "03-typography"
 *   - folder index:  "../00-docs/INDEX.md"                  → "00-docs-index"
 *                    "./INDEX.md" / "INDEX.md"              → "<currentFolder>-index"
 *
 * @param {string}       url            The raw link target (may carry #anchor).
 * @param {Set<string>}  knownIds       Set of inventory ids.
 * @param {string}       currentFolder  Folder slug of the doc holding the link,
 *                                       for bare/relative INDEX.md targets.
 * @returns {{id: string, anchor: string|null}|null}
 */
export const resolveDocId = (url, knownIds, currentFolder = '') => {
  if (!url || !url.includes('.md')) return null
  const [pathPart, anchor] = url.split('#')
  const segments = pathPart.split('/')
  const filename = segments.pop().replace(/\.md$/i, '')

  let candidate
  if (/^index$/i.test(filename)) {
    // Folder = last real dir segment in the path, else the current doc's folder.
    const dir = segments.filter((s) => s && s !== '.' && s !== '..').pop() || currentFolder
    candidate = dir ? `${dir}-index` : null
  } else {
    candidate = filename
  }

  if (candidate && knownIds.has(candidate)) {
    return { id: candidate, anchor: anchor || null }
  }
  return null
}

export const extractDocNumber = (id) => {
  if (isIndexFile(id)) {
    // Main section index: "04-pages-index" → "4.0.0"
    const folderMatch = id.match(/^(\d+)-[a-z-]+-index$/)
    if (folderMatch) {
      const major = folderMatch[1].replace(/^0/, '')
      return `${major}.0.0`
    }
    return 'Index'
  }
  // "0.0.1-writing-guidelines" → "0.0.1"
  const match = id.match(/^(\d+\.\d+\.\d+)/)
  return match ? match[1] : id
}

// Main site pages that should have "Kolkrabbi" prefix
export const kolkrabbiPages = ['4.1.0', '4.2.0', '4.3.0', '4.4.0']

// Subsection prefixes based on version range
export const subsectionPrefixes = {
  '4.6': 'Collections',
}

export const categoryLabels = {
  0: 'Docs',
  1: 'Foundation',
  2: 'Design System',
  3: 'Components',
  4: 'Pages',
  5: 'Workshop',
  6: 'Foundry',
  7: 'Research',
  8: 'Operations',
  9: 'CDN',
}

export const cleanTitle = (title, id) => {
  if (isIndexFile(id)) {
    const folderMatch = id.match(/^(\d+)-([a-z-]+)-index$/)
    if (folderMatch) {
      const major = folderMatch[1].replace(/^0/, '')
      return `${categoryLabels[major] || 'Section'} Index`
    }
    return 'Section Index'
  }

  let cleaned = title.replace(/^\d+\.\d+\.\d+\s*/, '')
  cleaned = cleaned.replace(/^[A-Za-z\s]+:\s*/, '')
  cleaned = cleaned.trim() || title

  const versionMatch = id.match(/^(\d+\.\d+)\.(\d+)/)
  if (versionMatch) {
    const majorMinor = versionMatch[1]

    if (kolkrabbiPages.includes(`${majorMinor}.${versionMatch[2]}`)) {
      return `Kolkrabbi ${cleaned}`
    }

    const prefix = subsectionPrefixes[majorMinor]
    if (prefix) {
      const prefixPattern = new RegExp(`^(${prefix}|${prefix.replace(/s$/, '')})(\\s+|$)`, 'i')
      cleaned = cleaned.replace(prefixPattern, '').trim()
      const suffixPattern = new RegExp(`(\\s+|^)(${prefix}|${prefix.replace(/s$/, '')})$`, 'i')
      cleaned = cleaned.replace(suffixPattern, '').trim()
      return `${prefix} ${cleaned}`
    }
  }

  return cleaned
}

const TAG_COLORS = ['blue', 'teal', 'green', 'yellow', 'red', 'orange', 'purple', 'dark']

export const getTagColor = (tag) => {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = ((hash << 5) - hash + tag.charCodeAt(i)) | 0
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

/** Group docs by major version number. */
export const groupDocsByMajor = (docs) => {
  const groups = {}
  docs.forEach((d) => {
    let major = null

    // Category = the FOLDER number in the file path (docs/documentation/NN-slug/…).
    // The doc id carries the FILE number within its folder, not the category, so
    // never group by the id's leading number — that mis-files every doc.
    const folderMatch = (d.file || '').match(/\/documentation\/(\d+)-[^/]+\//)
    if (folderMatch) {
      major = folderMatch[1].replace(/^0/, '')
    } else {
      // Fallbacks (no file path): legacy X.Y.Z ids, folder-index ids, numbered titles.
      const majorMatch = d.id.match(/^(\d+)\./)
      const indexMatch = d.id.match(/^(\d+)-[a-z-]+-index$/)
      if (majorMatch) {
        major = majorMatch[1]
      } else if (indexMatch) {
        major = indexMatch[1].replace(/^0/, '')
      } else if (isIndexFile(d.id)) {
        const titleMatch = d.title.match(/^(\d+)\./)
        if (titleMatch) {
          major = titleMatch[1]
        }
      }
    }

    if (major !== null) {
      if (!groups[major]) {
        groups[major] = []
      }
      groups[major].push(d)
    }
  })

  Object.keys(groups).forEach((major) => {
    groups[major].sort((a, b) => {
      const aNum = extractDocNumber(a.id)
      const bNum = extractDocNumber(b.id)
      return aNum.localeCompare(bNum, undefined, { numeric: true })
    })
  })

  return groups
}
