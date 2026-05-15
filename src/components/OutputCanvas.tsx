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

function LoadingView({ skeletonType, query }: { skeletonType: string; query?: string }) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[rgba(13,13,18,0.7)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.06)] mb-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider">Fetching</span>
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
    <div className="animate-fade-up bezel-shell border-[rgba(255,107,107,0.2)]">
      <div className="bezel-core">
        <div className="px-5 py-4">
          <div className="text-xs font-medium text-[var(--red)] uppercase tracking-wider mb-2">Execution Error</div>
          <div className="text-sm text-[var(--red)] opacity-85 leading-relaxed">{reason}</div>
        </div>
      </div>
    </div>
  )
}

function AgentRejected({ reason }: { reason: string }) {
  return (
    <div className="animate-fade-up bezel-shell border-[rgba(255,181,71,0.2)]">
      <div className="bezel-core">
        <div className="px-5 py-4">
          <div className="text-xs font-medium text-[var(--amber)] uppercase tracking-wider mb-2">Request Rejected</div>
          <div className="text-sm text-[var(--amber)] opacity-85 leading-relaxed">{reason}</div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ explanation }: { explanation: string }) {
  return (
    <div className="animate-fade-up bezel-shell">
      <div className="bezel-core">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center mb-4">
            <span className="text-sm text-[var(--text-mute)]">!</span>
          </div>
          <div className="text-xs font-medium text-[var(--text-dim)] uppercase tracking-wider mb-2">No Data Returned</div>
          <div className="text-sm text-[var(--text-mute)] text-center max-w-md leading-relaxed">{explanation}</div>
        </div>
      </div>
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
