import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let firebaseInitialized = false;
const keyPath = process.env.FIREBASE_KEY_PATH || path.join(__dirname, '../../serviceAccountKey.json');

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    firebaseInitialized = true;
    console.log('🔥 [Firebase] Initialized with FIREBASE_SERVICE_ACCOUNT env var.');
  } else if (fs.existsSync(keyPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    firebaseInitialized = true;
    console.log('🔥 [Firebase] Initialized with serviceAccountKey.json file.');
  } else {
    console.log('ℹ️ [Firebase] No service account key found. Operating in High-Fidelity Simulation Mode.');
  }
} catch (err) {
  console.warn('⚠️ [Firebase] Initialization notice (running in Simulation Mode):', err.message);
}

export { admin, firebaseInitialized };
