import type { CSSProperties } from "react"
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
  const total = ROWS.reduce((sum, r) => sum + (transitions[r.key] || 0), 0) || 1
  const sorted = [...ROWS].sort((a, b) => (transitions[b.key] || 0) - (transitions[a.key] || 0))
  const largest = sorted[0]
  const largestPct = ((transitions[largest.key] || 0) / total) * 100

  type SegType = { key: string; label: string; color: string; pct: number; start: number }
  const segments: SegType[] = []
  let cumStart = 0
  for (const r of ROWS) {
    const pct = ((transitions[r.key] || 0) / total) * 100
    segments.push({ ...r, pct, start: cumStart })
    cumStart += pct
  }

  const donutRadius = 48
  const donutCircumference = 2 * Math.PI * donutRadius
  const viewSize = (donutRadius + 8) * 2

  return (
    <div className="regime__transitions">
      <div className="regime__transitions-header">Transition Probabilities</div>
      <div className="regime__transitions-body">
        <div className="regime__transitions-donut">
          <svg width="100%" height="100%" viewBox={`0 0 ${viewSize} ${viewSize}`} fill="none">
            {segments.map((s) => {
              const length = (s.pct / 100) * donutCircumference
              const dashArray = `${length} ${donutCircumference - length}`
              const rotation = (s.start / 100) * 360 - 90
              return (
                <circle
                  key={s.key}
                  cx={viewSize / 2}
                  cy={viewSize / 2}
                  r={donutRadius}
                  stroke={s.color}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="butt"
                  strokeDasharray={dashArray}
                  transform={`rotate(${rotation} ${viewSize / 2} ${viewSize / 2})`}
                  style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.32, 0.72, 0, 1)" }}
                />
              )
            })}
          </svg>
          <div className="regime__transitions-donut-center">
            <span className="regime__transitions-donut-value" style={{ color: largest.color }}>
              {largestPct.toFixed(0)}%
            </span>
            <span className="regime__transitions-donut-label">{largest.label}</span>
          </div>
        </div>
        <div className="regime__transitions-bars">
          {ROWS.map(r => {
            const val = transitions[r.key] || 0
            const pct = Math.min(Math.max(val * 100, 0), 100)
            const fillStyle: CSSProperties = { width: `${pct}%`, background: r.color }

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
      </div>
    </div>
  )
}
