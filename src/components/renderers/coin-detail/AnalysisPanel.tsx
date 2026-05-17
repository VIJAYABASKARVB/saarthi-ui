import type { CoinDetailData } from "../../../types/api"
import {
  formatPercent,
  formatLargeNumber,
  getAthContext,
  getAtlContext,
  getTurnoverTier,
  getNetworkTier,
  getHolderFlow,
  getPrismTier,
} from "./formatters"

interface AnalysisPanelProps {
  data: CoinDetailData
}

const CHANGE_PERIODS = ["1h", "24h", "7d", "30d"] as const

function changeColor(val: number): string {
  return val > 0 ? "var(--green)" : val < 0 ? "var(--red)" : "var(--text-dim)"
}

export default function AnalysisPanel({ data }: AnalysisPanelProps) {
  const { changes, latest_signal, metrics, on_chain } = data

  const signalColor =
    latest_signal.direction === "Buy"
      ? "var(--green)"
      : latest_signal.direction === "Sell"
        ? "var(--red)"
        : "var(--amber)"

  const pct = Math.min(Math.max(latest_signal.confidence * 100, 0), 100)

  return (
    <div className="coin-detail__analysis-panel">
      {/* Signal */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">Signal</div>
        <div className="coin-detail__analysis-signal-row">
          <span
            className="coin-detail__analysis-signal-badge"
            style={{ color: signalColor, borderColor: signalColor + "40" }}
          >
            {latest_signal.direction}
          </span>
          <span className="coin-detail__analysis-confidence">{pct.toFixed(0)}%</span>
        </div>
        <div className="coin-detail__analysis-confidence-track">
          <div
            className="coin-detail__analysis-confidence-fill"
            style={{ width: `${pct}%`, background: signalColor }}
          />
        </div>
      </div>

      {/* Momentum */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">Momentum</div>
        <div className="coin-detail__analysis-momentum">
          {CHANGE_PERIODS.map(p => {
            const val = changes[p]
            return (
              <div key={p} className="coin-detail__analysis-momentum-item">
                <span className="coin-detail__analysis-momentum-period">{p}</span>
                <span className="coin-detail__analysis-momentum-value" style={{ color: changeColor(val) }}>
                  {formatPercent(val)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ATH Position */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">ATH Position</div>
        <div className="coin-detail__analysis-row">
          <span className="coin-detail__analysis-label">Distance</span>
          <span className="coin-detail__analysis-value">{metrics.distance_from_ath_pct.toFixed(1)}%</span>
        </div>
        <span className="coin-detail__analysis-context">{getAthContext(metrics.distance_from_ath_pct)}</span>
      </div>

      {/* ATL Position */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">ATL Position</div>
        <div className="coin-detail__analysis-row">
          <span className="coin-detail__analysis-label">Distance</span>
          <span className="coin-detail__analysis-value">{metrics.distance_from_atl_pct.toFixed(1)}%</span>
        </div>
        <span className="coin-detail__analysis-context">{getAtlContext(metrics.distance_from_atl_pct)}</span>
      </div>

      {/* Network Activity */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">Network Activity</div>
        <div className="coin-detail__analysis-row">
          <span className="coin-detail__analysis-label">Addresses (24h)</span>
          <span className="coin-detail__analysis-value">{formatLargeNumber(on_chain.active_addresses_24h)}</span>
        </div>
        <span className="coin-detail__analysis-context">{getNetworkTier(on_chain.active_addresses_24h)}</span>
        <div className="coin-detail__analysis-row" style={{ marginTop: 4 }}>
          <span className="coin-detail__analysis-label">Tx Count (24h)</span>
          <span className="coin-detail__analysis-value">{formatLargeNumber(on_chain.tx_count_24h)}</span>
        </div>
        <span className="coin-detail__analysis-context">{getNetworkTier(on_chain.tx_count_24h)}</span>
      </div>

      {/* Holder Flow */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">Holder Flow (7d)</div>
        <div className="coin-detail__analysis-row">
          <span className="coin-detail__analysis-label">Change</span>
          <span className="coin-detail__analysis-value" style={{ color: changeColor(on_chain.large_holder_change_7d_pct) }}>
            {on_chain.large_holder_change_7d_pct > 0 ? "+" : ""}{on_chain.large_holder_change_7d_pct.toFixed(2)}%
          </span>
        </div>
        <span className="coin-detail__analysis-context">{getHolderFlow(on_chain.large_holder_change_7d_pct)}</span>
      </div>

      {/* Liquidity */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">Liquidity</div>
        <div className="coin-detail__analysis-row">
          <span className="coin-detail__analysis-label">Turnover</span>
          <span className="coin-detail__analysis-value">{metrics.turnover.toFixed(3)}</span>
        </div>
        <span className="coin-detail__analysis-context">{getTurnoverTier(metrics.turnover)}</span>
      </div>

      {/* Prism Score */}
      <div className="coin-detail__analysis-section">
        <div className="coin-detail__analysis-section-title">Prism Score</div>
        <div className="coin-detail__analysis-row">
          <span className="coin-detail__analysis-label">Score</span>
          <span className="coin-detail__analysis-value">{metrics.prism_score.toFixed(1)}</span>
        </div>
        <span className="coin-detail__analysis-context">{getPrismTier(metrics.prism_score)}</span>
      </div>
    </div>
  )
}
