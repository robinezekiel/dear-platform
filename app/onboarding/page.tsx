"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Heart, Target, Brain, Dumbbell, Camera, Upload } from "lucide-react"

const TOTAL_STEPS = 6

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    age: "",
    gender: "",
    height: "",
    weight: "",
    location: "",

    // Step 2: Goals
    primaryGoals: [] as string[],
    specificGoals: "",
    timeframe: "",

    // Step 3: Health Profile
    medicalConditions: [] as string[],
    medications: "",
    allergies: "",
    dietaryRestrictions: [] as string[],

    // Step 4: Mental Health & Recovery
    mentalHealthSupport: "",
    recoverySupport: "",
    stressLevel: "",
    sleepQuality: "",

    // Step 5: Lifestyle
    activityLevel: "",
    workSchedule: "",
    availableTime: "",
    preferredWorkoutTime: "",

    // Step 6: Photo Upload
    baselinePhoto: null as File | null,
  })

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      window.location.href = "/dashboard"
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGoalToggle = (goal: string) => {
    setFormData({
      ...formData,
      primaryGoals: formData.primaryGoals.includes(goal)
        ? formData.primaryGoals.filter((g) => g !== goal)
        : [...formData.primaryGoals, goal],
    })
  }

  const handleConditionToggle = (condition: string) => {
    setFormData({
      ...formData,
      medicalConditions: formData.medicalConditions.includes(condition)
        ? formData.medicalConditions.filter((c) => c !== condition)
        : [...formData.medicalConditions, condition],
    })
  }

  const handleDietToggle = (diet: string) => {
    setFormData({
      ...formData,
      dietaryRestrictions: formData.dietaryRestrictions.includes(diet)
        ? formData.dietaryRestrictions.filter((d) => d !== diet)
        : [...formData.dietaryRestrictions, diet],
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, baselinePhoto: file })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">Help us understand your starting point</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (City, Country)</Label>
              <Input
                id="location"
                placeholder="New York, USA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Your Transformation Goals</h2>
              <p className="text-muted-foreground">What do you want to achieve? (Select all that apply)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Weight Loss",
                "Muscle Building",
                "Body Recomposition",
                "Skin Health",
                "Hair Health",
                "Mental Wellness",
                "Addiction Recovery",
                "Stress Management",
                "Better Sleep",
                "Increased Energy",
                "Confidence Building",
                "Overall Health",
              ].map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={formData.primaryGoals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
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
            <div className="space-y-2">
              <Label htmlFor="specificGoals">Specific Goals (Optional)</Label>
              <Textarea
                id="specificGoals"
                placeholder="Describe your specific transformation goals in detail..."
                value={formData.specificGoals}
                onChange={(e) => setFormData({ ...formData, specificGoals: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeframe">Desired Timeframe</Label>
              <Select
                value={formData.timeframe}
                onValueChange={(value) => setFormData({ ...formData, timeframe: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="1-2-years">1-2 years</SelectItem>
                  <SelectItem value="long-term">Long-term lifestyle change</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Health Profile</h2>
              <p className="text-muted-foreground">Help us personalize your plan safely</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Medical Conditions (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {[
                    "Diabetes",
                    "High Blood Pressure",
                    "Heart Disease",
                    "Thyroid Issues",
                    "PCOS",
                    "Depression",
                    "Anxiety",
                    "Eating Disorder",
                    "Joint Problems",
                    "Back Problems",
                  ].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={formData.medicalConditions.includes(condition)}
                        onCheckedChange={() => handleConditionToggle(condition)}
                      />
                      <Label htmlFor={condition} className="text-sm">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="List any medications you're currently taking..."
                  value={formData.medications}
                  onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="Food allergies, medication allergies, etc."
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-base font-medium">Dietary Restrictions</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {[
                    "Vegetarian",
                    "Vegan",
                    "Gluten-Free",
                    "Dairy-Free",
                    "Keto",
                    "Paleo",
                    "Halal",
                    "Kosher",
                    "Low-Sodium",
                    "Diabetic",
                  ].map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox
                        id={diet}
                        checked={formData.dietaryRestrictions.includes(diet)}
                        onCheckedChange={() => handleDietToggle(diet)}
                      />
                      <Label htmlFor={diet} className="text-sm">
                        {diet}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Mental Health & Recovery</h2>
              <p className="text-muted-foreground">Your mental wellness is our priority</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Do you need mental health support?</Label>
                <RadioGroup
                  value={formData.mentalHealthSupport}
                  onValueChange={(value) => setFormData({ ...formData, mentalHealthSupport: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-therapy" id="yes-therapy" />
                    <Label htmlFor="yes-therapy">Yes, I'm interested in therapy/counseling</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-support" id="yes-support" />
                    <Label htmlFor="yes-support">Yes, I need emotional support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe">Maybe, I'm open to it</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No, not at this time</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Label className="text-base font-medium">Do you need addiction/recovery support?</Label>
                <RadioGroup
                  value={formData.recoverySupport}
                  onValueChange={(value) => setFormData({ ...formData, recoverySupport: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="substance" id="substance" />
                    <Label htmlFor="substance">Substance addiction recovery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="behavioral" id="behavioral" />
                    <Label htmlFor="behavioral">Behavioral addiction (gambling, shopping, etc.)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eating" id="eating" />
                    <Label htmlFor="eating">Eating disorder recovery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">No addiction recovery needed</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stressLevel">Current Stress Level (1-10)</Label>
                <Select
                  value={formData.stressLevel}
                  onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stress level" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        {level} - {level <= 3 ? "Low" : level <= 6 ? "Moderate" : level <= 8 ? "High" : "Very High"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleepQuality">Sleep Quality</Label>
                <Select
                  value={formData.sleepQuality}
                  onValueChange={(value) => setFormData({ ...formData, sleepQuality: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sleep quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (7-9 hours, restful)</SelectItem>
                    <SelectItem value="good">Good (6-8 hours, mostly restful)</SelectItem>
                    <SelectItem value="fair">Fair (5-7 hours, sometimes restless)</SelectItem>
                    <SelectItem value="poor">Poor (less than 6 hours, often restless)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Dumbbell className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Lifestyle & Preferences</h2>
              <p className="text-muted-foreground">Help us fit into your daily routine</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activityLevel">Current Activity Level</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="lightly-active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderately-active">
                      Moderately Active (moderate exercise 3-5 days/week)
                    </SelectItem>
                    <SelectItem value="very-active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="extremely-active">
                      Extremely Active (very hard exercise, physical job)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workSchedule">Work Schedule</Label>
                <Select
                  value={formData.workSchedule}
                  onValueChange={(value) => setFormData({ ...formData, workSchedule: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-5">Regular 9-5</SelectItem>
                    <SelectItem value="shift-work">Shift Work</SelectItem>
                    <SelectItem value="flexible">Flexible Hours</SelectItem>
                    <SelectItem value="remote">Work from Home</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="unemployed">Currently Unemployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availableTime">Available Time for Health Activities (per day)</Label>
                <Select
                  value={formData.availableTime}
                  onValueChange={(value) => setFormData({ ...formData, availableTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select available time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15-30-min">15-30 minutes</SelectItem>
                    <SelectItem value="30-60-min">30-60 minutes</SelectItem>
                    <SelectItem value="1-2-hours">1-2 hours</SelectItem>
                    <SelectItem value="2-plus-hours">2+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredWorkoutTime">Preferred Workout Time</Label>
                <Select
                  value={formData.preferredWorkoutTime}
                  onValueChange={(value) => setFormData({ ...formData, preferredWorkoutTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-morning">Early Morning (5-7 AM)</SelectItem>
                    <SelectItem value="morning">Morning (7-10 AM)</SelectItem>
                    <SelectItem value="midday">Midday (10 AM-2 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2-6 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                    <SelectItem value="night">Night (9 PM+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Baseline Photo</h2>
              <p className="text-muted-foreground">
                Upload a photo to track your visual transformation (optional but recommended)
              </p>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Click to upload a photo</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formData.baselinePhoto ? formData.baselinePhoto.name : "JPG, PNG up to 10MB"}
                  </p>
                </label>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Photo Tips:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Take the photo in good lighting</li>
                  <li>• Wear form-fitting clothes or workout attire</li>
                  <li>• Stand straight with arms at your sides</li>
                  <li>• Your privacy is protected - photos are encrypted and secure</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-foreground">Welcome to DEAR</h1>
          <p className="text-muted-foreground">Let's personalize your transformation journey</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
        </div>

        {/* Content */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === TOTAL_STEPS ? "Complete Setup" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
