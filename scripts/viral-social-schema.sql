-- Viral social features and referral system tables

-- Referral system
CREATE TABLE IF NOT EXISTS referral_codes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    total_referrals INTEGER DEFAULT 0,
    successful_signups INTEGER DEFAULT 0,
    total_earned INTEGER DEFAULT 0, -- XP earned from referrals
    current_tier VARCHAR(20) DEFAULT 'Starter',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Referral tracking
CREATE TABLE IF NOT EXISTS referrals (
    id SERIAL PRIMARY KEY,
    referrer_code VARCHAR(50) REFERENCES referral_codes(referral_code),
    referred_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    signup_completed BOOLEAN DEFAULT false,
    rewards_awarded BOOLEAN DEFAULT false,
    referral_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    signup_date TIMESTAMP,
    UNIQUE(referred_user_id)
);

-- Viral content
CREATE TABLE IF NOT EXISTS viral_content (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(50), -- 'transformation', 'achievement', 'challenge', 'milestone'
    title VARCHAR(200),
    content TEXT NOT NULL,
    media_urls JSONB, -- array of image/video URLs
    hashtags JSONB, -- array of hashtags
    engagement_score INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    virality_score INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social challenges
CREATE TABLE IF NOT EXISTS social_challenges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hashtag VARCHAR(50),
    challenge_type VARCHAR(50), -- 'transformation', 'fitness', 'mindfulness'
    start_date DATE,
    end_date DATE,
    participant_count INTEGER DEFAULT 0,
    reward_data JSONB, -- challenge rewards
    is_trending BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenge participation
CREATE TABLE IF NOT EXISTS challenge_participants (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    challenge_id INTEGER REFERENCES social_challenges(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT false,
    completion_date TIMESTAMP,
    content_shared INTEGER DEFAULT 0,
    UNIQUE(user_id, challenge_id)
);

-- Social shares tracking
CREATE TABLE IF NOT EXISTS social_shares (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content_id INTEGER REFERENCES viral_content(id) ON DELETE CASCADE,
    platform VARCHAR(50), -- 'facebook', 'twitter', 'instagram', 'whatsapp'
    share_url TEXT,
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Viral metrics tracking
CREATE TABLE IF NOT EXISTS viral_metrics (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES viral_content(id) ON DELETE CASCADE,
    metric_type VARCHAR(50), -- 'view', 'share', 'like', 'comment', 'click'
    user_id INTEGER REFERENCES users(id),
    platform VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Influencer program
CREATE TABLE IF NOT EXISTS influencers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tier VARCHAR(20) DEFAULT 'Micro', -- 'Micro', 'Macro', 'Mega'
    follower_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(4,3) DEFAULT 0.000,
    total_referrals INTEGER DEFAULT 0,
    revenue_share_rate DECIMAL(4,3) DEFAULT 0.000,
    is_active BOOLEAN DEFAULT true,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Viral campaigns
CREATE TABLE IF NOT EXISTS viral_campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    campaign_type VARCHAR(50), -- 'referral_boost', 'challenge', 'ugc'
    start_date DATE,
    end_date DATE,
    target_metrics JSONB, -- target shares, participants, etc.
    actual_metrics JSONB, -- actual results
    budget INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User social profiles
CREATE TABLE IF NOT EXISTS user_social_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50), -- 'facebook', 'twitter', 'instagram', 'tiktok'
    profile_url TEXT,
    follower_count INTEGER DEFAULT 0,
    is_connected BOOLEAN DEFAULT false,
    last_sync TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, platform)
);

-- Insert default referral tiers
INSERT INTO referral_codes (user_id, referral_code, current_tier) VALUES
(1, 'DEAR-DEMO-2024', 'Starter');

-- Insert sample social challenges
INSERT INTO social_challenges (name, description, hashtag, challenge_type, start_date, end_date, reward_data, is_trending, is_active) VALUES
('March Transformation Challenge', '30 days to transform your health and wellness', '#MarchTransformation', 'transformation', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '{"xp": 1000, "badge": "Transformer", "premium_trial": 7}', true, true),
('Weekend Warrior Challenge', 'Intense weekend workouts for maximum results', '#WeekendWarrior', 'fitness', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', '{"xp": 500, "badge": "Weekend Warrior"}', false, true),
('Mindful March', 'Daily mindfulness practice throughout March', '#MindfulMarch', 'mindfulness', CURRENT_DATE, CURRENT_DATE + INTERVAL '31 days', '{"xp": 800, "badge": "Zen Master"}', true, true);

-- Insert sample viral content templates
INSERT INTO viral_content (user_id, content_type, title, content, hashtags, engagement_score, is_featured) VALUES
(1, 'transformation', '30-Day Transformation Results', 'Just completed my 30-day transformation with @DEARHealth! The results speak for themselves 💪 #TransformationTuesday #DEARHealth', '["TransformationTuesday", "DEARHealth", "HealthJourney"]', 85, true),
(1, 'achievement', 'Level 10 Achieved!', '🎉 Just reached Level 10 on @DEARHealth! The gamification keeps me motivated every day. Use code DEAR-DEMO-2024 to join me! #Achievement #DEARHealth', '["Achievement", "DEARHealth", "LevelUp"]', 78, false);

-- Create indexes for performance
CREATE INDEX idx_referral_codes_user_id ON referral_codes(user_id);
CREATE INDEX idx_referral_codes_code ON referral_codes(referral_code);
CREATE INDEX idx_referrals_referrer_code ON referrals(referrer_code);
CREATE INDEX idx_referrals_referred_user ON referrals(referred_user_id);
CREATE INDEX idx_viral_content_user_id ON viral_content(user_id);
CREATE INDEX idx_viral_content_type ON viral_content(content_type);
CREATE INDEX idx_viral_content_virality ON viral_content(virality_score DESC);
CREATE INDEX idx_social_challenges_active ON social_challenges(is_active, is_trending);
CREATE INDEX idx_challenge_participants_user_id ON challenge_participants(user_id);
CREATE INDEX idx_challenge_participants_challenge_id ON challenge_participants(challenge_id);
CREATE INDEX idx_viral_metrics_content_id ON viral_metrics(content_id);
CREATE INDEX idx_viral_metrics_type ON viral_metrics(metric_type);
CREATE INDEX idx_social_shares_user_id ON social_shares(user_id);
CREATE INDEX idx_social_shares_platform ON social_shares(platform);
