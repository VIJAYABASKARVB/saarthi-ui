interface SignalCalloutProps {
  direction: "Buy" | "Sell" | "Hold"
  confidence: number
}

const DIR_CONFIG: Record<string, { color: string; badgeClass: string }> = {
  Buy: { color: "var(--green)", badgeClass: "coin-detail__signal-badge--buy" },
  Sell: { color: "var(--red)", badgeClass: "coin-detail__signal-badge--sell" },
  Hold: { color: "var(--amber)", badgeClass: "coin-detail__signal-badge--hold" },
}

export default function SignalCallout({ direction, confidence }: SignalCalloutProps) {
  const cfg = DIR_CONFIG[direction]
  const pct = Math.min(Math.max(confidence * 100, 0), 100)

  return (
    <div className="coin-detail__signal-column">
      <div className="bezel-shell bezel-shell--sm">
        <div className="bezel-core bezel-core--sm coin-detail__signal-inner">
          <div className="coin-detail__signal-header">Latest signal</div>
          <span className={`coin-detail__signal-badge ${cfg.badgeClass}`}>{direction}</span>
          <div className="coin-detail__confidence-track">
            <div
              className="coin-detail__confidence-fill"
              style={{ width: `${pct}%`, background: cfg.color }}
            />
          </div>
          <div className="coin-detail__confidence-label">{pct.toFixed(0)}% confidence</div>
        </div>
      </div>
    </div>
  )
}
