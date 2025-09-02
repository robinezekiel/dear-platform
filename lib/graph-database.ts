interface GraphNode {
  id: string
  type: "user" | "content" | "group" | "activity" | "interest"
  properties: Record<string, any>
  connections: GraphEdge[]
}

interface GraphEdge {
  id: string
  from: string
  to: string
  type: "follows" | "likes" | "shares" | "member_of" | "interested_in" | "similar_to" | "mentors" | "collaborates"
  weight: number
  properties: Record<string, any>
  created_at: Date
}

interface SocialRecommendation {
  type: "user" | "content" | "group" | "activity"
  target_id: string
  score: number
  reasoning: string[]
  confidence: number
}

export class GraphDatabaseOptimizer {
  private nodes: Map<string, GraphNode> = new Map()
  private edges: Map<string, GraphEdge> = new Map()
  private adjacencyList: Map<string, Set<string>> = new Map()

  // Initialize graph from database
  async initializeGraph(): Promise<void> {
    try {
      // Load users and their relationships
      const users = await this.loadUsersFromDB()
      const relationships = await this.loadRelationshipsFromDB()
      const activities = await this.loadActivitiesFromDB()
      const interests = await this.loadInterestsFromDB()

      // Build graph structure
      this.buildGraphFromData(users, relationships, activities, interests)

      // Create adjacency list for fast traversal
      this.buildAdjacencyList()

      console.log(`[Graph] Initialized with ${this.nodes.size} nodes and ${this.edges.size} edges`)
    } catch (error) {
      console.error("[Graph] Initialization failed:", error)
      throw error
    }
  }

  private async loadUsersFromDB(): Promise<any[]> {
    // Simulate loading users from database
    return [
      { id: "user1", name: "John Doe", interests: ["fitness", "nutrition"], level: 5 },
      { id: "user2", name: "Jane Smith", interests: ["yoga", "meditation"], level: 8 },
      { id: "user3", name: "Mike Johnson", interests: ["fitness", "sports"], level: 3 },
    ]
  }

  private async loadRelationshipsFromDB(): Promise<any[]> {
    return [
      { from: "user1", to: "user2", type: "follows", strength: 0.8 },
      { from: "user2", to: "user3", type: "mentors", strength: 0.9 },
      { from: "user1", to: "user3", type: "collaborates", strength: 0.6 },
    ]
  }

  private async loadActivitiesFromDB(): Promise<any[]> {
    return [
      { id: "activity1", type: "workout", category: "fitness", engagement: 0.85 },
      { id: "activity2", type: "meditation", category: "mindfulness", engagement: 0.92 },
    ]
  }

  private async loadInterestsFromDB(): Promise<any[]> {
    return [
      { id: "fitness", category: "physical", popularity: 0.9 },
      { id: "nutrition", category: "health", popularity: 0.85 },
      { id: "meditation", category: "mental", popularity: 0.78 },
    ]
  }

  private buildGraphFromData(users: any[], relationships: any[], activities: any[], interests: any[]): void {
    // Add user nodes
    users.forEach((user) => {
      this.addNode({
        id: user.id,
        type: "user",
        properties: user,
        connections: [],
      })
    })

    // Add activity nodes
    activities.forEach((activity) => {
      this.addNode({
        id: activity.id,
        type: "activity",
        properties: activity,
        connections: [],
      })
    })

    // Add interest nodes
    interests.forEach((interest) => {
      this.addNode({
        id: interest.id,
        type: "interest",
        properties: interest,
        connections: [],
      })
    })

    // Add relationship edges
    relationships.forEach((rel) => {
      this.addEdge({
        id: `${rel.from}-${rel.to}-${rel.type}`,
        from: rel.from,
        to: rel.to,
        type: rel.type,
        weight: rel.strength,
        properties: {},
        created_at: new Date(),
      })
    })
  }

  private buildAdjacencyList(): void {
    this.adjacencyList.clear()

    this.edges.forEach((edge) => {
      if (!this.adjacencyList.has(edge.from)) {
        this.adjacencyList.set(edge.from, new Set())
      }
      if (!this.adjacencyList.has(edge.to)) {
        this.adjacencyList.set(edge.to, new Set())
      }

      this.adjacencyList.get(edge.from)!.add(edge.to)
      this.adjacencyList.get(edge.to)!.add(edge.from) // Bidirectional for social graphs
    })
  }

  addNode(node: GraphNode): void {
    this.nodes.set(node.id, node)
  }

