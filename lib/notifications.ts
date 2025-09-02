export interface Notification {
  id: string
  userId: string
  type: "therapy" | "appointment" | "progress" | "community" | "system"
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: Date
}

export class NotificationManager {
  private static instance: NotificationManager
  private notifications: Map<string, Notification[]> = new Map()

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }

  async createNotification(notification: Omit<Notification, "id" | "read" | "createdAt">): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      read: false,
      createdAt: new Date(),
    }

    // Store in memory (in production, store in database)
    const userNotifications = this.notifications.get(notification.userId) || []
    userNotifications.unshift(newNotification)
    this.notifications.set(notification.userId, userNotifications)

    // Send real-time notification
    this.sendRealTimeNotification(notification.userId, newNotification)

    return newNotification
  }

  async getUserNotifications(userId: string, limit = 20): Promise<Notification[]> {
    const userNotifications = this.notifications.get(userId) || []
    return userNotifications.slice(0, limit)
  }

  async markAsRead(userId: string, notificationId: string): Promise<boolean> {
    const userNotifications = this.notifications.get(userId) || []
    const notification = userNotifications.find((n) => n.id === notificationId)

    if (notification) {
      notification.read = true
      return true
    }
    return false
  }

  async getUnreadCount(userId: string): Promise<number> {
    const userNotifications = this.notifications.get(userId) || []
    return userNotifications.filter((n) => !n.read).length
  }

  private sendRealTimeNotification(userId: string, notification: Notification) {
    // This would integrate with WebSocketManager
    console.log(`[v0] Sending real-time notification to user ${userId}:`, notification.title)
  }

  // Predefined notification templates
  async sendTherapyReminder(userId: string, sessionTime: string) {
    return this.createNotification({
      userId,
      type: "therapy",
      title: "Therapy Session Reminder",
      message: `Your therapy session is scheduled for ${sessionTime}`,
      data: { sessionTime },
    })
  }

  async sendProgressUpdate(userId: string, milestone: string) {
    return this.createNotification({
      userId,
      type: "progress",
      title: "Progress Milestone Achieved!",
      message: `Congratulations! You've reached: ${milestone}`,
      data: { milestone },
    })
  }

  async sendCommunityUpdate(userId: string, communityName: string, message: string) {
    return this.createNotification({
      userId,
      type: "community",
      title: `New activity in ${communityName}`,
      message,
      data: { communityName },
    })
  }
}
