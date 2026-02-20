---
title: Media Indexing Automation
date: 2026-02-17
category: server
tags: [server, cdn, backblaze, automation, reference]
---

# Media Indexing Automation

This guide covers automated media indexing using the AWS SDK to list and catalog all files on the CDN.

## Overview

Instead of manually tracking uploaded media, automatically generate a `media-index.json` file that contains:
- All files on your CDN
- File metadata (size, last modified)
- Folder organization
- Auto-generated tags

This index can be used in your website's admin panel, gallery, or search functionality.

## Prerequisites

```bash
npm install @aws-sdk/client-s3
```

## Setup

### 1. Environment Variables

Ensure your `.env` file has the necessary credentials (see [backblaze-setup.md](backblaze-setup.md)):

```bash
B2_APPLICATION_KEY_ID=your_application_key_id
B2_APPLICATION_KEY=your_application_key
B2_BUCKET_NAME=kolkrabbi
B2_S3_ENDPOINT=https://s3.us-west-002.backblazeb2.com
B2_S3_REGION=us-west-002
```

### 2. Create Build Script

Create `scripts/buildMediaIndex.ts` (or `.js`) in your project:

```typescript
// scripts/buildMediaIndex.ts
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { writeFileSync } from "fs";

const s3 = new S3Client({
  region: process.env.B2_S3_REGION || "us-west-002",
  endpoint: process.env.B2_S3_ENDPOINT || "https://s3.us-west-002.backblazeb2.com",
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});

async function buildIndex() {
  const Bucket = process.env.B2_BUCKET_NAME || "kolkrabbi";
  let ContinuationToken: string | undefined = undefined;
  const items: any[] = [];

  console.log(`Building media index for bucket: ${Bucket}`);

  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket,
        Prefix: "website/", // Only index website content
        ContinuationToken,
      })
    );

    (res.Contents || []).forEach((obj) => {
      if (!obj.Key) return;

      items.push({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
        folder: obj.Key.split("/").slice(0, -1).join("/"),
        filename: obj.Key.split("/").pop(),
        type: getFileType(obj.Key),
        category: getCategory(obj.Key),
      });
    });

    ContinuationToken = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (ContinuationToken);

  writeFileSync("media-index.json", JSON.stringify(items, null, 2));
  console.log(`✅ Indexed ${items.length} items → media-index.json`);
}

function getFileType(key: string): string {
  const ext = key.split(".").pop()?.toLowerCase();
  const typeMap: Record<string, string> = {
    jpg: "image",
    jpeg: "image",
    png: "image",
    webp: "image",
    tif: "image",
    tiff: "image",
    m3u8: "video-playlist",
    ts: "video-segment",
    mp4: "video",
    mov: "video",
    webm: "video",
  };
  return typeMap[ext || ""] || "other";
}

function getCategory(key: string): string {
  if (key.includes("art-prints")) return "print";
  if (key.includes("hls-library")) return "hls-video";
  if (key.includes("homepage-hero")) return "homepage-video";
  return "other";
}

buildIndex().catch(console.error);
```

### 3. Add to package.json Scripts

```json
{
  "scripts": {
    "build:media-index": "node scripts/buildMediaIndex.js"
  }
}
```

## Usage

### Generate Index

```bash
# Load .env and run script
B2_APPLICATION_KEY_ID=xxx B2_APPLICATION_KEY=yyy npm run build:media-index
```

Or with a .env file:

```bash
# Install dotenv-cli if needed
npm install -g dotenv-cli

# Run with .env
dotenv npm run build:media-index
```

### Output Example

Generated `media-index.json`:

```json
[
  {
    "key": "website/art-prints/print-skovia/web/print-skovia-800.jpg",
    "size": 245678,
    "lastModified": "2025-12-20T15:30:00.000Z",
    "folder": "website/art-prints/print-skovia/web",
    "filename": "print-skovia-800.jpg",
    "type": "image",
    "category": "print"
  },
  {
    "key": "website/hls-library/video-home/hero-dark/hls/master.m3u8",
    "size": 456,
    "lastModified": "2025-12-20T16:45:00.000Z",
    "folder": "website/hls-library/video-home/hero-dark/hls",
    "filename": "master.m3u8",
    "type": "video-playlist",
    "category": "hls-video"
  }
]
```

## Using the Index in Your App

### Create Library Module

```typescript
// lib/mediaIndex.ts
import media from "../media-index.json";

export type MediaItem = {
  key: string;
  size: number;
  lastModified: string;
  folder: string;
  filename: string;
  type: string;
  category: string;
};

export const allMedia = media as MediaItem[];

export function searchMedia(query: string) {
  const q = query.toLowerCase();
  return allMedia.filter((item) =>
    item.filename.toLowerCase().includes(q) ||
    item.folder.toLowerCase().includes(q)
  );
}

export function getMediaByCategory(category: string) {
  return allMedia.filter((item) => item.category === category);
}

export function getMediaByType(type: string) {
  return allMedia.filter((item) => item.type === type);
}
```

