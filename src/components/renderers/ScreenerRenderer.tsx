import { useState, useMemo } from "react"
import type { SuccessEnvelope, ScreenerData } from "../../types/api"
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

export default function ScreenerRenderer({ response }: ScreenerRendererProps) {
  const { data, execution_time_ms, row_count, explanation } = response
  const { sortKey, sortDir, toggleSort, sortedRows } = useSort(data.rows, data.columns)
  const [page, setPage] = useState(0)

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / ROWS_PER_PAGE))
  const paginatedRows = useMemo(
    () => sortedRows.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE),
    [sortedRows, page]
  )

  return (
    <div className="bezel-shell animate-fade-up stagger-1">
      <div className="bezel-core">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
          <span className="text-xs text-[var(--text-mute)]">{row_count} results &middot; {execution_time_ms}ms</span>
        </div>

        {explanation && (
          <div className="px-5 py-3 border-b border-[var(--border)] text-sm text-[var(--text-dim)] leading-relaxed">
            {explanation}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-sm">
                <th className="px-4 py-3 text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-mute)]">Coin</th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-mute)]">Price</th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold tracking-[0.08em] uppercase cursor-pointer hover:text-[var(--text)] text-[var(--text-mute)] transition-colors" onClick={() => toggleSort("percent_change24h")}>
                  <span className="flex items-center justify-end gap-1">
                    24h Change
                    {sortKey === "percent_change24h" ? (
                      sortDir === "asc" ? <span className="text-[var(--accent)]">&#9650;</span> : <span className="text-[var(--accent)]">&#9660;</span>
                    ) : null}
                  </span>
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-mute)]">Market Cap</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--text-mute)]">7d</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {paginatedRows.map((row) => {
                const changeVal = row.percent_change24h
                const isPos = changeVal > 0
                const isNeg = changeVal < 0
                const changeText = formatPercentText(changeVal)

                return (
                  <tr key={row.slug} className="hover:bg-[rgba(124,92,255,0.03)] transition-[background] duration-300" style={{ transitionTimingFunction: "var(--ease-spring)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {row.logo_url ? (
                          <img src={row.logo_url} alt="" className="w-6 h-6 rounded-full shrink-0" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[var(--bg-elevated)] shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[var(--text)]">{row.symbol}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-mono text-[var(--text)]">{formatCurrency(row.price)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
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
                        {changeText}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-mono text-[var(--text-dim)]">{formatCompact(row.market_cap)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <SparklineCell data={row.spark_7d} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)]">
            <span className="text-xs text-[var(--text-mute)]">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                className="text-xs px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed magnetic-btn"
                style={{ transitionTimingFunction: "var(--ease-spring)" }}
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={
                    "text-xs w-7 h-7 rounded-full transition-all duration-300 magnetic-btn " +
                    (i === page
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--bg-elevated)] text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg-card)]")
                  }
                  style={{ transitionTimingFunction: "var(--ease-spring)" }}
                  onClick={() => setPage(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="text-xs px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed magnetic-btn"
                style={{ transitionTimingFunction: "var(--ease-spring)" }}
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
