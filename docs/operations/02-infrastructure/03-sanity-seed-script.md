---
File: 8.7.0
Title: Sanity Seed Script
Status: Active
Last-Updated: 2026-03-13
Category: Operations
tags: [operations, sanity, cms, scripting]
---

## Overview

A Node.js script that uploads project documents and assets to Sanity programmatically. Reads metadata from a `_project.md` frontmatter file and uploads thumbnail, hero, and gallery assets in one command.

**Script location:** `packages/content/scripts/seed.js`

---

## Usage

```bash
node packages/content/scripts/seed.js "<path-to-project-folder>"
```

The script reads the Sanity write token from the root `.env` file (`key:` line under `#Sanity Editor Token`). No env var needed.

### Example

```bash
node packages/content/scripts/seed.js \
  "/Users/biskup/Library/Mobile Documents/com~apple~CloudDocs/Workbox/kol-vault-mgmt/kol-vault-workbox/kol-cms/cms-type/collection/logo-folio-03-2025"
```

---

## Project Folder Structure

Each project folder must follow this layout:

```
project-name/
  _project.md        ← YAML frontmatter with all metadata
  thumbnail/
    01.png           ← script uses first file (alphabetically)
    02.png           ← alternatives, ignored by script
  hero/
    01.png           ← or .mov, .mp4, .webm
    01-light.png     ← light mode variant (future)
  gallery/
    01.png           ← all files uploaded, sorted by name
    02.png
    ...
  video/             ← for raw video assets (not yet scripted)
```

### Rules

- **`_project.md`** — required, must have YAML frontmatter
- **`thumbnail/`** — first file becomes the thumbnail
- **`hero/`** — first file becomes hero image or hero video (detected by extension)
- **`gallery/`** — all image/video files uploaded as `media[]` array items
- **`video/`** — storage only, not processed by script yet
- Supported extensions: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.mp4`, `.mov`, `.webm`

---

## `_project.md` Frontmatter

### Client project

```yaml
---
title: "Project Name"
type: client
slug: project-name
client: "Client Name"
year: 2024
description: Short one-line description.
about: Longer background context for the detail view.
tags:
  - Branding
  - Web Design
seo_title: "Project Name — Category | Kolkrabbi"
seo_description: Short SEO description.
---
```

### Tool project (with links)

```yaml
---
title: "Tool Name"
type: tool
slug: tool-name
year: 2026
description: Short description.
about: Longer description.
tags:
  - Interactive
  - Creative Coding
links:
  - label: Live
    url: "https://example.com"
  - label: Repo
    url: "https://github.com/user/repo"
  - label: Workshop
    url: "/workshop/apparat/tool-name"
seo_title: "Tool Name — Category | Kolkrabbi"
seo_description: SEO description.
---
```

### Collection project

```yaml
---
title: "Collection Name"
type: collection
slug: collection-name
year: 2024
description: Short description.
about: Longer description.
tags:
  - Logo Design
  - Brand Marks
seo_title: "Collection Name — Category | Kolkrabbi"
seo_description: SEO description.
---
```

---

## Asset Source

Project assets are stored in the iCloud vault:

```
/Users/biskup/Library/Mobile Documents/com~apple~CloudDocs/
  Workbox/kol-vault-mgmt/kol-vault-workbox/kol-cms/cms-type/
    client/
      _template/
      aftra/
      canalix/
      ...
    collection/
      _template/
      logo-folio-01-2023/
      ...
    tool/
      _template/
      radial/
    system/
      system-dummy/
```

Each type folder has a `_template/` with empty folder structure and a template `_project.md`.

---

## How It Works

1. Parses YAML frontmatter from `_project.md`
2. Uploads thumbnail (first file in `thumbnail/`) via `client.assets.upload('image')`
3. Uploads hero (first file in `hero/`) — auto-detects image vs video by extension
4. Uploads all gallery files (sorted) as `media[]` array — each item typed as `galleryImage` or `galleryVideo`
5. Builds the Sanity document with all fields and asset references
6. Calls `client.createOrReplace()` with deterministic ID `project-{slug}`

### Re-running

Safe to re-run — `createOrReplace` overwrites the existing document. Assets are re-uploaded (Sanity deduplicates by content hash).

---

## Sanity Schema Fields

The script maps frontmatter to these Sanity `project` document fields:

| Frontmatter | Sanity Field | Type |
|-------------|-------------|------|
| `title` | `title` | string |
| `slug` | `slug.current` | slug |
| `type` | `type` | string (client/collection/tool/system) |
| `client` | `client` | string (client type only) |
| `year` | `year` | string |
| `description` | `description` | text |
| `about` | `about` | text |
| `tags` | `tags` | string[] |
| `links` | `links` | {label, url}[] |
| `seo_title` | `seo.metaTitle` | string |
| `seo_description` | `seo.metaDescription` | text |
| thumbnail/01 | `thumbnail` | image |
| hero/01 | `heroImage` or `heroVideo` | image or file |
| gallery/* | `media[]` | galleryImage[] or galleryVideo[] |

---

## Notes

- `client` field is only visible in Sanity Studio when `type === 'client'`
- Document ordering in Sanity uses array position (drag-and-drop), not a numeric `order` field
- The `video/` folder in project directories is for raw video storage — the script doesn't process it yet
- Light mode hero variants (`01-light.*`) are not yet handled by the script
