---
title: HLS Video Conversion Guide
date: 2026-02-17
category: server
tags: [server, cdn, hls, ffmpeg, video, guide]
---

# HLS Video Conversion Guide

This guide covers converting master videos to HLS (HTTP Live Streaming) format for adaptive bitrate streaming on the web.

## What is HLS?

**HLS (HTTP Live Streaming)** is Apple's video streaming protocol that:
- Breaks video into small segments (~4 seconds each)
- Creates multiple quality versions (360p, 480p, 720p, 1080p)
- Allows players to switch quality based on bandwidth
- Works natively in Safari and via hls.js in other browsers

## HLS File Structure

```
video-folder/
├── master.m3u8          # Master playlist (lists all qualities)
├── 360p/
│   ├── index.m3u8       # 360p playlist
│   ├── segment_000.ts   # Video segments
│   ├── segment_001.ts
│   └── ...
├── 480p/
│   ├── index.m3u8
│   └── segments...
├── 720p/
│   ├── index.m3u8
│   └── segments...
└── 1080p/
    ├── index.m3u8
    └── segments...
```

## M3U8 File Format

An **M3U8 file** is a text playlist that tells the video player where segments are and how to switch qualities.

### Master Playlist Example

```m3u8
#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=854x480
480p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=3000000,RESOLUTION=1280x720
720p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
1080p/index.m3u8
```

### Media Playlist Example (One Quality)

```m3u8
#EXTM3U
#EXT-X-TARGETDURATION:4
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0

#EXTINF:4.000,
segment_000.ts
#EXTINF:4.000,
segment_001.ts
#EXTINF:4.000,
segment_002.ts
#EXT-X-ENDLIST
```

## Recommended Quality Tiers

For 1080p source material, create these renditions:

| Quality | Resolution | Bitrate | Use Case |
|---------|-----------|---------|----------|
| 360p | 640x360 | 800 kbps | Mobile, slow connections |
| 480p | 854x480 | 1.5 Mbps | Standard definition |
| 720p | 1280x720 | 2.5 Mbps | HD, most desktop users |
| 1080p | 1920x1080 | 4.5 Mbps | Full HD, fast connections |
| 1080p Max | 1920x1080 | 8 Mbps | High quality graphics |

## Workflow Overview

### A. Export Master from DaVinci Resolve

1. **Format:** ProRes 422 / DNxHR / or H.264 high bitrate
2. **Resolution:** Full resolution (1080p or 4K)
3. **Frame rate:** Same as timeline
4. **Filename:** `{project}_master.mov` or `{project}_master-4k.mov`
5. **No compression** - Keep it clean for downstream encoding

### B. Install FFmpeg

```bash
brew install ffmpeg
```

Or if you don't have Homebrew:
```bash
# Install Homebrew first
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install FFmpeg
brew install ffmpeg
```

### C. Run Conversion Script

Use the provided script to generate all HLS versions.

### D. Upload to CDN

Upload the generated `hls_output/` folder to Backblaze.

## FFmpeg Scripts

### Single Quality HLS (Basic)

Simple conversion to HLS with one quality:

```bash
ffmpeg -i input.mp4 \
  -codec:video libx264 -codec:audio aac \
  -start_number 0 \
  -hls_time 4 \
  -hls_playlist_type vod \
  -f hls \
  output.m3u8
```

This creates:
- `output.m3u8` (playlist)
- `output0.ts`, `output1.ts`, ... (segments)

### Multi-Quality ABR (Advanced)

Create multiple resolutions with adaptive bitrate:

```bash
ffmpeg -i input.mp4 \
  -filter:v:0 scale=w=640:h=360  -c:v:0 libx264 -b:v:0 800k \
  -filter:v:1 scale=w=854:h=480  -c:v:1 libx264 -b:v:1 1500k \
  -filter:v:2 scale=w=1280:h=720 -c:v:2 libx264 -b:v:2 3000k \
  -filter:v:3 scale=w=1920:h=1080 -c:v:3 libx264 -b:v:3 5000k \
  -map 0:v -map 0:v -map 0:v -map 0:v \
  -map 0:a? \
  -f hls \
  -var_stream_map "v:0,name:360p v:1,name:480p v:2,name:720p v:3,name:1080p a:0" \
  -master_pl_name master.m3u8 \
  -hls_time 4 \
  -hls_playlist_type vod \
  ./hls_output/
```

## Complete make_hls.sh Script

Save this as `make_hls.sh` in your working directory:

