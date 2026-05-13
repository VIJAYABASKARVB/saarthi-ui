import type { SuccessEnvelope, MlSignalsData } from "../../types/api"
import SignalCard from "./ml-signals/SignalCard"

interface MlSignalsRendererProps {
  response: SuccessEnvelope<"ml_signals", MlSignalsData>
}

export default function MlSignalsRenderer({ response }: MlSignalsRendererProps) {
  const { data, row_count } = response
  const { as_of, model_version, signals } = data

  return (
    <div className="ml-signals">
      <div className="ml-signals__meta">
        <span className="ml-signals__meta-item">as of {as_of}</span>
        <span className="ml-signals__meta-item">{model_version}</span>
        <span className="ml-signals__meta-item">{row_count} signals</span>
      </div>

      {signals.length === 0 ? (
        <div className="ml-signals__empty">NO SIGNALS</div>
      ) : (
        signals.map(s => <SignalCard key={s.slug} signal={s} />)
      )}
    </div>
  )
}
