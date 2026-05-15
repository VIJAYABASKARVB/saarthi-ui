import { useState, useMemo, useCallback } from "react"
import type { SuccessEnvelope, ScreenerData, ScreenerColumn } from "../../types/api"
import { useSort } from "./screener/useSort"
import SparklineCell from "./screener/SparklineCell"
import { formatCompact } from "./screener/formatCompact"

interface ScreenerRendererProps {
  response: SuccessEnvelope<"screener", ScreenerData>
}

const ROWS_PER_PAGE = 10

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatPercentText(n: number): string {
  if (n > 0) return "+" + n.toFixed(2) + "%"
  if (n < 0) return n.toFixed(2) + "%"
  return "0.00%"
}

/** Columns to display — maps data keys to human-readable headers matching the reference image */
const ALIGN_TO_JUSTIFY: Record<string, string> = {
  left: "flex-start",
  right: "flex-end",
  center: "center",
}

const DISPLAY_COLUMNS: { key: string; label: string; align: "left" | "right" | "center"; width: string; sortable: boolean; filterable: boolean }[] = [
  { key: "stock",             label: "STOCK",      align: "left",   width: "28%", sortable: true,  filterable: true },
  { key: "price",             label: "PRICE",      align: "right",  width: "15%", sortable: true,  filterable: true },
  { key: "percent_change24h", label: "24H CHANGE", align: "right",  width: "17%", sortable: true,  filterable: true },
  { key: "market_cap",        label: "MARKET_CAP", align: "right",  width: "20%", sortable: true,  filterable: true },
  { key: "spark_7d",          label: "7D TREND",   align: "center", width: "20%", sortable: false, filterable: false },
]

function SortArrows({ active, direction }: { active: boolean; direction: "asc" | "desc" }) {
  return (
    <span className="screener-v2__sort-arrows">
      <span className={"screener-v2__sort-arrow" + (active && direction === "asc" ? " screener-v2__sort-arrow--active" : "")}>▲</span>
      <span className={"screener-v2__sort-arrow" + (active && direction === "desc" ? " screener-v2__sort-arrow--active" : "")}>▼</span>
    </span>
  )
}

