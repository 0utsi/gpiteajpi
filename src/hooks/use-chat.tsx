/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCallback, useRef, useState } from "react"
import createNdjsonParser from "../lib/json-parser"

export type ChatRole = "system" | "user" | "assistant"
export type ChatMessage = { role: ChatRole; content: string }

type Options = {
  endpoint?: string
  model?: string
  systemPrompt?: string
}

export function useChat(opts: Options = {}) {
  const endpoint = opts.endpoint ?? "/api/llm/chat"
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: opts.systemPrompt ?? "Odpowiadasz krótko i technicznie." },
  ])
  const [input, setInput] = useState("")
  const [isStreaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const send = useCallback(async () => {
    const prompt = input.trim()
    if (!prompt || isStreaming) return

    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setError(null)
    setStreaming(true)

    const optimistic = messages.concat({ role: "user", content: prompt }, { role: "assistant", content: "" })
    setMessages(optimistic)
    setInput("")

    try {
      const payload = {
        ...(opts.model ? { model: opts.model } : {}),
        messages: optimistic.map(({ role, content }) => ({ role, content })),
        stream: true,
      }

      const res = await fetch(endpoint, {
        method: "POST",
        signal: ctrl.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(text || `HTTP ${res.status}`)
      }
      if (!res.body) throw new Error("Brak body w odpowiedzi.")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      const parse = createNdjsonParser((obj) => {
        const token = (obj as any)?.message?.content ?? (obj as any)?.response ?? ""
        if (!token) return

        setMessages((prev) => {
          const last = prev[prev.length - 1]
          if (!last || last.role !== "assistant") return prev
          return prev.slice(0, -1).concat({ ...last, content: last.content + token })
        })
      })

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        parse(decoder.decode(value, { stream: true }))
      }
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setStreaming(false)
    }
  }, [endpoint, input, isStreaming, messages, opts.model])

  const stop = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const clear = useCallback(() => {
    abortRef.current?.abort()
    setMessages([{ role: "system", content: opts.systemPrompt ?? "Odpowiadasz krótko i technicznie." }])
    setInput("")
    setError(null)
  }, [opts.systemPrompt])

  return {
    messages,
    input,
    setInput,
    isStreaming,
    error,
    send,
    stop,
    clear,
  }
}
