import type { MarketRegimeHistory } from "../../../types/api"

interface HistoryTimelineProps {
  history: MarketRegimeHistory[]
}

const STATE_COLORS: Record<string, string> = {
  "Risk-on": "var(--green)",
  "Risk-off": "var(--red)",
  Choppy: "var(--amber)",
  Transition: "var(--accent)",
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[d.getMonth()]} ${d.getDate()}`
}

export default function HistoryTimeline({ history }: HistoryTimelineProps) {
  if (history.length === 0) return null

  const ordered = [...history].reverse()

  // Group consecutive same-state entries
  type Segment = { state: string; days: number; startDate: string; endDate: string }
  const segments: Segment[] = []
  for (const h of ordered) {
    const last = segments[segments.length - 1]
    if (last && last.state === h.state) {
      last.days += 1
      last.endDate = h.date
    } else {
      segments.push({ state: h.state, days: 1, startDate: h.date, endDate: h.date })
    }
  }

  const totalDays = ordered.length

  return (
    <div className="mr2__history">
      <div className="mr2__history-header">
        <span className="mr2__history-header-label">REGIME HISTORY</span>
        <span className="mr2__history-header-range">
          {formatDate(ordered[0].date)} — {formatDate(ordered[ordered.length - 1].date)}
        </span>
      </div>

      {/* Segmented heatmap strip */}
      <div className="mr2__history-strip">
        {segments.map((seg, i) => {
          const widthPct = (seg.days / totalDays) * 100
          const color = STATE_COLORS[seg.state] ?? "var(--text-dim)"
          return (
            <div
              key={`${seg.state}-${i}`}
              className="mr2__history-strip-seg"
              style={{ width: `${widthPct}%`, background: color }}
              title={`${seg.state}: ${seg.days}d (${formatDate(seg.startDate)} – ${formatDate(seg.endDate)})`}
            />
          )
        })}
      </div>

      {/* Day-by-day dots below */}
      <div className="mr2__history-dots">
        {ordered.map((h, i) => {
          const color = STATE_COLORS[h.state] ?? "var(--text-dim)"
          return (
            <div
              key={h.date + i}
              className="mr2__history-dot"
              style={{ background: color }}
              title={`${formatDate(h.date)}: ${h.state}`}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="mr2__history-legend">
        {Object.entries(STATE_COLORS).map(([state, color]) => (
          <span key={state} className="mr2__history-legend-item">
            <span className="mr2__history-legend-dot" style={{ background: color }} />
            {state}
          </span>
        ))}
      </div>
    </div>
  )
}
