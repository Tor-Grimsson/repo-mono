export const WORKSHOP_ROUTES = [
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
    id: 'apparat',
    label: 'Apparat',
    icon: 'interactive',
    path: 'apparat',
    children: [
      { id: 'apparat-overview', label: 'Overview', path: 'apparat', icon: 'cone' },
      { id: 'frequency-modulator', label: 'Frequency Modulator', path: 'apparat/frequency-modulator', icon: 'frequency' },
      { id: 'radial-editor', label: 'Radial Editor', path: 'apparat/radial-editor', icon: 'circle' },
      { id: 'kol-editor', label: 'Kol Editor', path: 'apparat/kol-editor', icon: 'layout' },
      { id: 'kol-noter', label: 'Kol Noter', path: 'apparat/kol-noter', icon: 'pen' },
      { id: 'kol-distress', label: 'Kol Distress', path: 'apparat/kol-distress', icon: 'interactive' }
    ]
  },
  {
    id: 'hall-of-mirrors',
    label: 'Hall of Mirrors',
    icon: 'hall-of-symphony',
    path: 'mirrors',
    children: [
      { id: 'mirrors-overview', label: 'Overview', path: 'mirrors', icon: 'hall-of-symphony' },
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
    icon: 'chess-pawn',
    path: 'chess',
    children: [
      { id: 'chess-overview', label: 'Overview', path: 'chess', icon: 'chess-pawn' },
      { id: 'analysis', label: 'Analysis', path: 'chess/analysis', icon: 'chess-rook' },
      { id: 'components', label: 'Components', path: 'chess/components', icon: 'component' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: 'analytics',
    icon: 'stat-stat',
    children: [
      { id: 'analytics-overview', label: 'Overview', path: 'analytics', icon: 'stat-stat' },
      { id: 'components', label: 'Components', path: 'analytics/components', icon: 'stat-chart-c' },
      { id: 'dashboard', label: 'Dashboard', path: 'analytics/dashboard', icon: 'dashboard-roadmap' },
      { id: 'analysis', label: 'Analysis', path: 'analytics/analysis', icon: 'stat-chart-a' },
      { id: 'performance', label: 'Performance', path: 'analytics/performance', icon: 'trending' }
    ]
  }
]
