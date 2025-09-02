interface LocalizationConfig {
  language: string
  country: string
  currency: string
  timezone: string
  dateFormat: string
  timeFormat: string
  measurementSystem: "metric" | "imperial"
}

interface GeographicData {
  country: string
  state: string
  city: string
  coordinates: {
    latitude: number
    longitude: number
  }
  timezone: string
  currency: string
  regulations: string[]
}

export class LocalizationEngine {
  private static translations: Record<string, Record<string, string>> = {
    en: {
      welcome: "Welcome to DEAR",
      dashboard: "Dashboard",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      transformation: "Transformation",
      progress: "Progress",
      goals: "Goals",
      community: "Community",
    },
    es: {
      welcome: "Bienvenido a DEAR",
      dashboard: "Panel de Control",
      profile: "Perfil",
      settings: "Configuración",
      logout: "Cerrar Sesión",
      transformation: "Transformación",
      progress: "Progreso",
      goals: "Objetivos",
      community: "Comunidad",
    },
    fr: {
      welcome: "Bienvenue sur DEAR",
      dashboard: "Tableau de Bord",
      profile: "Profil",
      settings: "Paramètres",
      logout: "Déconnexion",
      transformation: "Transformation",
      progress: "Progrès",
      goals: "Objectifs",
      community: "Communauté",
    },
    de: {
      welcome: "Willkommen bei DEAR",
      dashboard: "Dashboard",
      profile: "Profil",
      settings: "Einstellungen",
      logout: "Abmelden",
      transformation: "Transformation",
      progress: "Fortschritt",
      goals: "Ziele",
      community: "Gemeinschaft",
    },
  }

  static translate(key: string, language = "en"): string {
    return this.translations[language]?.[key] || this.translations.en[key] || key
  }

  static detectUserLocation(): Promise<GeographicData> {
    return new Promise((resolve) => {
      // In production, use IP geolocation service or browser geolocation API
      const mockLocation: GeographicData = {
        country: "United States",
        state: "California",
        city: "San Francisco",
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
        timezone: "America/Los_Angeles",
        currency: "USD",
        regulations: ["HIPAA", "CCPA", "FDA"],
      }

      resolve(mockLocation)
    })
  }

  static getLocalizationConfig(location: GeographicData): LocalizationConfig {
    const countryConfigs: Record<string, Partial<LocalizationConfig>> = {
      "United States": {
        language: "en",
        currency: "USD",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
        measurementSystem: "imperial",
      },
      Canada: {
        language: "en",
        currency: "CAD",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
        measurementSystem: "metric",
      },
      "United Kingdom": {
        language: "en",
        currency: "GBP",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
        measurementSystem: "metric",
      },
      Germany: {
        language: "de",
        currency: "EUR",
        dateFormat: "DD.MM.YYYY",
        timeFormat: "24h",
        measurementSystem: "metric",
      },
      France: {
        language: "fr",
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
        measurementSystem: "metric",
      },
      Spain: {
        language: "es",
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
        measurementSystem: "metric",
      },
    }

    const defaultConfig: LocalizationConfig = {
      language: "en",
      country: location.country,
      currency: "USD",
      timezone: location.timezone,
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
      measurementSystem: "imperial",
    }

    return {
      ...defaultConfig,
      ...countryConfigs[location.country],
      country: location.country,
      timezone: location.timezone,
    }
  }

  static formatCurrency(amount: number, currency: string): string {
    const formatters: Record<string, Intl.NumberFormat> = {
      USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
      EUR: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
      GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }),
      CAD: new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }),
    }

    return formatters[currency]?.format(amount) || `$${amount}`
  }

  static formatDate(date: Date, format: string, timezone: string): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
    }

    switch (format) {
      case "MM/DD/YYYY":
        options.month = "2-digit"
        options.day = "2-digit"
        options.year = "numeric"
        return new Intl.DateTimeFormat("en-US", options).format(date)
      case "DD/MM/YYYY":
        options.day = "2-digit"
        options.month = "2-digit"
        options.year = "numeric"
        return new Intl.DateTimeFormat("en-GB", options).format(date)
      case "DD.MM.YYYY":
        options.day = "2-digit"
        options.month = "2-digit"
        options.year = "numeric"
        return new Intl.DateTimeFormat("de-DE", options).format(date)
      default:
        return date.toLocaleDateString()
    }
  }

  static formatTime(date: Date, format: string, timezone: string): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: format === "12h",
    }

    return new Intl.DateTimeFormat("en-US", options).format(date)
  }

  static convertWeight(weight: number, from: "kg" | "lbs", to: "kg" | "lbs"): number {
    if (from === to) return weight

    if (from === "kg" && to === "lbs") {
      return weight * 2.20462
    } else if (from === "lbs" && to === "kg") {
      return weight / 2.20462
    }

    return weight
  }

  static convertHeight(height: number, from: "cm" | "ft", to: "cm" | "ft"): number {
    if (from === to) return height

    if (from === "cm" && to === "ft") {
      return height / 30.48
    } else if (from === "ft" && to === "cm") {
      return height * 30.48
    }

    return height
  }

  static getRegionalCompliance(country: string): string[] {
    const complianceMap: Record<string, string[]> = {
      "United States": ["HIPAA", "FDA", "CCPA"],
      Canada: ["PIPEDA", "Health Canada"],
      "United Kingdom": ["GDPR", "UK DPA", "MHRA"],
      Germany: ["GDPR", "BDSG", "BfArM"],
      France: ["GDPR", "CNIL", "ANSM"],
      Spain: ["GDPR", "LOPD", "AEMPS"],
      Australia: ["Privacy Act", "TGA"],
    }

    return complianceMap[country] || ["GDPR"]
  }

  static async findNearbyProviders(
    coordinates: { latitude: number; longitude: number },
    radius = 25,
    specialty?: string,
  ): Promise<any[]> {
    // In production, integrate with healthcare provider APIs
    const mockProviders = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Nutritionist",
        distance: 0.8,
        rating: 4.9,
        languages: ["English", "Spanish"],
        coordinates: { latitude: 37.7849, longitude: -122.4094 },
      },
      {
        id: 2,
        name: "FitLife Gym",
        specialty: "Fitness Center",
        distance: 1.2,
        rating: 4.7,
        languages: ["English"],
        coordinates: { latitude: 37.7649, longitude: -122.4294 },
      },
    ]

    return mockProviders.filter((provider) => {
      if (specialty && provider.specialty.toLowerCase() !== specialty.toLowerCase()) {
        return false
      }
      return provider.distance <= radius
    })
  }

  static getLocalHealthTrends(location: GeographicData): any[] {
    // In production, fetch from health data APIs
    const trendsByRegion: Record<string, any[]> = {
      "San Francisco": [
        { activity: "Yoga & Mindfulness", popularity: 92, trend: "up" },
        { activity: "Plant-based Nutrition", popularity: 87, trend: "up" },
        { activity: "HIIT Workouts", popularity: 84, trend: "stable" },
        { activity: "Mental Health Support", popularity: 79, trend: "up" },
      ],
      "New York": [
        { activity: "Boutique Fitness", popularity: 89, trend: "up" },
        { activity: "Meal Delivery Services", popularity: 85, trend: "up" },
        { activity: "Mental Health Apps", popularity: 82, trend: "up" },
        { activity: "Running Groups", popularity: 78, trend: "stable" },
      ],
    }

    return trendsByRegion[location.city] || trendsByRegion["San Francisco"]
  }
}
