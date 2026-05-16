import { STATE_COLORS, STATE_ARROWS } from "../../../lib/regime"
import ConfidenceRing from "./ConfidenceRing"

interface RegimeStateProps {
  state: string
  durationDays: number
  confidence: number
}

export default function RegimeState({ state, durationDays, confidence }: RegimeStateProps) {
  const arrow = STATE_ARROWS[state] ?? "\u25CF"
  const color = STATE_COLORS[state] ?? "var(--accent)"

  return (
    <div
      className="relative flex items-center gap-8 px-6 py-8 overflow-hidden"
      aria-label={"Market regime: " + state}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 30% 50%, " + color + "15 0%, " + color + "05 50%, transparent 75%)",
        }}
      />
      <div className="flex flex-col gap-1 z-10">
        <span
          className="font-mono leading-none tracking-tight"
          style={{ fontSize: 48, color, lineHeight: 1 }}
          aria-hidden="true"
        >
          {arrow}
        </span>
        <h2
          className="font-sans font-bold leading-none tracking-tighter text-5xl md:text-[72px]"
          style={{ color, lineHeight: 1 }}
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
      <div className="z-10 ml-auto">
        <ConfidenceRing value={confidence} color={color} />
      </div>
    </div>
  )
}
