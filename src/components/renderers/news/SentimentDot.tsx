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
  if (color === "var(--green)") return "Positive"
  if (color === "var(--red)") return "Negative"
  return "Neutral"
}

export default function SentimentDot({ sentiment, score }: SentimentDotProps) {
  const color = resolveColor(sentiment, score)
  const label = resolveLabel(sentiment, score)

  return (
    <div className="news__sentiment">
      <span
        className="news__sentiment-dot"
        style={{ background: color }}
        aria-hidden="true"
      />
      <span className="news__sentiment-label" style={{ color }}>{label}</span>
    </div>
  )
}
