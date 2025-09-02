import { NextResponse } from "next/server"

export class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404)
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests") {
    super(message, 429)
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error("[API Error]:", error)

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        statusCode: error.statusCode,
        timestamp: new Date().toISOString(),
      },
      { status: error.statusCode },
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }

  return NextResponse.json(
    {
      error: "Unknown error occurred",
      timestamp: new Date().toISOString(),
    },
    { status: 500 },
  )
}

export function asyncHandler(fn: Function) {
  return async (req: Request, ...args: any[]) => {
    try {
      return await fn(req, ...args)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

export { AppError as ApiError }
