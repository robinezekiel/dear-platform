"use client"

import type React from "react"
import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar, Platform } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/MaterialIcons"

// Screens
import SplashScreen from "./screens/SplashScreen"
import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import OnboardingScreen from "./screens/OnboardingScreen"
import DashboardScreen from "./screens/DashboardScreen"
import TransformationScreen from "./screens/TransformationScreen"
import CommunityScreen from "./screens/CommunityScreen"
import SportsScreen from "./screens/SportsScreen"
import ProfileScreen from "./screens/ProfileScreen"

// Services
import { AuthService } from "./services/AuthService"
import { NotificationService } from "./services/NotificationService"
import { AnalyticsService } from "./services/AnalyticsService"

// Context
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case "Dashboard":
              iconName = "dashboard"
              break
            case "Transform":
              iconName = "transform"
              break
            case "Sports":
              iconName = "sports"
              break
            case "Community":
              iconName = "people"
              break
            case "Profile":
              iconName = "person"
              break
            default:
              iconName = "circle"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#059669",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingBottom: Platform.OS === "ios" ? 20 : 5,
          height: Platform.OS === "ios" ? 85 : 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Transform" component={TransformationScreen} />
      <Tab.Screen name="Sports" component={SportsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const App: React.FC = () => {
  useEffect(() => {
    // Initialize services
    AuthService.initialize()
    NotificationService.initialize()
    AnalyticsService.initialize()
  }, [])

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                cardStyleInterpolator: ({ current, layouts }) => {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  }
                },
              }}
            >
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
