import type { MarketRegimeHistory } from "../../../types/api"

interface HistoryTimelineProps {
  history: MarketRegimeHistory[]
}

const DOT_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--accent)",
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function HistoryTimeline({ history }: HistoryTimelineProps) {
  if (history.length === 0) return null

  const ordered = [...history].reverse()

  return (
    <div className="regime__timeline">
      <div className="regime__timeline-header">Regime History</div>
      <div className="regime__timeline-track">
        {ordered.map((h, i) => {
          const color = DOT_COLORS[h.state] ?? "var(--text-dim)"
          const isLast = i === ordered.length - 1

          return (
            <div key={h.date + i} className="regime__timeline-node">
              <div className="regime__timeline-marker" style={{ background: color }} />
              {!isLast && <div className="regime__timeline-connector" style={{ background: color }} />}
              <span className="regime__timeline-date">{formatDate(h.date)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
