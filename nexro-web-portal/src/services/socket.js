/**
 * Nexro Real-Time WebSocket Client
 * Connects to ws://localhost:5001/ws
 */

class NexroSocketClient {
  constructor() {
    this.ws = null;
    this.subscribers = new Map(); // event -> Set of callbacks
    this.isConnected = false;
    this.reconnectTimer = null;
  }

  connect(role = 'society', id = 'soc_kcls_42') {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      this.ws = new WebSocket('ws://localhost:5001/ws');

      this.ws.onopen = () => {
        this.isConnected = true;
        console.log('⚡ [Nexro WS Client] Connected to Central Real-Time Dispatch Engine');
        this.ws.send(JSON.stringify({ type: 'auth', role, id }));
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event) {
            const handlers = this.subscribers.get(data.event);
            if (handlers) {
              handlers.forEach(fn => fn(data));
            }
          }
        } catch (err) {
          console.error('[Nexro WS Client] Message parse error:', err);
        }
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        console.log('🔌 [Nexro WS Client] Disconnected. Reconnecting in 4s...');
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => this.connect(role, id), 4000);
      };

      this.ws.onerror = (err) => {
        console.warn('⚠️ [Nexro WS Client] Connection notice:', err.message || 'Connection offline');
      };
    } catch (e) {
      console.warn('⚠️ [Nexro WS Client] Initialization error:', e.message);
    }
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event).add(callback);
    return () => this.subscribers.get(event).delete(callback);
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

export const nexroSocket = new NexroSocketClient();
