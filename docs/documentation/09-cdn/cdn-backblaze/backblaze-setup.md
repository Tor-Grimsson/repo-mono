---
title: Backblaze B2 Setup & rclone
date: 2026-02-17
category: server
tags:
  - server
  - cdn
  - backblaze
  - rclone
  - setup-guide
modified: 2026-02-18T07:11:04+00:00
---

# Backblaze B2 Setup & rclone Commands

This guide covers setting up rclone with Backblaze B2 and common operations.

## Prerequisites

Install rclone:
```bash
brew install rclone
```

## Credentials Setup

⚠️ **SECURITY NOTICE:** Never hardcode credentials in scripts or commit them to git.

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your actual Backblaze credentials:
   ```bash
   B2_MASTER_KEY_ID=your_actual_master_key_id
   B2_APPLICATION_KEY_ID=your_actual_application_key_id
   B2_APPLICATION_KEY=your_actual_application_key
   B2_BUCKET_NAME=kolkrabbi
   ```

3. Verify `.env` is in `.gitignore`:
   ```bash
   echo ".env" >> .gitignore  # if not already there
   ```

## rclone Configuration

Configure rclone for Backblaze B2:

```bash
rclone config
```

Follow these steps:
1. Choose `n` for new remote
2. Name: `kolkrabbi`
3. Storage type: `b2` (Backblaze B2)
4. Account ID: `<your B2_APPLICATION_KEY_ID>`
5. Application Key: `<your B2_APPLICATION_KEY>`
6. Endpoint: leave blank (auto-detect)
7. Accept defaults for remaining options

Test the connection:
```bash
rclone lsd kolkrabbi:
```

Expected output:
```
      -1 2000-01-01 00:00:00        -1 kolkrabbi
```

## Common Operations

### Mounting the Bucket

Mount the bucket as a local folder:

```bash
mkdir -p ~/KolkrabbiMount
rclone mount kolkrabbi:kolkrabbi ~/KolkrabbiMount
```

Now you can access CDN files at `~/KolkrabbiMount/`.

To unmount:
```bash
umount ~/KolkrabbiMount
# or on macOS:
diskutil unmount ~/KolkrabbiMount
```

### Listing Files

**List buckets:**
```bash
rclone lsd kolkrabbi:
```

**List all files in bucket:**
```bash
rclone ls kolkrabbi:kolkrabbi
```

**List directories only:**
```bash
rclone lsf kolkrabbi:kolkrabbi -R --dirs-only
```

**List files with paths:**
```bash
rclone lsf kolkrabbi:kolkrabbi -R --format=p
```

### Uploading Files

**Copy a file:**
```bash
rclone copy ./local-file.jpg kolkrabbi:kolkrabbi/website/folder/
```

**Copy a folder:**
```bash
rclone copy ./local-folder kolkrabbi:kolkrabbi/website/path/
```

**Copy with progress:**
```bash
rclone copy ./local-folder kolkrabbi:kolkrabbi/website/path/ -P
```

**Dry run (test without uploading):**
```bash
rclone copy ./local-folder kolkrabbi:kolkrabbi/website/path/ -P --dry-run
```

**Sync (make destination match source exactly):**
```bash
rclone sync ./local-folder kolkrabbi:kolkrabbi/website/path/
```

⚠️ **Warning:** `sync` will delete files on destination that don't exist in source!

### Downloading Files

**Download a file:**
```bash
rclone copy kolkrabbi:kolkrabbi/website/file.jpg ./local-folder/
```

**Download entire folder:**
```bash
rclone copy kolkrabbi:kolkrabbi/website/folder/ ./local-folder/
```

### Viewing Structure

**ASCII tree view (formatted):**
```bash
rclone lsf kolkrabbi:kolkrabbi -R --format=p --separator="/" | awk -F'/' '{for(i=1;i<NF;i++) printf "|   "; print "|-- "$NF}'
```

**Simple tree view:**
```bash
# First mount the bucket
mkdir -p ~/KolkrabbiMount
rclone mount kolkrabbi:kolkrabbi ~/KolkrabbiMount &

# Then use tree command
brew install tree
tree ~/KolkrabbiMount
```

## Example: Upload HLS Video

Complete workflow for uploading HLS video output:

```bash
# 1. Generate HLS from master video (see hls-conversion.md)
./make_hls.sh hero_master.mov

# 2. Review the output
tree hls_output/

# 3. Upload to CDN
rclone copy hls_output/ kolkrabbi:kolkrabbi/website/homepage-hero/hls/ --create-empty-src-dirs

# 4. Verify upload
rclone lsf kolkrabbi:kolkrabbi/website/homepage-hero/hls/ -R
```

## CDN URL Structure

After uploading, files are accessible via:
```
https://f005.backblazeb2.com/file/kolkrabbi/website/{path}
```

Example:
```
Local:  hls_output/master.m3u8
Upload: kolkrabbi:kolkrabbi/website/homepage-hero/hls/master.m3u8
CDN:    https://f005.backblazeb2.com/file/kolkrabbi/website/homepage-hero/hls/master.m3u8
```

## Using Backblaze B2 CLI (Alternative)

Alternatively, use the native B2 CLI:

```bash
# Install
brew install b2-tools

# Authorize (uses environment variables)
b2 authorize-account $B2_APPLICATION_KEY_ID $B2_APPLICATION_KEY

# Create bucket
b2 create-bucket my-media-archive allPrivate

# Sync folder
b2 sync /path/to/local/media b2://my-media-archive/originals
```

## Troubleshooting

**Mount fails:**
```bash
# Kill existing mount processes
killall rclone
# Try again
rclone mount kolkrabbi:kolkrabbi ~/KolkrabbiMount
```

**Permission denied:**
- Check credentials in `.env`
- Verify rclone config: `rclone config show`
- Test connection: `rclone lsd kolkrabbi:`

**Slow uploads:**
- Use `--transfers` flag: `rclone copy ... --transfers=4`
- Check network: `rclone copy ... -P -vv`

## Advanced: Using Environment Variables in Scripts

Load environment variables in bash scripts:

```bash
#!/bin/bash

# Load .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Use variables
rclone copy ./folder kolkrabbi:$B2_BUCKET_NAME/website/
```

## Next Steps

- **[cdn-structure.md](cdn-structure.md)** - See current CDN structure
- **[hls-conversion.md](hls-conversion.md)** - Convert videos to HLS
- **[media-indexing.md](media-indexing.md)** - Automate media indexing
