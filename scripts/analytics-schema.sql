-- Advanced analytics and user behavior tracking tables

-- Core analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    device_type VARCHAR(50),
    browser VARCHAR(50),
    os VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    properties JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions tracking
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    duration_minutes INTEGER,
    page_views INTEGER DEFAULT 0,
    events_count INTEGER DEFAULT 0,
    device_type VARCHAR(50),
    browser VARCHAR(50),
    os VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    is_bounce BOOLEAN DEFAULT false
);

-- Conversion funnels
CREATE TABLE IF NOT EXISTS conversion_funnels (
    id SERIAL PRIMARY KEY,
    funnel_name VARCHAR(100) NOT NULL,
    step_order INTEGER NOT NULL,
    step_name VARCHAR(100) NOT NULL,
    step_event VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(funnel_name, step_order)
);

-- Funnel conversions tracking
CREATE TABLE IF NOT EXISTS funnel_conversions (
    id SERIAL PRIMARY KEY,
    funnel_name VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(100),
    step_name VARCHAR(100) NOT NULL,
    step_order INTEGER NOT NULL,
    converted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_to_convert INTEGER, -- seconds from funnel start
    properties JSONB
);

-- User cohorts
CREATE TABLE IF NOT EXISTS user_cohorts (
    id SERIAL PRIMARY KEY,
    cohort_id VARCHAR(50) NOT NULL, -- e.g., "2024-03" for monthly cohorts
    cohort_type VARCHAR(20) DEFAULT 'monthly', -- 'weekly', 'monthly'
    cohort_date DATE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    signup_date TIMESTAMP,
    first_conversion_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cohort_id, user_id)
);

-- Cohort retention metrics
CREATE TABLE IF NOT EXISTS cohort_retention (
    id SERIAL PRIMARY KEY,
    cohort_id VARCHAR(50) NOT NULL,
    period_number INTEGER NOT NULL, -- 1 for week 1, 2 for week 2, etc.
    period_type VARCHAR(20) DEFAULT 'week', -- 'day', 'week', 'month'
    total_users INTEGER NOT NULL,
    active_users INTEGER NOT NULL,
    retention_rate DECIMAL(5,2) NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cohort_id, period_number, period_type)
);

