import fs from "fs"
import path from "path"

export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  userId?: string
  requestId?: string
  metadata?: Record<string, any>
}

class Logger {
  private logDir: string

  constructor() {
    this.logDir = path.join(process.cwd(), "logs")
    this.ensureLogDirectory()
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true })
    }
  }

  private writeLog(entry: LogEntry): void {
    const logFile = path.join(this.logDir, `${new Date().toISOString().split("T")[0]}.log`)
    const logLine = JSON.stringify(entry) + "\n"

    fs.appendFileSync(logFile, logLine)
  }

  private createLogEntry(level: LogLevel, message: string, metadata?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
    }
  }

  error(message: string, metadata?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.ERROR, message, metadata)
    this.writeLog(entry)
    console.error(`[${entry.timestamp}] ERROR: ${message}`, metadata)
  }

  warn(message: string, metadata?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.WARN, message, metadata)
    this.writeLog(entry)
    console.warn(`[${entry.timestamp}] WARN: ${message}`, metadata)
  }

  info(message: string, metadata?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.INFO, message, metadata)
    this.writeLog(entry)
    console.info(`[${entry.timestamp}] INFO: ${message}`, metadata)
  }

  debug(message: string, metadata?: Record<string, any>): void {
    if (process.env.NODE_ENV === "development") {
      const entry = this.createLogEntry(LogLevel.DEBUG, message, metadata)
      this.writeLog(entry)
      console.debug(`[${entry.timestamp}] DEBUG: ${message}`, metadata)
    }
  }

  // Log API requests
  logRequest(method: string, url: string, userId?: string, duration?: number): void {
    this.info(`API Request: ${method} ${url}`, {
      userId,
      duration,
      type: "api_request",
    })
  }

  // Log authentication events
  logAuth(event: string, userId?: string, success = true): void {
    this.info(`Auth Event: ${event}`, {
      userId,
      success,
      type: "authentication",
    })
  }

  // Log AI usage
  logAI(model: string, tokens: number, cost: number, userId?: string): void {
    this.info(`AI Usage: ${model}`, {
      userId,
      tokens,
      cost,
      type: "ai_usage",
    })
  }

  // Log errors with stack trace
  logError(error: Error, context?: Record<string, any>): void {
    this.error(error.message, {
      stack: error.stack,
      ...context,
      type: "error",
    })
  }

  // Log user activities
  logActivity(activity: string, userId?: string, metadata?: Record<string, any>): void {
    this.info(`Activity: ${activity}`, {
      userId,
      ...metadata,
      type: "user_activity",
    })
  }
}

export const logger = new Logger()

export const logActivity = (activity: string, userId?: string, metadata?: Record<string, any>) => {
  logger.logActivity(activity, userId, metadata)
}