### Use in Admin Panel

```typescript
// app/admin/media/page.tsx (Next.js example)
import { allMedia, getMediaByCategory } from "@/lib/mediaIndex";

export default function MediaPage() {
  const prints = getMediaByCategory("print");
  const videos = getMediaByCategory("hls-video");

  return (
    <div>
      <h1>Media Library</h1>

      <section>
        <h2>Prints ({prints.length})</h2>
        <div className="grid grid-cols-4 gap-4">
          {prints.map((item) => (
            <div key={item.key} className="border p-2">
              <div className="text-sm font-mono">{item.filename}</div>
              <div className="text-xs text-gray-500">{item.folder}</div>
              <div className="text-xs">{(item.size / 1024).toFixed(0)} KB</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Videos ({videos.length})</h2>
        <div className="grid grid-cols-4 gap-4">
          {videos.map((item) => (
            <div key={item.key} className="border p-2">
              <div className="text-sm font-mono">{item.filename}</div>
              <div className="text-xs text-gray-500">{item.folder}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

### Display Images with CDN URLs

```typescript
// lib/cdn.ts
const CDN_BASE = "https://f005.backblazeb2.com/file/kolkrabbi";

export function getCdnUrl(key: string): string {
  return `${CDN_BASE}/${key}`;
}
```

```tsx
// Component example
import { getCdnUrl } from "@/lib/cdn";
import { allMedia } from "@/lib/mediaIndex";

const prints = allMedia.filter(item =>
  item.category === "print" &&
  item.type === "image" &&
  item.filename.includes("800.jpg")
);

return (
  <div className="grid grid-cols-4 gap-4">
    {prints.map((item) => (
      <img
        key={item.key}
        src={getCdnUrl(item.key)}
        alt={item.filename}
      />
    ))}
  </div>
);
```

## Workflow

Your complete workflow becomes:

1. **Create/organize media locally**
   ```bash
   mkdir -p print-new/{master,print,web}
   # Add files...
   ```

2. **Upload to Backblaze**
   ```bash
   rclone copy print-new/ kolkrabbi:kolkrabbi/website/art-prints/print-new/
   ```

3. **Rebuild media index**
   ```bash
   npm run build:media-index
   ```

4. **Commit index to git** (it's just JSON)
   ```bash
   git add media-index.json
   git commit -m "Update media index"
   git push
   ```

5. **Deploy** - Your app now has updated media catalog

## Advanced Features

### Filter by Date

```typescript
export function getRecentMedia(days: number = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return allMedia.filter((item) =>
    new Date(item.lastModified) > cutoff
  );
}
```

### Get Total Storage

```typescript
export function getTotalSize() {
  return allMedia.reduce((sum, item) => sum + item.size, 0);
}

export function getSizeByCategory() {
  return allMedia.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.size;
    return acc;
  }, {} as Record<string, number>);
}
```

### Group by Folder

```typescript
export function groupByFolder() {
  return allMedia.reduce((acc, item) => {
    if (!acc[item.folder]) acc[item.folder] = [];
    acc[item.folder].push(item);
    return acc;
  }, {} as Record<string, MediaItem[]>);
}
```

## Automating with CI/CD

Add to your GitHub Actions or CI/CD pipeline:

```yaml
# .github/workflows/update-media-index.yml
name: Update Media Index

on:
  workflow_dispatch: # Manual trigger
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM

jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build media index
        env:
          B2_APPLICATION_KEY_ID: ${{ secrets.B2_APPLICATION_KEY_ID }}
          B2_APPLICATION_KEY: ${{ secrets.B2_APPLICATION_KEY }}
        run: npm run build:media-index

      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add media-index.json
          git commit -m "Update media index [automated]" || exit 0
          git push
```

## Troubleshooting

### Permission Errors

Ensure your B2 application key has read permissions:
- Backblaze Console → App Keys → Check permissions

### Large Buckets

For buckets with 10,000+ files, add pagination handling:

```typescript
// Already handled in the script with ContinuationToken loop
```

### Rate Limiting

If you hit rate limits, add delays:

```typescript
await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
```

## Next Steps

- **[backblaze-setup.md](backblaze-setup.md)** - Set up credentials and rclone
- **[cdn-structure.md](cdn-structure.md)** - Understand CDN organization
- **[README.md](kol-project/kol-website/documentation/09-cdn/cdn-backblaze/README.md)** - Main documentation hub
