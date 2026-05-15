import type { CSSProperties } from "react"

interface ConfidenceGaugeProps {
  value: number
  color: string
  label?: string
}

export default function ConfidenceGauge({ value, color, label = "Model Confidence" }: ConfidenceGaugeProps) {
  const pct = Math.min(Math.max(value * 100, 0), 100)
  const radius = 56
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct / 100)
  const viewSize = (radius + 12) * 2

  const fillStyle: CSSProperties = {
    strokeDasharray: `${circumference}`,
    strokeDashoffset: offset,
    transition: "stroke-dashoffset 0.8s cubic-bezier(0.32, 0.72, 0, 1)",
  }

  return (
    <div className="regime__gauge">
      <svg width="100%" height="100%" viewBox={`0 0 ${viewSize} ${viewSize}`} fill="none">
        <defs>
          <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx={viewSize / 2}
          cy={viewSize / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={viewSize / 2}
          cy={viewSize / 2}
          r={radius}
          stroke="url(#gauge-gradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${viewSize / 2} ${viewSize / 2})`}
          style={fillStyle}
        />
      </svg>
      <div className="regime__gauge-center">
        <span className="regime__gauge-value" style={{ color }}>{pct.toFixed(0)}%</span>
        <span className="regime__gauge-label">{label}</span>
      </div>
    </div>
  )
}
