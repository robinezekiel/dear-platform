"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts"
import { TrendingUp, Users, Target, Download, RefreshCw, Eye, Clock, TrendingDown } from "lucide-react"

interface AdvancedAnalyticsData {
  realTimeMetrics: {
    activeUsers: number
    pageViews: number
    conversions: number
    bounceRate: number
    avgSessionDuration: number
  }
  userBehavior: {
    userJourney: Array<{ step: string; users: number; dropoff: number }>
    heatmapData: Array<{ x: number; y: number; value: number }>
    deviceBreakdown: Array<{ device: string; users: number; percentage: number }>
    geographicData: Array<{ country: string; users: number; revenue: number }>
  }
  businessIntelligence: {
    revenueGrowth: Array<{ month: string; revenue: number; growth: number }>
    customerLifetimeValue: Array<{ cohort: string; clv: number; retention: number }>
    featureAdoption: Array<{ feature: string; adoption: number; impact: number }>
    churnPrediction: Array<{ segment: string; churnRisk: number; users: number }>
  }
  predictiveAnalytics: {
    userGrowthForecast: Array<{ month: string; predicted: number; confidence: number }>
    revenueProjection: Array<{ month: string; projected: number; actual?: number }>
    featureUsageTrends: Array<{ feature: string; trend: number; prediction: number }>
  }
  performanceMetrics: {
    apiResponseTimes: Array<{ endpoint: string; avgTime: number; p95: number; p99: number }>
    errorRates: Array<{ service: string; errorRate: number; trend: number }>
    systemLoad: Array<{ timestamp: string; cpu: number; memory: number; requests: number }>
  }
}

const COLORS = ["#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#C6F6D5"]

