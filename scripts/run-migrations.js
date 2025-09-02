#!/usr/bin/env node

const { neon } = require("@neondatabase/serverless")
const fs = require("fs")
const path = require("path")

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is required")
    process.exit(1)
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    console.log("🚀 Starting database migrations...")

    // Get all SQL files in the scripts directory
    const scriptsDir = path.join(__dirname)
    const sqlFiles = fs
      .readdirSync(scriptsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort()

    for (const file of sqlFiles) {
      console.log(`📄 Running ${file}...`)
      const sqlContent = fs.readFileSync(path.join(scriptsDir, file), "utf8")

      // Split by semicolon and execute each statement
      const statements = sqlContent
        .split(";")
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0)

      for (const statement of statements) {
        try {
          await sql.unsafe(statement)
        } catch (error) {
          // Ignore "already exists" errors
          if (!error.message.includes("already exists")) {
            throw error
          }
        }
      }

      console.log(`✅ Completed ${file}`)
    }

    console.log("🎉 All migrations completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error)
    process.exit(1)
  }
}

runMigrations()
