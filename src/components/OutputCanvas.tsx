import { useState, useEffect } from 'react'
import type { DashboardResponse } from '../types/api'
import { isSuccess } from '../types/api'
import ScreenerRenderer from './renderers/ScreenerRenderer'
import MlSignalsRenderer from './renderers/MlSignalsRenderer'
import MarketRegimeRenderer from './renderers/MarketRegimeRenderer'

interface OutputCanvasProps {
  response: DashboardResponse | null
  isLoading: boolean
}

function LoadingState() {
  const [dots, setDots] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".")
    }, 350)
    return () => clearInterval(interval)
  }, [])
  return <div className="output-canvas__loading">FETCHING{dots}</div>
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
    default:
      return (
        <div className="output-canvas__success">
          <div className="placeholder-renderer">
            <span className="placeholder-renderer__bracket">[</span>
            {response.response_type.replace(/_/g, " ").toUpperCase()}
            <span className="placeholder-renderer__bracket">]</span>
            <span className="placeholder-renderer__text"> RENDERER — {response.row_count} rows</span>
          </div>
        </div>
      )
  }
}

export default function OutputCanvas({ response, isLoading }: OutputCanvasProps) {
  if (isLoading) return <LoadingState />
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
