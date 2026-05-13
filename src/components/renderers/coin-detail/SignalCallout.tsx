import type { CSSProperties } from "react"

interface SignalCalloutProps {
  direction: "Buy" | "Sell" | "Hold"
  confidence: number
}

const BADGE_CLS: Record<string, string> = {
  Buy: "coin-detail__signal-badge--buy",
  Sell: "coin-detail__signal-badge--sell",
  Hold: "coin-detail__signal-badge--hold",
}

const DIR_COLORS: Record<string, string> = {
  Buy: "var(--green)",
  Sell: "var(--red)",
  Hold: "var(--amber)",
}

export default function SignalCallout({ direction, confidence }: SignalCalloutProps) {
  const badgeCls = BADGE_CLS[direction] + (confidence < 0.3 ? " coin-detail__signal-badge--dim" : "")
  const color = DIR_COLORS[direction]
  const pct = Math.min(Math.max(confidence * 100, 0), 100)
  const fillStyle: CSSProperties = { width: `${pct}%`, background: color }

  return (
    <div className="coin-detail__signal-column">
      <div className="coin-detail__signal-header">Latest Signal</div>
      <div className={`coin-detail__signal-badge ${badgeCls}`}>{direction}</div>
      <div style={{ height: 6, background: "var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ height: "100%", ...fillStyle }} />
      </div>
      <div className="coin-detail__confidence-label">{pct.toFixed(0)}% confidence</div>
    </div>
  )
}