export default function AdvancedAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AdvancedAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

  useEffect(() => {
    fetchAdvancedAnalytics()
  }, [timeRange, selectedSegment, dateRange])

  const fetchAdvancedAnalytics = async () => {
    try {
      setLoading(true)
      // Simulate API call with comprehensive mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockData: AdvancedAnalyticsData = {
        realTimeMetrics: {
          activeUsers: 1247,
          pageViews: 8934,
          conversions: 156,
          bounceRate: 32.5,
          avgSessionDuration: 1847, // seconds
        },
        userBehavior: {
          userJourney: [
            { step: "Landing Page", users: 10000, dropoff: 0 },
            { step: "Sign Up", users: 7500, dropoff: 25 },
            { step: "Onboarding", users: 6800, dropoff: 9.3 },
            { step: "First Session", users: 5950, dropoff: 12.5 },
            { step: "Feature Usage", users: 4760, dropoff: 20 },
            { step: "Subscription", users: 2380, dropoff: 50 },
          ],
          heatmapData: Array.from({ length: 100 }, (_, i) => ({
            x: i % 10,
            y: Math.floor(i / 10),
            value: Math.random() * 100,
          })),
          deviceBreakdown: [
            { device: "Desktop", users: 4567, percentage: 45.2 },
            { device: "Mobile", users: 3890, percentage: 38.5 },
            { device: "Tablet", users: 1643, percentage: 16.3 },
          ],
          geographicData: [
            { country: "United States", users: 5234, revenue: 89432 },
            { country: "Canada", users: 1876, revenue: 32145 },
            { country: "United Kingdom", users: 1234, revenue: 21876 },
            { country: "Australia", users: 987, revenue: 18765 },
            { country: "Germany", users: 765, revenue: 15432 },
          ],
        },
        businessIntelligence: {
          revenueGrowth: [
            { month: "Jan", revenue: 45000, growth: 12 },
            { month: "Feb", revenue: 52000, growth: 15.6 },
            { month: "Mar", revenue: 48000, growth: -7.7 },
            { month: "Apr", revenue: 61000, growth: 27.1 },
            { month: "May", revenue: 67000, growth: 9.8 },
            { month: "Jun", revenue: 74000, growth: 10.4 },
          ],
          customerLifetimeValue: [
            { cohort: "Q1 2024", clv: 1250, retention: 78 },
            { cohort: "Q2 2024", clv: 1180, retention: 72 },
            { cohort: "Q3 2024", clv: 1320, retention: 81 },
            { cohort: "Q4 2024", clv: 1420, retention: 85 },
          ],
          featureAdoption: [
            { feature: "AI Visual Analysis", adoption: 85, impact: 92 },
            { feature: "Mental Health Chat", adoption: 72, impact: 88 },
            { feature: "Community Features", adoption: 68, impact: 76 },
            { feature: "Provider Booking", adoption: 45, impact: 82 },
            { feature: "Sports Analysis", adoption: 38, impact: 89 },
          ],
          churnPrediction: [
            { segment: "New Users", churnRisk: 15, users: 2340 },
            { segment: "Active Users", churnRisk: 8, users: 5670 },
            { segment: "Premium Users", churnRisk: 3, users: 1890 },
            { segment: "Enterprise", churnRisk: 2, users: 450 },
          ],
        },
        predictiveAnalytics: {
          userGrowthForecast: [
            { month: "Jul", predicted: 15000, confidence: 85 },
            { month: "Aug", predicted: 17500, confidence: 82 },
            { month: "Sep", predicted: 20000, confidence: 78 },
            { month: "Oct", predicted: 23000, confidence: 75 },
            { month: "Nov", predicted: 26500, confidence: 72 },
            { month: "Dec", predicted: 30000, confidence: 68 },
          ],
          revenueProjection: [
            { month: "Jul", projected: 85000, actual: 82000 },
            { month: "Aug", projected: 92000, actual: 89000 },
            { month: "Sep", projected: 98000 },
            { month: "Oct", projected: 105000 },
            { month: "Nov", projected: 112000 },
            { month: "Dec", projected: 120000 },
          ],
          featureUsageTrends: [
            { feature: "AI Analysis", trend: 15, prediction: 95 },
            { feature: "Community", trend: 8, prediction: 78 },
            { feature: "Sports", trend: 25, prediction: 65 },
            { feature: "Mental Health", trend: 12, prediction: 85 },
          ],
        },
        performanceMetrics: {
          apiResponseTimes: [
            { endpoint: "/api/auth", avgTime: 145, p95: 280, p99: 450 },
            { endpoint: "/api/ai", avgTime: 2340, p95: 4200, p99: 6800 },
            { endpoint: "/api/health-metrics", avgTime: 320, p95: 580, p99: 890 },
            { endpoint: "/api/community", avgTime: 180, p95: 340, p99: 520 },
          ],
          errorRates: [
            { service: "Authentication", errorRate: 0.2, trend: -15 },
            { service: "AI Processing", errorRate: 1.8, trend: -8 },
            { service: "Database", errorRate: 0.5, trend: -25 },
            { service: "File Upload", errorRate: 2.1, trend: 12 },
          ],
          systemLoad: Array.from({ length: 24 }, (_, i) => ({
            timestamp: `${i}:00`,
            cpu: 30 + Math.random() * 40,
            memory: 45 + Math.random() * 30,
            requests: 100 + Math.random() * 200,
          })),
        },
      }

      setAnalyticsData(mockData)
    } catch (error) {
      console.error("[v0] Failed to fetch advanced analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchAdvancedAnalytics()
    setRefreshing(false)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `dear-analytics-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading advanced analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Advanced Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time insights, predictive analytics, and business intelligence
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="new">New Users</SelectItem>
              <SelectItem value="active">Active Users</SelectItem>
              <SelectItem value="premium">Premium Users</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={refreshing} className="gap-2 bg-transparent">
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportData} className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{analyticsData?.realTimeMetrics.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">{analyticsData?.realTimeMetrics.pageViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold">{analyticsData?.realTimeMetrics.conversions}</p>
              </div>
              <Target className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold">{analyticsData?.realTimeMetrics.bounceRate}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Session</p>
                <p className="text-2xl font-bold">
                  {Math.floor((analyticsData?.realTimeMetrics.avgSessionDuration || 0) / 60)}m
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Tabs */}
      <Tabs defaultValue="behavior" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="business">Business Intelligence</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Journey Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>User Journey Funnel</CardTitle>
                <CardDescription>Conversion rates through user journey</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.userBehavior.userJourney}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="step" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>User distribution by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData?.userBehavior.deviceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ device, percentage }) => `${device} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="users"
                    >
                      {analyticsData?.userBehavior.deviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Users and revenue by country</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.userBehavior.geographicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="users" fill="#059669" name="Users" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue and growth rate</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData?.businessIntelligence.revenueGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#059669" name="Revenue ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#10B981" name="Growth %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Feature Adoption */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption vs Impact</CardTitle>
                <CardDescription>Feature usage and business impact correlation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={analyticsData?.businessIntelligence.featureAdoption}>
                    <CartesianGrid />
                    <XAxis dataKey="adoption" name="Adoption %" />
                    <YAxis dataKey="impact" name="Impact Score" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter dataKey="impact" fill="#059669" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Lifetime Value */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>CLV and retention by cohort</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.businessIntelligence.customerLifetimeValue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cohort" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="clv" fill="#059669" name="CLV ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#10B981" name="Retention %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Churn Prediction */}
            <Card>
              <CardHeader>
                <CardTitle>Churn Risk by Segment</CardTitle>
                <CardDescription>Predicted churn rates across user segments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.businessIntelligence.churnPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="churnRisk" fill="#EF4444" name="Churn Risk %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth Forecast</CardTitle>
                <CardDescription>Predicted user growth with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData?.predictiveAnalytics.userGrowthForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="#059669"
                      fill="#059669"
                      fillOpacity={0.3}
                      name="Predicted Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Projection */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Projection</CardTitle>
                <CardDescription>Actual vs projected revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData?.predictiveAnalytics.revenueProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="#059669" name="Actual" strokeWidth={2} />
                    <Line type="monotone" dataKey="projected" stroke="#10B981" strokeDasharray="5 5" name="Projected" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Feature Usage Trends */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Feature Usage Predictions</CardTitle>
                <CardDescription>Predicted feature adoption trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.predictiveAnalytics.featureUsageTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="trend" fill="#059669" name="Current Trend %" />
                    <Bar dataKey="prediction" fill="#10B981" name="Predicted Usage %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Response Times */}
            <Card>
              <CardHeader>
                <CardTitle>API Response Times</CardTitle>
                <CardDescription>Average, P95, and P99 response times</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.performanceMetrics.apiResponseTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="endpoint" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgTime" fill="#059669" name="Average (ms)" />
                    <Bar dataKey="p95" fill="#10B981" name="P95 (ms)" />
                    <Bar dataKey="p99" fill="#34D399" name="P99 (ms)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Error Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Service Error Rates</CardTitle>
                <CardDescription>Error rates and trends by service</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.performanceMetrics.errorRates}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="errorRate" fill="#EF4444" name="Error Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Load */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>System Load (24h)</CardTitle>
                <CardDescription>CPU, memory, and request volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData?.performanceMetrics.systemLoad}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="cpu" stroke="#059669" name="CPU %" />
                    <Line yAxisId="left" type="monotone" dataKey="memory" stroke="#10B981" name="Memory %" />
                    <Line yAxisId="right" type="monotone" dataKey="requests" stroke="#34D399" name="Requests/min" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real-time Activity Feed */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Live Activity Feed</CardTitle>
                <CardDescription>Real-time user actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">User completed AI visual analysis</p>
                        <p className="text-xs text-muted-foreground">2 seconds ago</p>
                      </div>
                      <Badge variant="outline">+15 XP</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Live Metrics</CardTitle>
                <CardDescription>Current system status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Sessions</span>
                  <span className="font-bold text-primary">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Requests/min</span>
                  <span className="font-bold text-accent">2,834</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Queries/min</span>
                  <span className="font-bold text-success">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Health</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="font-bold">245ms</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
