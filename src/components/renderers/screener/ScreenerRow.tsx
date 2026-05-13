import type { ScreenerColumn, ScreenerRow } from "../../../types/api"
import ColumnRenderer from "./ColumnRenderer"

interface ScreenerRowProps {
  row: ScreenerRow
  columns: ScreenerColumn[]
  density: "comfortable" | "compact"
}

export default function ScreenerRowComponent({ row, columns, density }: ScreenerRowProps) {
  return (
    <tr className="screener-row">
      {columns.map(col => (
        <td key={col.key} className="screener-data-cell">
          <ColumnRenderer column={col} row={row} density={density} />
        </td>
      ))}
    </tr>
  )
}
