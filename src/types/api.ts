// --- Envelope ---

export interface SuccessEnvelope<T extends string, D> {
  success: true
  query: string
  response_type: T
  generated_sql: string
  execution_time_ms: number
  row_count: number
  explanation: string
  data: D
}

export interface ErrorEnvelope {
  success: false
  error_code: "AGENT_REJECTED" | "EXECUTION_ERROR"
  reason: string
}

// --- Screener ---

export interface ScreenerColumn {
  key: string
  label: string
  type: string
  is_default?: boolean
  color_scale?: boolean
}

export interface ScreenerRow {
  slug: string
  name: string
  symbol: string
  price: number
  percent_change24h: number
  market_cap: number
  logo_url: string
  spark_7d: number[]
}

export interface ScreenerData {
  columns: ScreenerColumn[]
  rows: ScreenerRow[]
}

// --- ML Signals ---

export interface MLSignalFeature {
  name: string
  contribution: number
}

export interface MLSignal {
  slug: string
  name: string
  symbol: string
  direction: "Buy" | "Sell" | "Hold"
  signal_score: number
  confidence: number
  prob_buy: number
  prob_hold: number
  prob_sell: number
  top_features: MLSignalFeature[]
  price: number
  percent_change24h: number
}

export interface MlSignalsData {
  as_of: string
  model_version: string
  signals: MLSignal[]
}

// --- Market Regime ---

export interface MarketRegimeTransitions {
  to_risk_on: number
  to_risk_off: number
  to_choppy: number
}

export interface MarketRegimeHistory {
  date: string
  state: string
}

export interface MarketRegimeData {
  as_of: string
  regime_state: "Risk-on" | "Risk-off" | "Choppy" | "Transition"
  confidence: number
  duration_days: number
  transitions: MarketRegimeTransitions
  history: MarketRegimeHistory[]
  narrative: string
}

// --- News ---

export interface NewsArticle {
  id: string
  headline: string
  source: string
  url: string
  published_at: string
  sentiment: "positive" | "neutral" | "negative"
  sentiment_score: number
  related_coins: string[]
  summary: string
  image_url: string
}

export interface NewsData {
  articles: NewsArticle[]
}

// --- Coin Detail ---

export interface CoinDetailData {
  slug: string
  name: string
  symbol: string
  price: number
  market_cap: number
  cmc_rank: number
  changes: {
    "1h": number
    "24h": number
    "7d": number
    "30d": number
  }
  metrics: {
    distance_from_ath_pct: number
    distance_from_atl_pct: number
    turnover: number
    prism_score: number
  }
  on_chain: {
    active_addresses_24h: number
    tx_count_24h: number
    large_holder_change_7d_pct: number
  }
  price_history: { t: string; price: number }[]
  latest_signal: {
    direction: "Buy" | "Sell" | "Hold"
    confidence: number
  }
}

// --- Composite ---

export interface CompositeSection {
  response_type: "screener" | "ml_signals" | "market_regime" | "news" | "coin_detail"
  title: string
  data: unknown
}

export interface CompositeData {
  sections: CompositeSection[]
}

// --- Discriminated Union ---

export type ResponseTypeMap = {
  screener: ScreenerData
  ml_signals: MlSignalsData
  market_regime: MarketRegimeData
  news: NewsData
  coin_detail: CoinDetailData
  composite: CompositeData
}

export type DashboardResponse =
  | SuccessEnvelope<"screener", ScreenerData>
  | SuccessEnvelope<"ml_signals", MlSignalsData>
  | SuccessEnvelope<"market_regime", MarketRegimeData>
  | SuccessEnvelope<"news", NewsData>
  | SuccessEnvelope<"coin_detail", CoinDetailData>
  | SuccessEnvelope<"composite", CompositeData>
  | ErrorEnvelope

// --- Type Guards ---

export function isSuccess(
  response: DashboardResponse
): response is Extract<DashboardResponse, { success: true }> {
  return response.success === true
}

export function isError(
  response: DashboardResponse
): response is ErrorEnvelope {
  return response.success === false
}

export function isResponseType<K extends keyof ResponseTypeMap>(
  response: DashboardResponse,
  type: K
): response is SuccessEnvelope<K, ResponseTypeMap[K]> {
  return response.success === true && response.response_type === type
}
