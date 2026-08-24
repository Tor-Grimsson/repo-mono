/**
 * SEO Metadata Configuration
 * Centralized metadata for all routes to ensure consistency
 */

export const seoMetadata = {
  // Foundry Pages
  foundry: {
    overview: {
      title: 'Type Foundry — Kolkrabbi',
      description: 'Free, open-source typefaces designed for real-world applications. Download custom fonts under SIL OFL license.',
      ogTitle: 'Kolkrabbi Type Foundry',
      ogDescription: 'Discover free, open-source typefaces for design projects',
      ogUrl: 'https://kolkrabbi.io/foundry'
    },
    typefaces: {
      title: 'All Typefaces — Kolkrabbi Foundry',
      description: 'Browse our complete library of free, open-source typefaces including Málrómur, Rót, Gullhamrar, and more.',
      ogTitle: 'Kolkrabbi Typeface Library',
      ogDescription: 'Browse all available free typefaces from Kolkrabbi',
      ogUrl: 'https://kolkrabbi.io/foundry/typefaces'
    },
    specimens: {
      title: 'Type Specimens — Kolkrabbi Foundry',
      description: 'Explore detailed type specimens showcasing our typefaces in real-world applications and contexts.',
      ogTitle: 'Type Specimens Collection',
      ogDescription: 'View type specimens for all Kolkrabbi typefaces',
      ogUrl: 'https://kolkrabbi.io/foundry/specimen'
    },
    licensing: {
      title: 'Font Licensing — Kolkrabbi Foundry',
      description: 'All Kolkrabbi typefaces are free and open-source under the SIL Open Font License (OFL). Learn about usage rights and permissions.',
      ogTitle: 'Font Licensing Information',
      ogDescription: 'Free and open-source fonts under SIL OFL license',
      ogUrl: 'https://kolkrabbi.io/foundry/licensing'
    }
  },

  // Individual Typeface Pages
  typefaces: {
    malromur: {
      title: 'Málrómur — Variable Serif Typeface | Kolkrabbi Foundry',
      description: 'Málrómur is a variable serif typeface designed for Icelandic editorial and literary design. Free download under SIL Open Font License.',
      ogTitle: 'Málrómur — Variable Serif Typeface',
      ogDescription: 'Variable serif typeface for editorial design. Free download.',
      ogUrl: 'https://kolkrabbi.io/foundry/typefaces/malromur'
    },
    root: {
      title: 'Rót — Display Typeface | Kolkrabbi Foundry',
      description: 'Rót is a bold display typeface with geometric characteristics. Perfect for headlines and large-scale typography. Free under SIL OFL.',
      ogTitle: 'Rót — Display Typeface',
      ogDescription: 'Bold geometric display typeface. Free download.',
      ogUrl: 'https://kolkrabbi.io/foundry/typefaces/root'
    },
    trollatunga: {
      title: 'Trollatunga — Experimental Typeface | Kolkrabbi Foundry',
      description: 'Trollatunga is an experimental typeface exploring unique letterforms and typography. Free under SIL Open Font License.',
      ogTitle: 'Trollatunga — Experimental Typeface',
      ogDescription: 'Experimental typeface with unique letterforms. Free download.',
      ogUrl: 'https://kolkrabbi.io/foundry/typefaces/trollatunga'
    },
    dylgjur: {
      title: 'Dylgjur — Experimental Sans-Serif Display Typeface | Kolkrabbi Foundry',
      description: 'Experimental sans-serif display typeface. Free to download under SIL Open Font License.',
      ogTitle: 'Dylgjur — Experimental Sans-Serif Display',
      ogDescription: 'Experimental sans-serif display typeface. Free download.',
      ogUrl: 'https://kolkrabbi.io/foundry/typefaces/dylgjur'
    },
    gullhamrar: {
      title: 'Gullhamrar — Typeface | Kolkrabbi Foundry',
      description: 'Gullhamrar is a typeface from the Kolkrabbi foundry collection. Free to download under SIL Open Font License.',
      ogTitle: 'Gullhamrar — Typeface',
      ogDescription: 'Typeface from Kolkrabbi foundry. Free download.',
      ogUrl: 'https://kolkrabbi.io/foundry/typefaces/gullhamrar'
    }
  },

  // Top-level Pages
  home: {
    title: 'Kolkrabbi — Design System, Type Foundry & Studio',
    description: 'Explore Kolkrabbi: A comprehensive design system featuring custom typefaces, interactive specimens, design patterns, and creative explorations.',
    image: 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'
  },
  prints: {
    title: 'Art Prints — Kolkrabbi',
    description: 'Browse archival art prints by Kolkrabbi. Limited edition Giclée prints on Hahnemühle cotton paper.',
    image: 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'
  },
  work: {
    title: 'Work — Kolkrabbi',
    description: 'Selected client and personal projects spanning brand identity, type design, and digital products.',
    image: 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'
  },
  stack: {
    title: 'Stack — Kolkrabbi',
    description: 'Articles, research, and notes on design, typography, and creative process.',
    image: 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'
  },
  about: {
    title: 'About — Kolkrabbi',
    description: 'Kolkrabbi is a design studio and type foundry based in Iceland, creating custom typefaces and design systems.',
    image: 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'
  },
  contact: {
    title: 'Contact — Kolkrabbi',
    description: 'Get in touch with Kolkrabbi for project inquiries, licensing, or collaborations.',
    image: 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'
  }
}

