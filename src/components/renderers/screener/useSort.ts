import { useMemo, useState } from "react"
import type { ScreenerColumn, ScreenerRow } from "../../../types/api"

type SortDir = "asc" | "desc"

export function useSort(rows: ScreenerRow[], columns: ScreenerColumn[]) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows

    return [...rows].sort((a, b) => {
      const col = columns.find(c => c.key === sortKey)
      const isNumeric = col && ["number", "percent", "sparkline"].includes(col.type)
      const aVal = a[sortKey as keyof ScreenerRow]
      const bVal = b[sortKey as keyof ScreenerRow]

      let cmp: number
      if (isNumeric) {
        cmp = (Number(aVal) || 0) - (Number(bVal) || 0)
      } else {
        cmp = String(aVal).localeCompare(String(bVal))
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [rows, sortKey, sortDir, columns])

  return { sortKey, sortDir, toggleSort, sortedRows }
}
