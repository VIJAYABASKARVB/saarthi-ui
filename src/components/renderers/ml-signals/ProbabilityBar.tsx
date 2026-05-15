interface ProbabilityBarProps {
  probBuy: number
  probHold: number
  probSell: number
}

const SEGMENTS = [
  { field: "probBuy" as const, color: "var(--green)", label: "B" },
  { field: "probHold" as const, color: "var(--amber)", label: "H" },
  { field: "probSell" as const, color: "var(--red)", label: "S" },
]

export default function ProbabilityBar({ probBuy, probHold, probSell }: ProbabilityBarProps) {
  const values = { probBuy, probHold, probSell }

  const visible = SEGMENTS.filter(s => values[s.field] > 0).map(s => ({
    width: (values[s.field] * 100).toFixed(0) + "%",
    color: s.color,
    label: s.label,
    value: (values[s.field] * 100).toFixed(0),
  }))

  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-[var(--text-mute)] mb-2">Probability Distribution</div>
      <div className="flex h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        {visible.map((seg, i) => (
          <div key={i} className="h-full transition-all" style={{ width: seg.width, background: seg.color, transitionTimingFunction: "var(--ease-spring)" }} />
        ))}
      </div>
      <div className="flex gap-3 mt-1.5">
        {visible.map((seg, i) => (
          <span key={i} className="text-[11px] font-mono text-[var(--text-dim)]">
            {seg.value}% {seg.label}
          </span>
        ))}
      </div>
    </div>
  )
}
