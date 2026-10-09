// Per-bucket display settings.
//
// Every one of these is a DEFAULT, never a gate. Anything a setting hides is
// reachable by flipping it — the browser must never make a file unreachable,
// only unobtrusive by default.
//
// Defaults come from each bucket's measured profile (2026-08-15):
//   r2      433 obj  1.4GB  variants 0    segments 0     system 0    writable
//   b2     3443 obj  5.4GB  variants 197  segments 2012  system 118
//   vault  4095 obj 25.7GB  variants 15   segments 0     system 31 · 116 audio · 46 video
// A toggle that does nothing in a bucket ships off there; there's no point
// offering to fold segments in a bucket that has none.

// The kind vocabulary is the DS's since MediaLibraryPages (component 0.118.0 promoted lib/media.js).
import { KINDS, DEFAULT_KINDS } from '@kolkrabbi/kol-component/utilities/mediaKinds';

// v3 (2026-10-07, the explorer): `filters` forced off and the column height a CSS length — a bump is
// the only way an existing session drops the stored v2 state that opened the filter bar.
const STORE_KEY = 'kol-r2b2:settings:v3';

export const ALL_KINDS = [...KINDS, 'segments', 'system'];

/* ONE height, everywhere, every reload (user 2026-08-27: "JUST ONE HEIGHT for all … always one
 * height always on reload"). Deliberately NOT a setting: it was stored per bucket, so each bucket
 * came back at whatever it was last dragged to and switching buckets made the pane jump. The drag
 * still works — App holds the dragged value for the session and throws it away on reload. */
/* 'fill' — what is left of the window, measured by the DS (kol-ds-ui apps/media-fixture defaults,
 * the reference app's value). A hand-counted `calc(100dvh - 212px)` only fits one header and padding,
 * and inside PageShell it ran the browser past the frame's bottom pad. */
export const COLUMN_HEIGHT = 'fill';

// Shared floor. Per-bucket blocks below override only what genuinely differs.
const BASE = {
  kinds: [...DEFAULT_KINDS], // audio · video · images · markdown · JSON · YAML · text · code (user 2026-08-27); the rest one tick away
  flat: false,
  groupVariants: true,
  foldSegments: true,
  pageSize: 200,
  videoPreview: 'poster', // 'poster' | 'none' | 'autoload'
  layout: 'list', // 'off' | 'grid' | 'list' — the files WALL's layout. 'off' was the default while the wall sat under the browser (user 2026-08-27); in the explorer the wall is its own view, so off would be a filter bar above nothing (2026-10-06)
  folderView: 'columns', // 'rows' | 'columns' — the folder navigator above the files (columns by default, user 2026-08-27)
  /* `stackView` is the MOBILE half of `folderView` — below `md` the column browser renders as one
   * list, and this says list or grid (ColumnBrowserMobileViews, component 0.204.0). It is separate
   * from `layout` because that governs the files WALL; this governs the browser. Desktop ignores it. */
  stackView: 'list', // 'list' | 'grid'
  sortBy: 'name',
  sortDir: 'asc',
  uploadOpen: false, // <1% of visits upload; the drop pool is not a permanent banner
  // The column browser's drags (ColumnBrowserResize, component 0.113.0), persisted per bucket.
  // `columnWidths` is keyed by column index, plus 'preview' — the shape `onColumnResize` reports and
  // the `columnWidths` prop takes back (component 0.115.0). Height is forced on load, see below.
  columnHeight: COLUMN_HEIGHT,
  columnWidths: {},
};

export const DEFAULTS = {
  r2: {
    ...BASE,
    // No variant sets and no segments exist here — grouping would be a no-op
    // toggle pretending to do something.
    groupVariants: false,
    foldSegments: false,
    // 433 objects fit comfortably; paging a working bucket is friction.
    pageSize: 500,
    // It's the bucket you upload to, so newest-first is the useful order.
    sortBy: 'date',
    sortDir: 'desc',
  },
  b2: {
    ...BASE,
    // The only bucket where both matter: 197 sets, 2012 segments.
    groupVariants: true,
    foldSegments: true,
  },
  b2vault: {
    ...BASE,
    // 46 videos averaging ~440 MB. Never let a card touch one.
    videoPreview: 'none',
    foldSegments: false,
    // An offload store, not a gallery — names carry the meaning here.
    sortBy: 'date',
    sortDir: 'desc',
  },
};

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

export function loadSettings(bucketId) {
  const base = DEFAULTS[bucketId] || BASE;
  const saved = readStore()[bucketId];
  // Spread over the defaults so a setting added later arrives with its default
  // instead of `undefined` for anyone with an existing localStorage entry.
  // `layout` is no longer forced off on load (2026-10-06): the explorer opens on the browser, so a
  // reload fires no thumbnail requests whatever the wall's layout is.
  /* `columnHeight` is FORCED, like `layout` — the browse page reads it out of settings and writes a
   * drag back, and settings are per bucket, so each bucket used to return at whatever height it was
   * last dragged to and the pane jumped on every switch. Dragging still works for the session; the
   * next load is one height again. */
  /* `filters` is FORCED off the same way: the funnel's state was stored, so one click left the
   * filter bar open on every reload. It still toggles for the session. */
  return { ...base, ...(saved || {}), columnHeight: COLUMN_HEIGHT, filters: false };
}

export function saveSettings(bucketId, settings) {
  const store = readStore();
  store[bucketId] = settings;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // Private mode / quota. Settings stay for the session; not worth surfacing.
  }
}

export function resetSettings(bucketId) {
  const store = readStore();
  delete store[bucketId];
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch { /* see above */ }
  return { ...(DEFAULTS[bucketId] || BASE) };
}

export function isDefault(bucketId, settings) {
  const base = DEFAULTS[bucketId] || BASE;
  return Object.keys(base).every((k) =>
    Array.isArray(base[k])
      ? base[k].length === settings[k]?.length && base[k].every((v) => settings[k].includes(v))
      : base[k] === settings[k]
  );
}
