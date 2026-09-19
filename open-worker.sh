#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🛠️ Launching Nexro Worker App (Port 8082)..."
cd "$DIR/nexro-worker-app"
if command -v npx >/dev/null 2>&1; then
  npx expo start --port 8082
else
  node ./node_modules/expo/bin/cli start --port 8082
fi
