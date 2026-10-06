# MediaLibrary

**Filed:** 2026-08-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/MediaLibrary.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-01

## Why it went there

The brand book's media page was one of **four** copies of the same media browser
(1542 lines across 9 files in 4 repos). Two of them shared filenames and had already
diverged in opposite directions, so a fix in either was invisible to the other. That
is a design-system consolidation, not a website fix.

## What stays here

Retiring `apps/brand/src/pages/Library.jsx` (147 lines) and adopting the published
component. Written at filing time as a prediction; confirmed below as a fact.

---

## ✅ RETURNED — 2026-08-01

🟢 `closed` in **kol-ds-ui** — shipped as `MediaLibrary` in
**`@kolkrabbi/kol-component@0.19.0`** + **`@kolkrabbi/kol-theme@0.18.0`**, both
published to the registry 2026-08-01 (their bar: a shipped version cited in the
resolution). 14 gates clean, production build green.

**Remainder here (SUPERSEDED — see the CURRENT line at the foot of this file):** 📌 retire `apps/brand/src/pages/Library.jsx` (147 lines) and
render the published component instead:

```jsx
import { MediaLibrary } from '@kolkrabbi/kol-component'
import { createMediaClient } from '@kolkrabbi/kol-media-client'

const client = createMediaClient()

<MediaLibrary variant="page" client={client} />
```

The client is **injected, never imported by the component** (kol-ds-ui
ARCHITECTURE §3), so the brand app keeps control of `adminBase` / `publicBase` /
`proxyPath`.

**Three defects this closes for the brand book, without a line of local work:**

| Symptom here today | Why | Fixed by |
|---|---|---|
| **433 flat tiles**, 415 of them `labs-render-examples/` noise | this page never learned the folder drill-down the fxr picker already had | folders disclose **in place** (Finder's list model) — no click-to-enter, no breadcrumb |
| video tiles render as **empty boxes** | no poster frame requested | `#t=0.1` on the source — 222 of 433 objects were affected |
| no way back out of a viewer | the close path was hand-rolled per fork | Escape steps back one level |

**Not in the component:** upload / rename / delete. This is the read layer; write
auth stays in kol-media-admin. `uploadToLibrary` ships separately from
`@kolkrabbi/kol-media-client` if the brand app ever needs it.

**Accepting the injected-client API is this repo's call.** Nothing in kol-website
was changed — no imports touched, no version bumped, no page rewritten.

---

## ✅ REMAINDER EXECUTED — 2026-08-01

**Remainder here: `none`.** The injected-client API was accepted; the swap
landed and was verified live.

| | |
|---|---|
| `pages/Library.jsx` | 147 lines → 57. Body is `<MediaLibrary variant="page" client={mediaClient} />`; `PageSection` shell, `usePageTitle` and the Open-admin button kept |
| client | `createMediaClient()` at **module scope** — no arguments, because the factory's defaults already ARE this bucket. Module scope is load-bearing: `MediaLibraryProvider`'s fetch effect keys on client identity, so a per-render object refetches forever |
| `pages/LibraryFolder.jsx` | retired → `_tmp/brand-medialibrary-elder/`. Its own header had mandated this: *"When that package ships, this page and Library.jsx both collapse onto it — do not add a fourth transcription."* |
| `/library/:folder` + 3 sidebar children | removed. `MediaLibraryProvider` calls `listMedia('')` with **no prefix seam**, so a folder-scoped child route has nothing to scope — and the organism discloses folders in place, which is the control those rows duplicated |
| deps | `@kolkrabbi/kol-media-client@^0.1.0` added to `apps/brand`, plus its `optimizeDeps.exclude` entry (raw-source package — build would have stayed green while dev broke) |

**Verified live** (task server, killed after): 433 objects fetched, all
image/video, nothing dropped by the type filter. 3 folder rows read FROM the
bucket rather than a transcribed three. Clicking `video/` disclosed it in place,
7 → 17 grid cards. Sort/filter/search/Grid-List chrome renders. `20 of 20` is a
visible-ROW count, not an object count — collapsed folders hiding their contents
is the Finder model working.

**One gap found and filed back**, not fixed here:
`outbox/MediaLibraryVideoFallback.md` — `Thumb` gives an undecoded video tile no
resting state. ⚠ Whether `#t=0.1` paints at all in real Chrome remains the
user's own open item; both strategies fail headless (no h264 decoder), so
nothing measured here says the DS approach is wrong.
