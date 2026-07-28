import { documentationInventory, documentationModules } from './documentationInventory'
import { parseDocsMarkdown } from '@kolkrabbi/kol-workshop/engine'
import { isIndexFile } from '@kolkrabbi/kol-workshop/engine'

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
      { id: 'ds-components', label: 'Components', path: 'design-system/components' },
      { id: 'ds-blocks', label: 'Blocks', path: 'design-system/blocks' },
      { id: 'ds-sets', label: 'Sets', path: 'design-system/sets' },
      { id: 'ds-color', label: 'Color', path: 'design-system/color' },
      { id: 'ds-typography', label: 'Typography', path: 'design-system/typography' },
      { id: 'ds-icons', label: 'Icons', path: 'design-system/icons' }
    ]
  },
  {
    id: 'brand',
    label: 'Brand',
    icon: 'pen',
    path: 'brand',
    children: [
      { id: 'brand-overview', label: 'Overview', path: 'brand', icon: 'pen' },
      { id: 'brand-styleguide', label: 'Styleguide', path: 'brand/styleguide' },
      { id: 'brand-kolkrabbi', label: 'Kolkrabbi', path: 'brand/kolkrabbi' },
      { id: 'brand-reference', label: 'Reference', path: 'brand/reference' }
    ]
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: 'dashboard',
    icon: 'stat-stat',
    children: [
      { id: 'dashboard-overview', label: 'Overview', path: 'dashboard', icon: 'stat-stat' },
      { id: 'metrics-setup', label: 'Setup', path: 'dashboard/setup', icon: 'dashboard-book-open' },
      { id: 'dash-site', label: 'Site', path: 'dashboard/site' },
      { id: 'dash-projects', label: 'Projects', path: 'dashboard/projects' },
      { id: 'dash-infrastructure', label: 'Infrastructure', path: 'dashboard/infrastructure' },
      { id: 'dash-sessions', label: 'Sessions', path: 'dashboard/sessions' },
      { id: 'components', label: 'Components', path: 'dashboard/components', icon: 'stat-chart-c' }
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
      { id: 'kol-monitor', label: 'Kol Monitor', path: 'apparat/kol-monitor', icon: 'stat-chart-a', links: { live: 'https://monitor.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-monitor' } },
      { id: 'kol-ds-editor', label: 'Kol Design Editor', path: 'apparat/kol-ds-editor', icon: 'layout', links: { live: 'https://editor.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-ds-editor' } },
      { id: 'kol-vcap', label: 'Kol Vcap', path: 'apparat/kol-vcap', icon: 'row', links: { live: 'https://kol-vcap.vercel.app/', repo: 'https://github.com/Tor-Grimsson/kol-vcap' } },
      { id: 'kol-radar', label: 'Kol Radar', path: 'apparat/kol-radar', icon: 'dashboard-roadmap', links: { live: 'https://kol-radar.vercel.app/', repo: 'https://github.com/Tor-Grimsson/kol-radar' } }
    ]
  },
  {
    id: 'chess',
    label: 'Chess',
    icon: 'chess-pawn',
    path: 'chess',
    children: [
      { id: 'chess-overview', label: 'Overview', path: 'chess', icon: 'chess-pawn' },
      { id: 'chess-games', label: 'Games', path: 'chess/games' },
      { id: 'chess-stats', label: 'Statistics', path: 'chess/stats' }
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
        keywords: []
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
