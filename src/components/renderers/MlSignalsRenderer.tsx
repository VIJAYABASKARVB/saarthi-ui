import type { SuccessEnvelope, MlSignalsData } from "../../types/api"
import SignalCard from "./ml-signals/SignalCard"

interface MlSignalsRendererProps {
  response: SuccessEnvelope<"ml_signals", MlSignalsData>
}

export default function MlSignalsRenderer({ response }: MlSignalsRendererProps) {
  const { data, row_count } = response
  const { as_of, model_version, signals } = data

  return (
    <div className="card-glass rounded-xl overflow-hidden" style={{ borderTop: "2px solid rgba(124,92,255,0.3)" }}>
      <div className="flex items-center gap-4 px-5 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <span className="text-xs text-[var(--text-mute)]">as of {as_of}</span>
        <span className="text-xs text-[var(--text-mute)]">{model_version}</span>
        <span className="text-xs text-[var(--text-mute)]">{row_count} signals</span>
      </div>

      {signals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-xs text-[var(--text-mute)] tracking-wider">
          No signals
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {signals.map(s => <SignalCard key={s.slug} signal={s} />)}
        </div>
      )}
    </div>
  )
}
