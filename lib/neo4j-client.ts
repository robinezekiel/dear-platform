import neo4j, { type Driver, type Session, type Result } from "neo4j-driver"

class Neo4jClient {
  private driver: Driver
  private static instance: Neo4jClient

  private constructor() {
    this.driver = neo4j.driver(
      process.env.NEO4J_URI || "bolt://localhost:7687",
      neo4j.auth.basic(process.env.NEO4J_USERNAME || "neo4j", process.env.NEO4J_PASSWORD || "password"),
    )
  }

  static getInstance(): Neo4jClient {
    if (!Neo4jClient.instance) {
      Neo4jClient.instance = new Neo4jClient()
    }
    return Neo4jClient.instance
  }

  async executeQuery(query: string, parameters: any = {}): Promise<Result> {
    const session: Session = this.driver.session()
    try {
      return await session.run(query, parameters)
    } finally {
      await session.close()
    }
  }

  async close(): Promise<void> {
    await this.driver.close()
  }

  async createUser(userId: string, userData: any): Promise<void> {
    const query = `
      CREATE (u:User {
        id: $userId,
        email: $email,
        name: $name,
        createdAt: datetime(),
        interests: $interests,
        fitnessLevel: $fitnessLevel,
        goals: $goals
      })
    `
    await this.executeQuery(query, { userId, ...userData })
  }

  async createFollowRelationship(followerId: string, followeeId: string): Promise<void> {
    const query = `
      MATCH (follower:User {id: $followerId})
      MATCH (followee:User {id: $followeeId})
      CREATE (follower)-[:FOLLOWS {createdAt: datetime()}]->(followee)
    `
    await this.executeQuery(query, { followerId, followeeId })
  }

  async getRecommendedUsers(userId: string, limit = 10): Promise<any[]> {
    const query = `
      MATCH (user:User {id: $userId})
      MATCH (user)-[:FOLLOWS]->(followed:User)
      MATCH (followed)-[:FOLLOWS]->(recommended:User)
      WHERE NOT (user)-[:FOLLOWS]->(recommended) AND recommended.id <> $userId
      WITH recommended, COUNT(*) as mutualConnections
      MATCH (recommended)-[:INTERESTED_IN]->(interest:Interest)
      MATCH (user)-[:INTERESTED_IN]->(interest)
      WITH recommended, mutualConnections, COUNT(interest) as sharedInterests
      RETURN recommended, mutualConnections, sharedInterests
      ORDER BY mutualConnections DESC, sharedInterests DESC
      LIMIT $limit
    `
    const result = await this.executeQuery(query, { userId, limit })
    return result.records.map((record) => ({
      user: record.get("recommended").properties,
      mutualConnections: record.get("mutualConnections").toNumber(),
      sharedInterests: record.get("sharedInterests").toNumber(),
    }))
  }

  async findOptimalGroups(userId: string): Promise<any[]> {
    const query = `
      MATCH (user:User {id: $userId})
      MATCH (user)-[:INTERESTED_IN]->(interest:Interest)
      MATCH (otherUser:User)-[:INTERESTED_IN]->(interest)
      WHERE otherUser.id <> $userId
      WITH otherUser, COUNT(interest) as sharedInterests
      WHERE sharedInterests >= 3
      MATCH (otherUser)-[:MEMBER_OF]->(group:Group)
      WHERE NOT (user)-[:MEMBER_OF]->(group)
      WITH group, COUNT(otherUser) as compatibleMembers, sharedInterests
      WHERE compatibleMembers >= 2
      RETURN group, compatibleMembers, AVG(sharedInterests) as avgCompatibility
      ORDER BY avgCompatibility DESC, compatibleMembers DESC
      LIMIT 5
    `
    const result = await this.executeQuery(query, { userId })
    return result.records.map((record) => ({
      group: record.get("group").properties,
      compatibleMembers: record.get("compatibleMembers").toNumber(),
      avgCompatibility: record.get("avgCompatibility").toNumber(),
    }))
  }

  async calculateUserInfluence(userId: string): Promise<number> {
    const query = `
      MATCH (user:User {id: $userId})
      OPTIONAL MATCH (user)<-[:FOLLOWS]-(follower:User)
      WITH user, COUNT(follower) as followerCount
      OPTIONAL MATCH (user)-[:CREATED]->(content:Content)<-[:LIKED]-(liker:User)
      WITH user, followerCount, COUNT(liker) as totalLikes
      OPTIONAL MATCH (user)-[:CREATED]->(content:Content)<-[:SHARED]-(sharer:User)
      WITH user, followerCount, totalLikes, COUNT(sharer) as totalShares
      RETURN (followerCount * 1.0 + totalLikes * 0.5 + totalShares * 2.0) as influenceScore
    `
    const result = await this.executeQuery(query, { userId })
    return result.records[0]?.get("influenceScore")?.toNumber() || 0
  }

  async getPersonalizedContent(userId: string, limit = 20): Promise<any[]> {
    const query = `
      MATCH (user:User {id: $userId})
      MATCH (user)-[:INTERESTED_IN]->(interest:Interest)
      MATCH (content:Content)-[:TAGGED_WITH]->(interest)
      WHERE NOT (user)-[:VIEWED]->(content)
      WITH content, COUNT(interest) as relevanceScore
      MATCH (content)<-[:CREATED]-(creator:User)
      OPTIONAL MATCH (user)-[:FOLLOWS]->(creator)
      WITH content, relevanceScore, creator, 
           CASE WHEN creator IS NOT NULL THEN 2.0 ELSE 1.0 END as creatorBoost
      OPTIONAL MATCH (content)<-[:LIKED]-(liker:User)
      WITH content, relevanceScore, creatorBoost, COUNT(liker) as likeCount
      RETURN content, (relevanceScore * creatorBoost + likeCount * 0.1) as score
      ORDER BY score DESC
      LIMIT $limit
    `
    const result = await this.executeQuery(query, { userId, limit })
    return result.records.map((record) => ({
      content: record.get("content").properties,
      score: record.get("score").toNumber(),
    }))
  }
}

export const neo4jClient = Neo4jClient.getInstance()
