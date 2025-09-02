import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

// Define protected routes
const protectedRoutes = [
  "/dashboard",
  "/my-plan",
  "/transformation",
  "/progress",
  "/profile",
  "/mental-health",
  "/nutrition",
  "/workout",
  "/mindfulness",
  "/journal",
  "/providers",
  "/community",
  "/settings",
]

// Define auth routes (redirect to dashboard if already logged in)
const authRoutes = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await getSession()

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if accessing auth routes with active session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Check if user needs to complete onboarding
  if (session && pathname.startsWith("/dashboard")) {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (!data.profile && pathname !== "/onboarding") {
          return NextResponse.redirect(new URL("/onboarding", request.url))
        }
      }
    } catch (error) {
      console.error("Middleware error checking profile:", error)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
