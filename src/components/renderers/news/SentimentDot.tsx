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

export default function SentimentDot({ sentiment, score }: SentimentDotProps) {
  const color = resolveColor(sentiment, score)
  return <span className="news__sentiment-dot" style={{ background: color }} />
}
