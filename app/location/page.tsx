import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Globe, Clock, DollarSign, Users, Search } from "lucide-react"

export default function LocationPage() {
  const userLocation = {
    country: "United States",
    state: "California",
    city: "San Francisco",
    timezone: "PST",
    currency: "USD",
    language: "English",
  }

  const nearbyProviders = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Nutritionist",
      distance: "0.8 miles",
      rating: 4.9,
      languages: ["English", "Spanish"],
      availability: "Available today",
    },
    {
      id: 2,
      name: "FitLife Gym",
      specialty: "Fitness Center",
      distance: "1.2 miles",
      rating: 4.7,
      languages: ["English"],
      availability: "Open now",
    },
    {
      id: 3,
      name: "Mindful Wellness Center",
      specialty: "Mental Health",
      distance: "2.1 miles",
      rating: 4.8,
      languages: ["English", "Mandarin"],
      availability: "Booking available",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Location & Language</h1>
        <p className="text-gray-600">Customize your experience based on your location and preferences</p>
      </div>

      <Tabs defaultValue="location" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="providers">Local Providers</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="regional">Regional Content</TabsTrigger>
        </TabsList>

        <TabsContent value="location" className="space-y-6">
          {/* Current Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-500" />
                Current Location
              </CardTitle>
              <CardDescription>Your location helps us provide personalized local content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Country</label>
                  <Select defaultValue={userLocation.country}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">State/Province</label>
                  <Select defaultValue={userLocation.state}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Texas">Texas</SelectItem>
                      <SelectItem value="Florida">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">City</label>
                <Input defaultValue={userLocation.city} placeholder="Enter your city" />
              </div>
              <Button>Update Location</Button>
            </CardContent>
          </Card>

          {/* Location Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Timezone</p>
                    <p className="text-lg font-semibold">{userLocation.timezone}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Currency</p>
                    <p className="text-lg font-semibold">{userLocation.currency}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Language</p>
                    <p className="text-lg font-semibold">{userLocation.language}</p>
                  </div>
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location-based Features */}
          <Card>
            <CardHeader>
              <CardTitle>Location-based Features</CardTitle>
              <CardDescription>Features available in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">Local Healthcare Providers</p>
                    <p className="text-sm text-gray-600">Find nearby professionals</p>
                  </div>
                  <Badge>Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">Regional Nutrition Data</p>
                    <p className="text-sm text-gray-600">Local food and nutrition info</p>
                  </div>
                  <Badge>Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">Local Fitness Centers</p>
                    <p className="text-sm text-gray-600">Nearby gyms and studios</p>
                  </div>
                  <Badge>Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">Emergency Services</p>
                    <p className="text-sm text-gray-600">Local emergency contacts</p>
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          {/* Search Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Local Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nutritionist">Nutritionist</SelectItem>
                    <SelectItem value="fitness">Fitness Trainer</SelectItem>
                    <SelectItem value="mental-health">Mental Health</SelectItem>
                    <SelectItem value="general">General Practitioner</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Within 1 mile</SelectItem>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Search Providers</Button>
            </CardContent>
          </Card>

          {/* Provider Results */}
          <div className="space-y-4">
            {nearbyProviders.map((provider) => (
              <Card key={provider.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <p className="text-gray-600">{provider.specialty}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{provider.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">⭐ {provider.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{provider.availability}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {provider.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">Book Appointment</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          {/* Language Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Language Preferences
              </CardTitle>
              <CardDescription>Choose your preferred language for the DEAR platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { code: "en", name: "English", native: "English", flag: "🇺🇸", completion: 100 },
                  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸", completion: 95 },
                  { code: "fr", name: "French", native: "Français", flag: "🇫🇷", completion: 90 },
                  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪", completion: 85 },
                  { code: "zh", name: "Chinese", native: "中文", flag: "🇨🇳", completion: 80 },
                  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵", completion: 75 },
                ].map((language) => (
                  <div
                    key={language.code}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div>
                        <p className="font-semibold">{language.name}</p>
                        <p className="text-sm text-gray-600">{language.native}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={language.completion === 100 ? "default" : "secondary"}>
                        {language.completion}%
                      </Badge>
                      {language.code === "en" && <p className="text-xs text-emerald-600 mt-1">Current</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Content Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Content Localization</CardTitle>
              <CardDescription>Customize content based on your region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Measurement Units</p>
                    <p className="text-sm text-gray-600">Imperial (lbs, ft) or Metric (kg, cm)</p>
                  </div>
                  <Select defaultValue="imperial">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial</SelectItem>
                      <SelectItem value="metric">Metric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Date Format</p>
                    <p className="text-sm text-gray-600">MM/DD/YYYY or DD/MM/YYYY</p>
                  </div>
                  <Select defaultValue="us">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">MM/DD/YYYY</SelectItem>
                      <SelectItem value="international">DD/MM/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Time Format</p>
                    <p className="text-sm text-gray-600">12-hour or 24-hour format</p>
                  </div>
                  <Select defaultValue="12">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12-hour</SelectItem>
                      <SelectItem value="24">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          {/* Regional Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-500" />
                Your Region Stats
              </CardTitle>
              <CardDescription>Health and wellness data for San Francisco, CA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">12,847</p>
                  <p className="text-sm text-gray-600">DEAR users in your area</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">234</p>
                  <p className="text-sm text-gray-600">Local healthcare providers</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">89%</p>
                  <p className="text-sm text-gray-600">User satisfaction rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Local Health Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Local Health Trends</CardTitle>
              <CardDescription>Popular health and wellness activities in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { activity: "Yoga & Mindfulness", popularity: 92, trend: "up" },
                  { activity: "Plant-based Nutrition", popularity: 87, trend: "up" },
                  { activity: "HIIT Workouts", popularity: 84, trend: "stable" },
                  { activity: "Mental Health Support", popularity: 79, trend: "up" },
                  { activity: "Outdoor Activities", popularity: 76, trend: "down" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold">{item.activity}</p>
                      <p className="text-sm text-gray-600">{item.popularity}% popularity</p>
                    </div>
                    <Badge
                      variant={item.trend === "up" ? "default" : item.trend === "down" ? "destructive" : "secondary"}
                    >
                      {item.trend === "up" ? "↗️ Trending" : item.trend === "down" ? "↘️ Declining" : "→ Stable"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Local Regulations */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Compliance</CardTitle>
              <CardDescription>Health regulations and compliance in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-green-700">HIPAA Compliant</p>
                    <p className="text-sm text-green-600">All health data is protected under US regulations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-green-700">FDA Guidelines</p>
                    <p className="text-sm text-green-600">Health recommendations follow FDA guidelines</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-blue-700">California Privacy Act</p>
                    <p className="text-sm text-blue-600">Enhanced privacy protections for CA residents</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
