/**
 * Kolkrabbi — business / career / practice metadata.
 *
 * Internal registry (behind access — NOT customer-facing). Complements
 * info.js (identity). Carries bio, timeline, career, music + art projects,
 * type work, press, companies, social, and open gaps.
 *
 * Subject: Þórður Grímsson (studio display name "Tór Grímsson"), designer ·
 * artist · musician. Pseudonyms: Biskup (drawing), Svartval (prints),
 * Konsulat (music). Founder of Kolkrabbi (2019), a Reykjavík design studio
 * + type foundry.
 *
 * Enriched 2026-05-27 from first-party vault (kol-studio/kol-resume: CV 2026,
 * personal bios, profile overview) + a public-web scrape (Skemman, Behance,
 * Discogs, Bandcamp, Karolina Fund, Morgunblaðið, Reykjavík Grapevine,
 * Luc Devroye). Items marked TODO / TBD need first-party confirmation.
 */

/* ── Personal / bio facts (private — surface only what's appropriate per page). ── */

export const BIO = {
  fullName:    'Þórður Grímsson',
  displayName: 'Tór Grímsson',
  birthDate:   '1985-04-28',         // confirmed (kennitala on file, docs-studio).
  birthYear:   1985,
  hometown:    'Westfjords, Iceland', // raised in the Westfjords (Ísafjörður per mbl); based in Reykjavík.
  currentCity: 'Reykjavík, Iceland',
  aliases:     ['Biskup', 'Svartval'], // Biskup = drawing, Svartval = prints; music as Konsulat
  email:       'tor@kolkrabbi.io',
  phone:       '+354 892 2928',
  bio:
    'Tór (Þórður Grímsson) is a multi-disciplinary designer and creative director based in ' +
    'Reykjavík. Working between digital and physical media, his practice spans illustration, ' +
    'brand identity, design systems, typography, and interface design — known for a systematic ' +
    'approach that breaks projects into atomic parts and rebuilds them through structure and ' +
    'visual logic. He holds a BA in Fine Arts and a BA in Design & Visual Communication from the ' +
    'Iceland University of the Arts, with additional studies at Weissensee Kunsthochschule in ' +
    'Berlin. Over 15+ years he has worked across fine art, film production, advertising, product ' +
    'teams, and design studios. Before founding Kolkrabbi he was the first dedicated designer at ' +
    'Tempo. Alongside design he keeps an active art practice under the pseudonyms Biskup and ' +
    'Svartval, and produces music as Konsulat.',
  statement:
    'My work explores the relationship between structure and expression — the point where ' +
    'systems, forms, and reduction meet human intuition. Whether working as Biskup or Svartval, ' +
    'I use drawing, modular geometry, and iterative repetition to examine how meaning emerges ' +
    'from constraint. The same principles shape my work as a designer: the boundaries of a ' +
    'system become a field for exploration, and the friction between intention and accident ' +
    'becomes a space for discovery.',
}

/* ── Career / practice timeline ──────────────────────────────────────
   `year` start year (or single). `endYear` optional for ranges. Page renders
   newest-first. Each row may carry `href` + `mediaType`. ── */

