-- Geographic and localization tables

-- User location data
CREATE TABLE IF NOT EXISTS user_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    country VARCHAR(100),
    state_province VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone VARCHAR(50),
    is_primary BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, is_primary) WHERE is_primary = true
);

-- User localization preferences
CREATE TABLE IF NOT EXISTS user_localization (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    language VARCHAR(10) DEFAULT 'en',
    country VARCHAR(100),
    currency VARCHAR(10) DEFAULT 'USD',
    timezone VARCHAR(50),
    date_format VARCHAR(20) DEFAULT 'MM/DD/YYYY',
    time_format VARCHAR(10) DEFAULT '12h',
    measurement_system VARCHAR(10) DEFAULT 'imperial', -- 'metric' or 'imperial'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Healthcare providers by location
CREATE TABLE IF NOT EXISTS healthcare_providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    provider_type VARCHAR(50), -- 'doctor', 'nutritionist', 'therapist', 'gym', etc.
    specialty VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state_province VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    languages JSONB, -- array of supported languages
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Regional health trends and statistics
CREATE TABLE IF NOT EXISTS regional_health_trends (
    id SERIAL PRIMARY KEY,
    region_type VARCHAR(20), -- 'country', 'state', 'city'
    region_name VARCHAR(100),
    trend_category VARCHAR(50), -- 'fitness', 'nutrition', 'mental_health', etc.
    trend_name VARCHAR(100),
    popularity_score INTEGER, -- 0-100
    trend_direction VARCHAR(10), -- 'up', 'down', 'stable'
    data_source VARCHAR(100),
    period_start DATE,
    period_end DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Localization strings/translations
CREATE TABLE IF NOT EXISTS localization_strings (
    id SERIAL PRIMARY KEY,
    string_key VARCHAR(100) NOT NULL,
    language VARCHAR(10) NOT NULL,
    translated_value TEXT NOT NULL,
    context VARCHAR(100), -- page or feature context
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(string_key, language)
);

-- Regional compliance and regulations
CREATE TABLE IF NOT EXISTS regional_compliance (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    regulation_name VARCHAR(100) NOT NULL,
    regulation_type VARCHAR(50), -- 'privacy', 'health', 'data_protection'
    description TEXT,
    compliance_requirements JSONB,
    is_active BOOLEAN DEFAULT true,
    effective_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Currency exchange rates (for pricing)
CREATE TABLE IF NOT EXISTS currency_rates (
    id SERIAL PRIMARY KEY,
    base_currency VARCHAR(10) DEFAULT 'USD',
    target_currency VARCHAR(10) NOT NULL,
    exchange_rate DECIMAL(10, 6) NOT NULL,
    rate_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(base_currency, target_currency, rate_date)
);

-- Regional pricing
CREATE TABLE IF NOT EXISTS regional_pricing (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL, -- subscription plan, feature, etc.
    country VARCHAR(100),
    currency VARCHAR(10),
    price DECIMAL(10, 2),
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    effective_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default localization strings
INSERT INTO localization_strings (string_key, language, translated_value, context) VALUES
-- English
('welcome', 'en', 'Welcome to DEAR', 'general'),
('dashboard', 'en', 'Dashboard', 'navigation'),
('profile', 'en', 'Profile', 'navigation'),
('settings', 'en', 'Settings', 'navigation'),
('transformation', 'en', 'Transformation', 'features'),
('progress', 'en', 'Progress', 'features'),
('goals', 'en', 'Goals', 'features'),
('community', 'en', 'Community', 'features'),

-- Spanish
('welcome', 'es', 'Bienvenido a DEAR', 'general'),
('dashboard', 'es', 'Panel de Control', 'navigation'),
('profile', 'es', 'Perfil', 'navigation'),
('settings', 'es', 'Configuración', 'navigation'),
('transformation', 'es', 'Transformación', 'features'),
('progress', 'es', 'Progreso', 'features'),
('goals', 'es', 'Objetivos', 'features'),
('community', 'es', 'Comunidad', 'features'),

-- French
('welcome', 'fr', 'Bienvenue sur DEAR', 'general'),
('dashboard', 'fr', 'Tableau de Bord', 'navigation'),
('profile', 'fr', 'Profil', 'navigation'),
('settings', 'fr', 'Paramètres', 'navigation'),
('transformation', 'fr', 'Transformation', 'features'),
('progress', 'fr', 'Progrès', 'features'),
('goals', 'fr', 'Objectifs', 'features'),
('community', 'fr', 'Communauté', 'features');

-- Insert sample healthcare providers
INSERT INTO healthcare_providers (name, provider_type, specialty, city, state_province, country, latitude, longitude, languages, rating, is_verified) VALUES
('Dr. Sarah Johnson', 'doctor', 'Nutritionist', 'San Francisco', 'California', 'United States', 37.7749, -122.4194, '["English", "Spanish"]', 4.9, true),
('FitLife Gym', 'fitness', 'Fitness Center', 'San Francisco', 'California', 'United States', 37.7649, -122.4294, '["English"]', 4.7, true),
('Mindful Wellness Center', 'therapist', 'Mental Health', 'San Francisco', 'California', 'United States', 37.7849, -122.4094, '["English", "Mandarin"]', 4.8, true);

-- Insert regional health trends
INSERT INTO regional_health_trends (region_type, region_name, trend_category, trend_name, popularity_score, trend_direction, period_start, period_end) VALUES
('city', 'San Francisco', 'fitness', 'Yoga & Mindfulness', 92, 'up', '2024-01-01', '2024-03-31'),
('city', 'San Francisco', 'nutrition', 'Plant-based Nutrition', 87, 'up', '2024-01-01', '2024-03-31'),
('city', 'San Francisco', 'fitness', 'HIIT Workouts', 84, 'stable', '2024-01-01', '2024-03-31'),
('city', 'San Francisco', 'mental_health', 'Mental Health Support', 79, 'up', '2024-01-01', '2024-03-31');

-- Insert regional compliance data
INSERT INTO regional_compliance (country, regulation_name, regulation_type, description, is_active) VALUES
('United States', 'HIPAA', 'health', 'Health Insurance Portability and Accountability Act', true),
('United States', 'CCPA', 'privacy', 'California Consumer Privacy Act', true),
('United States', 'FDA', 'health', 'Food and Drug Administration Guidelines', true),
('Canada', 'PIPEDA', 'privacy', 'Personal Information Protection and Electronic Documents Act', true),
('United Kingdom', 'GDPR', 'privacy', 'General Data Protection Regulation', true),
('Germany', 'GDPR', 'privacy', 'General Data Protection Regulation', true),
('France', 'GDPR', 'privacy', 'General Data Protection Regulation', true);

-- Insert currency rates
INSERT INTO currency_rates (base_currency, target_currency, exchange_rate) VALUES
('USD', 'EUR', 0.85),
('USD', 'GBP', 0.73),
('USD', 'CAD', 1.25),
('USD', 'AUD', 1.35),
('USD', 'JPY', 110.00);

-- Insert regional pricing
INSERT INTO regional_pricing (product_id, country, currency, price) VALUES
('premium_monthly', 'United States', 'USD', 29.99),
('premium_monthly', 'Canada', 'CAD', 39.99),
('premium_monthly', 'United Kingdom', 'GBP', 24.99),
('premium_monthly', 'Germany', 'EUR', 27.99),
('premium_monthly', 'France', 'EUR', 27.99);

-- Create indexes for performance
CREATE INDEX idx_user_locations_user_id ON user_locations(user_id);
CREATE INDEX idx_user_locations_coordinates ON user_locations(latitude, longitude);
CREATE INDEX idx_user_localization_user_id ON user_localization(user_id);
CREATE INDEX idx_healthcare_providers_location ON healthcare_providers(latitude, longitude);
CREATE INDEX idx_healthcare_providers_type ON healthcare_providers(provider_type, specialty);
CREATE INDEX idx_healthcare_providers_active ON healthcare_providers(is_active, is_verified);
CREATE INDEX idx_regional_trends_region ON regional_health_trends(region_type, region_name);
CREATE INDEX idx_localization_strings_key_lang ON localization_strings(string_key, language);
CREATE INDEX idx_regional_compliance_country ON regional_compliance(country, is_active);
CREATE INDEX idx_currency_rates_currencies ON currency_rates(base_currency, target_currency, rate_date);
CREATE INDEX idx_regional_pricing_country ON regional_pricing(country, is_active);
