"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Star, MapPin, Clock, DollarSign, Calendar, MessageCircle, Phone, Video, Award, Users } from "lucide-react"
import Link from "next/link"

// Mock provider data - in real app this would come from API
const provider = {
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
  specialties: ["Anxiety", "Depression", "Trauma", "CBT", "PTSD", "Mindfulness"],
  bio: "Dr. Sarah Chen is a licensed clinical psychologist with over 10 years of experience helping individuals overcome anxiety, depression, and trauma. She specializes in evidence-based therapies including Cognitive Behavioral Therapy (CBT) and mindfulness-based interventions.",
  education: [
    "Ph.D. in Clinical Psychology - Stanford University",
    "M.A. in Psychology - UC Berkeley",
    "B.A. in Psychology - UCLA",
  ],
  certifications: ["Licensed Clinical Psychologist (CA)", "Certified CBT Therapist", "Trauma-Informed Care Specialist"],
  experience: "10+ years",
  languages: ["English", "Mandarin", "Spanish"],
  sessionTypes: ["In-Person", "Video Call", "Phone Call"],
  insurance: ["Blue Cross", "Aetna", "Cigna", "UnitedHealth"],
}

const reviews = [
  {
    id: 1,
    author: "Jennifer M.",
    rating: 5,
    date: "2 weeks ago",
    content:
      "Dr. Chen has been incredibly helpful in my journey with anxiety. Her approach is both professional and compassionate, and I've seen significant improvement in my mental health.",
  },
  {
    id: 2,
    author: "Michael R.",
    rating: 5,
    date: "1 month ago",
    content:
      "Excellent therapist! Dr. Chen's CBT techniques have given me practical tools to manage my depression. Highly recommend her to anyone seeking professional mental health support.",
  },
  {
    id: 3,
    author: "Lisa K.",
    rating: 4,
    date: "2 months ago",
    content:
      "Very knowledgeable and patient. Dr. Chen creates a safe space where I feel comfortable sharing my thoughts and concerns. The sessions have been transformative.",
  },
]

export default function ProviderProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Provider Header */}
        <Card className="border-slate-200 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Provider Image and Basic Info */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-slate-200 rounded-full overflow-hidden mb-4">
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
                    <Users className="h-16 w-16 text-slate-600" />
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-slate-900">{provider.rating}</span>
                    <span className="text-slate-500">({provider.reviews} reviews)</span>
                  </div>
                  <p className="text-slate-600 text-sm">{provider.experience} experience</p>
                </div>
              </div>

              {/* Provider Details */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      {provider.name}
                      {provider.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      )}
                    </h1>
                    <p className="text-xl text-slate-600 mb-2">{provider.specialty}</p>
                    <div className="flex items-center gap-4 text-slate-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {provider.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {provider.availability}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {provider.price}
                      </div>
                    </div>
                  </div>

                  {/* Booking Actions */}
                  <div className="flex flex-col gap-2 lg:min-w-48">
                    <Link href={`/providers/${provider.id}/book`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">About</h3>
                  <p className="text-slate-600 leading-relaxed">{provider.bio}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Education & Credentials */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Education & Credentials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Education</h4>
                  <ul className="space-y-1">
                    {provider.education.map((edu, index) => (
                      <li key={index} className="text-slate-600">
                        • {edu}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Certifications</h4>
                  <ul className="space-y-1">
                    {provider.certifications.map((cert, index) => (
                      <li key={index} className="text-slate-600">
                        • {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Patient Reviews</CardTitle>
                <CardDescription>What patients are saying about Dr. {provider.name.split(" ")[1]}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{review.author}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">{review.date}</span>
                    </div>
                    <p className="text-slate-600">{review.content}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Options */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Session Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {provider.sessionTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    {type === "Video Call" && <Video className="h-4 w-4 text-blue-600" />}
                    {type === "Phone Call" && <Phone className="h-4 w-4 text-green-600" />}
                    {type === "In-Person" && <MapPin className="h-4 w-4 text-purple-600" />}
                    <span className="text-slate-900">{type}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.languages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Insurance Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {provider.insurance.map((ins) => (
                    <div key={ins} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-900">{ins}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600 mt-3">Contact provider to verify your specific plan coverage</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-900 mb-3">Ready to get started?</h3>
                <div className="space-y-2">
                  <Link href={`/providers/${provider.id}/book`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                  >
                    Ask a Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