export const TIMELINE = [
  /* ── Education ─────────────────────────────────────────────────── */
  { year: 2003, kind: 'education', title: 'High School Diploma', org: 'Pilgrim High School, Rhode Island, USA' },
  { year: 2009, kind: 'education', title: 'BA Fine Arts (Myndlist)', org: 'Iceland University of the Arts (LHÍ)', href: 'https://skemman.is/handle/1946/2815', mediaType: 'archive', notes: 'Thesis "Unheimlich = Óhugnaður = Macabre", 26.5.2009. (Some early CVs say BFA.)' },
  { year: 2011, kind: 'education', title: 'BA Art Theory', org: 'University of Iceland', notes: 'Per early CVs (graduate 2011).' },
  { year: 2014, kind: 'education', title: 'Fine Arts exchange — Berlin', org: 'Universität der Künste Berlin (UDK) / Weissensee Kunsthochschule', notes: 'CONFLICT: period CVs + Erasmus motivation letter say UDK; later bios say Weissensee. Erasmus 2013–14. Confirm which.' },
  { year: 2015, kind: 'education', title: 'BA Design & Visual Communication', org: 'Iceland University of the Arts (LHÍ)', href: 'https://skemman.is/handle/1946/26279', mediaType: 'archive' },

  /* ── Work ──────────────────────────────────────────────────────── */
  { year: 2013, endYear: 2014, kind: 'work', title: 'Graphic Designer', org: 'TMS', notes: 'Reykjavík.' },
  { year: 2014, endYear: 2019, kind: 'work', title: 'Graphic Designer — first dedicated designer', org: 'Tempo (Origo / Nýherji)', notes: 'High-velocity product/marketing/sales asset production; "golden banana" award. Tempo became a major Atlassian-ecosystem product.' },
  { year: 2019, kind: 'work', title: 'Founder & Lead Designer', org: 'Kolkrabbi Vinnustofa', href: 'https://kolkrabbi.io/', notes: 'Design studio + type foundry. Built kolkrabbi.io, Workshop tools, foundry app.' },
  { year: 2020, endYear: 2022, kind: 'work', title: 'Designer UI/UX', org: 'Hugvit & Canalix', notes: 'Brand identity for Casedoc / Canalix rebrand.' },
  { year: 2021, endYear: 2022, kind: 'work', title: 'Designer UI/UX', org: 'Exmon', notes: 'SaaS brand system + website overhaul + Figma component library.' },
  { year: 2022, endYear: 2023, kind: 'work', title: 'Designer UI/UX', org: 'Secure Code Warrior', notes: 'Brand refresh, illustration libraries, full website overhaul + UI kit.' },
  { year: 2022, endYear: 2023, kind: 'work', title: 'Designer', org: 'Kaffistofan', notes: 'Visual identity for Icelandic craft roastery + product line.' },
  { year: 2023, endYear: 2024, kind: 'work', title: 'Designer UI/UX', org: 'Flík', notes: 'Brand system + mobile app (App Store, late 2024) + Framer site.' },
  { year: 2024, kind: 'work', title: 'Designer', org: 'Líf kíró', notes: 'Analytics infographics.' },
  { year: 2024, endYear: 2025, kind: 'work', title: 'Designer UI/UX', org: 'Moisall', notes: 'Brand identity for boutique hotel + Framer site.' },
  { year: 2024, endYear: 2025, kind: 'work', title: 'Designer UI/UX', org: 'aftra', notes: 'Design system, color/type expansion, logo animations, brand guide.' },

  /* ── Awards ────────────────────────────────────────────────────── */
  { year: 2008, kind: 'award', title: 'Best Icelandic Work — "Noise Sequence / Suð-atriði"', org: '700IS Hreindýraland (experimental film festival)', notes: '~10-min experimental film. RÚV Rás 2 coverage by Ólafur H. Torfason.' },
  { year: null, kind: 'award', title: '"Golden banana" award', org: 'Tempo', notes: 'Internal recognition for production efficiency (2014–2019).' },

  /* ── Type / design ─────────────────────────────────────────────── */
  { year: 2013, kind: 'type', title: 'Alchemy Bold — display sans typeface', org: 'Self-released', href: 'https://luc.devroye.org/icelandic.html', notes: 'Listed in Luc Devroye\'s type index.' },
  { year: null, kind: 'type', title: 'Kolkrabbi type foundry — Málrómur, Rót, Gullhamrar, Trollatunga, Dylgjur, Orðspor, Silfurbarki', org: 'Kolkrabbi', href: 'https://kolkrabbi.io/foundry', notes: 'Free / open typefaces. Release dates TBD per family.' },

  /* ── Solo exhibitions (as Svartval / Þórður) ───────────────────── */
  { year: 2010, kind: 'exhibition', title: 'White Light / Dark Wave (solo)', org: 'Gallery Crymo, Reykjavík (Laugavegur 32)', notes: 'Video portraits (Portrait I–IV) + noise performance. Opened 9 Apr 2010. Works: The Architect, Circle in Soul, Dialogue.' },
  { year: 2010, kind: 'exhibition', title: 'Óráð / Delirium (solo)', org: 'Gallery Kaolin, Reykjavík', notes: 'Drawings & prints, Dec 2010. Pressan coverage.' },
  { year: 2012, kind: 'exhibition', title: 'Hugrof (solo)', org: 'Gallery Hausskel, Reykjavík', notes: 'Ink drawings & soundscapes, Mar 2012.' },
  { year: 2013, kind: 'exhibition', title: 'Skyndreymi & táknvilla (solo)', org: 'Artíma gallery, Skúlagata 28, Reykjavík', notes: 'Prints + drawings (as Svartval). 31 Jul–4 Aug 2013. Curators Heiða Jónsdóttir + Anna Margrét Björnsson. Fréttablaðið interview.' },

  /* ── Group shows / festivals (selected) ────────────────────────── */
  { year: 2006, kind: 'exhibition', title: 'Debut: "RUSL" (group, "Náttúrulaus") + "Reykjavík in Technicolor"', org: 'Gallerí Gyllinæð, Reykjavík', notes: 'First public showings (2006, via Kristjan Zaklynsky) + live noise performance at LHÍ.' },
  { year: 2007, kind: 'exhibition', title: '"Noise Sequence" / "48 hours" — Sequences festival + Reykjavík Film Festival', org: 'Reykjavík' },
  { year: 2008, kind: 'exhibition', title: 'Festival run — "Noise Sequence", "Reel", "Brainheart", Satanatas', org: '700IS Hreindýraland (Egilsstaðir) · Moving/Clarion (Stockholm) · Gallery Lost Horse (w/ Singapore Sling)', notes: 'Noise Sequence = "Icelandic Film of the Festival" at 700IS; toured US/UK/Scandinavia.' },
  { year: 2009, kind: 'exhibition', title: '"Mara" — LHÍ graduation show', org: 'Kjarvalsstaðir (Reykjavík Art Museum)' },
  { year: 2010, kind: 'exhibition', title: '"Portraits I–IV" — Iceland showcase, Berlin Fashion Week', org: 'Gallery G.I.N., Berlin', notes: 'Also Menningarnótt at Crymo. "Málð?" short film premiered Regnboginn cinema (May 2010).' },
  { year: 2012, kind: 'exhibition', title: 'International run — "Mute", "M.B.E.", "Portrait of Anna"', org: 'Magmart (Naples) · AAVE (Helsinki) · Papay Gyro Nights (Scotland + Bergen)', notes: 'Plus "Heimsendir" (Artíma) & "Æringur" (Bolungarvík, 2011).' },
  { year: 2013, kind: 'exhibition', title: '"Gnosis" — Papay Gyro Night', org: 'Papa Westray Island, Scotland' },

  /* ── Video / direction ─────────────────────────────────────────── */
  { year: 2009, kind: 'video', title: 'Music-video director', org: 'Singapore Sling ("Martian Arts" 2008) · Go-Go Darkness ("It\'s Just That Song" 2009) · The Virgin Tongues ("Six Feet Underground" 2009) · Brian Jonestown Massacre · Third Sound · Two Step Horror', notes: 'Directed music videos c. 2008–2012.' },

  /* ── Music / releases ──────────────────────────────────────────── */
  { year: 2008, kind: 'music', title: 'Two Step Horror formed', org: 'w/ Anna Margrét Björnsson', href: 'https://twostephorror.bandcamp.com', notes: 'First named "The Disenchanted". Co-founders of the Vebeth art/music collective. Þórður: lyrics, music, recording, artwork, mastering. Expanded to 5-piece in 2014.' },
  { year: 2011, kind: 'music', title: 'Two Step Horror — Living Room Music (LP)', org: 'Outlier Records (UK)', href: 'https://twostephorror.bandcamp.com', mediaType: 'release', notes: 'Released 28 Apr 2011. 4★ Fréttablaðið (Dr. Gunni), 4★ Morgunblaðið (Arnar Eggert Thoroddsen), full marks Grapevine (Bob Cluness).' },
  { year: 2012, kind: 'music', title: 'Two Step Horror — Bad Sides & Rejects (digital)', org: 'Gogoyoko', mediaType: 'release', notes: 'B-sides/experimental. Reviewed by TPR Magazine (Nathan J. Barrett, May 2012).' },
  { year: 2014, kind: 'music', title: 'Two Step Horror — Nyctophilia (LP)', org: 'Space Gaze Records (USA)', mediaType: 'release', notes: 'Vinyl. Live since 2012 (Skálar fest, Seyðisfjörður); first abroad Urban Spree Berlin Dec 2013 (1000+); Berlin Psych Fest + White Trash 2014.' },
  { year: 2015, kind: 'music', title: 'a & E sounds — LP', org: 'w/ Kolbeinn Soffíuson', href: 'https://karolinafund.com/project/view/763', mediaType: 'release', notes: 'Recorded 2014 at Weissensee Berlin (~50 songs); a \'76 Gibson Thunderbird lent by Will Carruthers (Spacemen 3). Studio Sýrland + Hallgrímskirkja, drums Orri Einarsson. "ghost pop". Doubled as BA graphic-design grad project. Karolina Fund 101%. Later renamed Konsulat.' },
  { year: 2015, kind: 'music', title: 'Microgroove Sessions (event series)', org: 'Studio Konsulat × Boston Reykjavík × Ölgerðin', notes: 'Live alt-set / drone-jam sessions for the Icelandic music scene.' },
  { year: 2018, kind: 'music', title: 'Konsulat — Kolaport (LP)', org: 'Þórður Grímsson + Kolbeinn Soffíuson', href: 'https://konsulata.bandcamp.com/album/kolaport', mediaType: 'release', notes: 'Konsulat = renamed a & E sounds (studio beside the Italian consulate). Design/layout by Biskup; "Invaders" single + video. Arnljótur Sigurðsson guests live.' },
  { year: 2020, kind: 'music', title: 'Konsulat — No. 7 (nr. 7)', org: 'Konsulat', href: 'https://konsulata.bandcamp.com/album/no-7', mediaType: 'release', notes: 'Released 30 Nov 2020. ("Konsulat nr7" = this album, not a gallery.)' },

  /* ── Milestones ────────────────────────────────────────────────── */
  { year: 2014, kind: 'milestone', title: 'a & E sounds LP — Karolina Fund 101% funded', org: 'Karolina Fund', href: 'https://karolinafund.com/project/view/763', notes: '€3,520 / €3,500 goal, 50 backers.' },
  { year: 2019, kind: 'milestone', title: 'Founded Kolkrabbi', org: 'Reykjavík', notes: 'Design studio + type foundry.' },

  /* ── Press / interviews / mentions ─────────────────────────────── */
  { year: 2011, kind: 'press', title: 'Two Step Horror — Living Room Music (review)', org: 'Reykjavík Grapevine', href: 'https://grapevine.is/icelandic-culture/2011/06/15/two-step-horror-living-room-music/' },
  { year: 2015, kind: 'press', title: 'Morgunblaðið profile (greinasafn)', org: 'Morgunblaðið', href: 'https://www.mbl.is/greinasafn/grein/1551390/', notes: '~April 2015, paywalled. From Ísafjörður; BA fine art + BA graphic design; then designer at Tempó.' },
  { year: 2009, kind: 'press', title: 'Op-ed: "Prump er ekki list" (art criticism — by Þórður)', org: 'Fréttablaðið', notes: '20 Jun 2009 — his critique re Ragnar Kjartansson\'s Venice Biennale piece "The End". (Author, not subject.)' },
  { year: 2012, kind: 'press', title: 'Two Step Horror — Bad Sides & Rejects (review)', org: 'Immature Magazine', notes: '"…if your dreams were road movies directed by Jim Jarmusch."' },
  { year: 2013, kind: 'press', title: '"Fascinated by the Beauty in Darkness" (interview, Svartval)', org: 'Fréttablaðið', notes: 'By Friðrika Benónýsdóttir, 01/08/2013 — on the Skyndreymi & táknvilla show.' },
  { year: 2013, kind: 'press', title: '"Svartval sýnir skyndreymi og táknvillur"', org: 'Morgunblaðið', notes: 'Coverage of the Artíma show; photo Jón Sæmundur Auðarson.' },
  { year: 2020, kind: 'press', title: 'Konsulat — "Innrásin mikla"', org: 'Morgunblaðið', notes: 'By Arnar Eggert Thoroddsen — on Konsulat / "Invaders".' },
  { year: 2015, kind: 'press', title: 'a & E sounds — "Thick tones of vibrations and heavy reverbs"', org: 'Ask The Sky', href: 'https://asktheskymag.wordpress.com/2015/11/11/a-e-sounds-thick-tones-of-vibrations-and-heavy-reverbs/' },
  { year: null, kind: 'press', title: 'Two Step Horror — Nyctophilia (review)', org: 'Psychedelic Baby Magazine', href: null, notes: 'Year / URL TBD.' },

  /* ── Profiles ──────────────────────────────────────────────────── */
  { year: null, kind: 'profile', title: 'Behance — Biskup | Stunga', org: 'Behance', href: 'https://www.behance.net/grimsson' },
  { year: null, kind: 'profile', title: 'Cargo Collective — portfolio', org: 'Cargo Collective', href: 'https://cargocollective.com/thordur' },
  { year: null, kind: 'profile', title: 'Saatchi Art', org: 'Saatchi Art', href: 'https://www.saatchiart.com/thordur', notes: 'Joined 2011.' },
  { year: null, kind: 'profile', title: 'Discogs — Þórður Grímsson', org: 'Discogs', href: 'https://www.discogs.com/artist/3819618', mediaType: 'music' },
  { year: null, kind: 'profile', title: 'biskupstunga.com (personal site)', org: 'Biskup', href: 'http://www.biskupstunga.com', notes: 'Confirm/restore — currently unreachable.' },
  { year: null, kind: 'profile', title: 'LinkedIn', org: 'LinkedIn', href: 'https://is.linkedin.com/in/grimsson' },
]

