interface RegimeStateProps {
  state: string
  durationDays: number
}

const STATE_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--accent)",
}

const STATE_SUBTITLES: Record<string, string> = {
  "Risk-on": "Markets favor aggressive positioning",
  "Risk-off": "Capital preservation is the dominant stance",
  Choppy: "Directional conviction is low",
  Transition: "Regime clarity is pending",
}

export default function RegimeState({ state, durationDays }: RegimeStateProps) {
  const color = STATE_COLORS[state] ?? "var(--text)"
  const subtitle = STATE_SUBTITLES[state] ?? ""

  return (
    <div className="regime__hero">
      <div className="regime__hero-orb" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, opacity: 0.1 }} />
      <div className="regime__hero-content">
        <div className="regime__hero-text" style={{ color }}>
          {state.toUpperCase()}
        </div>
        <p className="regime__hero-subtitle">{subtitle}</p>
        <div className="regime__hero-meta">
          <span className="regime__hero-badge" style={{ borderColor: color, color }}>
            {"\u25CF"} {state}
          </span>
          <span className="regime__hero-duration">{durationDays} days active</span>
        </div>
      </div>
    </div>
  )
}
