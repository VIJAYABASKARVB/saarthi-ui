import { useState } from "react"
import type { SuccessEnvelope, ScreenerData } from "../../types/api"
import { Badge } from "../ui/badge"
import { useSort } from "./screener/useSort"
import ScreenerHeader from "./screener/ScreenerHeader"
import ScreenerRowComponent from "./screener/ScreenerRow"

interface ScreenerRendererProps {
  response: SuccessEnvelope<"screener", ScreenerData>
}

type Density = "comfortable" | "compact"

export default function ScreenerRenderer({ response }: ScreenerRendererProps) {
  const { data, execution_time_ms, row_count, explanation } = response
  const visibleColumns = data.columns.filter(c => c.is_default !== false)
  const { sortKey, sortDir, toggleSort, sortedRows } = useSort(data.rows, data.columns)
  const [density, setDensity] = useState<Density>("compact")

  return (
    <div className="card-glass rounded-xl overflow-hidden" style={{ borderTop: "2px solid rgba(124,92,255,0.3)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-mute)]">{row_count} results</span>
          <span className="text-xs text-[var(--text-mute)]">{execution_time_ms}ms</span>
        </div>
        <Badge
          variant="outline"
          className="text-[11px] px-2.5 py-0.5 rounded-full cursor-pointer select-none hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          onClick={() => setDensity(d => d === "compact" ? "comfortable" : "compact")}
        >
          {density === "compact" ? "Dense" : "Comfortable"}
        </Badge>
      </div>

      {explanation && (
        <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.06)] text-sm text-[var(--text-dim)] leading-relaxed">
          {explanation}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="screener-table w-full border-collapse">
          <ScreenerHeader
            columns={visibleColumns}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={toggleSort}
          />
          <tbody>
            {sortedRows.map(row => (
              <ScreenerRowComponent
                key={row.slug}
                row={row}
                columns={visibleColumns}
                density={density}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
