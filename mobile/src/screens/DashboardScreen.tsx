"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, RefreshControl, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import LinearGradient from "react-native-linear-gradient"

// Components
import Button from "../components/common/Button"
import ProgressCard from "../components/dashboard/ProgressCard"
import QuickActions from "../components/dashboard/QuickActions"
import RecentActivity from "../components/dashboard/RecentActivity"

// Services
import { AuthService } from "../services/AuthService"
import { AnalyticsService } from "../services/AnalyticsService"

const { width } = Dimensions.get("window")

interface DashboardData {
  user: {
    name: string
    currentStreak: number
    totalXP: number
    level: number
  }
  progress: {
    weeklyGoals: number
    transformationScore: number
    healthMetrics: number
  }
  recentActivities: Array<{
    id: string
    type: string
    title: string
    timestamp: string
    xp: number
  }>
}

const DashboardScreen: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadDashboardData()
    AnalyticsService.trackScreenView("Dashboard")
  }, [])

  const loadDashboardData = async (): Promise<void> => {
    try {
      const response = await AuthService.makeAuthenticatedRequest("/api/dashboard")
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error("[Dashboard] Load error:", error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your transformation...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={["#059669", "#10B981"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>{dashboardData?.user.name || "Champion"}</Text>
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>🔥 {dashboardData?.user.currentStreak || 0} day streak</Text>
            <Text style={styles.xpText}>
              ⭐ {dashboardData?.user.totalXP || 0} XP • Level {dashboardData?.user.level || 1}
            </Text>
          </View>
        </LinearGradient>

        {/* Progress Cards */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <ProgressCard title="Weekly Goals" progress={dashboardData?.progress.weeklyGoals || 0} color="#059669" />
          <ProgressCard
            title="Transformation Score"
            progress={dashboardData?.progress.transformationScore || 0}
            color="#3B82F6"
          />
          <ProgressCard title="Health Metrics" progress={dashboardData?.progress.healthMetrics || 0} color="#8B5CF6" />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <QuickActions />
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <RecentActivity activities={dashboardData?.recentActivities || []} />
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready for your next transformation?</Text>
          <Text style={styles.ctaSubtitle}>
            Continue your journey with AI-powered insights and personalized coaching.
          </Text>
          <Button
            title="Start Today's Session"
            onPress={() => {
              // Navigate to transformation screen
            }}
            size="large"
            style={styles.ctaButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
    fontWeight: "400",
  },
  userName: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: 4,
  },
  streakContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  xpText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    width: width - 40,
  },
})

export default DashboardScreen
