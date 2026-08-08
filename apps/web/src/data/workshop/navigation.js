import { VAULT_SEARCH_ITEMS } from './vault.js'

export const WORKSHOP_ROUTES = [
  {
    id: 'docs',
    label: 'Docs',
    icon: 'book-open',
    path: 'docs',
    children: [
      { id: 'docs-overview', label: 'Overview', path: 'docs', icon: 'book-open' },
      { id: 'docs-showcase', label: 'Showcase', path: 'docs/components', icon: 'grid' }
    ]
  },
  {
    id: 'design-system',
    label: 'Design System',
    icon: 'component-01',
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
    icon: 'edit',
    path: 'brand',
    children: [
      { id: 'brand-overview', label: 'Overview', path: 'brand', icon: 'edit' },
      { id: 'brand-styleguide', label: 'Styleguide', path: 'brand/styleguide' },
      { id: 'brand-kolkrabbi', label: 'Kolkrabbi', path: 'brand/kolkrabbi' },
      { id: 'brand-reference', label: 'Reference', path: 'brand/reference' }
    ]
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: 'dashboard',
    icon: 'stat-chart-a',
    children: [
      { id: 'dashboard-overview', label: 'Overview', path: 'dashboard', icon: 'stat-chart-a' },
      { id: 'metrics-setup', label: 'Setup', path: 'dashboard/setup', icon: 'book-open' },
      { id: 'dash-site', label: 'Site', path: 'dashboard/site' },
      { id: 'dash-projects', label: 'Projects', path: 'dashboard/projects' },
      { id: 'dash-infrastructure', label: 'Infrastructure', path: 'dashboard/infrastructure' },
      { id: 'dash-sessions', label: 'Sessions', path: 'dashboard/sessions' },
      { id: 'components', label: 'Components', path: 'dashboard/components', icon: 'component-01' }
    ]
  },
  {
    id: 'apparat',
    label: 'Apparat',
    icon: 'target',
    path: 'apparat',
    children: [
      { id: 'apparat-overview', label: 'Overview', path: 'apparat', icon: 'cone' },
      { id: 'kol-modulator', label: 'Kol Modulator', path: 'apparat/kol-modulator', icon: 'frequency', links: { live: 'https://modulator.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-modulator' } },
      { id: 'kol-radial', label: 'Kol Radial', path: 'apparat/kol-radial', icon: 'circle', links: { live: 'https://radial.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-radial' } },
      { id: 'kol-distress', label: 'Kol Distress', path: 'apparat/kol-distress', icon: 'scribble', links: { live: 'https://distress.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-distress' } },
      { id: 'kol-mirror', label: 'Kol Mirror', path: 'apparat/kol-mirror', icon: 'overlap', links: { live: 'https://mirror.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-mirror' } },
      { id: 'kol-monitor', label: 'Kol Monitor', path: 'apparat/kol-monitor', icon: 'stat-chart-a', links: { live: 'https://monitor.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-monitor' } },
      { id: 'kol-ds-editor', label: 'Kol Design Editor', path: 'apparat/kol-ds-editor', icon: 'layout', links: { live: 'https://editor.kolkrabbi.io/', repo: 'https://github.com/Tor-Grimsson/kol-ds-editor' } },
      { id: 'kol-vcap', label: 'Kol Vcap', path: 'apparat/kol-vcap', icon: 'row', links: { live: 'https://kol-vcap.vercel.app/', repo: 'https://github.com/Tor-Grimsson/kol-vcap' } },
      { id: 'kol-radar', label: 'Kol Radar', path: 'apparat/kol-radar', icon: 'roadmap', links: { live: 'https://kol-radar.vercel.app/', repo: 'https://github.com/Tor-Grimsson/kol-radar' } }
    ]
  },
  {
    id: 'chess',
    label: 'Chess',
    icon: 'chess-pawn',
    path: 'chess',
    children: [
      { id: 'chess-overview', label: 'Overview', path: 'chess', icon: 'chess-pawn' },
      { id: 'chess-analysis', label: 'Analysis', path: 'chess/analysis' },
      { id: 'chess-stats', label: 'Statistics', path: 'chess/stats' },
      { id: 'chess-database', label: 'Database', path: 'chess/database' }
    ]
  }
]

export const buildWorkshopSearchItems = () => {
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

  /* Vault items come pre-enriched — buildInventory extracts headings, the
   * frontmatter carries tags. The old per-doc re-parse is gone with the
   * in-repo engine. */
  return [...routeItems, ...VAULT_SEARCH_ITEMS]
}
