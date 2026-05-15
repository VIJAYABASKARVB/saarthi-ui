import type { CSSProperties } from "react"

interface HistoryDotStripProps {
  history: Array<{ date: string; state: string }>
}

const DOT_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--text)",
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function HistoryDotStrip({ history }: HistoryDotStripProps) {
  if (history.length === 0) return null

  const ordered = [...history].reverse()

  return (
    <div className="regime__history">
      <div className="regime__history-header">
        Regime history
      </div>
      <div className="regime__history-strip">
        {ordered.map((h, i) => {
          const color = DOT_COLORS[h.state] ?? "var(--text-dim)"
          const dotStyle: CSSProperties = { background: color }

          return (
            <div key={h.date + i} className="regime__history-dot-group">
              <div className="regime__history-dot" style={dotStyle} />
              <span className="regime__history-date">{formatDate(h.date)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