  addEdge(edge: GraphEdge): void {
    this.edges.set(edge.id, edge)

    // Update adjacency list
    if (!this.adjacencyList.has(edge.from)) {
      this.adjacencyList.set(edge.from, new Set())
    }
    if (!this.adjacencyList.has(edge.to)) {
      this.adjacencyList.set(edge.to, new Set())
    }

    this.adjacencyList.get(edge.from)!.add(edge.to)
    this.adjacencyList.get(edge.to)!.add(edge.from)
  }

  // Advanced social algorithms
  async findSimilarUsers(userId: string, limit = 10): Promise<SocialRecommendation[]> {
    const user = this.nodes.get(userId)
    if (!user || user.type !== "user") return []

    const similarities: Map<string, number> = new Map()
    const userInterests = user.properties.interests || []
    const userLevel = user.properties.level || 1

    // Calculate similarity scores
    this.nodes.forEach((otherUser, otherId) => {
      if (otherId === userId || otherUser.type !== "user") return

      let score = 0
      const otherInterests = otherUser.properties.interests || []
      const otherLevel = otherUser.properties.level || 1

      // Interest similarity (Jaccard coefficient)
      const intersection = userInterests.filter((interest: string) => otherInterests.includes(interest))
      const union = [...new Set([...userInterests, ...otherInterests])]
      const interestSimilarity = union.length > 0 ? intersection.length / union.length : 0

      // Level similarity (closer levels = higher similarity)
      const levelSimilarity = 1 - Math.abs(userLevel - otherLevel) / Math.max(userLevel, otherLevel, 10)

      // Mutual connections boost
      const mutualConnections = this.getMutualConnections(userId, otherId)
      const mutualBoost = mutualConnections.length * 0.1

      score = interestSimilarity * 0.6 + levelSimilarity * 0.3 + mutualBoost

      if (score > 0.1) {
        // Minimum threshold
        similarities.set(otherId, score)
      }
    })

    // Convert to recommendations
    return Array.from(similarities.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([targetId, score]) => ({
        type: "user" as const,
        target_id: targetId,
        score,
        reasoning: this.generateRecommendationReasoning(userId, targetId, score),
        confidence: Math.min(score * 1.2, 1.0),
      }))
  }

  async findRecommendedContent(userId: string, limit = 20): Promise<SocialRecommendation[]> {
    const user = this.nodes.get(userId)
    if (!user || user.type !== "user") return []

    const contentScores: Map<string, number> = new Map()
    const userInterests = user.properties.interests || []

    // Find content through similar users
    const similarUsers = await this.findSimilarUsers(userId, 5)

    for (const similarUser of similarUsers) {
      const connections = this.getNodeConnections(similarUser.target_id)

      connections.forEach((edge) => {
        const targetNode = this.nodes.get(edge.to)
        if (targetNode && (targetNode.type === "content" || targetNode.type === "activity")) {
          const currentScore = contentScores.get(edge.to) || 0
          const boost = similarUser.score * edge.weight * 0.8
          contentScores.set(edge.to, currentScore + boost)
        }
      })
    }

    // Direct interest matching
    this.nodes.forEach((node, nodeId) => {
      if (node.type === "content" || node.type === "activity") {
        const nodeCategory = node.properties.category
        if (userInterests.includes(nodeCategory)) {
          const currentScore = contentScores.get(nodeId) || 0
          contentScores.set(nodeId, currentScore + 0.5)
        }
      }
    })

    return Array.from(contentScores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([targetId, score]) => ({
        type: "content" as const,
        target_id: targetId,
        score,
        reasoning: [`Matches your interests`, `Popular among similar users`],
        confidence: Math.min(score, 1.0),
      }))
  }

  async findOptimalGroups(userId: string, limit = 5): Promise<SocialRecommendation[]> {
    const user = this.nodes.get(userId)
    if (!user || user.type !== "user") return []

    const groupScores: Map<string, number> = new Map()
    const userLevel = user.properties.level || 1
    const userInterests = user.properties.interests || []

    // Find groups through network analysis
    this.nodes.forEach((node, nodeId) => {
      if (node.type === "group") {
        let score = 0

        // Interest alignment
        const groupFocus = node.properties.focus || []
        const interestMatch = userInterests.filter((interest: string) => groupFocus.includes(interest)).length
        score += interestMatch * 0.4

        // Level compatibility
        const groupLevel = node.properties.averageLevel || 5
        const levelCompatibility = 1 - Math.abs(userLevel - groupLevel) / 10
        score += levelCompatibility * 0.3

        // Activity level
        const groupActivity = node.properties.activityScore || 0.5
        score += groupActivity * 0.2

        // Size optimization (not too small, not too large)
        const groupSize = node.properties.memberCount || 10
        const optimalSize = groupSize >= 5 && groupSize <= 50 ? 0.1 : 0
        score += optimalSize

        if (score > 0.3) {
          groupScores.set(nodeId, score)
        }
      }
    })

    return Array.from(groupScores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([targetId, score]) => ({
        type: "group" as const,
        target_id: targetId,
        score,
        reasoning: [`Matches your fitness level`, `Aligns with your interests`, `Active community`],
        confidence: score,
      }))
  }

