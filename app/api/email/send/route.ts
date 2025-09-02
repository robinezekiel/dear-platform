import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { EmailService } from "@/lib/email-service"
import { validateInput } from "@/lib/validation"

const sendEmailSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["welcome", "password-reset", "milestone", "appointment-reminder", "newsletter"],
    },
    to: { type: "string", format: "email" },
    data: { type: "object" },
  },
  required: ["type", "to"],
  additionalProperties: false,
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || (user.role !== "admin" && user.role !== "moderator")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validation = validateInput(body, sendEmailSchema)
    if (!validation.isValid) {
      return NextResponse.json({ error: "Invalid input", details: validation.errors }, { status: 400 })
    }

    const { type, to, data } = body
    const emailService = EmailService.getInstance()
    let success = false

    switch (type) {
      case "welcome":
        success = await emailService.sendWelcomeEmail(to, data.userName || "User")
        break
      case "password-reset":
        success = await emailService.sendPasswordResetEmail(to, data.resetToken)
        break
      case "milestone":
        success = await emailService.sendProgressMilestoneEmail(to, data.userName, data.milestone)
        break
      case "appointment-reminder":
        success = await emailService.sendAppointmentReminderEmail(to, data.userName, data.appointmentDetails)
        break
      case "newsletter":
        success = await emailService.sendNewsletterEmail(to, data.userName, data.content)
        break
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    if (success) {
      return NextResponse.json({ success: true, message: "Email sent successfully" })
    } else {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
