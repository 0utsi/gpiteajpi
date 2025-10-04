import { z } from "zod"

const ChatPayload = z.object({
  model: z.string().optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
  stream: z.boolean().optional(),
})

export default ChatPayload
