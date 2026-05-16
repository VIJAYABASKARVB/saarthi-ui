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
    <div
      className="flex-1 h-[3px] rounded-full overflow-hidden"
      style={{ background: "var(--track-bg)" }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={"Confidence " + Math.round(pct) + "%"}
    >
      <div className="h-full rounded-full transition-all" style={style} />
    </div>
  )
}
