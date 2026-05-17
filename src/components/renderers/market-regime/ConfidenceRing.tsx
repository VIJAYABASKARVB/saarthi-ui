import { useId } from "react"

interface ConfidenceRingProps {
  value: number
  color: string
}

export default function ConfidenceRing({ value, color }: ConfidenceRingProps) {
  const pct = Math.min(Math.max(value * 100, 0), 100)
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  const glowId = useId()

  return (
    <div
      className="confidence-glow-pulse relative inline-flex items-center justify-center"
      style={{ "--ring-glow-color": color } as React.CSSProperties}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={"Confidence " + Math.round(pct) + "%"}
    >
      <svg width="110" height="110" viewBox="0 0 110 110" aria-hidden="true">
        <defs>
          <filter id={glowId}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feFlood floodColor={color} floodOpacity="0.3" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--track-bg)" strokeWidth="7" />
        <circle
          cx="55" cy="55" r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 55 55)"
          filter={"url(#" + glowId + ")"}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.32, 0.72, 0, 1)" }}
        />
      </svg>
      <span
        className="absolute font-mono text-2xl font-bold tabular-nums"
        style={{ color }}
      >
        {Math.round(pct)}%
      </span>
      <span
        className="absolute font-mono text-[9px] uppercase tracking-widest"
        style={{ color: "var(--text-mute)", bottom: -12 }}
      >
        Confidence
      </span>
    </div>
  )
}
