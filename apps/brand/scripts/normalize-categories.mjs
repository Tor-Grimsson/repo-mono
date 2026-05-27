#!/usr/bin/env node
// Categorize every entry in the pool BY NAME, ignoring source folders.
// First match wins. Catch-all `?` for stragglers.
//
// Reads + writes src/_staging/icons/_pool.json. Pool files unchanged.

import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MANIFEST = join(__dirname, '..', 'src/_staging/icons/_pool.json')

const re = (...pats) => (n) => pats.some((p) => p.test(n))

// Order matters — first hit wins. Specific rules above general ones.
const RULES = [
  // ── DIRECTIONAL ──
  { cat: 'arrows',   test: re(/^arrow-/, /^arrows-/, /^arrow$/) },
  { cat: 'chevrons', test: re(/^chevron(-|s)/, /^chevron$/) },
  { cat: 'carets',   test: re(/^caret-/, /^caret$/, /^dropdown-caret$/) },

  // ── BASIC SYMBOLS ──
  { cat: 'symbols', test: re(/^(plus|minus|cross|x|check|star|circle|circle-1|square|hash|hash-italic|hash-italic-bold|at|registered|close|bullseye|resize-corner)$/, /^cross-/, /^check-circle$/) },

  // ── NAVIGATION (places) ──
  { cat: 'navigation', test: re(/^(home|hamburger|menu|menu-\d|more|more-horizontal|more-vertical|compass|globe|globe-alt|location|location-marker|location-plus|map|map-alt|map-pin|directions|street-view|current-location|external-link|subdirectory-left|subdirectory-right|control-arrow-back|control-arrow-end|control-arrow-forward|control-arrow-start|nav-create|nav-home|nav-library|nav-rack|nav-settings)$/) },

  // ── ACTIONS ──
  { cat: 'actions', test: re(
      /^(search|search-1|search-circle|search-line|filter|filter-alt|edit|edit-1|edit-2|edit-3|edit-alt|copy|cut|trash|trash-1|trash-alt|save|share|swap|snap|undo|redo|refresh|rotate|rotate-alt|rotate-left|rotate-right|download|upload|upload-1|upload-2|upload-3|cloud-upload|clipboard-check|enter|exit|maximize|minimize|zoom-in|zoom-out|zoom-magnify|settings-01|settings-02|settings|settings-1)$/,
      /^cycle$/,
    ),
  },

  // ── COMMUNICATION ──
  { cat: 'communication', test: re(/^(chat|chat-alt|chat-alt-2|message-circle|message-square|message-rounded-add|message-rounded-error|mail|mail-open|phone|paper-plane|send|speakerphone|voicemail|in-going|dialpad|dialpad-alt|alarm-bell|bell|share-shape|thumb-up|thumb-down|interactive|dual-opponent)$/) },

  // ── COMMERCE ──
  { cat: 'commerce', test: re(/^(card|credit-card|credit-card-1|cash|dollar-sign|gift|package|receipt|receipt-refund|shopping-bag|shopping-basket|shopping-basket-1|shopping-basket-2|shopping-cart|tag)$/) },

  // ── FILES ──
  { cat: 'files', test: re(/^(file|file-image|file-text|file-video|files-01|files-02|files-03|files-04|add-file|folder|folder-01|folder-02|folder-add|folder-open|document|document-report|page|manual-empty|clipboard|clipboard-1|clipboard-2|book-open|bookmark|bookmark-alt|attachment|archive|briefcase|journal|project|project-1|project-2|img-01|img-02|img-03)$/) },

  // ── MEDIA TRANSPORT (play/pause/etc.) ──
  { cat: 'transport', test: re(/^(play|pause|pause-narrow|stop|fast-forward|rewind|repeat|repeat-1|shuffle|skip-back|skip-forward|control-play|control-pause|control-stop)$/) },

  // ── MEDIA CAPTURE ──
  { cat: 'video',   test: re(/^(video|video-off|camera|camera-1|camera-2|camera-home|camera-off)$/) },
  { cat: 'image',   test: re(/^(image|photo-02)$/) },
  { cat: 'audio',   test: re(/^(mic|mic-off|volume|volume-1|volume-2|volume-x)$/) },

  // ── TEXT FORMATTING ──
  { cat: 'text', test: re(/^(bold|italic|italic-a|italic-b|italic-bold|underline|aa|a|a-framed|font-01|font-02|font-03|type|type-01|type-02|type-03|text-01|text-02|typography-1|typography-2|typography-3|roman-a|roman-b)$/) },
  { cat: 'lists', test: re(/^(list|list-01|list-02|list-ordered|list-unordered)$/) },

  // ── ALIGNMENT ──
  { cat: 'align', test: re(
      /^align-(bottom|center|horizontal-center|horizontal-left|horizontal-right|left|middle|right|top|vertical-bottom|vertical-center|vertical-top|auto)$/,
      /^align(bottom|center|left|right|top|leftclose)$/,
      /^aligncenter(horizontal|vertical)$/,
      /^alignleft-1$/, /^alignright-1$/,
      /^objects-(horizontal|vertical)-/,
      /^horizontal-(center|left|right)$/,
      /^al-1$/, /^al-2$/,
    ),
  },

  // ── BOOLEAN OPS ──
  { cat: 'boolean', test: re(/^boolean-/, /^(intersect|intersect-1|exclude|minus-front|minus-back|minus-set-1|minus-set-2|minus-set-3|plus-set-1|plus-set-2|plus-set-3|mult-set-1|mult-set-2|mult-set-3|check-set-1|check-set-2|check-set-3)$/, /^trim$/) },

  // ── MATH ──
  { cat: 'math', test: re(/^(math|math-2|math-3|math-collection|calc-1|calc-2|sum|perc|element-1|result)$/) },

  // ── TRANSFORMS ──
  { cat: 'transforms', test: re(/^(flip-x|flip-y|rotate|reflect-horizontal|reflect-vertical|move|move-collection|move-horizontal|move-vertical|expand|expand-alt|expand-horizontal|expand-vertical|collapse|collapse-alt|collapse-horizontal|collapse-vertical|corner-diag|arrow-from-bottom|arrow-from-left|arrow-from-right|arrow-from-top)$/) },

  // ── DRAWING TOOLS ──
  { cat: 'draw', test: re(/^(pen|pen-copy|pencil|pencilcircle|pencilline|pencilsimple|pennib|pennibstraight|brush|brush-alt|paint|paint-roll|paintbrushbroad|markercircle|highlight|highlightercircle|spray-can|scribble|scribble-1|scribble-2|stitches|broom|crop)$/) },

  // ── DESIGN TOOLS ──
  { cat: 'tools', test: re(/^(eyedrop|eyedropper|bucket|bucket-alt|magnet|magnetstraight|measure|ruler|ruler-combined|ruler-trinangle|anchor|pushpin|annotation|label|cut|scissors|scissors-1|slider-shape|color-palette|color-wheel|color-fill|color-swatch|color-swatches|filter-palette|mark-tool|paint-drop|wheel|adjust|beaker|contrast|size)$/) },

  // ── COLOR ──
  { cat: 'color', test: re(/^(color|color-01|color-02|color-03|palette|fill|stroke|stroke-1|solid|solid-1)$/) },

  // ── TYPOGRAPHY (extra) ──
  { cat: 'typography', test: re(/^(typography|info)$/) },

  // ── 2D SHAPES ──
  { cat: 'shapes-2d', test: re(/^(circle|circle-dashed|rectangle|square|triangle|triangle-alt|polygon|diamond|diamond-alt|dimond|star|star-1|wave|wheel|ball|3square|shape|shape-1|shape-circle|shape-square|shape-triangle|shape-polygon|shape-(\d+))$/, /^shapes-(\d+|stroke-\d+)$/, /^design-shapes/) },

  // ── 3D SHAPES ──
  { cat: 'shapes-3d', test: re(/^(box|cube|cube-transparent|cone|cone-alt|cylinder|cyl|sphere|tetra|octa|torus|ico)$/) },

  // ── USER / IDENTITY ──
  { cat: 'user', test: re(/^(user|user-1|user-2|user-circle|user-group|user-plus|users|fingerprint|identification)$/) },

  // ── AUTH / SECURITY ──
  { cat: 'auth', test: re(/^(lock|unlock|key|log-in|log-out|shield|shield-check)$/) },

  // ── BRAND-SOCIAL (logos) ──
  { cat: 'social', test: re(/^(facebook|instagram|linkedin|messenger|snapchat|tiktok|twitter|youtube|social-facebook|social-instagram|social-linkedin|social-twitter|social-messenger|social-snapchat|social-tiktok)$/) },

  // ── BRAND-AC (Another Creation specific) ──
  { cat: 'brand-ac', test: re(/^(signature-thick|ac-)/) },

  // ── HONORS ──
  { cat: 'awards', test: re(/^(award|certification|crown|medal|trophy)$/) },

  // ── EMOTION / SOCIAL UI ──
  { cat: 'social-ui', test: re(/^(heart|heart-1|heart-2|flag)$/) },

  // ── TIME ──
  { cat: 'time', test: re(/^(calendar|calendar-1|calendar-check|calendar-days|clock|clock-alert|clock-rotate-left|history|stopwatch|timer)$/) },

  // ── STATUS ──
  { cat: 'status', test: re(/^(alert-circle|alert-triangle|check-circle|help-circle|info|lightning-bolt|loader|loader-circle|status|x-circle|eye-off|eye-on|eye-open|visible)$/) },

  // ── CHART / STATS ──
  { cat: 'chart', test: re(/^(chart-square-bar|presentation-chart-bar|presentation-chart-line|stat-abacus|stat-chart-a|stat-chart-b|stat-chart-c|stat-cycle|stat-donut|stat-pie|stat-pie-c|stat-stat|trending-down|trending-up)$/) },
  { cat: 'awards-stats', test: re(/^(stat-crown|stat-medalion|stat-rocket|stat-winner)$/) },

  // ── LAYOUT ──
  { cat: 'grids', test: re(/^(grid|grid-01|grid-02|grid-03|grid-04|grid-05|grid-06|grid-alt|grid-horizontal|grid-small|grid-vertical|squaresfour|view-grid|view-list|view-boards|stacksimple|trello)$/) },
  { cat: 'rows-cols', test: re(/^(columns|rows|row|row-alt|fatrows)$/) },
  { cat: 'borders', test: re(/^border-(all|bottom|inner|left|none|outer|right|top|radius)$/) },
  { cat: 'panels', test: re(/^(panel-left|panel-right|sidebar|dock-bottom|dock-left|dock-right|dock-top|layers)$/) },
  { cat: 'layout', test: re(/^(layout|layout-01|layout-02|layout-03|carousel|category|category-alt|collection|component|main-component|user-interface|auto-layout|move-collection)$/) },

  // ── CURSORS ──
  { cat: 'cursors', test: re(/^(crosshair|hand|mouse|mouse-alt|pointer|pointer-1|pointer-2|pointer-custom|pointer-mirrored|pointer-node|pointer-selector|navigation-pointer-01|navigation-pointer-02|target-lock|cursor|navigation)$/) },

  // ── DEV ──
  { cat: 'dev', test: re(/^(code|code-2|code-alt-collection|code-collection|code-curly-collection|codesimple|terminal|bug|bug-1|bug-2|bug-alt|brackets|curly|tachometer|hash)$/, /^git-/) },

  // ── NETWORK ──
  { cat: 'network', test: re(/^(cloud|wifi|wifi-off|link|link-1|qrcode|server|database|chip|desktop|laptop|frequency)$/) },

  // ── HARDWARE / DEVICES ──
  { cat: 'devices', test: re(/^(power|battery|bolt-alt|plug|hdd|scale|pills-alt|tachometer|monitor)$/) },

  // ── SETTINGS / SYSTEM ──
  { cat: 'settings', test: re(/^(settings|settings-1|cog|slider|slider-alt|wrench|extension|customize|toggle-left|toggle-right|interactive|atomic-atom|atomic-lifeform|atomic-molecule|atomic-organism|component|linked|main-component|library|roadmap)$/) },

  // ── INFO / HELP ──
  { cat: 'info', test: re(/^(information|information-1|information-2|information-3|light-bulb|light-bulb-1|help|help-circle|info)$/) },

  // ── TUI EDITOR ──
  { cat: 'tui', test: re(/^tui-/) },

  // ── DOMAIN: RACK ──
  { cat: 'rack-transport',   test: re(/^tr-/) },
  { cat: 'rack-waves',       test: re(/^wave-/) },
  { cat: 'rack-curves',      test: re(/^(curve-|ramp-|shaper-|line-)/) },
  { cat: 'rack-filters',     test: re(/^filter-/) },
  { cat: 'rack-generators',  test: re(/^gen-/) },
  { cat: 'rack-sequencer',   test: re(/^seq-/) },
  { cat: 'rack-logic',       test: re(/^logic-/) },
  { cat: 'rack-cables',      test: re(/^cable-/) },
  { cat: 'rack-caps',        test: re(/^cap-/) },
  { cat: 'rack-color',       test: re(/^(clr-|grad-)/) },
  { cat: 'rack-patterns',    test: re(/^(dith-|ptrn-|radial-)/) },
  { cat: 'rack-3d-shapes',   test: re(/^shape-(cube|cyl|ico|octa|sphere|tetra|torus)$/) },
  { cat: 'rack-ascii',       test: re(/^ascii-/) },

  // ── LIFESTYLE: SPORTS ──
  { cat: 'sports', test: re(/^(baseball|basketball|bowling-ball|cricket-ball|football|tennis-ball|dumbbell|cycling|swim|run|walk)$/) },

  // ── LIFESTYLE: TRAVEL ──
  { cat: 'travel', test: re(/^(bus|bus-school|car|cable-car|taxi|train|truck|gas-pump|traffic-cone|landscape|world|meteor|planet|rocket|trip|ticket)$/) },

  // ── LIFESTYLE: FOOD ──
  { cat: 'food', test: re(/^(cake|coffee|cookie|dish|fork|knife|bowl-hot|sushi|restaurant|candles)$/) },

  // ── LIFESTYLE: HOME ──
  { cat: 'home', test: re(/^(bed|chair|cabinet|closet|door-open|fridge|home|home-1|home-2|hotel|bath|shower)$/) },

  // ── LIFESTYLE: GAME ──
  { cat: 'game', test: re(/^(dice-1|dice-2|dice-3|dice-4|dice-5|dice-6|joystick|joystick-alt|joystick-button|game|puzzle)$/) },

  // ── HEALTH ──
  { cat: 'health', test: re(/^(health|pills|plus-medical|bulb)$/) },

  // ── WEATHER / NATURE ──
  { cat: 'nature', test: re(/^(sun|fire|rabbit)$/) },

  // ── OBJECTS (catch-all for everyday things) ──
  { cat: 'objects', test: re(/^(bolt|bomb|bucket|chalkboard|foundation|glasses|glasses-alt|instance|placeholder|placeholder-1|yarn|align-auto|been-here|ghost|mask|cricket-ball|stitches|fingerprint)$/) },

  // ── THEME ──
  { cat: 'theme', test: re(/^(theme-toggle|moon|sun-)/, /^theme$/) },
]

// Stragglers we know about but want named explicitly:
const STATIC = {
  'ftx-token-ftt': 'finance',
}

function classify(name) {
  const n = name.toLowerCase()
  if (STATIC[n]) return STATIC[n]
  for (const r of RULES) if (r.test(n)) return r.cat
  return '?'
}

const m = JSON.parse(readFileSync(MANIFEST, 'utf8'))
for (const e of m.entries) {
  e.originalCategory = e.originalCategory ?? e.category
  e.category = classify(e.name)
}

writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + '\n')

const counts = {}
for (const e of m.entries) counts[e.category] = (counts[e.category] ?? 0) + 1
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])

console.log('--- normalize-categories ---')
console.log(`entries: ${m.entries.length}`)
console.log(`categories: ${sorted.length}`)
console.log()
for (const [k, v] of sorted) console.log(String(v).padStart(4), k)

const stragglers = m.entries.filter((e) => e.category === '?').map((e) => e.name)
const uniqStragglers = [...new Set(stragglers)].sort()
if (uniqStragglers.length) {
  console.log()
  console.log(`UNCATEGORIZED (${uniqStragglers.length} unique names):`)
  console.log(uniqStragglers.join(' '))
}
