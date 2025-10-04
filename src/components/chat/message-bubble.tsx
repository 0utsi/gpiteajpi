"use client"

import { Bot, Sparkles, User } from "lucide-react"
import { type ChatMessage } from "@/hooks/use-chat"
import { cn } from "@/lib/utils"

export function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user"
  const isAssistant = msg.role === "assistant"
  const icon = isUser ? (
    <User className="h-4 w-4" />
  ) : isAssistant ? (
    <Bot className="h-4 w-4" />
  ) : (
    <Sparkles className="h-4 w-4" />
  )

  return (
    <div className={cn("group flex w-full items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="bg-muted text-muted-foreground mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
          {icon}
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : msg.role === "system"
            ? "bg-muted/40 text-muted-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="whitespace-pre-wrap">{msg.content}</div>
      </div>
      {isUser && (
        <div className="bg-primary/90 text-primary-foreground mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
          {icon}
        </div>
      )}
    </div>
  )
}
