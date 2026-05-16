import type { MarketRegimeTransitions } from "../../../types/api"

interface TransitionProbabilitiesProps {
  transitions: MarketRegimeTransitions
}

const ROWS = [
  { key: "to_risk_on" as const, label: "Risk-on", color: "var(--green)", icon: "▲" },
  { key: "to_risk_off" as const, label: "Risk-off", color: "var(--red)", icon: "▼" },
  { key: "to_choppy" as const, label: "Choppy", color: "var(--amber)", icon: "◆" },
]

export default function TransitionProbabilities({ transitions }: TransitionProbabilitiesProps) {
  const sorted = [...ROWS].sort((a, b) => (transitions[b.key] || 0) - (transitions[a.key] || 0))
  const maxVal = Math.max(...ROWS.map(r => transitions[r.key] || 0))

  return (
    <div className="mr2__trans-card">
      <div className="mr2__trans-header">
        <span className="mr2__trans-header-label">TRANSITION PROBABILITY</span>
      </div>

      {/* Stacked bar visualization */}
      <div className="mr2__trans-stacked">
        {ROWS.map(r => {
          const val = transitions[r.key] || 0
          const pct = Math.round(val * 100)
          return (
            <div
              key={r.key}
              className="mr2__trans-stacked-seg"
              style={{ width: `${pct}%`, background: r.color }}
              title={`${r.label}: ${pct}%`}
            />
          )
        })}
      </div>

      {/* Individual rows */}
      <div className="mr2__trans-rows">
        {sorted.map(r => {
          const val = transitions[r.key] || 0
          const pct = Math.round(val * 100)
          const barWidth = maxVal > 0 ? (val / maxVal) * 100 : 0
          const isTop = r === sorted[0]

          return (
            <div key={r.key} className={`mr2__trans-row ${isTop ? "mr2__trans-row--lead" : ""}`}>
              <span className="mr2__trans-row-icon" style={{ color: r.color }}>{r.icon}</span>
              <span className="mr2__trans-row-label">{r.label}</span>
              <div className="mr2__trans-row-track">
                <div
                  className="mr2__trans-row-fill"
                  style={{ width: `${barWidth}%`, background: r.color }}
                />
              </div>
              <span className="mr2__trans-row-value" style={{ color: isTop ? r.color : undefined }}>
                {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
