#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🏛️ Launching Nexro Cooperative & Federation Admin Portal (Port 3000)..."
cd "$DIR/nexro-web-portal"
if command -v npm >/dev/null 2>&1; then
  npm run dev -- --port 3000 --host
else
  node ./node_modules/vite/bin/vite.js --port 3000 --host
fi
