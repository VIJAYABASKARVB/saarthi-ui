import { useState, useRef, type KeyboardEvent } from 'react'
import { ArrowUp } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'

interface QueryInputProps {
  onSubmit: (query: string) => void
}

const CHIPS = ["screener", "signals", "regime", "news", "coin", "composite", "error"]

export default function QueryInput({ onSubmit }: QueryInputProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (query.trim()) {
      onSubmit(query.trim())
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className="mb-6">
      <Card size="sm" className="p-0 gap-0 query-input-card">
        <div className="flex items-center gap-2 px-5 py-3.5">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about crypto..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-mute)] font-sans"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <button
            onClick={handleSubmit}
            className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cff] to-[#5a3ed1] flex items-center justify-center text-white hover:from-[#8d6fff] hover:to-[#6a4ee0] transition-all duration-200 active:scale-95 shadow-[0_0_12px_rgba(124,92,255,0.3)]"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </Card>
      <div className="flex gap-2 mt-3 flex-wrap">
        {CHIPS.map(chip => (
          <Badge
            key={chip}
            variant="outline"
            className="chip-badge cursor-pointer select-none hover:text-[var(--accent)] text-xs"
            onClick={() => {
              setQuery(chip)
              inputRef.current?.focus()
            }}
          >
            {chip}
          </Badge>
        ))}
      </div>
    </div>
  )
}
