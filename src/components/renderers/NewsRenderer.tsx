import type { SuccessEnvelope, NewsData } from "../../types/api"
import ArticleCard from "./news/ArticleCard"

interface NewsRendererProps {
  response: SuccessEnvelope<"news", NewsData>
}

export default function NewsRenderer({ response }: NewsRendererProps) {
  const { data, row_count } = response
  const { articles } = data

  return (
    <div className="news">
      <div className="news__meta">
        news feed &middot; {row_count} article{row_count !== 1 ? "s" : ""}
      </div>

      {articles.length === 0 ? (
        <div className="news__empty">NO ARTICLES</div>
      ) : (
        articles.map(a => <ArticleCard key={a.id} article={a} />)
      )}
    </div>
  )
}
