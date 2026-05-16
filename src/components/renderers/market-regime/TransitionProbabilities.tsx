import type { MarketRegimeTransitions } from "../../../types/api"

interface TransitionProbabilitiesProps {
  transitions: MarketRegimeTransitions
}

const ROWS = [
  { key: "to_risk_on" as const, label: "Risk-on", color: "var(--green)" },
  { key: "to_risk_off" as const, label: "Risk-off", color: "var(--red)" },
  { key: "to_choppy" as const, label: "Choppy", color: "var(--amber)" },
]

export default function TransitionProbabilities({ transitions }: TransitionProbabilitiesProps) {
  const sorted = [...ROWS].sort((a, b) => (transitions[b.key] || 0) - (transitions[a.key] || 0))
  const maxVal = Math.max(...ROWS.map(r => transitions[r.key] || 0))

  return (
    <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)]">
      <span className="font-mono text-xs text-[var(--text-mute)] uppercase tracking-wider block mb-3">
        Transition Probability
      </span>
      <div className="flex flex-col gap-2">
        {sorted.map(r => {
          const val = transitions[r.key] || 0
          const pct = Math.round(val * 100)
          const barWidth = maxVal > 0 ? (val / maxVal) * 100 : 0
          const isTop = val === maxVal

          return (
            <div key={r.key} className="flex items-center gap-3">
              <span
                className="font-mono text-xs w-[68px] shrink-0 tabular-nums"
                style={{ color: isTop ? r.color : "var(--text-dim)" }}
              >
                {r.label}
              </span>
              <div className="flex-1 h-2 bg-[rgba(255,255,255,0.04)] relative">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ width: `${barWidth}%`, background: r.color, opacity: isTop ? 0.7 : 0.35 }}
                />
              </div>
              <span
                className="font-mono text-xs tabular-nums w-9 text-right shrink-0"
                style={{ color: isTop ? r.color : "var(--text-mute)" }}
              >
                {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
