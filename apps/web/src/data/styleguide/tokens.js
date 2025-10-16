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
          bgToken: '--kol-surface-primary',
          textToken: '--kol-surface-on-primary',
          hex: '#fcfbf8',
          textHex: '#1e1e21'
        },
        dark: {
          bgToken: '--kol-surface-primary',
          textToken: '--kol-surface-on-primary',
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
          bgToken: '--kol-surface-secondary',
          textToken: '--kol-surface-on-secondary',
          hex: '#f5f5f5',
          textHex: '#1e1e21'
        },
        dark: {
          bgToken: '--kol-surface-secondary',
          textToken: '--kol-surface-on-secondary',
          hex: '#19191d',
          textHex: '#f5f5f5'
        }
      },
      {
        id: 'surface-inverse',
        name: 'Surface Inverse',
        usage: 'Navigation bars, hero banners, or sections that invert the core palette.',
        status: 'recommended',
        light: {
          bgToken: '--kol-surface-inverse',
          textToken: '--kol-surface-on-inverse',
          hex: '#1e1e21',
          textHex: '#fcfbf8'
        },
        dark: {
          bgToken: '--kol-surface-inverse',
          textToken: '--kol-surface-on-inverse',
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
          bgToken: '--kol-surface-tertiary',
          textToken: '--kol-surface-on-tertiary',
          hex: '#eeeeee',
          textHex: '#1e1e21'
        },
        dark: {
          bgToken: '--kol-surface-tertiary',
          textToken: '--kol-surface-on-tertiary',
          hex: '#202026',
          textHex: '#f5f5f5'
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
          bgToken: '--kol-accent-primary',
          textToken: '--kol-accent-on-primary',
          hex: '#f5d245',
          textHex: '#1e1e21'
        },
        dark: {
          bgToken: '--kol-accent-primary',
          textToken: '--kol-accent-on-primary',
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
          bgToken: '--kol-status-danger',
          textToken: '--kol-status-on-danger',
          hex: '#9b3928',
          textHex: '#ffffff'
        },
        dark: {
          bgToken: '--kol-status-danger',
          textToken: '--kol-status-on-danger',
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
    token: '--kol-accent-primary-strong',
    foreground: '--kol-accent-on-primary',
    description: 'Hover states and emphasis moments for accent components.'
  },
  {
    id: 'accent-muted',
    name: 'Accent Primary Muted',
    token: '--kol-accent-primary-muted',
    foreground: '--kol-accent-on-primary',
    description: 'Subtle accent backgrounds, badges and chips.'
  },
  {
    id: 'danger-strong',
    name: 'Danger Strong',
    token: '--kol-status-danger-strong',
    foreground: '--kol-status-on-danger',
    description: 'Active or pressed state for destructive actions.'
  },
  {
    id: 'danger-muted',
    name: 'Danger Muted',
    token: '--kol-status-danger-muted',
    foreground: '--kol-status-on-danger',
    description: 'Subtle destructive banners or borders.'
  }
]

