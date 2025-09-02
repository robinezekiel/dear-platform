"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Target, Heart, Shield, Camera, Save, Edit, Calendar, MapPin, Mail, Phone } from "lucide-react"

const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/diverse-user-avatars.png",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  joinDate: "January 2024",
  age: 28,
  gender: "Male",
  height: "175 cm",
  weight: "72.5 kg",
  goals: ["Weight Loss", "Muscle Building", "Mental Wellness"],
  medicalConditions: ["None"],
  dietaryRestrictions: ["Vegetarian"],
  bio: "Passionate about holistic wellness and personal transformation. Currently focused on building sustainable healthy habits while balancing a busy professional life.",
}

export default function MyProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
    age: mockUser.age.toString(),
    gender: mockUser.gender,
    height: mockUser.height,
    weight: mockUser.weight,
    bio: mockUser.bio,
    goals: mockUser.goals,
    medicalConditions: mockUser.medicalConditions,
    dietaryRestrictions: mockUser.dietaryRestrictions,
  })

  const handleSave = () => {
    console.log("Saving profile:", formData)
    setIsEditing(false)
    // TODO: Implement actual save functionality
  }

  const handleGoalToggle = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.includes(goal) ? formData.goals.filter((g) => g !== goal) : [...formData.goals, goal],
    })
  }

  const availableGoals = [
    "Weight Loss",
    "Weight Gain",
    "Muscle Building",
    "Body Recomposition",
    "Mental Wellness",
    "Stress Management",
    "Better Sleep",
    "Increased Energy",
    "Skin Health",
    "Hair Health",
    "Addiction Recovery",
    "Confidence Building",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <NavigationHeader user={mockUser} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              My Profile
            </h1>
            <p className="text-muted-foreground mt-2">Manage your personal information and transformation goals</p>
          </div>
          <div className="flex items-center gap-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="mt-4">{mockUser.name}</CardTitle>
                <CardDescription>Member since {mockUser.joinDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUser.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUser.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUser.age} years old</span>
                </div>
              </CardContent>
            </Card>

            {/* Current Goals */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockUser.goals.map((goal) => (
                    <Badge key={goal} variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your basic profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => setFormData({ ...formData, gender: value })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Non-binary">Non-binary</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="health" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-success" />
                      Health Information
                    </CardTitle>
                    <CardDescription>
                      Keep your health profile up to date for personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          value={formData.height}
                          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                          disabled={!isEditing}
                          placeholder="175 cm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Current Weight</Label>
                        <Input
                          id="weight"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          disabled={!isEditing}
                          placeholder="70 kg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Medical Conditions</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.medicalConditions.map((condition) => (
                          <Badge key={condition} variant="outline" className="bg-muted/50">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Add Condition
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Dietary Restrictions</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.dietaryRestrictions.map((restriction) => (
                          <Badge
                            key={restriction}
                            variant="outline"
                            className="bg-accent/10 border-accent/20 text-accent"
                          >
                            {restriction}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Add Restriction
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Transformation Goals
                    </CardTitle>
                    <CardDescription>Select your current focus areas for personalized guidance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableGoals.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal}
                            checked={formData.goals.includes(goal)}
                            onCheckedChange={() => handleGoalToggle(goal)}
                            disabled={!isEditing}
                          />
                          <Label
                            htmlFor={goal}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-warning" />
                      Privacy & Security
                    </CardTitle>
                    <CardDescription>Control your data and privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Profile Visibility</h4>
                          <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
                        </div>
                        <Select defaultValue="private">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Progress Sharing</h4>
                          <p className="text-sm text-muted-foreground">Allow sharing of your transformation progress</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">AI Data Usage</h4>
                          <p className="text-sm text-muted-foreground">Use your data to improve AI recommendations</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Marketing Communications</h4>
                          <p className="text-sm text-muted-foreground">Receive updates and promotional content</p>
                        </div>
                        <Checkbox />
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
