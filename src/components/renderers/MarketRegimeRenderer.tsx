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
    <div className="bezel-shell animate-fade-up stagger-1">
      <div className="bezel-core regime">
        <div className="regime__meta">
          Market regime &middot; as of {as_of}
        </div>

        <RegimeState state={regime_state} confidence={confidence} />

        <div className="regime__metrics">
          <span>Duration: {duration_days} days</span>
          <span>Confidence: {(confidence * 100).toFixed(0)}%</span>
        </div>

        <TransitionProbabilities transitions={transitions} />
        <HistoryDotStrip history={history} />

        {narrative && (
          <div className="regime__narrative">
            {narrative}
          </div>
        )}
      </div>
    </div>
  )
}
