# Screener Renderer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Screener renderer — a Bloomberg-terminal styled table for crypto screener data.

**Architecture:** Single `ScreenerRenderer` component delegates to `ScreenerTable` → `ScreenerHeader` + `ScreenerRow` → `ColumnRenderer` (type switch). Sort state via `useSort` hook, formatting via `formatCompact`. No UI library — pure CSS with project design tokens.

**Tech Stack:** React 19, TypeScript, Vite, recharts, plain CSS with CSS custom properties.

---

### Task 1: Install recharts

**Files:**
- Modify: `package.json` (dependencies)

- [ ] **Install recharts**

Run:
```bash
npm install recharts
```
Expected: `recharts` appears in `package.json` dependencies, no errors.

---

### Task 2: Create directory and formatCompact utility

**Files:**
- Create: `src/components/renderers/screener/formatCompact.ts`

- [ ] **Write formatCompact**

Content:
```ts
export function formatCompact(n: number): string {
  if (n === 0) return "< $1M"
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T"
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B"
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M"
  return "< $1M"
}
```

- [ ] **Verify import works** — no TypeScript errors when another file imports it.

---

### Task 3: Create useSort hook

**Files:**
- Create: `src/components/renderers/screener/useSort.ts`

- [ ] **Write useSort**

Content:
```ts
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
      const aVal = (a as any)[sortKey]
      const bVal = (b as any)[sortKey]

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
```

- [ ] **Verify** — TypeScript compiles without errors.

---

### Task 4: Create SparklineCell

**Files:**
- Create: `src/components/renderers/screener/SparklineCell.tsx`

- [ ] **Write SparklineCell**

Content:
```tsx
import { LineChart, Line, ResponsiveContainer } from "recharts"

interface SparklineCellProps {
  data: number[]
}

export default function SparklineCell({ data }: SparklineCellProps) {
  if (!data || data.length < 2) {
    return <span className="screener-cell--dim">&mdash;</span>
  }

  const points = data.map((v, i) => ({ i, v }))
  const first = data[0]
  const last = data[data.length - 1]
  const color = last >= first ? "var(--green)" : "var(--red)"

  return (
    <div className="screener-sparkline">
      <ResponsiveContainer width={80} height={24}>
        <LineChart data={points}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

- [ ] **Verify** — recharts import resolves without errors.

---

### Task 5: Create ColumnRenderer

**Files:**
- Create: `src/components/renderers/screener/ColumnRenderer.tsx`

- [ ] **Write ColumnRenderer**

Content:
```tsx
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
  const value = (row as any)[column.key]
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
```

---

### Task 6: Create ScreenerHeader

**Files:**
- Create: `src/components/renderers/screener/ScreenerHeader.tsx`

- [ ] **Write ScreenerHeader**

```tsx
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
```

---

### Task 7: Create ScreenerRow

**Files:**
- Create: `src/components/renderers/screener/ScreenerRow.tsx`

- [ ] **Write ScreenerRow**

```tsx
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
```

---

### Task 8: Create ScreenerRenderer (main component)

**Files:**
- Create: `src/components/renderers/ScreenerRenderer.tsx`

- [ ] **Write ScreenerRenderer**

```tsx
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
```

---

### Task 9: Wire ScreenerRenderer into OutputCanvas

**Files:**
- Modify: `src/components/OutputCanvas.tsx`

- [ ] **Add import** for ScreenerRenderer

- [ ] **Replace SuccessState function** to route screener to ScreenerRenderer

---

### Task 10: Add CSS to index.css

**Files:**
- Modify: `src/index.css`

- [ ] **Append screener CSS classes** (all .screener-* classes from the plan)

---

### Task 11: Run dev server and verify

- [ ] `npm run dev` — verify no console errors
- [ ] Type `screener` in input — verify table renders
- [ ] Click column headers — verify sort toggles
- [ ] Click density toggle — verify comfortable/compact switch
- [ ] Check sparklines render with green/red lines
- [ ] Check percent values are green/red colored
- [ ] Check market cap shows as compact format
