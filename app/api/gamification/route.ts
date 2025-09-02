import { type NextRequest, NextResponse } from "next/server"
import { validateRequest } from "@/lib/validation"
import { handleApiError } from "@/lib/error-handling"
import { logActivity } from "@/lib/logging"

// Mock data - replace with database queries
const mockUserStats = {
  level: 12,
  xp: 8660,
  xpToNextLevel: 2340,
  streaks: {
    dailyLogin: 47,
    workout: 12,
    mindfulness: 8,
  },
  badges: [
    { id: 1, name: "Early Bird", icon: "🌅", earned: true, earnedAt: "2024-01-15" },
    { id: 2, name: "Streak Master", icon: "🔥", earned: true, earnedAt: "2024-02-01" },
    { id: 3, name: "Social Star", icon: "⭐", earned: true, earnedAt: "2024-02-10" },
  ],
  challenges: [
    {
      id: 1,
      name: "30-Day Transformation",
      description: "Complete daily workouts for 30 days",
      progress: 18,
      total: 30,
      reward: { xp: 1000, badge: "Transformer" },
      active: true,
    },
  ],
  leaderboardPosition: 4,
  weeklyXp: 2180,
}

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest(request)

    logActivity("gamification_stats_viewed", { userId: user.id })

    // In production, fetch from database
    const userStats = mockUserStats

    return NextResponse.json({
      success: true,
      data: userStats,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest(request)
    const body = await request.json()

    const { action, challengeId, rewardId } = body

    switch (action) {
      case "join_challenge":
        // Join a challenge
        logActivity("challenge_joined", { userId: user.id, challengeId })
        return NextResponse.json({
          success: true,
          message: "Challenge joined successfully",
        })

      case "redeem_reward":
        // Redeem a reward
        logActivity("reward_redeemed", { userId: user.id, rewardId })
        return NextResponse.json({
          success: true,
          message: "Reward redeemed successfully",
        })

      case "update_streak":
        // Update user streak
        logActivity("streak_updated", { userId: user.id })
        return NextResponse.json({
          success: true,
          message: "Streak updated",
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    return handleApiError(error)
  }
}
