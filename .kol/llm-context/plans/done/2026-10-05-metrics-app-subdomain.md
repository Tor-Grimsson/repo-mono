# Metrics becomes its own app on metrics.kolkrabbi.io — scope

**Date:** 2026-10-05 · read-only scope, nothing changed in the code.
**Question (user):** give metrics a subdomain instead of a page on kolkrabbi.io; dealt with separately from the workshop hub.
**Verdict:** small. The design system already ships this dashboard as a component — the 657-line page here is the older copy of it. The new app is a thin shell around the package component, the data hook and the six server functions. The part that is not the agent's: a Vercel project, six secrets and the domain.
**State:** GO given 2026-10-05. **Steps 1–2 DONE the same day:** `apps/metrics` is built (JS 320 kB against the web app's 2.49 MB main chunk) and was compared with the live page on the built app, `/api` proxied to production — all four tabs carry the same cards at 1440 and 390 (15 · 15 · 11 · 4), status `live`, host summaries filled, no overflow, 0 console errors. **No ticket:** nothing real was missing from the package component. **Steps 3–5 DONE 2026-10-06, by the agent through the Vercel and Cloudflare APIs:** project `kol-metrics` (Git-connected to `repo-mono`, root `apps/metrics`), five secrets set from `~/dev/.secrets` and `~/.config/rclone/rclone.conf` (the first attempt copied the web project's values, which the API returns still encrypted — garbage; replaced), domain attached, CNAME added, two CLI deploys; all six endpoints answer with real data. Web cut over: `/metrics` redirects at the edge, page · hook · six functions · kol-dashboards wiring retired to `_tmp/2026-10-05-metrics-app/web/`, allowlist and test and robots line updated, web builds. The redirect reaches kolkrabbi.io with the next web deploy.

---

## 1. What exists today

| | Where | Facts |
|---|---|---|
| The page | `apps/web/src/routes/Metrics.jsx` | 657 lines. Renders inside the site's navbar and footer. Four tabs, deep-linkable as `?tab=site\|project\|infra\|sessions` |
| The data | `apps/web/src/hooks/useMetricsData.js` | 257 lines. Five fetches, with fallback data when the API is absent |
| The server side | `apps/web/api/metrics*.js` | six functions (below). Each sends `Access-Control-Allow-Origin: *` |
| The same dashboard, in the package | `@kolkrabbi/kol-dashboards` 0.4.3 `MetricsDashboard` | 565 lines, presentation only: `data`, `milestones`, `mainHost` are handed in. Its styles are kol-theme's `kol-components-dashboards.css` |
| Other users of kol-dashboards in web | none | only the metrics page, plus the three wirings (dependency, `@source`, `optimizeDeps.exclude`) |
| Other callers of the API | none found | the design system's showcase runs the same component on fixtures |
| Tracking | `apps/web/index.html` | the Umami tag, one website id for every host |

The six functions and what each needs:

| Function | Reads | Secrets |
|---|---|---|
| `metrics.js` | Umami, per range and host | `UMAMI_USER` · `UMAMI_PASS` |
| `metrics-summary.js` | Umami, one host's summary | same two |
| `metrics-deploys.js` | Vercel deployments | `VERCEL_TOKEN` · `VERCEL_TEAM_ID` |
| `metrics-b2.js` | Backblaze bucket sizes and uploads | `B2_APPLICATION_KEY_ID` · `B2_APPLICATION_KEY` |
| `metrics-sanity.js` | Sanity counts and recent edits | none needed — project and dataset have defaults |
| `metrics-repo.js` | nothing — a hardcoded snapshot | none |

**Local page against the package component:** 250 lines differ. Only the local one has the ten hardcoded milestones, a fetch for the host summary inside the card, the `?tab=` deep link and the SEO tag. Everything else is the same dashboard.

## 2. The app

`apps/metrics` — a Vite app like `apps/brand`, picked up by the workspace's `apps/*`.

```
apps/metrics/
  index.html        theme boot script + the Umami tag
  package.json      kol-theme · kol-component · kol-icons · kol-dashboards · react · vite · tailwind
  vite.config.js    optimizeDeps.exclude for the KOL packages · /api proxied to the deployed functions
  vercel.json
  api/              the six functions, moved from apps/web/api
  public/           fonts and favicons as symlinks to the root public/
  src/              main.jsx · App.jsx · index.css · useMetricsData.js (moved) · milestones.js
```

- `App.jsx` renders the package's `MetricsDashboard` with the hook's data, the milestones and `mainHost="kolkrabbi.io"`. No router: it is one screen.
- The hook moves as it is and gains the host summaries the package component expects as data (`/api/metrics-summary`, today fetched inside the page).
- The local 657-line page is **retired, not moved**.

## 3. What the package cannot do, known before rendering

- **No `?tab=` deep link** — the tab is internal state. Not worth a ticket: the deep links existed for the workshop's per-tab frames, which are gone. The hub page's four tab links become plain text.
- **The Project tab's captions name `packages/ui` and `@kol/ui`** — in both copies. Content, and stale (§4).

Per the standing ticket rule: step 2 renders the app on the package untouched and compares it with the live page; anything real goes out as one ticket. If nothing is, none is filed.

## 4. Stale content it will carry over — the user's call, not this plan

- `metrics-repo.js` is a snapshot measured **2026-03-05**. It counts things that no longer exist (components in `packages/ui`), so the Project and Sessions tabs show March numbers.
- The ten milestones end on 2026-03-05.

## 5. Steps

1. **Build `apps/metrics`** in the repo. The functions are copied in; web keeps its own until step 5.
2. **Render it on the package untouched**, with `/api` answered by production. Compare with the live page at 1440 and 390. One ticket if anything real turns up.
3. **User:** a Vercel project with root `apps/metrics`, the six secrets, and the domain `metrics.kolkrabbi.io`.
4. **Check the live subdomain:** five endpoints answer, four tabs render.
5. **Cut over in web:** `/metrics` redirects to the subdomain · the page, the hook, the six functions and the kol-dashboards wiring retire to `_tmp/` · the hub page's `url` changes · `/workshop/dashboard/metrics` lands on the hub page · `metrics` leaves the metadata-proxy allowlist and its test · the `robots.txt` line and the site-tree doc follow.

Nothing is down at any point: kolkrabbi.io keeps serving `/metrics` until step 5.

## 6. Needed from the user

One Vercel project:

| Setting | Value |
|---|---|
| Repository | this one |
| Root Directory | `apps/metrics` |
| Framework | Vite (build `vite build`, output `dist`) |
| Secrets, copied from the web project | `UMAMI_USER` · `UMAMI_PASS` · `VERCEL_TOKEN` · `VERCEL_TEAM_ID` · `B2_APPLICATION_KEY_ID` · `B2_APPLICATION_KEY` |
| Domain | `metrics.kolkrabbi.io` |

**Which `vercel.json` is live for web — answered 2026-10-05 from the live site, no dashboard needed:** `apps/web/vercel.json`. A garbage path (`/wp-admin`) returns 404, which is the metadata function's allowlist; the root file would have served the app. The step-5 redirect goes there. The root `vercel.json` is not in effect.

## 7. Out of scope

- Refreshing the repo numbers and the milestones (§4).
- A link back to kolkrabbi.io inside the dashboard — the package component has no slot for one.
- What is measured, and how.
