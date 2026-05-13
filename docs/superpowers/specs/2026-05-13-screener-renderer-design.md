# Screener Renderer Design

## Overview

The Screener renderer displays tabular crypto data (prices, changes, market cap, sparklines) in a Bloomberg-terminal aesthetic. It is one of six response type renderers in the Saarthi AI output canvas.

## Component tree

```
ScreenerRenderer
 +-- ScreenerToolbar          (density toggle, row count badge)
 +-- ScreenerTable            (<table> element)
 |   +-- ScreenerHeader        (<thead>, sortable column labels)
 |   +-- ScreenerRow*          (<tbody> rows)
 |       +-- CoinCell           (logo + name/symbol)
 |       +-- PriceCell          (formatted currency)
 |       +-- PercentCell        (colored percent change)
 |       +-- MarketCapCell      (compact format)
 |       +-- SparklineCell      (inline recharts sparkline)
 +-- ScreenerExplanation      (from envelope's explanation field)
```

All cells render via a ColumnRenderer switch on column type.

## Data flow

```
OutputCanvas -> ScreenerRenderer (receives ScreenerData)
                   |
             useState sortKey, sortDir
                   |
             derive sortedRows = sort(rows, sortKey, sortDir)
                   |
             render <ScreenerTable columns={columns} rows={sortedRows} />
```

Sort state lives in ScreenerRenderer. Sorting is client-side over the fetched row set. No re-fetch on sort change.

## Sorting

- useState<{ key: string; dir: 'asc' | 'desc' } | null>(null)
- Click active column header: cycle null -> asc -> desc -> null
- Click different column header: set { key, dir: 'asc' }
- Active column header renders arrow indicator in var(--green)
- Sort comparator is type-aware: numeric columns compare numbers, string columns use localeCompare

## Column type rendering

| type | Format | Example |
|---|---|---|
| text | Plain string | "Bitcoin" |
| currency | locale-formatted | $94,210.55 |
| currency_compact | abbreviated | $1.85T, $420.5B, $1.2M, < $1M |
| percent | signed + colored | +3.42% (green), -1.20% (red) |
| sparkline | inline recharts | 80x24 sparkline |
| image | 18x18 img | coin logo |

### Percent cell colors

- Positive: var(--green)
- Negative: var(--red)
- Zero: var(--text-dim)

### Market cap compact helper

```
formatCompact(n):
   n >= 1e12 -> $1.85T (2 decimals)
   n >= 1e9  -> $420.5B (1 decimal)
   n >= 1e6  -> $1.2M (1 decimal)
   n < 1e6   -> < $1M
   n === 0   -> < $1M
```

### Sparkline

- recharts LineChart, ResponsiveContainer width=80 height=24
- <Line> with dot=false, strokeWidth=1.5
- stroke=green if last >= first, red otherwise
- No axes, no grid, no tooltip
- Missing/empty spark_7d renders "--"

## Bloomberg terminal table styling

- HTML <table> with <thead> + <tbody>
- Row height ~32px, font-size 12px
- Header: uppercase, dim text, 11px, letter-spacing, bottom border
- Row bottom border: 1px solid var(--border)
- Hover: rgba(255,255,255,0.03)
- No alternating colors
- Numeric columns right-aligned, text left-aligned
- Wrapped in overflow-x: auto for mobile

## States

- Loading -> existing LoadingState
- Empty rows -> existing EmptyState
- Error -> existing ExecutionError / AgentRejected
- Missing sparkline -> "--"
- Missing price/mcap -> "--"

## Edge cases

- Long names: text-overflow ellipsis, max-width 160px
- Tiny percents: 0.00% in dim
- Market cap 0: < $1M
- Non-default columns: hidden
- Mobile: horizontal scroll
- Keyboard: native <th>/<td> + <button> headers

## Files to create

- src/components/renderers/ScreenerRenderer.tsx
- src/components/renderers/screener/ScreenerTable.tsx
- src/components/renderers/screener/ScreenerHeader.tsx
- src/components/renderers/screener/ScreenerRow.tsx
- src/components/renderers/screener/ColumnRenderer.tsx
- src/components/renderers/screener/SparklineCell.tsx
- src/components/renderers/screener/formatCompact.ts
- src/components/renderers/screener/useSort.ts

CSS in src/index.css under .screener-* namespace.

## Dependencies

- recharts (needs npm install)

## Non-goals (v2)

- Column visibility toggle
- Resizable columns
- Row virtualization
- Server-side sorting
- CSV export
