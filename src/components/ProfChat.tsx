import React, { useState, useRef, useEffect } from 'react'
import { useClaude } from '../hooks/useClaude'
import type { ChatMessage } from '../types'

interface Props {
  initialPrompt?: string
  onClose?: () => void
}

const MessageBubble: React.FC<{ msg: ChatMessage }> = ({ msg }) => {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0 mt-1">
          <svg className="w-4 h-4 stroke-white fill-none" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c-6 0-9 2.5-9 4v2h18v-2c0-1.5-3-4-9-4z"/>
          </svg>
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-wood-deep text-white rounded-tr-sm'
          : 'bg-white border border-sage-light text-wood-darkest rounded-tl-sm'
      }`}>
        {!isUser && (
          <div className="text-[10px] font-medium text-sage-dark mb-1">Le Professeur</div>
        )}
        {msg.content}
      </div>
    </div>
  )
}

export const ProfChat: React.FC<Props> = ({ initialPrompt, onClose }) => {
  const { messages, loading, error, sendMessage, clearMessages } = useClaude()
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (initialPrompt && !started) {
      setStarted(true)
      sendMessage(initialPrompt)
    }
  }, [initialPrompt, started, sendMessage])

  const handleSend = () => {
    if (!input.trim() || loading) return
    sendMessage(input.trim())
    setInput('')
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[480px] bg-white rounded-2xl border border-wood-mid overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-wood-lightest border-b border-wood-mid">
        <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
          <svg className="w-4 h-4 stroke-white fill-none" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c-6 0-9 2.5-9 4v2h18v-2c0-1.5-3-4-9-4z"/>
          </svg>
        </div>
        <div>
          <div className="text-sm font-medium text-wood-darkest">Le Professeur</div>
          <div className="text-[10px] text-wood-deep">Assistant pédagogique IA</div>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={clearMessages}
            className="text-[10px] text-wood-deep hover:text-wood-dark px-2 py-1 rounded border border-wood-mid hover:bg-wood-light transition-colors"
          >
            Nouvelle conversation
          </button>
          {onClose && (
            <button onClick={onClose} className="text-wood-deep hover:text-wood-dark w-6 h-6 flex items-center justify-center text-lg">
              ×
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !loading && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎸</div>
            <div className="text-sm text-wood-deep">
              Pose-moi n'importe quelle question sur la guitare, l'harmonie ou tes compositions.
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {loading && (
          <div className="flex gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 stroke-white fill-none" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c-6 0-9 2.5-9 4v2h18v-2c0-1.5-3-4-9-4z"/>
              </svg>
            </div>
            <div className="bg-white border border-sage-light rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-sage animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-xs text-red-500 text-center py-2">
            Erreur : {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-wood-mid bg-wood-lightest">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pose ta question au prof..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-wood-mid bg-white px-3 py-2 text-sm text-wood-darkest placeholder-wood-warm focus:outline-none focus:border-wood-deep"
            style={{ minHeight: '38px', maxHeight: '100px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-wood-deep hover:bg-wood-dark disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}