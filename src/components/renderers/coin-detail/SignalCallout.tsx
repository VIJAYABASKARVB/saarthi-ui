import type { CSSProperties } from "react"
import { Badge } from "../../ui/badge"

interface SignalCalloutProps {
  direction: "Buy" | "Sell" | "Hold"
  confidence: number
}

const DIR_CONFIG: Record<string, { color: string; badgeVariant: "default" | "destructive" | "outline" }> = {
  Buy: { color: "var(--green)", badgeVariant: "default" },
  Sell: { color: "var(--red)", badgeVariant: "destructive" },
  Hold: { color: "var(--amber)", badgeVariant: "outline" },
}

export default function SignalCallout({ direction, confidence }: SignalCalloutProps) {
  const cfg = DIR_CONFIG[direction]
  const pct = Math.min(Math.max(confidence * 100, 0), 100)
  const fillStyle: CSSProperties = { width: `${pct}%`, background: cfg.color }

  return (
    <div className="w-full md:w-40 shrink-0 px-5 py-4 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)]">
      <div className="text-[10px] text-[var(--text-mute)] uppercase tracking-wider mb-2">Latest signal</div>
      <Badge
        variant={cfg.badgeVariant}
        className="rounded-full text-xs px-3 py-0.5 mb-2 font-medium"
        style={cfg.badgeVariant === "outline" ? { borderColor: cfg.color, color: cfg.color, background: "transparent" } : undefined}
      >
        {direction}
      </Badge>
      <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden mb-1">
        <div className="h-full rounded-full transition-all" style={fillStyle} />
      </div>
      <div className="text-[10px] font-mono text-[var(--text-dim)]">{pct.toFixed(0)}% confidence</div>
    </div>
  )
}
