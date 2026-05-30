#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI="$SCRIPT_DIR/scripts/task-cli.ts"

if [[ ! -f "$CLI" ]]; then
  echo "task-management: missing CLI at $CLI" >&2
  exit 1
fi

exec node "$CLI" "$@"
