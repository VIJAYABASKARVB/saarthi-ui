import type { SuccessEnvelope, MarketRegimeData } from "../../types/api"
import RegimeState from "./market-regime/RegimeState"
import ConfidenceGauge from "./market-regime/ConfidenceGauge"
import TransitionProbabilities from "./market-regime/TransitionProbabilities"
import HistoryTimeline from "./market-regime/HistoryTimeline"
import NarrativePanel from "./market-regime/NarrativePanel"
import AiInterpretation from "./market-regime/AiInterpretation"

interface MarketRegimeRendererProps {
  response: SuccessEnvelope<"market_regime", MarketRegimeData>
}

export default function MarketRegimeRenderer({ response }: MarketRegimeRendererProps) {
  const { data } = response
  const { as_of, regime_state, confidence, duration_days, transitions, history, narrative } = data

  return (
    <div className="animate-fade-up stagger-1">
      <div className="regime">
        <div className="regime__header">
          <span className="eyebrow">Market Intelligence</span>
          <span className="regime__timestamp">updated {as_of}</span>
        </div>

        <div className="regime__grid">
          <div className="regime__cell regime__cell--hero">
            <RegimeState state={regime_state} durationDays={duration_days} />
          </div>
          <div className="regime__cell regime__cell--gauge">
            <ConfidenceGauge value={confidence} color={
              { "Risk-on": "var(--green)", "Risk-off": "var(--red)", Choppy: "var(--amber)", Transition: "var(--accent)" }[regime_state] ?? "var(--accent)"
            } />
          </div>

          <div className="regime__cell regime__cell--donut">
            <TransitionProbabilities transitions={transitions} />
          </div>
          <div className="regime__cell regime__cell--timeline">
            <HistoryTimeline history={history} />
          </div>
        </div>

        <NarrativePanel narrative={narrative} />

        <AiInterpretation
          regimeState={regime_state}
          confidence={confidence}
          durationDays={duration_days}
        />
      </div>
    </div>
  )
}
