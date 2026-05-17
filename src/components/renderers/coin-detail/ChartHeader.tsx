import { formatPrice, formatPercent } from "./formatters"

interface ChartHeaderProps {
  symbol: string
  name: string
  price: number
  changes: {
    "1h": number
    "24h": number
    "7d": number
    "30d": number
  }
}

export default function ChartHeader({ symbol, name, price, changes }: ChartHeaderProps) {
  const change24h = changes["24h"]
  const isPositive = change24h > 0
  const changeColor = isPositive ? "var(--green)" : change24h < 0 ? "var(--red)" : "var(--text-dim)"

  return (
    <div className="coin-detail__header">
      <div className="coin-detail__header-left">
        <span className="coin-detail__header-symbol">{symbol}</span>
        <span className="coin-detail__header-name">{name}</span>
        <span className="coin-detail__header-price">{formatPrice(price)}</span>
        <span className="coin-detail__header-change" style={{ color: changeColor }}>
          {formatPercent(change24h)}
        </span>
      </div>
    </div>
  )
}
