import type { CSSProperties } from "react"

interface ConfidenceBarProps {
  value: number
  color: string
  max?: number
}

export default function ConfidenceBar({ value, color, max = 1 }: ConfidenceBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)
  const style: CSSProperties = { width: `${pct}%`, background: color, transitionTimingFunction: "var(--ease-spring)" }

  return (
    <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div className="h-full rounded-full transition-all" style={style} />
    </div>
  )
}
