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
  // ========================================
  // DISPLAY GROUP (Largest, Most Impactful)
  // ========================================
  {
    id: 'display-lg',
    label: 'Display LG',
    className: 'kol-display-lg',
    usage: 'Hero headlines, marquee statements',
    font: 'Right Grotesk Tight (extra-condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '48px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '96px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      }
    ]
  },
  {
    id: 'display-section',
    label: 'Display Section',
    className: 'kol-display-section',
    usage: 'Section intros on marketing pages',
    font: 'Right Grotesk Tight (extra-condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '40px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '64px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      }
    ]
  },
  {
    id: 'display-section-sm',
    label: 'Display Section SM',
    className: 'kol-display-section-sm',
    usage: 'Dense layouts needing compact section headers',
    font: 'Right Grotesk Tight (extra-condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '32px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '48px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      }
    ]
  },
  {
    id: 'display-subsection',
    label: 'Display Subsection',
    className: 'kol-display-subsection',
    usage: 'Tight, editorial subsections',
    font: 'Right Grotesk Narrow (condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '32px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Narrow',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '48px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Narrow',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'condensed'
      }
    ]
  },
  // ========================================
  // HEADING GROUP (Content Hierarchy)
  // ========================================
  {
    id: 'heading-xl',
    label: 'Heading XL',
    className: 'kol-heading-xl',
    usage: 'Primary content headings',
    font: 'Right Grotesk Narrow (condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '40px',
        lineHeight: '110%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '64px',
        lineHeight: '110%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      }
    ]
  },
  {
    id: 'heading-lg',
    label: 'Heading LG',
    className: 'kol-heading-lg',
    usage: 'Secondary headlines',
    font: 'Right Grotesk Narrow (condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '32px',
        lineHeight: '110%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '48px',
        lineHeight: '110%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      }
    ]
  },
  {
    id: 'heading-md',
    label: 'Heading MD',
    className: 'kol-heading-md',
    usage: 'Tertiary headings',
    font: 'Right Grotesk Narrow (condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '28px',
        lineHeight: '120%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '40px',
        lineHeight: '120%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      }
    ]
  },
  {
    id: 'heading-sm',
    label: 'Heading SM',
    className: 'kol-heading-sm',
    usage: 'Label-style headings, cards',
    font: 'Right Grotesk Tight (extra-condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '20px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '32px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Tight',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontStretch: 'extra-condensed'
      }
    ]
  },
  // ========================================
  // TEXT GROUP (Body Copy)
  // ========================================
  {
    id: 'text-lg',
    label: 'Text LG',
    className: 'kol-text-lg',
    usage: 'Feature paragraphs, hero copy',
    font: 'Inter Tight · 400',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '18px',
        lineHeight: '160%',
        fontFamily: 'Inter Tight',
        fontWeight: '400'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '20px',
        lineHeight: '160%',
        fontFamily: 'Inter Tight',
        fontWeight: '400'
      }
    ]
  },
  {
    id: 'text-md',
    label: 'Text MD',
    className: 'kol-text-md',
    usage: 'Standard body copy',
    font: 'Inter Tight · 400',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        lineHeight: '160%',
        fontFamily: 'Inter Tight',
        fontWeight: '400'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '18px',
        lineHeight: '160%',
        fontFamily: 'Inter Tight',
        fontWeight: '400'
      }
    ]
  },
  {
    id: 'text-md-rg',
    label: 'Text MD RG',
    className: 'kol-text-md-rg',
    usage: 'Body copy with narrow font (alternative)',
    font: 'Right Grotesk Narrow (condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        lineHeight: '160%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '18px',
        lineHeight: '160%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed'
      }
    ]
  },
  {
    id: 'text-sm',
    label: 'Text SM',
    className: 'kol-text-sm',
    usage: 'Captions, dense controls',
    font: 'Inter Tight · 400',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '12px',
        lineHeight: '150%',
        fontFamily: 'Inter Tight',
        fontWeight: '400'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '16px',
        lineHeight: '150%',
        fontFamily: 'Inter Tight',
        fontWeight: '400'
      }
    ]
  },
  // ========================================
  // MONO GROUP (Code, Data, Technical)
  // ========================================
  {
    id: 'mono-text',
    label: 'Mono Text',
    className: 'kol-mono-text',
    usage: 'Code, data tables, technical callouts',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '18px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      }
    ]
  },
  {
    id: 'mono-text-fine',
    label: 'Mono Text Fine',
    className: 'kol-mono-text-regular',
    usage: 'Code with lighter weight (fine variant)',
    font: 'Right Grotesk Mono · 300',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '300'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '18px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '300'
      }
    ]
  },
  {
    id: 'mono-sm',
    label: 'Mono SM',
    className: 'kol-mono-sm',
    usage: 'Compact mono details (chips, inline code)',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '12px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '16px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      }
    ]
  },
  {
    id: 'mono-sm-fine',
    label: 'Mono SM Fine',
    className: 'kol-mono-sm-regular',
    usage: 'Compact mono with lighter weight (fine variant)',
    font: 'Right Grotesk Mono · 300',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '12px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '300'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '16px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '300'
      }
    ]
  },
  {
    id: 'mono-xs',
    label: 'Mono XS',
    className: 'kol-mono-xs',
    usage: 'Metadata inside UI controls',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '10px',
        lineHeight: '120%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '14px',
        lineHeight: '120%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      }
    ]
  },
  {
    id: 'mono-xxs',
    label: 'Mono XXS',
    className: 'kol-mono-xxs',
    usage: 'Icon labels, ultra-dense glyph grids',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '8px',
        lineHeight: '120%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '12px',
        lineHeight: '120%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500'
      }
    ]
  },
  // ========================================
  // LABEL GROUP (Tags, Pills, Section Markers)
  // ========================================
  {
    id: 'label-mono-sm',
    label: 'Label Mono SM',
    className: 'kol-label-mono-sm',
    usage: 'Uppercase mono labels, pill chips',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '14px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '24px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'label-mono-md',
    label: 'Label Mono MD',
    className: 'kol-label-mono-md',
    usage: 'Compact uppercase labels',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '12px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '16px',
        lineHeight: '125%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'label-mono-xs',
    label: 'Label Mono XS',
    className: 'kol-label-mono-xs',
    usage: 'Tiny uppercase labels',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '10px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '14px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'label-compact-lg',
    label: 'Label Compact LG',
    className: 'kol-label-compact-lg',
    usage: 'Large compact uppercase labels',
    font: 'Right Grotesk Narrow (condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '24px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed',
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '28px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed',
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      }
    ]
  },
  {
    id: 'label-compact-md',
    label: 'Label Compact MD',
    className: 'kol-label-compact-md',
    usage: 'Compact uppercase labels (pairs with SectionLabel atom)',
    font: 'Right Grotesk Narrow (condensed) · 500',
    breakpoints: [
      {
        name: 'Mobile',
        range: 'default',
        size: '12px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed',
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      },
      {
        name: 'Desktop',
        range: '≥1024px',
        size: '16px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Narrow',
        fontWeight: '500',
        fontStretch: 'condensed',
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      }
    ]
  },
  // ========================================
  // HELPER GROUP (CTA & Utility Text)
  // ========================================
  {
    id: 'helper-uc-xl',
    label: 'Helper UC XL',
    className: 'kol-helper-uc-xl',
    usage: 'Extra-large uppercase helper text, CTAs',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Fixed',
        range: 'all',
        size: '20px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'helper-uc-lg',
    label: 'Helper UC LG',
    className: 'kol-helper-uc-lg',
    usage: 'Large uppercase helper text',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Fixed',
        range: 'all',
        size: '18px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'helper-uc-md',
    label: 'Helper UC MD',
    className: 'kol-helper-uc-md',
    usage: 'Medium uppercase helper text',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Fixed',
        range: 'all',
        size: '16px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'helper-uc-s',
    label: 'Helper UC S',
    className: 'kol-helper-uc-s',
    usage: 'Small uppercase helper text',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Fixed',
        range: 'all',
        size: '14px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    ]
  },
  {
    id: 'helper-uc-xs',
    label: 'Helper UC XS',
    className: 'kol-helper-uc-xs',
    usage: 'Extra-small uppercase helper text',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Fixed',
        range: 'all',
        size: '12px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    ]
  },
  {
    id: 'helper-uc-xxs',
    label: 'Helper UC XXS',
    className: 'kol-helper-uc-xxs',
    usage: 'Tiny uppercase helper text',
    font: 'Right Grotesk Mono · 500',
    breakpoints: [
      {
        name: 'Fixed',
        range: 'all',
        size: '10px',
        lineHeight: '100%',
        fontFamily: 'Right Grotesk Mono',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
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
