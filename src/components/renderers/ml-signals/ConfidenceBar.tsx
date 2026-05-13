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
    <div className="ml-signals__confidence">
      <div className="ml-signals__confidence-fill" style={style} />
    </div>
  )
}
