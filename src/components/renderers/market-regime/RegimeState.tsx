interface RegimeStateProps {
  state: string
  durationDays: number
}

const STATE_ARROWS: Record<string, string> = {
  "Risk-on": "▲",
  "Risk-off": "▼",
  Choppy: "◆",
  Transition: "◈",
}

const STATE_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--accent)",
}

export default function RegimeState({ state, durationDays }: RegimeStateProps) {
  const arrow = STATE_ARROWS[state] ?? "●"
  const color = STATE_COLORS[state] ?? "var(--text)"

  return (
    <div className="flex flex-col gap-2 pt-8 pb-6 px-6">
      <span
        className="font-mono leading-none tracking-tight"
        style={{ fontSize: 48, color, lineHeight: 1 }}
      >
        {arrow}
      </span>
      <h2
        className="font-sans font-bold leading-none tracking-tighter"
        style={{ fontSize: 72, color, lineHeight: 1 }}
      >
        {state.toUpperCase()}
      </h2>
      <span
        className="font-mono text-xs tracking-wider mt-2"
        style={{ color: "var(--text-mute)" }}
      >
        DUR {durationDays}D
      </span>
    </div>
  )
}
