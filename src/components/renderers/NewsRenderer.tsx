import type { SuccessEnvelope, NewsData } from "../../types/api"
import ArticleCard from "./news/ArticleCard"

interface NewsRendererProps {
  response: SuccessEnvelope<"news", NewsData>
}

export default function NewsRenderer({ response }: NewsRendererProps) {
  const { data, row_count } = response
  const { articles } = data

  return (
    <div className="card-glass rounded-xl overflow-hidden" style={{ borderTop: "2px solid rgba(124,92,255,0.3)" }}>
      <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.06)] text-xs text-[var(--text-mute)] tracking-wider">
        News feed &middot; {row_count} article{row_count !== 1 ? "s" : ""}
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-xs text-[var(--text-mute)] tracking-wider">
          No articles
        </div>
      ) : (
        articles.map(a => <ArticleCard key={a.id} article={a} />)
      )}
    </div>
  )
}
