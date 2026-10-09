# Workshop becomes a hub for the apps — scope

**Date:** 2026-10-05 · read-only scope, nothing changed in the code.
**Question (user):** the workshop's docs are incomplete and `ui.kolkrabbi.io` does them better; Design System and Brand live on their own subdomains; the Apparat list is outdated. Make the workshop a living developmental site for the apps and tools on `kolkrabbi.io` subdomains. Scope it into a plan.
**Verdict:** small-to-medium, one arc. The package that runs the Docs section today already does almost all of it; the work is eight pages of content, a rewire, and a retirement with redirects.
**State:** GO given 2026-10-05; steps 1–5 DONE and verified on the built app the same day (8 cards · 8 pages · 4 frames · 21 redirects · search · 390 width · 0 console errors). The one ticket is filed: `reader-takes-field-config-and-page-actions` → kol-ds-ui (receipt in `lobby/outbox/`). **Step 6 waits on its return** — then bump, pass the field config and the Open button from `WorkshopPage.jsx`, re-render, close the receipt the same turn. The §8 defaults were all taken; default 2 was then superseded the same day — the home page's Workshop section was rewritten on the user's approval (Introduction · Design System · Brand · FXR, second button "View Design System"). One deviation from step 5: `05-chess` and `06-dashboard` kept their status (both subjects still exist; 06 is canonical) — six docs were archived, not eight.

---

## 1. What the workshop becomes

One home, one page per app, nothing else.

```
/workshop                 home: one card per app — name, one line, state, last updated
/workshop/design-system   ui.kolkrabbi.io
/workshop/brand           brand.kolkrabbi.io
/workshop/fxr             fxr.kolkrabbi.io        + /live
/workshop/monitor         monitor.kolkrabbi.io    + /live
/workshop/mirror          mirror.kolkrabbi.io     + /live
/workshop/vcap            vcap.kolkrabbi.io       + /live
/workshop/chess           chess.kolkrabbi.io
/workshop/metrics         kolkrabbi.io/metrics    (subdomain is its own plan — §7)
```

- **A page** says what the app is, its state, what changed last, and has a button to the live app and one to the repository.
- **`/live`** is the open-in-place frame, kept only for the four single-screen tools that have it today. A site with its own navigation (design system, brand, chess, metrics) opens on its subdomain; every framed sub-page goes.
- **Left rail:** the eight pages, flat. **Right rail:** on this page, plus Open and Repository.
- **Search:** the modal over the eight pages and their headings. No search page, no tag overlay.

## 2. The page: one markdown file with frontmatter

Each app is one file in `apps/web/src/data/workshop/pages/<id>.md`. Adding an app is adding a file.

```yaml
---
title: Monitor
description: Modular video synthesizer
status: active
updated: 2026-09-02
url: https://monitor.kolkrabbi.io
repo: https://github.com/Tor-Grimsson/kol-monitor
embed: true
---
# Monitor

What it is. How it works. Built with. Latest.
```

- `title · description · status · updated` are the names the package's frontmatter block already orders and styles (`status: active` wears the success badge).
- `url · repo · embed` are this site's three additions: the Open button, the Repository button, and whether `/live` exists.
- The home cards, the rail, the search items and the page titles all derive from the same inventory. `navigation.js`, `embedSections.js` and `apparatTools.js` — three hand-kept lists today — are replaced by the folder.
- `status` and `updated` are what make it a living page. They are kept by hand here.

## 3. What was checked (2026-10-05)

| Fact | How |
|---|---|
| A flat folder works: `buildInventory` takes any path map, id = filename | read `kol-markdown@0.1.3` `build-inventory.js` |
| The parser reads link values and every field above | ran `parseFrontmatter` on the sample |
| The reader renders one named file and can leave the rail to the page | `DocumentationReader` props `docId`, `rail={false}`, `showFrontmatter` (kol-workshop 0.38.0) |
| The app's own rail already derives its outline from rendered headings | `AutoToc` in `WorkshopChrome.jsx` |
| Live: `ui` `brand` `fxr` `editor` `monitor` `mirror` `vcap` `chess` all answer 200 | curl |
| `editor.` and `fxr.` are the same app (Effexor FXR, repo `kol-fxr`); the workshop still calls it "Kol Design Editor" with a repo link that does not resolve | page titles + GitHub |
| Alive: Monitor, Mirror, FXR, Chess pushed September 2026; vcap April | GitHub push dates |
| Dormant: Modulator (03-2026), Radial (11-2025), Distress (01-2026), Radar (03-2026, no subdomain) — four placeholder blurbs in `apparatTools.js` | same |

Not checked: how the home card reads with state and date in its two text lines (`ExhibitLinkCard` has `subtitle` and `description`, no badge slot). Step 2 answers it.

