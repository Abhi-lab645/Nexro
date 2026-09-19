#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🚀 Launching Nexro Consumer App (Port 8081)..."
cd "$DIR/nexro-consumer-app"
if command -v npx >/dev/null 2>&1; then
  npx expo start --port 8081
else
  node ./node_modules/expo/bin/cli start --port 8081
fi
