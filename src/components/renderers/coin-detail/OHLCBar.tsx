import type { OHLC } from "./formatters"
import { formatPrice } from "./formatters"

interface OHLCBarProps {
  symbol: string
  exchange: string
  ohlc: OHLC | null
  change24h: number
}

export default function OHLCBar({ symbol, exchange, ohlc, change24h }: OHLCBarProps) {
  if (!ohlc) return null

  const isUp = ohlc.close >= ohlc.open
  const changeColor = isUp ? "var(--green)" : "var(--red)"

  return (
    <div className="coin-detail__ohlc-bar">
      <span className="coin-detail__ohlc-bar-label">
        {symbol} · 1D · {exchange}
      </span>
      <span className="coin-detail__ohlc-bar-sep">O</span>
      <span className="coin-detail__ohlc-bar-value">{formatPrice(ohlc.open)}</span>
      <span className="coin-detail__ohlc-bar-sep">H</span>
      <span className="coin-detail__ohlc-bar-value">{formatPrice(ohlc.high)}</span>
      <span className="coin-detail__ohlc-bar-sep">L</span>
      <span className="coin-detail__ohlc-bar-value">{formatPrice(ohlc.low)}</span>
      <span className="coin-detail__ohlc-bar-sep">C</span>
      <span className="coin-detail__ohlc-bar-value" style={{ color: changeColor }}>
        {formatPrice(ohlc.close)}
      </span>
      <span className="coin-detail__ohlc-bar-change" style={{ color: changeColor }}>
        {change24h > 0 ? "+" : ""}{change24h.toFixed(2)}%
      </span>
    </div>
  )
}
