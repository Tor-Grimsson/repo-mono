/**
 * Print Store Data
 *
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated: 2026-02-18 21:11:12 UTC
 * Source: art-prints/manifest.yaml
 * Generator: art-prints/generate-prints-js.py
 *
 * To update this file:
 * 1. Edit print data in art-prints/print-{name}/data.yaml
 * 2. Run: python3 art-prints/generate-manifest.py
 * 3. Run: python3 art-prints/generate-prints-js.py
 *
 * Centralized data for all prints available for purchase.
 * Pricing is defined in printPricing (by size/edition).
 * Payment links are in paypalLinks (by size/edition/region).
 *
 * Print fields:
 * - id: Unique identifier (print-001 through print-024)
 * - name: Display name
 * - slug: URL slug for detail page
 * - description: Detailed description
 * - image: Primary image path (highest res artwork)
 * - detailImages: Print mockup + certificate
 * - images: Responsive artwork sizes for srcset
 * - category: Product category (all "Prints")
 * - year: Creation year
 * - tags: Searchable tags (empty - year already in data)
 * - featured: Boolean for featured status
 */

const cdnBase = 'https://b2.kolkrabbi.io/website'

// PayPal payment links by size + edition + shipping region
export const paypalLinks = {
  'A3-open-eu': 'https://www.paypal.com/ncp/payment/78EW9SNGUMUTQ',
  'A3-open-intl': 'https://www.paypal.com/ncp/payment/FK7FX2CSLTZ8S',
  'A3-limited-eu': 'https://www.paypal.com/ncp/payment/L6VA34TEV3K9L',
  'A3-limited-intl': 'https://www.paypal.com/ncp/payment/CQYLQRG6375YA',
  'A2-limited-eu': 'https://www.paypal.com/ncp/payment/ZWHCDFVV6F67U',
  'A2-limited-intl': 'https://www.paypal.com/ncp/payment/DXXYNSP3KFHQJ',
  'A1-limited-eu': 'https://www.paypal.com/ncp/payment/PLBBB4TN2E5EA',
  'A1-limited-intl': 'https://www.paypal.com/ncp/payment/XJJ73CFEJG3K8'
}

// Pricing by size + edition (EUR) - art price + shipping
export const printPricing = {
  'A3-open': { art: 140, shippingEU: 20, shippingIntl: 32 },
  'A3-limited': { art: 220, shippingEU: 20, shippingIntl: 32 },
  'A2-limited': { art: 320, shippingEU: 35, shippingIntl: 55 },
  'A1-limited': { art: 650, shippingEU: 60, shippingIntl: 95 }
}

// Static content for print detail overlay
export const printInfo = {
  overview: {
    description: 'This is an unframed archival art print, produced using museum-grade materials and professional printing standards. Each print is made to order, carefully inspected, signed, and shipped with protective packaging.'
  },
  edition: {
    intro: 'Each print is part of a limited edition. Once an edition is sold out, it will not be produced again in any size.',
    counts: {
      '594x841': 8,
      '420x594': 20,
      '297x420': 30
    },
    artistProofs: 'Not for sale'
  },
  materials: {
    /* The stocks in actual use (user 2026-08-29). `paper` / `weight` were a
     * single Hahnemühle line and are kept for the detail tab's existing rows,
     * now summarising the three rather than naming one that is not always the
     * one used. These do NOT vary per print — they are catalog-wide, which is
     * why they live here and not on a record. */
    paper: 'Canson or Hahnemühle cotton rag [100% cotton]',
    weight: '310gsm — 210gsm on A3',
    stocks: [
      {
        name: 'Canson Aquarelle Rag',
        weight: '310gsm',
        note: 'Heavy texture',
        sizes: 'A1 · A2 · A3'
      },
      {
        name: 'Canson Rag Pure White',
        weight: '310gsm',
        note: 'The whitest of the whites, heavy texture',
        sizes: 'A1 · A2 · A3'
      },
      {
        /* whichever of the three is available — the substitution is deliberate,
         * not a fallback, so the brand is not promised */
        name: 'Sihl, Hahnemühle or Canson textured',
        weight: '210gsm',
        note: 'Lighter but still textured, easier to roll',
        sizes: 'A3 only'
      }
    ],
    printType: 'Archival Giclée Print [Pigment Ink]',
    certificate: 'Signed with Certificate of Authenticity & embossed seal'
  },
  shipping: {
    intro: 'Prints ship in protective tubes within 5-10 business days. If you are based in Iceland, please reach out directly to arrange pickup or delivery and skip shipping charges.',
    vatNote: 'Artwork is VAT-exempt (Iceland).'
  }
}

