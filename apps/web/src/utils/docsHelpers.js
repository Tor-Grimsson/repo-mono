/**
 * Shared helper functions for documentation pages
 * Used by DocsShell, Documentations, and DocumentationReader
 */

export const capitalise = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value

// Check if ID is from an actual index.md file (e.g., "00-metadata-index", "foundry-index")
// These don't have version numbers (dots), unlike "0.0.2-master-index"
export const isIndexFile = (id) => id.endsWith('-index') && !id.includes('.')

// Map nested index files to their version prefix
export const nestedIndexVersions = {
  'foundry': '4.5.0',
  'collections': '4.6.0'
}

export const extractDocNumber = (id) => {
  // Handle index files - show version number for sorting
  if (isIndexFile(id)) {
    // Main section index: "04-pages-index" → "4.0.0"
    const folderMatch = id.match(/^(\d+)-[a-z-]+-index$/)
    if (folderMatch) {
      const major = folderMatch[1].replace(/^0/, '')
      return `${major}.0.0`
    }
    // Nested index: "foundry-index" → "4.5.0"
    const nestedMatch = id.match(/^([a-z]+)-index$/)
    if (nestedMatch && nestedIndexVersions[nestedMatch[1]]) {
      return nestedIndexVersions[nestedMatch[1]]
    }
    return 'Index'
  }
  // Extract version number from ID like "0.0.1-writing-guidelines" → "0.0.1"
  const match = id.match(/^(\d+\.\d+\.\d+)/)
  return match ? match[1] : id
}

// Main site pages that should have "Kolkrabbi" prefix
export const kolkrabbiPages = ['4.1.0', '4.2.0', '4.3.0', '4.4.0']

// Subsection prefixes based on version range
export const subsectionPrefixes = {
  '4.5': 'Foundry',
  '4.6': 'Collections'
}

export const categoryLabels = {
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

export const cleanTitle = (title, id) => {
  // Handle index files - show "Section Index" (e.g., "Metadata Index")
  if (isIndexFile(id)) {
    const folderMatch = id.match(/^(\d+)-([a-z-]+)-index$/)
    if (folderMatch) {
      const major = folderMatch[1].replace(/^0/, '') // "00" → "0", "01" → "1"
      return `${categoryLabels[major] || 'Section'} Index`
    }
    // Handle nested index files like "foundry-index", "collections-index"
    const nestedMatch = id.match(/^([a-z]+)-index$/)
    if (nestedMatch) {
      return `${capitalise(nestedMatch[1])} Index`
    }
    return 'Section Index'
  }

  // Remove number prefix like "0.0.1 "
  let cleaned = title.replace(/^\d+\.\d+\.\d+\s*/, '')

  // Remove category prefix like "Metadata: " or "Design System: "
  cleaned = cleaned.replace(/^[A-Za-z\s]+:\s*/, '')

  cleaned = cleaned.trim() || title

  // Check version for prefixes
  const versionMatch = id.match(/^(\d+\.\d+)\.(\d+)/)
  if (versionMatch) {
    const majorMinor = versionMatch[1]

    // Add "Kolkrabbi" prefix for main site pages
    if (kolkrabbiPages.includes(`${majorMinor}.${versionMatch[2]}`)) {
      return `Kolkrabbi ${cleaned}`
    }

    // Add subsection prefix (Foundry, Collections)
    const prefix = subsectionPrefixes[majorMinor]
    if (prefix) {
      // Remove existing prefix from start (e.g., "Foundry Typefaces" → "Typefaces")
      const prefixPattern = new RegExp(`^(${prefix}|${prefix.replace(/s$/, '')})(\\s+|$)`, 'i')
      cleaned = cleaned.replace(prefixPattern, '').trim()
      // Remove existing suffix from end (e.g., "Illustrations Collection" → "Illustrations")
      const suffixPattern = new RegExp(`(\\s+|^)(${prefix}|${prefix.replace(/s$/, '')})$`, 'i')
      cleaned = cleaned.replace(suffixPattern, '').trim()
      return `${prefix} ${cleaned}`
    }
  }

  return cleaned
}

/**
 * Group docs by major version number
 */
export const groupDocsByMajor = (docs) => {
  const groups = {}
  docs.forEach((d) => {
    // Match version-numbered docs like "4.1.0-home" → major "4"
    const majorMatch = d.id.match(/^(\d+)\./)
    // Match index files like "04-pages-index" → major "4" (strip leading zero)
    const indexMatch = d.id.match(/^(\d+)-[a-z]+-index$/)

    let major = null
    if (majorMatch) {
      major = majorMatch[1]
    } else if (indexMatch) {
      major = indexMatch[1].replace(/^0/, '') // "04" → "4", "00" → "0"
    } else if (isIndexFile(d.id)) {
      // For nested index files (foundry-index, collections-index), extract major from title
      const titleMatch = d.title.match(/^(\d+)\./)
      if (titleMatch) {
        major = titleMatch[1]
      }
    }

    if (major !== null) {
      if (!groups[major]) {
        groups[major] = []
      }
      groups[major].push(d)
    }
  })

  // Sort each group by version number
  Object.keys(groups).forEach((major) => {
    groups[major].sort((a, b) => {
      const aNum = extractDocNumber(a.id)
      const bNum = extractDocNumber(b.id)
      return aNum.localeCompare(bNum, undefined, { numeric: true })
    })
  })

  return groups
}
