-- Engagement and retention tracking tables

-- User engagement metrics
CREATE TABLE IF NOT EXISTS user_engagement (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_count INTEGER DEFAULT 0,
    total_time_spent INTEGER DEFAULT 0, -- in minutes
    completion_rate DECIMAL(3,2) DEFAULT 0.00,
    engagement_score INTEGER DEFAULT 0,
    risk_level VARCHAR(10) DEFAULT 'low', -- low, medium, high
    preferred_notification_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Engagement events tracking
CREATE TABLE IF NOT EXISTS engagement_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'login', 'workout_complete', 'goal_set', etc.
    event_data JSONB,
    session_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notification templates
CREATE TABLE IF NOT EXISTS notification_templates (
    id SERIAL PRIMARY KEY,
    template_key VARCHAR(50) UNIQUE NOT NULL,
    notification_type VARCHAR(20) NOT NULL, -- 'motivation', 'reminder', 'celebration', etc.
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    trigger_condition VARCHAR(100),
    timing_preference VARCHAR(20), -- 'morning', 'afternoon', 'evening', 'optimal'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User notifications sent
CREATE TABLE IF NOT EXISTS user_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    template_id INTEGER REFERENCES notification_templates(id),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(20),
    delivery_method VARCHAR(20), -- 'push', 'email', 'in_app'
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    is_read BOOLEAN DEFAULT false
);

-- Personalized recommendations
CREATE TABLE IF NOT EXISTS user_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(50), -- 'workout', 'nutrition', 'mindfulness'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    confidence_score INTEGER, -- 0-100
    reasoning TEXT,
    is_active BOOLEAN DEFAULT true,
    shown_at TIMESTAMP,
    clicked_at TIMESTAMP,
    dismissed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- A/B testing for engagement features
CREATE TABLE IF NOT EXISTS engagement_experiments (
    id SERIAL PRIMARY KEY,
    experiment_name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User participation in A/B tests
CREATE TABLE IF NOT EXISTS user_experiment_groups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    experiment_id INTEGER REFERENCES engagement_experiments(id) ON DELETE CASCADE,
    group_name VARCHAR(50), -- 'control', 'variant_a', 'variant_b'
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, experiment_id)
);

-- Churn prediction and re-engagement
CREATE TABLE IF NOT EXISTS churn_predictions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    churn_probability DECIMAL(3,2), -- 0.00 to 1.00
    risk_factors JSONB,
    prediction_date DATE DEFAULT CURRENT_DATE,
    re_engagement_campaign_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default notification templates
INSERT INTO notification_templates (template_key, notification_type, title, message, trigger_condition, timing_preference) VALUES
('daily_motivation', 'motivation', 'Your transformation awaits! 💪', 'You''re {streak_days} days into your journey. Every day counts!', 'daily_login', 'morning'),
('streak_reminder', 'reminder', 'Don''t break your streak! 🔥', 'You have {hours_left} hours left to maintain your {streak_days}-day streak', 'streak_risk', 'evening'),
('milestone_celebration', 'celebration', 'Amazing milestone reached! 🎉', 'You''ve completed {milestone} days of consistent progress. You''re unstoppable!', 'milestone_reached', 'optimal'),
('social_proof', 'social', 'Join {active_users} others transforming today! 👥', '{transformations_today} people shared their progress today. What''s your story?', 'community_activity', 'afternoon'),
('comeback_urgency', 'urgency', 'We miss you! Come back now 💔', 'Your {streak_days}-day streak is about to end. One quick session can save it!', 'inactive_user', 'optimal'),
('weekly_summary', 'summary', 'Your amazing week in review! 📊', 'You completed {workouts} workouts and earned {xp} XP this week. Keep it up!', 'weekly_summary', 'morning'),
('goal_reminder', 'reminder', 'Your goal is waiting! 🎯', 'You set a goal to {goal_description}. You''re {progress}% there!', 'goal_progress', 'afternoon');

-- Create indexes for performance
CREATE INDEX idx_user_engagement_user_id ON user_engagement(user_id);
CREATE INDEX idx_user_engagement_risk_level ON user_engagement(risk_level);
CREATE INDEX idx_engagement_events_user_id ON engagement_events(user_id);
CREATE INDEX idx_engagement_events_type ON engagement_events(event_type);
CREATE INDEX idx_engagement_events_date ON engagement_events(created_at);
CREATE INDEX idx_user_notifications_user_id ON user_notifications(user_id);
CREATE INDEX idx_user_notifications_sent ON user_notifications(sent_at);
CREATE INDEX idx_user_recommendations_user_id ON user_recommendations(user_id);
CREATE INDEX idx_user_recommendations_active ON user_recommendations(is_active);
CREATE INDEX idx_churn_predictions_user_id ON churn_predictions(user_id);
CREATE INDEX idx_churn_predictions_probability ON churn_predictions(churn_probability);
