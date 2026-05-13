import { useState } from "react"
import type { NewsArticle } from "../../../types/api"
import SentimentDot from "./SentimentDot"
import RelativeTime from "./RelativeTime"
import RelatedCoinTags from "./RelatedCoinTags"

interface ArticleCardProps {
  article: NewsArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { headline, source, published_at, sentiment, sentiment_score, related_coins, summary } = article

  return (
    <div className="news__card">
      <div className="news__card-top">
        <button
          className="news__headline"
          onClick={() => setExpanded(prev => !prev)}
          aria-expanded={expanded}
          title={headline}
        >
          {headline}
        </button>
        <SentimentDot sentiment={sentiment} score={sentiment_score} />
      </div>
      <div className="news__card-bottom">
        <span className="news__source-age">
          {source}<span className="news__separator">&middot;</span><RelativeTime iso={published_at} />
        </span>
        <RelatedCoinTags coins={related_coins} />
      </div>
      {expanded && <div className="news__summary">{summary}</div>}
    </div>
  )
}
