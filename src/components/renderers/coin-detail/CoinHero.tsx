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
    <div className="coin-detail__hero">
      <div className="coin-detail__identity">
        <span className="coin-detail__symbol">{symbol}</span>
        <span className="coin-detail__rank">#{cmc_rank}</span>
      </div>
      <div className="coin-detail__name">{name}</div>
      <div className="coin-detail__price">{formatPrice(price)}</div>
      <div className="coin-detail__changes">
        {CHANGE_PERIODS.map(p => {
          const val = changes[p]
          const text = formatPercent(val)
          const color = val > 0 ? "var(--green)" : val < 0 ? "var(--red)" : "var(--text-dim)"
          return (
            <span key={p}>
              <span className="coin-detail__change-period">{p}</span>
              <span style={{ color }}>{text}</span>
            </span>
          )
        })}
      </div>
      {market_cap > 0 && (
        <div className="coin-detail__changes" style={{ marginTop: 6 }}>
          <span><span className="coin-detail__change-period">Market Cap</span> {formatCompactCoin(market_cap)}</span>
        </div>
      )}
    </div>
  )
}
