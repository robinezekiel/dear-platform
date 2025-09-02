import PushNotification from "react-native-push-notification"
import messaging from "@react-native-firebase/messaging"
import { Platform } from "react-native"

class NotificationServiceClass {
  async initialize(): Promise<void> {
    try {
      // Request permission for iOS
      if (Platform.OS === "ios") {
        const authStatus = await messaging().requestPermission()
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL

        if (!enabled) {
          console.log("[NotificationService] Permission not granted")
          return
        }
      }

      // Configure push notifications
      PushNotification.configure({
        onRegister: (token) => {
          console.log("[NotificationService] Token:", token)
          this.registerDeviceToken(token.token)
        },
        onNotification: (notification) => {
          console.log("[NotificationService] Notification:", notification)
          this.handleNotification(notification)
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === "ios",
      })

      // Handle background messages
      messaging().onMessage(async (remoteMessage) => {
        console.log("[NotificationService] Foreground message:", remoteMessage)
        this.showLocalNotification(remoteMessage)
      })

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("[NotificationService] Background message:", remoteMessage)
      })

      console.log("[NotificationService] Initialized successfully")
    } catch (error) {
      console.error("[NotificationService] Initialization error:", error)
    }
  }

  private async registerDeviceToken(token: string): Promise<void> {
    try {
      // Send token to backend
      const response = await fetch("/api/notifications/register-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, platform: Platform.OS }),
      })

      if (!response.ok) {
        throw new Error("Failed to register device token")
      }
    } catch (error) {
      console.error("[NotificationService] Token registration error:", error)
    }
  }

  private handleNotification(notification: any): void {
    // Handle notification tap
    if (notification.userInteraction) {
      // User tapped the notification
      this.navigateToScreen(notification.data?.screen)
    }
  }

  private navigateToScreen(screen?: string): void {
    // Navigation logic based on notification data
    console.log("[NotificationService] Navigate to:", screen)
  }

  private showLocalNotification(remoteMessage: any): void {
    PushNotification.localNotification({
      title: remoteMessage.notification?.title || "DEAR",
      message: remoteMessage.notification?.body || "New notification",
      playSound: true,
      soundName: "default",
      actions: ["View"],
      data: remoteMessage.data,
    })
  }

  scheduleLocalNotification(title: string, message: string, date: Date): void {
    PushNotification.localNotificationSchedule({
      title,
      message,
      date,
      playSound: true,
      soundName: "default",
    })
  }

  cancelAllNotifications(): void {
    PushNotification.cancelAllLocalNotifications()
  }
}

export const NotificationService = new NotificationServiceClass()
