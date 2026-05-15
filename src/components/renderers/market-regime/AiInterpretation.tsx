import { Sparkles } from "lucide-react"

interface AiInterpretationProps {
  regimeState: string
  confidence: number
  durationDays: number
}

function interpret(state: string, confidence: number, durationDays: number): string {
  const pct = (confidence * 100).toFixed(0)
  const stateLower = state.toLowerCase()

  if (state === "Risk-on") {
    return `The market has held a ${stateLower} stance for ${durationDays} days with ${pct}% model confidence. Current conditions favor continued bullish positioning. Risk-off rotation remains a low-probability scenario.`
  }
  if (state === "Risk-off") {
    return `Bearish conditions persist at ${pct}% confidence over ${durationDays} days. Capital preservation is the dominant strategy. A shift to risk-on would require a sustained improvement in market structure.`
  }
  if (state === "Choppy") {
    return `Markets remain directionally uncertain at ${pct}% confidence for ${durationDays} days. Neither bullish nor bearish conviction is sufficient for a trend. Range-bound strategies are favored.`
  }
  return `Markets are in a ${stateLower} phase at ${pct}% confidence, active for ${durationDays} days. Regime clarity is low; confirmation of the next dominant state is pending.`
}

export default function AiInterpretation({ regimeState, confidence, durationDays }: AiInterpretationProps) {
  const text = interpret(regimeState, confidence, durationDays)

  return (
    <div className="regime__interpretation">
      <div className="regime__interpretation-header">
        <Sparkles size={14} strokeWidth={1.5} />
        <span>AI Interpretation</span>
      </div>
      <p className="regime__interpretation-text">{text}</p>
    </div>
  )
}
