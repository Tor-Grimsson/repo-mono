#!/usr/bin/env python3
"""
Phase 2 — Transcode Work-page videos → MP4 → upload to B2.

One-time migration (see docs/plans/work-video-b2-migration-plan.md). For each video
asset referenced by a project (heroVideo / gallery — light-mode video was dropped), this:
  1. downloads the original from Sanity,
  2. transcodes to a single progressive MP4 (H.264, faststart, muted) + poster via ffmpeg,
  3. uploads video.mp4 + poster.jpg to B2 under hls-library/video-library/work/<slug>/<name>/,
  4. records assetId -> { video, poster, width, height } in the output map
     that Phase 3 (migrate-work-videos-patch-sanity.mjs) uses to patch the CMS.

Requires: ffmpeg, ffprobe, curl, and the `bucket` CLI (kol-bucket-b2 skill).
Read-only Sanity access is enough (public published dataset).

Usage:
  python3 scripts/migrate-work-videos-to-b2.py               # all assets
  python3 scripts/migrate-work-videos-to-b2.py --only tg-malromur   # one project (test first!)
  python3 scripts/migrate-work-videos-to-b2.py --limit 1     # cheapest single asset
  python3 scripts/migrate-work-videos-to-b2.py --dry-run     # transcode locally, skip upload
  python3 scripts/migrate-work-videos-to-b2.py --force       # re-do assets already in the map

Idempotent: assets already present in the output map are skipped unless --force.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.parse
import urllib.request

# --- Config ------------------------------------------------------------------
PROJECT_ID = "to8h15ed"
DATASET = "projects"
API_VERSION = "2024-01-01"

WORKDIR = os.environ.get("WORKDIR", "_tmp/work-video-migration")
OUTMAP = os.path.join(WORKDIR, "asset-b2-map.json")

B2_LANE_PATH = "hls-library/video-library/work"  # relative to bucket `website/` lane
CDN_BASE = "https://b2.kolkrabbi.io/website"

TARGET_HEIGHT = 1080          # cap the long edge at 1080p, never upscale
VIDEO_BITRATE_CEILING = 4_000_000  # 4 Mbps ceiling; fat sources shrink to this, small stay small
POSTER_AT_SECONDS = 1         # frame extracted for the poster still


def run(cmd, **kw):
    """Run a command, streaming output; raise on failure."""
    print(f"  $ {' '.join(cmd)}")
    subprocess.run(cmd, check=True, **kw)


def sanity_fetch(groq):
    url = (
        f"https://{PROJECT_ID}.apicdn.sanity.io/v{API_VERSION}/data/query/{DATASET}"
        f"?query={urllib.parse.quote(groq)}"
    )
    with urllib.request.urlopen(url) as r:
        payload = json.load(r)
    if "result" not in payload:
        sys.exit(f"Sanity query failed: {payload}")
    return payload["result"]


def clean_name(filename):
    stem = re.sub(r"\.[^.]+$", "", filename or "video")
    stem = stem.lower().strip()
    stem = re.sub(r"[^a-z0-9]+", "-", stem).strip("-")
    return stem or "video"


def probe_video(path):
    """Return (width, height, source_bitrate_bps)."""
    j = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height,bit_rate:format=bit_rate,duration",
        "-of", "json", path,
    ]).decode())
    st = j["streams"][0]
    w, h = int(st["width"]), int(st["height"])
    br = st.get("bit_rate") or j.get("format", {}).get("bit_rate")
    if br and br != "N/A":
        bitrate = int(br)
    else:  # some containers omit bit_rate — derive from size/duration
        dur = float(j.get("format", {}).get("duration") or 0) or 1
        bitrate = int(os.path.getsize(path) * 8 / dur)
    return w, h, bitrate


def scaled_dims(iw, ih, target_h):
    """Fit within (16:9 box at target_h) without upscaling; even dims."""
    box_w, box_h = target_h * 16 // 9, target_h
    scale = min(box_w / iw, box_h / ih, 1.0)
    w = int(iw * scale) // 2 * 2
    h = int(ih * scale) // 2 * 2
    return max(w, 2), max(h, 2)


def build_manifest():
    """Return deduped list of {asset_id, url, filename, slug} across all projects."""
    # Light-mode hero video was dropped by design — only dark hero + gallery migrate.
    groq = (
        '*[_type=="project"]{'
        '"slug":slug.current,'
        '"hero":heroVideo.asset->{"id":_id,"url":url,"file":originalFilename},'
        '"gallery":media[asset->mimeType match "video*"].asset->'
        '{"id":_id,"url":url,"file":originalFilename}'
        '}[defined(hero) || count(gallery) > 0]'
    )
    projects = sanity_fetch(groq)
    seen, manifest = {}, []
    for p in projects:
        slug = p["slug"]
        refs = [p.get("hero"), *(p.get("gallery") or [])]
        for ref in refs:
            if not ref or not ref.get("id"):
                continue
            aid = ref["id"]
            if aid in seen:
                continue
            seen[aid] = True
            manifest.append({
                "asset_id": aid,
                "url": ref["url"],
                "filename": ref.get("file") or f"{aid}.mp4",
                "slug": slug,
            })
    return manifest


def transcode(src, out_dir, name):
    """Produce out_dir/video.mp4 (H.264, faststart, muted) and out_dir/poster.jpg.

    Single progressive MP4 — these are muted autoplay loops, not long-form content that
    needs adaptive/segmented streaming. One file, native <video> playback, no hls.js.
    """
    iw, ih, src_bps = probe_video(src)
    w, h = scaled_dims(iw, ih, TARGET_HEIGHT)
    # Never inflate: cap the target at the source's own bitrate. Fat originals hit the
    # ceiling (391 MB -> 4M); already-web-sized files keep their smaller bitrate.
    target = min(VIDEO_BITRATE_CEILING, src_bps)
    run([
        "ffmpeg", "-y", "-i", src,
        "-vf", f"scale={w}:{h}",
        "-c:v", "h264_videotoolbox", "-b:v", str(target),
        "-pix_fmt", "yuv420p", "-an",
        "-movflags", "+faststart",  # moov atom up front -> plays before full download
        os.path.join(out_dir, "video.mp4"),
    ])
    run([
        "ffmpeg", "-y", "-ss", str(POSTER_AT_SECONDS), "-i", src,
        "-frames:v", "1", "-update", "1", "-vf", f"scale={w}:{h}", "-q:v", "3",
        os.path.join(out_dir, "poster.jpg"),
    ])
    return w, h


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="process only this project slug")
    ap.add_argument("--limit", type=int, help="process at most N assets")
    ap.add_argument("--dry-run", action="store_true", help="transcode locally, skip B2 upload")
    ap.add_argument("--force", action="store_true", help="re-process assets already in the map")
    args = ap.parse_args()

    os.makedirs(WORKDIR, exist_ok=True)
    result_map = {}
    if os.path.exists(OUTMAP):
        result_map = json.load(open(OUTMAP))

    manifest = build_manifest()
    if args.only:
        manifest = [m for m in manifest if m["slug"] == args.only]
    todo = [m for m in manifest if args.force or m["asset_id"] not in result_map]
    if args.limit:
        todo = todo[: args.limit]

    print(f"{len(manifest)} unique video assets; {len(todo)} to process "
          f"({len(result_map)} already done)\n")

    for i, m in enumerate(todo, 1):
        slug, name = m["slug"], clean_name(m["filename"])
        print(f"[{i}/{len(todo)}] {slug}/{name}  ({m['filename']})")
        asset_dir = os.path.join(WORKDIR, slug, name)
        os.makedirs(asset_dir, exist_ok=True)

        ext = os.path.splitext(m["filename"])[1] or ".mp4"
        src = os.path.join(asset_dir, f"source{ext}")
        if not os.path.exists(src):
            run(["curl", "-sL", "-o", src, m["url"]])

        w, h = transcode(src, asset_dir, name)

        remote = f"{B2_LANE_PATH}/{slug}/{name}"
        if args.dry_run:
            print(f"  [dry-run] would upload {asset_dir}/{{video.mp4,poster.jpg}} -> {remote}\n")
            continue
        # Upload only what's served — never the raw source (kept locally for re-runs).
        run(["bucket", "up", os.path.join(asset_dir, "video.mp4"), remote])
        run(["bucket", "up", os.path.join(asset_dir, "poster.jpg"), remote])

        base = f"{CDN_BASE}/{remote}"
        result_map[m["asset_id"]] = {
            "video": f"{base}/video.mp4",
            "poster": f"{base}/poster.jpg",
            "width": w, "height": h,
            "slug": slug, "name": name,
        }
        json.dump(result_map, open(OUTMAP, "w"), indent=2)
        print(f"  ✓ {result_map[m['asset_id']]['video']}\n")

    print(f"Done. Map: {OUTMAP} ({len(result_map)} assets)")


if __name__ == "__main__":
    main()
