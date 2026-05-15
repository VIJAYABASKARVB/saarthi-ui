import type { SuccessEnvelope, CompositeData } from "../../types/api"
import CompositeSection from "./composite/CompositeSection"

interface CompositeRendererProps {
  response: SuccessEnvelope<"composite", CompositeData>
}

export default function CompositeRenderer({ response }: CompositeRendererProps) {
  const { data, row_count } = response
  const { sections } = data

  return (
    <div className="bezel-shell animate-fade-up stagger-1">
      <div className="bezel-core">
        <div className="composite__meta">
          Composite report &middot; {row_count} section{row_count !== 1 ? "s" : ""}
        </div>

        {sections.length === 0 ? (
          <div className="composite__empty">No sections available</div>
        ) : (
          <div className="flex flex-col">
            {sections.map((s, i) => (
              <div key={s.response_type + i} className={`animate-fade-up stagger-${Math.min(i + 2, 6)}`}>
                <CompositeSection section={s} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
