export const colorGroups = [
  {
    id: 'core-surfaces',
    title: 'Core Surfaces',
    description: 'Primary surfaces and text pairings used throughout the application UI.',
    pairs: [
      {
        id: 'surface-primary',
        name: 'Surface Primary',
        usage: 'App background, primary containers, major sections.',
        status: 'recommended',
        light: {
          bgToken: '--surface-primary',
          textToken: '--foreground',
          hex: '#fcfbf8',
          textHex: '#1e1e21'
        },
        dark: {
          bgToken: '--surface-primary',
          textToken: '--foreground',
          hex: '#121215',
          textHex: '#f5f5f5'
        }
      },
      {
        id: 'surface-secondary',
        name: 'Surface Secondary',
        usage: 'Cards, raised sections and neutral panels.',
        status: 'recommended',
        light: {
          bgToken: '--surface-secondary',
          textToken: '--foreground-muted',
          hex: '#f5f5f5',
          textHex: '#424242'
        },
        dark: {
          bgToken: '--surface-secondary',
          textToken: '--foreground-muted',
          hex: '#19191d',
          textHex: '#d4d4d8'
        }
      },
      {
        id: 'surface-inverse',
        name: 'Surface Inverse',
        usage: 'Navigation bars, hero banners, or sections that invert the core palette.',
        status: 'recommended',
        light: {
          bgToken: '--surface-inverse',
          textToken: '--foreground-inverse',
          hex: '#1e1e21',
          textHex: '#fcfbf8'
        },
        dark: {
          bgToken: '--surface-inverse',
          textToken: '--foreground-inverse',
          hex: '#f5f5f5',
          textHex: '#121215'
        }
      },
      {
        id: 'surface-tertiary',
        name: 'Surface Tertiary',
        usage: 'Subtle dividers, table rows, or UI chrome where smaller text is not required.',
        status: 'limited',
        light: {
          bgToken: '--surface-tertiary',
          textToken: '--foreground-subtle',
          hex: '#eeeeee',
          textHex: '#757575'
        },
        dark: {
          bgToken: '--surface-tertiary',
          textToken: '--foreground-subtle',
          hex: '#202026',
          textHex: '#9ca3af'
        },
        note: 'Meets contrast for large text (≥18px) only. Use judiciously.'
      }
    ]
  },
  {
    id: 'support-surfaces',
    title: 'Support Surfaces',
    description: 'Split backgrounds and supporting panels that complement the core surfaces.',
    pairs: [
      {
        id: 'surface-support',
        name: 'Support Split',
        usage: 'Footer bands, alternating sections and split layouts.',
        status: 'support',
        light: {
          bgToken: '--surface-support-light',
          textToken: '--surface-support-dark',
          hex: '#f8f8f8',
          textHex: '#0d0d0d'
        },
        dark: {
          bgToken: '--surface-support-dark',
          textToken: '--surface-support-light',
          hex: '#0d0d0d',
          textHex: '#f8f8f8'
        },
        note: 'High-contrast split pair derived from median brand neutrals.'
      },
      {
        id: 'surface-absolute',
        name: 'Absolute Contrast',
        usage: 'Hero typography, full-bleed sections, and accessibility fallbacks.',
        status: 'support',
        light: {
          bgToken: '--surface-absolute-white',
          textToken: '--surface-support-dark',
          hex: '#ffffff',
          textHex: '#0d0d0d'
        },
        dark: {
          bgToken: '--surface-absolute-black',
          textToken: '--surface-support-light',
          hex: '#000000',
          textHex: '#f8f8f8'
        }
      }
    ]
  },
  {
    id: 'accents-status',
    title: 'Accents & Status',
    description: 'Action colors and status states with paired foreground tokens.',
    pairs: [
      {
        id: 'accent-primary',
        name: 'Accent Primary',
        usage: 'Primary calls to action, links, and highlight treatments.',
        status: 'recommended',
        light: {
          bgToken: '--accent-primary',
          textToken: '--accent-primary-foreground',
          hex: '#f5d245',
          textHex: '#1e1e21'
        },
        dark: {
          bgToken: '--accent-primary',
          textToken: '--accent-primary-foreground',
          hex: '#f5d245',
          textHex: '#1e1e21'
        },
        note: 'Accent value remains constant across themes for brand recognition.'
      },
      {
        id: 'status-danger',
        name: 'Status Danger',
        usage: 'Destructive buttons, error states, and alerts.',
        status: 'recommended',
        light: {
          bgToken: '--status-danger',
          textToken: '--status-danger-foreground',
          hex: '#9b3928',
          textHex: '#ffffff'
        },
        dark: {
          bgToken: '--status-danger',
          textToken: '--status-danger-foreground',
          hex: '#bc583f',
          textHex: '#ffffff'
        },
        note: 'Updated to a deeper crimson (Oct 2025) for stronger contrast and brand presence.'
      }
    ]
  }
]

