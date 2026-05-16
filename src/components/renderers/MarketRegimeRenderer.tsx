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

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} UTC`
}

const STATE_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--accent)",
}

export default function MarketRegimeRenderer({ response }: MarketRegimeRendererProps) {
  const { data } = response
  const { as_of, regime_state, confidence, duration_days, transitions, history, narrative } = data
  const color = STATE_COLORS[regime_state] ?? "var(--accent)"

  return (
    <div className="animate-fade-up stagger-1">
      <div className="mr2">
        {/* Top bar */}
        <div className="mr2__topbar">
          <div className="mr2__topbar-left">
            <span className="mr2__topbar-badge" style={{ borderColor: color, color }}>
              <span className="mr2__topbar-badge-dot" style={{ background: color }} />
              MARKET REGIME
            </span>
          </div>
          <div className="mr2__topbar-right">
            <span className="mr2__topbar-ts">{formatTimestamp(as_of)}</span>
            <span className="mr2__topbar-live" style={{ color }}>● LIVE</span>
          </div>
        </div>

        {/* Main grid: Hero | Gauge + Transitions */}
        <div className="mr2__grid">
          <div className="mr2__grid-hero">
            <RegimeState state={regime_state} durationDays={duration_days} confidence={confidence} />
          </div>
          <div className="mr2__grid-side">
            <ConfidenceGauge value={confidence} color={color} />
            <TransitionProbabilities transitions={transitions} />
          </div>
        </div>

        {/* History strip */}
        <HistoryTimeline history={history} />

        {/* Narrative + AI Interpretation */}
        <div className="mr2__bottom">
          <NarrativePanel narrative={narrative} />
          <AiInterpretation
            regimeState={regime_state}
            confidence={confidence}
            durationDays={duration_days}
          />
        </div>
      </div>
    </div>
  )
}
