import type { MLSignal } from "../../../types/api"
import ConfidenceBar from "./ConfidenceBar"
import ProbabilityBar from "./ProbabilityBar"
import FeatureContributions from "./FeatureContributions"

interface SignalCardProps {
  signal: MLSignal
}

function formatPercent(n: number): { text: string; color: string; cls: string } {
  if (n > 0) return { text: `+${n.toFixed(2)}%`, color: "var(--green)", cls: "ml-signals__change" }
  if (n < 0) return { text: `${n.toFixed(2)}%`, color: "var(--red)", cls: "ml-signals__change" }
  return { text: "0.00%", color: "var(--text-dim)", cls: "ml-signals__change" }
}

const DIR_COLORS: Record<string, string> = {
  Buy: "var(--green)",
  Sell: "var(--red)",
  Hold: "var(--amber)",
}

const DIR_BADGE_CLS: Record<string, string> = {
  Buy: "ml-signals__badge--buy",
  Sell: "ml-signals__badge--sell",
  Hold: "ml-signals__badge--hold",
}

export default function SignalCard({ signal }: SignalCardProps) {
  const { symbol, price, percent_change24h, direction, signal_score, confidence, prob_buy, prob_hold, prob_sell, top_features } = signal
  const change = formatPercent(percent_change24h)
  const dirColor = DIR_COLORS[direction]
  const badgeCls = DIR_BADGE_CLS[direction] + (confidence < 0.3 ? " ml-signals__badge--dim" : "")

  return (
    <div className="ml-signals__card">
      <div className="ml-signals__identity">
        <div className="ml-signals__identity-left">
          <span className="ml-signals__symbol">{symbol}</span>
          <span className="ml-signals__price">
            ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className={change.cls} style={{ color: change.color }}>{change.text}</span>
        </div>
        <span className={`ml-signals__badge ${badgeCls}`}>{direction}</span>
      </div>

      <div className="ml-signals__score-row">
        <span className="ml-signals__score-label">Score: {signal_score.toFixed(1)}</span>
        <ConfidenceBar value={confidence} color={dirColor} />
        <span className="ml-signals__confidence-label" style={{ color: dirColor }}>
          {(confidence * 100).toFixed(0)}%
        </span>
      </div>

      <ProbabilityBar probBuy={prob_buy} probHold={prob_hold} probSell={prob_sell} />

      {top_features.length > 0 && <FeatureContributions features={top_features} />}
    </div>
  )
}
