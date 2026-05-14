import type { DashboardResponse } from '../types/api'
import { isSuccess } from '../types/api'
import ScreenerRenderer from './renderers/ScreenerRenderer'
import MlSignalsRenderer from './renderers/MlSignalsRenderer'
import MarketRegimeRenderer from './renderers/MarketRegimeRenderer'
import NewsRenderer from './renderers/NewsRenderer'
import CoinDetailRenderer from './renderers/CoinDetailRenderer'
import CompositeRenderer from './renderers/CompositeRenderer'
import SkeletonLoader from './skeletons/SkeletonLoader'

interface OutputCanvasProps {
  response: DashboardResponse | null
  isLoading: boolean
  query?: string
}

function ExecutionError({ reason }: { reason: string }) {
  return (
    <div className="output-canvas__error">
      <div className="output-canvas__error-header">EXECUTION ERROR</div>
      <div className="output-canvas__error-body">{reason}</div>
    </div>
  )
}

function AgentRejected({ reason }: { reason: string }) {
  return (
    <div className="output-canvas__rejected">
      <div className="output-canvas__rejected-header">REQUEST REJECTED</div>
      <div className="output-canvas__rejected-body">{reason}</div>
    </div>
  )
}

function EmptyState({ explanation }: { explanation: string }) {
  return (
    <div className="output-canvas__empty">
      <div className="output-canvas__empty-header">NO DATA RETURNED</div>
      <div className="output-canvas__empty-body">{explanation}</div>
    </div>
  )
}

function SuccessState({ response }: { response: DashboardResponse & { success: true } }) {
  switch (response.response_type) {
    case "screener":
      return <ScreenerRenderer response={response} />
    case "ml_signals":
      return <MlSignalsRenderer response={response} />
    case "market_regime":
      return <MarketRegimeRenderer response={response} />
    case "news":
      return <NewsRenderer response={response} />
    case "coin_detail":
      return <CoinDetailRenderer response={response} />
    case "composite":
      return <CompositeRenderer response={response} />
  }
}

const SKELETON_MAP: Record<string, string> = {
  screener: "screener",
  signals: "signals",
  regime: "regime",
  news: "news",
  coin: "coin",
}

export default function OutputCanvas({ response, isLoading, query }: OutputCanvasProps) {
  if (isLoading) {
    const skeletonType = SKELETON_MAP[query ?? ""] ?? "default"
    return (
      <div>
        <div className="loading-header">
          <div className="loading-fetching">FETCHING...</div>
          {query && <div className="loading-query">&gt; {query}</div>}
        </div>
        <SkeletonLoader type={skeletonType} />
      </div>
    )
  }
  if (!response) return null
  if (!isSuccess(response)) {
    if (response.error_code === "AGENT_REJECTED") {
      return <AgentRejected reason={response.reason} />
    }
    return <ExecutionError reason={response.reason} />
  }
  if (response.row_count === 0) {
    return <EmptyState explanation={response.explanation} />
  }
  return <SuccessState response={response} />
}
