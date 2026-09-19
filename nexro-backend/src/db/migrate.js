import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('🚀 [Migration] Initializing Nexro PostgreSQL Database Schema...');
    
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schemaSql);
    console.log('✅ [Migration] Schema DDL tables and indexes created successfully.');

    console.log('🌱 [Migration] Seeding realistic Karnataka cooperative data...');
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await client.query(seedSql);
    console.log('✅ [Migration] Seed data inserted successfully.');

    const res = await client.query('SELECT count(*) as count FROM societies');
    console.log(`📊 [Verification] Active Societies in DB: ${res.rows[0].count}`);

    const workersRes = await client.query('SELECT count(*) as count FROM workers');
    console.log(`📊 [Verification] Active Workers in DB: ${workersRes.rows[0].count}`);

    const bookingsRes = await client.query('SELECT count(*) as count FROM bookings');
    console.log(`📊 [Verification] Initial Bookings in DB: ${bookingsRes.rows[0].count}`);

  } catch (err) {
    console.error('❌ [Migration Error]:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
