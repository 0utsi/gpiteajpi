import { NextRequest } from "next/server"
import ChatPayload from "@/types/chat"

const NEST_API_URL = process.env.NEST_API_URL ?? "http://localhost:3001"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}))
  const parsed = ChatPayload.partial().safeParse(raw)
  const payload = { stream: true, ...(parsed.success ? parsed.data : {}) }
  console.dir(parsed, { depth: null })
  const upstream = await fetch(`${NEST_API_URL}/ollama/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}
