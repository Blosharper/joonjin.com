#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Optional local credentials; CI supplies these variables directly.
if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi
: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN}"
: "${CLOUDFLARE_ACCOUNT_ID:?Set CLOUDFLARE_ACCOUNT_ID}"

VERSION=$(git rev-parse --short HEAD)
sed -i.bak -E "s/v=[A-Za-z0-9.-]+/v=$VERSION/g" joonjin/index.html
rm -f joonjin/index.html.bak

bunx wrangler@4.118.0 pages deploy joonjin \
  --project-name joonjin-site \
  --branch main \
  --commit-dirty=true
