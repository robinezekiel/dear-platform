-- DEAR Social Complete Database Schema
-- Implements all four pillars of unbreakable engagement

-- Identity & Affirmations System
CREATE TABLE user_identity_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    primary_identity VARCHAR(100) NOT NULL, -- 'athlete', 'healer', 'transformer'
    identity_strength DECIMAL(3,2) DEFAULT 0.0, -- 0.0 to 1.0
    transformation_stage VARCHAR(50) NOT NULL,
    core_values JSONB DEFAULT '[]',
    identity_reinforcement_count INTEGER DEFAULT 0,
    last_affirmation_generated TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ai_generated_affirmations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    affirmation_text TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'identity', 'progress', 'resilience', 'achievement'
    emotional_tone VARCHAR(50) NOT NULL, -- 'empowering', 'celebrating', 'motivating'
    personalization_factors JSONB DEFAULT '{}',
    effectiveness_score DECIMAL(3,2),
    user_reaction VARCHAR(20), -- 'loved', 'liked', 'neutral', 'disliked'
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Micro-Milestone & Recognition System
CREATE TABLE micro_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    milestone_type VARCHAR(50) NOT NULL, -- 'streak', 'improvement', 'consistency', 'breakthrough'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    detection_method VARCHAR(50) NOT NULL, -- 'ai_analysis', 'user_action', 'system_trigger'
    xp_reward INTEGER DEFAULT 0,
    celebration_level VARCHAR(20) DEFAULT 'small', -- 'small', 'medium', 'large'
    is_celebrated BOOLEAN DEFAULT FALSE,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    celebrated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE celebration_animations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_id UUID REFERENCES micro_milestones(id) ON DELETE CASCADE,
    animation_type VARCHAR(50) NOT NULL,
    duration_ms INTEGER DEFAULT 3000,
    visual_effects JSONB DEFAULT '{}',
    sound_effects JSONB DEFAULT '{}',
    haptic_feedback JSONB DEFAULT '{}'
);

-- AI Content Feed & Discovery System
CREATE TABLE content_feed_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL, -- 'article', 'video', 'success_story', 'tip', 'challenge'
    title VARCHAR(300) NOT NULL,
    description TEXT,
    content_url TEXT,
    thumbnail_url TEXT,
    author_id UUID REFERENCES users(id),
    author_name VARCHAR(100),
    author_role VARCHAR(100),
    tags JSONB DEFAULT '[]',
    estimated_read_time INTEGER,
    engagement_stats JSONB DEFAULT '{"likes": 0, "comments": 0, "shares": 0}',
    content_quality_score DECIMAL(3,2) DEFAULT 0.5,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE personalized_content_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_id UUID REFERENCES content_feed_items(id) ON DELETE CASCADE,
    personalization_score DECIMAL(3,2) NOT NULL, -- 0.0 to 1.0
    recommendation_reason TEXT,
    user_interests_match JSONB DEFAULT '{}',
    behavioral_signals JSONB DEFAULT '{}',
    is_recommended BOOLEAN DEFAULT FALSE,
    shown_at TIMESTAMP WITH TIME ZONE,
    interacted_at TIMESTAMP WITH TIME ZONE,
    interaction_type VARCHAR(50), -- 'viewed', 'liked', 'shared', 'saved', 'dismissed'
    UNIQUE(user_id, content_id)
);

-- Advanced Group Matching & Social System
CREATE TABLE ai_group_matching (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    matching_criteria JSONB NOT NULL, -- goals, challenges, demographics, interests
    compatibility_factors JSONB DEFAULT '{}',
    preferred_group_size INTEGER DEFAULT 5,
    communication_style VARCHAR(50), -- 'supportive', 'motivational', 'analytical'
    availability_schedule JSONB DEFAULT '{}',
    matching_status VARCHAR(50) DEFAULT 'active', -- 'active', 'matched', 'paused'
    last_matching_attempt TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE smart_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_name VARCHAR(200) NOT NULL,
    group_type VARCHAR(50) NOT NULL, -- 'accountability', 'support', 'challenge', 'learning'
    matching_algorithm_version VARCHAR(20),
    group_dynamics_score DECIMAL(3,2) DEFAULT 0.5,
    activity_level VARCHAR(50) DEFAULT 'moderate',
    success_metrics JSONB DEFAULT '{}',
    auto_moderation_enabled BOOLEAN DEFAULT TRUE,
    max_members INTEGER DEFAULT 8,
    current_members INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE group_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES smart_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- 'member', 'moderator', 'mentor'
    engagement_score DECIMAL(3,2) DEFAULT 0.5,
    contribution_quality DECIMAL(3,2) DEFAULT 0.5,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'left'
    UNIQUE(group_id, user_id)
);

