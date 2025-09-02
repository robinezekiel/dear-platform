-- Gamification tables for DEAR platform

-- User XP and Level tracking
CREATE TABLE IF NOT EXISTS user_gamification (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- User streaks tracking
CREATE TABLE IF NOT EXISTS user_streaks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    streak_type VARCHAR(50) NOT NULL, -- 'daily_login', 'workout', 'mindfulness', etc.
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, streak_type)
);

-- Badges and achievements
CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(10), -- emoji or icon identifier
    xp_reward INTEGER DEFAULT 0,
    criteria JSONB, -- conditions for earning the badge
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User badges (earned badges)
CREATE TABLE IF NOT EXISTS user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- Challenges
CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    challenge_type VARCHAR(50), -- 'daily', 'weekly', 'monthly', 'custom'
    start_date DATE,
    end_date DATE,
    target_value INTEGER, -- target number (days, workouts, etc.)
    xp_reward INTEGER DEFAULT 0,
    badge_reward INTEGER REFERENCES badges(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User challenge participation
CREATE TABLE IF NOT EXISTS user_challenges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, challenge_id)
);

-- Rewards store
CREATE TABLE IF NOT EXISTS rewards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cost INTEGER NOT NULL, -- XP cost
    reward_type VARCHAR(50), -- 'feature', 'service', 'discount', 'physical'
    reward_data JSONB, -- specific reward details
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User reward redemptions
CREATE TABLE IF NOT EXISTS user_rewards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reward_id INTEGER REFERENCES rewards(id) ON DELETE CASCADE,
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    used BOOLEAN DEFAULT false
);

-- XP transactions log
CREATE TABLE IF NOT EXISTS xp_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL, -- can be negative for spending
    reason VARCHAR(100),
    reference_type VARCHAR(50), -- 'workout', 'login', 'challenge', 'badge', etc.
    reference_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default badges
INSERT INTO badges (name, description, icon, xp_reward, criteria) VALUES
('Early Bird', 'Login before 7 AM', '🌅', 100, '{"type": "early_login", "time": "07:00"}'),
('Streak Master', 'Maintain 30-day login streak', '🔥', 500, '{"type": "streak", "streak_type": "daily_login", "days": 30}'),
('Fitness Enthusiast', 'Complete 10 workouts in a month', '💪', 300, '{"type": "monthly_activity", "activity": "workout", "count": 10}'),
('Social Star', 'Share 5 progress updates', '⭐', 200, '{"type": "social_activity", "activity": "share", "count": 5}'),
('Zen Master', 'Complete 50 meditation sessions', '🧘', 400, '{"type": "activity_count", "activity": "meditation", "count": 50}'),
('Transformer', 'Complete 30-day transformation challenge', '🦋', 1000, '{"type": "challenge", "challenge_id": 1}');

-- Insert default challenges
INSERT INTO challenges (name, description, challenge_type, start_date, end_date, target_value, xp_reward, is_active) VALUES
('30-Day Transformation', 'Complete daily workouts for 30 days', 'monthly', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 30, 1000, true),
('Weekend Warrior', 'Complete 2 intense workouts this weekend', 'weekly', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 2, 500, true),
('Mindful March', 'Practice mindfulness daily this month', 'monthly', CURRENT_DATE, CURRENT_DATE + INTERVAL '31 days', 31, 800, true);

-- Insert default rewards
INSERT INTO rewards (name, description, cost, reward_type, reward_data, is_available) VALUES
('Premium Feature Access', 'Unlock advanced AI analysis for 1 week', 1000, 'feature', '{"feature": "premium_ai", "duration": 7}', true),
('Personal Trainer Session', 'Free 30-minute session with certified trainer', 2500, 'service', '{"service": "trainer_session", "duration": 30}', true),
('Nutrition Plan Discount', '20% off personalized nutrition plan', 1500, 'discount', '{"discount": 20, "service": "nutrition_plan"}', true),
('DEAR Merchandise', 'Exclusive DEAR t-shirt and water bottle', 3000, 'physical', '{"items": ["t-shirt", "water_bottle"]}', true);

-- Create indexes for performance
CREATE INDEX idx_user_gamification_user_id ON user_gamification(user_id);
CREATE INDEX idx_user_streaks_user_id ON user_streaks(user_id);
CREATE INDEX idx_user_streaks_type ON user_streaks(streak_type);
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX idx_user_challenges_active ON user_challenges(user_id, completed);
CREATE INDEX idx_xp_transactions_user_id ON xp_transactions(user_id);
CREATE INDEX idx_xp_transactions_date ON xp_transactions(created_at);
