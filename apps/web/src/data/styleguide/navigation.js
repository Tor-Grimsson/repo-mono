export const STYLEGUIDE_ROUTES = [
  {
    id: 'styleguide-home',
    label: 'Styleguide',
    children: [
      { id: 'prose', label: 'Prose', path: 'prose' },
      { id: 'apparatus', label: 'Apparatus', path: 'apparatus/wavy-circle' }
    ]
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: 'foundation',
    children: [
      { id: 'logo', label: 'Logo', path: 'logo' },
      { id: 'colors', label: 'Colors', path: 'colors' },
      { id: 'typography', label: 'Typography', path: 'typography' },
      { id: 'icons', label: 'Icons', path: 'icons' },
      { id: 'animations', label: 'Animations', path: 'animations' },
      { id: 'spacing', label: 'Spacing', path: 'spacing' }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'component',
    children: [
      { id: 'atoms', label: 'Atoms', path: 'components/atoms' },
      { id: 'molecules', label: 'Molecules', path: 'components/molecules' },
      { id: 'organisms', label: 'Organisms', path: 'components/organisms' }
    ]
  }
]
