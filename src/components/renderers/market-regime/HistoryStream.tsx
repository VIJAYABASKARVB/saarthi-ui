import { useId } from "react"
import type { MarketRegimeHistory } from "../../../types/api"
import { STATE_COLORS } from "../../../lib/regime"

interface HistoryStreamProps {
  history: MarketRegimeHistory[]
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[d.getMonth()]} ${d.getDate()}`
}

export default function HistoryStream({ history }: HistoryStreamProps) {
  const gradId = useId()

  if (history.length === 0) {
    return (
      <div className="px-6 py-5 border-t border-[var(--border)]">
        <span className="font-mono text-xs text-[var(--text-mute)] uppercase tracking-wider block mb-2">
          Regime History
        </span>
        <span className="font-mono text-xs text-[var(--text-dim)]">
          No regime history available yet.
        </span>
      </div>
    )
  }

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

  const gradStops = segments.map((seg, i) => {
    const offset = (segments.slice(0, i).reduce((a, s) => a + s.days, 0) / totalDays) * 100
    const endOffset = ((segments.slice(0, i + 1).reduce((a, s) => a + s.days, 0)) / totalDays) * 100
    const color = STATE_COLORS[seg.state] ?? "var(--text-dim)"
    return { offset, endOffset, color }
  })

  return (
    <div className="px-6 py-5 border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-[var(--text-mute)] uppercase tracking-wider">
          Regime History
        </span>
        <span className="font-mono text-xs text-[var(--text-mute)] tabular-nums">
          {formatDate(ordered[0].date)} to {formatDate(ordered[ordered.length - 1].date)}
        </span>
      </div>
      <div
        className="relative h-10 rounded-lg overflow-hidden"
        role="img"
        aria-label={"Regime history: " + segLabel}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute inset-0">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              {gradStops.map((s, i) => (
                <stop key={i} offset={s.offset + "%"} stopColor={s.color} stopOpacity="0.65" />
              ))}
              {gradStops.map((s, i) => (
                <stop key={"e" + i} offset={s.endOffset + "%"} stopColor={s.color} stopOpacity="0.65" />
              ))}
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={"url(#" + gradId + ")"} rx="8" />
        </svg>
        <div className="absolute inset-0 flex">
          {segments.map((seg, i) => {
            const widthPct = (seg.days / totalDays) * 100
            const segColor = STATE_COLORS[seg.state] ?? "var(--text-dim)"
            return (
              <div
                key={seg.state + i}
                className="h-full history-segment-hover first:rounded-l-lg last:rounded-r-lg"
                style={{ width: widthPct + "%", background: segColor, opacity: 0.35 }}
                title={seg.state + ": " + seg.days + "d"}
              />
            )
          })}
        </div>
        <div className="absolute inset-0 flex">
          {segments.map((seg, i) => {
            const widthPct = (seg.days / totalDays) * 100
            const segColor = STATE_COLORS[seg.state] ?? "var(--text-dim)"
            return (
              <div
                key={"border-" + seg.state + i}
                className="h-full flex items-center justify-center overflow-hidden"
                style={{ width: widthPct + "%" }}
              >
                {widthPct > 15 && (
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider truncate px-1"
                    style={{ color: segColor, opacity: 0.9 }}
                  >
                    {seg.state}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