function FilterIcon() {
  return (
    <span className="screener-v2__filter-icon">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 2h8M2.5 5h5M4 8h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export default function ScreenerRenderer({ response }: ScreenerRendererProps) {
  const { data, row_count } = response
  const { sortKey, sortDir, toggleSort, sortedRows } = useSort(data.rows, data.columns)
  const [page, setPage] = useState(0)
  const [visibleCols, setVisibleCols] = useState<Set<string>>(() => new Set(DISPLAY_COLUMNS.map(c => c.key)))
  const [showColDropdown, setShowColDropdown] = useState(false)

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / ROWS_PER_PAGE))
  const paginatedRows = useMemo(
    () => sortedRows.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE),
    [sortedRows, page]
  )

  const activeCols = useMemo(
    () => DISPLAY_COLUMNS.filter(c => visibleCols.has(c.key)),
    [visibleCols]
  )

  const toggleColumn = useCallback((key: string) => {
    setVisibleCols(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        if (next.size > 2) next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  const handleSort = useCallback((key: string) => {
    // Map "stock" to "name" for sorting
    const sortableKey = key === "stock" ? "name" : key
    // Check if column exists in data columns for sorting
    const col = data.columns.find((c: ScreenerColumn) => c.key === sortableKey)
    if (col) toggleSort(sortableKey)
  }, [data.columns, toggleSort])

  return (
    <div className="screener-v2 animate-fade-up stagger-1">
      {/* Toolbar */}
      <div className="screener-v2__toolbar">
        <div className="screener-v2__toolbar-left">
          <span className="screener-v2__grid-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </span>
          <span className="screener-v2__count">{row_count} stocks</span>
        </div>
        <div className="screener-v2__toolbar-right">
          <div className="screener-v2__color-bar">
            <span className="screener-v2__color-swatch" style={{ background: "#ff3131" }} />
            <span className="screener-v2__color-swatch" style={{ background: "#ff6b35" }} />
            <span className="screener-v2__color-swatch" style={{ background: "#ffb700" }} />
            <span className="screener-v2__color-swatch" style={{ background: "#00d4a8" }} />
            <span className="screener-v2__color-swatch" style={{ background: "#00ff41" }} />
          </div>
          <div className="screener-v2__col-dropdown-wrap">
            <button
              className="screener-v2__col-btn"
              onClick={() => setShowColDropdown(p => !p)}
              id="screener-columns-toggle"
            >
              Columns ▾
            </button>
            {showColDropdown && (
              <div className="screener-v2__col-dropdown">
                {DISPLAY_COLUMNS.map(col => (
                  <label key={col.key} className="screener-v2__col-option">
                    <input
                      type="checkbox"
                      checked={visibleCols.has(col.key)}
                      onChange={() => toggleColumn(col.key)}
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="screener-v2__table-wrap">
        <table className="screener-v2__table">
          <colgroup>
            {activeCols.map(col => (
              <col key={col.key} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead>
            <tr className="screener-v2__header-row">
              {activeCols.map(col => {
                const isSorted = sortKey === (col.key === "stock" ? "name" : col.key)
                return (
                  <th
                    key={col.key}
                    className="screener-v2__header-cell"
                    style={{ textAlign: col.align }}
                  >
                    <button
                      className={"screener-v2__header-btn" + (isSorted ? " screener-v2__header-btn--active" : "")}
                      onClick={() => col.sortable && handleSort(col.key)}
                      disabled={!col.sortable}
                      style={{ justifyContent: ALIGN_TO_JUSTIFY[col.align] }}
                    >
                      <span>{col.label}</span>
                      {col.sortable && <SortArrows active={isSorted} direction={sortDir} />}
                      {col.filterable && <FilterIcon />}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => {
              const changeVal = row.percent_change24h
              const isPos = changeVal > 0
              const isNeg = changeVal < 0
              const changeText = formatPercentText(changeVal)

              return (
                <tr key={row.slug} className="screener-v2__row">
                  {activeCols.map(col => {
                    switch (col.key) {
                      case "stock":
                        return (
                          <td key={col.key} className="screener-v2__cell">
                            <div className="screener-v2__stock-cell">
                              {row.logo_url ? (
                                <img src={row.logo_url} alt="" className="screener-v2__stock-icon" />
                              ) : (
                                <div className="screener-v2__stock-icon-placeholder" />
                              )}
                              <div className="screener-v2__stock-info">
                                <span className="screener-v2__stock-name">{row.name}</span>
                                <span className="screener-v2__stock-sector">{row.symbol}</span>
                              </div>
                            </div>
                          </td>
                        )

                      case "price":
                        return (
                          <td key={col.key} className="screener-v2__cell screener-v2__cell--right">
                            <span className="screener-v2__mono-value">{formatCurrency(row.price)}</span>
                          </td>
                        )

                      case "percent_change24h":
                        return (
                          <td key={col.key} className="screener-v2__cell screener-v2__cell--right">
                            <span className={
                              "screener-v2__change-value" +
                              (isPos ? " screener-v2__change-value--pos" : "") +
                              (isNeg ? " screener-v2__change-value--neg" : "")
                            }>
                              {changeText}
                            </span>
                          </td>
                        )

                      case "market_cap":
                        return (
                          <td key={col.key} className="screener-v2__cell screener-v2__cell--right">
                            <span className="screener-v2__mono-value screener-v2__mono-value--dim">{formatCompact(row.market_cap)}</span>
                          </td>
                        )

                      case "spark_7d":
                        return (
                          <td key={col.key} className="screener-v2__cell screener-v2__cell--center">
                            <div className="screener-v2__sparkline-wrap">
                              <SparklineCell data={row.spark_7d} />
                            </div>
                          </td>
                        )

                      default:
                        return (
                          <td key={col.key} className="screener-v2__cell">
                            <span className="screener-v2__mono-value">&mdash;</span>
                          </td>
                        )
                    }
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="screener-v2__pagination">
          <span className="screener-v2__page-info">
            Page {page + 1} of {totalPages}
          </span>
          <div className="screener-v2__page-controls">
            <button
              className="screener-v2__page-btn"
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
            >
              ‹ Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={"screener-v2__page-btn" + (i === page ? " screener-v2__page-btn--active" : "")}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="screener-v2__page-btn"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            >
              Next ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
