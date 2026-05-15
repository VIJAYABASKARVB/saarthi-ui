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

function formatPercentText(n: number): string {
  if (n > 0) return "+" + n.toFixed(2) + "%"
  if (n < 0) return n.toFixed(2) + "%"
  return "0.00%"
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
  const cellCls = "flex items-center leading-tight " + (density === "compact" ? "h-12" : "h-14")

  switch (type) {
    case "text": {
      if (column.key === "slug" || column.key === "name") {
        const slugVal = String(row.slug ?? "")
        const nameVal = String(row.name ?? "")
        const symbolVal = String(row.symbol ?? "")
        const displayName = column.key === "slug" ? slugVal : nameVal
        return (
          <div className={cellCls}>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--text)]">{displayName}</span>
              <span className="text-[11px] text-[var(--text-mute)]">{symbolVal}</span>
            </div>
          </div>
        )
      }
      return (
        <div className={cellCls}>
          <span className="text-sm text-[var(--text)]">{String(value ?? "")}</span>
        </div>
      )
    }

    case "currency":
      return (
        <div className={cellCls + " justify-end"}>
          <span className="text-sm font-mono text-[var(--text)]">{formatCurrency(Number(value) || 0)}</span>
        </div>
      )

    case "currency_compact":
      return (
        <div className={cellCls + " justify-end"}>
          <span className="text-sm font-mono text-[var(--text-dim)]">{formatCompact(Number(value) || 0)}</span>
        </div>
      )

    case "percent": {
      const text = formatPercentText(Number(value) || 0)
      const isPos = (Number(value) || 0) > 0
      const isNeg = (Number(value) || 0) < 0
      return (
        <div className={cellCls}>
          <span
            className={
              "inline-flex items-center rounded-full text-xs font-mono font-medium px-2.5 py-0.5 border " +
              (isPos
                ? "bg-[rgba(0,212,168,0.1)] text-[var(--green)] border-[rgba(0,212,168,0.25)]"
                : isNeg
                ? "bg-[rgba(255,107,107,0.1)] text-[var(--red)] border-[rgba(255,107,107,0.25)]"
                : "text-[var(--text-dim)] border-[var(--border)]")
            }
          >
            {text}
          </span>
        </div>
      )
    }

    case "sparkline":
      return (
        <div className={cellCls}>
          <SparklineCell data={value as number[]} />
        </div>
      )

    case "image":
      return (
        <div className={cellCls}>
          {value
            ? <img src={value as string} alt="" className="inline-block rounded-full" width={18} height={18} />
            : <span className="text-[var(--text-dim)]">&mdash;</span>
          }
        </div>
      )

    default:
      return (
        <div className={cellCls}>
          <span className="text-sm text-[var(--text)]">{String(value ?? "")}</span>
        </div>
      )
  }
}
