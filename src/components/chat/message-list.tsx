"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type ChatMessage } from "@/hooks/use-chat"
import { MessageBubble } from "./message-bubble"

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  const viewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="h-[60vh] w-full rounded-2xl p-4">
      <div ref={viewportRef} className="space-y-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
      </div>
    </ScrollArea>
  )
}