export const TIMELINE_KINDS = [
  { key: 'education',  label: 'Education' },
  { key: 'work',       label: 'Work' },
  { key: 'award',      label: 'Awards' },
  { key: 'type',       label: 'Type' },
  { key: 'exhibition', label: 'Exhibitions' },
  { key: 'video',      label: 'Video / direction' },
  { key: 'music',      label: 'Music' },
  { key: 'press',      label: 'Press' },
  { key: 'milestone',  label: 'Milestones' },
  { key: 'profile',    label: 'Profiles' },
]

/* ── Filtered selectors ──────────────────────────────────────────── */

export const EDUCATION   = TIMELINE.filter((t) => t.kind === 'education')
export const WORK        = TIMELINE.filter((t) => t.kind === 'work')
export const EXHIBITIONS = TIMELINE.filter((t) => t.kind === 'exhibition')
export const MUSIC       = TIMELINE.filter((t) => t.kind === 'music')
export const PRESS     = TIMELINE.filter((t) => t.kind === 'press')
export const AWARDS    = TIMELINE.filter((t) => t.kind === 'award')
export const FILMS     = TIMELINE.filter((t) => t.kind === 'film') // none
export const PROFILES  = TIMELINE.filter((t) => t.kind === 'profile')

/* ── Companies / projects founded. ── */

