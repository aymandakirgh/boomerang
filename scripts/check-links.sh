#!/usr/bin/env bash
# Serves the production build and asserts every route answers 200 with real HTML.
# Usage: check-links.sh [route]   (no arg = all routes)
set -euo pipefail
cd "$(dirname "$0")/.."

PORT=4319
ROUTES=(/ /product /solutions /pricing /company /demo /legal/privacy /legal/terms)
if [ $# -ge 1 ]; then ROUTES=("$1"); fi

[ -d dist ] || { echo "dist/ missing; run npm run build first" >&2; exit 1; }

npx vite preview --port "$PORT" --strictPort >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT

for _ in $(seq 1 40); do
  curl -sf -o /dev/null "http://localhost:$PORT/" && break
  sleep 0.25
done

FAIL=0
for route in "${ROUTES[@]}"; do
  body=$(curl -sf "http://localhost:$PORT$route" || true)
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT$route")
  if [ "$code" != "200" ] || ! printf '%s' "$body" | grep -q '<div id="root">'; then
    echo "FAIL $route (http $code)"
    FAIL=1
  else
    echo "ok   $route"
  fi
done
exit $FAIL
