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
    <div className="text-center px-4 pt-8 pb-4">
      <div className="text-[40px] font-bold tracking-wider mb-4" style={{ color }}>
        {state.toUpperCase()}
      </div>
      <div className="max-w-md mx-auto">
        <ConfidenceBar value={confidence} color={color} />
      </div>
    </div>
  )
}
