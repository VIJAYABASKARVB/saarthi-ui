interface ProbabilityBarProps {
  probBuy: number
  probHold: number
  probSell: number
}

const SEGMENTS = [
  { key: "buy" as const, field: "probBuy" as const, color: "var(--green)", label: "B" },
  { key: "hold" as const, field: "probHold" as const, color: "var(--amber)", label: "H" },
  { key: "sell" as const, field: "probSell" as const, color: "var(--red)", label: "S" },
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
    <div className="px-4">
      <div className="flex h-2 rounded-full overflow-hidden gap-px">
        {visible.map((seg, i) => (
          <div key={i} className="h-full rounded-sm" style={{ width: seg.width, background: seg.color }} />
        ))}
      </div>
      <div className="flex gap-3 mt-1">
        {visible.map((seg, i) => (
          <span key={i} className="text-[10px] font-mono" style={{ color: seg.color }}>
            {seg.value}% {seg.label}
          </span>
        ))}
      </div>
    </div>
  )
}
