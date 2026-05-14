interface SentimentDotProps {
  sentiment: string
  score: number
}

function resolveColor(sentiment: string, score: number): string {
  if (score > 0.1) return "var(--green)"
  if (score < -0.1) return "var(--red)"
  if (sentiment === "positive") return "var(--green)"
  if (sentiment === "negative") return "var(--red)"
  return "var(--amber)"
}

function resolveLabel(sentiment: string, score: number): string {
  const color = resolveColor(sentiment, score)
  if (color === "var(--green)") return "POSITIVE"
  if (color === "var(--red)") return "NEGATIVE"
  return "NEUTRAL"
}

export default function SentimentDot({ sentiment, score }: SentimentDotProps) {
  const color = resolveColor(sentiment, score)
  const label = resolveLabel(sentiment, score)
  return (
    <span className="news__sentiment">
      <span className="news__sentiment-dot" style={{ background: color }} />
      <span className="news__sentiment-label" style={{ color }}>{label}</span>
    </span>
  )
}
