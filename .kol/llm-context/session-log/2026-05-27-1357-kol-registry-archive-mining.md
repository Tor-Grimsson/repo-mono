# Session Log: KOL Brand Registry — Archive Mining + AC→KOL Flip

**Date:** 2026-05-27
**Status:** Completed (data layer; consuming page repurpose + a few TODOs remain)

## Overview

Converted the `apps/brand` data layer from leftover Another Creation (AC) scaffold to real Kolkrabbi data, then deep-mined two external archives to populate the founder's full bio/career/art/music record into the registry. The brand app is internal/access-gated (not customer-facing), so personal history is in-scope.

## Key Accomplishments

### 1. AC → KOL identity flip
**Files:** `apps/brand/src/brand/config.js`, `apps/brand/src/brand/data/info.js`, `apps/brand/src/pages/Acyr.jsx`

- `config.js`: `nameSlug` `another-creation` → `kolkrabbi` (verified unused; no asset-path breakage).
- `info.js`: full Kolkrabbi identity — founder Tór (Þórður) Grímsson, est. 2019, **Skipholt 51 Apt 303, 105 Reykjavík**, **VAT 109052**, kt 280485-2339, tor@kolkrabbi.io, +354 892 2928, socials. AC garment labels dropped.
- `Acyr.jsx`: rewrote the bio `PageSection` to KOL's data shape (removed AC "designer/director" framing + `new Date(birthDate)` that would render "Invalid Date").

### 2. business-data.js — full rewrite to KOL
**File:** `apps/brand/src/brand/data/business-data.js`

Replaced AC's dossier with Kolkrabbi's. Kept all named exports `Acyr.jsx` imports (`AWARDS`/`FILMS`/`COLLABORATIONS`/`VENDORS`/`STACK`/`LIVE_SITE_MAP`/`MARKETING_PLAYBOOK`/etc.) so the registry page still renders — AC-only ones as empty arrays, `VENDORS`/`STACK` filled with KOL's real stack. Added `exhibition` + `video` timeline kinds. Populated BIO (+ artist statement), full TIMELINE (education / work / awards / type / exhibitions / music / press / profiles), COMPANIES, SOCIAL, OPEN_QUESTIONS.

### 3. Archive mining (sources OUTSIDE the repo)
- **`~/Library/.../kol-vault-mgmt/kol-vault-workbox/kol-studio/kol-resume`** — CV 2026, personal bios, profile overview.
- **`~/Library/.../baklog-log/docs-studio`** — 276-file personal archive (2008–2026): bios, art/press/applications, CVs 2009–2026, LHÍ coursework + BA thesis + Erasmus, Two Step Horror, Konsulat, a&e sounds. Full catalog written to **`docs-studio/_archive-catalog.md`** (the running log + per-file index).
- Plus an earlier public-web scrape (Skemman, Behance, Discogs, Bandcamp, Karolina Fund, Morgunblaðið, Grapevine, Luc Devroye).

Resolved from the archive: birth date (28 Apr 1985), studio address, VAT/kt, full solo-exhibition list (incl. Óráð/Delirium = Kaolin Dec 2010), 2008 700IS award, Pilgrim High (USA), music-video directing credits, a&e→Konsulat rename, TSH discography corrections, "Prump" = a 2009 Fréttablaðið op-ed, "Draumfarir" = his artistic *theme* (not a project).

### 4. Archive preservation — markdown + `_assets` (docs-studio, external)
After the read pass, converted the archive to a durable, vault-conformant shape:
- **115 text docs → co-located `.md`** with frontmatter (`title/type:archive/status/category/source/date/tags`), via `textutil`. `.rtfd` bundles flattened to one `.md`. Originals untouched.
- **55 images → `docs-studio/_assets/`** — kebab-case, category-prefixed unique names (`art-press-…`, `kon-…`, `tsh-…`) so Obsidian embeds resolve. Passport scans left in place (PII); `.rtfd` internals untouched.
- **`docs-studio/_assets-gallery.md`** — wikilink gallery per the vault `kol-knowledge/_framework` convention (frontmatter + `![[name]]` embeds grouped by category; `.tiff/.ai/.psd` listed as `[[link]]` source files).
- Matches the framework's `_assets/` + frontmatter + explicit-wikilink shape.

## Files Modified
- `apps/brand/src/brand/config.js` — nameSlug → kolkrabbi
- `apps/brand/src/brand/data/info.js` — KOL identity / contact / legal / studio / social
- `apps/brand/src/brand/data/business-data.js` — full KOL rewrite
- `apps/brand/src/pages/Acyr.jsx` — bio section to KOL shape
- `docs-studio/_archive-catalog.md` (external) — new; full archive catalog
- `docs-studio/_assets-gallery.md` (external) — new; wikilink image gallery
- `docs-studio/_assets/` (external) — new; 55 images relocated + renamed
- `docs-studio/**/*.md` (external) — new; 115 markdown derivatives of text docs

## Issues / decisions
- **Privacy:** kennitölur (his + a third party's), passport scans, Karolina pledge/download CSVs, a bank-info note — kept OUT of the committed registry. Third-party kt never stored. Personal kt is in `info.js` (his own, per the field he set up) flagged to scrub if the file goes public.
- **Image reader limits:** several press-clipping images exceed the API's per-image pixel cap (and .tiff is binary) — identities logged from filenames/text, facts already captured from the text docs.

## Next Steps / open
- **OPEN_QUESTIONS** in business-data.js: Berlin school **UDK vs Weissensee** (period docs say UDK, later bios say Weissensee); BFA vs BA (2009); confirm current address; China show venue; **"Rafiðn"** still unidentified; per-typeface foundry release years.
- **Repurpose `Acyr.jsx`** — still routed `/reference/acyr` + "Source of truth" nav + AC-flavored section copy. Needs a proper KOL rename.
- Wire `Footer.jsx` socials to read from `info.js` (single source).
