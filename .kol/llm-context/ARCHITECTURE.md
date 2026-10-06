---
_template:
  version: 1
  path: .kol/llm-context/ARCHITECTURE.md
  sync: skip
---

# Studio website kolkrabbi.io — Architecture

Load-bearing decisions and constraints. Anything here is "chosen deliberately, with downstream
consequences." Do not revisit without explicit reason. For decision history see `history.md`.

These were ported from the repo's former `LLM_RULES.md` (2026-07-05) — they are project rules, so
they belong here, not in the now-generic boot file.

---

## §1 — JS-only apps; TS confined to studio + content

JSX only in `apps/web`, `apps/foundry`, `packages/ui`, `packages/fontviewer`. **TypeScript only in
`apps/studio` and `packages/content`.**

**Consequence:** never add TypeScript (or `.ts`/`.tsx`) to the JS apps/packages. Sanity-facing code
(schemas, studio) is the only TS surface.

**Do not revisit** unless the whole web tier adopts TS deliberately.

---

## §2 — Tailwind v4 only, no config file

Styling is Tailwind v4 via `@theme` tokens imported from `@kol/ui/theme.css`. There is **no
`tailwind.config`**.

**Consequence:** no `@apply`/`@screen`/`@variants`/`theme()` legacy patterns; reach for `@theme`
tokens + utilities tied to shared tokens, not ad-hoc CSS.

**Do not revisit** unless Tailwind changes its config model.

---

## §3 — Semantic color tokens only, never hardcoded

Colors come from semantic design-system tokens (`var(--kol-*)`, surface/foreground pairs). **Never
hardcode a color; never use a deprecated token** (`--component-fg`, `--component-surface`, …). Tokens
adapt through scoped remapping (light/dark, surface context).

**Consequence:** any color/bg/text work checks the color docs first
(`docs/documentation/…colors…`) and uses a token — inline styles for color only in doc swatches.

**Do not revisit** — this is the design-system integrity contract.

---

## §4 — Apps stay separate

`apps/web` is the public site, `apps/foundry` is its own app (may embed in web later),
`apps/studio` is the Sanity editor, `apps/brand` is the brand site, `apps/metrics` is the metrics dashboard (2026-10-05).

**Consequence:** don't merge app concerns; shared UI goes through `@kol/*` packages, not cross-app imports.

**Do not revisit** unless the app boundary is intentionally collapsed.

---

## §5 — Sanity schema lives in `packages/content` only

All Sanity schema changes go in `packages/content`. `apps/studio` just consumes them.

**Consequence:** never define/edit schema inside an app; the schema package is the single source.

**Do not revisit** unless the studio stops consuming the shared package.

---

## §6 — Internal imports via `@kol/*`

Prefer `@kol/ui`, `@kol/component`, `@kol/content` over duplicating code across apps.

**Consequence:** shared behaviour is extracted to a package and imported, not copy-pasted.

---

## §7 — Routes align with the metadata index (don't break the IA)

Routes must align with `docs/documentation/…metadata-index…` unless a change is explicitly approved.

**Consequence:** route/IA changes are a deliberate, approved act — not a side effect.

---

## §8 — The media app: three stores, API-first, one Pages deploy, Basic Auth

Carried over from kol-r2b2's ARCHITECTURE §1–4 when the app moved in as `apps/media` (2026-10-05). Its full history is `media-history/`.

- **Media lives in object storage, never in a repo.** Three public stores that do not merge: R2 `kol-media` (tool media, `r2.kolkrabbi.io`), B2 `kolkrabbi` (the public site's media under `website/`, `b2.kolkrabbi.io`), B2 `kol-vault-media` (the Obsidian vault's attachments, `b2v.kolkrabbi.io`). Both B2 hostnames are served by one Worker, `apps/media/workers/cdn-proxy/`. The split is by purpose; the existence of the stores is closed.
- **API-first.** The surface is `/api/{upload,list,object,…}` (Pages Functions); the React app is one thin client. Other apps call the API, never embed the admin.
- **One deploy target.** UI and API ship together to the Cloudflare Pages project `kol-media-admin` by `pnpm media:deploy` — a local build pushed by wrangler, no git integration, no CI. The R2 binding and the secrets live on that project. **One hostname, `media.kolkrabbi.io`** (user ruling 2026-10-05): the app is the admin, writes are gated by the login, never by hostname. `admin.kolkrabbi.io` only redirects there until nothing names it, then it is detached.
- **Shared-secret HTTP Basic Auth** against `ADMIN_PASSWORD`; no accounts, no sessions. A second user is the trigger to revisit, not earlier.

**Consequence:** the app shares this repo's single copy of the design-system tier and bumps with it; everything else about it is unchanged by the move.

---

## §N — Non-goals (do not reopen without explicit ask)

- Adding TypeScript to the JS apps/packages (§1).
- A `tailwind.config` file or legacy Tailwind directives (§2).
- Hardcoded colors or deprecated tokens (§3).
- Defining Sanity schema outside `packages/content` (§5).
