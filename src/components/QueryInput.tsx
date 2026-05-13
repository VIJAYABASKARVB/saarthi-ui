import { useState, useRef, type KeyboardEvent } from 'react'

interface QueryInputProps {
  onSubmit: (query: string) => void
}

const CHIPS = ["screener", "signals", "regime", "news", "coin", "composite", "error"]

export default function QueryInput({ onSubmit }: QueryInputProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSubmit(query.trim())
    }
  }

  return (
    <div className="query-input">
      <div className="query-input__row">
        <span className="query-input__prefix">&gt;</span>
        <input
          ref={inputRef}
          className="query-input__field"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a query..."
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="query-input__cursor">▊</span>
      </div>
      <div className="chips">
        {CHIPS.map(chip => (
          <button
            key={chip}
            className="chip"
            onClick={() => {
              setQuery(chip)
              inputRef.current?.focus()
            }}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
