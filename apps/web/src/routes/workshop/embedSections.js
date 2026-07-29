// Embed groups: each external property gets an Overview (the 'about') plus
// full-bleed embed pages (the 'preview') — never conflated on one page.
// Paths are workshop-relative; srcs are real routes on the live sites.
export const EMBED_GROUPS = {
  designSystem: {
    id: 'design-system',
    icon: 'component-01',
    label: 'Design System',
    site: 'https://ui.kolkrabbi.io',
    siteLabel: 'ui.kolkrabbi.io',
    blurb: 'The published KOL design system, embedded one section per page. Each page below opens that part of ui.kolkrabbi.io in-frame; if framing is blocked, open the site directly.',
    pages: [
      { label: 'Components', path: 'design-system/components', src: 'https://ui.kolkrabbi.io/components', desc: 'The component library', icon: 'component-01' },
      { label: 'Blocks', path: 'design-system/blocks', src: 'https://ui.kolkrabbi.io/blocks', desc: 'UI compositions — bigger than a component, smaller than a page', icon: 'layout' },
      { label: 'Sets', path: 'design-system/sets', src: 'https://ui.kolkrabbi.io/sets', desc: 'Full-apparatus compositions', icon: 'library' },
      { label: 'Color', path: 'design-system/color', src: 'https://ui.kolkrabbi.io/foundations/color', desc: 'Color foundations', icon: 'drop' },
      { label: 'Typography', path: 'design-system/typography', src: 'https://ui.kolkrabbi.io/foundations/typography', desc: 'Type foundations', icon: 'type' },
      { label: 'Icons', path: 'design-system/icons', src: 'https://ui.kolkrabbi.io/icons', desc: 'The icon system', icon: 'grid' }
    ]
  },
  brand: {
    id: 'brand',
    icon: 'edit',
    label: 'Brand',
    site: 'https://brand.kolkrabbi.io/styleguide',
    siteLabel: 'brand.kolkrabbi.io',
    blurb: 'The Kolkrabbi brand site — styleguide and lookups, embedded from brand.kolkrabbi.io.',
    pages: [
      { label: 'Styleguide', path: 'brand/styleguide', src: 'https://brand.kolkrabbi.io/styleguide', desc: 'Logo, color ramps, typography, assets', icon: 'book-open' },
      { label: 'Kolkrabbi', path: 'brand/kolkrabbi', src: 'https://brand.kolkrabbi.io/kolkrabbi', desc: 'The Kolkrabbi brand page', icon: 'fingerprint' },
      { label: 'Reference', path: 'brand/reference', src: 'https://brand.kolkrabbi.io/reference', desc: 'Brand reference and lookups', icon: 'library' }
    ]
  },
  chess: {
    id: 'chess',
    icon: 'chess-pawn',
    label: 'Chess',
    site: 'https://chess.kolkrabbi.io',
    siteLabel: 'chess.kolkrabbi.io',
    blurb: 'The chess system, its own deploy at chess.kolkrabbi.io — 27,200 games scraped from chess.com, browsable, replayable, aggregated.',
    pages: [
      { label: 'Analysis', path: 'chess/analysis', src: 'https://chess.kolkrabbi.io/analysis', desc: 'The board and game player', icon: 'play' },
      { label: 'Statistics', path: 'chess/stats', src: 'https://chess.kolkrabbi.io/stats', desc: 'Results, openings, streaks, rating history', icon: 'stat-chart-a' },
      { label: 'Database', path: 'chess/database', src: 'https://chess.kolkrabbi.io/database', desc: 'The game database, browsable', icon: 'database' }
    ]
  },
  // Pages-only groups: no EmbedOverview route — their overviews are custom lab pages
  // (DashboardOverview, HomeApparat). Routes still generate from `pages`.
  dashboardMetrics: {
    id: 'dashboard-metrics',
    icon: 'stat-chart-a',
    label: 'Dashboard Metrics',
    pages: [
      { label: 'Site', path: 'dashboard/site', src: 'https://kolkrabbi.io/metrics?tab=site', desc: 'Site analytics' },
      { label: 'Projects', path: 'dashboard/projects', src: 'https://kolkrabbi.io/metrics?tab=project', desc: 'Project stats' },
      { label: 'Infrastructure', path: 'dashboard/infrastructure', src: 'https://kolkrabbi.io/metrics?tab=infra', desc: 'Deploys, CDN, CMS' },
      { label: 'Sessions', path: 'dashboard/sessions', src: 'https://kolkrabbi.io/metrics?tab=sessions', desc: 'Session analytics' }
    ]
  }
  // Apparat tools moved to apparatTools.js — each has an about page (ApparatTool)
  // plus a frame route at apparat/<id>/live; no EmbedOverview group here.
}
