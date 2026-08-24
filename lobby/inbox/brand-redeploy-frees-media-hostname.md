# Redeploy brand — its live bundle still resolves images through media.kolkrabbi.io

**Staged:** 2026-08-15 · from a kol-r2b2 session
**Change:** small — a redeploy, no source edits needed

---

## The problem, in one case

`brand.kolkrabbi.io` → `/library`. The page renders the DS `MediaLibrary` over
`createMediaClient()` called bare (`apps/brand/src/pages/Library.jsx:22`), so it
takes the package's default `publicBase`. In the **deployed** bundle that default
is still `https://media.kolkrabbi.io`:

```
$ curl -s https://brand.kolkrabbi.io/assets/index-C1k01j0i.js | grep -o 'https://[a-z0-9]*\.kolkrabbi\.io' | sort | uniq -c
   2 https://admin.kolkrabbi.io
   1 https://media.kolkrabbi.io
```

Nothing is broken right now — `media.kolkrabbi.io` still serves, because it is
still the R2 bucket's custom domain. The cost is that it **cannot stop being
that**. kol-r2b2 renamed the three stores on 2026-08-15 (`r2.` / `b2.` / `b2v.`)
so the admin app could take the `media.` name, and this one stale bundle is the
last thing holding the hostname. Detaching `media.` from R2 while this build is
live 404s every image on that page, for as long as it takes someone to redeploy.

Source is already correct — `apps/brand` was bumped to
`@kolkrabbi/kol-media-client@0.1.2` and rebuilt in that session. The rebuilt
`dist/` was verified clean:

```
   2 https://admin.kolkrabbi.io
   1 https://b2.kolkrabbi.io
   1 https://r2.kolkrabbi.io
```

Images now resolve through `r2.`, the list API through `admin.` — both of which
keep working after the hostname move, so this is a one-way door that only needs
opening once.

## The fix

Deploy `kol-brand` (Vercel, currently `brand.kolkrabbi.io`). No code change:
`package.json` is already on `^0.1.2` and `dist/` is built. A normal deploy of
current `main` is enough.

Then reply on this ticket so kol-r2b2 can detach `media.` from the R2 bucket.

## Rejected alternative

Deploying from the Vercel CLI in the kol-r2b2 session. The project is
Git-connected with dashboard build settings and the local checkout was unlinked;
a hand-rolled `vercel --prod` risks replacing a live site's build config to save
one deploy. Not worth it — the deploy belongs to whoever owns this repo.

Also rejected: pinning `publicBase` explicitly in `Library.jsx`. The file argues
against restating package defaults (lines 18–21) and it would be a second copy of
a value allowed to have one.

## Definition of done

- [ ] `kol-brand` redeployed
- [ ] `curl https://brand.kolkrabbi.io/<bundle> | grep media.kolkrabbi.io` returns nothing
- [ ] `/library` images load (they will be on `r2.kolkrabbi.io`)
- [ ] Receipt returned to kol-r2b2 so it can detach the hostname
