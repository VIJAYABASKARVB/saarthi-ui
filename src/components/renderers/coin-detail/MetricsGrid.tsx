import type { CoinDetailData } from "../../../types/api"
import { formatPercent, formatLargeNumber, formatInfinitePercent } from "./formatters"

interface MetricsGridProps {
  metrics: CoinDetailData["metrics"]
  on_chain: CoinDetailData["on_chain"]
}

function displayValue(label: string, value: number): { text: string; color?: string } {
  if (label === "distance_from_ath_pct" || label === "distance_from_atl_pct") {
    return { text: formatInfinitePercent(value) }
  }
  if (label === "turnover") return { text: value.toFixed(3) }
  if (label === "prism_score") return { text: value.toFixed(1) }
  if (label === "large_holder_change_7d_pct") {
    if (value === 0) return { text: "--", color: "var(--text-dim)" }
    const v = formatPercent(value)
    const color = value > 0 ? "var(--green)" : value < 0 ? "var(--red)" : "var(--text-dim)"
    return { text: v, color }
  }
  if (label === "active_addresses_24h" || label === "tx_count_24h") {
    if (value === 0) return { text: "--" }
    return { text: formatLargeNumber(value) }
  }
  return { text: String(value) }
}

export default function MetricsGrid({ metrics, on_chain }: MetricsGridProps) {
  const metricRows = [
    { label: "Distance from ATH", key: "distance_from_ath_pct" as const },
    { label: "Distance from ATL", key: "distance_from_atl_pct" as const },
    { label: "Turnover", key: "turnover" as const },
    { label: "Prism Score", key: "prism_score" as const },
  ]
  const chainRows = [
    { label: "Active Addresses", key: "active_addresses_24h" as const },
    { label: "TX Count", key: "tx_count_24h" as const },
    { label: "Large Holder 7d", key: "large_holder_change_7d_pct" as const },
  ]

  return (
    <div className="coin-detail__metrics-column">
      <div className="coin-detail__metrics-section">
        <div className="coin-detail__metrics-header">Metrics</div>
        {metricRows.map(r => {
          const v = displayValue(r.key, metrics[r.key])
          return (
            <div key={r.key} className="coin-detail__metric-row">
              <span className="coin-detail__metric-label">{r.label}</span>
              <span className="coin-detail__metric-value" style={v.color ? { color: v.color } : undefined}>{v.text}</span>
            </div>
          )
        })}
      </div>
      <div className="coin-detail__metrics-section">
        <div className="coin-detail__metrics-header">On-Chain</div>
        {chainRows.map(r => {
          const v = displayValue(r.key, on_chain[r.key])
          return (
            <div key={r.key} className="coin-detail__metric-row">
              <span className="coin-detail__metric-label">{r.label}</span>
              <span className="coin-detail__metric-value" style={v.color ? { color: v.color } : undefined}>{v.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
