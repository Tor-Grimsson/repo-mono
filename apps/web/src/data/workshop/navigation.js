export const WORKSHOP_ROUTES = [
  {
    id: 'home',
    label: 'Workshop',
    path: '/workshop',
    icon: 'styleguide',
    children: [
      { id: 'workshop-introduction', label: 'Introduction', path: 'workshop/introduction' }
    ]
  },
  {
    id: 'styleguide',
    label: 'Design System',
    path: 'introduction',
    children: [
      { id: 'introduction', label: 'Introduction', path: 'introduction' },
      { id: 'documentation', label: 'Documentation', path: 'docs' },
      { id: 'prose', label: 'Prose', path: 'prose' }
    ]
  },
  {
    id: 'foundations',
    label: 'Foundations',
    path: 'foundations',
    children: [
      { id: 'logo', label: 'Logo', path: 'logo', icon: 'pen' },
      { id: 'colors', label: 'Colors', path: 'colors', icon: 'color' },
      { id: 'typography', label: 'Typography', path: 'typography', icon: 'type' },
      { id: 'icons', label: 'Icons', path: 'icons', icon: 'circle' },
      { id: 'interactive', label: 'Interactive', path: 'foundations/interactive', icon: 'interactive' },
      { id: 'animations', label: 'Animations', path: 'animations', icon: 'row' },
      { id: 'spacing', label: 'Spacing', path: 'spacing', icon: 'grid' }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    path: 'components',
    children: [
      { id: 'atoms', label: 'Atoms', path: 'components/atoms', icon: 'atomic-atom' },
      { id: 'molecules', label: 'Molecules', path: 'components/molecules', icon: 'atomic-molecule' },
      { id: 'organisms', label: 'Organisms', path: 'components/organisms', icon: 'atomic-organism' }
    ]
  },
  {
    id: 'apparatus',
    label: 'Apparat',
    path: 'apparatus',
    children: [
      { id: 'circle-generator', label: 'Harmonic Radial Dial', path: 'apparatus/circle-generator', icon: 'circle' },
      { id: 'frequency-modulator', label: 'Frequency Modulator', path: 'apparatus/frequency-modulator' }
    ]
  },
  {
    id: 'hall-of-mirrors',
    label: 'Hall of Mirrors',
    path: 'mirrors',
    children: [
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
      { id: 'overview', label: 'Overview', path: 'analytics/overview', icon: 'stat-pie-c' },
      { id: 'components', label: 'Components', path: 'analytics/components', icon: 'stat-chart-c' },
      { id: 'dashboard', label: 'Dashboard', path: 'analytics/dashboard', icon: 'dashboard-roadmap' },
      { id: 'analysis', label: 'Analysis', path: 'analytics/analysis', icon: 'stat-chart-a' },
      { id: 'performance', label: 'Performance', path: 'analytics/performance', icon: 'trending' }
    ]
  }
]
