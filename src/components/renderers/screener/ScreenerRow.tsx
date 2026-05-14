import type { ScreenerColumn, ScreenerRow } from "../../../types/api"
import ColumnRenderer from "./ColumnRenderer"

interface ScreenerRowProps {
  row: ScreenerRow
  columns: ScreenerColumn[]
  density: "comfortable" | "compact"
}

export default function ScreenerRowComponent({ row, columns, density }: ScreenerRowProps) {
  return (
    <tr className="screener-row border-b border-[rgba(255,255,255,0.06)] last:border-b-0">
      {columns.map((col, i) => (
        <td
          key={col.key}
          className={"whitespace-nowrap " + (i === 0 ? "screener-cell-sticky pl-5" : "px-4")}
          style={{ height: density === "compact" ? 48 : 56 }}
        >
          <ColumnRenderer column={col} row={row} density={density} />
        </td>
      ))}
    </tr>
  )
}
