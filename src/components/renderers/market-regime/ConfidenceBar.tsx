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
      <div className="regime__confidence-track">
        <div className="regime__confidence-fill" style={style} />
      </div>
      <div className="regime__confidence-label" style={{ color }}>{pct.toFixed(0)}%</div>
    </div>
  )
}