const prints = [
  {
    id: 'print-001',
    name: 'Blokk',
    slug: 'blokk',
    description: 'Blokk print',
    image: `${cdnBase}/art-prints/print-blokk/artwork/blokk-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-blokk/print/blokk-print-1700.jpg`,
      `${cdnBase}/art-prints/print-blokk/blokk-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-blokk/artwork/blokk-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-blokk/artwork/blokk-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-blokk/artwork/blokk-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-blokk/artwork/blokk-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2020',
    tags: [],
    featured: true
  },
  {
    id: 'print-002',
    name: 'Skovia',
    slug: 'skovia',
    description: 'Skovia print',
    image: `${cdnBase}/art-prints/print-skovia/artwork/skovia-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-skovia/print/skovia-print-1700.jpg`,
      `${cdnBase}/art-prints/print-skovia/skovia-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-skovia/artwork/skovia-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-skovia/artwork/skovia-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-skovia/artwork/skovia-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-skovia/artwork/skovia-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2020',
    tags: [],
    featured: true
  },
  {
    id: 'print-003',
    name: 'Midnight',
    slug: 'midnight',
    description: 'Midnight print',
    image: `${cdnBase}/art-prints/print-midnight/artwork/midnight-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-midnight/print/midnight-print-1700.jpg`,
      `${cdnBase}/art-prints/print-midnight/midnight-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-midnight/artwork/midnight-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-midnight/artwork/midnight-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-midnight/artwork/midnight-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-midnight/artwork/midnight-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2014',
    tags: [],
    featured: true
  },
  {
    id: 'print-004',
    name: 'Midday',
    slug: 'midday',
    description: 'Midday print',
    image: `${cdnBase}/art-prints/print-midday/artwork/midday-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-midday/print/midday-print-1700.jpg`,
      `${cdnBase}/art-prints/print-midday/midday-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-midday/artwork/midday-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-midday/artwork/midday-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-midday/artwork/midday-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-midday/artwork/midday-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2014',
    tags: [],
    featured: true
  },
  {
    id: 'print-005',
    name: 'fvv',
    slug: 'fvv',
    description: 'fvv print',
    image: `${cdnBase}/art-prints/print-fvv/artwork/fvv-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-fvv/print/fvv-print-1700.jpg`,
      `${cdnBase}/art-prints/print-fvv/fvv-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-fvv/artwork/fvv-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-fvv/artwork/fvv-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-fvv/artwork/fvv-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-fvv/artwork/fvv-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2012',
    tags: [],
    featured: true
  },
  {
    id: 'print-006',
    name: 'Weissensee',
    slug: 'weissensee',
    description: 'Weissensee print',
    image: `${cdnBase}/art-prints/print-weissensee/artwork/weissensee-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-weissensee/print/weissensee-print-1700.jpg`,
      `${cdnBase}/art-prints/print-weissensee/weissensee-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-weissensee/artwork/weissensee-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-weissensee/artwork/weissensee-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-weissensee/artwork/weissensee-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-weissensee/artwork/weissensee-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2016',
    tags: [],
    featured: true
  },
  {
    id: 'print-007',
    name: 'Tangents',
    slug: 'tangents',
    description: 'Tangents print',
    image: `${cdnBase}/art-prints/print-tangents/artwork/tangents-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-tangents/print/tangents-print-1700.jpg`,
      `${cdnBase}/art-prints/print-tangents/tangents-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-tangents/artwork/tangents-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-tangents/artwork/tangents-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-tangents/artwork/tangents-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-tangents/artwork/tangents-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2020',
    tags: [],
    featured: true
  },
  {
    id: 'print-008',
    name: 'Faust',
    slug: 'faust',
    description: 'Faust print',
    image: `${cdnBase}/art-prints/print-faust/artwork/faust-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-faust/print/faust-print-1700.jpg`,
      `${cdnBase}/art-prints/print-faust/faust-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-faust/artwork/faust-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-faust/artwork/faust-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-faust/artwork/faust-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-faust/artwork/faust-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2016',
    tags: [],
    featured: true
  },
  {
    id: 'print-009',
    name: 'Tími I',
    slug: 'timi-01',
    description: 'Tími I print',
    image: `${cdnBase}/art-prints/print-timi-01/artwork/timi-01-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-timi-01/print/timi-01-print-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-01/timi-01-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-timi-01/artwork/timi-01-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-timi-01/artwork/timi-01-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-timi-01/artwork/timi-01-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-01/artwork/timi-01-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2012',
    tags: [],
    featured: true
  },
  {
    id: 'print-010',
    name: 'Tími II',
    slug: 'timi-02',
    description: 'Tími II print',
    image: `${cdnBase}/art-prints/print-timi-02/artwork/timi-02-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-timi-02/print/timi-02-print-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-02/timi-02-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-timi-02/artwork/timi-02-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-timi-02/artwork/timi-02-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-timi-02/artwork/timi-02-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-02/artwork/timi-02-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2014',
    tags: [],
    featured: true
  },
  {
    id: 'print-011',
    name: 'Tími III',
    slug: 'timi-03',
    description: 'Tími III print',
    image: `${cdnBase}/art-prints/print-timi-03/artwork/timi-03-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-timi-03/print/timi-03-print-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-03/timi-03-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-timi-03/artwork/timi-03-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-timi-03/artwork/timi-03-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-timi-03/artwork/timi-03-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-03/artwork/timi-03-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2015',
    tags: [],
    featured: true
  },
  {
    id: 'print-012',
    name: 'Tími IV',
    slug: 'timi-04',
    description: 'Tími IV print',
    image: `${cdnBase}/art-prints/print-timi-04/artwork/timi-04-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-timi-04/print/timi-04-print-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-04/timi-04-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-timi-04/artwork/timi-04-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-timi-04/artwork/timi-04-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-timi-04/artwork/timi-04-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-timi-04/artwork/timi-04-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2013',
    tags: [],
    featured: true
  },
  {
    id: 'print-013',
    name: 'Mýtar',
    slug: 'mytar',
    description: 'Mýtar print',
    image: `${cdnBase}/art-prints/print-mytar/artwork/mytar-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-mytar/print/mytar-print-1700.jpg`,
      `${cdnBase}/art-prints/print-mytar/mytar-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-mytar/artwork/mytar-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-mytar/artwork/mytar-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-mytar/artwork/mytar-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-mytar/artwork/mytar-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2011',
    tags: [],
    featured: true
  },
  {
    id: 'print-014',
    name: 'Borg',
    slug: 'borg',
    description: 'Borg print',
    image: `${cdnBase}/art-prints/print-borg/artwork/borg-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-borg/print/borg-print-1700.jpg`,
      `${cdnBase}/art-prints/print-borg/borg-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-borg/artwork/borg-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-borg/artwork/borg-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-borg/artwork/borg-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-borg/artwork/borg-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2018',
    tags: [],
    featured: true
  },
  {
    id: 'print-015',
    name: 'Traum',
    slug: 'traum',
    description: 'Traum print',
    image: `${cdnBase}/art-prints/print-traum/artwork/traum-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-traum/print/traum-print-1700.jpg`,
      `${cdnBase}/art-prints/print-traum/traum-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-traum/artwork/traum-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-traum/artwork/traum-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-traum/artwork/traum-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-traum/artwork/traum-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2015',
    tags: [],
    featured: true
  },
  {
    id: 'print-016',
    name: 'Ubu Roi',
    slug: 'uburoi',
    description: 'Ubu Roi print',
    image: `${cdnBase}/art-prints/print-uburoi/artwork/uburoi-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-uburoi/print/uburoi-print-1700.jpg`,
      `${cdnBase}/art-prints/print-uburoi/uburoi-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-uburoi/artwork/uburoi-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-uburoi/artwork/uburoi-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-uburoi/artwork/uburoi-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-uburoi/artwork/uburoi-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2022',
    tags: [],
    featured: true
  },
  {
    id: 'print-017',
    name: 'Skinnalón',
    slug: 'skinnalon',
    description: 'Skinnalón print',
    image: `${cdnBase}/art-prints/print-skinnalon/artwork/skinnalon-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-skinnalon/print/skinnalon-print-1700.jpg`,
      `${cdnBase}/art-prints/print-skinnalon/skinnalon-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-skinnalon/artwork/skinnalon-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-skinnalon/artwork/skinnalon-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-skinnalon/artwork/skinnalon-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-skinnalon/artwork/skinnalon-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2015',
    tags: [],
    featured: true
  },
  {
    id: 'print-018',
    name: 'Hornhimna',
    slug: 'hornhimna',
    description: 'Hornhimna print',
    image: `${cdnBase}/art-prints/print-hornhimna/artwork/hornhimna-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-hornhimna/print/hornhimna-print-1700.jpg`,
      `${cdnBase}/art-prints/print-hornhimna/hornhimna-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-hornhimna/artwork/hornhimna-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-hornhimna/artwork/hornhimna-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-hornhimna/artwork/hornhimna-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-hornhimna/artwork/hornhimna-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2023',
    tags: [],
    featured: true
  },
  {
    id: 'print-019',
    name: 'Himnuhorn',
    slug: 'himnuhorn',
    description: 'Himnuhorn print',
    image: `${cdnBase}/art-prints/print-himnuhorn/artwork/himnuhorn-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-himnuhorn/print/himnuhorn-print-1700.jpg`,
      `${cdnBase}/art-prints/print-himnuhorn/himnuhorn-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-himnuhorn/artwork/himnuhorn-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-himnuhorn/artwork/himnuhorn-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-himnuhorn/artwork/himnuhorn-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-himnuhorn/artwork/himnuhorn-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2023',
    tags: [],
    featured: true
  },
  {
    id: 'print-020',
    name: 'Himbrak',
    slug: 'himbrak',
    description: 'Himbrak print',
    image: `${cdnBase}/art-prints/print-himbrak/artwork/himbrak-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-himbrak/print/himbrak-print-1700.jpg`,
      `${cdnBase}/art-prints/print-himbrak/himbrak-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-himbrak/artwork/himbrak-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-himbrak/artwork/himbrak-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-himbrak/artwork/himbrak-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-himbrak/artwork/himbrak-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2024',
    tags: [],
    featured: true
  },
  {
    id: 'print-021',
    name: 'Trölla',
    slug: 'trolla',
    description: 'Trölla print',
    image: `${cdnBase}/art-prints/print-trolla/artwork/trolla-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-trolla/print/trolla-print-1700.jpg`,
      `${cdnBase}/art-prints/print-trolla/trolla-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-trolla/artwork/trolla-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-trolla/artwork/trolla-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-trolla/artwork/trolla-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-trolla/artwork/trolla-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2025',
    tags: [],
    featured: true
  },
  {
    id: 'print-022',
    name: 'Myrkvi',
    slug: 'myrkvi',
    description: 'Myrkvi print',
    image: `${cdnBase}/art-prints/print-myrkvi/artwork/myrkvi-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-myrkvi/print/myrkvi-print-1700.jpg`,
      `${cdnBase}/art-prints/print-myrkvi/myrkvi-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-myrkvi/artwork/myrkvi-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-myrkvi/artwork/myrkvi-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-myrkvi/artwork/myrkvi-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-myrkvi/artwork/myrkvi-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2019',
    tags: [],
    featured: true
  },
  {
    id: 'print-023',
    name: 'Frank',
    slug: 'frank',
    description: 'Frank print',
    image: `${cdnBase}/art-prints/print-frank/artwork/frank-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-frank/print/frank-print-1700.jpg`,
      `${cdnBase}/art-prints/print-frank/frank-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-frank/artwork/frank-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-frank/artwork/frank-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-frank/artwork/frank-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-frank/artwork/frank-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2017',
    tags: [],
    featured: true
  },
  {
    id: 'print-024',
    name: 'Launráð',
    slug: 'launrad',
    description: 'Launráð print',
    image: `${cdnBase}/art-prints/print-launrad/artwork/launrad-artwork-2840.jpg`,
    detailImages: [
      `${cdnBase}/art-prints/print-launrad/print/launrad-print-1700.jpg`,
      `${cdnBase}/art-prints/print-launrad/launrad-certificate.jpg`
    ],
    images: [
      `${cdnBase}/art-prints/print-launrad/artwork/launrad-artwork-566.jpg`,
      `${cdnBase}/art-prints/print-launrad/artwork/launrad-artwork-1132.jpg`,
      `${cdnBase}/art-prints/print-launrad/artwork/launrad-artwork-1700.jpg`,
      `${cdnBase}/art-prints/print-launrad/artwork/launrad-artwork-2840.jpg`
    ],
    category: 'Prints',
    year: '2013',
    tags: [],
    featured: true
  }
]

// Export all data
export { prints }

// Export structured data for filters
export const filterData = {
  categories: [...new Set(prints.map(p => p.category))].sort(),
  years: [...new Set(prints.map(p => p.year))].sort((a, b) => b - a),
  featured: prints.filter(p => p.featured)
}

// Helper to get print by slug
export const getPrintBySlug = (slug) => prints.find(p => p.slug === slug)

// Helper to format price (EUR only)
export const formatPrice = (price) => {
  if (typeof price !== 'number') return ''
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(price)
}

export default prints
