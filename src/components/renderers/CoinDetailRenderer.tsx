import type { SuccessEnvelope, CoinDetailData } from "../../types/api"
import CoinHero from "./coin-detail/CoinHero"
import SignalCallout from "./coin-detail/SignalCallout"
import MetricsGrid from "./coin-detail/MetricsGrid"
import PriceChart from "./coin-detail/PriceChart"

interface CoinDetailRendererProps {
  response: SuccessEnvelope<"coin_detail", CoinDetailData>
}

export default function CoinDetailRenderer({ response }: CoinDetailRendererProps) {
  const { data } = response
  const { symbol, name, cmc_rank, price, market_cap, changes, metrics, on_chain, price_history, latest_signal } = data

  return (
    <div className="card-glass rounded-xl overflow-hidden" style={{ borderTop: "2px solid rgba(124,92,255,0.3)" }}>
      <CoinHero
        symbol={symbol}
        name={name}
        cmc_rank={cmc_rank}
        price={price}
        market_cap={market_cap}
        changes={changes}
      />
      <div className="flex flex-col md:flex-row border-b border-[rgba(255,255,255,0.06)]">
        <SignalCallout direction={latest_signal.direction} confidence={latest_signal.confidence} />
        <MetricsGrid metrics={metrics} on_chain={on_chain} />
      </div>
      <PriceChart data={price_history} />
    </div>
  )
}
