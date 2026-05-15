import { ChevronUp, ChevronDown } from "lucide-react"
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
      <tr className="border-b border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-sm">
        {columns.map((col, i) => {
          const isActive = sortKey === col.key
          return (
            <th
              key={col.key}
              className={"p-0 text-left pb-0 " + (i === 0 ? "screener-cell-sticky pl-5" : "px-4")}
            >
              <button
                className={
                  "flex items-center gap-1 py-3 text-[11px] font-semibold tracking-[0.08em] uppercase cursor-pointer transition-colors " +
                  (isActive ? "text-[var(--accent)]" : "text-[var(--text-mute)] hover:text-[var(--text-dim)]")
                }
                onClick={() => onSort(col.key)}
              >
                {col.label}
                {isActive && (
                  sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                )}
              </button>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
