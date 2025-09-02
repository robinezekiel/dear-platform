-- Hall of Fame table for celebrating user achievements
CREATE TABLE IF NOT EXISTS hall_of_fame (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('transformation', 'sports', 'mental_health', 'community')),
  milestone TEXT NOT NULL,
  before_image TEXT,
  after_image TEXT,
  story TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  date_achieved DATE NOT NULL,
  tier VARCHAR(20) DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_hall_of_fame_category ON hall_of_fame(category);
CREATE INDEX IF NOT EXISTS idx_hall_of_fame_approved ON hall_of_fame(is_approved);
CREATE INDEX IF NOT EXISTS idx_hall_of_fame_created_at ON hall_of_fame(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hall_of_fame_user_id ON hall_of_fame(user_id);

-- Hall of Fame likes tracking
CREATE TABLE IF NOT EXISTS hall_of_fame_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hall_of_fame_id UUID NOT NULL REFERENCES hall_of_fame(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(hall_of_fame_id, user_id)
);

-- Update trigger for hall_of_fame
CREATE OR REPLACE FUNCTION update_hall_of_fame_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hall_of_fame_updated_at
  BEFORE UPDATE ON hall_of_fame
  FOR EACH ROW
  EXECUTE FUNCTION update_hall_of_fame_updated_at();
