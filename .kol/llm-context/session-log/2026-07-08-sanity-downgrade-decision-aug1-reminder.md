# Session: Sanity plan downgrade — decision + Aug-1 reminder

**Date:** 2026-07-08
**Agent:** Claude (Grim)
**Summary:** Diagnosed the scary "260 GB / 100 GB" Sanity bandwidth reading, concluded a Growth→Free downgrade is safe but must wait for the July quota to reset, and scheduled a cloud reminder for Aug 1. No code changes.

## Changes Made

### Files Modified
- _(none — analysis + scheduling session)_

### Features Added/Removed
- **Cloud routine created** — one-shot reminder `trig_01KYbEDdsUjdHL6GXRS4h1fJ`, fires `2026-08-01T09:00:00Z` (09:00 Reykjavík). Carries the full downgrade context + 2-item pre-flight checklist. https://claude.ai/code/routines/trig_01KYbEDdsUjdHL6GXRS4h1fJ

## Current State

### Working
- **Downgrade decision settled.** The July bandwidth spike (Project `to8h15ed`, Usage tab) read **260.2 GB / 100 GB** — but it's a single day: **Jul 3rd, ~255.56 GB**. That was **outbound video serving** off `cdn.sanity.io` (a crawler/hotlinker on `/work/*` in-view autoplay), *not* the migration exporting data. Since work video now lives on B2, that egress source is permanently gone from Sanity; post-Jul-5 days are flat.
- **Verified Free vs Growth caps** (sanity.io/pricing): both include **100 GB bandwidth / 100 GB assets / 2 datasets / 1m CDN / 250k API**. The real differences: Free is **public-datasets-only**, **10k docs** (vs 25k), and a **hard bandwidth cap with no overage** (Growth bills overage — which is why this month shows 160.2 GB overage).
- Everything non-bandwidth clears easily on Free: documents 39/10k, 1 seat/20, assets 1.4 GB/100 GB, API ~0%.

### Known Issues
- **Do NOT downgrade before the July quota resets (~Aug 1).** The period counter is already at 260 GB; Free's hard 100 GB cap would choke image serving for the rest of July if switched mid-period.
- **Dataset visibility unverified.** Project is at 2/2 datasets; Free allows 2 but **public only**. If either is private (staging/preview), Free rejects the downgrade — must be confirmed in the Datasets tab before switching.
- **Free hard-cap standing risk:** any *future* bulk op or traffic spike over 100 GB breaks image serving (no overage) instead of billing. Do bulk pulls on Growth, or bounce back to Growth for the day.

## Next Steps
1. **Aug 1 (reminder fires):** confirm bandwidth counter reset + both datasets public → then downgrade Growth→Free.
2. New task — user is switching focus (this thread is closed).
