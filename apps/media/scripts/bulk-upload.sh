#!/usr/bin/env bash
# Bulk-upload a local folder into the kol-media R2 bucket via wrangler, preserving
# relative paths as keys under a prefix. Mirrors functions/api/upload.js key rules
# (no leading slash). Parallelized with xargs -P; content-type derived per file.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_DIR="${1:?usage: bulk-upload.sh <local-dir> <remote-prefix> [concurrency]}"
PREFIX="${2:?usage: bulk-upload.sh <local-dir> <remote-prefix> [concurrency]}"
CONCURRENCY="${3:-6}"

LOCAL_DIR="$(cd "$LOCAL_DIR" && pwd)"
PREFIX="${PREFIX#/}"
PREFIX="${PREFIX%/}"

find "$LOCAL_DIR" -type f ! -name '.*' -print0 |
  xargs -0 -P "$CONCURRENCY" -I{} bash -c '
    set -e
    f="$1"; local_dir="$2"; prefix="$3"; repo_root="$4"
    rel="${f#"$local_dir"/}"
    key="${prefix:+$prefix/}$rel"
    ct=$(file --mime-type -b "$f")
    echo "-> $key"
    (cd "$repo_root" && pnpm exec wrangler r2 object put "kol-media/$key" --file="$f" --content-type="$ct" --remote --force >/dev/null)
  ' _ {} "$LOCAL_DIR" "$PREFIX" "$REPO_ROOT"

echo "Done: $LOCAL_DIR -> kol-media/${PREFIX:-<root>}/"