export const typographyScale = [
  {
    id: 'display',
    label: 'Display',
    className: 'kol-heading-display',
    usage: 'Hero statements',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '48px',
        tailwind: 'text-5xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight',
        textTransform: 'uppercase',
        fontWeight: '500',
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '64px',
        tailwind: 'md:text-6xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight',
        textTransform: 'uppercase',
        fontWeight: '500',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '96px',
        tailwind: 'lg:text-8xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight',
        textTransform: 'uppercase',
        fontWeight: '500',
      }
    ]
  },
  {
    id: 'section',
    label: 'Section',
    className: 'kol-heading-section',
    usage: 'Section headlines',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '40px',
        tailwind: 'text-4xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight',
        textTransform: 'uppercase',
        fontWeight: '500',
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '48px',
        tailwind: 'md:text-5xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight',
        textTransform: 'uppercase',
        fontWeight: '500',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '64px',
        tailwind: 'lg:text-6xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight',
        textTransform: 'uppercase',
        fontWeight: '500'
      }
    ]
  },
  {
    id: 'heading-xl',
    label: 'Heading XL',
    className: 'kol-heading-xl',
    usage: 'Page titles',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '40px',
        tailwind: 'text-4xl',
        lineHeight: '110%',
        fontFamily: 'RightGroteskNarrow',
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '48px',
        tailwind: 'md:text-5xl',
        lineHeight: '110%',
        fontFamily: 'RightGroteskNarrow',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '64px',
        tailwind: 'lg:text-6xl',
        lineHeight: '110%',
        fontFamily: 'RightGroteskNarrow'
      }
    ]
  },
  {
    id: 'heading-lg',
    label: 'Heading LG',
    className: 'kol-heading-lg',
    usage: 'Major subheads',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '32px',
        tailwind: 'text-3xl',
        lineHeight: '110%',
        fontFamily: 'RightGroteskNarrow'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '40px',
        tailwind: 'md:text-4xl',
        lineHeight: '110%',
        fontFamily: 'RightGroteskNarrow',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '48px',
        tailwind: 'lg:text-5xl',
        lineHeight: '110%',
        fontFamily: 'RightGroteskNarrow'
      }
    ]
  },
  {
    id: 'heading-md',
    label: 'Heading MD',
    className: 'kol-heading-md',
    usage: 'Minor subheads',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '28px',
        tailwind: 'text-3xl',
        lineHeight: '120%',
        fontFamily: 'RightGroteskNarrow'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '32px',
        tailwind: 'md:text-4xl',
        lineHeight: '120%',
        fontFamily: 'RightGroteskNarrow',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '40px',
        tailwind: 'lg:text-5xl',
        lineHeight: '120%',
        fontFamily: 'RightGroteskNarrow'
      }
    ]
  },
  {
    id: 'heading-sm',
    label: 'Heading SM',
    className: 'kol-heading-sm',
    usage: 'Compact headings',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '20px',
        tailwind: 'text-xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '24px',
        tailwind: 'md:text-2xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '32px',
        tailwind: 'lg:text-4xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskTight'
      }
    ]
  },
  {
    id: 'text',
    label: 'Text',
    className: 'kol-text',
    usage: 'Body copy',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        tailwind: 'text-sm',
        lineHeight: '160%',
        fontFamily: 'Inter Tight'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '16px',
        tailwind: 'md:text-base',
        lineHeight: '160%',
        fontFamily: 'Inter Tight',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '18px',
        tailwind: 'lg:text-lg',
        lineHeight: '160%',
        fontFamily: 'Inter Tight'
      }
    ]
  },
  {
    id: 'text-sm',
    label: 'Text SM',
    className: 'kol-text-sm',
    usage: 'Supporting copy',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '12px',
        tailwind: 'text-xs',
        lineHeight: '150%',
        fontFamily: 'Inter Tight'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '14px',
        tailwind: 'md:text-sm',
        lineHeight: '150%',
        fontFamily: 'Inter Tight',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '16px',
        tailwind: 'lg:text-base',
        lineHeight: '150%',
        fontFamily: 'Inter Tight'
      }
    ]
  },
  {
    id: 'mono-text',
    label: 'Mono Text',
    className: 'kol-mono-text',
    usage: 'Monospace body text',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        tailwind: 'text-sm',
        lineHeight: '125%',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400',
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '16px',
        tailwind: 'md:text-base',
        lineHeight: '125%',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '18px',
        tailwind: 'lg:text-lg',
        lineHeight: '125%',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400'
      }
    ]
  },
  {
    id: 'mono-text-label',
    label: 'Mono Text Label',
    className: 'kol-mono-text-label',
    usage: 'Uppercase mono labels with 0.2em tracking (section toggles, status badges)',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '12px',
        tailwind: 'text-xs',
        lineHeight: '125%',
        fontFamily: 'RightGroteskMono',
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '14px',
        tailwind: 'md:text-sm',
        lineHeight: '125%',
        fontFamily: 'RightGroteskMono',
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '16px',
        tailwind: 'lg:text-base',
        lineHeight: '125%',
        fontFamily: 'RightGroteskMono',
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      }
    ]
  },
  {
    id: 'label',
    label: 'Label',
    className: 'kol-label',
    usage: 'UI labels and tokens',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        tailwind: 'text-sm',
        lineHeight: '100%',
        fontFamily: 'RightGroteskMono',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '16px',
        tailwind: 'md:text-base',
        lineHeight: '100%',
        fontFamily: 'RightGroteskMono',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '24px',
        tailwind: 'lg:text-2xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskMono',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'label-compact',
    label: 'Label Compact',
    className: 'kol-label-compact',
    usage: 'Section labels with icon',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '16px',
        tailwind: 'text-base',
        lineHeight: '100%',
        fontFamily: 'RightGroteskCompact',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      {
        name: 'Desktop (64rem)',
        range: '≥1024px',
        size: '24px',
        tailwind: 'text-2xl',
        lineHeight: '100%',
        fontFamily: 'RightGroteskCompact',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'mono-xs',
    label: 'Mono XS',
    className: 'kol-mono-xs',
    usage: 'Monospace metadata',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '11px',
        tailwind: 'text-[11px]',
        lineHeight: 'normal',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '12px',
        tailwind: 'md:text-xs',
        lineHeight: 'normal',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '14px',
        tailwind: 'lg:text-sm',
        lineHeight: 'normal',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400'
      }
    ]
  },
  {
    id: 'mono-xxs',
    label: 'Mono XXS',
    className: 'kol-mono-xxs',
    usage: 'Technical specs and fine print',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '8px',
        tailwind: 'text-[8px]',
        lineHeight: 'normal',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400'
      },
      {
        name: 'Tablet (md)',
        range: '≥768px',
        size: '10px',
        tailwind: 'md:text-[10px]',
        lineHeight: 'normal',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400',
      },
      {
        name: 'Desktop (lg)',
        range: '≥1024px',
        size: '12px',
        tailwind: 'lg:text-xs',
        lineHeight: 'normal',
        fontFamily: 'RightGroteskMono',
        fontWeight: '400'
      }
    ]
  }
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

