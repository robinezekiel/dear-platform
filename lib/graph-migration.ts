import { neo4jClient } from "./neo4j-client"
import { sql } from "./database"

export class GraphMigration {
  async migrateUsers(): Promise<void> {
    console.log("[v0] Starting user migration to Neo4j...")

    const users = await sql`
      SELECT id, email, name, created_at, interests, fitness_level, goals
      FROM users
    `

    for (const user of users) {
      await neo4jClient.createUser(user.id, {
        email: user.email,
        name: user.name,
        interests: user.interests || [],
        fitnessLevel: user.fitness_level,
        goals: user.goals || [],
      })
    }

    console.log(`[v0] Migrated ${users.length} users to Neo4j`)
  }

  async migrateSocialRelationships(): Promise<void> {
    console.log("[v0] Starting social relationships migration...")

    const relationships = await sql`
      SELECT follower_id, followee_id, created_at
      FROM user_follows
    `

    for (const rel of relationships) {
      await neo4jClient.createFollowRelationship(rel.follower_id, rel.followee_id)
    }

    console.log(`[v0] Migrated ${relationships.length} social relationships`)
  }

  async createIndexes(): Promise<void> {
    const indexes = [
      "CREATE INDEX user_id_index IF NOT EXISTS FOR (u:User) ON (u.id)",
      "CREATE INDEX user_email_index IF NOT EXISTS FOR (u:User) ON (u.email)",
      "CREATE INDEX content_id_index IF NOT EXISTS FOR (c:Content) ON (c.id)",
      "CREATE INDEX group_id_index IF NOT EXISTS FOR (g:Group) ON (g.id)",
      "CREATE INDEX interest_name_index IF NOT EXISTS FOR (i:Interest) ON (i.name)",
    ]

    for (const index of indexes) {
      await neo4jClient.executeQuery(index)
    }

    console.log("[v0] Created Neo4j indexes for optimal performance")
  }

  async runFullMigration(): Promise<void> {
    try {
      await this.createIndexes()
      await this.migrateUsers()
      await this.migrateSocialRelationships()
      console.log("[v0] Graph database migration completed successfully")
    } catch (error) {
      console.error("[v0] Migration failed:", error)
      throw error
    }
  }
}

export const graphMigration = new GraphMigration()
