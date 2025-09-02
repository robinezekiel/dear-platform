import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/dear/navigation-header"
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  Video,
  Users,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Heart,
  Shield,
  CreditCard,
  Settings,
} from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 font-sans">Help & Support</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            Find answers, get support, and learn how to make the most of your DEAR transformation journey
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-dear-primary mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Live Chat</h3>
              <p className="text-sm text-slate-600 mb-3">Get instant help from our support team</p>
              <Badge className="bg-dear-success/10 text-dear-success">Available now</Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-dear-accent mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Email Support</h3>
              <p className="text-sm text-slate-600 mb-3">Send us a detailed message</p>
              <Badge className="bg-dear-accent/10 text-dear-accent">24h response</Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-dear-warning mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Video Tutorials</h3>
              <p className="text-sm text-slate-600 mb-3">Learn with step-by-step guides</p>
              <Badge className="bg-dear-warning/10 text-dear-warning">50+ videos</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: "Getting Started", icon: Lightbulb, count: 12, color: "dear-primary" },
                        { name: "AI Features", icon: Zap, count: 8, color: "dear-accent" },
                        { name: "Health & Wellness", icon: Heart, count: 15, color: "dear-success" },
                        { name: "Privacy & Security", icon: Shield, count: 6, color: "dear-warning" },
                        { name: "Billing", icon: CreditCard, count: 9, color: "dear-primary" },
                        { name: "Account Settings", icon: Settings, count: 7, color: "dear-accent" },
                      ].map((category, index) => (
                        <button
                          key={index}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            index === 0
                              ? `bg-${category.color}/10 border border-${category.color}/20`
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <category.icon className={`h-4 w-4 text-${category.color}`} />
                            <span className="font-medium text-slate-800">{category.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {category.count}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Getting Started</h2>

                  {[
                    {
                      question: "How do I set up my DEAR account?",
                      answer:
                        "Setting up your DEAR account is simple! After signing up, you'll go through our personalized onboarding process where you'll set your transformation goals, complete your health profile, and take your baseline photos. This helps our AI provide personalized recommendations from day one.",
                      popular: true,
                    },
                    {
                      question: "What makes DEAR different from other wellness apps?",
                      answer:
                        "DEAR combines AI-powered visual analysis, comprehensive mental health support, and a healthcare provider marketplace in one platform. Our unique approach focuses on holistic transformation with real-time AI insights and personalized guidance.",
                      popular: true,
                    },
                    {
                      question: "How does the AI visual analysis work?",
                      answer:
                        "Our AI analyzes your progress photos to track changes in body composition, posture, and overall appearance. It provides detailed metrics, progress predictions, and personalized recommendations based on your transformation goals.",
                      popular: false,
                    },
                    {
                      question: "Is my personal data secure and private?",
                      answer:
                        "Absolutely. We use enterprise-grade encryption and follow strict privacy protocols. Your journal entries, photos, and personal data are encrypted and never shared without your explicit consent. You have full control over your privacy settings.",
                      popular: true,
                    },
                    {
                      question: "Can I cancel my subscription anytime?",
                      answer:
                        "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to premium features until the end of your current billing period.",
                      popular: false,
                    },
                    {
                      question: "How do I connect with healthcare providers?",
                      answer:
                        "Use our Provider Marketplace to search for verified healthcare professionals by specialty, location, and availability. You can view profiles, read reviews, and book appointments directly through the platform.",
                      popular: false,
                    },
                  ].map((faq, index) => (
                    <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-slate-800 flex-1">{faq.question}</h3>
                          {faq.popular && <Badge className="bg-dear-success/10 text-dear-success ml-3">Popular</Badge>}
                        </div>
                        <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                          <Button variant="ghost" size="sm" className="text-dear-primary">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-500">
                            Need more help?
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Complete Onboarding Guide",
                  description: "Step-by-step walkthrough of setting up your DEAR account",
                  duration: "5 min read",
                  type: "Getting Started",
                  icon: Lightbulb,
                  color: "dear-primary",
                },
                {
                  title: "Using AI Visual Analysis",
                  description: "Learn how to take progress photos and interpret AI insights",
                  duration: "8 min read",
                  type: "AI Features",
                  icon: Zap,
                  color: "dear-accent",
                },
                {
                  title: "Mental Health & Recovery",
                  description: "Guide to using our mental health support tools effectively",
                  duration: "10 min read",
                  type: "Wellness",
                  icon: Heart,
                  color: "dear-success",
                },
                {
                  title: "Finding Healthcare Providers",
                  description: "How to search, evaluate, and book appointments with providers",
                  duration: "6 min read",
                  type: "Providers",
                  icon: Users,
                  color: "dear-warning",
                },
                {
                  title: "Nutrition Planning Basics",
                  description: "Getting started with meal planning and nutrition tracking",
                  duration: "7 min read",
                  type: "Nutrition",
                  icon: Heart,
                  color: "dear-success",
                },
                {
                  title: "Workout Planning & Tracking",
                  description: "Create effective workout routines and track your progress",
                  duration: "9 min read",
                  type: "Fitness",
                  icon: Zap,
                  color: "dear-accent",
                },
              ].map((guide, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-${guide.color}/10 rounded-lg flex items-center justify-center`}>
                        <guide.icon className={`h-5 w-5 text-${guide.color}`} />
                      </div>
                      <Badge className={`bg-${guide.color}/10 text-${guide.color}`}>{guide.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-3 w-3" />
                        {guide.duration}
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-dear-primary" />
                    Contact Support
                  </CardTitle>
                  <CardDescription>Choose the best way to reach our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-primary/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <MessageCircle className="h-5 w-5 text-dear-primary" />
                      <div>
                        <h3 className="font-semibold text-slate-800">Live Chat</h3>
                        <p className="text-sm text-slate-600">Get instant help from our support team</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-dear-success/10 text-dear-success">Available now</Badge>
                      <Button size="sm" className="bg-dear-primary hover:bg-dear-primary/90">
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-dear-accent/10 to-dear-accent/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="h-5 w-5 text-dear-accent" />
                      <div>
                        <h3 className="font-semibold text-slate-800">Email Support</h3>
                        <p className="text-sm text-slate-600">Send us a detailed message</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-dear-accent/10 text-dear-accent">24h response</Badge>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Send Email
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="h-5 w-5 text-dear-success" />
                      <div>
                        <h3 className="font-semibold text-slate-800">Phone Support</h3>
                        <p className="text-sm text-slate-600">Speak directly with our team</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-dear-success/10 text-dear-success">Mon-Fri 9AM-6PM PST</Badge>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Call Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                  <CardDescription>When our support team is available</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">Live Chat</span>
                      <Badge className="bg-dear-success/10 text-dear-success">24/7</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">Email Support</span>
                      <Badge className="bg-dear-accent/10 text-dear-accent">24h response</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">Phone Support</span>
                      <Badge className="bg-dear-warning/10 text-dear-warning">Mon-Fri 9AM-6PM</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-accent/10 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Emergency Support</h3>
                    <p className="text-sm text-slate-700 mb-3">
                      For mental health crises or urgent medical concerns, please contact emergency services or use our
                      crisis resources.
                    </p>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Crisis Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-dear-primary" />
                      Community Support
                    </CardTitle>
                    <CardDescription>Get help from other DEAR users and share your experiences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-primary/5 rounded-lg">
                        <h3 className="font-semibold text-slate-800 mb-2">General Discussion</h3>
                        <p className="text-sm text-slate-600 mb-3">Share your journey and connect with others</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">2.3k members</Badge>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Join
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                        <h3 className="font-semibold text-slate-800 mb-2">Success Stories</h3>
                        <p className="text-sm text-slate-600 mb-3">Celebrate achievements and inspire others</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">1.8k members</Badge>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Join
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-dear-accent/10 to-dear-accent/5 rounded-lg">
                        <h3 className="font-semibold text-slate-800 mb-2">Technical Help</h3>
                        <p className="text-sm text-slate-600 mb-3">Get help with app features and troubleshooting</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">892 members</Badge>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Join
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-dear-warning/10 to-dear-warning/5 rounded-lg">
                        <h3 className="font-semibold text-slate-800 mb-2">Mental Health Support</h3>
                        <p className="text-sm text-slate-600 mb-3">Safe space for mental health discussions</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">1.2k members</Badge>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Community Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "How I lost 30 pounds using DEAR's AI recommendations",
                          author: "Sarah M.",
                          replies: 23,
                          time: "2 hours ago",
                          category: "Success Stories",
                        },
                        {
                          title: "Tips for staying consistent with meditation practice",
                          author: "Mike R.",
                          replies: 15,
                          time: "4 hours ago",
                          category: "General Discussion",
                        },
                        {
                          title: "AI visual analysis not working properly?",
                          author: "Jennifer L.",
                          replies: 8,
                          time: "6 hours ago",
                          category: "Technical Help",
                        },
                      ].map((post, index) => (
                        <div key={index} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-800 mb-1">{post.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <span>by {post.author}</span>
                              <span>•</span>
                              <span>{post.replies} replies</span>
                              <span>•</span>
                              <span>{post.time}</span>
                            </div>
                            <Badge variant="outline" className="text-xs mt-2">
                              {post.category}
                            </Badge>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle>Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-dear-success mt-0.5" />
                        <span>Be respectful and supportive</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-dear-success mt-0.5" />
                        <span>Share experiences, not medical advice</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-dear-success mt-0.5" />
                        <span>Protect privacy and confidentiality</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-dear-success mt-0.5" />
                        <span>Report inappropriate content</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Members</span>
                        <span className="text-sm font-medium">5,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Today</span>
                        <span className="text-sm font-medium">342</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Posts This Week</span>
                        <span className="text-sm font-medium">128</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Success Stories</span>
                        <span className="text-sm font-medium">89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-dear-success" />
                    System Status
                  </CardTitle>
                  <CardDescription>Current status of all DEAR services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { service: "DEAR Platform", status: "Operational", color: "dear-success" },
                      { service: "AI Visual Analysis", status: "Operational", color: "dear-success" },
                      { service: "Provider Marketplace", status: "Operational", color: "dear-success" },
                      { service: "Mental Health Services", status: "Operational", color: "dear-success" },
                      { service: "Payment Processing", status: "Operational", color: "dear-success" },
                      { service: "Mobile App", status: "Maintenance", color: "dear-warning" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-800">{item.service}</span>
                        <Badge className={`bg-${item.color}/10 text-${item.color}`}>{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                  <CardDescription>Latest system updates and maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Mobile App Maintenance",
                        description: "Scheduled maintenance for mobile app performance improvements",
                        time: "2 hours ago",
                        status: "In Progress",
                        icon: AlertCircle,
                        color: "dear-warning",
                      },
                      {
                        title: "AI Analysis Enhancement",
                        description: "Deployed improved AI models for better visual analysis accuracy",
                        time: "1 day ago",
                        status: "Completed",
                        icon: CheckCircle,
                        color: "dear-success",
                      },
                      {
                        title: "Security Update",
                        description: "Enhanced security measures and encryption protocols",
                        time: "3 days ago",
                        status: "Completed",
                        icon: CheckCircle,
                        color: "dear-success",
                      },
                    ].map((update, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <update.icon className={`h-4 w-4 text-${update.color} mt-1`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{update.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{update.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={`bg-${update.color}/10 text-${update.color} text-xs`}>
                              {update.status}
                            </Badge>
                            <span className="text-xs text-slate-500">{update.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