export const COMPANIES = [
  { name: 'Kolkrabbi',       role: 'Founder · Lead Designer', years: '2019–present', status: 'active',   notes: 'Design studio + type foundry.' },
  { name: 'Two Step Horror', role: 'Member',                  years: '2008–',        status: 'archived', notes: 'Music duo w/ Anna Margrét Björnsson.' },
  { name: 'a & E sounds',    role: 'Solo artist',             years: '2014–2016',    status: 'renamed',  notes: 'Renamed Konsulat.' },
  { name: 'Konsulat',        role: 'Member',                  years: '2016–',        status: 'active',   notes: 'Electronic duo w/ Kolbeinn Soffíuson (formerly a & E sounds).' },
]

/* ── Collaborators / clients (selected). ── */

export const COLLABORATIONS = [
  { client: 'aftra',               type: 'design-system', year: 2024, notes: 'Design system, color/type expansion, logo animation.' },
  { client: 'Moisall',             type: 'brand',         year: 2024, notes: 'Boutique hotel identity + Framer site.' },
  { client: 'Flík',                type: 'brand + app',   year: 2023, notes: 'Knitting tool brand + mobile app + site.' },
  { client: 'Secure Code Warrior', type: 'brand refresh', year: 2022, notes: 'Illustration libraries, UI kit, website overhaul.' },
  { client: 'Kaffistofan',         type: 'brand',         year: 2022, notes: 'Craft roastery identity + product line.' },
  { client: 'Hugvit / Canalix',    type: 'brand',         year: 2020, notes: 'Casedoc product + Canalix rebrand.' },
  { client: 'Exmon',               type: 'brand',         year: 2021, notes: 'SaaS brand system + website.' },
]

