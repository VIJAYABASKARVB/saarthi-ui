import type { CoinDetailData } from "../../../types/api"
import {
  formatLargeNumber,
  formatInfinitePercent,
  getAthContext,
  getAtlContext,
  getTurnoverTier,
  getNetworkTier,
  getPrismTier,
} from "./formatters"

interface MetricsCardsProps {
  metrics: CoinDetailData["metrics"]
  on_chain: CoinDetailData["on_chain"]
}

export default function MetricsCards({ metrics, on_chain }: MetricsCardsProps) {
  const prismCtx = getPrismTier(metrics.prism_score)
  const prismColor = metrics.prism_score >= 70 ? "var(--green)" : metrics.prism_score >= 40 ? "var(--amber)" : "var(--red)"

  const compactMetrics = [
    { label: "ATH Distance", value: formatInfinitePercent(metrics.distance_from_ath_pct), ctx: getAthContext(metrics.distance_from_ath_pct) },
    { label: "ATL Distance", value: metrics.distance_from_atl_pct.toFixed(1) + "%", ctx: getAtlContext(metrics.distance_from_atl_pct) },
    { label: "Turnover", value: metrics.turnover.toFixed(3), ctx: getTurnoverTier(metrics.turnover) },
    { label: "Active Addr.", value: formatLargeNumber(on_chain.active_addresses_24h), ctx: getNetworkTier(on_chain.active_addresses_24h) },
    { label: "Tx Count (24h)", value: formatLargeNumber(on_chain.tx_count_24h), ctx: getNetworkTier(on_chain.tx_count_24h) },
  ]

  return (
    <div className="coin-detail__metrics-cards">
      <div className="coin-detail__metric-hero">
        <div className="coin-detail__metric-hero-label">Prism Score</div>
        <div className="coin-detail__metric-hero-value" style={{ color: prismColor }}>{metrics.prism_score.toFixed(1)}</div>
        <span className="coin-detail__metric-hero-badge" style={{ color: prismColor, borderColor: prismColor + "30" }}>{prismCtx}</span>
      </div>
      <div className="coin-detail__metric-compact-grid">
        {compactMetrics.map((m, i) => (
          <div key={i} className="coin-detail__metric-compact">
            <div className="coin-detail__metric-compact-label">{m.label}</div>
            <div className="coin-detail__metric-compact-value">{m.value}</div>
            <span className="coin-detail__metric-compact-badge">{m.ctx}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
