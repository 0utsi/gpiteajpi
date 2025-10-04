"use client"

import { useState } from "react"
import { ChatComposer } from "@/components/chat/chat-composer"
import { MessageList } from "@/components/chat/message-list"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useChat } from "@/hooks/use-chat"

export default function LlmPage() {
  const [model, setModel] = useState<string>("")
  const { messages, input, setInput, isStreaming, error, send, stop, clear } = useChat({
    endpoint: "/api/llm/chat",
  })

  return (
    <main className="text-foreground mx-auto max-w-3xl bg-[#040926] p-4 sm:p-6">
      <Card className="border-muted bg-card/60 rounded-2xl backdrop-blur">
        <CardContent className="p-0">
          <MessageList messages={messages} />
          <Separator className="opacity-50" />
          <ChatComposer
            input={input}
            setInput={setInput}
            isStreaming={isStreaming}
            error={error}
            onSend={send}
            onStop={stop}
            onClear={clear}
            model={model}
            setModel={setModel}
            header="Chat stream (NDJSON)"
          />
        </CardContent>
      </Card>
    </main>
  )
}
