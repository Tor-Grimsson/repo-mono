#!/usr/bin/env python3
"""Scrape Another Creation collection pages — downloads every Squarespace
CDN image into public/brand/images/collections/<dst_slug>/.

Usage: python3 scripts/scrape-ac-collections.py
"""

import os, re, urllib.request

BASE = "https://www.another-creation.com"
COL_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public", "brand", "images", "collections",
)

# (live-url-slug, our-folder-slug). The user has confirmed the live URL → number mapping.
PAIRS = [
    ("creation-iiii", "creation-4"),
    ("creation-x",    "creation-5"),
    ("creation-xi",   "creation-6"),
    ("cycle-7",       "creation-7"),
]

URL_PATTERN = re.compile(
    r'https://images\.squarespace-cdn\.com/content/v1/[^"\'\s\\]+?\.(?:jpg|jpeg|png)',
    re.IGNORECASE,
)

def fetch_html(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="replace")

def download(url, path, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r, open(path, "wb") as f:
        f.write(r.read())

for src, dst in PAIRS:
    dst_dir = os.path.join(COL_DIR, dst)
    os.makedirs(dst_dir, exist_ok=True)
    url = f"{BASE}/{src}"
    print(f"=== {src} → {dst}", flush=True)
    try:
        html = fetch_html(url)
    except Exception as e:
        print(f"  ERR fetch: {e}", flush=True)
        continue
    urls = list(dict.fromkeys(URL_PATTERN.findall(html)))
    # Filter out shared site assets (logos / favicons baked into every page).
    urls = [
        u for u in urls
        if "trans-light-acyr" not in u
        and "/dbd3e9fd" not in u
        and "/f2a985c7" not in u
    ]
    print(f"  found {len(urls)} images", flush=True)
    for i, u in enumerate(urls, 1):
        if u.lower().endswith(".png"):
            ext = ".png"
        elif u.lower().endswith(".jpg"):
            ext = ".jpg"
        else:
            ext = ".jpeg"
        fname = f"{i:02d}{ext}"
        try:
            download(u, os.path.join(dst_dir, fname))
        except Exception as e:
            print(f"  fail {u}: {e}", flush=True)
    saved = len([f for f in os.listdir(dst_dir) if not f.startswith(".")])
    print(f"  saved {saved} files in {dst_dir}", flush=True)

print("DONE", flush=True)
