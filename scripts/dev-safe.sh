#!/usr/bin/env bash
set -euo pipefail

# Find and kill any process listening on TCP port 3000
if command -v ss >/dev/null 2>&1; then
  pids=$(ss -lptn "sport = :3000" 2>/dev/null | awk 'NR>1 {gsub(/pid=|,/," ",$6); print $6}' | awk '{print $1}' | sort -u)
else
  pids=""
fi

if [[ -n "${pids:-}" ]]; then
  echo "[dev-safe] Killing processes on port 3000: $pids"
  for pid in $pids; do
    if [[ "$pid" =~ ^[0-9]+$ ]]; then
      kill -9 "$pid" || true
    fi
  done
fi

# Remove Next.js dev lock if present
if [[ -f .next/dev/lock ]]; then
  echo "[dev-safe] Removing .next/dev/lock"
  rm -f .next/dev/lock
fi

# Start Next.js dev server on port 3000
export PORT=3000
exec npm run dev
