#!/usr/bin/env bash
# cdn-cutover.sh — swap raw Backblaze hostnames for the Kolkrabbi ones across
# the ecosystem. Dry-run by default; --apply writes.
#
#   scripts/cdn-cutover.sh                  show what would change, everywhere
#   scripts/cdn-cutover.sh kol-website      one repo
#   scripts/cdn-cutover.sh --apply          write it
#   scripts/cdn-cutover.sh kol-vault --apply
#
# Safe to run before the Worker is deployed ONLY in dry-run — applying early
# points live pages at a hostname that doesn't resolve yet.
#
# Skips: node_modules, dist, .git, _tmp (retired), lobby-history + session-log
# (point-in-time records that must keep saying what they said).
set -euo pipefail

PROJECTS="${PROJECTS_DIR:-$HOME/dev/projects}"
# kol-apps is mostly outdated folders — kept in the sweep so stale copies don't
# resurface a raw hostname, not because it's a live consumer.
# kol-chess is the chess-data home but reads chess.com directly, not the CDN.
REPOS=(kol-website kol-ds-ui kol-chess kol-apps kol-vault)

# Scheme-LESS patterns. Docs write the host bare inside backticks
# (`f005.backblazeb2.com/file/kolkrabbi/website`) while code always writes the
# full URL — matching without the scheme covers both, and the https:// in front
# of a code occurrence is left untouched because it isn't part of the match.
#
# from|to, applied in order. Two generations at once: the raw B2 hosts land
# straight on the current names so a stale copy never makes two hops, and the
# first-generation cdn./vault./media. names move in the same pass. Every old
# name stays attached upstream, so a file this sweep misses keeps working —
# that is what makes this safe to run without a flag day.
#
# Vault before site: `kol-vault-media` and `kolkrabbi` are distinct, so order
# is not load-bearing, but stating it documents the intent.
# `admin.kolkrabbi.io` is deliberately absent — it is not part of this rename.
MAPPINGS=(
  'f005\.backblazeb2\.com/file/kol-vault-media|b2v.kolkrabbi.io'
  'f005\.backblazeb2\.com/file/kolkrabbi|b2.kolkrabbi.io'
  'vault\.kolkrabbi\.io|b2v.kolkrabbi.io'
  'cdn\.kolkrabbi\.io|b2.kolkrabbi.io'
  'media\.kolkrabbi\.io|r2.kolkrabbi.io'
)

# Built from MAPPINGS so the search pattern and the rewrite can never drift.
sed_args=()
find_pat=''
for m in "${MAPPINGS[@]}"; do
  from="${m%%|*}"
  sed_args+=(-e "s|$from|${m##*|}|g")
  find_pat="${find_pat:+$find_pat\\|}$from"
done

apply=0
targets=()
for arg in "$@"; do
  case "$arg" in
    --apply) apply=1 ;;
    -*) echo "unknown flag: $arg" >&2; exit 2 ;;
    *) targets+=("$arg") ;;
  esac
done
[ ${#targets[@]} -eq 0 ] && targets=("${REPOS[@]}")

# The vault pattern is a strict prefix of neither, but it MUST run first:
# .../file/kolkrabbi matches inside nothing else, while a naive order would be
# fine — still, ordering explicitly costs nothing and documents the intent.
total_files=0
total_hits=0

for repo in "${targets[@]}"; do
  dir="$PROJECTS/$repo"
  if [ ! -d "$dir" ]; then
    echo "skip $repo — not found at $dir"
    continue
  fi

  # --exclude-dir prunes before descending; piping to `grep -v` walks the whole
  # tree first and is minutes slower on a vault-sized repo.
  # -c gives per-file counts in one pass, so no second grep per file.
  mapfile -t counted < <(
    grep -rc --binary-files=without-match \
      --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git \
      --exclude-dir=_tmp --exclude-dir=lobby-history --exclude-dir=session-log \
      --exclude-dir=.wrangler --exclude-dir=.obsidian \
      "$find_pat" "$dir" 2>/dev/null \
      | grep -v ':0$' || true
  )

  files=()
  hits=0
  for line in "${counted[@]}"; do
    files+=("${line%:*}")
    hits=$((hits + ${line##*:}))
  done

  # NOTE: grep -c counts matching LINES, not occurrences — a line carrying two
  # URLs counts once. Treat this as a lower bound.
  printf '%-14s %3d files · %4d lines' "$repo" "${#files[@]}" "$hits"

  if [ "$apply" -eq 1 ] && [ "${#files[@]}" -gt 0 ]; then
    for f in "${files[@]}"; do
      LC_ALL=C sed -i '' "${sed_args[@]}" "$f"
    done
    printf '  → rewritten\n'
  else
    printf '  (dry run)\n'
  fi

  total_files=$((total_files + ${#files[@]}))
  total_hits=$((total_hits + hits))
done

echo "─────────────────────────────────────────────"
printf 'total          %3d files · %4d lines\n' "$total_files" "$total_hits"
[ "$apply" -eq 1 ] || echo 'dry run — re-run with --apply to write'
