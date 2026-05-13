import type { ScreenerColumn } from "../../../types/api"

interface ScreenerHeaderProps {
  columns: ScreenerColumn[]
  sortKey: string | null
  sortDir: "asc" | "desc"
  onSort: (key: string) => void
}

export default function ScreenerHeader({ columns, sortKey, sortDir, onSort }: ScreenerHeaderProps) {
  return (
    <thead>
      <tr className="screener-header-row">
        {columns.map(col => {
          const isActive = sortKey === col.key
          const arrow = isActive ? (sortDir === "asc" ? " \u25B2" : " \u25BC") : ""
          return (
            <th key={col.key} className="screener-header-cell">
              <button
                className={"screener-sort-btn" + (isActive ? " screener-sort-btn--active" : "")}
                onClick={() => onSort(col.key)}
              >
                {col.label}{arrow}
              </button>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
