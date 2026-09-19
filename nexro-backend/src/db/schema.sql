-- Nexro Central Cooperative Database Schema
-- Standardized for PostgreSQL 18

DROP TABLE IF EXISTS society_applications CASCADE;
DROP TABLE IF EXISTS demand_forecasts CASCADE;
DROP TABLE IF EXISTS welfare_passbook_entries CASCADE;
DROP TABLE IF EXISTS escrow_transactions CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS workers CASCADE;
DROP TABLE IF EXISTS societies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Identity & RBAC
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(128) UNIQUE,
    password_hash TEXT,
    full_name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL, -- 'consumer', 'worker', 'society_admin', 'federation_admin'
    language_pref VARCHAR(10) DEFAULT 'en',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Primary Cooperative Societies
CREATE TABLE societies (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    registration_number VARCHAR(64) UNIQUE NOT NULL,
    cluster VARCHAR(64) NOT NULL,
    jurisdiction_geofence TEXT,
    address TEXT,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(128),
    audit_grade VARCHAR(5) DEFAULT 'A',
    status VARCHAR(32) DEFAULT 'operational', -- 'operational', 'pending_verification', 'suspended'
    welfare_account_number VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Certified Cooperative Workers
CREATE TABLE workers (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    society_id VARCHAR(64) REFERENCES societies(id) ON DELETE SET NULL,
    membership_no VARCHAR(64) UNIQUE NOT NULL,
    trade VARCHAR(64) NOT NULL,
    nsqf_level VARCHAR(32) DEFAULT 'NSQF Level 4',
    iti_cert_no VARCHAR(64),
    experience_years INTEGER DEFAULT 3,
    police_verified BOOLEAN DEFAULT true,
    verification_status VARCHAR(32) DEFAULT 'Verified',
    status VARCHAR(32) DEFAULT 'available', -- 'available', 'on_job', 'offline'
    current_lat NUMERIC(10, 6) DEFAULT 12.9784,
    current_lng NUMERIC(10, 6) DEFAULT 77.6408,
    rating NUMERIC(3, 2) DEFAULT 4.90,
    total_jobs INTEGER DEFAULT 0,
    passbook_balance NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Standardized Service Catalog
CREATE TABLE services (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    title VARCHAR(256) NOT NULL,
    description TEXT,
    floor_price NUMERIC(10, 2) NOT NULL,
    default_duration_mins INTEGER DEFAULT 45,
    required_nsqf_level VARCHAR(32) DEFAULT 'NSQF Level 4'
);

-- 5. Bookings & Operational Lifecycle
CREATE TABLE bookings (
    id VARCHAR(64) PRIMARY KEY,
    consumer_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    worker_id VARCHAR(64) REFERENCES workers(id) ON DELETE SET NULL,
    society_id VARCHAR(64) REFERENCES societies(id) ON DELETE SET NULL,
    service_id VARCHAR(64) REFERENCES services(id) ON DELETE SET NULL,
    status VARCHAR(32) DEFAULT 'requested', -- 'requested', 'assigned', 'worker_arrived', 'in_progress', 'completed', 'cancelled'
    is_emergency BOOLEAN DEFAULT false,
    customer_problem TEXT,
    customer_lat NUMERIC(10, 6),
    customer_lng NUMERIC(10, 6),
    customer_address TEXT,
    scheduled_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(10, 2) NOT NULL,
    worker_payout NUMERIC(10, 2) NOT NULL, -- 85% Statutory
    welfare_amount NUMERIC(10, 2) NOT NULL, -- 5% Statutory
    society_ops_amount NUMERIC(10, 2) NOT NULL, -- 10% Statutory
    start_otp VARCHAR(6) NOT NULL,
    worker_diagnosis TEXT,
    photo_proof_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ
);

-- 6. Escrow Settlements
CREATE TABLE escrow_transactions (
    id VARCHAR(64) PRIMARY KEY,
    booking_id VARCHAR(64) REFERENCES bookings(id) ON DELETE CASCADE,
    consumer_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'held', -- 'held', 'released', 'refunded'
    gateway_txn_id VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    released_at TIMESTAMPTZ
);

-- 7. Welfare Passbook & Group Shield Ledger
CREATE TABLE welfare_passbook_entries (
    id VARCHAR(64) PRIMARY KEY,
    worker_id VARCHAR(64) REFERENCES workers(id) ON DELETE CASCADE,
    society_id VARCHAR(64) REFERENCES societies(id) ON DELETE CASCADE,
    booking_id VARCHAR(64) REFERENCES bookings(id) ON DELETE SET NULL,
    entry_type VARCHAR(32) NOT NULL, -- 'credit_job_5pct', 'debit_emergency_advance', 'insurance_premium'
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT,
    balance_after NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Demand AI Forecasts & Rebalance Plans
CREATE TABLE demand_forecasts (
    id VARCHAR(64) PRIMARY KEY,
    cluster VARCHAR(64) NOT NULL,
    target_date DATE NOT NULL,
    predicted_bookings INTEGER NOT NULL,
    confidence_score NUMERIC(4, 2) NOT NULL,
    sector_deficits JSONB,
    rebalance_plan JSONB,
    reasoning TEXT,
    status VARCHAR(32) DEFAULT 'pending_approval', -- 'pending_approval', 'approved', 'rejected'
    approved_by VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Society Affiliation Applications
CREATE TABLE society_applications (
    id VARCHAR(64) PRIMARY KEY,
    legal_name VARCHAR(256) NOT NULL,
    registration_no VARCHAR(64) NOT NULL,
    registrar_district VARCHAR(64),
    registered_address TEXT,
    contact_name VARCHAR(128),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(128),
    estimated_members INTEGER DEFAULT 0,
    bylaws_url TEXT,
    certificate_url TEXT,
    status VARCHAR(32) DEFAULT 'pending_review', -- 'pending_review', 'approved', 'rejected'
    submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_society ON bookings(society_id);
CREATE INDEX idx_bookings_worker ON bookings(worker_id);
CREATE INDEX idx_workers_society ON workers(society_id);
CREATE INDEX idx_workers_status ON workers(status);
CREATE INDEX idx_workers_trade ON workers(trade);
