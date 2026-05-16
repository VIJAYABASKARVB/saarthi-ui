import type { SuccessEnvelope, MarketRegimeData } from "../../types/api"
import { STATE_COLORS } from "../../lib/regime"
import RegimeState from "./market-regime/RegimeState"
import TransitionPillars from "./market-regime/TransitionPillars"
import HistoryStream from "./market-regime/HistoryStream"
import NarrativePanel from "./market-regime/NarrativePanel"

interface MarketRegimeRendererProps {
  response: SuccessEnvelope<"market_regime", MarketRegimeData>
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

export default function MarketRegimeRenderer({ response }: MarketRegimeRendererProps) {
  const { data } = response
  const { as_of, regime_state, confidence, duration_days, transitions, history, narrative } = data
  const color = STATE_COLORS[regime_state] ?? "var(--accent)"

  return (
    <div className="bezel-shell animate-fade-up stagger-1">
      <div className="bezel-core">
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-[var(--border)]">
          <span className="font-mono text-[11px] text-[var(--text-mute)] tabular-nums">
            {formatTimestamp(as_of)}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-[var(--text-mute)] tabular-nums">
              DUR {duration_days}D
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-[6px] h-[6px] rounded-full animate-pulse"
                style={{ background: color, boxShadow: "0 0 6px " + color }}
              />
              <span
                className="font-mono text-[11px] font-semibold tracking-wider uppercase"
                style={{ color }}
              >
                LIVE
              </span>
            </span>
          </div>
        </div>

        <RegimeState state={regime_state} durationDays={duration_days} confidence={confidence} />
        <TransitionPillars transitions={transitions} />
        <HistoryStream history={history} />
        <NarrativePanel narrative={narrative} />
      </div>
    </div>
  )
}
