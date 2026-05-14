import type { CSSProperties } from "react"

interface ConfidenceBarProps {
  value: number
  color: string
  max?: number
}

export default function ConfidenceBar({ value, color, max = 1 }: ConfidenceBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)
  const style: CSSProperties = { width: `${pct}%`, background: color }

  return (
    <div className="flex-1 h-2 rounded-full bg-[var(--border)] overflow-hidden">
      <div className="h-full rounded-full transition-all" style={style} />
    </div>
  )
}
