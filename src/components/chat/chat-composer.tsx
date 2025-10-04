"use client"

import { Loader2, Moon, Plus, Send, Square, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Input from "../ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

type Props = {
  input: string
  setInput: (v: string) => void
  isStreaming: boolean
  error: string | null
  onSend: () => void
  onStop: () => void
  onClear: () => void
  model?: string
  setModel?: (v: string) => void
  header?: React.ReactNode
}

export function ChatComposer({
  input,
  setInput,
  isStreaming,
  error,
  onSend,
  onStop,
  onClear,
  model,
  setModel,
  header,
}: Props) {
  const canSend = input.trim().length > 0 && !isStreaming

  return (
    <TooltipProvider>
      <div className="space-y-3 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-2xl">
              <Moon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-base font-semibold">LLM Chat</div>
              <div className="text-muted-foreground text-xs">{header ?? "Ollama → Nest → Next"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {model || "domyślny model"}
            </Badge>
          </div>
        </div>

        {/* Opcjonalny model override */}
        {setModel && (
          <div className="flex items-center gap-2">
            <Input
              value={model ?? ""}
              onChange={(e) => setModel?.(e.target.value)}
              placeholder="model (np. gpt-oss:latest) — puste = ENV"
              className="bg-background/60 rounded-xl"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" className="rounded-xl" onClick={() => setModel?.("")}>
                  <Plus className="mr-2 h-4 w-4" /> Użyj domyślnego
                </Button>
              </TooltipTrigger>
              <TooltipContent>Wyczyść, aby użyć modelu z ENV</TooltipContent>
            </Tooltip>
          </div>
        )}

        <Separator className="opacity-50" />

        {/* Pole + akcje */}
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Napisz wiadomość…"
            className="bg-background/60 min-h-[56px] flex-1 resize-none rounded-2xl"
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault()
                onSend()
              }
            }}
          />
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="icon" disabled={!isStreaming} onClick={onStop} className="rounded-xl">
                  <Square className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Stop</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="icon" onClick={onClear} className="rounded-xl">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Wyczyść</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled={!canSend} onClick={onSend} className="rounded-xl">
                  {isStreaming ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Wyślij
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ctrl/Cmd + Enter</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {error && <div className="text-destructive text-xs">{error}</div>}
      </div>
    </TooltipProvider>
  )
}
