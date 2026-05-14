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
    <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.06)]">
      <div className="text-[10px] text-[var(--text-mute)] uppercase tracking-wider mb-2">
        Transition probabilities
      </div>
      {ROWS.map(r => {
        const val = transitions[r.key]
        const pct = Math.min(Math.max(val * 100, 0), 100)
        const fillStyle: CSSProperties = { width: `${pct}%`, background: r.color, opacity: 0.7 }

        return (
          <div key={r.key} className="flex items-center gap-2.5 py-1">
            <span className="w-16 text-xs text-[var(--text-dim)] shrink-0">{r.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
              <div className="h-full rounded-full transition-all" style={fillStyle} />
            </div>
            <span className="w-8 text-right text-xs font-mono" style={{ color: r.color }}>{pct.toFixed(0)}%</span>
          </div>
        )
      })}
    </div>
  )
}