// ATOMS: Basic building blocks that cannot be broken down further
export const componentAtoms = [{
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
    id: 'button-control',
    label: 'Button (control)',
    type: 'button',
    variant: 'control',
    props: { children: 'Control Action' },
    description: 'Control button with 4px radius for utility/settings toggles'
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
    description: 'Dropdown control demonstrating typography + border utilities.'
  },
  {
    id: 'card-default',
    label: 'Card',
    type: 'card',
    description: 'Card container leveraging `--surface-secondary`'
  },
  {
    id: 'wordmark',
    label: 'Wordmark',
    type: 'wordmark',
    description: 'Brand mark leveraging theme-aware color inheritance'
  }
];

// MOLECULES: Simple compositions combining 2-3 atoms with a single purpose
export const componentMolecules = [
  {
    id: 'work-controls-v2',
    label: 'Work Controls Panel (V2 - Rebuild)',
    type: 'work-controls-v2',
    description: 'Rebuilt work controls panel with visual refinements.'
  },
  {
    id: 'work-controls',
    label: 'Work Controls Panel',
    type: 'work-controls',
    description: 'Collapsible controls panel with Show/Hide button. Demonstrates Slider component and control button patterns using kol-mono-xs typography with control-unified container styling.'
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
    id: 'section-label',
    label: 'Section Label',
    type: 'section-label',
    props: { text: 'Featured Work' },
    description: 'Animated label used in hero and work sections'
  },
  {
    id: 'section-toggle',
    label: 'Section Toggle',
    type: 'section-toggle',
    props: { label: 'Section Title' },
    description: 'Collapsible section control using kol-mono-text-label typography, returns plus/minus indicator by default.'
  }
];

// ORGANISMS: Complex components combining multiple molecules and atoms
export const componentOrganisms = [
  {
    id: 'foundry-preview',
    label: 'Foundry Font Preview',
    type: 'foundry-preview',
    description: 'Composite card showing badge, dropdown, sliders, and specimen under shared tokens.'
  }
];

// BACKWARD COMPATIBILITY: Legacy export for existing code
export const componentShowcase = [
  ...componentAtoms,
  ...componentMolecules,
  ...componentOrganisms
];

export const componentSnippets = {
  'button-primary': `<Button variant="primary">Primary Action</Button>`,
  'button-secondary': `<Button variant="secondary">Secondary Action</Button>`,
  'button-outline': `<Button variant="outline">Outline Action</Button>`,
  'button-accent': `<Button variant="accent">Accent Action</Button>`,
  'button-control': `<Button variant="control">Control Action</Button>`,
  'tag-default': `<Tag>Tag Label</Tag>`,
  'tag-pill': `<span className="pill-inverse">Pill</span>`,
  'theme-toggle': `<>\n  <ThemeToggle variant="default" />\n  <ThemeToggle variant="compact" />\n  <ThemeToggle variant="icon" />\n</>`,
  'dropdown-default': `<Dropdown options={[...]} value="regular" />`,
  'slider-demo': `<Slider label="Weight" min={300} max={900} value={600} />`,
  'card-default': `<div className="card">Card content</div>`,
  'foundry-card': `<div className="foundryCard">…</div>`,
  'section-toggle': `<SectionToggle label="Section Title" isExpanded={false} onToggle={() => {}} />`,
  'work-controls-v2': `// Rebuilt work controls with visual refinements
<div className="control-slider-minimal">
  <Slider label="Intensity" min={0} max={400} value={200} />
  <Slider label="Frequency" min={10} max={200} value={100} />
</div>`,
  'work-controls': `// See WorkHeroSection.jsx for full implementation
<Slider label="Intensity" min={0} max={400} value={200} />
<Slider label="Frequency" min={10} max={200} value={100} />
<div className="flex flex-row justify-between gap-3">
  <div className="kol-mono-xs control-unified">Quantize [ON]</div>
  <div className="kol-mono-xs control-unified">Snap</div>
  <div className="kol-mono-xs control-unified">Hide</div>
</div>`,
  'foundry-preview': `<FontPreviewItem cardClassName="foundryCard foundryCardPadded foundryCardInverted" />`,
  'section-label': `<SectionLabel text="Featured Work" />`,
  'wordmark': `<Wordmark />`
};