## 4. The design-system ticket — one, complete, closed the day it returns

Known from reading `DocsFrontmatter.jsx`:

1. A link value prints as plain text — `url` and `repo` would not be clickable.
2. A key outside its internal table gets no icon and sorts after the known keys; a consumer cannot set label, icon or order.
3. A consumer cannot hide a key — `embed` would print as a row.

**The ask is the seam, not the three fields:** a per-key config on the block (label · icon · order · hidden · render), passed through `DocumentationReader`, plus two defaults — a URL-shaped value renders as a link, an unknown key gets a default icon. After that, any new field is configuration in this repo and never a request to theirs.

Rules for this ticket:

1. **Not filed until step 2 is done.** All eight pages and the home are rendered through the package untouched first; everything found goes into the same ticket, with measurements.
2. **No stopgap is written here.** Launch waits for the return instead, so nothing is left behind to clean up.
3. **Closed in the turn it is consumed:** bump, re-render the eight pages, write `Remainder here: none` on the receipt and the ledger row. Step 6 is not done until that line exists.

## 5. Steps

1. **Write the eight pages.** Monitor, Mirror and FXR from their READMEs; design system, brand, vcap, chess and metrics drafted from their sites, corrected by the user.
2. **Render them through the package as shipped** on a scratch route, home included. List every gap. File the one ticket (§4).
3. **Build the hub.** Inventory from the folder · home from the inventory · page route on `DocumentationReader` · Open and Repository in the rail · `/live` where `embed: true` · flat left rail · search items from the inventory.
4. **Retire and redirect** (§6). Files move to `_tmp/2026-10-05-workshop-hub/`; `docs/` is not touched.
5. **Repoint what names the old routes:** `sitemap.xml` (seven workshop URLs) · `scripts/metadata-proxy.test.mjs` paths · the titles map in `routes/Workshop.jsx` · the site tree and metadata index in `docs/documentation/04-pages/` (ARCHITECTURE §7) · `docs/documentation/05-workshop/` (eleven files describe the old workshop — one rewritten, the rest marked archived).
6. **Consume the ticket's return and close it** (§4 rule 3). Verify on the built app through `vite preview` on 5199 at 1440 and 390: eight cards, eight pages, four frames, every redirect in §6, the search modal finding each page.

Size: about twelve files leave, four are rewritten (`App.jsx` routes, `WorkshopChrome.jsx`, `Workshop.jsx`, the home), eight pages and two small files are new.

## 6. What leaves, and where old links land

Leaves the live site: the Docs section (reader, index, Showcase page, the `@docs` glob), the Apparat layer, the Dashboard pages, and every framed sub-page of Design System, Brand and Chess.

| Old | Lands on |
|---|---|
| `/workshop/docs`, `/workshop/docs/*`, `/docs`, `/docs/*` | `/workshop` |
| `/workshop/design-system/*` (six framed pages) | `/workshop/design-system` |
| `/workshop/brand/*` (three) | `/workshop/brand` |
| `/workshop/chess/*` (three) | `/workshop/chess` |
| `/workshop/apparat/kol-monitor` · `kol-mirror` · `kol-ds-editor` · `kol-vcap` (and their `/live`) | `/workshop/monitor` · `mirror` · `fxr` · `vcap` (and `/live`) |
| `/workshop/apparat`, the four dormant tools, the older `apparatus/*` and `mirrors/*` redirects | `/workshop` |
| `/workshop/dashboard`, `/workshop/dashboard/*` | `/workshop/metrics` |

With these in place no existing link breaks, including the ones on the home page (§8).

## 7. Out of scope

- **Metrics as its own app on `metrics.kolkrabbi.io`** — separate plan. Until it lands the metrics page points at `kolkrabbi.io/metrics`; afterwards one frontmatter line changes.
- **The four dormant tools** — skipped for now (user).
- **The search results page** — eight pages do not need one.
- **The embed modes of the brand app and `ui.`** (`?embed=1`) — untouched; they belong to those apps.
- **Anything in `docs/`** beyond step 5's workshop and site-tree pages. The files stay in the repo.

## 8. The user's calls, with the default taken if he says nothing

1. **Page text.** Default: the agent drafts all eight, he corrects.
2. **The home page's Workshop section** (`HomeWorkshop.jsx`): two of its four cards and the "View Documentation" button sell documentation. Default: nothing reworded; the redirects carry them to `/workshop` until he gives the words.
3. **"Docs" in the takeover menu** (one of seven links, to `/workshop/docs`). Default: removed, since it would land on the same page as "Workshop".
4. **The "Radial Dial" tile on the home page** points at a dormant tool's page. Default: it links straight to `radial.kolkrabbi.io`.
5. **The media admin** (`media.kolkrabbi.io`) on the hub. Default: left out.
