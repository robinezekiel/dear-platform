import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Users, Activity, DollarSign, Target, Download, Filter } from "lucide-react"

export default function AdvancedAnalyticsPage() {
  // Mock data - in production, fetch from analytics API
  const userGrowthData = [
    { month: "Jan", users: 1200, active: 980, premium: 240 },
    { month: "Feb", users: 1800, active: 1440, premium: 360 },
    { month: "Mar", users: 2400, active: 1920, premium: 480 },
    { month: "Apr", users: 3200, active: 2560, premium: 640 },
    { month: "May", users: 4100, active: 3280, premium: 820 },
    { month: "Jun", users: 5200, active: 4160, premium: 1040 },
  ]

  const behaviorData = [
    { action: "Login", count: 15420, conversion: 85.2 },
    { action: "Profile Setup", count: 13140, conversion: 72.6 },
    { action: "First Workout", count: 11230, conversion: 62.1 },
    { action: "Goal Setting", count: 10890, conversion: 60.2 },
    { action: "Community Join", count: 8760, conversion: 48.4 },
    { action: "Premium Upgrade", count: 2340, conversion: 12.9 },
  ]

  const deviceData = [
    { name: "Mobile", value: 68, color: "#10b981" },
    { name: "Desktop", value: 24, color: "#3b82f6" },
    { name: "Tablet", value: 8, color: "#f59e0b" },
  ]

  const revenueData = [
    { month: "Jan", revenue: 24000, subscriptions: 240, churn: 5.2 },
    { month: "Feb", revenue: 36000, subscriptions: 360, churn: 4.8 },
    { month: "Mar", revenue: 48000, subscriptions: 480, churn: 4.1 },
    { month: "Apr", revenue: 64000, subscriptions: 640, churn: 3.9 },
    { month: "May", revenue: 82000, subscriptions: 820, churn: 3.2 },
    { month: "Jun", revenue: 104000, subscriptions: 1040, churn: 2.8 },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
          <p className="text-gray-600">Deep insights into user behavior and platform performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="funnels">Funnels</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-blue-600">52,847</p>
                    <p className="text-xs text-green-600">+12.5% from last month</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-emerald-600">41,230</p>
                    <p className="text-xs text-green-600">+8.3% from last month</p>
                  </div>
                  <Activity className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-purple-600">$104,000</p>
                    <p className="text-xs text-green-600">+26.8% from last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-orange-600">12.9%</p>
                    <p className="text-xs text-green-600">+2.1% from last month</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth Trends</CardTitle>
              <CardDescription>Total, active, and premium users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Total Users" />
                  <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Users" />
                  <Line type="monotone" dataKey="premium" stroke="#8b5cf6" strokeWidth={2} name="Premium Users" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>User distribution by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {deviceData.map((device) => (
                    <div key={device.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                      <span className="text-sm">
                        {device.name} ({device.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top User Actions</CardTitle>
                <CardDescription>Most performed actions this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Workout Completed", count: "23,450", growth: "+15%" },
                    { action: "Progress Photo", count: "18,230", growth: "+22%" },
                    { action: "Goal Updated", count: "15,670", growth: "+8%" },
                    { action: "Community Post", count: "12,890", growth: "+31%" },
                    { action: "AI Analysis", count: "9,450", growth: "+45%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.action}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{item.count}</span>
                        <Badge variant="secondary" className="text-xs text-green-600">
                          {item.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          {/* User Journey Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>User Journey Funnel</CardTitle>
              <CardDescription>Conversion rates through key user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behaviorData.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{step.action}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{step.count.toLocaleString()} users</span>
                        <Badge variant="outline">{step.conversion}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${step.conversion}%` }}
                      ></div>
                    </div>
                    {index < behaviorData.length - 1 && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Behavior Heatmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Duration</CardTitle>
                <CardDescription>Average time spent by users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "Dashboard", duration: "4m 32s", engagement: 85 },
                    { page: "Workout Hub", duration: "12m 18s", engagement: 92 },
                    { page: "AI Analysis", duration: "6m 45s", engagement: 78 },
                    { page: "Community", duration: "8m 12s", engagement: 71 },
                    { page: "Progress", duration: "3m 28s", engagement: 68 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.page}</p>
                        <p className="text-sm text-gray-600">{item.duration} avg</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${item.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{item.engagement}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Most and least used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { feature: "Visual Analysis", usage: 94, trend: "up" },
                    { feature: "Workout Tracking", usage: 87, trend: "up" },
                    { feature: "Goal Setting", usage: 76, trend: "stable" },
                    { feature: "Community Chat", usage: 65, trend: "up" },
                    { feature: "Meal Planning", usage: 58, trend: "down" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{item.feature}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.usage}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{item.usage}%</span>
                        <span
                          className={`text-xs ${
                            item.trend === "up"
                              ? "text-green-600"
                              : item.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {/* Revenue Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">MRR</p>
                    <p className="text-2xl font-bold text-emerald-600">$104,000</p>
                    <p className="text-xs text-green-600">+26.8% MoM</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">ARPU</p>
                    <p className="text-2xl font-bold text-blue-600">$100</p>
                    <p className="text-xs text-green-600">+5.2% MoM</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Churn Rate</p>
                    <p className="text-2xl font-bold text-red-600">2.8%</p>
                    <p className="text-xs text-green-600">-1.4% MoM</p>
                  </div>
                  <Activity className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Subscription Trends</CardTitle>
              <CardDescription>Monthly recurring revenue and subscription growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnels</CardTitle>
              <CardDescription>Track user progression through key conversion paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Onboarding Funnel</h3>
                  <div className="space-y-3">
                    {[
                      { step: "Sign Up", users: 10000, rate: 100 },
                      { step: "Email Verification", users: 8500, rate: 85 },
                      { step: "Profile Setup", users: 7200, rate: 72 },
                      { step: "Goal Setting", users: 6100, rate: 61 },
                      { step: "First Workout", users: 4800, rate: 48 },
                      { step: "Week 1 Complete", users: 3200, rate: 32 },
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium">{step.step}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${step.rate}%` }}
                          >
                            {step.rate}%
                          </div>
                        </div>
                        <div className="w-20 text-sm text-gray-600">{step.users.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Analysis</CardTitle>
              <CardDescription>User retention by signup cohort</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Cohort</th>
                      <th className="text-center p-2">Users</th>
                      <th className="text-center p-2">Week 1</th>
                      <th className="text-center p-2">Week 2</th>
                      <th className="text-center p-2">Week 4</th>
                      <th className="text-center p-2">Week 8</th>
                      <th className="text-center p-2">Week 12</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cohort: "Jan 2024", users: 1200, w1: 85, w2: 72, w4: 58, w8: 45, w12: 38 },
                      { cohort: "Feb 2024", users: 1800, users: 1800, w1: 88, w2: 75, w4: 62, w8: 48, w12: 41 },
                      { cohort: "Mar 2024", users: 2400, w1: 90, w2: 78, w4: 65, w8: 52, w12: 44 },
                      { cohort: "Apr 2024", users: 3200, w1: 92, w2: 81, w4: 68, w8: 55, w12: null },
                      { cohort: "May 2024", users: 4100, w1: 94, w2: 83, w4: 71, w8: null, w12: null },
                      { cohort: "Jun 2024", users: 5200, w1: 96, w2: 85, w4: null, w8: null, w12: null },
                    ].map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{row.cohort}</td>
                        <td className="p-2 text-center">{row.users.toLocaleString()}</td>
                        <td className="p-2 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{row.w1}%</span>
                        </td>
                        <td className="p-2 text-center">
                          {row.w2 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{row.w2}%</span>
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {row.w4 && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{row.w4}%</span>
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {row.w8 && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">{row.w8}%</span>
                          )}
                        </td>
                        <td className="p-2 text-center">
                          {row.w12 && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">{row.w12}%</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