-- Viral Growth & Sharing System
CREATE TABLE viral_content_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(100) NOT NULL,
    template_type VARCHAR(50) NOT NULL, -- 'transformation_report', 'achievement_share', 'progress_update'
    visual_template JSONB NOT NULL,
    text_template TEXT NOT NULL,
    sharing_platforms JSONB DEFAULT '["instagram", "facebook", "twitter", "linkedin"]',
    conversion_rate DECIMAL(5,4) DEFAULT 0.0,
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE user_shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID, -- references various content tables
    template_id UUID REFERENCES viral_content_templates(id),
    platform VARCHAR(50) NOT NULL,
    share_url TEXT,
    engagement_metrics JSONB DEFAULT '{}',
    referral_conversions INTEGER DEFAULT 0,
    viral_coefficient DECIMAL(5,4) DEFAULT 0.0,
    shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Behavioral Analytics & Engagement Tracking
CREATE TABLE user_engagement_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    session_duration INTEGER, -- in seconds
    pages_visited JSONB DEFAULT '[]',
    actions_taken JSONB DEFAULT '[]',
    engagement_score DECIMAL(3,2),
    addiction_indicators JSONB DEFAULT '{}', -- positive addiction metrics
    exit_trigger VARCHAR(100),
    device_info JSONB DEFAULT '{}'
);

CREATE TABLE engagement_optimization_experiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_name VARCHAR(200) NOT NULL,
    experiment_type VARCHAR(50) NOT NULL, -- 'a_b_test', 'multivariate', 'feature_flag'
    target_metric VARCHAR(100) NOT NULL,
    control_group_size INTEGER,
    test_group_size INTEGER,
    experiment_config JSONB NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    results JSONB DEFAULT '{}',
    statistical_significance DECIMAL(5,4),
    status VARCHAR(20) DEFAULT 'running' -- 'running', 'completed', 'paused'
);

-- Indexes for optimal performance
CREATE INDEX idx_user_identity_profiles_user_id ON user_identity_profiles(user_id);
CREATE INDEX idx_ai_generated_affirmations_user_id ON ai_generated_affirmations(user_id);
CREATE INDEX idx_micro_milestones_user_id ON micro_milestones(user_id);
CREATE INDEX idx_micro_milestones_detected_at ON micro_milestones(detected_at DESC);
CREATE INDEX idx_content_feed_items_content_type ON content_feed_items(content_type);
CREATE INDEX idx_personalized_content_scores_user_id ON personalized_content_scores(user_id);
CREATE INDEX idx_personalized_content_scores_score ON personalized_content_scores(personalization_score DESC);
CREATE INDEX idx_group_memberships_user_id ON group_memberships(user_id);
CREATE INDEX idx_group_memberships_group_id ON group_memberships(group_id);
CREATE INDEX idx_user_shares_user_id ON user_shares(user_id);
CREATE INDEX idx_user_engagement_sessions_user_id ON user_engagement_sessions(user_id);
CREATE INDEX idx_user_engagement_sessions_start ON user_engagement_sessions(session_start DESC);

-- Materialized views for analytics
CREATE MATERIALIZED VIEW user_engagement_summary AS
SELECT 
    u.id as user_id,
    u.email,
    COUNT(DISTINCT ues.id) as total_sessions,
    AVG(ues.session_duration) as avg_session_duration,
    AVG(ues.engagement_score) as avg_engagement_score,
    COUNT(DISTINCT mm.id) as total_milestones,
    COUNT(DISTINCT us.id) as total_shares,
    MAX(ues.session_start) as last_active
FROM users u
LEFT JOIN user_engagement_sessions ues ON u.id = ues.user_id
LEFT JOIN micro_milestones mm ON u.id = mm.user_id
LEFT JOIN user_shares us ON u.id = us.user_id
GROUP BY u.id, u.email;

CREATE UNIQUE INDEX idx_user_engagement_summary_user_id ON user_engagement_summary(user_id);
