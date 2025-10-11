export const surfaceSwatches = [
  { name: 'Surface Primary', token: '--surface-primary', description: 'Default page background' },
  { name: 'Surface Secondary', token: '--surface-secondary', description: 'Section backgrounds and cards' },
  { name: 'Surface Tertiary', token: '--surface-tertiary', description: 'Subtle containers and overlays' },
  { name: 'Surface Muted', token: '--surface-muted', description: 'Muted fills for controls' },
  { name: 'Surface Overlay', token: '--surface-overlay', description: 'Translucent overlays and blurred navs' }
];

export const foregroundSwatches = [
  { name: 'Foreground', token: '--foreground', description: 'Primary text' },
  { name: 'Foreground Muted', token: '--foreground-muted', description: 'Secondary text' },
  { name: 'Foreground Subtle', token: '--foreground-subtle', description: 'Meta / tertiary text' },
  { name: 'Foreground Inverse', token: '--foreground-inverse', description: 'Text on inverse surfaces' }
];

export const accentSwatches = [
  { name: 'Accent', token: '--accent', foreground: '--accent-foreground', description: 'Call-to-action and highlights' },
  { name: 'Destructive', token: '--destructive', foreground: '--destructive-foreground', description: 'Error / destructive actions' }
];

export const typographyScale = [
  { id: 'display', label: 'Display', className: 'kol-heading-display', usage: 'Hero statements' },
  { id: 'section', label: 'Section', className: 'kol-heading-section', usage: 'Section headlines' },
  { id: 'h1', label: 'H1', className: 'kol-h1', usage: 'Page titles' },
  { id: 'h2', label: 'H2', className: 'kol-h2', usage: 'Major subheads' },
  { id: 'h3', label: 'H3', className: 'kol-h3', usage: 'Minor subheads' },
  { id: 'body', label: 'Body', className: 'kol-body', usage: 'Body copy' },
  { id: 'body-sm', label: 'Body Small', className: 'kol-body-sm', usage: 'Supporting copy' },
  { id: 'label', label: 'Label', className: 'kol-label', usage: 'UI labels and tokens' }
];

export const spacingScale = [
  { token: '--spacing-1', rem: '0.25rem', label: 'Spacing 1' },
  { token: '--spacing-2', rem: '0.5rem', label: 'Spacing 2' },
  { token: '--spacing-3', rem: '0.75rem', label: 'Spacing 3' },
  { token: '--spacing-4', rem: '1rem', label: 'Spacing 4' },
  { token: '--spacing-6', rem: '1.5rem', label: 'Spacing 6' },
  { token: '--spacing-8', rem: '2rem', label: 'Spacing 8' },
  { token: '--spacing-10', rem: '2.5rem', label: 'Spacing 10' },
  { token: '--spacing-12', rem: '3rem', label: 'Spacing 12' },
  { token: '--spacing-16', rem: '4rem', label: 'Spacing 16' }
];