/* ── Social presence. ── */

export const SOCIAL = [
  { platform: 'Instagram', handle: '@kolkrabbi_',  url: 'https://www.instagram.com/kolkrabbi_/',  notes: 'Studio account.' },
  { platform: 'Instagram', handle: '@tortor',      url: 'https://www.instagram.com/tortor/',      notes: 'Personal — confirm handle.' },
  { platform: 'YouTube',   handle: '@kolkrabbi-io', url: 'https://www.youtube.com/@kolkrabbi-io',  notes: null },
  { platform: 'TikTok',    handle: '@kolkrabbi_',   url: 'https://www.tiktok.com/@kolkrabbi_',     notes: null },
  { platform: 'Behance',   handle: 'grimsson',      url: 'https://www.behance.net/grimsson',       notes: null },
  { platform: 'Bandcamp',  handle: 'konsulata',     url: 'https://konsulata.bandcamp.com',         notes: 'Konsulat releases.' },
  { platform: 'Bandcamp',  handle: 'twostephorror', url: 'https://twostephorror.bandcamp.com',     notes: 'Two Step Horror releases.' },
]

/* ── Selectors / sections kept for the registry page (Kolkrabbi.jsx). Empty where
   KOL has no data — page renders empty, not broken. ── */

export const LIVE_SITE_MAP      = [] // n/a — kolkrabbi.io routes live in apps/web
export const MARKETING_PLAYBOOK = [] // dropped — KOL runs no paid-ad/pixel playbook

