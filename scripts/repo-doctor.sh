#!/usr/bin/env bash
set -euo pipefail

# Repo Doctor: normalize nested Next.js project structure into repo root safely.

ROOT="$(pwd)"
ts="$(date +%Y%m%d_%H%M%S)"
echo "[repo-doctor] Repo root: $ROOT"
echo "[repo-doctor] Timestamp: $ts"
echo "[repo-doctor] Top-level:"
ls -la --group-directories-first

# ---------- helpers ----------
log() { echo "[repo-doctor] $*"; }

has_glob() {
  # Usage: has_glob "/path/pattern*"
  compgen -G "$1" >/dev/null 2>&1
}

depth_of() {
  # Count slashes in a path like ./a/b
  local p="$1"
  echo "$p" | tr -cd '/' | wc -c | tr -d ' '
}

backup_if_exists() {
  local dest="$1"
  if [[ -e "$dest" && ! -L "$dest" ]]; then
    local backup="${dest}__old__${ts}"
    log "Backup: $dest -> $backup"
    mv "$dest" "$backup"
    echo "$backup"
  else
    echo ""
  fi
}

move_path() {
  local src="$1"
  local dest="$2"

  if [[ ! -e "$src" ]]; then
    return 0
  fi

  # Normalize ./ prefixes for comparison
  local src_n="${src#./}"
  local dest_n="${dest#./}"

  if [[ "$src_n" == "$dest_n" ]]; then
    log "Skip (same path): $src -> $dest"
    return 0
  fi

  backup_if_exists "$dest" >/dev/null || true
  log "Move: $src -> $dest"
  mv "$src" "$dest"
  MOVED+=("$src -> $dest")
}

# ---------- find candidate roots ----------
log "Scanning for candidate project roots (package.json directories)..."

declare -a candidates=()
while IFS= read -r p; do
  d="$(dirname "$p")"
  # normalize to ./...
  if [[ "$d" == "." ]]; then
    candidates+=(".")
  else
    candidates+=("$d")
  fi
done < <(find . -name package.json \
  -not -path "./node_modules/*" \
  -not -path "*/node_modules/*" \
  -print 2>/dev/null)

# Always include repo root
candidates+=(".")

# De-duplicate
mapfile -t candidates < <(printf '%s\n' "${candidates[@]}" | awk '!seen[$0]++')

score_candidate() {
  local dir="$1"
  local score=0

  [[ -f "$dir/package.json" ]] && score=$((score+3))
  [[ -d "$dir/src/app" ]] && score=$((score+3))
  has_glob "$dir/next.config.*" && score=$((score+2))
  [[ -f "$dir/prisma/schema.prisma" ]] && score=$((score+2))
  has_glob "$dir/wrangler.*" && score=$((score+1))
  has_glob "$dir/tailwind.config.*" && score=$((score+1))
  [[ -f "$dir/tsconfig.json" ]] && score=$((score+1))

  echo "$score"
}

best_score=-1
best_depth=999999
best_dir=""

for dir in "${candidates[@]}"; do
  score="$(score_candidate "$dir")"
  depth="$(depth_of "$dir")"
  log "Candidate: $dir (score=$score depth=$depth)"
  if (( score > best_score )) || { (( score == best_score )) && (( depth < best_depth )); }; then
    best_score="$score"
    best_depth="$depth"
    best_dir="$dir"
  fi
done

if [[ -z "$best_dir" || "$best_score" -le 0 ]]; then
  log "ERROR: No suitable project root found."
  exit 1
fi

log "Selected project root: $best_dir (score=$best_score)"

# If already correct
if [[ "$best_dir" == "." || "$best_dir" == "./" ]]; then
  log "No changes needed (project root already at repo root)."
  exit 0
fi

# ---------- move items ----------
declare -a MOVED=()

# Directories to move
for d in src public prisma components; do
  move_path "$best_dir/$d" "./$d"
done

# Config and files to move (if present)
for f in package.json package-lock.json tsconfig.json cloudflare-env.d.ts .dev.vars; do
  move_path "$best_dir/$f" "./$f"
done

# Globbed config patterns
for pattern in "next.config." "open-next.config." "tailwind.config." "postcss.config." "eslint.config." "wrangler."; do
  while IFS= read -r file; do
    [[ -f "$file" ]] || continue
    base="$(basename "$file")"
    move_path "$file" "./$base"
  done < <(find "$best_dir" -maxdepth 1 -type f -name "${pattern}*" -print 2>/dev/null)
done

# README: only move if root README does NOT exist
if [[ ! -f "./README.md" && -f "$best_dir/README.md" ]]; then
  move_path "$best_dir/README.md" "./README.md"
fi

# ---------- remove nested node_modules (never root) ----------
log "Removing nested node_modules (excluding ./node_modules)..."
while IFS= read -r nm; do
  log "Remove: $nm"
  rm -rf "$nm"
done < <(find . -type d -name node_modules \
  -not -path "./node_modules" \
  -not -path "./node_modules/*" \
  -prune -print 2>/dev/null)

if [[ -d "./node_modules" ]]; then
  log "NOTE: root node_modules exists; leaving intact."
fi

# ---------- cleanup: remove selected dir if empty ----------
# Only remove the selected root folder if it is now empty.
if [[ -d "$best_dir" ]]; then
  # If directory exists and has no entries other than . and ..
  if [[ -z "$(ls -A "$best_dir" 2>/dev/null || true)" ]]; then
    log "Removing empty directory: $best_dir"
    rmdir "$best_dir" 2>/dev/null || true
  else
    log "Leftover directory not empty (kept): $best_dir"
  fi
fi

# Never touch .git or docs
log "Final repo structure:"
ls -la --group-directories-first

if (( ${#MOVED[@]} > 0 )); then
  log "Moved items:"
  printf '  - %s\n' "${MOVED[@]}"
else
  log "No items moved."
fi

log "Recommended next steps:"
echo "  npm install"
echo "  npm run dev"