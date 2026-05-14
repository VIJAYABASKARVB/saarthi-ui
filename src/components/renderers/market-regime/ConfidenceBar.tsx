import type { CSSProperties } from "react"

interface ConfidenceBarProps {
  value: number
  color: string
}

export default function ConfidenceBar({ value, color }: ConfidenceBarProps) {
  const pct = Math.min(Math.max(value * 100, 0), 100)
  const style: CSSProperties = { width: `${pct}%`, background: color }

  return (
    <div>
      <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
        <div className="h-full rounded-full transition-all" style={style} />
      </div>
      <div className="text-right text-xs font-mono mt-1" style={{ color }}>{pct.toFixed(0)}%</div>
    </div>
  )
}
