import type { SuccessEnvelope, MarketRegimeData } from "../../types/api"
import RegimeState from "./market-regime/RegimeState"
import ConfidenceBar from "./market-regime/ConfidenceBar"
import TransitionProbabilities from "./market-regime/TransitionProbabilities"
import HistoryTimeline from "./market-regime/HistoryTimeline"
import NarrativePanel from "./market-regime/NarrativePanel"

interface MarketRegimeRendererProps {
  response: SuccessEnvelope<"market_regime", MarketRegimeData>
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
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
    <div className="border border-[rgba(255,255,255,0.06)] bg-[#050505] overflow-hidden animate-fade-up">
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-[rgba(255,255,255,0.06)] bg-[#0a0a0f]">
        <span className="font-mono text-[11px] text-[var(--text-mute)] tabular-nums">
          {formatTimestamp(as_of)}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[var(--text-mute)] tabular-nums">
            DUR {duration_days}D
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-[5px] h-[5px] rounded-full"
              style={{ background: color }}
            />
            <span
              className="font-mono text-[10px] font-semibold tracking-wider uppercase"
              style={{ color }}
            >
              LIVE
            </span>
          </span>
        </div>
      </div>

      <RegimeState state={regime_state} durationDays={duration_days} />
      <ConfidenceBar value={confidence} color={color} />
      <TransitionProbabilities transitions={transitions} />
      <HistoryTimeline history={history} />
      <NarrativePanel narrative={narrative} />
    </div>
  )
}
