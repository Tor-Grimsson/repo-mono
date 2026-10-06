# Session Log: Newsletter (Kit) + Stack Hero Mood + GSC

**Date:** 2026-05-27
**Status:** Completed (newsletter live; metrics-route wiring is next)

## Overview

Shipped the KOL newsletter on Kit (kit.com) — replaced the old Formspree forwarding with a real subscriber list, verified-domain deliverability, and added the signup to the Stack page. Swapped the Stack hero background to a new mood image (responsive variants on CDN). Set up Google Search Console for kolkrabbi.io. Part of a new "acyr-derived growth projects" workstream (newsletter / social metrics / print-on-demand) modeled on the Another Creation client build.

## Key Accomplishments

### 1. Newsletter → Kit (live)
**Files:** `apps/web/api/subscribe.js` (new), `apps/web/src/components/sections/home/HomeSignup.jsx`

- New serverless fn `subscribe.js`: validates email, `POST https://api.kit.com/v4/subscribers` with `X-Kit-Api-Key`, body `{ email_address }`. Returns 400/500/502 on errors. Reads `KIT_API_KEY` (`KIT_FORM_ID` set in Vercel but currently unused — single opt-in, no form attach).
- `HomeSignup.jsx`: repointed fetch `formspree.io/f/xkgagper` → `/api/subscribe`, body trimmed to `{ email }`. UI/status states unchanged.
- Kit account created (free Newsletter plan, 10k subs). Form ID `9490996`. Env vars `KIT_API_KEY` + `KIT_FORM_ID` in Vercel (Production + Preview).
- **Verified Sending Domain** `kolkrabbi.io` in Kit. DNS in Cloudflare (all **DNS-only / grey cloud**): CNAME `ckespa`→`spf.dm-db45483c.sg6.convertkit.com`, CNAME `cka._domainkey`→`dkim.dm-ab166b4d.sg6.convertkit.com`, CNAME `cka2._domainkey`→`dkim2.dm-b09a84e4.sg6.convertkit.com`, TXT `_dmarc`=`v=DMARC1; p=none;`. From-address set to `hello@kolkrabbi.io` (domain has Google Workspace — root SPF `_spf.google.com`).
- Pushed + live. 8 real subscribers landed via the live home signup. **Single opt-in** — subscribers are created silently, no confirmation/welcome email (welcome automation needs a paid Kit plan; double opt-in would require routing through the form). Decided to keep single opt-in.
- **Provider decision:** Kit over MailerLite (gates DKIM/Return-Path tracking domain behind paid = spam risk) and Resend (no free newsletter tier — broadcasts $40/mo). Klaviyo evaluated for a *client* (ecommerce-only, 250-contact free tier) — not for KOL.

### 2. Newsletter signup on Stack page
**File:** `apps/web/src/routes/Stack.jsx`

- Imported and rendered `<HomeSignup />` before `<CtaGlobal />` (reuses the Kit-wired component, no duplicate code).

### 3. Stack hero — new mood background
**Files:** `apps/web/src/routes/Stack.jsx`, `docs/a-torg/moods.md` (new)

- `StackHeroTall` on the Stack page now gets explicit `src` + `srcSet` pointing at `mood-01` (was the default `stack-hero-*`).
- Generated 20 responsive variants (4 moods × 400/800/1200/1600/2560 via `sips`) from `docs/a-torg/mood-0X.jpg`, uploaded to CDN `website/asset-library/cms/stack/mood/` (via `bucket up`). Existing `stack-hero-*` untouched.
- `docs/a-torg/moods.md`: wikilink doc of the four 1200w mood URLs.

### 4. Google Search Console (kolkrabbi.io)
- Verified as a **Domain** property (TXT verification records already present in Cloudflare). Sitemap `https://kolkrabbi.io/sitemap.xml` submitted (Domain properties need the full URL, not a relative path — initial "Invalid sitemap address" was the relative-path form).
- Bing optional (import-from-GSC). **Meta + TikTok pixels deliberately skipped** for KOL — ad-attribution tools, no ad spend (only made sense for AC's paid launch).

## Files Modified

### New Files
- `apps/web/api/subscribe.js` — Kit v4 subscribe serverless fn
- `docs/a-torg/moods.md` — mood 1200w wikilink doc

### Modified Files
- `apps/web/src/components/sections/home/HomeSignup.jsx` — Formspree → `/api/subscribe`
- `apps/web/src/routes/Stack.jsx` — mood-01 hero `src`/`srcSet` + `<HomeSignup>` section

### External (not in repo)
- CDN: 20 mood variants under `asset-library/cms/stack/mood/`
- Kit: account, form 9490996, API key, verified sending domain, `hello@kolkrabbi.io`
- Vercel: `KIT_API_KEY`, `KIT_FORM_ID` env vars
- Cloudflare: 4 Kit DKIM/SPF/DMARC DNS records
- GSC: kolkrabbi.io Domain property + sitemap

## Issues Encountered

### 1. "No notification" on signup
- **Problem:** 8 subscribers landed but none got an email.
- **Resolution:** Expected — `/v4/subscribers` creates silently. Welcome email needs paid-plan automation; double opt-in needs form routing. Kept single opt-in by choice.

### 2. GSC "Invalid sitemap address"
- **Problem:** Submitting `sitemap.xml` failed.
- **Resolution:** Domain properties require the absolute URL `https://kolkrabbi.io/sitemap.xml`. Sitemap itself was fine (200, valid XML).

## Next Steps

- **Metrics build (next):** wire `/metrics` route (`apps/web/src/routes/Metrics.jsx`, static mockup) to the existing `apps/web/api/metrics-*.js` endpoints (Umami already collecting) + optionally the GSC API.
- **Print-on-demand:** not started — `/prints` + Printful + PayPal; AC's commerce backend is the template.
- Optional: a KOL brand-info file (hold `hello@kolkrabbi.io` + socials currently hardcoded in `Footer.jsx`) — KOL has none; `apps/brand/src/brand/data/info.js` is Another Creation's.
