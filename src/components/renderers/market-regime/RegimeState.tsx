import ConfidenceBar from "./ConfidenceBar"

interface RegimeStateProps {
  state: string
  confidence: number
}

const STATE_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--text)",
}

export default function RegimeState({ state, confidence }: RegimeStateProps) {
  const color = STATE_COLORS[state] ?? "var(--text)"

  return (
    <div className="regime__hero">
      <div className="regime__hero-orb regime__hero-orb--active" style={{ "--orb-color": color } as React.CSSProperties} />
      <div className="regime__hero-text" style={{ color }}>
        {state.toUpperCase()}
      </div>
      <div className="regime__confidence">
        <ConfidenceBar value={confidence} color={color} />
      </div>
    </div>
  )
}
