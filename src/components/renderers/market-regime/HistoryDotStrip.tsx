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
    <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.06)] overflow-x-auto">
      <div className="text-[10px] text-[var(--text-mute)] uppercase tracking-wider mb-2">
        Regime history
      </div>
      <div className="flex gap-1 items-end min-w-fit">
        {ordered.map((h, i) => {
          const color = DOT_COLORS[h.state] ?? "var(--text-dim)"
          const dotStyle: CSSProperties = { background: color }

          return (
            <div key={h.date + i} className="flex flex-col items-center gap-0.5">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={dotStyle} />
              <span className="text-[9px] text-[var(--text-dim)] whitespace-nowrap">{formatDate(h.date)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