-- A/B testing
CREATE TABLE IF NOT EXISTS ab_tests (
    id SERIAL PRIMARY KEY,
    test_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    variants JSONB NOT NULL, -- array of variant names
    traffic_allocation JSONB, -- percentage allocation per variant
    success_metric VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- A/B test assignments
CREATE TABLE IF NOT EXISTS ab_test_assignments (
    id SERIAL PRIMARY KEY,
    test_name VARCHAR(100) REFERENCES ab_tests(test_name),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    variant VARCHAR(50) NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(test_name, user_id)
);

-- A/B test results
CREATE TABLE IF NOT EXISTS ab_test_results (
    id SERIAL PRIMARY KEY,
    test_name VARCHAR(100) REFERENCES ab_tests(test_name),
    variant VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,4),
    user_count INTEGER,
    conversion_count INTEGER,
    conversion_rate DECIMAL(5,2),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User behavior scoring
CREATE TABLE IF NOT EXISTS user_behavior_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    engagement_score INTEGER DEFAULT 0, -- 0-100
    churn_risk_score INTEGER DEFAULT 0, -- 0-100
    lifetime_value_score INTEGER DEFAULT 0, -- 0-100
    activity_score INTEGER DEFAULT 0, -- 0-100
    social_score INTEGER DEFAULT 0, -- 0-100
    last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Feature usage analytics
CREATE TABLE IF NOT EXISTS feature_usage (
    id SERIAL PRIMARY KEY,
    feature_name VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    usage_count INTEGER DEFAULT 1,
    first_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_time_spent INTEGER DEFAULT 0, -- in seconds
    UNIQUE(feature_name, user_id)
);

-- Revenue analytics
CREATE TABLE IF NOT EXISTS revenue_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50), -- 'subscription', 'upgrade', 'downgrade', 'churn'
    plan_name VARCHAR(100),
    amount DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'USD',
    billing_cycle VARCHAR(20), -- 'monthly', 'yearly'
    mrr_impact DECIMAL(10,2), -- monthly recurring revenue impact
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page performance metrics
CREATE TABLE IF NOT EXISTS page_performance (
    id SERIAL PRIMARY KEY,
    page_url TEXT NOT NULL,
    load_time INTEGER, -- milliseconds
    time_to_interactive INTEGER, -- milliseconds
    bounce_rate DECIMAL(5,2),
    avg_session_duration INTEGER, -- seconds
    unique_visitors INTEGER,
    page_views INTEGER,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default conversion funnels
INSERT INTO conversion_funnels (funnel_name, step_order, step_name, step_event) VALUES
('onboarding', 1, 'Sign Up', 'user_signup'),
('onboarding', 2, 'Email Verification', 'email_verified'),
('onboarding', 3, 'Profile Setup', 'profile_completed'),
('onboarding', 4, 'Goal Setting', 'goals_set'),
('onboarding', 5, 'First Workout', 'first_workout_completed'),
('onboarding', 6, 'Week 1 Complete', 'week_1_completed'),

('subscription', 1, 'View Pricing', 'pricing_page_viewed'),
('subscription', 2, 'Start Trial', 'trial_started'),
('subscription', 3, 'Payment Info', 'payment_info_entered'),
('subscription', 4, 'Subscribe', 'subscription_created');

-- Insert sample A/B tests
INSERT INTO ab_tests (test_name, description, variants, traffic_allocation, success_metric, is_active) VALUES
('homepage_hero', 'Test different hero section designs', '["control", "variant_a", "variant_b"]', '{"control": 34, "variant_a": 33, "variant_b": 33}', 'signup_conversion', true),
('pricing_page', 'Test pricing presentation', '["control", "variant_a"]', '{"control": 50, "variant_a": 50}', 'subscription_conversion', true),
('onboarding_flow', 'Test simplified onboarding', '["control", "simplified"]', '{"control": 50, "simplified": 50}', 'onboarding_completion', true);

-- Create indexes for performance
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_start_time ON user_sessions(start_time);
CREATE INDEX idx_funnel_conversions_funnel_name ON funnel_conversions(funnel_name);
CREATE INDEX idx_funnel_conversions_user_id ON funnel_conversions(user_id);
CREATE INDEX idx_user_cohorts_cohort_id ON user_cohorts(cohort_id);
CREATE INDEX idx_user_cohorts_user_id ON user_cohorts(user_id);
CREATE INDEX idx_cohort_retention_cohort_id ON cohort_retention(cohort_id);
CREATE INDEX idx_ab_test_assignments_test_name ON ab_test_assignments(test_name);
CREATE INDEX idx_ab_test_assignments_user_id ON ab_test_assignments(user_id);
CREATE INDEX idx_user_behavior_scores_user_id ON user_behavior_scores(user_id);
CREATE INDEX idx_feature_usage_feature_name ON feature_usage(feature_name);
CREATE INDEX idx_feature_usage_user_id ON feature_usage(user_id);
CREATE INDEX idx_revenue_events_user_id ON revenue_events(user_id);
CREATE INDEX idx_revenue_events_occurred_at ON revenue_events(occurred_at);
CREATE INDEX idx_page_performance_page_url ON page_performance(page_url);
CREATE INDEX idx_page_performance_date ON page_performance(date);

-- Create materialized views for common analytics queries
CREATE MATERIALIZED VIEW daily_active_users AS
SELECT 
    DATE(created_at) as date,
    COUNT(DISTINCT user_id) as dau
FROM analytics_events 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date;

CREATE MATERIALIZED VIEW monthly_recurring_revenue AS
SELECT 
    DATE_TRUNC('month', occurred_at) as month,
    SUM(mrr_impact) as mrr,
    COUNT(*) as events
FROM revenue_events 
WHERE occurred_at >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', occurred_at)
ORDER BY month;

-- Create function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW daily_active_users;
    REFRESH MATERIALIZED VIEW monthly_recurring_revenue;
END;
$$ LANGUAGE plpgsql;
