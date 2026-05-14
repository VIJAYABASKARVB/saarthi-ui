import type { SuccessEnvelope, CompositeData } from "../../types/api"
import CompositeSection from "./composite/CompositeSection"

interface CompositeRendererProps {
  response: SuccessEnvelope<"composite", CompositeData>
}

export default function CompositeRenderer({ response }: CompositeRendererProps) {
  const { data, row_count } = response
  const { sections } = data

  return (
    <div className="card-glass rounded-xl overflow-hidden" style={{ borderTop: "2px solid rgba(124,92,255,0.3)" }}>
      <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.06)] text-xs text-[var(--text-mute)] tracking-wider">
        Composite report &middot; {row_count} section{row_count !== 1 ? "s" : ""}
      </div>

      {sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-xs text-[var(--text-mute)] tracking-wider">
          No sections
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-5">
          {sections.map((s, i) => <CompositeSection key={s.response_type + i} section={s} />)}
        </div>
      )}
    </div>
  )
}
