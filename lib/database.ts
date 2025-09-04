import type { TemplateStringsArray } from "typescript";

// ---- LAZY Neon init (no DB at import/build time) ---------------------------
type NeonSql = (strings: TemplateStringsArray, ...params: any[]) => Promise<any>;
let _sql: NeonSql | null = null;

async function getSql(): Promise<NeonSql> {
  if (_sql) return _sql;

  const url = process.env.DATABASE_URL;
  if (!url) {
    // No DB configured in this environment (e.g., Vercel preview/build).
    // We throw here; API routes should catch and return a safe response.
    throw new Error("DATABASE_URL is not set");
  }

  const { neon } = await import("@neondatabase/serverless");
  _sql = neon(url);
  return _sql;
}
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  phone?: string;
  profile_image_url?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  height_cm?: number;
  weight_kg?: number;
  activity_level?: string;
  transformation_goals?: string[];
  health_conditions?: string[];
  medications?: string[];
  dietary_restrictions?: string[];
  fitness_experience?: string;
  mental_health_goals?: string[];
  addiction_recovery_status?: string;
  sobriety_date?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at: string;
  updated_at: string;
}

export class DatabaseService {
  // -------------------- User operations --------------------

  static async createUser(userData: {
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    gender?: string;
    phone?: string;
  }): Promise<User> {
    const sql = await getSql();
    const [user] = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, date_of_birth, gender, phone)
      VALUES (
        ${userData.email},
        ${userData.password_hash},
        ${userData.first_name},
        ${userData.last_name},
        ${userData.date_of_birth || null},  -- (fixed stray "F")
        ${userData.gender || null},
        ${userData.phone || null}
      )
      RETURNING *
    `;
    return user as User;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const sql = await getSql();
    const [user] = await sql`
      SELECT * FROM users WHERE email = ${email} AND is_active = true
    `;
    return (user as User) || null;
  }

  static async getUserById(id: string): Promise<User | null> {
    const sql = await getSql();
    const [user] = await sql`
      SELECT * FROM users WHERE id = ${id} AND is_active = true
    `;
    return (user as User) || null;
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const sql = await getSql();

    // Build a dynamic UPDATE safely. We’ll only include known columns.
    const allowed: (keyof User)[] = [
      "email",
      "password_hash",
      "first_name",
      "last_name",
      "date_of_birth",
      "gender",
      "phone",
      "profile_image_url",
      "is_verified",
      "is_active",
    ];

    const entries = Object.entries(updates).filter(([k, v]) => allowed.includes(k as keyof User));
    if (entries.length === 0) {
      const [u] = await sql`SELECT * FROM users WHERE id = ${id}`;
      return u as User;
    }

    // Construct: SET col1 = ${val1}, col2 = ${val2}, ...
    const setFragments: any[] = [];
    for (const [k, v] of entries) {
      // @ts-ignore: template tag accepts strings
      setFragments.push(sql`${sql.unsafe(k)} = ${v}`);
    }

    // Join with commas inside a single SET clause
    // @ts-ignore
    const [user] = await sql`
      UPDATE users
      SET ${sql.join(setFragments, sql`, `)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return user as User;
  }

  // ----------------- User Profile operations -----------------

  static async createUserProfile(profileData: {
    user_id: string;
    height_cm?: number;
    weight_kg?: number;
    activity_level?: string;
    transformation_goals?: string[];
    health_conditions?: string[];
    medications?: string[];
    dietary_restrictions?: string[];
    fitness_experience?: string;
    mental_health_goals?: string[];
    addiction_recovery_status?: string;
    sobriety_date?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
  }): Promise<UserProfile> {
    const sql = await getSql();
    const [profile] = await sql`
      INSERT INTO user_profiles (
        user_id, height_cm, weight_kg, activity_level, transformation_goals,
        health_conditions, medications, dietary_restrictions, fitness_experience,
        mental_health_goals, addiction_recovery_status, sobriety_date,
        emergency_contact_name, emergency_contact_phone
      )
      VALUES (
        ${profileData.user_id},
        ${profileData.height_cm || null},
        ${profileData.weight_kg || null},
        ${profileData.activity_level || null},
        ${profileData.transformation_goals || null},
        ${profileData.health_conditions || null},
        ${profileData.medications || null},
        ${profileData.dietary_restrictions || null},
        ${profileData.fitness_experience || null},
        ${profileData.mental_health_goals || null},
        ${profileData.addiction_recovery_status || null},
        ${profileData.sobriety_date || null},
        ${profileData.emergency_contact_name || null},
        ${profileData.emergency_contact_phone || null}
      )
      RETURNING *
    `;
    return profile as UserProfile;
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const sql = await getSql();
    const [profile] = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;
    return (profile as UserProfile) || null;
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const sql = await getSql();

    const disallowed = new Set(["user_id", "id"]);
    const allowedKeys = Object.keys(updates).filter((k) => !disallowed.has(k));

    if (allowedKeys.length === 0) {
      const [p] = await sql`SELECT * FROM user_profiles WHERE user_id = ${userId}`;
      return p as UserProfile;
    }

    const setFragments: any[] = [];
    for (const k of allowedKeys) {
      // @ts-ignore
      setFragments.push(sql`${sql.unsafe(k)} = ${ (updates as any)[k] }`);
    }

    // @ts-ignore
    const [profile] = await sql`
      UPDATE user_profiles
      SET ${sql.join(setFragments, sql`, `)}, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId}
      RETURNING *
    `;
    return profile as UserProfile;
  }

  // --------------------- Health metrics ----------------------

  static async addHealthMetric(data: {
    user_id: string;
    metric_type: string;
    value: number;
    unit: string;
    source?: string;
  }) {
    const sql = await getSql();
    const [metric] = await sql`
      INSERT INTO health_metrics (user_id, metric_type, value, unit, source)
      VALUES (
        ${data.user_id},
        ${data.metric_type},
        ${data.value},
        ${data.unit},
        ${data.source || "manual"}
      )
      RETURNING *
    `;
    return metric;
  }

  static async getHealthMetrics(userId: string, metricType?: string) {
    const sql = await getSql();

    if (metricType) {
      return await sql`
        SELECT * FROM health_metrics
        WHERE user_id = ${userId} AND metric_type = ${metricType}
        ORDER BY recorded_at DESC
        LIMIT 50
      `;
    }

    return await sql`
      SELECT * FROM health_metrics
      WHERE user_id = ${userId}
      ORDER BY recorded_at DESC
      LIMIT 100
    `;
  }
}