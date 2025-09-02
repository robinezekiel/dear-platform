import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  date_of_birth?: string
  gender?: string
  phone?: string
  profile_image_url?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  height_cm?: number
  weight_kg?: number
  activity_level?: string
  transformation_goals?: string[]
  health_conditions?: string[]
  medications?: string[]
  dietary_restrictions?: string[]
  fitness_experience?: string
  mental_health_goals?: string[]
  addiction_recovery_status?: string
  sobriety_date?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  created_at: string
  updated_at: string
}

export class DatabaseService {
  // User operations
  static async createUser(userData: {
    email: string
    password_hash: string
    first_name: string
    last_name: string
    date_of_birth?: string
    gender?: string
    phone?: string
  }): Promise<User> {
    const [user] = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, date_of_birth, gender, phone)
      VALUES (${userData.email}, ${userData.password_hash}, ${userData.first_name}, ${userData.last_name}, 
              ${userData.date_of_birth || null}, ${userData.gender || null}, ${userData.phone || null})
      RETURNING *
    `
    return user as User
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await sql`
      SELECT * FROM users WHERE email = ${email} AND is_active = true
    `
    return (user as User) || null
  }

  static async getUserById(id: string): Promise<User | null> {
    const [user] = await sql`
      SELECT * FROM users WHERE id = ${id} AND is_active = true
    `
    return (user as User) || null
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = $${key}`)
      .join(", ")

    const [user] = await sql`
      UPDATE users 
      SET ${sql.unsafe(setClause)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return user as User
  }

  // User Profile operations
  static async createUserProfile(profileData: {
    user_id: string
    height_cm?: number
    weight_kg?: number
    activity_level?: string
    transformation_goals?: string[]
    health_conditions?: string[]
    medications?: string[]
    dietary_restrictions?: string[]
    fitness_experience?: string
    mental_health_goals?: string[]
    addiction_recovery_status?: string
    sobriety_date?: string
    emergency_contact_name?: string
    emergency_contact_phone?: string
  }): Promise<UserProfile> {
    const [profile] = await sql`
      INSERT INTO user_profiles (
        user_id, height_cm, weight_kg, activity_level, transformation_goals,
        health_conditions, medications, dietary_restrictions, fitness_experience,
        mental_health_goals, addiction_recovery_status, sobriety_date,
        emergency_contact_name, emergency_contact_phone
      )
      VALUES (
        ${profileData.user_id}, ${profileData.height_cm || null}, ${profileData.weight_kg || null},
        ${profileData.activity_level || null}, ${profileData.transformation_goals || null},
        ${profileData.health_conditions || null}, ${profileData.medications || null},
        ${profileData.dietary_restrictions || null}, ${profileData.fitness_experience || null},
        ${profileData.mental_health_goals || null}, ${profileData.addiction_recovery_status || null},
        ${profileData.sobriety_date || null}, ${profileData.emergency_contact_name || null},
        ${profileData.emergency_contact_phone || null}
      )
      RETURNING *
    `
    return profile as UserProfile
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const [profile] = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `
    return (profile as UserProfile) || null
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const setClause = Object.keys(updates)
      .filter((key) => key !== "user_id" && key !== "id")
      .map((key) => `${key} = $${key}`)
      .join(", ")

    const [profile] = await sql`
      UPDATE user_profiles 
      SET ${sql.unsafe(setClause)}, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId}
      RETURNING *
    `
    return profile as UserProfile
  }

  // Health metrics
  static async addHealthMetric(data: {
    user_id: string
    metric_type: string
    value: number
    unit: string
    source?: string
  }) {
    const [metric] = await sql`
      INSERT INTO health_metrics (user_id, metric_type, value, unit, source)
      VALUES (${data.user_id}, ${data.metric_type}, ${data.value}, ${data.unit}, ${data.source || "manual"})
      RETURNING *
    `
    return metric
  }

  static async getHealthMetrics(userId: string, metricType?: string) {
    if (metricType) {
      return await sql`
        SELECT * FROM health_metrics 
        WHERE user_id = ${userId} AND metric_type = ${metricType}
        ORDER BY recorded_at DESC
        LIMIT 50
      `
    }
    return await sql`
      SELECT * FROM health_metrics 
      WHERE user_id = ${userId}
      ORDER BY recorded_at DESC
      LIMIT 100
    `
  }
}
