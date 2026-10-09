import { useEffect, useState } from 'react';
import { PageShell, ShortcutsOverlay } from '@kolkrabbi/kol-shell';
import MediaLibrary from '@kolkrabbi/kol-component/organisms/MediaLibrary';
import IconFrame from '@kolkrabbi/kol-component/atoms/IconFrame';
import { Tooltip } from '@kolkrabbi/kol-component/utilities/Popover';
import { useTheme } from '@kolkrabbi/kol-framework/src/theme.js';
import { kindOf } from '@kolkrabbi/kol-component/utilities/mediaKinds';
import { useModal } from '@kolkrabbi/kol-component/molecules/Modal';
import { isOptimisable, prepareUpload } from '@kolkrabbi/kol-media-client';
import KindOverview from './KindOverview';
import { BUCKETS, setBucket, publicUrl, uploadFile, renameObject, deleteObject } from './lib/api';
import { mediaClient } from './lib/client';
import { DEFAULTS, loadSettings, saveSettings, resetSettings, loadUploadChoice, saveUploadChoice } from './lib/settings';
// Baked folder tree (scripts/folder-tree.mjs → pnpm media-manifest): folders per bucket,
// so the columns draw with no fetch. The explorer takes it as the `folderTree` seam.
import folderTree from './data/folder-tree.json';

/* ON THE CURRENT MEDIA PACKAGES (2026-10-06) — the shape of kol-ds-ui's own apps/media, on the live
 * API instead of its fixture: `PageShell` is the tool frame (app anatomy § Tool frame), and
 * `MediaLibrary variant="explorer"` is ONE surface with the browser and the files wall as two views
 * behind a switch and its own keys (B F R C G · K). `phoneTabs` stays off, as in the DS's own app — on, its pill sat over the crumb line at 390. This file used to stack
 * `browse` and `library` as two full-height surfaces and carry the phone tabs itself. */

const TITLE = 'KOL-R2B2';

// Only stills make a useful 44px tile. Against a LIVE bucket a video thumb pulls the whole object
// for a 44px tile, and some of those are 400 MB — the DS draws a kind glyph for everything else.
const THUMBABLE = new Set(['image']);

/* How a date READS is ours, not the DS's — that is why `formatDate` is a seam beside
 * `formatSize` (component 0.209.0). Short local date (`28.8.2026`), because the meta line
 * cannot wrap and an ISO stamp fills it alone. */
