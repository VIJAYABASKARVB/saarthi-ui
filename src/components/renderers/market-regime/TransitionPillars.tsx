import type { MarketRegimeTransitions } from "../../../types/api"

interface TransitionPillarsProps {
  transitions: MarketRegimeTransitions
}

const PILLARS = [
  { key: "to_risk_on" as const, label: "Risk-on", color: "var(--green)" },
  { key: "to_risk_off" as const, label: "Risk-off", color: "var(--red)" },
  { key: "to_choppy" as const, label: "Choppy", color: "var(--amber)" },
]

export default function TransitionPillars({ transitions }: TransitionPillarsProps) {
  const vals = PILLARS.map(p => ({ ...p, val: transitions[p.key] || 0 }))
  const maxVal = Math.max(...vals.map(v => v.val), 0.01)

  return (
    <div className="px-6 py-5 border-t border-[var(--border)]">
      <span className="font-mono text-xs text-[var(--text-mute)] uppercase tracking-wider block mb-4">
        Transition Probability
      </span>
      <div className="flex items-end justify-center gap-6 h-36">
        {vals.map(p => {
          const pct = Math.round(p.val * 100)
          const heightPct = (p.val / maxVal) * 100
          const isTop = p.val === maxVal

          return (
            <div key={p.key} className="pillar-hover flex flex-col items-center gap-2 cursor-pointer">
              <span
                className="font-mono text-sm font-bold tabular-nums"
                style={{ color: isTop ? p.color : "var(--text-dim)" }}
              >
                {pct}%
              </span>
              <div
                className="w-16 relative rounded-full overflow-hidden"
                style={{
                  height: `${Math.max(heightPct * 0.75, 8)}px`,
                  background: "var(--track-bg)",
                  transition: "height 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 rounded-full transition-all duration-700"
                  style={{
                    height: `${heightPct}%`,
                    background: p.color,
                    opacity: isTop ? 1 : 0.35,
                  }}
                />
              </div>
              <span
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: isTop ? p.color : "var(--text-mute)" }}
              >
                {p.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