export const componentShowcase = [
  {
    id: 'button-primary',
    label: 'Button (primary)',
    type: 'button',
    variant: 'primary',
    props: { children: 'Primary Action' },
    description: 'Primary action button using `variant="primary"`'
  },
  {
    id: 'button-secondary',
    label: 'Button (secondary)',
    type: 'button',
    variant: 'secondary',
    props: { children: 'Secondary Action' },
    description: 'Low emphasis button using surface-muted background'
  },
  {
    id: 'button-outline',
    label: 'Button (outline)',
    type: 'button',
    variant: 'outline',
    props: { children: 'Outline Action' },
    description: 'Transparent button with border emphasis'
  },
  {
    id: 'button-accent',
    label: 'Button (accent)',
    type: 'button',
    variant: 'accent',
    props: { children: 'Accent Action' },
    description: 'Accent button mapped to `--accent` tokens'
  },
  {
    id: 'tag-pill',
    label: 'Pill',
    type: 'pill',
    description: 'Inverse pill using `.pill-inverse` class for comparison'
  },
  {
    id: 'tag-default',
    label: 'Tag',
    type: 'tag',
    props: { children: 'Tag Label' },
    description: 'Capsule tag using shared typography/tokens'
  },
  {
    id: 'theme-toggle',
    label: 'Theme Toggle',
    type: 'toggle',
    variants: [
      { id: 'default', label: 'Default' },
      { id: 'compact', label: 'Compact' },
      { id: 'icon', label: 'Icon' }
    ],
    description: 'Theme toggle variants share identical motion with size-specific layouts.'
  },
  {
    id: 'dropdown-default',
    label: 'Dropdown',
    type: 'dropdown',
    props: {
      options: [
        { label: 'Regular', value: 'regular' },
        { label: 'Italic', value: 'italic' }
      ],
      value: 'regular'
    },
    description: 'Dropdown component showing token-driven surface behavior'
  },
  {
    id: 'slider-demo',
    label: 'Slider',
    type: 'slider',
    props: {
      label: 'Weight',
      min: 300,
      max: 900,
      value: 600
    },
    description: 'Slider styled via shared utilities'
  },
  {
    id: 'card-default',
    label: 'Card',
    type: 'card',
    description: 'Card container leveraging `--surface-secondary`'
  },
  {
    id: 'foundry-card',
    label: 'Foundry Card',
    type: 'foundry-card',
    variants: [
      { id: 'base', label: 'Base', className: 'foundryCard' },
      { id: 'padded', label: 'Padded', className: 'foundryCard foundryCardPadded' },
      { id: 'inverted', label: 'Inverted', className: 'foundryCard foundryCardPadded foundryCardInverted' }
    ],
    description: 'Foundry-specific card utilities stacking base, padding, and inverted contrast.'
  },
  {
    id: 'foundry-preview',
    label: 'Foundry Font Preview',
    type: 'foundry-preview',
    description: 'Composite card showing badge, dropdown, sliders, and specimen under shared tokens.'
  },
  {
    id: 'section-label',
    label: 'Section Label',
    type: 'section-label',
    props: { text: 'Featured Work' },
    description: 'Animated label used in hero and work sections'
  },
  {
    id: 'section-header',
    label: 'Section Header',
    type: 'section-header',
    props: { title: 'Kolkrabbi Design System', description: 'Heading variant consuming shared typography tokens.' },
    description: 'Heading + description pair using shared typography tokens'
  },
  {
    id: 'wordmark',
    label: 'Wordmark',
    type: 'wordmark',
    description: 'Brand mark leveraging theme-aware color inheritance'
  }
];

export const componentSnippets = {
  'button-primary': `<Button variant="primary">Primary Action</Button>`,
  'button-secondary': `<Button variant="secondary">Secondary Action</Button>`,
  'button-outline': `<Button variant="outline">Outline Action</Button>`,
  'button-accent': `<Button variant="accent">Accent Action</Button>`,
  'tag-default': `<Tag>Tag Label</Tag>`,
  'tag-pill': `<span className="pill-inverse">Pill</span>`,
  'theme-toggle': `<>\n  <ThemeToggle variant="default" />\n  <ThemeToggle variant="compact" />\n  <ThemeToggle variant="icon" />\n</>`,
  'dropdown-default': `<Dropdown options={[...]} value="regular" />`,
  'slider-demo': `<Slider label="Weight" min={300} max={900} value={600} />`,
  'card-default': `<div className="card">Card content</div>`,
  'foundry-card': `<div className="foundryCard">…</div>`,
  'foundry-preview': `<FontPreviewItem cardClassName="foundryCard foundryCardPadded foundryCardInverted" />`,
  'section-label': `<SectionLabel text="Featured Work" />`,
  'section-header': `<SectionHeader title="Heading" description="Supporting copy." />`,
  'wordmark': `<Wordmark />`
};
