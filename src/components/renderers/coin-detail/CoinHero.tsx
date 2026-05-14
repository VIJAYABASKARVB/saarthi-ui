import { Badge } from "../../ui/badge"
import { formatPrice, formatPercent, formatCompactCoin } from "./formatters"

interface CoinHeroProps {
  symbol: string
  name: string
  cmc_rank: number
  price: number
  market_cap: number
  changes: {
    "1h": number
    "24h": number
    "7d": number
    "30d": number
  }
}

const CHANGE_PERIODS = ["1h", "24h", "7d", "30d"] as const

export default function CoinHero({ symbol, name, cmc_rank, price, market_cap, changes }: CoinHeroProps) {
  return (
    <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold text-[var(--text)]">{symbol}</span>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-[var(--text-mute)] rounded-full">
          #{cmc_rank}
        </Badge>
      </div>
      <div className="text-xs text-[var(--text-dim)] mb-2 truncate max-w-[300px]">{name}</div>
      <div className="text-2xl font-bold font-mono text-[var(--text)] mb-3">{formatPrice(price)}</div>
      <div className="flex gap-3 text-xs font-mono flex-wrap">
        {CHANGE_PERIODS.map(p => {
          const val = changes[p]
          const text = formatPercent(val)
          const isPos = val > 0
          const isNeg = val < 0
          return (
            <span key={p} className="flex items-center gap-1">
              <span className="text-[var(--text-mute)]">{p}</span>
              <span
                className={
                  "inline-flex items-center rounded-full text-[10px] px-1.5 py-0.5 font-mono " +
                  (isPos
                    ? "bg-[rgba(0,212,168,0.15)] text-[#00d4a8] border border-[rgba(0,212,168,0.3)]"
                    : isNeg
                    ? "bg-[rgba(255,107,107,0.15)] text-[#ff6b6b] border border-[rgba(255,107,107,0.3)]"
                    : "text-[var(--text-dim)]")
                }
              >
                {text}
              </span>
            </span>
          )
        })}
      </div>
      {market_cap > 0 && (
        <div className="mt-2 text-xs font-mono">
          <span className="text-[var(--text-mute)]">Market Cap</span>{" "}
          <span className="text-[var(--text-dim)]">{formatCompactCoin(market_cap)}</span>
        </div>
      )}
    </div>
  )
}
