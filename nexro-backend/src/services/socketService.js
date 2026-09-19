import { WebSocketServer, WebSocket } from 'ws';

class SocketService {
  constructor() {
    this.wss = null;
    this.clients = new Map(); // socket -> clientInfo { role, id, societyId }
  }

  init(server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (ws, req) => {
      console.log('⚡ [WebSocket] New client connected from', req.socket.remoteAddress);

      ws.isAlive = true;
      ws.on('pong', () => { ws.isAlive = true; });

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message.toString());
          this.handleClientMessage(ws, data);
        } catch (err) {
          console.error('[WebSocket] Message parsing error:', err.message);
        }
      });

      ws.on('close', () => {
        const info = this.clients.get(ws);
        if (info) {
          console.log(`🔌 [WebSocket] Disconnected: ${info.role} - ${info.id}`);
          this.clients.delete(ws);
        }
      });

      // Welcome handshake
      ws.send(JSON.stringify({
        event: 'connected',
        serverTime: new Date().toISOString(),
        message: 'Connected to Nexro Central Real-Time Dispatch Engine'
      }));
    });

    // Heartbeat ping-pong to keep connections alive
    const interval = setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);

    this.wss.on('close', () => clearInterval(interval));
    console.log('⚡ [WebSocket] Real-time engine listening on /ws');
  }

  handleClientMessage(ws, data) {
    switch (data.type) {
      case 'join':
      case 'auth':
        this.clients.set(ws, {
          role: data.role, // 'consumer' | 'worker' | 'society' | 'federation'
          id: data.id,
          societyId: data.societyId || 'soc_kcls_42'
        });
        ws.send(JSON.stringify({
          event: 'authenticated',
          role: data.role,
          id: data.id,
          channels: [`${data.role}:${data.id}`]
        }));
        console.log(`✅ [WebSocket Registered] Role: ${data.role} | ID: ${data.id}`);
        break;

      case 'worker:location_ping':
        if (data.workerId && data.lat && data.lng) {
          this.broadcastWorkerLocation(data.workerId, data.lat, data.lng, data.bookingId);
        }
        break;

      default:
        // echo or custom event
        break;
    }
  }

  /**
   * Broadcast worker live GPS coordinates to tracking consumer and society dashboard
   */
  broadcastWorkerLocation(workerId, lat, lng, bookingId) {
    const payload = JSON.stringify({
      event: 'worker:location_update',
      workerId,
      bookingId,
      lat,
      lng,
      timestamp: new Date().toISOString()
    });

    this.clients.forEach((info, ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        // Send to consumer assigned to this booking, or society managing this worker
        if (info.role === 'society' || (info.role === 'consumer' && info.activeBookingId === bookingId)) {
          ws.send(payload);
        }
      }
    });
  }

  /**
   * Broadcast real-time booking lifecycle status transitions
   */
  broadcastBookingUpdate(booking) {
    const payload = JSON.stringify({
      event: 'booking:status_changed',
      booking
    });

    this.clients.forEach((info, ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        if (
          info.role === 'federation' ||
          (info.role === 'society' && info.societyId === booking.society_id) ||
          (info.role === 'worker' && info.id === booking.worker_id) ||
          (info.role === 'consumer' && info.id === booking.consumer_id)
        ) {
          ws.send(payload);
        }
      }
    });
  }

  /**
   * Broadcast high-priority Emergency SOS Call (< 15 min SLA)
   */
  broadcastEmergencyAlert(emergencyJob, nearbyWorkerIds = []) {
    const payload = JSON.stringify({
      event: 'emergency:sos_alert',
      emergencyJob,
      nearbyWorkerCount: nearbyWorkerIds.length,
      timestamp: new Date().toISOString()
    });

    this.clients.forEach((info, ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        if (
          info.role === 'society' ||
          info.role === 'federation' ||
          (info.role === 'worker' && nearbyWorkerIds.includes(info.id))
        ) {
          ws.send(payload);
        }
      }
    });
  }

  /**
   * Broadcast macro telemetry updates to Federation Apex Dashboard
   */
  broadcastFederationTelemetry(telemetry) {
    const payload = JSON.stringify({
      event: 'federation:telemetry_update',
      telemetry
    });

    this.clients.forEach((info, ws) => {
      if (ws.readyState === WebSocket.OPEN && info.role === 'federation') {
        ws.send(payload);
      }
    });
  }
}

export const socketService = new SocketService();
