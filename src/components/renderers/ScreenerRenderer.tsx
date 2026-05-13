import { useState } from "react"
import type { SuccessEnvelope, ScreenerData } from "../../types/api"
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
    <div className="screener">
      <div className="screener-meta">
        <span className="screener-meta__item">{row_count} rows</span>
        <span className="screener-meta__item">{execution_time_ms}ms</span>
        <button
          className="screener-density-btn"
          onClick={() => setDensity(d => d === "compact" ? "comfortable" : "compact")}
        >
          {density === "compact" ? "COMFORT" : "COMPACT"}
        </button>
      </div>

      {explanation && <div className="screener-explanation">{explanation}</div>}

      <div className="screener-table-wrap">
        <table className="screener-table">
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
