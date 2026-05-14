import type { SuccessEnvelope, MarketRegimeData } from "../../types/api"
import RegimeState from "./market-regime/RegimeState"
import TransitionProbabilities from "./market-regime/TransitionProbabilities"
import HistoryDotStrip from "./market-regime/HistoryDotStrip"

interface MarketRegimeRendererProps {
  response: SuccessEnvelope<"market_regime", MarketRegimeData>
}

export default function MarketRegimeRenderer({ response }: MarketRegimeRendererProps) {
  const { data } = response
  const { as_of, regime_state, confidence, duration_days, transitions, history, narrative } = data

  return (
    <div className="card-glass rounded-xl overflow-hidden" style={{ borderTop: "2px solid rgba(124,92,255,0.3)" }}>
      <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.06)] text-xs text-[var(--text-mute)] tracking-wider">
        Market regime &middot; as of {as_of}
      </div>

      <RegimeState state={regime_state} confidence={confidence} />

      <div className="flex justify-center gap-6 px-5 pb-4 text-xs text-[var(--text-dim)] font-mono">
        <span>Duration: {duration_days} days</span>
        <span>Confidence: {(confidence * 100).toFixed(0)}%</span>
      </div>

      <TransitionProbabilities transitions={transitions} />
      <HistoryDotStrip history={history} />

      {narrative && (
        <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.06)] text-xs text-[var(--text-dim)] leading-relaxed">
          {narrative}
        </div>
      )}
    </div>
  )
}
