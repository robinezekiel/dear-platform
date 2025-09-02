interface UserStats {
  level: number
  xp: number
  xpToNextLevel: number
  streaks: {
    dailyLogin: number
    workout: number
    mindfulness: number
  }
  badges: Badge[]
  challenges: Challenge[]
  leaderboardPosition: number
  weeklyXp: number
}

interface Badge {
  id: number
  name: string
  icon: string
  earned: boolean
  earnedAt?: string
  description?: string
}

interface Challenge {
  id: number
  name: string
  description: string
  progress: number
  total: number
  reward: {
    xp: number
    badge?: string
  }
  active: boolean
  startDate?: string
  endDate?: string
}

interface Reward {
  id: number
  name: string
  description: string
  cost: number
  type: "feature" | "service" | "discount"
  available: boolean
}

export class GamificationEngine {
  static calculateLevel(xp: number): number {
    // Level calculation: Level = floor(sqrt(XP / 100))
    return Math.floor(Math.sqrt(xp / 100)) + 1
  }

  static calculateXpToNextLevel(currentXp: number): number {
    const currentLevel = this.calculateLevel(currentXp)
    const nextLevelXp = Math.pow(currentLevel, 2) * 100
    return nextLevelXp - currentXp
  }

  static awardXp(userId: string, amount: number, reason: string): void {
    // Award XP to user and check for level up
    console.log(`[Gamification] Awarded ${amount} XP to user ${userId} for ${reason}`)

    // In production, update database and check for achievements
    this.checkForAchievements(userId)
  }

  static updateStreak(userId: string, streakType: string): void {
    // Update user streak and award XP
    const xpReward = this.getStreakXpReward(streakType)
    this.awardXp(userId, xpReward, `${streakType} streak`)
  }

  static getStreakXpReward(streakType: string): number {
    const rewards = {
      dailyLogin: 10,
      workout: 25,
      mindfulness: 15,
      nutrition: 20,
    }
    return rewards[streakType as keyof typeof rewards] || 5
  }

  static checkForAchievements(userId: string): void {
    // Check if user has earned any new achievements
    console.log(`[Gamification] Checking achievements for user ${userId}`)

    // In production, query database for achievement conditions
    // Award badges and XP for completed achievements
  }

  static getLeaderboard(timeframe: "daily" | "weekly" | "monthly" = "weekly"): any[] {
    // Return leaderboard data
    return [
      { rank: 1, name: "Sarah M.", xp: 2840, avatar: "/avatars/sarah.jpg" },
      { rank: 2, name: "Mike R.", xp: 2650, avatar: "/avatars/mike.jpg" },
      { rank: 3, name: "Emma L.", xp: 2420, avatar: "/avatars/emma.jpg" },
    ]
  }

  static getAvailableChallenges(): Challenge[] {
    return [
      {
        id: 1,
        name: "Weekend Warrior",
        description: "Complete 2 intense workouts this weekend",
        progress: 0,
        total: 2,
        reward: { xp: 500 },
        active: false,
      },
      {
        id: 2,
        name: "Social Butterfly",
        description: "Share 3 progress updates with the community",
        progress: 0,
        total: 3,
        reward: { xp: 300, badge: "Social Star" },
        active: false,
      },
    ]
  }

  static getAvailableRewards(): Reward[] {
    return [
      {
        id: 1,
        name: "Premium Feature Access",
        description: "Unlock advanced AI analysis for 1 week",
        cost: 1000,
        type: "feature",
        available: true,
      },
      {
        id: 2,
        name: "Personal Trainer Session",
        description: "Free 30-minute session with certified trainer",
        cost: 2500,
        type: "service",
        available: true,
      },
    ]
  }
}
