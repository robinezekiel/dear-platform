"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Search, MapPin, Star, Clock, DollarSign, Filter, Heart, Brain, Dumbbell, Utensils } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "mental-health", name: "Mental Health", icon: Brain, color: "text-blue-600", bg: "bg-blue-100" },
  { id: "fitness", name: "Fitness & Training", icon: Dumbbell, color: "text-green-600", bg: "bg-green-100" },
  { id: "nutrition", name: "Nutrition", icon: Utensils, color: "text-orange-600", bg: "bg-orange-100" },
  { id: "wellness", name: "Wellness Coaching", icon: Heart, color: "text-purple-600", bg: "bg-purple-100" },
]

const providers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Clinical Psychologist",
    category: "mental-health",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    price: "$150/session",
    availability: "Available Today",
    image: "/diverse-user-avatars.png",
    verified: true,
    specialties: ["Anxiety", "Depression", "Trauma", "CBT"],
    bio: "Specializing in evidence-based therapy for anxiety and depression with 10+ years experience.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    specialty: "Certified Personal Trainer",
    category: "fitness",
    rating: 4.8,
    reviews: 89,
    location: "Los Angeles, CA",
    price: "$80/session",
    availability: "Next Available: Tomorrow",
    image: "/diverse-user-avatars.png",
    verified: true,
    specialties: ["Weight Loss", "Strength Training", "HIIT", "Nutrition"],
    bio: "Helping clients achieve sustainable fitness transformations through personalized training programs.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Registered Dietitian",
    category: "nutrition",
    rating: 4.9,
    reviews: 156,
    location: "Austin, TX",
    price: "$120/consultation",
    availability: "Available This Week",
    image: "/diverse-user-avatars.png",
    verified: true,
    specialties: ["Weight Management", "Sports Nutrition", "Meal Planning", "Diabetes"],
    bio: "Evidence-based nutrition counseling for sustainable lifestyle changes and optimal health.",
  },
  {
    id: 4,
    name: "Lisa Thompson",
    specialty: "Wellness Coach",
    category: "wellness",
    rating: 4.7,
    reviews: 73,
    location: "Seattle, WA",
    price: "$100/session",
    availability: "Available Today",
    image: "/diverse-user-avatars.png",
    verified: true,
    specialties: ["Life Coaching", "Stress Management", "Mindfulness", "Goal Setting"],
    bio: "Empowering individuals to create balanced, fulfilling lives through holistic wellness approaches.",
  },
  {
    id: 5,
    name: "Dr. Michael Park",
    specialty: "Addiction Counselor",
    category: "mental-health",
    rating: 4.9,
    reviews: 94,
    location: "Denver, CO",
    price: "$140/session",
    availability: "Available Tomorrow",
    image: "/diverse-user-avatars.png",
    verified: true,
    specialties: ["Addiction Recovery", "Substance Abuse", "Group Therapy", "Family Counseling"],
    bio: "Compassionate addiction recovery specialist with expertise in evidence-based treatment approaches.",
  },
  {
    id: 6,
    name: "Amanda Foster",
    specialty: "Yoga Instructor & Wellness Coach",
    category: "wellness",
    rating: 4.8,
    reviews: 112,
    location: "Portland, OR",
    price: "$75/session",
    availability: "Available Today",
    image: "/diverse-user-avatars.png",
    verified: true,
    specialties: ["Yoga Therapy", "Meditation", "Stress Relief", "Flexibility"],
    bio: "Integrating ancient wisdom with modern wellness practices for mind-body transformation.",
  },
]

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredProviders, setFilteredProviders] = useState(providers)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterProviders(term, selectedCategory)
  }

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    filterProviders(searchTerm, categoryId)
  }

  const filterProviders = (term: string, category: string | null) => {
    let filtered = providers

    if (category) {
      filtered = filtered.filter((provider) => provider.category === category)
    }

    if (term) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(term.toLowerCase()) ||
          provider.specialty.toLowerCase().includes(term.toLowerCase()) ||
          provider.specialties.some((spec) => spec.toLowerCase().includes(term.toLowerCase())),
      )
    }

    setFilteredProviders(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Healthcare Provider Marketplace</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with verified healthcare professionals who understand your transformation journey. Find the right
            support for your physical, mental, and emotional wellness goals.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="border-slate-200 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search providers, specialties, or conditions..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => handleCategoryFilter(null)}
                  size="sm"
                  className={selectedCategory === null ? "bg-blue-600 hover:bg-blue-700" : "bg-transparent"}
                >
                  All Categories
                </Button>
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => handleCategoryFilter(category.id)}
                      size="sm"
                      className={selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : "bg-transparent"}
                    >
                      <IconComponent className="h-4 w-4 mr-1" />
                      {category.name}
                    </Button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            {filteredProviders.length} Provider{filteredProviders.length !== 1 ? "s" : ""} Found
          </h2>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Provider Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {filteredProviders.map((provider) => {
            const category = categories.find((cat) => cat.id === provider.category)
            const CategoryIcon = category?.icon || Heart

            return (
              <Card key={provider.id} className="border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Provider Image */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-slate-200 rounded-full overflow-hidden">
                        <img
                          src={provider.image || "/placeholder.svg"}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            target.nextElementSibling?.classList.remove("hidden")
                          }}
                        />
                        <div className="hidden w-full h-full bg-slate-300 flex items-center justify-center">
                          <CategoryIcon className={`h-8 w-8 ${category?.color || "text-slate-600"}`} />
                        </div>
                      </div>
                    </div>

                    {/* Provider Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            {provider.name}
                            {provider.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                Verified
                              </Badge>
                            )}
                          </h3>
                          <p className="text-slate-600">{provider.specialty}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-slate-900">{provider.rating}</span>
                            <span className="text-slate-500 text-sm">({provider.reviews})</span>
                          </div>
                          <p className="text-sm text-slate-600">{provider.price}</p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{provider.bio}</p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {provider.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {provider.specialties.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{provider.specialties.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Location and Availability */}
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {provider.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {provider.availability}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/providers/${provider.id}`} className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">
                            View Profile
                          </Button>
                        </Link>
                        <Link href={`/providers/${provider.id}/book`} className="flex-1">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Appointment</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Category Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            const categoryProviders = providers.filter((p) => p.category === category.id)

            return (
              <Card
                key={category.id}
                className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryFilter(category.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-12 h-12 ${category.bg} rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <IconComponent className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{categoryProviders.length} providers available</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Trust and Safety */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Trust & Safety</CardTitle>
            <CardDescription className="text-green-700">Your safety and privacy are our top priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Badge className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-900 mb-1">Verified Professionals</h4>
                <p className="text-sm text-green-700">All providers are licensed and background-checked</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-900 mb-1">Quality Assurance</h4>
                <p className="text-sm text-green-700">Regular quality reviews and patient feedback monitoring</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-900 mb-1">Transparent Pricing</h4>
                <p className="text-sm text-green-700">Clear, upfront pricing with no hidden fees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
