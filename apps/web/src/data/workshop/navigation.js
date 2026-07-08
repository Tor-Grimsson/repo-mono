import { documentationInventory, documentationModules } from './documentationInventory'
import { parseDocsMarkdown } from '../../utils/parseDocsMarkdown.jsx'
import { isIndexFile } from '../../utils/docsHelpers'
import {
  colorGroups, layerPairs, utilitySwatches,
  typographyScale, spacingScale,
  componentAtoms, componentMolecules, componentOrganisms
} from './tokens'
import { icons } from '../../routes/workshop/Icons.jsx'

export const WORKSHOP_ROUTES = [
  {
    id: 'docs',
    label: 'Docs',
    icon: 'dashboard-book-open',
    path: 'docs',
    children: [
      { id: 'docs-overview', label: 'Overview', path: 'docs', icon: 'dashboard-book-open' },
      { id: 'docs-showcase', label: 'Showcase', path: 'docs/components', icon: 'grid' }
    ]
  },
  {
    id: 'design-system',
    label: 'Design System',
    icon: 'foundation',
    path: 'design-system',
    children: [
      { id: 'design-system-overview', label: 'Overview', path: 'design-system', icon: 'foundation' },
      { id: 'logo', label: 'Logo', path: 'design-system/logo', icon: 'pen' },
      { id: 'colors', label: 'Colors', path: 'design-system/colors', icon: 'color' },
      { id: 'typography', label: 'Typography', path: 'design-system/typography', icon: 'type' },
      { id: 'icons', label: 'Icons', path: 'design-system/icons', icon: 'circle' },
      { id: 'animations', label: 'Animations', path: 'design-system/animations', icon: 'row' },
      { id: 'spacing', label: 'Spacing', path: 'design-system/spacing', icon: 'grid' }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'component',
    path: 'components',
    children: [
      { id: 'components-overview', label: 'Overview', path: 'components', icon: 'component' },
      { id: 'atoms', label: 'Atoms', path: 'components/atoms', icon: 'atomic-atom' },
      { id: 'molecules', label: 'Molecules', path: 'components/molecules', icon: 'atomic-molecule' },
      { id: 'organisms', label: 'Organisms', path: 'components/organisms', icon: 'atomic-organism' }
    ]
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: 'dashboard',
    icon: 'stat-stat',
    children: [
      { id: 'dashboard-overview', label: 'Overview', path: 'dashboard', icon: 'stat-stat' },
      { id: 'components', label: 'Components', path: 'dashboard/components', icon: 'stat-chart-c' },
      { id: 'chess', label: 'Chess', path: 'dashboard/chess', icon: 'chess-pawn' },
      { id: 'metrics', label: 'Metrics', path: 'dashboard/metrics', icon: 'stat-chart-a' }
    ]
  },
  {
    id: 'apparat',
    label: 'Apparat',
    icon: 'interactive',
    path: 'apparat',
    children: [
      { id: 'apparat-overview', label: 'Overview', path: 'apparat', icon: 'cone' },
      { id: 'kol-modulator', label: 'Kol Modulator', path: 'apparat/kol-modulator', icon: 'frequency', links: { live: 'https://modulator.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-modulator' } },
      { id: 'kol-radial', label: 'Kol Radial', path: 'apparat/kol-radial', icon: 'circle', links: { live: 'https://radial.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-radial' } },
      { id: 'kol-distress', label: 'Kol Distress', path: 'apparat/kol-distress', icon: 'interactive', links: { live: 'https://distress.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-distress' } },
      { id: 'kol-mirror', label: 'Kol Mirror', path: 'apparat/kol-mirror', icon: 'hall-of-symphony', links: { live: 'https://mirror.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-mirror' } },
      { id: 'kol-monitor', label: 'Kol Monitor', path: 'apparat/kol-monitor', icon: 'stat-chart-a', links: { live: 'https://monitor.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-monitor' } }
    ]
  },
  {
    id: 'chess',
    label: 'Chess',
    icon: 'chess-pawn',
    path: 'chess',
    children: [
      { id: 'chess-overview', label: 'Overview', path: 'chess', icon: 'chess-pawn' },
      { id: 'analysis', label: 'Analysis', path: 'chess/analysis', icon: 'chess-rook' },
      { id: 'metrics', label: 'Metrics', path: 'chess/metrics', icon: 'stat-stat' },
      { id: 'components', label: 'Components', path: 'chess/components', icon: 'component' }
    ]
  }
]

// Find raw markdown for a doc by ID
const findRawMarkdown = (docId) => {
  const path = Object.keys(documentationModules).find((p) => {
    if (isIndexFile(docId)) {
      const folderMatch = docId.match(/^(\d+-[a-z-]+)-index$/)
      const nestedMatch = docId.match(/^([a-z]+)-index$/)
      if (folderMatch) return p.includes(`/${folderMatch[1]}/index.md`)
      if (nestedMatch) return p.includes(`/${nestedMatch[1]}/index.md`)
    }
    return p.endsWith(`${docId}.md`)
  })
  return path ? documentationModules[path] : null
}

// Keywords map: route child id → searchable content strings
const routeKeywords = {
  colors: [
    ...colorGroups.flatMap(g => g.pairs.map(p => p.light.bgToken)),
    ...layerPairs.map(l => l.token),
    ...utilitySwatches.map(u => u.token),
    'bg-fg', 'border-surface', 'bg-auto', 'text-auto'
  ],
  typography: [
    ...typographyScale.map(t => t.className),
    'kol-display', 'kol-heading', 'kol-text', 'kol-mono', 'kol-label', 'kol-helper',
    'Right Grotesk', 'Inter Tight', 'JetBrains Mono'
  ],
  icons: icons,
  spacing: spacingScale.map(s => s.token),
  atoms: componentAtoms.map(c => c.label),
  molecules: componentMolecules.map(c => c.label),
  organisms: componentOrganisms.map(c => c.label)
}

export const buildWorkshopSearchItems = () => {
  // Flatten WORKSHOP_ROUTES children (excluding docs section which gets its own items)
  const routeItems = WORKSHOP_ROUTES
    .filter((r) => r.id !== 'docs')
    .flatMap((route) =>
      (route.children || []).map((child) => ({
        id: child.id,
        label: child.label,
        path: child.path,
        sectionLabel: route.label,
        tags: [],
        headings: [],
        keywords: routeKeywords[child.id] || []
      }))
    )

  // Add documentation inventory items enriched with H2 headings and inline tags
  const docItems = documentationInventory.map((d) => {
    const raw = findRawMarkdown(d.id)
    let headings = []
    let allTags = d.metadata?.tags || []

    if (raw) {
      const parsed = parseDocsMarkdown(raw)
      headings = parsed.toc.map((t) => t.label)
      allTags = [...new Set([...allTags, ...parsed.inlineTags])]
    }

    return {
      id: d.id,
      label: d.title,
      path: `docs/${d.id}`,
      sectionLabel: 'Documentation',
      tags: allTags,
      headings
    }
  })

  return [...routeItems, ...docItems]
}
