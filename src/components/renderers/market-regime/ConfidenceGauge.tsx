interface ConfidenceGaugeProps {
  value: number
  color: string
}

export default function ConfidenceGauge({ value, color }: ConfidenceGaugeProps) {
  const pct = Math.min(Math.max(value * 100, 0), 100)

  // Build tick marks around a semicircular gauge
  const ticks: { x1: number; y1: number; x2: number; y2: number; active: boolean }[] = []
  const totalTicks = 40
  const arcStart = -210
  const arcEnd = 30
  const cx = 100
  const cy = 100
  const outerR = 82
  const innerR = 74

  for (let i = 0; i <= totalTicks; i++) {
    const angle = arcStart + (i / totalTicks) * (arcEnd - arcStart)
    const rad = (angle * Math.PI) / 180
    const tickPct = (i / totalTicks) * 100
    ticks.push({
      x1: cx + outerR * Math.cos(rad),
      y1: cy + outerR * Math.sin(rad),
      x2: cx + innerR * Math.cos(rad),
      y2: cy + innerR * Math.sin(rad),
      active: tickPct <= pct,
    })
  }

  // Needle angle
  const needleAngle = arcStart + (pct / 100) * (arcEnd - arcStart)
  const needleRad = (needleAngle * Math.PI) / 180
  const needleLen = 58
  const nx = cx + needleLen * Math.cos(needleRad)
  const ny = cy + needleLen * Math.sin(needleRad)

  return (
    <div className="mr2__gauge-card">
      <div className="mr2__gauge-header">
        <span className="mr2__gauge-header-label">MODEL CONFIDENCE</span>
        <span className="mr2__gauge-header-value" style={{ color }}>{pct.toFixed(0)}%</span>
      </div>
      <div className="mr2__gauge-visual">
        <svg viewBox="0 0 200 130" fill="none" className="mr2__gauge-svg">
          {/* Tick marks */}
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.active ? color : "rgba(255,255,255,0.08)"}
              strokeWidth={i % 5 === 0 ? "2" : "1"}
              strokeLinecap="round"
              opacity={t.active ? 1 : 0.5}
            />
          ))}
          {/* Needle */}
          <line
            x1={cx} y1={cy} x2={nx} y2={ny}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className="mr2__gauge-needle"
          />
          {/* Center dot */}
          <circle cx={cx} cy={cy} r="4" fill={color} />
          <circle cx={cx} cy={cy} r="2" fill="var(--bg)" />
        </svg>
      </div>
      <div className="mr2__gauge-scale">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )
}
