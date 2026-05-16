import type { KeyboardEvent } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { MLSignal } from "../../../types/api"
import ProbabilityBar from "./ProbabilityBar"
import FeatureContributions from "./FeatureContributions"

interface SignalCardProps {
  signal: MLSignal
  index: number
}

const DIR_STYLE: Record<string, { text: string; color: string }> = {
  Buy: { text: "BUY", color: "var(--green)" },
  Sell: { text: "SELL", color: "var(--red)" },
  Hold: { text: "HOLD", color: "var(--amber)" },
}

const STAGGER_CLASSES = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5", "stagger-6"]

function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatChange(n: number): { text: string; color: string } {
  if (n > 0) return { text: "+" + n.toFixed(2) + "%", color: "var(--green)" }
  if (n < 0) return { text: n.toFixed(2) + "%", color: "var(--red)" }
  return { text: "0.00%", color: "var(--text-dim)" }
}

export default function SignalCard({ signal, index }: SignalCardProps) {
  const { name, symbol, price, percent_change24h, direction, signal_score, confidence, prob_buy, prob_hold, prob_sell, top_features } = signal
  const dir = DIR_STYLE[direction]
  const change = formatChange(percent_change24h)
  const lowConf = confidence < 0.3
  const stagger = STAGGER_CLASSES[index % STAGGER_CLASSES.length]

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      const el = e.currentTarget
      el.style.transform = "scale(0.98)"
      setTimeout(() => { el.style.transform = "scale(1)" }, 150)
    }
  }

  return (
    <div
      className={`bezel-shell--sm animate-fade-up ${stagger}`}
      style={{ transition: "transform 0.3s var(--ease-spring)" }}
      tabIndex={0}
      role="button"
      aria-label={`${symbol}: ${direction} signal, score ${signal_score.toFixed(1)}`}
      onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)" }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)" }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
      onKeyDown={handleKeyDown}
    >
      <div className="bezel-core--sm signal-card__core" style={{ background: "var(--bg-card)" }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-2xl font-semibold text-[var(--text)] mb-0.5" style={{ fontFamily: "'Geist Variable', system-ui, sans-serif" }}>{symbol}</div>
            <div className="text-sm text-[var(--text-mute)] mb-2">{name}</div>
            <div className="text-xl font-mono font-bold text-[var(--text)] mb-1.5">{formatPrice(price)}</div>
            <div>
              <span
                className="inline-flex items-center rounded-full text-sm font-semibold px-3 py-1"
                style={{ color: change.color, border: `1px solid ${change.color}40`, background: "transparent" }}
              >
                {change.text}
              </span>
            </div>
          </div>
          <div
            className="rounded-full px-5 py-2.5 text-base font-bold tracking-wide"
            style={{
              border: `1px solid ${dir.color}66`,
              color: dir.color,
              background: "transparent",
              opacity: lowConf ? 0.4 : 1,
            }}
          >
            {dir.text}
          </div>
        </div>

        <div className="h-px w-full mb-4" style={{ background: "var(--border)" }} />

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-[var(--text-mute)]">Signal Score</span>
            <span className="text-[40px] font-bold font-mono leading-none" style={{ color: dir.color }}>
              {signal_score.toFixed(1)}
            </span>
          </div>
          <div
            className="h-[5px] rounded-full overflow-hidden"
            style={{ background: "var(--track-bg)" }}
            role="progressbar"
            aria-valuenow={Math.round(Math.min(signal_score, 100))}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Signal score"
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(signal_score, 100)}%`,
                background: dir.color,
                transitionTimingFunction: "var(--ease-spring)",
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[var(--text-mute)]">Confidence</span>
            <span className="text-sm font-mono" style={{ color: dir.color }}>
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div
            className="h-[5px] rounded-full overflow-hidden"
            style={{ background: "var(--track-bg)" }}
            role="progressbar"
            aria-valuenow={Math.round(confidence * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Confidence"
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${confidence * 100}%`, background: dir.color, transitionTimingFunction: "var(--ease-spring)" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <ProbabilityBar probBuy={prob_buy} probHold={prob_hold} probSell={prob_sell} />
        </div>

        {top_features.length > 0 && (
          <FeatureContributions features={top_features} />
        )}

        <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-[11px] text-[var(--text-mute)]">Updated &middot; 2026-05-13</span>
          {direction === "Buy" ? (
            <TrendingUp size={14} style={{ color: "var(--green)" }} />
          ) : direction === "Sell" ? (
            <TrendingDown size={14} style={{ color: "var(--red)" }} />
          ) : (
            <Minus size={14} style={{ color: "var(--amber)" }} />
          )}
        </div>
      </div>
    </div>
  )
}
