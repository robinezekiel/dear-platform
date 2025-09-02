import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { handleApiError, ApiError } from "@/lib/error-handling"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"
import { sql } from "@/lib/database"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const sendMessageSchema = z.object({
  chatId: z.string(),
  content: z.string().min(1).max(2000),
  type: z.enum(["text", "image", "file"]).default("text"),
  replyTo: z.string().optional(),
})

const createChatSchema = z.object({
  type: z.enum(["ai-therapy", "provider", "support-group", "direct"]),
  participantIds: z.array(z.string()).optional(),
  title: z.string().optional(),
  providerId: z.string().optional(),
  groupId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      throw new ApiError("Unauthorized", 401)
    }

    const body = await request.json()
    const action = body.action

    if (action === "send_message") {
      const { chatId, content, type, replyTo } = validateRequest(sendMessageSchema, body)

      // Verify user has access to chat
      const chat = await sql`
        SELECT c.*, cp.role
        FROM chats c
        JOIN chat_participants cp ON cp.chat_id = c.id
        WHERE c.id = ${chatId} AND cp.user_id = ${user.id}
      `

      if (chat.length === 0) {
        throw new ApiError("Chat not found or access denied", 404)
      }

      // Insert message
      const message = await sql`
        INSERT INTO chat_messages (chat_id, sender_id, content, message_type, reply_to, sent_at)
        VALUES (${chatId}, ${user.id}, ${content}, ${type}, ${replyTo}, NOW())
        RETURNING *
      `

      // Update chat last activity
      await sql`
        UPDATE chats 
        SET last_message_at = NOW(), last_message_content = ${content}
        WHERE id = ${chatId}
      `

      // Generate AI response for AI therapy chats
      if (chat[0].type === "ai-therapy") {
        setTimeout(async () => {
          try {
            const { text } = await generateText({
              model: openai("gpt-4o"),
              prompt: `
                You are DEAR AI Companion, a supportive and empathetic AI therapist.
                
                User message: "${content}"
                
                Provide a helpful, supportive response that:
                1. Acknowledges their feelings
                2. Offers practical advice or coping strategies
                3. Asks follow-up questions to encourage reflection
                4. Maintains a warm, professional tone
                
                Keep responses conversational and under 200 words.
              `,
            })

            await sql`
              INSERT INTO chat_messages (chat_id, sender_id, content, message_type, sent_at, is_ai_generated)
              VALUES (${chatId}, 'ai-companion', ${text}, 'text', NOW(), true)
            `

            // In a real app, you'd emit this via WebSocket
            console.log(`AI response sent to chat ${chatId}:`, text)
          } catch (error) {
            console.error("Error generating AI response:", error)
          }
        }, 2000) // Simulate typing delay
      }

      return NextResponse.json({
        success: true,
        message: message[0],
      })
    }

    if (action === "create_chat") {
      const { type, participantIds = [], title, providerId, groupId } = validateRequest(createChatSchema, body)

      // Create chat
      const chat = await sql`
        INSERT INTO chats (type, title, created_by, created_at)
        VALUES (${type}, ${title || `${type} chat`}, ${user.id}, NOW())
        RETURNING *
      `

      const chatId = chat[0].id

      // Add creator as participant
      await sql`
        INSERT INTO chat_participants (chat_id, user_id, role, joined_at)
        VALUES (${chatId}, ${user.id}, 'member', NOW())
      `

      // Add other participants
      if (participantIds.length > 0) {
        for (const participantId of participantIds) {
          await sql`
            INSERT INTO chat_participants (chat_id, user_id, role, joined_at)
            VALUES (${chatId}, ${participantId}, 'member', NOW())
          `
        }
      }

      // Add AI companion for therapy chats
      if (type === "ai-therapy") {
        await sql`
          INSERT INTO chat_participants (chat_id, user_id, role, joined_at)
          VALUES (${chatId}, 'ai-companion', 'ai', NOW())
        `

        // Send welcome message
        await sql`
          INSERT INTO chat_messages (chat_id, sender_id, content, message_type, sent_at, is_ai_generated)
          VALUES (${chatId}, 'ai-companion', 'Hello! I''m your DEAR AI Companion. I''m here to support you on your wellness journey. How are you feeling today?', 'text', NOW(), true)
        `
      }

      return NextResponse.json({
        success: true,
        chat: chat[0],
      })
    }

    throw new ApiError("Invalid action", 400)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      throw new ApiError("Unauthorized", 401)
    }

    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")

    if (chatId) {
      // Get specific chat with messages
      const chat = await sql`
        SELECT c.*, cp.role
        FROM chats c
        JOIN chat_participants cp ON cp.chat_id = c.id
        WHERE c.id = ${chatId} AND cp.user_id = ${user.id}
      `

      if (chat.length === 0) {
        throw new ApiError("Chat not found", 404)
      }

      const messages = await sql`
        SELECT 
          cm.*,
          u.name as sender_name,
          u.avatar_url as sender_avatar
        FROM chat_messages cm
        LEFT JOIN users u ON u.id = cm.sender_id
        WHERE cm.chat_id = ${chatId}
        ORDER BY cm.sent_at ASC
      `

      return NextResponse.json({
        success: true,
        chat: chat[0],
        messages,
      })
    } else {
      // Get user's chats
      const chats = await sql`
        SELECT 
          c.*,
          cp.role,
          COUNT(CASE WHEN cm.read_at IS NULL AND cm.sender_id != ${user.id} THEN 1 END) as unread_count
        FROM chats c
        JOIN chat_participants cp ON cp.chat_id = c.id
        LEFT JOIN chat_messages cm ON cm.chat_id = c.id
        WHERE cp.user_id = ${user.id}
        GROUP BY c.id, cp.role
        ORDER BY c.last_message_at DESC NULLS LAST
      `

      return NextResponse.json({
        success: true,
        chats,
      })
    }
  } catch (error) {
    return handleApiError(error)
  }
}
