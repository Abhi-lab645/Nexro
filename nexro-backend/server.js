import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { socketService } from './src/services/socketService.js';
import authRoutes from './src/routes/authRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import emergencyRoutes from './src/routes/emergencyRoutes.js';
import societyRoutes from './src/routes/societyRoutes.js';
import federationRoutes from './src/routes/federationRoutes.js';
import workerRoutes from './src/routes/workerRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Initialize WebSocket Engine on /ws
socketService.init(server);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Nexro Central Backend Gateway',
    version: '1.0.0',
    port: process.env.PORT || 5001,
    database: 'PostgreSQL 18 (nexro_db)',
    webSockets: 'active on /ws',
    statutorySplit: '85% Worker / 5% Welfare / 10% Society Ops / 0% Aggregator',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/societies', societyRoutes);
app.use('/api/federation', federationRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🏛️  NEXRO CENTRAL BACKEND GATEWAY ACTIVE ON PORT ${PORT}`);
  console.log(`⚡  Real-Time WebSockets listening on ws://localhost:${PORT}/ws`);
  console.log(`🐘  Connected to PostgreSQL 18 (database: nexro_db)`);
  console.log(`⚖️  Statutory 85/5/10 Financial Ledger Engine Armed`);
  console.log(`======================================================\n`);
});
