import type { CSSProperties } from "react"

interface FeatureContributionsProps {
  features: Array<{ name: string; contribution: number }>
}

export default function FeatureContributions({ features }: FeatureContributionsProps) {
  const maxAbs = Math.max(...features.map(f => Math.abs(f.contribution)), 0.001)

  return (
    <div className="mb-4">
      <div className="text-[11px] uppercase tracking-wider text-[var(--text-mute)] mb-2.5">Key Drivers</div>
      <div className="space-y-2">
        {features.slice(0, 4).map((f, i) => {
          const abs = Math.abs(f.contribution)
          const pct = (abs / maxAbs) * 100
          const isPos = f.contribution > 0
          const isNeg = f.contribution < 0
          const barColor = isPos ? "var(--green)" : isNeg ? "var(--red)" : "var(--text-dim)"
          const barStyle: CSSProperties = { width: `${pct}%`, background: barColor, opacity: 0.6, transitionTimingFunction: "var(--ease-spring)" }

          return (
            <div key={f.name + i} className="flex items-center gap-2.5">
              <span className="text-xs text-[var(--text-dim)] truncate w-[140px] shrink-0" title={f.name}>
                {f.name}
              </span>
              <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                {abs > 0 ? (
                  <div className="h-full rounded-full transition-all" style={barStyle} />
                ) : (
                  <div className="h-full rounded-full transition-all" style={{ width: "2px", background: barColor, opacity: 0.4, transitionTimingFunction: "var(--ease-spring)" }} />
                )}
              </div>
              <span className={`text-[11px] font-mono w-12 text-right shrink-0 ${isPos ? "text-[var(--green)]" : isNeg ? "text-[var(--red)]" : "text-[var(--text-dim)]"}`}>
                {f.contribution > 0 ? "+" : ""}{f.contribution.toFixed(3)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
