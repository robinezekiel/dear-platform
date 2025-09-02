import { z } from "zod"

// User validation schemas
export const userRegistrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain uppercase, lowercase, number and special character",
    ),
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    return age >= 13 && age <= 120
  }, "Must be between 13 and 120 years old"),
})

export const onboardingSchema = z.object({
  goals: z.array(z.string()).min(1, "At least one goal is required"),
  healthConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  dietaryRestrictions: z.array(z.string()).optional(),
  mentalHealthSupport: z.boolean(),
  addictionRecovery: z.boolean(),
  emergencyContact: z.object({
    name: z.string().min(1, "Emergency contact name required"),
    phone: z.string().regex(/^\+?[\d\s\-$$$$]+$/, "Invalid phone number"),
    relationship: z.string().min(1, "Relationship required"),
  }),
})

export const healthMetricsSchema = z.object({
  weight: z.number().min(30).max(500).optional(),
  height: z.number().min(100).max(250).optional(),
  bloodPressure: z
    .object({
      systolic: z.number().min(70).max(200),
      diastolic: z.number().min(40).max(130),
    })
    .optional(),
  heartRate: z.number().min(40).max(200).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  stressLevel: z.number().min(1).max(10).optional(),
  energyLevel: z.number().min(1).max(10).optional(),
})

export const moodTrackingSchema = z.object({
  mood: z.enum(["very_low", "low", "neutral", "good", "excellent"]),
  anxiety: z.number().min(1).max(10),
  stress: z.number().min(1).max(10),
  energy: z.number().min(1).max(10),
  sleep_quality: z.number().min(1).max(10),
  notes: z.string().max(1000).optional(),
  triggers: z.array(z.string()).optional(),
  coping_strategies: z.array(z.string()).optional(),
})

export const journalEntrySchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(10, "Content must be at least 10 characters").max(10000),
  mood: z.enum(["very_low", "low", "neutral", "good", "excellent"]),
  tags: z.array(z.string()).max(10),
  is_private: z.boolean().default(true),
})

// Sanitization functions
export function sanitizeInput(input: string): string {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
}

export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 10MB" }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, and WebP images are allowed" }
  }

  return { valid: true }
}

// Validation functions
export function validateInput(schema: any, data: any): { success: boolean; data?: any; error?: string } {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export function validateRequest(schema: any, data: any): { success: boolean; data?: any; error?: string } {
  return validateInput(schema, data)
}