const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(+d) ? iso : `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

/* THE THEME TOGGLE — in the settings drawer's footer, beside the reset icon, in the SAME chip
 * (user 2026-08-28), through the `settingsFooter` seam. Same `IconFrame variant="primary" size="sm"`
 * as reset, driven by the framework's own `useTheme`. */
function ThemeChip() {
  const { theme, cycle } = useTheme();
  const dark = theme === 'dark';
  return (
    <IconFrame
      name="mode-toggle-01"
      variant="primary"
      size="sm"
      onClick={cycle}
      title={dark ? 'Switch to light' : 'Switch to dark'}
      aria-label={dark ? 'Switch to light' : 'Switch to dark'}
    />
  );
}

/* The S sheet — the explorer's keys, listed by the DS's own overlay. N is left out: this API has
 * no create-folder endpoint, so the explorer never binds it. */
const SHORTCUTS = [
  { section: 'Views', items: [
    { id: 'b', label: 'Browse', combo: 'B' },
    { id: 'f', label: 'Files', combo: 'F' },
    { id: 'r', label: 'Rows', combo: 'R' },
    { id: 'c', label: 'Columns', combo: 'C' },
    { id: 'g', label: 'Grid', combo: 'G' },
  ] },
  { section: 'Tool', items: [
    { id: 'k', label: 'What is in this bucket', combo: 'K' },
    { id: 's', label: 'This sheet', combo: 'S' },
    { id: 'esc', label: 'Close', combo: 'Esc' },
  ] },
];

// The last-used bucket survives a reload (localStorage; falls back to r2).
const BUCKET_KEY = 'kol-r2b2:bucket';
const initialBucket = () => {
  try { const v = localStorage.getItem(BUCKET_KEY); if (v && BUCKETS[v]) { setBucket(v); return v; } } catch { /* private mode */ }
  return 'r2';
};

export default function App() {
  // The folder path lives in the URL hash (#img/04-collections/) so browser
  // Back/Forward walk folders and a reload lands where you were.
  const [prefix, setPrefixState] = useState(() => decodeURIComponent(location.hash.slice(1)));
  const setPrefix = (next) => {
    setPrefixState(next);
    const hash = next ? `#${encodeURIComponent(next).replace(/%2F/g, '/')}` : '';
    if (location.hash !== hash) history.pushState(null, '', hash || location.pathname);
  };
  useEffect(() => {
    const onPop = () => setPrefixState(decodeURIComponent(location.hash.slice(1)));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const [refreshKey, setRefreshKey] = useState(0);
  const touched = () => setRefreshKey((k) => k + 1);
  const [bucketId, setBucketId] = useState(initialBucket);
  const [settings, setSettings] = useState(() => loadSettings(bucketId));
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const bucket = BUCKETS[bucketId];

  /* S — this app's sheet (the explorer owns the view keys). Ignored while typing. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 's' || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target;
      if (el?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el?.tagName ?? '')) return;
      e.preventDefault();
      setShortcutsOpen((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Persist on every change. `null` is the panel's reset signal.
  const applySettings = (next) => {
    if (next === null) {
      const back = resetSettings(bucketId);
      setSettings(back);
      return;
    }
    setSettings(next);
    saveSettings(bucketId, next);
  };

  const switchBucket = (id) => {
    if (!BUCKETS[id]) return;
    const next = loadSettings(id);
    setBucket(id);
    setBucketId(id);
    try { localStorage.setItem(BUCKET_KEY, id); } catch { /* private mode */ }
    setSettings(next);
    setPrefix('');
    touched();
  };

  /* Multi-bucket browse prefixes every key with a virtual root (`KOL-R2B2/<bucket label>/`) so the
   * three stores share one tree. The seams are handed those prefixed paths and need the
   * bucket-relative key back — the counts are keyed that way and `publicUrl` builds from it. */
  const unroot = (p) => {
    const vroot = `${TITLE}/${bucket.label}/`;
    return p.startsWith(vroot) ? p.slice(vroot.length) : p;
  };

  /* A folder's own meta line, a lookup in the baked tally — never a count over 3443 keys. */
  const folderMeta = (path) => {
    const c = folderTree[bucketId]?.counts?.[unroot(path)];
    return c ? `${c.files} item${c.files === 1 ? '' : 's'}` : '';
  };

  /* The 44px tile: both stores serve ORIGINALS, held back by `loading="lazy"`. */
  const thumbnailFor = (o) =>
    THUMBABLE.has(kindOf(o))
      ? <img src={publicUrl(unroot(o.key))} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
      : null;

  /* THE FILE VERBS, on the live API (R2 only — the B2 adapter is read-only). `move` is `rename`
   * with a new parent; the endpoints are `/api/rename` and `/api/object`. No create-folder, no
   * trash — R2 has neither, and the explorer shows only the verbs it is given. */
  const fileActions = bucket.writable ? {
    rename: async (from, to) => { await renameObject(unroot(from), unroot(to)); touched(); },
    move: async (path, destFolder) => {
      const name = path.replace(/\/$/, '').split('/').pop();
      await renameObject(unroot(path), `${unroot(destFolder)}${name}${path.endsWith('/') ? '/' : ''}`);
      touched();
    },
    remove: async (path) => { await deleteObject(unroot(path)); touched(); },
  } : undefined;

  /* THE UPLOAD QUESTION (kol-media-client 0.5.0 + component 0.248.0, ticket
   * upload-dialog-optimise-and-keep-originals): a batch holding a raster still asks once — web-optimise,
   * keep originals — defaulting to this bucket's last answer. No raster, no question: as-is. `null` =
   * cancelled. The shape is kol-ds-ui apps/media-fixture `wiring.jsx` `onDropFiles`. */
  const modal = useModal();
  const askUpload = async (files) => {
    if (!files.some(isOptimisable)) return { optimise: false, keepOriginals: false };
    const last = loadUploadChoice(bucketId);
    const { ok, values } = await modal.confirm('Web-optimise raster images?', {
      okLabel: 'Upload',
      options: [
        { id: 'optimise', label: 'Optimise', hint: '≤2560 px, ≤500 KB', defaultValue: last.optimise },
        { id: 'keepOriginals', label: 'Keep originals', hint: 'original/<name>', defaultValue: last.keepOriginals },
      ],
    });
    if (!ok) return null;
    saveUploadChoice(bucketId, values);
    return values;
  };

  /* Desktop files dropped on a folder go up through the same `/api/upload` the drop pool uses. */
  const onDropFiles = bucket.writable ? async (files, folder) => {
    const list = Array.from(files);
    const opts = await askUpload(list);
    if (!opts) return;
    for (const f of list) {
      for (const { key, blob } of await prepareUpload(f, { folder: unroot(folder), ...opts })) await uploadFile(blob, key);
    }
    touched();
  } : undefined;

  /* THE SETTINGS FOOTER, the DS media app's arrangement (kol-ds-ui apps/media-fixture tool.jsx): the kind
   * overview is a reference, not a daily control, so it sits in the drawer beside the theme chip, not
   * in the header. Uploads are the explorer's own — a desktop drop on a folder, or right-click
   * "Upload into …" — both through `onDropFiles`; the header Upload button and its drop pool
   * (UploadZone, pre-explorer) retired 2026-10-09. */
  const settingsFooter = (
    <>
      <ThemeChip />
      <Tooltip label="What is in this bucket">
        <IconFrame name="grid" variant="primary" size="sm" onClick={() => setOverviewOpen(true)} aria-label="What is in this bucket" />
      </Tooltip>
    </>
  );

  return (
    /* THE TOOL FRAME: PageShell fixed · bleed — the page the tool gets inside a hub, so alone and
       in a shell are one geometry. `gap-10` IS the page rhythm (user 2026-08-27: the air goes
       BETWEEN the units, never inside one). `r2b2-browse` is the count-line hook. */
    <PageShell mode="fixed" className="gap-10">
      <MediaLibrary
        variant="explorer"
        client={mediaClient}
        title={TITLE}
        bucket={bucketId}
        onBucketChange={switchBucket}
        bucketLevel
        settings={settings}
        /* the page resolves "reset" from these — without them it falls back to its own base */
        defaults={DEFAULTS}
        onSettingsChange={applySettings}
        settingsFooter={settingsFooter}
        refreshKey={refreshKey}
        folderTree={folderTree}
        folderMeta={folderMeta}
        thumbnailFor={thumbnailFor}
        formatDate={formatDate}
        fileActions={fileActions}
        onDropFiles={onDropFiles}
        keys
        onKinds={() => setOverviewOpen((v) => !v)}
        prefix={prefix}
        onPrefix={setPrefix}
        autoFocus
        className="gap-10 r2b2-browse"
      />


      {/* A tile opens that kind's file large, inside the same dialog — the grid is a step, not a filter. */}
      <KindOverview
        open={overviewOpen}
        onClose={() => setOverviewOpen(false)}
        client={mediaClient}
        buckets={Object.values(BUCKETS)}
      />

      {/* The DS's own sheet, fed the same list the keys are read from. */}
      {shortcutsOpen && <ShortcutsOverlay shortcuts={SHORTCUTS} onClose={() => setShortcutsOpen(false)} />}
    </PageShell>
  );
}