/* ── Vendors / services backing the studio + site. ── */

export const VENDORS = [
  { name: 'Vercel',       role: 'Hosting + serverless',      url: 'https://vercel.com/',          status: 'active' },
  { name: 'Backblaze B2', role: 'Media CDN (bucket)',        url: 'https://www.backblaze.com/',   status: 'active' },
  { name: 'Sanity',       role: 'CMS (studio.kolkrabbi.io)', url: 'https://www.sanity.io/',       status: 'active' },
  { name: 'Cloudflare',   role: 'DNS / domain',              url: 'https://www.cloudflare.com/',  status: 'active' },
  { name: 'Kit',          role: 'Newsletter (kit.com)',      url: 'https://kit.com/',             status: 'active' },
  { name: 'Printful',     role: 'Print-on-demand (/prints)', url: 'https://www.printful.com/',    status: 'planned' },
  { name: 'PayPal',       role: 'Payments (/prints)',        url: 'https://www.paypal.com/',      status: 'planned' },
]

/* ── Tech stack. ── */

export const STACK = [
  { layer: 'Monorepo',      choice: 'pnpm workspaces + Turborepo',                 status: 'shipped' },
  { layer: 'Frontend',      choice: 'React 19 + Vite + Tailwind 4',                status: 'shipped' },
  { layer: 'Design system', choice: 'KOL — @kol/ui + @kol/component',              status: 'shipped' },
  { layer: 'Hosting',       choice: 'Vercel (apps/web, apps/brand, studio)',       status: 'shipped' },
  { layer: 'CMS',           choice: 'Sanity (studio.kolkrabbi.io)',                status: 'shipped' },
  { layer: 'Media CDN',     choice: 'Backblaze B2',                                status: 'shipped' },
  { layer: 'Newsletter',    choice: 'Kit (api/subscribe → v4 subscribers)',        status: 'shipped' },
  { layer: 'Analytics',     choice: 'Umami (self-hosted) + Google Search Console', status: 'shipped' },
  { layer: 'Commerce',      choice: 'Printful + PayPal (/prints)',                 status: 'planned' },
]

/* ── Open gaps — supply links / confirm. ── */

export const OPEN_QUESTIONS = [
  { topic: 'Berlin school',   note: 'UDK vs Weissensee — period CVs + Erasmus motivation letter say Universität der Künste (UDK); later bios say Weissensee. Confirm.' },
  { topic: 'Degree (2009)',   note: 'BFA vs BA Fine Arts — early CVs say BFA, later say BA. Confirm.' },
  { topic: 'Current address', note: 'info.js uses Skipholt 51, 105 Reykjavík (per cv-2023). Confirm still current.' },
  { topic: 'China show',      note: 'Bios say "exhibited to China" — likely a Papay Gyro Nights HK/China edition. Confirm venue/year.' },
  { topic: 'Rafiðn',          note: 'Still unidentified (TSH live member "Rafsteinn" is unrelated). Clarify.' },
  { topic: 'Foundry dates',   note: 'Per-typeface release years (Málrómur, Rót, Gullhamrar, Trollatunga, Dylgjur, Orðspor, Silfurbarki).' },
  { topic: 'Nyctophilia review', note: 'Confirm Psychedelic Baby Magazine review URL/date.' },
]
