/**
 * Brand info — canonical address / contact / identity strings.
 *
 * Single source of truth for all stationery, label, and asset mocks.
 * Update once, propagates everywhere. Used by StationeryMocks plus
 * future generators (social, type lab) that surface contact details.
 *
 * Kolkrabbi (KOL) — design studio + type foundry, Iceland.
 */

export const BRAND_INFO = {
  identity: {
    founder:     'Tór Grímsson', // full: Þórður Grímsson
    role:        'Founder · Designer',
    established: '2019',
    name:        'Kolkrabbi',
    nameShort:   'KOL',
  },
  contact: {
    email: 'tor@kolkrabbi.io', // hello@kolkrabbi.io = general/newsletter sending address
    phone: '+354 892 2928',
    web:   'kolkrabbi.io',
  },
  social: {
    instagram: 'kolkrabbi_',
    youtube:   '@kolkrabbi-io',
    tiktok:    'kolkrabbi_',
  },
  studio: {
    street:   'Skipholt 51, Apt. 303', // per cv-2023 — confirm current
    postcode: '105 Reykjavík',
    country:  'Iceland',
    city:     'Reykjavík',
    locShort: 'Reykjavík · IS',
  },
  legal: {
    entity: 'Kolkrabbi Vinnustofa',
    kt:     '280485-2339', // personal kennitala (PII) — sole operator. Scrub if this file ever goes public.
    vat:    '109052',      // VSK number
  },
  labels: {
    madeIn:    'Made in Iceland',
    handmade:  '', // TODO: used by StationeryMocks (AC garment label — repurpose or drop for KOL)
    handBy:    '', // TODO: used by StationeryMocks
    manifesto: '', // TODO: KOL tagline
  },
}