  private getMutualConnections(userId1: string, userId2: string): string[] {
    const connections1 = this.adjacencyList.get(userId1) || new Set()
    const connections2 = this.adjacencyList.get(userId2) || new Set()

    return Array.from(connections1).filter((id) => connections2.has(id))
  }

  private getNodeConnections(nodeId: string): GraphEdge[] {
    return Array.from(this.edges.values()).filter((edge) => edge.from === nodeId || edge.to === nodeId)
  }

  private generateRecommendationReasoning(userId: string, targetId: string, score: number): string[] {
    const reasons: string[] = []

    if (score > 0.7) reasons.push("Highly compatible interests and goals")
    if (score > 0.5) reasons.push("Similar fitness level and experience")

    const mutualConnections = this.getMutualConnections(userId, targetId)
    if (mutualConnections.length > 0) {
      reasons.push(`${mutualConnections.length} mutual connections`)
    }

    return reasons.length > 0 ? reasons : ["Potential good match based on profile"]
  }

  // Real-time graph updates
  async updateUserActivity(userId: string, activityType: string, targetId?: string): Promise<void> {
    const timestamp = new Date()

    // Update node properties
    const user = this.nodes.get(userId)
    if (user) {
      user.properties.lastActivity = timestamp
      user.properties.activityCount = (user.properties.activityCount || 0) + 1
    }

    // Create or strengthen edges based on activity
    if (targetId) {
      const edgeId = `${userId}-${targetId}-${activityType}`
      const existingEdge = this.edges.get(edgeId)

      if (existingEdge) {
        existingEdge.weight = Math.min(existingEdge.weight + 0.1, 1.0)
        existingEdge.properties.lastInteraction = timestamp
      } else {
        this.addEdge({
          id: edgeId,
          from: userId,
          to: targetId,
          type: activityType as any,
          weight: 0.1,
          properties: { firstInteraction: timestamp, lastInteraction: timestamp },
          created_at: timestamp,
        })
      }
    }
  }

  // Analytics and insights
  async getNetworkAnalytics(userId: string): Promise<any> {
    const user = this.nodes.get(userId)
    if (!user) return null

    const connections = this.getNodeConnections(userId)
    const directConnections = connections.length
    const mutualConnections = new Set<string>()

    // Calculate network reach (2nd degree connections)
    connections.forEach((edge) => {
      const connectedUserId = edge.from === userId ? edge.to : edge.from
      const secondDegree = this.getNodeConnections(connectedUserId)
      secondDegree.forEach((secondEdge) => {
        const secondUserId = secondEdge.from === connectedUserId ? secondEdge.to : secondEdge.from
        if (secondUserId !== userId) {
          mutualConnections.add(secondUserId)
        }
      })
    })

    return {
      directConnections,
      networkReach: mutualConnections.size,
      influenceScore: this.calculateInfluenceScore(userId),
      communityRank: this.calculateCommunityRank(userId),
      engagementLevel: this.calculateEngagementLevel(userId),
    }
  }

  private calculateInfluenceScore(userId: string): number {
    const connections = this.getNodeConnections(userId)
    const weightSum = connections.reduce((sum, edge) => sum + edge.weight, 0)
    return Math.min(weightSum / 10, 1.0) // Normalize to 0-1
  }

  private calculateCommunityRank(userId: string): number {
    // Simplified PageRank-like algorithm
    const connections = this.getNodeConnections(userId)
    const incomingWeight = connections.filter((edge) => edge.to === userId).reduce((sum, edge) => sum + edge.weight, 0)

    return Math.min(incomingWeight / 5, 1.0)
  }

  private calculateEngagementLevel(userId: string): number {
    const user = this.nodes.get(userId)
    if (!user) return 0

    const activityCount = user.properties.activityCount || 0
    const lastActivity = user.properties.lastActivity
    const daysSinceActivity = lastActivity
      ? (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24)
      : 30

    const activityScore = Math.min(activityCount / 100, 1.0)
    const recencyScore = Math.max(0, 1 - daysSinceActivity / 30)

    return activityScore * 0.7 + recencyScore * 0.3
  }
}

export const graphDB = new GraphDatabaseOptimizer()
