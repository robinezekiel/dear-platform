interface EmailTemplate {
  subject: string
  html: string
  text: string
}

interface EmailData {
  to: string
  from?: string
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content: string
    contentType: string
  }>
}

export class EmailService {
  private static instance: EmailService
  private apiKey: string
  private fromEmail: string

  private constructor() {
    this.apiKey = process.env.EMAIL_API_KEY || ""
    this.fromEmail = process.env.FROM_EMAIL || "noreply@dear.com"
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendEmail(data: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Using Resend as the email service provider
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: data.from || this.fromEmail,
          to: [data.to],
          subject: data.subject,
          html: data.html,
          text: data.text,
          attachments: data.attachments,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error("[v0] Email send failed:", error)
        return { success: false, error: `Failed to send email: ${error}` }
      }

      const result = await response.json()
      return { success: true, messageId: result.id }
    } catch (error) {
      console.error("[v0] Email service error:", error)
      return { success: false, error: "Email service unavailable" }
    }
  }

  // Welcome email for new users
  async sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
    const template = this.getWelcomeTemplate(userName)
    const result = await this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
    return result.success
  }

  // Password reset email
  async sendPasswordResetEmail(userEmail: string, resetToken: string): Promise<boolean> {
    const template = this.getPasswordResetTemplate(resetToken)
    const result = await this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
    return result.success
  }

  // Progress milestone email
  async sendProgressMilestoneEmail(userEmail: string, userName: string, milestone: string): Promise<boolean> {
    const template = this.getProgressMilestoneTemplate(userName, milestone)
    const result = await this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
    return result.success
  }

  // Appointment reminder email
  async sendAppointmentReminderEmail(
    userEmail: string,
    userName: string,
    appointmentDetails: {
      providerName: string
      date: string
      time: string
      type: string
    },
  ): Promise<boolean> {
    const template = this.getAppointmentReminderTemplate(userName, appointmentDetails)
    const result = await this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
    return result.success
  }

  // Newsletter email
  async sendNewsletterEmail(userEmail: string, userName: string, content: string): Promise<boolean> {
    const template = this.getNewsletterTemplate(userName, content)
    const result = await this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
    return result.success
  }

  // Email Templates
  private getWelcomeTemplate(userName: string): EmailTemplate {
    return {
      subject: "Welcome to DEAR - Your Transformation Journey Begins!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to DEAR</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; font-size: 32px; margin: 0;">DEAR</h1>
            <p style="color: #6b7280; margin: 5px 0;">Your Health Transformation Platform</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">Welcome, ${userName}!</h2>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Your journey to unbreakable flourishing starts now</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #059669; margin-bottom: 15px;">What's Next?</h3>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #374151;">🎯 Complete Your Profile</h4>
              <p style="margin: 0; color: #6b7280;">Set your transformation goals and health preferences</p>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #374151;">📸 Upload Your First Photo</h4>
              <p style="margin: 0; color: #6b7280;">Let our AI analyze your starting point</p>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
              <h4 style="margin: 0 0 10px 0; color: #374151;">🤝 Join Our Community</h4>
              <p style="margin: 0; color: #6b7280;">Connect with others on similar journeys</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Get Started</a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Need help? Reply to this email or visit our <a href="${process.env.NEXT_PUBLIC_APP_URL}/help" style="color: #059669;">Help Center</a></p>
            <p>© 2024 DEAR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `Welcome to DEAR, ${userName}!\n\nYour journey to unbreakable flourishing starts now.\n\nWhat's Next?\n- Complete Your Profile\n- Upload Your First Photo\n- Join Our Community\n\nGet started: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard\n\nNeed help? Reply to this email or visit our Help Center.`,
    }
  }

  private getPasswordResetTemplate(resetToken: string): EmailTemplate {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    return {
      subject: "Reset Your DEAR Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; font-size: 32px; margin: 0;">DEAR</h1>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #374151; margin-bottom: 15px;">Reset Your Password</h2>
            <p style="color: #6b7280; margin-bottom: 20px;">We received a request to reset your password. Click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Reset Password</a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
            <p style="color: #6b7280; font-size: 14px;">If you didn't request this password reset, please ignore this email.</p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>© 2024 DEAR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `Reset Your DEAR Password\n\nWe received a request to reset your password. Visit this link to create a new password:\n\n${resetUrl}\n\nThis link will expire in 1 hour for security reasons.\n\nIf you didn't request this password reset, please ignore this email.`,
    }
  }

  private getProgressMilestoneTemplate(userName: string, milestone: string): EmailTemplate {
    return {
      subject: `🎉 Congratulations ${userName}! You've reached a milestone`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Milestone Achievement</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; font-size: 32px; margin: 0;">DEAR</h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <div style="font-size: 48px; margin-bottom: 15px;">🎉</div>
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">Milestone Achieved!</h2>
            <p style="margin: 0; font-size: 18px; opacity: 0.9;">${milestone}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p style="color: #374151; font-size: 16px;">Hi ${userName},</p>
            <p style="color: #6b7280;">Congratulations on reaching this important milestone in your transformation journey! Your dedication and consistency are truly inspiring.</p>
            <p style="color: #6b7280;">Keep up the amazing work - every step forward is a victory worth celebrating.</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/progress" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">View Your Progress</a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>© 2024 DEAR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `🎉 Milestone Achieved!\n\n${milestone}\n\nHi ${userName},\n\nCongratulations on reaching this important milestone in your transformation journey! Your dedication and consistency are truly inspiring.\n\nKeep up the amazing work - every step forward is a victory worth celebrating.\n\nView your progress: ${process.env.NEXT_PUBLIC_APP_URL}/progress`,
    }
  }

  private getAppointmentReminderTemplate(
    userName: string,
    details: { providerName: string; date: string; time: string; type: string },
  ): EmailTemplate {
    return {
      subject: `Reminder: Your appointment with ${details.providerName} tomorrow`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Reminder</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; font-size: 32px; margin: 0;">DEAR</h1>
          </div>
          
          <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #0ea5e9; margin: 0 0 15px 0;">📅 Appointment Reminder</h2>
            <p style="margin: 0; color: #374151;">Hi ${userName}, this is a friendly reminder about your upcoming appointment.</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Appointment Details</h3>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
              <p style="margin: 0 0 10px 0;"><strong>Provider:</strong> ${details.providerName}</p>
              <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${details.date}</p>
              <p style="margin: 0 0 10px 0;"><strong>Time:</strong> ${details.time}</p>
              <p style="margin: 0;"><strong>Type:</strong> ${details.type}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">View Appointment</a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments/reschedule" style="background: transparent; color: #059669; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; border: 1px solid #059669;">Reschedule</a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>© 2024 DEAR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `📅 Appointment Reminder\n\nHi ${userName}, this is a friendly reminder about your upcoming appointment.\n\nAppointment Details:\nProvider: ${details.providerName}\nDate: ${details.date}\nTime: ${details.time}\nType: ${details.type}\n\nView appointment: ${process.env.NEXT_PUBLIC_APP_URL}/appointments`,
    }
  }

  private getNewsletterTemplate(userName: string, content: string): EmailTemplate {
    return {
      subject: "DEAR Weekly: Your Health & Wellness Update",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>DEAR Weekly Newsletter</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; font-size: 32px; margin: 0;">DEAR</h1>
            <p style="color: #6b7280; margin: 5px 0;">Weekly Health & Wellness Update</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p style="color: #374151; font-size: 16px;">Hi ${userName},</p>
            <div style="color: #6b7280;">${content}</div>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Visit Dashboard</a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe" style="color: #6b7280;">Unsubscribe</a> | <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings" style="color: #6b7280;">Email Preferences</a></p>
            <p>© 2024 DEAR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `DEAR Weekly Newsletter\n\nHi ${userName},\n\n${content.replace(/<[^>]*>/g, "")}\n\nVisit your dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard\n\nUnsubscribe: ${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe`,
    }
  }
}
