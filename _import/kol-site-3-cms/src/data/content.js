export const filters = [
  { id: 'all', label: 'All' },
  { id: 'design', label: 'Design' },
  { id: 'tech', label: 'Tech' },
  { id: 'culture', label: 'Culture' },
  { id: 'environment', label: 'Environment' },
];

export const heroPrimary = {
  eyebrow: 'Feature',
  title: 'Type and technology, beautifully aligned.',
  summary:
    'Exploring typography, product design, and the culture around the things we make — delivered with newsroom clarity and editorial punch.',
  meta: ['Updated Oct 8, 2025', '8 min read'],
};

export const heroSecondary = {
  kicker: 'Design',
  title: 'How brutalist type can feel friendly',
  summary:
    'Borrowing the high-contrast, big-type energy of ohnotype.co while keeping the content tidy and approachable.',
  meta: ['Oct 3, 2025', '5 min read'],
  image:
    'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop',
  aspect: '3 / 2',
};

export const articleCards = [
  {
    id: 'grids',
    kicker: 'Design',
    title: 'Grids that breathe: spacing systems that scale',
    summary: 'A pragmatic guide to vertical rhythm and spatial scales that adapt from mobile to widescreen.',
    meta: ['Oct 1, 2025', '6 min read'],
    image: 'https://images.unsplash.com/photo-1529336953121-ad5a0d43d0f5?q=80&w=1600&auto=format&fit=crop',
    tags: ['design', 'culture'],
  },
  {
    id: 'pipelines',
    kicker: 'Tech',
    title: 'From render to reality: fast pipelines for teams',
    summary:
      'Ship beautiful frontends faster with component tokens, CSS variables, and strong editorial patterns.',
    meta: ['Sep 27, 2025', '4 min read'],
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    tags: ['tech'],
  },
  {
    id: 'sustainable',
    kicker: 'Environment',
    title: 'Sustainable defaults: lighter pages, happier readers',
    summary:
      'Performance is part of the planet: designing for smaller payloads and calmer energy usage.',
    meta: ['Sep 19, 2025', '7 min read'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    tags: ['culture', 'environment'],
  },
  {
    id: 'editorial',
    kicker: 'Culture',
    title: 'Editorial voice: writing UI like a magazine',
    summary:
      'Borrowing newsroom tone and structure to make product updates readable and memorable.',
    meta: ['Sep 10, 2025', '5 min read'],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
    tags: ['culture', 'design'],
  },
];

export const cmsCards = [
  {
    id: 'variable-fonts',
    title: 'Variable fonts, variable feelings',
    meta: 'Design · Sep 8, 2025',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop',
    tags: ['design'],
  },
  {
    id: 'accessible-audio',
    title: 'Accessible audio: captions, contrast, context',
    meta: 'Tech · Sep 6, 2025',
    image: 'https://images.unsplash.com/photo-1505748993095-22fc5f0b7c01?q=80&w=600&auto=format&fit=crop',
    tags: ['tech'],
  },
  {
    id: 'calm-changelog',
    title: 'The calm changelog',
    meta: 'Culture · Sep 2, 2025',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    tags: ['culture'],
  },
  {
    id: 'greener-hosting',
    title: 'Greener hosting 101',
    meta: 'Environment · Aug 27, 2025',
    image: 'https://images.unsplash.com/photo-1526403221775-4aa7c3a59f17?q=80&w=600&auto=format&fit=crop',
    tags: ['environment'],
  },
];

export const postContent = {
  eyebrow: 'Feature',
  title: 'Building a Design System: Typography, Spacing, and Component Architecture',
  meta: ['By Sarah Chen', 'Oct 15, 2025', '8 min read'],
  heroImage:
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000&auto=format&fit=crop',
  sources: [
    {
      title: 'Refactoring UI — Design System Best Practices',
      url: 'https://refactoringui.com',
      meta: 'Adam Wathan & Steve Schoger',
    },
    {
      title: 'Atomic Design by Brad Frost',
      url: 'https://atomicdesign.bradfrost.com',
      meta: 'bradfrost.com',
    },
    {
      title: 'CSS Custom Properties Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
      meta: 'MDN Web Docs',
    },
    {
      title: 'Design Systems Handbook',
      url: 'https://www.designbetter.co/design-systems-handbook',
      meta: 'InVision',
    },
    {
      title: 'Storybook Documentation',
      url: 'https://storybook.js.org/docs',
      meta: 'storybook.js.org',
    },
  ],
  body: [
    {
      type: 'paragraph',
      content:
        "Every design system starts with a question: how do we create consistency without sacrificing creativity? In this guide, we'll explore the foundational elements of a scalable design system—from typography and spacing to component architecture.",
    },
    { type: 'heading-2', content: 'The Foundation: CSS Custom Properties' },
    {
      type: 'paragraph',
      content:
        'Modern design systems rely heavily on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" target="_blank">CSS custom properties</a> (variables) for maintainability. They provide a single source of truth that can be updated globally:',
      hasHTML: true,
    },
    {
      type: 'code',
      language: 'css',
      label: 'Example 1 — CSS Variables',
      content: `:root {
  --color-primary: #0066cc;
  --color-text: #1a1a1a;
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --font-sans: 'Inter', system-ui, sans-serif;
}`,
      caption: 'Define your design tokens as CSS custom properties at the root level',
    },
    {
      type: 'paragraph',
      content:
        'This approach makes theming trivial—simply override these variables in a different context, and your entire system adapts.',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
      alt: 'Design system color palette',
      label: 'Figure 1 — Color Palette',
      caption: 'A well-organized color system provides visual hierarchy',
    },
    { type: 'heading-2', content: 'Fluid Typography with Clamp' },
    {
      type: 'paragraph',
      content:
        "The clamp() function is a game-changer for responsive typography. It allows text to scale fluidly between minimum and maximum sizes:",
    },
    {
      type: 'code',
      language: 'css',
      label: 'Example 2 — Responsive Typography',
      content: `h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

p {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.6;
}`,
      caption: 'Using clamp() for fluid typography that scales smoothly across all screen sizes',
    },
    {
      type: 'blockquote',
      content: 'Good typography is invisible. Great typography makes everything else better.',
    },
    { type: 'heading-3', content: 'Spacing Scales That Make Sense' },
    {
      type: 'paragraph',
      content:
        "Consistent spacing creates visual rhythm. A geometric scale (like 4px, 8px, 16px, 24px, 32px) provides predictable options that work harmoniously together.",
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1600&auto=format&fit=crop',
      alt: 'Spacing and grid system',
      label: 'Figure 2 — Spacing System',
      caption: 'Consistent spacing creates visual rhythm and hierarchy',
    },
    { type: 'heading-2', content: 'Component Architecture' },
    {
      type: 'paragraph',
      content:
        'In React, we follow <a href="https://atomicdesign.bradfrost.com" target="_blank">atomic design</a> principles: atoms (buttons, inputs), molecules (search bars, cards), organisms (navigation, forms), and templates (page layouts).',
      hasHTML: true,
    },
    {
      type: 'code',
      language: 'jsx',
      label: 'Example 3 — React Components',
      content: `// Atom: Button
const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      {...props}
    >
      {children}
    </button>
  );
};

// Molecule: SearchBar
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search..."
      />
    </div>
  );
};`,
      caption: 'Building from atoms (Button) to molecules (SearchBar) following atomic design principles',
    },
    {
      type: 'paragraph',
      content:
        'This hierarchy makes it easy to compose interfaces from smaller, reusable pieces. Each component has a single responsibility and can be tested in isolation.',
    },
    { type: 'heading-3', content: 'State Management Patterns' },
    {
      type: 'paragraph',
      content:
        'For shared state like filters and search queries, we use React Context to avoid prop drilling:',
    },
    {
      type: 'code',
      language: 'jsx',
      content: `const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({ category: 'all' });
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, searchQuery, setSearchQuery }}
    >
      {children}
    </FilterContext.Provider>
  );
};`,
    },
    {
      type: 'blockquote',
      content: 'A design system is never done—it evolves with your product and your team.',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
      alt: 'Component library documentation',
      caption: 'Documentation is as important as the components themselves',
    },
    { type: 'heading-2', content: 'Documentation and Tooling' },
    {
      type: 'paragraph',
      content:
        'A design system without documentation is just a collection of components. Tools like <a href="https://storybook.js.org" target="_blank">Storybook</a> help teams visualize and test components in isolation:',
      hasHTML: true,
    },
    {
      type: 'code',
      language: 'bash',
      content: `# Install Storybook
npx storybook@latest init

# Run Storybook dev server
npm run storybook`,
    },
    {
      type: 'paragraph',
      content:
        'Every component should have examples showing its variants, states (hover, active, disabled), and usage guidelines. This serves as both documentation and a testing ground.',
    },
    { type: 'heading-2', content: 'Conclusion' },
    {
      type: 'paragraph',
      content:
        "Building a design system is an investment in your product's future. Start small—with typography and spacing—then grow organically as patterns emerge. Remember: the best design system is the one your team actually uses.",
    },
    {
      type: 'paragraph',
      content:
        'Focus on consistency, maintainability, and developer experience. Document everything. And most importantly, treat your design system as a product with real users: your fellow designers and developers.',
    },
  ],
};