```bash
#!/bin/bash

INPUT=$1
OUTPUT=hls_output

# Check if input file is provided
if [ -z "$INPUT" ]; then
    echo "Usage: ./make_hls.sh <input-video-file>"
    exit 1
fi

# Check if input file exists
if [ ! -f "$INPUT" ]; then
    echo "Error: Input file '$INPUT' not found"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT"

echo "Converting $INPUT to HLS format..."
echo "Output directory: $OUTPUT"

ffmpeg -y -i "$INPUT" \
  -filter:v:0 "scale=640:-1"   -c:v:0 libx264 -b:v:0 800k  -preset slow -profile:v:0 high \
  -filter:v:1 "scale=854:-1"   -c:v:1 libx264 -b:v:1 1500k -preset slow -profile:v:1 high \
  -filter:v:2 "scale=1280:-1"  -c:v:2 libx264 -b:v:2 2500k -preset slow -profile:v:2 high \
  -filter:v:3 "scale=1920:-1"  -c:v:3 libx264 -b:v:3 4500k -preset slow -profile:v:3 high \
  -map 0:v -map 0:v -map 0:v -map 0:v \
  -an \
  -pix_fmt yuv420p \
  -f hls \
  -hls_time 4 \
  -hls_playlist_type vod \
  -hls_segment_filename "$OUTPUT/%v/segment_%03d.ts" \
  -master_pl_name master.m3u8 \
  -var_stream_map "v:0,name:360p v:1,name:480p v:2,name:720p v:3,name:1080p" \
  "$OUTPUT/%v/index.m3u8"

echo "Conversion complete!"
echo "Output structure:"
tree "$OUTPUT" -I "segment_*.ts"
```

### Make the Script Executable

```bash
chmod +x make_hls.sh
```

## Usage Examples

### Convert Single Video

```bash
./make_hls.sh hero_master.mov
```

### Convert Multiple Videos

```bash
./make_hls.sh hero-dark__4k-master.mov
./make_hls.sh hero-light__4k-master.mov
./make_hls.sh hero__master.mov
```

### Batch Convert

```bash
for file in *_master.mov; do
    ./make_hls.sh "$file"
done
```

## Output Structure

After running the script, you'll have:

```
hls_output/
├── master.m3u8
├── 360p/
│   ├── index.m3u8
│   ├── segment_000.ts
│   ├── segment_001.ts
│   └── ...
├── 480p/
│   └── ...
├── 720p/
│   └── ...
└── 1080p/
    └── ...
```

## Uploading to CDN

After conversion, upload to Backblaze:

```bash
# Upload HLS output
rclone copy hls_output/ kolkrabbi:kolkrabbi/website/hls-library/video-{name}/hls/ --create-empty-src-dirs

# Verify upload
rclone lsf kolkrabbi:kolkrabbi/website/hls-library/video-{name}/hls/ -R
```

## Using HLS in Your Website

Your video player should point to the master playlist:

```javascript
// Using hls.js
const video = document.getElementById('video');
const hls = new Hls();

hls.loadSource('https://f005.backblazeb2.com/file/kolkrabbi/website/hls-library/my-video/hls/master.m3u8');
hls.attachMedia(video);
```

```html
<!-- Native HLS (Safari) -->
<video controls>
  <source src="https://f005.backblazeb2.com/file/kolkrabbi/website/hls-library/my-video/hls/master.m3u8" type="application/x-mpegURL">
</video>
```

## FFmpeg Options Explained

| Option | Purpose |
|--------|---------|
| `-filter:v:0 "scale=640:-1"` | Resize to 640px width, auto height |
| `-c:v:0 libx264` | Use H.264 codec for video stream 0 |
| `-b:v:0 800k` | Set bitrate to 800 kbps |
| `-preset slow` | Slower encoding, better compression |
| `-profile:v:0 high` | H.264 high profile |
| `-pix_fmt yuv420p` | Pixel format (compatible with all players) |
| `-hls_time 4` | 4-second segments |
| `-hls_playlist_type vod` | Video on demand (vs. live stream) |
| `-an` | No audio (remove if you want audio) |
| `-master_pl_name master.m3u8` | Name of master playlist |

## Troubleshooting

### Video is Too Large

Reduce bitrates:
```bash
-b:v:0 600k   # 360p
-b:v:1 1000k  # 480p
-b:v:2 2000k  # 720p
-b:v:3 3500k  # 1080p
```

### Encoding is Too Slow

Use faster preset:
```bash
-preset medium  # or 'fast'
```

### Need Audio

Remove `-an` flag and add audio codec:
```bash
-c:a aac -b:a 128k
```

## Next Steps

- **[backblaze-setup.md](backblaze-setup.md)** - Upload HLS output to CDN
- **[cdn-structure.md](cdn-structure.md)** - See where to organize videos
- **[README.md](kol-project/kol-website/documentation/09-cdn/cdn-backblaze/README.md)** - Main documentation hub
