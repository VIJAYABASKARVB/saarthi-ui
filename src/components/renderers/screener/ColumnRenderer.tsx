import type { ScreenerColumn, ScreenerRow } from "../../../types/api"
import { formatCompact } from "./formatCompact"
import SparklineCell from "./SparklineCell"

interface ColumnRendererProps {
  column: ScreenerColumn
  row: ScreenerRow
  density: "comfortable" | "compact"
}

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatPercent(n: number): { text: string; color: string } {
  if (n > 0) return { text: "+" + n.toFixed(2) + "%", color: "var(--green)" }
  if (n < 0) return { text: n.toFixed(2) + "%", color: "var(--red)" }
  return { text: "0.00%", color: "var(--text-dim)" }
}

function normalizeType(col: ScreenerColumn): string {
  const type = col.type
  if (type === "string") return "text"
  if (type === "number") {
    if (col.key === "market_cap") return "currency_compact"
    return "currency"
  }
  return type
}

export default function ColumnRenderer({ column, row, density }: ColumnRendererProps) {
  const value = row[column.key as keyof ScreenerRow]
  const type = normalizeType(column)
  const className = "screener-cell screener-cell--" + density

  switch (type) {
    case "text":
      return <span className={className}>{String(value ?? "")}</span>

    case "currency":
      return <span className={className + " screener-cell--right"}>{formatCurrency(Number(value) || 0)}</span>

    case "currency_compact":
      return <span className={className + " screener-cell--right"}>{formatCompact(Number(value) || 0)}</span>

    case "percent": {
      const { text, color } = formatPercent(Number(value) || 0)
      return <span className={className + " screener-cell--right"} style={{ color }}>{text}</span>
    }

    case "sparkline":
      return <SparklineCell data={value as number[]} />

    case "image":
      return value
        ? <img src={value as string} alt="" className="screener-logo" width={18} height={18} />
        : <span className="screener-cell--dim">&mdash;</span>

    default:
      return <span className={className}>{String(value ?? "")}</span>
  }
}
