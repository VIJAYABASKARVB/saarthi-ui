import { Badge } from "../../ui/badge"

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
  const badgeVariant = color === "var(--green)" ? "default" : color === "var(--red)" ? "destructive" : "outline"

  return (
    <Badge
      variant={badgeVariant}
      className="rounded-full text-[10px] px-2 py-0 shrink-0 font-normal"
      style={{ background: color === "var(--amber)" ? "transparent" : undefined, borderColor: color, color }}
    >
      {label}
    </Badge>
  )
}