export const layerPairs = [
  {
    id: 'layer-muted',
    name: 'Muted Layer (20%)',
    description: 'Raised surface tint for subtle elevation. Use dark tint on light surfaces and light tint on dark surfaces.',
    light: { token: '--layer-muted-dark', value: 'rgba(8, 8, 8, 0.20)' },
    dark: { token: '--layer-muted-light', value: 'rgba(250, 250, 250, 0.20)' }
  },
  {
    id: 'layer-overlay',
    name: 'Overlay Layer (8%)',
    description: 'Glass overlays, frosted panels, and hover states.',
    light: { token: '--layer-overlay-dark', value: 'rgba(30, 30, 33, 0.08)' },
    dark: { token: '--layer-overlay-light', value: 'rgba(181, 181, 181, 0.08)' }
  }
]

export const utilitySwatches = [
  {
    id: 'accent-strong',
    name: 'Accent Primary Strong',
    token: '--accent-primary-strong',
    foreground: '--accent-primary-foreground',
    description: 'Hover states and emphasis moments for accent components.'
  },
  {
    id: 'accent-muted',
    name: 'Accent Primary Muted',
    token: '--accent-primary-muted',
    foreground: '--accent-primary-foreground',
    description: 'Subtle accent backgrounds, badges and chips.'
  },
  {
    id: 'danger-strong',
    name: 'Danger Strong',
    token: '--status-danger-strong',
    foreground: '--status-danger-foreground',
    description: 'Active or pressed state for destructive actions.'
  },
  {
    id: 'danger-muted',
    name: 'Danger Muted',
    token: '--status-danger-muted',
    foreground: '--status-danger-foreground',
    description: 'Subtle destructive banners or borders.'
  }
]

export const typographyScale = [
  { id: 'display', label: 'Display', className: 'kol-heading-display', usage: 'Hero statements' },
  { id: 'section', label: 'Section', className: 'kol-heading-section', usage: 'Section headlines' },
  { id: 'h1', label: 'H1', className: 'kol-h1', usage: 'Page titles' },
  { id: 'h2', label: 'H2', className: 'kol-h2', usage: 'Major subheads' },
  { id: 'h3', label: 'H3', className: 'kol-h3', usage: 'Minor subheads' },
  { id: 'body', label: 'Body', className: 'kol-body', usage: 'Body copy' },
  { id: 'body-sm', label: 'Body Small', className: 'kol-body-sm', usage: 'Supporting copy' },
  { id: 'mono-body', label: 'Mono Body', className: 'kol-mono-body', usage: 'Monospace body text' },
  { id: 'label', label: 'Label', className: 'kol-label', usage: 'UI labels and tokens' },
  { id: 'mono', label: 'Section Mono', className: 'kol-mono', usage: 'Monospace metadata' }
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
    description: 'Low emphasis button using layer-muted background'
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
