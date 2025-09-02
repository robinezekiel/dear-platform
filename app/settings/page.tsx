import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/dear/navigation-header"
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Crown,
  Check,
  AlertTriangle,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 font-sans">Settings</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Manage your account, privacy, notifications, and subscription preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-dear-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Alex" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Johnson" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="Pacific Standard Time (PST)" />
                  </div>
                  <Button className="w-full bg-dear-primary hover:bg-dear-primary/90">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-dear-success" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2">
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-800">Two-Factor Authentication</div>
                      <div className="text-sm text-slate-600">Add an extra layer of security</div>
                    </div>
                    <Switch />
                  </div>
                  <Button className="w-full bg-dear-success hover:bg-dear-success/90">Update Password</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-dear-primary" />
                  Privacy Controls
                </CardTitle>
                <CardDescription>Control how your data is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Data Analytics",
                    description: "Allow DEAR to analyze your data to provide personalized insights",
                    enabled: true,
                  },
                  {
                    title: "AI Recommendations",
                    description: "Enable AI-powered suggestions based on your activity",
                    enabled: true,
                  },
                  {
                    title: "Community Visibility",
                    description: "Show your progress and achievements to the DEAR community",
                    enabled: false,
                  },
                  {
                    title: "Research Participation",
                    description: "Contribute anonymized data to health and wellness research",
                    enabled: true,
                  },
                  {
                    title: "Marketing Communications",
                    description: "Receive promotional emails and product updates",
                    enabled: false,
                  },
                  {
                    title: "Third-Party Integrations",
                    description: "Allow DEAR to connect with other health and fitness apps",
                    enabled: true,
                  },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{setting.title}</div>
                      <div className="text-sm text-slate-600">{setting.description}</div>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-dear-accent" />
                    Push Notifications
                  </CardTitle>
                  <CardDescription>Manage notifications sent to your device</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Daily Reminders", description: "Workout and meditation reminders", enabled: true },
                    { title: "Progress Updates", description: "Weekly progress summaries", enabled: true },
                    { title: "AI Insights", description: "Personalized recommendations", enabled: true },
                    { title: "Community Activity", description: "Support group and challenge updates", enabled: false },
                    { title: "Appointment Reminders", description: "Healthcare provider appointments", enabled: true },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{notification.title}</div>
                        <div className="text-sm text-slate-600">{notification.description}</div>
                      </div>
                      <Switch defaultChecked={notification.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                  <CardDescription>Choose what emails you'd like to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Weekly Newsletter", description: "Health tips and platform updates", enabled: true },
                    {
                      title: "Achievement Celebrations",
                      description: "Milestone and goal completion emails",
                      enabled: true,
                    },
                    {
                      title: "Provider Messages",
                      description: "Communications from healthcare providers",
                      enabled: true,
                    },
                    { title: "Product Updates", description: "New features and improvements", enabled: false },
                    { title: "Special Offers", description: "Promotions and discounts", enabled: false },
                  ].map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{email.title}</div>
                        <div className="text-sm text-slate-600">{email.description}</div>
                      </div>
                      <Switch defaultChecked={email.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Plan */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-dear-primary/10 to-dear-accent/10 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-dear-warning" />
                      Current Plan: DEAR Pro
                    </CardTitle>
                    <CardDescription>Full access to all premium features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-slate-800">$29.99/month</div>
                        <div className="text-sm text-slate-600">Billed monthly • Next billing: March 15, 2024</div>
                      </div>
                      <Badge className="bg-dear-success text-white">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Button variant="outline" className="bg-transparent">
                        Change Plan
                      </Button>
                      <Button variant="outline" className="bg-transparent text-dear-error border-dear-error">
                        Cancel Subscription
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-dear-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                        <div>
                          <div className="font-medium text-slate-800">•••• •••• •••• 4242</div>
                          <div className="text-sm text-slate-600">Expires 12/26</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Add New Payment Method
                    </Button>
                  </CardContent>
                </Card>

                {/* Billing History */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>Your recent transactions and invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: "Feb 15, 2024", amount: "$29.99", status: "Paid", invoice: "INV-2024-002" },
                        { date: "Jan 15, 2024", amount: "$29.99", status: "Paid", invoice: "INV-2024-001" },
                        { date: "Dec 15, 2023", amount: "$29.99", status: "Paid", invoice: "INV-2023-012" },
                      ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="font-medium text-slate-800">{transaction.date}</div>
                              <div className="text-sm text-slate-600">{transaction.invoice}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="font-medium text-slate-800">{transaction.amount}</div>
                              <Badge className="bg-dear-success/10 text-dear-success">{transaction.status}</Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plan Comparison */}
              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                    <CardDescription>Choose the plan that fits your needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border-2 border-dear-primary/30 bg-dear-primary/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-4 w-4 text-dear-warning" />
                        <span className="font-semibold text-slate-800">DEAR Pro</span>
                        <Badge className="bg-dear-success text-white">Current</Badge>
                      </div>
                      <div className="text-2xl font-bold text-slate-800 mb-2">$29.99/mo</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>AI Visual Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Unlimited Journaling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Provider Marketplace</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Premium Support</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="font-semibold text-slate-800 mb-2">DEAR Basic</div>
                      <div className="text-2xl font-bold text-slate-800 mb-2">$9.99/mo</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Basic Tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Limited AI Features</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Community Access</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                        Downgrade
                      </Button>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="font-semibold text-slate-800 mb-2">DEAR Free</div>
                      <div className="text-2xl font-bold text-slate-800 mb-2">$0/mo</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Basic Dashboard</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-dear-success" />
                          <span>Limited Features</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                        Downgrade
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-dear-accent" />
                    Data Export
                  </CardTitle>
                  <CardDescription>Download your personal data and activity history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium text-slate-800 mb-2">Available Data</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Profile Information</span>
                        <Badge variant="outline">Ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Journal Entries</span>
                        <Badge variant="outline">Ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Progress Data</span>
                        <Badge variant="outline">Ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Photos & Media</span>
                        <Badge variant="outline">Ready</Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-dear-accent hover:bg-dear-accent/90">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <div className="text-xs text-slate-500">
                    Data will be provided in JSON format within 24 hours via email.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-dear-error" />
                    Account Deletion
                  </CardTitle>
                  <CardDescription>Permanently delete your account and all associated data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-dear-error/10 border border-dear-error/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-dear-error mt-0.5" />
                      <div>
                        <h3 className="font-medium text-dear-error mb-1">Warning</h3>
                        <p className="text-sm text-slate-700">
                          This action cannot be undone. All your data, including journal entries, progress tracking, and
                          photos will be permanently deleted.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-slate-600">Before deleting your account, consider:</div>
                    <ul className="text-sm text-slate-600 space-y-1 ml-4">
                      <li>• Exporting your data for personal records</li>
                      <li>• Canceling any active subscriptions</li>
                      <li>• Informing connected healthcare providers</li>
                    </ul>
                  </div>
                  <Button variant="destructive" className="w-full bg-dear-error hover:bg-dear-error/90">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
