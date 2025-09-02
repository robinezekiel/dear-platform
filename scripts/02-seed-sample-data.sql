-- DEAR Platform Sample Data
-- This populates the database with realistic sample data for development

-- Insert sample exercises
INSERT INTO exercises (name, category, muscle_groups, equipment_needed, difficulty_level, instructions) VALUES
('Push-ups', 'chest', ARRAY['chest', 'shoulders', 'triceps'], ARRAY['bodyweight'], 'beginner', 'Start in plank position, lower body to ground, push back up'),
('Squats', 'legs', ARRAY['quadriceps', 'glutes', 'hamstrings'], ARRAY['bodyweight'], 'beginner', 'Stand with feet shoulder-width apart, lower hips back and down, return to standing'),
('Deadlifts', 'back', ARRAY['hamstrings', 'glutes', 'lower back'], ARRAY['barbell'], 'intermediate', 'Stand with feet hip-width apart, hinge at hips to lower bar, return to standing'),
('Plank', 'core', ARRAY['core', 'shoulders'], ARRAY['bodyweight'], 'beginner', 'Hold body in straight line from head to heels'),
('Burpees', 'cardio', ARRAY['full body'], ARRAY['bodyweight'], 'advanced', 'Squat down, jump back to plank, do push-up, jump feet to hands, jump up');

-- Insert sample recipes
INSERT INTO recipes (name, description, ingredients, instructions, prep_time_minutes, cook_time_minutes, servings, difficulty_level, cuisine_type, dietary_tags, calories_per_serving, protein_per_serving, carbs_per_serving, fat_per_serving) VALUES
('Grilled Chicken Salad', 'Healthy protein-packed salad', 
 '{"chicken breast": "200g", "mixed greens": "100g", "cherry tomatoes": "50g", "cucumber": "50g", "olive oil": "1 tbsp"}',
 'Grill chicken breast, slice and serve over mixed greens with vegetables',
 15, 10, 1, 'easy', 'mediterranean', ARRAY['high_protein', 'low_carb'], 350, 35.0, 8.0, 18.0),
('Overnight Oats', 'Easy breakfast prep', 
 '{"rolled oats": "50g", "almond milk": "200ml", "chia seeds": "1 tbsp", "banana": "1 medium", "honey": "1 tsp"}',
 'Mix all ingredients, refrigerate overnight, enjoy cold',
 5, 0, 1, 'easy', 'american', ARRAY['vegetarian', 'high_fiber'], 280, 8.0, 45.0, 6.0);

-- Insert sample providers
INSERT INTO providers (name, title, specialties, credentials, bio, years_experience, languages, consultation_types, hourly_rate, location_city, location_state, is_verified, rating, total_reviews) VALUES
('Dr. Sarah Johnson', 'Licensed Clinical Psychologist', ARRAY['anxiety', 'depression', 'trauma'], ARRAY['PhD Psychology', 'Licensed Psychologist'], 'Specializing in cognitive behavioral therapy with 10+ years experience', 12, ARRAY['English', 'Spanish'], ARRAY['video', 'phone'], 150.00, 'Los Angeles', 'CA', true, 4.8, 127),
('Marcus Williams', 'Certified Personal Trainer', ARRAY['weight_loss', 'strength_training', 'nutrition'], ARRAY['NASM-CPT', 'Nutrition Specialist'], 'Helping clients achieve their fitness goals through personalized training', 8, ARRAY['English'], ARRAY['video', 'in_person'], 75.00, 'New York', 'NY', true, 4.9, 89),
('Dr. Emily Chen', 'Registered Dietitian', ARRAY['nutrition', 'weight_management', 'eating_disorders'], ARRAY['RD', 'MS Nutrition'], 'Evidence-based nutrition counseling for sustainable lifestyle changes', 6, ARRAY['English', 'Mandarin'], ARRAY['video', 'phone'], 120.00, 'San Francisco', 'CA', true, 4.7, 156);

-- Insert sample support groups
INSERT INTO support_groups (name, description, category, created_at) VALUES
('Weight Loss Warriors', 'Support group for people on their weight loss journey', 'weight_loss', CURRENT_TIMESTAMP),
('Addiction Recovery Circle', 'Safe space for those in recovery from addiction', 'addiction_recovery', CURRENT_TIMESTAMP),
('Mental Health Matters', 'Community support for mental health and wellness', 'mental_health', CURRENT_TIMESTAMP),
('Fitness Beginners', 'Encouragement and tips for fitness newcomers', 'fitness', CURRENT_TIMESTAMP);

-- Insert sample challenges
INSERT INTO challenges (title, description, challenge_type, goal_metric, goal_value, start_date, end_date, reward_points, participants_count, is_active) VALUES
('30-Day Step Challenge', 'Walk 10,000 steps daily for 30 days', 'fitness', 'daily_steps', 10000, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 500, 234, true),
('Mindful March', 'Meditate for 10 minutes daily throughout March', 'mindfulness', 'meditation_minutes', 10, CURRENT_DATE, CURRENT_DATE + INTERVAL '31 days', 300, 156, true),
('Hydration Hero', 'Drink 8 glasses of water daily for 2 weeks', 'nutrition', 'water_glasses', 8, CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days', 200, 89, true);
