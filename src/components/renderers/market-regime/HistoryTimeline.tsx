import type { MarketRegimeHistory } from "../../../types/api"
import { STATE_COLORS } from "../../../lib/regime"

interface HistoryTimelineProps {
  history: MarketRegimeHistory[]
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[d.getMonth()]} ${d.getDate()}`
}

export default function HistoryTimeline({ history }: HistoryTimelineProps) {
  if (history.length === 0) return null

  const ordered = [...history].reverse()
  const totalDays = ordered.length

  type Segment = { state: string; days: number }
  const segments: Segment[] = []
  for (const h of ordered) {
    const last = segments[segments.length - 1]
    if (last && last.state === h.state) {
      last.days += 1
    } else {
      segments.push({ state: h.state, days: 1 })
    }
  }

  const segLabel = segments.map(s => s.state + " " + s.days + "d").join(", ")

  return (
    <div className="px-6 py-4 border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-[var(--text-mute)] uppercase tracking-wider">
          Regime History
        </span>
        <span className="font-mono text-xs text-[var(--text-mute)] tabular-nums">
          {formatDate(ordered[0].date)} to {formatDate(ordered[ordered.length - 1].date)}
        </span>
      </div>
      <div
        className="flex h-4 gap-px overflow-hidden"
        role="img"
        aria-label={"Regime history: " + segLabel}
      >
        {segments.map((seg, i) => {
          const widthPct = (seg.days / totalDays) * 100
          const segColor = STATE_COLORS[seg.state] ?? "var(--text-dim)"
          return (
            <div
              key={`${seg.state}-${i}`}
              className="transition-opacity duration-300 hover:opacity-100"
              style={{
                width: `${widthPct}%`,
                background: segColor,
                opacity: 0.65,
              }}
              title={`${seg.state}: ${seg.days}d`}
            />
          )
        })}
      </div>
    </div>
  )
}
