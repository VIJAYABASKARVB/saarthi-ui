import type { CSSProperties } from "react"

interface FeatureContributionsProps {
  features: Array<{ name: string; contribution: number }>
}

export default function FeatureContributions({ features }: FeatureContributionsProps) {
  const maxAbs = Math.max(...features.map(f => Math.abs(f.contribution)), 0.001)

  return (
    <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 px-4 pb-4">
      <div className="text-[10px] text-[var(--text-mute)] uppercase tracking-wider mb-2">Top Features</div>
      {features.slice(0, 5).map((f, i) => {
        const abs = Math.abs(f.contribution)
        const pct = (abs / maxAbs) * 100
        const isPos = f.contribution > 0
        const isNeg = f.contribution < 0
        const barColor = isPos ? "var(--green)" : isNeg ? "var(--red)" : "var(--text-dim)"
        const barStyle: CSSProperties = { width: `${pct}%`, background: barColor, opacity: 0.6 }

        return (
          <div key={f.name + i} className="flex items-center gap-2 py-1">
            <span className="text-xs text-[var(--text-dim)] truncate max-w-[160px] shrink-0" title={f.name}>{f.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
              {abs > 0 ? (
                <div className="h-full rounded-full" style={barStyle} />
              ) : (
                <div className="h-full rounded-full" style={{ width: "2px", background: barColor, opacity: 0.4 }} />
              )}
            </div>
            <span className={"text-xs font-mono w-12 text-right shrink-0 " + (isPos ? "text-[var(--green)]" : isNeg ? "text-[var(--red)]" : "text-[var(--text-dim)]")}>
              {f.contribution > 0 ? "+" : ""}{f.contribution.toFixed(3)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
