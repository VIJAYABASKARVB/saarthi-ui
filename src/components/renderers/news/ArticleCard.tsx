import { useState } from "react"
import type { NewsArticle } from "../../../types/api"
import { Badge } from "../../ui/badge"
import SentimentDot from "./SentimentDot"
import RelativeTime from "./RelativeTime"

interface ArticleCardProps {
  article: NewsArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { headline, source, published_at, sentiment, sentiment_score, related_coins, summary } = article

  return (
    <div
      className="px-5 py-3 border-b border-[rgba(255,255,255,0.06)] last:border-b-0 transition-all duration-150 hover:shadow-[inset_2px_0_0_var(--accent)] hover:bg-[rgba(124,92,255,0.04)] cursor-pointer"
      onClick={() => setExpanded(prev => !prev)}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <button
          className="flex-1 text-left bg-transparent border-none p-0 text-sm font-medium text-[var(--text)] leading-normal cursor-pointer truncate"
          onClick={e => e.stopPropagation()}
          aria-expanded={expanded}
          title={headline}
        >
          {headline}
        </button>
        <SentimentDot sentiment={sentiment} score={sentiment_score} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-mute)]">
          {source}<span className="mx-1">&middot;</span><RelativeTime iso={published_at} />
        </span>
        {related_coins.length > 0 && (
          <div className="flex gap-1">
            {related_coins.slice(0, 3).map(coin => (
              <Badge key={coin} variant="outline" className="text-[10px] px-1.5 py-0 rounded-full text-[var(--text-mute)]">
                {coin}
              </Badge>
            ))}
          </div>
        )}
      </div>
      {expanded && (
        <div className="mt-2 text-xs text-[var(--text-dim)] leading-relaxed line-clamp-3">
          {summary}
        </div>
      )}
    </div>
  )
}
