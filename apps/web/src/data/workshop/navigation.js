export const WORKSHOP_ROUTES = [
  {
    id: 'home',
    label: 'Workshop',
    icon: 'styleguide',
    children: [{ id: 'workshop-overview', label: 'Overview', path: '' }]
  },
  {
    id: 'styleguide',
    label: 'Design System',
    children: [
      { id: 'introduction', label: 'Introduction', path: 'introduction' },
      { id: 'documentation', label: 'Documentation', path: 'docs' }
    ]
  },
  {
    id: 'foundations',
    label: 'Foundations',
    path: 'foundations',
    children: [
      { id: 'foundations-overview', label: 'Overview', path: 'foundations' },
      { id: 'logo', label: 'Logo', path: 'foundations/logo', icon: 'pen' },
      { id: 'colors', label: 'Colors', path: 'foundations/colors', icon: 'color' },
      { id: 'typography', label: 'Typography', path: 'foundations/typography', icon: 'type' },
      { id: 'prose', label: 'Prose', path: 'foundations/prose', icon: 'type' },
      { id: 'icons', label: 'Icons', path: 'foundations/icons', icon: 'circle' },
      { id: 'interactive', label: 'Interactive', path: 'foundations/interactive', icon: 'interactive' },
      { id: 'animations', label: 'Animations', path: 'foundations/animations', icon: 'row' },
      { id: 'spacing', label: 'Spacing', path: 'foundations/spacing', icon: 'grid' }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    path: 'components',
    children: [
      { id: 'components-overview', label: 'Overview', path: 'components' },
      { id: 'atoms', label: 'Atoms', path: 'components/atoms', icon: 'atomic-atom' },
      { id: 'atoms-alt', label: 'Atoms Alt', path: 'components/atoms-alt', icon: 'atomic-atom' },
      { id: 'molecules', label: 'Molecules', path: 'components/molecules', icon: 'atomic-molecule' },
      { id: 'organisms', label: 'Organisms', path: 'components/organisms', icon: 'atomic-organism' }
    ]
  },
  {
    id: 'apparatus',
    label: 'Apparat',
    path: 'apparatus',
    children: [
      { id: 'apparatus-overview', label: 'Overview', path: 'apparatus', icon: 'cone' },
      { id: 'frequency-modulator', label: 'Frequency Modulator', path: 'apparatus/frequency-modulator', icon: 'frequency' },
      { id: 'radial-editor', label: 'Radial Editor', path: 'apparatus/radial-editor', icon: 'circle' },
      { id: 'kol-editor', label: 'Kol Editor', path: 'apparatus/kol-editor', icon: 'layout' }
    ]
  },
  {
    id: 'hall-of-mirrors',
    label: 'Hall of Mirrors',
    path: 'mirrors',
    children: [
      { id: 'mirrors-overview', label: 'Overview', path: 'mirrors' },
      { id: 'hall-displacement', label: 'Hall of Displacement', path: 'mirrors/displacement', icon: 'hall-of-displacement' },
      { id: 'hall-movement', label: 'Hall of Movement', path: 'mirrors/movement', icon: 'hall-of-movement' },
      { id: 'hall-copies', label: 'Hall of Copies', path: 'mirrors/copies', icon: 'row' },
      { id: 'hall-symphony', label: 'Hall of Symphony', path: 'mirrors/symphony', icon: 'hall-of-symphony' },
      { id: 'hall-archive', label: 'Hall of Archive', path: 'mirrors/archive', icon: 'dashboard-roadmap' }
    ]
  },
  {
    id: 'chess',
    label: 'Chess',
    path: 'chess',
    children: [
      { id: 'chess-overview', label: 'Overview', path: 'chess' },
      { id: 'analysis', label: 'Analysis', path: 'chess/analysis', icon: 'chess-rook' },
      { id: 'components', label: 'Components', path: 'chess/components' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: 'analytics',
    icon: 'stat-stat',
    children: [
      { id: 'analytics-overview', label: 'Overview', path: 'analytics' },
      { id: 'components', label: 'Components', path: 'analytics/components', icon: 'stat-chart-c' },
      { id: 'dashboard', label: 'Dashboard', path: 'analytics/dashboard', icon: 'dashboard-roadmap' },
      { id: 'analysis', label: 'Analysis', path: 'analytics/analysis', icon: 'stat-chart-a' },
      { id: 'performance', label: 'Performance', path: 'analytics/performance', icon: 'trending' }
    ]
  }
]
