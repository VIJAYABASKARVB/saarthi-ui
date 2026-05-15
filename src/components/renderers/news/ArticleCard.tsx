import { useState, useRef, useEffect } from "react"
import type { NewsArticle } from "../../../types/api"
import SentimentDot from "./SentimentDot"
import RelativeTime from "./RelativeTime"
import RelatedCoinTags from "./RelatedCoinTags"

interface ArticleCardProps {
  article: NewsArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const { headline, source, published_at, sentiment, sentiment_score, related_coins, summary } = article

  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.style.maxHeight = expanded ? `${summaryRef.current.scrollHeight}px` : "0px"
    }
  }, [expanded])

  return (
    <div
      className="news__card"
      onClick={() => setExpanded(prev => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(prev => !prev) } }}
      aria-expanded={expanded}
    >
      <div className="news__card-top">
        <button
          className="news__headline"
          onClick={e => e.stopPropagation()}
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
      <div
        ref={summaryRef}
        className="news__summary-wrapper"
        style={{ maxHeight: 0, overflow: "hidden", transition: "max-height 0.4s var(--ease-spring)" }}
      >
        <div className="news__summary">{summary}</div>
      </div>
    </div>
  )
}
