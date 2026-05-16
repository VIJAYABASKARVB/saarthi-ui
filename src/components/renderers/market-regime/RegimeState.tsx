interface RegimeStateProps {
  state: string
  durationDays: number
  confidence: number
}

const STATE_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--accent)",
}

const STATE_ICONS: Record<string, string> = {
  "Risk-on": "▲",
  "Risk-off": "▼",
  Choppy: "◆",
  Transition: "◈",
}

const STATE_SUBTITLES: Record<string, string> = {
  "Risk-on": "Bullish conditions detected across major indicators",
  "Risk-off": "Defensive positioning recommended",
  Choppy: "No clear directional bias — range-bound",
  Transition: "Regime shift in progress — awaiting confirmation",
}

export default function RegimeState({ state, durationDays, confidence }: RegimeStateProps) {
  const color = STATE_COLORS[state] ?? "var(--text)"
  const icon = STATE_ICONS[state] ?? "●"
  const subtitle = STATE_SUBTITLES[state] ?? ""
  const pct = Math.round(confidence * 100)

  // Pulse ring SVG params
  const ringRadius = 62
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference * (1 - confidence)

  return (
    <div className="mr2__hero">
      {/* Ambient glow behind the ring */}
      <div className="mr2__hero-glow" style={{ background: color }} />

      {/* Central pulse ring */}
      <div className="mr2__hero-ring-wrap">
        <svg className="mr2__hero-ring-svg" viewBox="0 0 160 160" fill="none">
          {/* Track */}
          <circle cx="80" cy="80" r={ringRadius} stroke="rgba(255,255,255,0.04)" strokeWidth="4" fill="none" />
          {/* Confidence arc */}
          <circle
            cx="80" cy="80" r={ringRadius}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${ringCircumference}`}
            strokeDashoffset={ringOffset}
            transform="rotate(-90 80 80)"
            className="mr2__hero-ring-arc"
          />
          {/* Outer pulse ring */}
          <circle cx="80" cy="80" r="76" stroke={color} strokeWidth="0.5" fill="none" opacity="0.15" className="mr2__hero-pulse" />
        </svg>

        {/* Center content inside ring */}
        <div className="mr2__hero-ring-center">
          <span className="mr2__hero-icon" style={{ color }}>{icon}</span>
          <span className="mr2__hero-pct" style={{ color }}>{pct}%</span>
          <span className="mr2__hero-conf-label">confidence</span>
        </div>
      </div>

      {/* State name + metadata */}
      <div className="mr2__hero-info">
        <h2 className="mr2__hero-state" style={{ color }}>{state.toUpperCase()}</h2>
        <p className="mr2__hero-subtitle">{subtitle}</p>
        <div className="mr2__hero-chips">
          <span className="mr2__hero-chip" style={{ borderColor: color, color }}>
            <span className="mr2__hero-chip-dot" style={{ background: color }} />
            ACTIVE
          </span>
          <span className="mr2__hero-chip mr2__hero-chip--dim">
            {durationDays}D STREAK
          </span>
        </div>
      </div>
    </div>
  )
}
