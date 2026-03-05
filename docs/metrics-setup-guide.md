# Metrics Dashboard — Setup Guide

**Route:** `/metrics` (unlisted)
**Plan:** `docs/metrics-data-plan.md`
**Phase:** 2 of 3

---

## Deliverables

- [ ] Sign up for Neon (free Postgres DB for Umami)
- [ ] Fork and deploy Umami to Vercel
- [ ] Configure Umami: add website, create API token, copy tracking script
- [ ] Verify Backblaze B2 application key pair
- [ ] Hand off credentials — then code work can begin

---

## Step 1 — Neon Postgres Database

Umami needs a Postgres database. Neon's free tier is the best fit (0.5GB, no compute hour limits, first-class Prisma support).

**Signup:** https://neon.tech (GitHub login)

1. Create a new project (name it `umami` or similar)
2. Copy the **connection string** from the dashboard — looks like:
   ```
   postgresql://<user>:<pass>@<host>.neon.tech/<db>?sslmode=require
   ```

**You'll have:** a `DATABASE_URL` (Postgres connection string)

**Free tier limits:** 0.5GB storage, 190 compute hours/month (auto-suspend on idle)

---

## Step 2 — Deploy Umami to Vercel

Uses your existing Vercel account. No additional signup.

1. Fork `umami-software/umami` to your GitHub
2. Go to https://vercel.com/new and import the forked repo
3. Set these **environment variables** during setup:
   - `DATABASE_URL` — the Neon connection string from Step 1
   - `DATABASE_TYPE` — `postgresql`
4. Deploy

Umami will auto-run Prisma migrations on first deploy and create all tables.

**You'll have:** Umami running at `https://umami-<you>.vercel.app`

---

## Step 3 — Configure Umami

After deploy, visit your Umami instance:

1. Log in with default credentials: `admin` / `umami`
2. **Change the admin password immediately**
3. Go to Settings > Websites > **Add website**: enter `kolkrabbi.io`
4. Note the **Website ID** (UUID)
5. Copy the **tracking script** — looks like:
   ```html
   <script defer src="https://umami-<you>.vercel.app/script.js" data-website-id="<uuid>"></script>
   ```
6. Go to Settings > API > create an **API token** for server-to-server calls

**You'll have:** Website ID, API token, tracking script snippet

---

## Step 4 — Verify Backblaze B2 Keys

No signup needed — you already have a B2 bucket and application key.

Verify you have these two values accessible:
- `B2_APPLICATION_KEY_ID`
- `B2_APPLICATION_KEY`

If you need a new read-only scoped key: B2 dashboard > App Keys > Add New Application Key

---

## After Setup — Hand Off to Code

Once you have these credentials:

| Variable | Source | Needed for |
|----------|--------|------------|
| `DATABASE_URL` | Neon | Umami (already set in Vercel) |
| Umami instance URL | Vercel deploy | API calls from `/api/metrics` |
| Umami Website ID | Umami UI | Tracking script + API queries |
| Umami API token | Umami UI | Server-to-server auth |
| `B2_APPLICATION_KEY_ID` | Backblaze | B2 bucket metrics |
| `B2_APPLICATION_KEY` | Backblaze | B2 bucket metrics |

Store the Umami and B2 secrets as Vercel environment variables on the kolkrabbi.io project (or `.env.local` for dev). Then the code work begins:

1. Add tracking script to `<head>` in the app
2. Build `/api/metrics` aggregation endpoint
3. Wire `Metrics.jsx` to live data

---

## Total Signups: 1

Only Neon requires a new account (free, GitHub login). Everything else uses existing Vercel and Backblaze accounts.
