interface ProbabilityBarProps {
  probBuy: number
  probHold: number
  probSell: number
}

export default function ProbabilityBar({ probBuy, probHold, probSell }: ProbabilityBarProps) {
  const buyPct = (probBuy * 100).toFixed(0)
  const holdPct = (probHold * 100).toFixed(0)
  const sellPct = (probSell * 100).toFixed(0)

  const segments: Array<{ width: string; color: string; label: string; value: string }> = []
  if (probBuy > 0) {
    segments.push({ width: buyPct + "%", color: "var(--green)", label: "B", value: buyPct })
  }
  if (probHold > 0) {
    segments.push({ width: holdPct + "%", color: "var(--amber)", label: "H", value: holdPct })
  }
  if (probSell > 0) {
    segments.push({ width: sellPct + "%", color: "var(--red)", label: "S", value: sellPct })
  }

  return (
    <div className="ml-signals__probability">
      <div className="ml-signals__probability-bar">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="ml-signals__probability-segment"
            style={{ width: seg.width, background: seg.color }}
          />
        ))}
      </div>
      <div className="ml-signals__probability-labels">
        {segments.map((seg, i) => (
          <span
            key={i}
            className="ml-signals__probability-label"
            style={{ color: seg.color }}
          >
            {seg.value}% {seg.label}
          </span>
        ))}
      </div>
    </div>
  )
}
