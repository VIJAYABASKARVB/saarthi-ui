import { useState, useRef, type KeyboardEvent } from 'react'
import { Search, ArrowUpRight, Filter, Activity, Map, Newspaper, Coins, Layers, AlertTriangle } from 'lucide-react'

interface IdleScreenProps {
  onSubmit: (query: string) => void;
}

const CHIPS = [
  { id: 'screener', icon: Filter, label: 'screener' },
  { id: 'signals', icon: Activity, label: 'signals' },
  { id: 'regime', icon: Map, label: 'regime' },
  { id: 'news', icon: Newspaper, label: 'news' },
  { id: 'coin', icon: Coins, label: 'coin' },
  { id: 'composite', icon: Layers, label: 'composite' },
  { id: 'error', icon: AlertTriangle, label: 'error' },
]

export default function IdleScreen({ onSubmit }: IdleScreenProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (query.trim()) onSubmit(query.trim())
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit()
  }

  const handleChipClick = (chipId: string) => {
    setQuery(chipId)
    inputRef.current?.focus()
  }

  return (
    <main className="relative z-10 flex flex-col items-center pt-8 sm:pt-16 pb-12">
      <div className="w-full max-w-3xl mb-4 animate-fade-up stagger-1">
        <span className="eyebrow mb-4 inline-block">Natural Language Intelligence</span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text)] leading-[1.1] mb-3">
          Ask anything about
          <span className="text-[var(--accent)]"> crypto</span>
        </h1>
        <p className="text-base text-[var(--text-dim)] max-w-lg leading-relaxed">
          Saarthi translates your questions into precise market intelligence. Try a command below.
        </p>
      </div>

      <div className="w-full max-w-2xl mb-8 animate-fade-up stagger-2">
        <div className="bezel-shell">
          <div className="bezel-core">
            <div className="flex items-center px-5 py-3.5">
              <Search size={18} className="text-[var(--text-mute)] mr-3 shrink-0" />
              <input
                ref={inputRef}
                className="w-full bg-transparent border-none text-[var(--text)] text-sm focus:ring-0 placeholder:text-[var(--text-mute)] h-8 outline-none"
                placeholder="Show me top gainers with volume surge..."
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSubmit}
                className="magnetic-btn shrink-0 w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white hover:bg-[#8d6fff] ml-2 group"
              >
                <ArrowUpRight size={16} className="magnetic-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-2xl animate-fade-up stagger-3">
        {CHIPS.map((chip, i) => {
          const Icon = chip.icon
          return (
            <button
              key={chip.id}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-full border border-[rgba(255,255,255,0.08)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-500 [transition-timing-function:var(--ease-spring)] bg-[rgba(13,13,18,0.5)] backdrop-blur-[12px]"
              style={{ animationDelay: `${(i + 3) * 80}ms` }}
              onClick={() => handleChipClick(chip.id)}
            >
              <Icon size={13} strokeWidth={1.5} />
              {chip.label}
            </button>
          )
        })}
      </div>
    </main>
  )
}
