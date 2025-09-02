#!/usr/bin/env node

const { neon } = require("@neondatabase/serverless")

async function seedDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is required")
    process.exit(1)
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    console.log("🌱 Starting database seeding...")

    // Check if data already exists
    const [existingExercises] = await sql`SELECT COUNT(*) as count FROM exercises`

    if (existingExercises.count > 0) {
      console.log("📊 Database already contains data, skipping seed...")
      return
    }

    console.log("📄 Seeding exercises...")
    await sql`
      INSERT INTO exercises (name, category, muscle_groups, equipment_needed, difficulty_level, instructions) VALUES
      ('Push-ups', 'chest', ARRAY['chest', 'shoulders', 'triceps'], ARRAY['bodyweight'], 'beginner', 'Start in plank position, lower body to ground, push back up'),
      ('Squats', 'legs', ARRAY['quadriceps', 'glutes', 'hamstrings'], ARRAY['bodyweight'], 'beginner', 'Stand with feet shoulder-width apart, lower hips back and down, return to standing'),
      ('Deadlifts', 'back', ARRAY['hamstrings', 'glutes', 'lower back'], ARRAY['barbell'], 'intermediate', 'Stand with feet hip-width apart, hinge at hips to lower bar, return to standing'),
      ('Plank', 'core', ARRAY['core', 'shoulders'], ARRAY['bodyweight'], 'beginner', 'Hold body in straight line from head to heels'),
      ('Burpees', 'cardio', ARRAY['full body'], ARRAY['bodyweight'], 'advanced', 'Squat down, jump back to plank, do push-up, jump feet to hands, jump up'),
      ('Pull-ups', 'back', ARRAY['lats', 'biceps', 'rhomboids'], ARRAY['pull-up bar'], 'intermediate', 'Hang from bar, pull body up until chin clears bar'),
      ('Lunges', 'legs', ARRAY['quadriceps', 'glutes', 'hamstrings'], ARRAY['bodyweight'], 'beginner', 'Step forward, lower hips until both knees at 90 degrees'),
      ('Mountain Climbers', 'cardio', ARRAY['core', 'shoulders', 'legs'], ARRAY['bodyweight'], 'intermediate', 'Start in plank, alternate bringing knees to chest rapidly')
    `

    console.log("📄 Seeding recipes...")
    await sql`
      INSERT INTO recipes (name, description, ingredients, instructions, prep_time_minutes, cook_time_minutes, servings, difficulty_level, cuisine_type, dietary_tags, calories_per_serving, protein_per_serving, carbs_per_serving, fat_per_serving) VALUES
      ('Grilled Chicken Salad', 'Healthy protein-packed salad', 
       '{"chicken breast": "200g", "mixed greens": "100g", "cherry tomatoes": "50g", "cucumber": "50g", "olive oil": "1 tbsp"}',
       'Grill chicken breast, slice and serve over mixed greens with vegetables',
       15, 10, 1, 'easy', 'mediterranean', ARRAY['high_protein', 'low_carb'], 350, 35.0, 8.0, 18.0),
      ('Overnight Oats', 'Easy breakfast prep', 
       '{"rolled oats": "50g", "almond milk": "200ml", "chia seeds": "1 tbsp", "banana": "1 medium", "honey": "1 tsp"}',
       'Mix all ingredients, refrigerate overnight, enjoy cold',
       5, 0, 1, 'easy', 'american', ARRAY['vegetarian', 'high_fiber'], 280, 8.0, 45.0, 6.0),
      ('Quinoa Buddha Bowl', 'Nutritious complete meal',
       '{"quinoa": "100g", "chickpeas": "100g", "avocado": "1/2 medium", "sweet potato": "150g", "tahini": "2 tbsp"}',
       'Cook quinoa and roast sweet potato, combine with chickpeas and avocado, drizzle with tahini',
       20, 25, 1, 'medium', 'mediterranean', ARRAY['vegan', 'high_protein', 'gluten_free'], 520, 18.0, 65.0, 22.0)
    `

    console.log("📄 Seeding providers...")
    await sql`
      INSERT INTO providers (name, title, specialties, credentials, bio, years_experience, languages, consultation_types, hourly_rate, location_city, location_state, is_verified, rating, total_reviews) VALUES
      ('Dr. Sarah Johnson', 'Licensed Clinical Psychologist', ARRAY['anxiety', 'depression', 'trauma'], ARRAY['PhD Psychology', 'Licensed Psychologist'], 'Specializing in cognitive behavioral therapy with 10+ years experience', 12, ARRAY['English', 'Spanish'], ARRAY['video', 'phone'], 150.00, 'Los Angeles', 'CA', true, 4.8, 127),
      ('Marcus Williams', 'Certified Personal Trainer', ARRAY['weight_loss', 'strength_training', 'nutrition'], ARRAY['NASM-CPT', 'Nutrition Specialist'], 'Helping clients achieve their fitness goals through personalized training', 8, ARRAY['English'], ARRAY['video', 'in_person'], 75.00, 'New York', 'NY', true, 4.9, 89),
      ('Dr. Emily Chen', 'Registered Dietitian', ARRAY['nutrition', 'weight_management', 'eating_disorders'], ARRAY['RD', 'MS Nutrition'], 'Evidence-based nutrition counseling for sustainable lifestyle changes', 6, ARRAY['English', 'Mandarin'], ARRAY['video', 'phone'], 120.00, 'San Francisco', 'CA', true, 4.7, 156),
      ('Dr. Michael Rodriguez', 'Addiction Counselor', ARRAY['addiction_recovery', 'substance_abuse', 'mental_health'], ARRAY['LCDC', 'MA Counseling'], 'Compassionate support for addiction recovery and mental wellness', 15, ARRAY['English', 'Spanish'], ARRAY['video', 'phone', 'in_person'], 130.00, 'Austin', 'TX', true, 4.9, 203)
    `

    console.log("📄 Seeding support groups...")
    await sql`
      INSERT INTO support_groups (name, description, category, created_at) VALUES
      ('Weight Loss Warriors', 'Support group for people on their weight loss journey', 'weight_loss', CURRENT_TIMESTAMP),
      ('Addiction Recovery Circle', 'Safe space for those in recovery from addiction', 'addiction_recovery', CURRENT_TIMESTAMP),
      ('Mental Health Matters', 'Community support for mental health and wellness', 'mental_health', CURRENT_TIMESTAMP),
      ('Fitness Beginners', 'Encouragement and tips for fitness newcomers', 'fitness', CURRENT_TIMESTAMP),
      ('Mindful Living', 'Practicing mindfulness and meditation together', 'mindfulness', CURRENT_TIMESTAMP),
      ('Nutrition Nerds', 'Sharing healthy recipes and nutrition tips', 'nutrition', CURRENT_TIMESTAMP)
    `

    console.log("📄 Seeding challenges...")
    await sql`
      INSERT INTO challenges (title, description, challenge_type, goal_metric, goal_value, start_date, end_date, reward_points, participants_count, is_active) VALUES
      ('30-Day Step Challenge', 'Walk 10,000 steps daily for 30 days', 'fitness', 'daily_steps', 10000, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 500, 234, true),
      ('Mindful March', 'Meditate for 10 minutes daily throughout March', 'mindfulness', 'meditation_minutes', 10, CURRENT_DATE, CURRENT_DATE + INTERVAL '31 days', 300, 156, true),
      ('Hydration Hero', 'Drink 8 glasses of water daily for 2 weeks', 'nutrition', 'water_glasses', 8, CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days', 200, 89, true),
      ('Strength Builder', 'Complete 3 strength workouts per week for 4 weeks', 'fitness', 'weekly_workouts', 3, CURRENT_DATE, CURRENT_DATE + INTERVAL '28 days', 400, 67, true)
    `

    console.log("🎉 Database seeding completed successfully!")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

seedDatabase()
