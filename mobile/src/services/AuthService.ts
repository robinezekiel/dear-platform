import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_BASE_URL } from "../config/constants"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

class AuthServiceClass {
  private token: string | null = null
  private user: User | null = null

  async initialize(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem("auth_token")
      const userData = await AsyncStorage.getItem("user_data")

      if (token && userData) {
        this.token = token
        this.user = JSON.parse(userData)
      }
    } catch (error) {
      console.error("[AuthService] Initialization error:", error)
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data: AuthResponse = await response.json()

      // Store authentication data
      await AsyncStorage.setItem("auth_token", data.token)
      await AsyncStorage.setItem("refresh_token", data.refreshToken)
      await AsyncStorage.setItem("user_data", JSON.stringify(data.user))

      this.token = data.token
      this.user = data.user

      return data
    } catch (error) {
      console.error("[AuthService] Login error:", error)
      throw error
    }
  }

  async register(userData: {
    name: string
    email: string
    password: string
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data: AuthResponse = await response.json()

      // Store authentication data
      await AsyncStorage.setItem("auth_token", data.token)
      await AsyncStorage.setItem("refresh_token", data.refreshToken)
      await AsyncStorage.setItem("user_data", JSON.stringify(data.user))

      this.token = data.token
      this.user = data.user

      return data
    } catch (error) {
      console.error("[AuthService] Registration error:", error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear stored data
      await AsyncStorage.multiRemove(["auth_token", "refresh_token", "user_data"])

      this.token = null
      this.user = null
    } catch (error) {
      console.error("[AuthService] Logout error:", error)
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await AsyncStorage.getItem("refresh_token")
      if (!refreshToken) return null

      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        throw new Error("Token refresh failed")
      }

      const data = await response.json()
      await AsyncStorage.setItem("auth_token", data.token)

      this.token = data.token
      return data.token
    } catch (error) {
      console.error("[AuthService] Token refresh error:", error)
      await this.logout()
      return null
    }
  }

  getToken(): string | null {
    return this.token
  }

  getUser(): User | null {
    return this.user
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user
  }

  async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getToken()
    if (!token) {
      throw new Error("No authentication token available")
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    // Handle token expiration
    if (response.status === 401) {
      const newToken = await this.refreshToken()
      if (newToken) {
        // Retry request with new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
            "Content-Type": "application/json",
          },
        })
      } else {
        throw new Error("Authentication failed")
      }
    }

    return response
  }
}

export const AuthService = new AuthServiceClass()
