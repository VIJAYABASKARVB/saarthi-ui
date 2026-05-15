import type { SuccessEnvelope, MlSignalsData } from "../../types/api"
import SignalCard from "./ml-signals/SignalCard"

interface MlSignalsRendererProps {
  response: SuccessEnvelope<"ml_signals", MlSignalsData>
}

export default function MlSignalsRenderer({ response }: MlSignalsRendererProps) {
  const { data, row_count } = response
  const { as_of, model_version, signals } = data

  return (
    <div className="bezel-shell animate-fade-up stagger-1">
      <div className="bezel-core">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[var(--text)]" style={{ fontFamily: "'Geist Variable', system-ui, sans-serif" }}>ML Signals</h2>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ color: "var(--accent)", border: "1px solid rgba(124,92,255,0.4)", background: "transparent" }}
            >
              {model_version}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--text-dim)]">{row_count} signals</span>
            <span className="text-xs text-[var(--text-mute)]">as of {as_of}</span>
          </div>
        </div>

        {signals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-xs text-[var(--text-mute)]">!</span>
            </div>
            <span className="text-xs text-[var(--text-mute)] tracking-wider">No signals available</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 auto-rows-fr">
            {signals.map((s, i) => (
              <SignalCard key={s.slug} signal={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
