import type { SuccessEnvelope, ScreenerData, MlSignalsData, MarketRegimeData, NewsData, CoinDetailData } from "../../../types/api"

function buildEnvelope(type: "screener", data: ScreenerData, rowCount: number): SuccessEnvelope<"screener", ScreenerData>
function buildEnvelope(type: "ml_signals", data: MlSignalsData, rowCount: number): SuccessEnvelope<"ml_signals", MlSignalsData>
function buildEnvelope(type: "market_regime", data: MarketRegimeData, rowCount: number): SuccessEnvelope<"market_regime", MarketRegimeData>
function buildEnvelope(type: "news", data: NewsData, rowCount: number): SuccessEnvelope<"news", NewsData>
function buildEnvelope(type: "coin_detail", data: CoinDetailData, rowCount: number): SuccessEnvelope<"coin_detail", CoinDetailData>
function buildEnvelope(type: string, data: unknown, rowCount: number): SuccessEnvelope<string, unknown> {
  return {
    success: true,
    query: "",
    response_type: type,
    generated_sql: "",
    execution_time_ms: 0,
    row_count: rowCount,
    explanation: "",
    data,
  } as SuccessEnvelope<string, unknown>
}

export { buildEnvelope }
