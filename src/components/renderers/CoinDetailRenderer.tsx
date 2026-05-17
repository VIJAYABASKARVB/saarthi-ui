import { useState } from "react"
import type { SuccessEnvelope, CoinDetailData } from "../../types/api"
import ChartHeader from "./coin-detail/ChartHeader"
import ChartToolbar from "./coin-detail/ChartToolbar"
import OHLCBar from "./coin-detail/OHLCBar"
import DrawingTools from "./coin-detail/DrawingTools"
import PriceChart from "./coin-detail/PriceChart"
import AnalysisPanel from "./coin-detail/AnalysisPanel"
import MetricsCards from "./coin-detail/MetricsCards"
import { deriveOHLC } from "./coin-detail/formatters"

interface CoinDetailRendererProps {
  response: SuccessEnvelope<"coin_detail", CoinDetailData>
}

export default function CoinDetailRenderer({ response }: CoinDetailRendererProps) {
  const { data } = response
  const { symbol, name, price, changes, metrics, on_chain, price_history } = data
  const [timeframe, setTimeframe] = useState("1D")

  const ohlc = deriveOHLC(price_history)

  return (
    <div className="coin-detail bezel-shell animate-fade-up stagger-1">
      <div className="bezel-core">
        <ChartHeader symbol={symbol} name={name} price={price} changes={changes} />
        <ChartToolbar onTimeframeChange={setTimeframe} />
        <OHLCBar symbol={symbol} exchange="CRYPTO" ohlc={ohlc} change24h={changes["24h"]} />
        <div className="coin-detail__chart-area">
          <DrawingTools />
          <PriceChart data={price_history} symbol={symbol} timeframe={timeframe} />
          <AnalysisPanel data={data} />
        </div>
        <MetricsCards metrics={metrics} on_chain={on_chain} />
      </div>
    </div>
  )
}