/**
 * Flat route → {title, description, image} map for the metadata proxy.
 * Used server-side; must remain CommonJS-compatible (no dynamic imports).
 *
 * To change the OG image for any static page:
 *   1. Drop a 1200×630 JPG/PNG into apps/web/public/img/open-graph/
 *   2. Update the `image` value below to 'https://kolkrabbi.io/img/open-graph/your-file.jpg'
 *   3. Deploy — no code changes elsewhere needed.
 */
const BASE = 'https://kolkrabbi.io'
const OG = `${BASE}/img/open-graph`
// Foundry OG images live in the same open-graph/ folder since the 2026-08-14
// root-images merge, prefixed open-graph-foundry-*.
const OG_FOUNDRY = OG

// ─── Edit these to assign a specific image to each section ───────────────────
const OG_DEFAULT   = `${OG}/open-graph-01.png`         // site-wide fallback
const OG_HOME      = `${OG}/open-graph-01.png`         // /
const OG_PRINTS    = `${OG}/open-graph-01.png`         // /prints  (swap for a horizontal print image)
const OG_WORK      = `${OG}/open-graph-01.png`         // /work
const OG_STACK     = `${OG}/open-graph-01.png`         // /stack
const OG_WORKSHOP  = `${OG}/open-graph-01.png`         // /workshop
// ─────────────────────────────────────────────────────────────────────────────

export const STATIC_META = {
  '/':        { title: seoMetadata.home.title,    description: seoMetadata.home.description,    image: OG_HOME },
  '/prints':  { title: seoMetadata.prints.title,  description: seoMetadata.prints.description,  image: OG_PRINTS },
  '/work':    { title: seoMetadata.work.title,    description: seoMetadata.work.description,    image: OG_WORK },
  '/stack':   { title: seoMetadata.stack.title,   description: seoMetadata.stack.description,   image: OG_STACK },
  '/studio':  { title: 'Studio — Kolkrabbi', description: 'Kolkrabbi studio — design systems, brand identity, and digital products.', image: OG_DEFAULT },
  '/workshop': { title: 'Workshop — Kolkrabbi', description: 'Design experiments, tools, and interactive explorations.', image: OG_WORKSHOP },

  // Foundry — per-typeface images in the shared open-graph/ folder (open-graph-foundry-*)
  '/foundry':                      { title: seoMetadata.foundry.overview.title,   description: seoMetadata.foundry.overview.description,   image: `${OG_FOUNDRY}/open-graph-foundry.jpg` },
  '/foundry/typefaces':            { title: seoMetadata.foundry.typefaces.title,  description: seoMetadata.foundry.typefaces.description,   image: `${OG_FOUNDRY}/open-graph-foundry.jpg` },
  '/foundry/licensing':            { title: seoMetadata.foundry.licensing.title,  description: seoMetadata.foundry.licensing.description,   image: `${OG_FOUNDRY}/open-graph-foundry.jpg` },
  '/foundry/typefaces/malromur':   { title: seoMetadata.typefaces.malromur.title,   description: seoMetadata.typefaces.malromur.description,   image: `${OG_FOUNDRY}/open-graph-foundry-malromur.jpg` },
  '/foundry/typefaces/root':       { title: seoMetadata.typefaces.root.title,       description: seoMetadata.typefaces.root.description,       image: `${OG_FOUNDRY}/open-graph-foundry-rot.jpg` },
  '/foundry/typefaces/trollatunga':{ title: seoMetadata.typefaces.trollatunga.title,description: seoMetadata.typefaces.trollatunga.description,image: `${OG_FOUNDRY}/open-graph-foundry-trollatunga.jpg` },
  '/foundry/typefaces/dylgjur':    { title: seoMetadata.typefaces.dylgjur.title,    description: seoMetadata.typefaces.dylgjur.description,    image: `${OG_FOUNDRY}/open-graph-foundry-dylgjur.jpg` },
  '/foundry/typefaces/gullhamrar': { title: seoMetadata.typefaces.gullhamrar.title, description: seoMetadata.typefaces.gullhamrar.description, image: `${OG_FOUNDRY}/open-graph-foundry-gullhamrar.jpg` },
}
