export const STYLEGUIDE_ROUTES = [
  {
    id: 'styleguide',
    label: 'Design System',
    path: '/styleguide',
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
      { id: 'animations', label: 'Animations', path: 'animations', icon: 'row' },
      { id: 'spacing', label: 'Spacing', path: 'spacing', icon: 'grid' }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    path: 'components',
    children: [
      { id: 'atoms', label: 'Atoms', path: 'components/atoms' },
      { id: 'molecules', label: 'Molecules', path: 'components/molecules' },
      { id: 'organisms', label: 'Organisms', path: 'components/organisms' }
    ]
  },
  {
    id: 'apparatus',
    label: 'Apparat',
    path: 'apparatus',
    children: [
      { id: 'circle-generator', label: 'Circle Generator', path: 'apparatus/circle-generator' },
      { id: 'frequency-modulator', label: 'Frequency Modulator', path: 'apparatus/frequency-modulator' }
    ]
  }
]
