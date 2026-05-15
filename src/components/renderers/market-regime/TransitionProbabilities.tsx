import type { CSSProperties } from "react"

interface TransitionProbabilitiesProps {
  transitions: {
    to_risk_on: number
    to_risk_off: number
    to_choppy: number
  }
}

const ROWS = [
  { key: "to_risk_on" as const, label: "Risk-on", color: "var(--green)" },
  { key: "to_risk_off" as const, label: "Risk-off", color: "var(--red)" },
  { key: "to_choppy" as const, label: "Choppy", color: "var(--amber)" },
]

export default function TransitionProbabilities({ transitions }: TransitionProbabilitiesProps) {
  return (
    <div className="regime__transitions">
      <div className="regime__transitions-header">
        Transition probabilities
      </div>
      {ROWS.map(r => {
        const val = transitions[r.key]
        const pct = Math.min(Math.max(val * 100, 0), 100)
        const fillStyle: CSSProperties = { width: `${pct}%`, background: r.color, opacity: 0.7 }

        return (
          <div key={r.key} className="regime__transition-row">
            <span className="regime__transition-label">{r.label}</span>
            <div className="regime__transition-track">
              <div className="regime__transition-fill" style={fillStyle} />
            </div>
            <span className="regime__transition-value" style={{ color: r.color }}>{pct.toFixed(0)}%</span>
          </div>
        )
      })}
    </div>
  )
}
