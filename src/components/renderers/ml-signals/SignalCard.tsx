import type { MLSignal } from "../../../types/api"
import { Badge } from "../../ui/badge"
import ConfidenceBar from "./ConfidenceBar"
import ProbabilityBar from "./ProbabilityBar"
import FeatureContributions from "./FeatureContributions"

interface SignalCardProps {
  signal: MLSignal
}

const DIR_CONFIG: Record<string, { badge: string; color: string }> = {
  Buy: { badge: "Buy", color: "var(--green)" },
  Sell: { badge: "Sell", color: "var(--red)" },
  Hold: { badge: "Hold", color: "var(--amber)" },
}

function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatPercent(n: number): { text: string; cls: string } {
  const isPos = n > 0
  const isNeg = n < 0
  if (isPos) return { text: `+${n.toFixed(2)}%`, cls: "text-[var(--green)]" }
  if (isNeg) return { text: `${n.toFixed(2)}%`, cls: "text-[var(--red)]" }
  return { text: "0.00%", cls: "text-[var(--text-dim)]" }
}

export default function SignalCard({ signal }: SignalCardProps) {
  const { symbol, price, percent_change24h, direction, signal_score, confidence, prob_buy, prob_hold, prob_sell, top_features } = signal
  const cfg = DIR_CONFIG[direction]
  const change = formatPercent(percent_change24h)

  return (
    <div className="card-glass rounded-xl p-4 transition-all duration-200 hover:border-[rgba(124,92,255,0.3)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--text)]">{symbol}</span>
          <span className="text-xs font-mono text-[var(--text-dim)]">{formatPrice(price)}</span>
          <span className={"text-xs font-mono " + change.cls}>{change.text}</span>
        </div>
        <Badge
          variant="outline"
          className={
            "rounded-full text-xs font-medium px-3 " +
            (confidence < 0.3 ? "opacity-40" : "") +
            (direction === "Buy" ? " border-[var(--green)] text-[var(--green)]" :
             direction === "Sell" ? " border-[var(--red)] text-[var(--red)]" :
             " border-[var(--amber)] text-[var(--amber)]")
          }
        >
          {cfg.badge}
        </Badge>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-[var(--text-dim)] shrink-0">Score: {signal_score.toFixed(1)}</span>
        <ConfidenceBar value={confidence} color={cfg.color} />
        <span className="text-xs font-mono shrink-0 w-9 text-right" style={{ color: cfg.color }}>
          {(confidence * 100).toFixed(0)}%
        </span>
      </div>

      <ProbabilityBar probBuy={prob_buy} probHold={prob_hold} probSell={prob_sell} />

      {top_features.length > 0 && <FeatureContributions features={top_features} />}
    </div>
  )
}
