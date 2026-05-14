import type { DashboardResponse } from '../types/api'
import { isSuccess } from '../types/api'
import { Card } from './ui/card'
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

function LoadingView({ skeletonType, query }: { skeletonType: string; query?: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] mb-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider">FETCHING</span>
        </div>
        {query && (
          <span className="text-xs text-[var(--text-mute)] truncate opacity-70">
            {query}
          </span>
        )}
      </div>
      <SkeletonLoader type={skeletonType} />
    </div>
  )
}

function ExecutionError({ reason }: { reason: string }) {
  return (
    <Card className="border-[var(--red)]">
      <div className="px-4 py-3">
        <div className="text-xs font-medium text-[var(--red)] uppercase tracking-wider mb-2">Execution Error</div>
        <div className="text-sm text-[var(--red)] opacity-85 leading-relaxed">{reason}</div>
      </div>
    </Card>
  )
}

function AgentRejected({ reason }: { reason: string }) {
  return (
    <Card className="border-[var(--amber)]">
      <div className="px-4 py-3">
        <div className="text-xs font-medium text-[var(--amber)] uppercase tracking-wider mb-2">Request Rejected</div>
        <div className="text-sm text-[var(--amber)] opacity-85 leading-relaxed">{reason}</div>
      </div>
    </Card>
  )
}

function EmptyState({ explanation }: { explanation: string }) {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
          <span className="text-xs text-[var(--text-mute)]">!</span>
        </div>
        <div className="text-xs font-medium text-[var(--text-dim)] uppercase tracking-wider mb-2">No Data Returned</div>
        <div className="text-sm text-[var(--text-mute)] text-center max-w-md leading-relaxed">{explanation}</div>
      </div>
    </Card>
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
    return <LoadingView skeletonType={skeletonType} query={query} />
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
