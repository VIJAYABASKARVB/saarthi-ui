interface ConfidenceBarProps {
  value: number
  color: string
}

export default function ConfidenceBar({ value, color }: ConfidenceBarProps) {
  const pct = Math.min(Math.max(value * 100, 0), 100)

  return (
    <div className="flex items-center gap-3 px-6 py-4 border-t border-[rgba(255,255,255,0.06)]">
      <span className="font-mono text-xs text-[var(--text-mute)] uppercase tracking-wider w-24 shrink-0">
        Confidence
      </span>
      <div className="flex-1 h-3 relative">
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.04)] rounded-none" />
        <div
          className="absolute inset-y-0 left-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ width: `${pct}%`, background: color, opacity: 0.5 }}
        />
        <div
          className="absolute top-0 bottom-0 left-0 w-[2px] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ left: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="font-mono text-sm font-semibold tabular-nums w-12 text-right shrink-0"
        style={{ color }}
      >
        {pct.toFixed(0)}%
      </span>
    </div>
  )
}
