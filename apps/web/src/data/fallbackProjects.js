const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/website-global/fallback'

export const fallbackProjects = [
  {
    _id: 'fallback-kolkrabbi-identity-refresh',
    title: 'Kolkrabbi Identity Refresh',
    slug: { current: 'kolkrabbi-identity-refresh' },
    client: 'Kolkrabbi Studio',
    year: '2024',
    services: ['Brand Identity', 'Art Direction', 'Typography'],
    featured: true,
    order: 1,
    thumbnail: {
      _type: 'fallbackImage',
      url: `${cdnBase}/hz/image-01/1200.jpg`,
      alt: 'Kolkrabbi identity thumbnail'
    },
    heroImage: {
      _type: 'fallbackImage',
      url: `${cdnBase}/hz/image-01/1200.jpg`,
      alt: 'Kolkrabbi hero composition'
    },
    gallery: [
      {
        _type: 'fallbackImage',
        url: `${cdnBase}/hz/image-01/1200.jpg`,
        alt: 'Layout detail',
        caption: 'Grid-based layout exploration'
      },
      {
        _type: 'fallbackImage',
        url: `${cdnBase}/hz/image-02/1200.jpg`,
        alt: 'Lettering closeup',
        caption: 'Lettering system closeup'
      },
      {
        _type: 'fallbackImage',
        url: `${cdnBase}/hz/image-02/1200.jpg`,
        alt: 'Lettering set',
        caption: 'Type pairings for editorial applications'
      }
    ],
    summary:
      'A confident refresh of the Kolkrabbi identity system, balancing bespoke typography and expressive motion with a minimal palette.',
    content: [
      {
        _type: 'block',
        _key: 'paragraph-0',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'paragraph-0-span',
            text: 'Kolkrabbi is a Reykjavík-based studio exploring bold, brutalist-informed branding systems. The refresh unifies motion, typography, and print collateral under a single modular language.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'paragraph-1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'paragraph-1-span',
            text: 'A compressed grotesk headline face anchors the system, paired with a nimble variable serif in editorial contexts. The identity scales from sticker packs to immersive exhibition graphics without losing recognisability.'
          }
        ]
      }
    ]
  },
  {
    _id: 'fallback-trolltunga-experience',
    title: 'Trolltunga Experience',
    slug: { current: 'trolltunga-experience' },
    client: 'Visit Norway',
    year: '2023',
    services: ['Digital Experience', 'Art Direction'],
    featured: true,
    order: 2,
    thumbnail: {
      _type: 'fallbackImage',
      url: `${cdnBase}/hz/image-01/1200.jpg`,
      alt: 'Trolltunga cliff hero'
    },
    heroImage: {
      _type: 'fallbackImage',
      url: `${cdnBase}/hz/image-01/1200.jpg`,
      alt: 'Trolltunga journey screens'
    },
    gallery: [
      {
        _type: 'fallbackImage',
        url: `${cdnBase}/hz/image-01/1200.jpg`,
        alt: 'Icon system',
        caption: 'Navigation iconography inspired by Norwegian trail markers'
      },
      {
        _type: 'fallbackImage',
        url: `${cdnBase}/hz/image-02/1200.jpg`,
        alt: 'Poster design',
        caption: 'Print collateral for summit events'
      },
      {
        _type: 'fallbackImage',
        url: `${cdnBase}/hz/image-02/1200.jpg`,
        alt: 'Typography spread',
        caption: 'Typography exploration for the digital experience'
      }
    ],
    summary:
      'A destination storytelling platform that brings the Trolltunga trail to life through motion, typography, and sensory-rich visuals.',
    content: [
      {
        _type: 'block',
        _key: 'paragraph-0',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'paragraph-0-span',
            text: 'The Trolltunga digital experience pairs cinematic footage with real-time weather data to prepare hikers for the climb. A modular UI system adapts to different trail stages.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'paragraph-1',
        style: 'normal',
        markDefs: [
          {
            _key: 'link-behance',
            _type: 'link',
            href: 'https://behance.net'
          }
        ],
        children: [
          {
            _type: 'span',
            _key: 'paragraph-1-span',
            text: 'Interactive wayfinding overlays guide visitors through the terrain while maintaining a minimal, typographic aesthetic. The system extends to editorial features and print collateral.',
            marks: ['link-behance']
          }
        ]
      }
    ]
  }
]

export function findFallbackProject(slug) {
  return fallbackProjects.find((project) => project.slug?.current === slug) || null
}
