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
      { label: 'Components', path: 'design-system/components', src: 'https://ui.kolkrabbi.io/components', desc: 'The component library' },
      { label: 'Blocks', path: 'design-system/blocks', src: 'https://ui.kolkrabbi.io/blocks', desc: 'UI compositions — bigger than a component, smaller than a page' },
      { label: 'Sets', path: 'design-system/sets', src: 'https://ui.kolkrabbi.io/sets', desc: 'Full-apparatus compositions' },
      { label: 'Color', path: 'design-system/color', src: 'https://ui.kolkrabbi.io/foundations/color', desc: 'Color foundations' },
      { label: 'Typography', path: 'design-system/typography', src: 'https://ui.kolkrabbi.io/foundations/typography', desc: 'Type foundations' },
      { label: 'Icons', path: 'design-system/icons', src: 'https://ui.kolkrabbi.io/icons', desc: 'The icon system' }
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
      { label: 'Styleguide', path: 'brand/styleguide', src: 'https://brand.kolkrabbi.io/styleguide', desc: 'Logo, color ramps, typography, assets' },
      { label: 'Kolkrabbi', path: 'brand/kolkrabbi', src: 'https://brand.kolkrabbi.io/kolkrabbi', desc: 'The Kolkrabbi brand page' },
      { label: 'Reference', path: 'brand/reference', src: 'https://brand.kolkrabbi.io/reference', desc: 'Brand reference and lookups' }
    ]
  },
  chess: {
    id: 'chess',
    icon: 'chess-pawn',
    label: 'Chess',
    site: 'https://chess.kolkrabbi.io',
    siteLabel: 'chess.kolkrabbi.io',
    blurb: 'The chess system, its own deploy at chess.kolkrabbi.io.',
    pages: [
      { label: 'Games', path: 'chess/games', src: 'https://chess.kolkrabbi.io', desc: 'Board, play and analysis' },
      { label: 'Statistics', path: 'chess/stats', src: 'https://chess.kolkrabbi.io/stats', desc: 'The game-archive statistics' }
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
