import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"

const key = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function createSession(userId: string, email: string) {
  const session = await encrypt({ userId, email })
  cookies().set("session", session, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  cookies().set("session", "", { expires: new Date(0) })
}

export async function verifyAuth(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("session")?.value
    if (!sessionCookie) return null

    const session = await decrypt(sessionCookie)
    if (!session || !session.userId) return null

    // Return user data with role (you might want to fetch from database)
    return {
      userId: session.userId,
      email: session.email,
      role: session.role || "user", // Default role
    }
  } catch (error) {
    console.error("[Auth] verifyAuth error:", error)
    return null
  }
}

export async function verifyToken(token: string): Promise<any> {
  try {
    return await decrypt(token)
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export async function generateJWT(payload: any): Promise<string> {
  return await encrypt(payload)
}

export async function verifyJWT(token: string): Promise<any> {
  return await decrypt(token)
}

export async function validateRequest(req: NextRequest): Promise<any> {
  return await verifyAuth(req)
}
