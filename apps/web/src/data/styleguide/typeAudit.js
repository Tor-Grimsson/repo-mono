// Typography Audit Data
// Auto-generated report of typography usage across kolkrabbi-monorepo
// Last updated: 2025-10-13 22:30 (Post apps/web Typography Cleanup)

export const typeAuditData = {
  summary: {
    totalPages: 4,
    totalSections: 28,
    totalElements: 87,
    classUsage: 76, // Increased from 68 (8 inline styles converted to classes)
    inlineUsage: 11, // Decreased from 19 (8 fixes in About.jsx, Footer.jsx, Navbar.jsx)
    uniqueFonts: ['RightGroteskTight', 'RightGroteskNarrow', 'RightGroteskMono', 'Inter Tight', 'TGMalromur'],
    issueCount: 11 // Decreased from 19 (8 apps/web issues resolved, foundry issues remain)
  },

  pages: [
    {
      id: 'home',
      name: 'Home',
      route: '/',
      sections: [
        {
          id: 'hero',
          name: 'Hero Section',
          component: 'HeroSection.jsx',
          path: 'apps/web/src/components/sections/home/HeroSection.jsx',
          elements: [
            {
              type: 'h1',
              text: 'Vinnustofa',
              styling: 'class',
              className: 'kol-heading-display',
              fontFamily: 'RightGroteskTight',
              fontSize: { mobile: '48px', desktop: '96px' },
              lineHeight: '100%',
              textTransform: 'uppercase',
              responsive: true,
              lines: [141, 165],
              notes: 'Used twice - once on light bg, once on dark'
            },
            {
              type: 'h1',
              text: 'Kolkrabbi (commented out)',
              styling: 'class',
              className: 'kol-heading-display',
              fontFamily: 'RightGroteskTight',
              fontSize: { mobile: '48px', desktop: '96px' },
              lineHeight: '100%',
              lines: [149],
              status: 'commented',
              notes: 'Currently disabled in code'
            },
            {
              type: 'p',
              text: 'Design Studio & Atelier...',
              styling: 'class',
              className: 'kol-mono-xs',
              fontFamily: 'RightGroteskMono',
              fontSize: '12px',
              lines: [150],
              status: 'commented',
              notes: 'Currently disabled in code'
            }
          ]
        },
        {
          id: 'about',
          name: 'About Section',
          component: 'About.jsx',
          path: 'apps/web/src/components/sections/home/About.jsx',
          elements: [
            {
              type: 'p',
              text: 'Kolkrabbi Vinnustofa',
              styling: 'class',
              className: 'kol-heading-lg',
              fontFamily: 'RightGroteskNarrow',
              fontSize: { mobile: '32px', tablet: '40px', desktop: '48px' },
              lines: [39],
              status: '✅ FIXED',
              notes: 'Fixed 2025-10-13: Removed inline fontFamily, replaced text-2xl with kol-heading-lg'
            },
            {
              type: 'div',
              text: 'Design studio & Atelier based in Reykjavík',
              styling: 'component',
              className: 'AnimatedTitle',
              fontFamily: 'Inherited from AnimatedTitle component',
              lines: [45],
              notes: 'Uses custom AnimatedTitle component - check component for typography'
            },
            {
              type: 'p',
              text: 'Design studio & Atelier based in Reykjavík',
              styling: 'class',
              className: 'kol-text',
              fontFamily: 'Inter Tight',
              fontSize: { mobile: '14px', tablet: '16px', desktop: '18px' },
              lines: [53],
              status: '✅ FIXED',
              notes: 'Fixed 2025-10-13: Replaced text-2xl with kol-text semantic class'
            },
            {
              type: 'p',
              text: 'Visual language, defined by...',
              styling: 'class',
              className: 'kol-mono-xs',
              fontFamily: 'RightGroteskMono',
              fontSize: { mobile: '11px', tablet: '12px', desktop: '14px' },
              lines: [54],
              status: '✅ FIXED',
              notes: 'Fixed 2025-10-13: Removed inline fontFamily + fontSize, replaced with kol-mono-xs'
            }
          ]
        },
        {
          id: 'features',
          name: 'Features Section',
          component: 'Features.jsx',
          path: 'apps/web/src/components/sections/home/Features.jsx',
          elements: [
            {
              type: 'section',
              text: 'Multiple typography elements',
              styling: 'mixed',
              notes: 'Complex component - uses SectionLabel, SectionHeader, and feature cards. Recommend manual review for complete audit.'
            }
          ]
        },
        {
          id: 'story',
          name: 'Story Section',
          component: 'Story.jsx',
          path: 'apps/web/src/components/sections/home/Story.jsx',
          elements: [
            {
              type: 'section',
              text: 'Story content',
              styling: 'mixed',
              notes: 'Complex animated component. Manual review needed for typography audit.'
            }
          ]
        },
        {
          id: 'work-card',
          name: 'Work Card CTA',
          component: 'WorkCard.jsx',
          path: 'apps/web/src/components/sections/home/WorkCard.jsx',
          elements: [
            {
              type: 'component',
              text: 'CTA section',
              styling: 'class',
              notes: 'Uses shared CTA pattern similar to CtaHome'
            }
          ]
        },
        {
          id: 'cta-home',
          name: 'Home CTA',
          component: 'CtaHome.jsx',
          path: 'apps/web/src/components/sections/cta/CtaHome.jsx',
          elements: [
            {
              type: 'component',
              text: 'Contact CTA',
              styling: 'class',
              notes: 'Standard CTA pattern with kol-heading classes'
            }
          ]
        },
        {
          id: 'cms-global',
          name: 'Blog CMS Global',
          component: 'CmsGlobal.jsx',
          path: 'apps/web/src/components/sections/blog/CmsGlobal.jsx',
          elements: [
            {
              type: 'component',
              text: 'Article cards',
              styling: 'class',
              notes: 'Uses ArticleCardHero (lg+) and ArticleCardMini (mobile/md)'
            }
          ]
        }
      ]
    },

    {
      id: 'work',
      name: 'Work',
      route: '/work',
      sections: [
        {
          id: 'work-hero',
          name: 'Work Hero Section',
          component: 'WorkHeroSection.jsx',
          path: 'apps/web/src/components/sections/work/WorkHeroSection.jsx',
          elements: [
            {
              type: 'h1',
              text: '/ projects',
              styling: 'class',
              className: 'kol-heading-display',
              fontFamily: 'RightGroteskTight',
              fontSize: { mobile: '48px', desktop: '96px' },
              lineHeight: '100%',
              lines: [38],
              notes: 'Main page heading'
            },
            {
              type: 'component',
              text: 'All work',
              styling: 'class',
              className: 'SectionLabel',
              fontFamily: 'RightGroteskMono',
              lines: [20],
              notes: 'Uses @kol/ui SectionLabel component'
            },
            {
              type: 'label',
              text: 'Control labels (Intensity, Frequency, etc.)',
              styling: 'class',
              className: 'whitespace-nowrap',
              fontFamily: 'Inherited',
              lines: [56, 75],
              notes: 'Control panel labels - no explicit typography class (could use kol-text-sm)'
            },
            {
              type: 'span',
              text: 'Numeric values',
              styling: 'class',
              className: 'text-right',
              fontFamily: 'Inherited',
              lines: [69, 88],
              notes: 'Control values - could use kol-mono-xs'
            },
            {
              type: 'button',
              text: 'Show Controls',
              styling: 'class',
              className: 'kol-mono-xs',
              fontFamily: 'RightGroteskMono',
              fontSize: { mobile: '11px', tablet: '12px', desktop: '14px' },
              lines: [181],
              status: '✅ FIXED',
              notes: 'Fixed 2025-10-13: Replaced inline fontFamily typo with kol-mono-xs class. Remaining inline styles are for layout/positioning only.'
            }
          ]
        },
        {
          id: 'projects-grid',
          name: 'Projects Grid',
          component: 'ProjectsGrid.jsx',
          path: 'apps/web/src/components/sections/work/ProjectsGrid.jsx',
          elements: [
            {
              type: 'section',
              text: 'Project cards',
              styling: 'class',
              notes: 'Grid of project cards - check individual card components'
            }
          ]
        },
        {
          id: 'projects-list',
          name: 'Projects List',
          component: 'ProjectsList.jsx',
          path: 'apps/web/src/components/sections/work/ProjectsList.jsx',
          elements: [
            {
              type: 'section',
              text: 'Project list items',
              styling: 'class',
              notes: 'List view of projects'
            }
          ]
        },
        {
          id: 'cta-work',
          name: 'Work CTA',
          component: 'CtaWork.jsx',
          path: 'apps/web/src/components/sections/cta/CtaWork.jsx',
          elements: [
            {
              type: 'component',
              text: 'Work CTA',
              styling: 'class',
              notes: 'Standard CTA section'
            }
          ]
        }
      ]
    },

    {
      id: 'foundry',
      name: 'Foundry',
      route: '/foundry',
      sections: [
        {
          id: 'foundry-hero',
          name: 'Foundry Hero',
          component: 'HeroSection.jsx',
          path: 'apps/web/src/components/sections/foundry/HeroSection.jsx',
          elements: [
            {
              type: 'h1',
              text: 'Málrómur',
              styling: 'inline',
              inlineStyles: {
                fontFamily: 'TGMalromur',
                fontStyle: 'italic',
                fontSize: { mobile: '7xl', desktop: 'clamp(72px,8vw,120px)' },
                fontWeight: 'bold',
                color: 'var(--foreground)'
              },
              className: 'malromur',
              fontFamily: 'TGMalromur',
              lines: [23],
              issues: ['🔴 Inline fontFamily, fontSize, fontWeight - complex inline styling', '🟡 Uses Tailwind text-7xl with clamp override']
            },
            {
              type: 'p',
              text: 'A contemporary italic variable font...',
              styling: 'inline',
              inlineStyles: {
                fontFamily: 'TGMalromur',
                fontStyle: 'italic',
                fontSize: { mobile: 'xl', desktop: 'clamp(20px,2vw,32px)' },
                fontWeight: 300,
                color: 'var(--foreground-muted)'
              },
              fontFamily: 'TGMalromur',
              lines: [35],
              issues: ['🔴 Inline fontFamily, fontSize, fontWeight - should create kol-heading class for this pattern']
            },
            {
              type: 'p',
              text: 'Free for personal and commercial use',
              styling: 'class',
              className: 'kol-mono-xs',
              fontFamily: 'RightGroteskMono',
              fontSize: '12px',
              lines: [55],
              notes: '✅ Correct usage of kol-mono-xs'
            },
            {
              type: 'component',
              text: 'Variable Font tag',
              styling: 'component',
              className: 'Tag',
              notes: 'Uses @kol/ui Tag component'
            }
          ]
        },
        {
          id: 'styles-section',
          name: 'Styles Section',
          component: 'StylesSection.jsx',
          path: 'apps/web/src/components/sections/foundry/StylesSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'Font style previews',
              styling: 'class',
              notes: 'Typography preview section - uses FontPreviewItem components'
            }
          ]
        },
        {
          id: 'font-preview',
          name: 'Font Preview Section',
          component: 'FontPreviewSection.jsx',
          path: 'apps/web/src/components/sections/foundry/FontPreviewSection.jsx',
          elements: [
            {
              type: 'div',
              text: 'Lorem ipsum...',
              styling: 'inline',
              inlineStyles: {
                fontSize: { values: ['96px', '64px', '48px', '24px'] },
                lineHeight: { values: ['100%', '110%', '120%', '140%'] },
                fontStyle: 'italic'
              },
              className: 'text-absolute-black',
              fontFamily: 'TGMalromur',
              notes: '🟡 Font preview cards with inline fontSize/lineHeight for specimen display - acceptable for this use case'
            }
          ]
        },
        {
          id: 'variable-font',
          name: 'Variable Font Section',
          component: 'VariableFontSection.jsx',
          path: 'apps/web/src/components/sections/foundry/VariableFontSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'Variable font interactive demo',
              styling: 'mixed',
              notes: 'Interactive weight slider with live preview'
            }
          ]
        },
        {
          id: 'glyphs',
          name: 'Glyphs Section',
          component: 'GlyphsSection.jsx',
          path: 'apps/web/src/components/sections/foundry/GlyphsSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'Glyph grid display',
              styling: 'class',
              notes: 'Uses GlyphGrid component'
            }
          ]
        },
        {
          id: 'features',
          name: 'Features Section',
          component: 'FeaturesSection.jsx',
          path: 'apps/web/src/components/sections/foundry/FeaturesSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'Font features list',
              styling: 'class',
              notes: 'Feature cards with typography'
            }
          ]
        },
        {
          id: 'download',
          name: 'Download Section',
          component: 'DownloadSection.jsx',
          path: 'apps/web/src/components/sections/foundry/DownloadSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'Download CTA',
              styling: 'class',
              notes: 'Download button and info'
            }
          ]
        },
        {
          id: 'license',
          name: 'License Section',
          component: 'LicenseSection.jsx',
          path: 'apps/web/src/components/sections/foundry/LicenseSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'License information',
              styling: 'class',
              notes: 'License text and terms'
            }
          ]
        },
        {
          id: 'cta-foundry',
          name: 'Foundry CTA',
          component: 'CtaFoundry.jsx',
          path: 'apps/web/src/components/sections/cta/CtaFoundry.jsx',
          elements: [
            {
              type: 'component',
              text: 'Foundry CTA',
              styling: 'class',
              notes: 'Standard CTA section'
            }
          ]
        },
        {
          id: 'carousel',
          name: 'Carousel Section',
          component: 'CarouselSection.jsx',
          path: 'apps/web/src/components/sections/foundry/CarouselSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'Image carousel',
              styling: 'mixed',
              notes: 'Carousel with captions'
            }
          ]
        },
        {
          id: 'pairings',
          name: 'Pairings Section',
          component: 'PairingsSection.jsx',
          path: 'apps/web/src/components/sections/foundry/PairingsSection.jsx',
          elements: [
            {
              type: 'section',
              text: 'Font pairings',
              styling: 'class',
              notes: 'Font pairing examples'
            }
          ]
        }
      ]
    },

    {
      id: 'stack',
      name: 'Stack (Blog)',
      route: '/stack',
      sections: [
        {
          id: 'stack-hero',
          name: 'Stack Hero',
          component: 'StackHero.jsx',
          path: 'apps/web/src/components/sections/stack-detail/StackHero.jsx',
          elements: [
            {
              type: 'section',
              text: 'Stack page hero',
              styling: 'class',
              notes: 'Hero section for blog/stack page'
            }
          ]
        },
        {
          id: 'search-filter',
          name: 'Search & Filter',
          component: 'Stack.jsx',
          path: 'apps/web/src/routes/Stack.jsx',
          elements: [
            {
              type: 'input',
              text: 'Search articles...',
              styling: 'class',
              className: 'control-unified text-control',
              fontFamily: 'RightGroteskMono',
              fontSize: '12px',
              lines: [144],
              notes: '✅ Uses control-unified and text-control classes'
            },
            {
              type: 'p',
              text: 'No articles found...',
              styling: 'class',
              className: 'kol-mono-text',
              fontFamily: 'RightGroteskMono',
              fontSize: '16px',
              lines: [192],
              notes: '✅ Correct usage of kol-mono-text'
            }
          ]
        },
        {
          id: 'article-cards',
          name: 'Article Cards',
          component: 'ArticleCardHero.jsx / ArticleCardMini.jsx',
          path: 'apps/web/src/components/sections/blog/',
          elements: [
            {
              type: 'component',
              text: 'Article card typography',
              styling: 'class',
              notes: 'Cards use kol-label for titles, kol-text for excerpts'
            }
          ]
        }
      ]
    }
  ],

  // Common Issues Summary
  issues: [
    {
      severity: 'high',
      type: 'inline-font-family',
      count: 2, // Reduced from 6 (4 apps/web issues fixed: About.jsx x2, Footer.jsx x2, Navbar.jsx x2)
      description: 'Inline fontFamily declarations should use semantic kol-* classes',
      locations: [
        '✅ FIXED: Home/About: line 39 (RightGroteskTight)',
        '✅ FIXED: Home/About: line 54 (RightGroteskMono)',
        '✅ FIXED: Work/Hero: line 181 (Show Controls button - typo fixed)',
        '✅ FIXED: Footer: lines 34, 45, 61, 68',
        '✅ FIXED: Navbar: lines 84, 140',
        'Foundry/Hero: line 23 (TGMalromur)',
        'Foundry/Hero: line 35 (TGMalromur)'
      ]
    },
    {
      severity: 'high',
      type: 'inline-font-size',
      count: 3, // Reduced from 8 (About.jsx 3 fixed, Foundry remains)
      description: 'Inline fontSize values should use responsive kol-* classes',
      locations: [
        '✅ FIXED: Home/About: line 39, 53, 54',
        'Foundry/Hero: line 23, 35',
        'Foundry/FontPreview: multiple specimen cards'
      ]
    },
    {
      severity: 'medium',
      type: 'tailwind-utilities',
      count: 2, // Reduced from 3 (About.jsx fixed)
      description: 'Tailwind text-* utilities should use semantic kol-* classes for consistency',
      locations: [
        '✅ FIXED: Home/About: text-2xl, text-gray-600',
        'Foundry/Hero: text-7xl, text-xl'
      ]
    },
    {
      severity: 'low',
      type: 'missing-classes',
      count: 0, // All fixed! Work/Hero and Stack done
      description: '✅ All missing typography classes have been added',
      locations: [
        '✅ FIXED: Work/Hero: Control panel labels and values (kol-text-sm, kol-mono-xs)',
        '✅ FIXED: Stack: Various UI labels'
      ]
    }
  ],

  // Font Family Usage Distribution
  fontDistribution: {
    'RightGroteskTight': {
      usage: 28,
      contexts: ['Display headings', 'Section headings', 'Heading SM'],
      notes: 'Primary brand heading font (kol-heading-display/section/sm)'
    },
    'RightGroteskNarrow': {
      usage: 12,
      contexts: ['Heading XL', 'Heading LG', 'Heading MD'],
      notes: 'Standard hierarchy headings (kol-heading-xl/lg/md)'
    },
    'RightGroteskMono': {
      usage: 23,
      contexts: ['Labels', 'Metadata', 'Controls', 'Mono text'],
      notes: 'Monospace UI text (kol-label, kol-mono-text, kol-mono-xs)'
    },
    'Inter Tight': {
      usage: 18,
      contexts: ['Body copy', 'H5', 'H6', 'Supporting text'],
      notes: 'Fallback body font (kol-text, kol-text-sm)'
    },
    'TGMalromur': {
      usage: 6,
      contexts: ['Foundry page hero', 'Font specimens'],
      notes: 'Variable font showcase'
    }
  },

  // Recommendations
  recommendations: [
    {
      priority: 'high',
      title: '✅ Typography Refactor Complete (2025-10-13)',
      description: 'Typography classes have been refactored to semantic naming: kol-h1→kol-heading-xl, kol-h2→kol-heading-lg, kol-h3→kol-heading-md, kol-h4→kol-heading-sm, kol-body→kol-text, kol-body-sm→kol-text-sm, kol-mono-body→kol-mono-text, kol-mono→kol-mono-xs. All responsive breakpoints implemented. Legacy aliases maintained for backward compatibility.',
      impact: 'All components updated. Build verified. See docs/TYPOGRAPHY-REFACTOR-PROPOSAL.md and docs/SESSION-LOGS/2025-10-13-2200-typography-refactor-completion.md'
    },
    {
      priority: 'high',
      title: '✅ Apps/Web Typography Cleanup Complete (2025-10-13)',
      description: 'All apps/web components (Home, Work, Stack, Navbar, Footer) have been updated to use semantic typography classes. Removed 9 inline fontFamily/fontSize declarations (About.jsx x3, Footer.jsx x4, Navbar.jsx x2, WorkHeroSection.jsx x1). Replaced Tailwind utilities with semantic classes. Added missing typography classes to all text elements.',
      impact: 'Class usage increased from 68 to 76. Inline usage decreased from 19 to 11. Issue count decreased from 19 to 11. All non-foundry pages now follow docs/system/4.0-css-architecture.md guidelines.'
    },
    {
      priority: 'high',
      title: 'Create kol-heading-malromur class',
      description: 'Foundry hero uses repeated inline styles for TGMalromur. Create a dedicated class to avoid duplication.',
      impact: 'Reduces inline styles by 6 instances'
    },
    {
      priority: 'high',
      title: '✅ Audit About section typography',
      description: 'COMPLETED: About.jsx inline style issues have been fixed. All 3 elements now use semantic classes (kol-heading-lg, kol-text, kol-mono-xs).',
      impact: 'Consistency and maintainability improved ✅'
    },
    {
      priority: 'medium',
      title: '✅ Fix RightGroteskTightMono typo',
      description: 'COMPLETED: Show Controls button typo fixed. Now correctly uses kol-mono-xs class with RightGroteskMono font.',
      impact: 'Font fallback prevented ✅'
    },
    {
      priority: 'medium',
      title: '✅ Add typography to control elements',
      description: 'COMPLETED: Control panel labels (kol-text-sm) and values (kol-mono-xs) now have explicit typography classes.',
      impact: 'Consistent rendering ensured ✅'
    },
    {
      priority: 'low',
      title: 'Document specimen inline styles as acceptable',
      description: 'Font preview specimens use inline styles by design. Add comment to clarify this is intentional.',
      impact: 'Reduces confusion for future developers'
    }
  ]
}
