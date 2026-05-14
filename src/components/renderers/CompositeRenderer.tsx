import type { SuccessEnvelope, CompositeData } from "../../types/api"
import CompositeSection from "./composite/CompositeSection"

interface CompositeRendererProps {
  response: SuccessEnvelope<"composite", CompositeData>
}

export default function CompositeRenderer({ response }: CompositeRendererProps) {
  const { data, row_count } = response
  const { sections } = data

  return (
    <div className="composite">
      <div className="composite__meta">
        composite report &middot; {row_count} section{row_count !== 1 ? "s" : ""}
      </div>

      {sections.length === 0 ? (
        <div className="composite__empty">NO SECTIONS</div>
      ) : (
        sections.map((s, i) => <CompositeSection key={s.response_type + i} section={s} />)
      )}
    </div>
  )
}
