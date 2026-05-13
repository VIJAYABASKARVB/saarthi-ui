import type { CSSProperties } from "react"

interface FeatureContributionsProps {
  features: Array<{ name: string; contribution: number }>
}

export default function FeatureContributions({ features }: FeatureContributionsProps) {
  const maxAbs = Math.max(...features.map(f => Math.abs(f.contribution)), 0.001)

  return (
    <div className="ml-signals__features">
      <div className="ml-signals__features-header">Top Features</div>
      {features.slice(0, 5).map((f, i) => {
        const abs = Math.abs(f.contribution)
        const pct = (abs / maxAbs) * 100
        const isPos = f.contribution > 0
        const isNeg = f.contribution < 0
        const barColor = isPos ? "var(--green)" : isNeg ? "var(--red)" : "var(--text-dim)"
        const barStyle: CSSProperties = {
          width: `${pct}%`,
          background: barColor,
          opacity: 0.7,
        }
        const valueClass = isPos
          ? "ml-signals__feature-value--pos"
          : isNeg
          ? "ml-signals__feature-value--neg"
          : "ml-signals__feature-value--zero"

        return (
          <div key={f.name + i} className="ml-signals__feature-row">
            <span className="ml-signals__feature-name" title={f.name}>{f.name}</span>
            <div className="ml-signals__feature-track">
              {abs > 0 ? (
                <div className="ml-signals__feature-bar" style={barStyle} />
              ) : (
                <div className="ml-signals__feature-bar" style={{ width: "2px", background: barColor, opacity: 0.5 }} />
              )}
            </div>
            <span className={`ml-signals__feature-value ${valueClass}`}>
              {f.contribution > 0 ? "+" : ""}{f.contribution.toFixed(3)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
