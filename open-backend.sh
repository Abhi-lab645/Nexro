#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "======================================================"
echo "🏛️  LAUNCHING NEXRO CENTRAL BACKEND ECOSYSTEM"
echo "======================================================"

# Determine Python binary
if [ -f "$DIR/nexro-ai-service/venv/bin/python" ]; then
  PYTHON_BIN="$DIR/nexro-ai-service/venv/bin/python"
else
  PYTHON_BIN="$(command -v python3 || command -v python)"
fi

# Determine Node binary
if command -v node >/dev/null 2>&1; then
  NODE_BIN="node"
elif [ -f "/Users/abhinavkumar/.nvm/versions/node/v24.14.0/bin/node" ]; then
  NODE_BIN="/Users/abhinavkumar/.nvm/versions/node/v24.14.0/bin/node"
else
  NODE_BIN="node"
fi

# 1. Start Python FastAPI AI Microservice (Port 8000)
echo "🧠 Starting Python FastAPI Demand AI Service (Port 8000)..."
cd "$DIR/nexro-ai-service"
"$PYTHON_BIN" -m uvicorn main:app --host 0.0.0.0 --port 8000 &
AI_PID=$!

# 2. Start Node.js Express Gateway (Port 5001)
echo "⚡ Starting Node.js Express Gateway & WebSockets (Port 5001)..."
cd "$DIR/nexro-backend"
"$NODE_BIN" server.js &
GATEWAY_PID=$!

echo "✅ Both services running. Press Ctrl+C to terminate."

trap "echo 'Stopping Nexro Backend Services...'; kill $AI_PID $GATEWAY_PID 2>/dev/null || true" EXIT INT TERM
wait
